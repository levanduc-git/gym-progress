// ==========================================
// PERSONAL RECORD (PR) DETECTION ENGINE
// ==========================================

import { Exercise, PersonalRecord, SetLog } from '../db/schema';
import { calculateEstimated1RM } from '../utils/calculations';
import { audioService } from './audioService';
import confetti from 'canvas-confetti';

export function checkForPersonalRecord(
  completedSet: SetLog,
  exercise: Exercise,
  existingPRs: PersonalRecord[],
  sessionId?: string
): { isPR: boolean; newPR?: PersonalRecord; prType?: 'max_weight' | 'max_reps' | 'best_e1rm' } {
  if (!completedSet.isCompleted || completedSet.setType === 'warmup') {
    return { isPR: false };
  }

  const { weightKg, reps } = completedSet;
  if (weightKg <= 0 || reps <= 0) return { isPR: false };

  const currentE1RM = calculateEstimated1RM(weightKg, reps);

  // Find historical records for this specific exercise
  const exercisePRs = existingPRs.filter(p => p.exerciseId === exercise.id);

  // Best historical numbers
  const bestWeightPR = exercisePRs.find(p => p.type === 'max_weight');
  const bestE1RMPR = exercisePRs.find(p => p.type === 'best_e1rm');

  let isPR = false;
  let prType: 'max_weight' | 'max_reps' | 'best_e1rm' = 'best_e1rm';
  let previousValue = 0;

  // 1. Check Max Weight PR
  if (!bestWeightPR || weightKg > bestWeightPR.value) {
    isPR = true;
    prType = 'max_weight';
    previousValue = bestWeightPR ? bestWeightPR.value : 0;
  } 
  // 2. Check Best Estimated 1RM PR
  else if (!bestE1RMPR || currentE1RM > bestE1RMPR.value) {
    isPR = true;
    prType = 'best_e1rm';
    previousValue = bestE1RMPR ? bestE1RMPR.value : 0;
  }

  if (isPR) {
    const newPR: PersonalRecord = {
      id: `pr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      type: prType,
      value: prType === 'max_weight' ? weightKg : currentE1RM,
      weightKg,
      reps,
      estimated1RM: currentE1RM,
      date: new Date().toISOString(),
      previousValue,
      workoutSessionId: sessionId,
    };

    return { isPR: true, newPR, prType };
  }

  return { isPR: false };
}

// Trigger fireworks confetti and fanfare for PR
export function celebratePR(exerciseName: string, weightKg: number, reps: number) {
  audioService.playPRSound();

  try {
    // Canvas confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'],
    });
  } catch (e) {
    console.log('Confetti not available:', e);
  }
}
