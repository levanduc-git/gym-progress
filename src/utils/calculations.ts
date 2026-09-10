// ==========================================
// GYM CALCULATIONS & UTILITY FUNCTIONS
// ==========================================

import { SetLog, WorkoutSession } from '../db/schema';

// 1. Estimated 1 Rep Max (e1RM) using Brzycki & Epley formulas
export function calculateEstimated1RM(weightKg: number, reps: number): number {
  if (weightKg <= 0 || reps <= 0) return 0;
  if (reps === 1) return weightKg;
  
  // Brzycki formula for reps <= 10, Epley formula for higher reps
  let e1rm: number;
  if (reps <= 10) {
    e1rm = weightKg * (36 / (37 - reps));
  } else {
    e1rm = weightKg * (1 + 0.0333 * reps);
  }
  
  return Math.round(e1rm * 10) / 10;
}

// 2. Workout Total Volume (Kg)
export function calculateSessionVolume(sets: SetLog[]): number {
  return sets
    .filter(s => s.isCompleted && s.setType !== 'warmup')
    .reduce((acc, s) => acc + (s.weightKg * s.reps), 0);
}

// 3. Format seconds into MM:SS
export function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 4. Format Duration for Session (e.g. "52 min" or "1h 15m")
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} phút`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}p`;
}

// 5. Weight Unit Converter
export function kgToLb(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

export function lbToKg(lb: number): number {
  return Math.round((lb / 2.20462) * 10) / 10;
}

export function displayWeight(kg: number, unit: 'kg' | 'lb'): string {
  if (unit === 'lb') {
    return `${kgToLb(kg)} lb`;
  }
  return `${kg} kg`;
}

// 6. Workout Streak Calculator
export function calculateWorkoutStreak(sessions: WorkoutSession[]): number {
  if (!sessions || sessions.length === 0) return 0;
  
  // Sort sessions by start time descending
  const sortedSessions = [...sessions]
    .filter(s => s.status === 'completed')
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    
  if (sortedSessions.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Group workout dates (as YYYY-MM-DD)
  const workoutDates = new Set(
    sortedSessions.map(s => {
      const d = new Date(s.startTime);
      d.setHours(0, 0, 0, 0);
      return d.toISOString().split('T')[0];
    })
  );

  let currentStreak = 0;
  const checkDate = new Date(today);

  // If didn't work out today, check if worked out yesterday to keep streak alive
  const todayStr = checkDate.toISOString().split('T')[0];
  if (!workoutDates.has(todayStr)) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // Count backwards
  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (workoutDates.has(dateStr)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return currentStreak;
}

// 7. Parse rep range string (e.g. "8-12" -> { min: 8, max: 12 }, "5" -> { min: 5, max: 5 })
export function parseRepRange(rangeStr: string): { min: number; max: number } {
  if (!rangeStr) return { min: 8, max: 12 };
  const parts = rangeStr.split('-').map(p => parseInt(p.trim(), 10));
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return { min: parts[0], max: parts[1] };
  }
  if (parts.length === 1 && !isNaN(parts[0])) {
    return { min: parts[0], max: parts[0] };
  }
  return { min: 8, max: 12 };
}

// 8. RPE Description mapping
export const RPE_MAP: Record<number, { label: string; desc: string; color: string }> = {
  6: { label: 'RPE 6', desc: 'Có thể làm thêm 4 reps', color: '#10B981' },
  7: { label: 'RPE 7', desc: 'Có thể làm thêm 3 reps', color: '#34D399' },
  7.5: { label: 'RPE 7.5', desc: 'Chắc chắn 2 reps, có thể 3', color: '#60A5FA' },
  8: { label: 'RPE 8', desc: 'Có thể làm thêm 2 reps', color: '#3B82F6' },
  8.5: { label: 'RPE 8.5', desc: 'Chắc chắn 1 rep, có thể 2', color: '#F59E0B' },
  9: { label: 'RPE 9', desc: 'Chỉ có thể làm thêm 1 rep', color: '#F97316' },
  9.5: { label: 'RPE 9.5', desc: 'Không thể thêm rep, có thể tăng chút cân', color: '#EF4444' },
  10: { label: 'RPE 10', desc: 'Max nỗ lực! Chạm ngưỡng thất bại (Failure)', color: '#DC2626' },
};
