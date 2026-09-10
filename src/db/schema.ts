// ==========================================
// GYM PROGRESS DATA MODELS & ENTITY SCHEMAS
// ==========================================

export type MuscleGroup = 
  | 'Chest' 
  | 'Back' 
  | 'Shoulders' 
  | 'Legs' 
  | 'Biceps' 
  | 'Triceps' 
  | 'Core' 
  | 'Forearms' 
  | 'Calves' 
  | 'Full Body' 
  | 'Cardio';

export type EquipmentType = 
  | 'Barbell' 
  | 'Dumbbell' 
  | 'Cable' 
  | 'Machine' 
  | 'Bodyweight' 
  | 'Kettlebell' 
  | 'Smith Machine' 
  | 'Resistance Band' 
  | 'Other';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type FitnessGoal = 'Tăng cơ' | 'Tăng sức mạnh' | 'Giảm mỡ' | 'Duy trì';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type UnitSystem = 'kg' | 'lb';
export type Gender = 'Nam' | 'Nữ' | 'Khác' | 'Bỏ qua';

export type SetType = 'regular' | 'warmup' | 'dropset' | 'failure';

// 1. User Profile Model
export interface UserProfile {
  id: string;
  name: string;
  gender?: Gender;
  age?: number;
  heightCm?: number;
  weightKg?: number;
  goal: FitnessGoal;
  experience: ExperienceLevel;
  trainingDaysPerWeek: number;
  unit: UnitSystem;
  activeProgramId?: string;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// 2. Exercise Image System Model (Abstraction)
export interface ExerciseImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  fallbackSvg?: string;
  type: 'image' | 'gif' | 'svg';
  provider: 'local' | 'unsplash' | 'wger' | 'custom';
  altText: string;
}

// 3. Exercise Model (50+ standard & user custom)
export interface Exercise {
  id: string;
  name: string;
  primaryMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: EquipmentType;
  difficulty: DifficultyLevel;
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  images: ExerciseImage[];
  isCustom?: boolean;
  createdBy?: string;
  createdAt: string;
  targetMetric?: 'reps_weight' | 'time' | 'distance';
}

// 4. Workout Exercise (In a Program Template)
export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  targetSets: number;
  repRange: string; // e.g. "8-10", "12-15", "5"
  defaultRestSeconds: number; // e.g. 90, 120
  notes?: string;
  order: number;
}

// 5. Workout Day (e.g. "Push A", "Pull A", "Legs A")
export interface Workout {
  id: string;
  programId: string;
  dayNumber: number; // 1 to 7
  name: string; // e.g. "Push A (Chest & Triceps)"
  isRestDay?: boolean;
  exercises: WorkoutExercise[];
}

// 6. Program Model (e.g. "Push Pull Legs", "Upper / Lower")
export interface Program {
  id: string;
  name: string;
  description: string;
  type: 'PPL' | 'UpperLower' | 'FullBody' | 'Custom';
  daysPerWeek: number;
  isTemplate: boolean;
  isCustom: boolean;
  workouts: Workout[];
  createdAt: string;
  updatedAt: string;
}

// 7. Set Log (Individual Set in an active or past session)
export interface SetLog {
  id: string;
  sessionId: string;
  exerciseId: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  rpe?: number; // Rate of Perceived Exertion (6 to 10)
  setType: SetType;
  isCompleted: boolean;
  isPR?: boolean;
  prType?: 'max_weight' | 'max_reps' | 'best_e1rm';
  completedAt?: string;
  previousLog?: {
    weightKg: number;
    reps: number;
    rpe?: number;
  };
}

// 8. Workout Session (Live or Past Workout)
export interface WorkoutSession {
  id: string;
  workoutId?: string;
  workoutName: string;
  programId?: string;
  programName?: string;
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  totalVolumeKg: number;
  setsCompleted: number;
  rpeAvg?: number;
  notes?: string;
  status: 'in_progress' | 'completed' | 'cancelled';
  sets: SetLog[];
  newPRs?: PersonalRecord[];
  overloadRecommendations?: ProgressiveOverloadRecommendation[];
}

// 9. Personal Record Model
export interface PersonalRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  type: 'max_weight' | 'max_reps' | 'best_e1rm';
  value: number; // weight or reps or e1rm
  weightKg: number;
  reps: number;
  estimated1RM: number;
  date: string;
  previousValue?: number;
  workoutSessionId?: string;
}

// 10. Progressive Overload Recommendation
export interface ProgressiveOverloadRecommendation {
  id: string;
  exerciseId: string;
  exerciseName: string;
  previousPerformance: {
    weightKg: number;
    reps: number;
    sets: number;
  };
  currentPerformance: {
    weightKg: number;
    reps: number;
    sets: number;
  };
  recommendationType: 'increase_weight' | 'increase_reps' | 'increase_sets' | 'maintain' | 'deload';
  suggestedWeightKg: number;
  suggestedReps: string;
  reason: string;
  applied: boolean;
}

// 11. Body Measurement Model
export interface BodyMeasurement {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPercent?: number;
  chestCm?: number;
  waistCm?: number;
  armCm?: number;
  thighCm?: number;
  notes?: string;
}

// 12. Progress Photo Model
export interface ProgressPhoto {
  id: string;
  date: string;
  type: 'front' | 'side' | 'back';
  photoUrl: string;
  weightKg?: number;
  note?: string;
}

// 13. Rest Timer State
export interface RestTimerState {
  isActive: boolean;
  durationSeconds: number;
  remainingSeconds: number;
  exerciseName?: string;
  setNumber?: number;
  startedAt?: number;
}

// 14. Exercise History Item for Graph
export interface ExerciseHistoryPoint {
  date: string;
  weightKg: number;
  reps: number;
  estimated1RM: number;
  volumeKg: number;
  sessionId: string;
}
