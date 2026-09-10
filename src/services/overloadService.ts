// ==========================================
// PROGRESSIVE OVERLOAD RECOMMENDATION ENGINE
// ==========================================

import { Exercise, ProgressiveOverloadRecommendation, SetLog, WorkoutSession } from '../db/schema';
import { parseRepRange } from '../utils/calculations';

export function analyzeProgressiveOverload(
  currentSession: WorkoutSession,
  pastSessions: WorkoutSession[],
  exercises: Exercise[]
): ProgressiveOverloadRecommendation[] {
  const recommendations: ProgressiveOverloadRecommendation[] = [];

  // Group current session completed sets by exercise
  const currentSetsByExercise: Record<string, SetLog[]> = {};
  currentSession.sets.forEach(set => {
    if (set.isCompleted && set.setType !== 'warmup') {
      if (!currentSetsByExercise[set.exerciseId]) {
        currentSetsByExercise[set.exerciseId] = [];
      }
      currentSetsByExercise[set.exerciseId].push(set);
    }
  });

  // Find previous completed sessions containing these exercises
  const completedPastSessions = pastSessions
    .filter(s => s.status === 'completed' && s.id !== currentSession.id)
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  Object.entries(currentSetsByExercise).forEach(([exerciseId, currentSets]) => {
    if (currentSets.length === 0) return;

    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    // Find the most recent past session that had this exercise
    let pastSetsForExercise: SetLog[] = [];
    for (const pastSession of completedPastSessions) {
      const matchSets = pastSession.sets.filter(
        s => s.exerciseId === exerciseId && s.isCompleted && s.setType !== 'warmup'
      );
      if (matchSets.length > 0) {
        pastSetsForExercise = matchSets;
        break;
      }
    }

    // Determine current average weight and reps
    const avgCurrentWeight = currentSets.reduce((acc, s) => acc + s.weightKg, 0) / currentSets.length;
    const maxCurrentWeight = Math.max(...currentSets.map(s => s.weightKg));
    const minCurrentReps = Math.min(...currentSets.map(s => s.reps));
    const maxCurrentReps = Math.max(...currentSets.map(s => s.reps));
    const avgCurrentReps = Math.round(currentSets.reduce((acc, s) => acc + s.reps, 0) / currentSets.length);

    // Target rep range (default to 8-12 if not specified)
    const targetRepRange = { min: 8, max: 12 };
    const repIncrement = exercise.equipment === 'Barbell' ? 2.5 : (exercise.equipment === 'Dumbbell' ? 2.0 : 2.5);

    if (pastSetsForExercise.length > 0) {
      const pastMaxWeight = Math.max(...pastSetsForExercise.map(s => s.weightKg));
      const pastAvgReps = Math.round(pastSetsForExercise.reduce((acc, s) => acc + s.reps, 0) / pastSetsForExercise.length);

      // Scenario 1: Performed all sets at or above upper rep limit with solid performance
      if (minCurrentReps >= targetRepRange.max || (maxCurrentWeight >= pastMaxWeight && avgCurrentReps > pastAvgReps)) {
        const nextWeight = maxCurrentWeight + repIncrement;
        recommendations.push({
          id: `rec_${Date.now()}_${exerciseId}`,
          exerciseId,
          exerciseName: exercise.name,
          previousPerformance: {
            weightKg: pastMaxWeight,
            reps: pastAvgReps,
            sets: pastSetsForExercise.length,
          },
          currentPerformance: {
            weightKg: maxCurrentWeight,
            reps: avgCurrentReps,
            sets: currentSets.length,
          },
          recommendationType: 'increase_weight',
          suggestedWeightKg: nextWeight,
          suggestedReps: `${targetRepRange.min}-${targetRepRange.max}`,
          reason: `Tuyệt vời! Bạn đã hoàn thành xuất sắc ${currentSets.length} sets ở mức ${maxCurrentWeight}kg với số reps cao. Đề xuất tăng tạ lên ${nextWeight}kg vào buổi tới!`,
          applied: false,
        });
      }
      // Scenario 2: Performed at the lower rep boundary
      else if (minCurrentReps < targetRepRange.min) {
        recommendations.push({
          id: `rec_${Date.now()}_${exerciseId}`,
          exerciseId,
          exerciseName: exercise.name,
          previousPerformance: {
            weightKg: pastMaxWeight,
            reps: pastAvgReps,
            sets: pastSetsForExercise.length,
          },
          currentPerformance: {
            weightKg: maxCurrentWeight,
            reps: avgCurrentReps,
            sets: currentSets.length,
          },
          recommendationType: 'maintain',
          suggestedWeightKg: maxCurrentWeight,
          suggestedReps: `${targetRepRange.min}-${targetRepRange.max}`,
          reason: `Buổi này bạn thực hiện ${avgCurrentReps} reps/set. Hãy duy trì mức tạ ${maxCurrentWeight}kg để làm chủ kỹ thuật và chạm mốc ${targetRepRange.max} reps trước khi tăng tạ nhé!`,
          applied: false,
        });
      }
      // Scenario 3: Rep progression
      else {
        recommendations.push({
          id: `rec_${Date.now()}_${exerciseId}`,
          exerciseId,
          exerciseName: exercise.name,
          previousPerformance: {
            weightKg: pastMaxWeight,
            reps: pastAvgReps,
            sets: pastSetsForExercise.length,
          },
          currentPerformance: {
            weightKg: maxCurrentWeight,
            reps: avgCurrentReps,
            sets: currentSets.length,
          },
          recommendationType: 'increase_reps',
          suggestedWeightKg: maxCurrentWeight,
          suggestedReps: `${Math.min(targetRepRange.max, avgCurrentReps + 1)}-${targetRepRange.max}`,
          reason: `Phong độ ổn định! Tiếp tục giữ mức ${maxCurrentWeight}kg và cố gắng nâng thêm +1 rep mỗi set trong buổi tập tiếp theo.`,
          applied: false,
        });
      }
    } else {
      // First time performing this exercise
      if (maxCurrentReps >= targetRepRange.max) {
        const nextWeight = maxCurrentWeight + repIncrement;
        recommendations.push({
          id: `rec_${Date.now()}_${exerciseId}`,
          exerciseId,
          exerciseName: exercise.name,
          previousPerformance: {
            weightKg: 0,
            reps: 0,
            sets: 0,
          },
          currentPerformance: {
            weightKg: maxCurrentWeight,
            reps: avgCurrentReps,
            sets: currentSets.length,
          },
          recommendationType: 'increase_weight',
          suggestedWeightKg: nextWeight,
          suggestedReps: `${targetRepRange.min}-${targetRepRange.max}`,
          reason: `Mức tạ ${maxCurrentWeight}kg đã sẵn sàng để nâng cấp. Bạn có thể thử ${nextWeight}kg ở buổi sau!`,
          applied: false,
        });
      }
    }
  });

  return recommendations;
}
