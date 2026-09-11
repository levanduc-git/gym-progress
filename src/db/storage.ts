// ==========================================
// OFFLINE-FIRST PERSISTENCE LAYER & CRASH RECOVERY
// ==========================================

import { 
  UserProfile, 
  Program, 
  Exercise, 
  WorkoutSession, 
  PersonalRecord, 
  BodyMeasurement, 
  ProgressPhoto, 
  RestTimerState 
} from './schema';
import { SEED_EXERCISES, SEED_PROGRAMS } from './seedData';

const STORAGE_KEYS = {
  PROFILE: 'gym_progress_user_profile',
  PROGRAMS: 'gym_progress_programs',
  ACTIVE_PROGRAM_ID: 'gym_progress_active_program_id',
  EXERCISES: 'gym_progress_exercises',
  SESSIONS: 'gym_progress_sessions',
  ACTIVE_SESSION: 'gym_progress_active_session',
  PERSONAL_RECORDS: 'gym_progress_prs',
  MEASUREMENTS: 'gym_progress_measurements',
  PROGRESS_PHOTOS: 'gym_progress_photos',
  REST_TIMER: 'gym_progress_rest_timer',
  ONBOARDING_COMPLETED: 'gym_progress_onboarding_done',
  LAST_SYNC: 'gym_progress_last_sync',
};

// Safe LocalStorage helpers
function safeGetItem<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return defaultValue;
    return JSON.parse(data) as T;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return defaultValue;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

// 1. User Profile
export function getStoredProfile(): UserProfile {
  return safeGetItem<UserProfile>(STORAGE_KEYS.PROFILE, {
    id: 'user_default',
    name: 'Gym Athlete',
    gender: 'Nam',
    age: 25,
    heightCm: 175,
    weightKg: 72.5,
    goal: 'Tăng cơ',
    experience: 'Intermediate',
    trainingDaysPerWeek: 4,
    unit: 'kg',
    activeProgramId: 'prog_ppl_default',
    soundEnabled: true,
    hapticsEnabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export function saveStoredProfile(profile: UserProfile): void {
  safeSetItem(STORAGE_KEYS.PROFILE, profile);
}

// 2. Onboarding Status
export function isOnboardingCompleted(): boolean {
  return safeGetItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED, false);
}

export function setOnboardingCompleted(completed: boolean): void {
  safeSetItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed);
}

// 3. Programs
export function getStoredPrograms(): Program[] {
  const programs = safeGetItem<Program[]>(STORAGE_KEYS.PROGRAMS, []);
  if (programs.length === 0) {
    saveStoredPrograms(SEED_PROGRAMS);
    return SEED_PROGRAMS;
  }
  return programs;
}

export function saveStoredPrograms(programs: Program[]): void {
  safeSetItem(STORAGE_KEYS.PROGRAMS, programs);
}

export function getActiveProgramId(): string {
  return safeGetItem<string>(STORAGE_KEYS.ACTIVE_PROGRAM_ID, 'prog_ppl_default');
}

export function setActiveProgramId(id: string): void {
  safeSetItem(STORAGE_KEYS.ACTIVE_PROGRAM_ID, id);
}

const EXERCISE_VERSION_KEY = 'gym_progress_exercise_seed_v2_svg';

// 4. Exercises
export function getStoredExercises(): Exercise[] {
  const exercises = safeGetItem<Exercise[]>(STORAGE_KEYS.EXERCISES, []);
  const isUpgraded = safeGetItem<boolean>(EXERCISE_VERSION_KEY, false);

  if (exercises.length === 0 || !isUpgraded) {
    // Merge custom user-created exercises with newly upgraded seed exercises
    const customExercises = exercises.filter(e => e.isCustom);
    const updatedExercises = [...SEED_EXERCISES, ...customExercises];
    saveStoredExercises(updatedExercises);
    safeSetItem(EXERCISE_VERSION_KEY, true);
    return updatedExercises;
  }
  return exercises;
}

export function saveStoredExercises(exercises: Exercise[]): void {
  safeSetItem(STORAGE_KEYS.EXERCISES, exercises);
}

// 5. Workout Sessions (Past History)
export function getStoredSessions(): WorkoutSession[] {
  return safeGetItem<WorkoutSession[]>(STORAGE_KEYS.SESSIONS, []);
}

export function saveStoredSessions(sessions: WorkoutSession[]): void {
  safeSetItem(STORAGE_KEYS.SESSIONS, sessions);
}

// 6. Active Live Workout Session (For crash protection)
export function getStoredActiveSession(): WorkoutSession | null {
  return safeGetItem<WorkoutSession | null>(STORAGE_KEYS.ACTIVE_SESSION, null);
}

export function saveStoredActiveSession(session: WorkoutSession | null): void {
  safeSetItem(STORAGE_KEYS.ACTIVE_SESSION, session);
}

// 7. Personal Records
export function getStoredPRs(): PersonalRecord[] {
  return safeGetItem<PersonalRecord[]>(STORAGE_KEYS.PERSONAL_RECORDS, []);
}

export function saveStoredPRs(prs: PersonalRecord[]): void {
  safeSetItem(STORAGE_KEYS.PERSONAL_RECORDS, prs);
}

// 8. Body Measurements
export function getStoredMeasurements(): BodyMeasurement[] {
  return safeGetItem<BodyMeasurement[]>(STORAGE_KEYS.MEASUREMENTS, [
    {
      id: 'm_1',
      date: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0],
      weightKg: 70.0,
      bodyFatPercent: 18,
      chestCm: 96,
      waistCm: 80,
      armCm: 34,
      thighCm: 54,
    },
    {
      id: 'm_2',
      date: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
      weightKg: 71.2,
      bodyFatPercent: 17.5,
      chestCm: 97.5,
      waistCm: 79.5,
      armCm: 34.8,
      thighCm: 55,
    },
    {
      id: 'm_3',
      date: new Date().toISOString().split('T')[0],
      weightKg: 72.5,
      bodyFatPercent: 16.8,
      chestCm: 99,
      waistCm: 79,
      armCm: 35.5,
      thighCm: 56,
    }
  ]);
}

export function saveStoredMeasurements(measurements: BodyMeasurement[]): void {
  safeSetItem(STORAGE_KEYS.MEASUREMENTS, measurements);
}

// 9. Progress Photos
export function getStoredPhotos(): ProgressPhoto[] {
  return safeGetItem<ProgressPhoto[]>(STORAGE_KEYS.PROGRESS_PHOTOS, []);
}

export function saveStoredPhotos(photos: ProgressPhoto[]): void {
  safeSetItem(STORAGE_KEYS.PROGRESS_PHOTOS, photos);
}

// 10. Rest Timer State
export function getStoredRestTimer(): RestTimerState | null {
  return safeGetItem<RestTimerState | null>(STORAGE_KEYS.REST_TIMER, null);
}

export function saveStoredRestTimer(timer: RestTimerState | null): void {
  safeSetItem(STORAGE_KEYS.REST_TIMER, timer);
}

// 11. Backup & Restore (Full JSON Export / Import)
export function exportAllDataAsJson(): string {
  const data = {
    profile: getStoredProfile(),
    programs: getStoredPrograms(),
    activeProgramId: getActiveProgramId(),
    exercises: getStoredExercises(),
    sessions: getStoredSessions(),
    prs: getStoredPRs(),
    measurements: getStoredMeasurements(),
    photos: getStoredPhotos(),
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
  };
  return JSON.stringify(data, null, 2);
}

export function importAllDataFromJson(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.profile) saveStoredProfile(data.profile);
    if (data.programs) saveStoredPrograms(data.programs);
    if (data.activeProgramId) setActiveProgramId(data.activeProgramId);
    if (data.exercises) saveStoredExercises(data.exercises);
    if (data.sessions) saveStoredSessions(data.sessions);
    if (data.prs) saveStoredPRs(data.prs);
    if (data.measurements) saveStoredMeasurements(data.measurements);
    if (data.photos) saveStoredPhotos(data.photos);
    return true;
  } catch (err) {
    console.error('Failed to import backup:', err);
    return false;
  }
}
