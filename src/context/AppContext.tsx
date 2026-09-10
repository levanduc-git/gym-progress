// ==========================================
// CENTRAL APP STATE CONTEXT & HOOKS
// ==========================================

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { 
  UserProfile, 
  Program, 
  Exercise, 
  Workout,
  WorkoutSession, 
  SetLog, 
  PersonalRecord, 
  BodyMeasurement, 
  ProgressPhoto, 
  RestTimerState, 
  WorkoutExercise,
  ProgressiveOverloadRecommendation
} from '../db/schema';
import { 
  getStoredProfile, 
  saveStoredProfile, 
  getStoredPrograms, 
  saveStoredPrograms, 
  getActiveProgramId, 
  setActiveProgramId as saveActiveProgramId, 
  getStoredExercises, 
  saveStoredExercises, 
  getStoredSessions, 
  saveStoredSessions, 
  getStoredActiveSession, 
  saveStoredActiveSession, 
  getStoredPRs, 
  saveStoredPRs, 
  getStoredMeasurements, 
  saveStoredMeasurements, 
  getStoredPhotos, 
  saveStoredPhotos,
  isOnboardingCompleted,
  setOnboardingCompleted as saveOnboardingCompleted
} from '../db/storage';
import { audioService } from '../services/audioService';
import { checkForPersonalRecord, celebratePR } from '../services/prService';
import { analyzeProgressiveOverload } from '../services/overloadService';
import { calculateSessionVolume } from '../utils/calculations';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'pr';
  title: string;
  message?: string;
}

interface AppContextType {
  // 1. User & Settings
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isOnboarded: boolean;
  completeOnboarding: (newProfile: UserProfile, initialProgramId: string) => void;
  
  // 2. Programs
  programs: Program[];
  activeProgram: Program | undefined;
  setActiveProgram: (programId: string) => void;
  saveProgram: (program: Program) => void;
  deleteProgram: (programId: string) => void;
  duplicateProgram: (programId: string) => Program;

  // 3. Exercises
  exercises: Exercise[];
  addCustomExercise: (exercise: Omit<Exercise, 'id' | 'createdAt'>) => Exercise;
  updateExercise: (exercise: Exercise) => void;
  deleteExercise: (exerciseId: string) => void;

  // 4. Live Workout Session
  activeSession: WorkoutSession | null;
  startWorkout: (workout: Workout, program?: Program) => void;
  startEmptyWorkout: () => void;
  addSetToExercise: (exerciseId: string) => void;
  deleteSet: (setId: string) => void;
  updateSet: (setId: string, updates: Partial<SetLog>) => void;
  completeSet: (setId: string) => void;
  addExerciseToSession: (exercise: Exercise) => void;
  removeExerciseFromSession: (exerciseId: string) => void;
  cancelWorkout: () => void;
  finishWorkout: () => { session: WorkoutSession; recommendations: ProgressiveOverloadRecommendation[] };

  // 5. Rest Timer
  restTimer: RestTimerState | null;
  startRestTimer: (seconds: number, exerciseName?: string, setNumber?: number) => void;
  addRestSeconds: (seconds: number) => void;
  skipRestTimer: () => void;

  // 6. History & Records
  sessions: WorkoutSession[];
  deleteSession: (sessionId: string) => void;
  personalRecords: PersonalRecord[];
  
  // 7. Body Metrics & Photos
  measurements: BodyMeasurement[];
  addMeasurement: (measurement: Omit<BodyMeasurement, 'id'>) => void;
  deleteMeasurement: (id: string) => void;
  photos: ProgressPhoto[];
  addPhoto: (photo: Omit<ProgressPhoto, 'id'>) => void;
  deletePhoto: (id: string) => void;

  // 8. Toasts & Navigation
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  activeTab: 'home' | 'programs' | 'workout' | 'progress' | 'more';
  setActiveTab: (tab: 'home' | 'programs' | 'workout' | 'progress' | 'more') => void;
  
  // 9. Session Summary Modal
  completedSummarySession: WorkoutSession | null;
  closeSummaryModal: () => void;
  activePRModal: PersonalRecord | null;
  closePRModal: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(isOnboardingCompleted);
  const [programs, setPrograms] = useState<Program[]>(getStoredPrograms);
  const [activeProgramId, setActiveProgramIdState] = useState<string>(getActiveProgramId);
  const [exercises, setExercises] = useState<Exercise[]>(getStoredExercises);
  const [sessions, setSessions] = useState<WorkoutSession[]>(getStoredSessions);
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(getStoredActiveSession);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(getStoredPRs);
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>(getStoredMeasurements);
  const [photos, setPhotos] = useState<ProgressPhoto[]>(getStoredPhotos);
  const [restTimer, setRestTimer] = useState<RestTimerState | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'programs' | 'workout' | 'progress' | 'more'>('home');
  const [completedSummarySession, setCompletedSummarySession] = useState<WorkoutSession | null>(null);
  const [activePRModal, setActivePRModal] = useState<PersonalRecord | null>(null);

  // Sync sound & haptics settings with audio service
  useEffect(() => {
    audioService.setSoundEnabled(profile.soundEnabled);
    audioService.setHapticsEnabled(profile.hapticsEnabled);
  }, [profile.soundEnabled, profile.hapticsEnabled]);

  // Rest Timer Interval
  const restTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (restTimer && restTimer.isActive && restTimer.remainingSeconds > 0) {
      restTimerRef.current = window.setInterval(() => {
        setRestTimer(prev => {
          if (!prev || !prev.isActive) return null;
          const nextSec = prev.remainingSeconds - 1;

          // Sound cues
          if (nextSec === 3 || nextSec === 2 || nextSec === 1) {
            audioService.playCountdownBeep();
          } else if (nextSec === 0) {
            audioService.playTimerCompleteChime();
            showToast({
              type: 'info',
              title: 'Hết giờ nghỉ!',
              message: `Sẵn sàng cho hiệp tiếp theo${prev.exerciseName ? ` (${prev.exerciseName})` : ''}!`
            });
            return { ...prev, remainingSeconds: 0, isActive: false };
          }

          return { ...prev, remainingSeconds: nextSec };
        });
      }, 1000);
    } else {
      if (restTimerRef.current) {
        clearInterval(restTimerRef.current);
        restTimerRef.current = null;
      }
    }

    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    };
  }, [restTimer?.isActive, restTimer?.remainingSeconds]);

  // Workout Session elapsed time timer
  useEffect(() => {
    let sessionInterval: number | null = null;
    if (activeSession && activeSession.status === 'in_progress') {
      sessionInterval = window.setInterval(() => {
        setActiveSession(prev => {
          if (!prev || prev.status !== 'in_progress') return prev;
          const start = new Date(prev.startTime).getTime();
          const elapsedSecs = Math.max(0, Math.floor((Date.now() - start) / 1000));
          const updated = { ...prev, durationSeconds: elapsedSecs };
          saveStoredActiveSession(updated);
          return updated;
        });
      }, 1000);
    }
    return () => {
      if (sessionInterval) clearInterval(sessionInterval);
    };
  }, [activeSession?.status, activeSession?.startTime]);

  // Toast Helpers
  const showToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
    setToasts(prev => [...prev.slice(-3), { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // 1. User Profile Management
  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      saveStoredProfile(updated);
      return updated;
    });
    showToast({ type: 'success', title: 'Đã cập nhật hồ sơ' });
  }, [showToast]);

  const completeOnboarding = useCallback((newProfile: UserProfile, initialProgramId: string) => {
    const updated = { ...newProfile, activeProgramId: initialProgramId, updatedAt: new Date().toISOString() };
    setProfile(updated);
    saveStoredProfile(updated);
    setActiveProgramIdState(initialProgramId);
    saveActiveProgramId(initialProgramId);
    setIsOnboarded(true);
    saveOnboardingCompleted(true);
    showToast({ type: 'success', title: 'Chào mừng bạn đến với Gym Progress!' });
  }, [showToast]);

  // 2. Program Management
  const activeProgram = programs.find(p => p.id === activeProgramId) || programs[0];

  const setActiveProgram = useCallback((programId: string) => {
    setActiveProgramIdState(programId);
    saveActiveProgramId(programId);
    setProfile(prev => {
      const updated = { ...prev, activeProgramId: programId };
      saveStoredProfile(updated);
      return updated;
    });
    showToast({ type: 'info', title: 'Đã đổi chương trình tập' });
  }, [showToast]);

  const saveProgram = useCallback((program: Program) => {
    setPrograms(prev => {
      const index = prev.findIndex(p => p.id === program.id);
      let updated: Program[];
      if (index >= 0) {
        updated = [...prev];
        updated[index] = { ...program, updatedAt: new Date().toISOString() };
      } else {
        updated = [...prev, { ...program, updatedAt: new Date().toISOString() }];
      }
      saveStoredPrograms(updated);
      return updated;
    });
    showToast({ type: 'success', title: 'Đã lưu chương trình' });
  }, [showToast]);

  const deleteProgram = useCallback((programId: string) => {
    setPrograms(prev => {
      const updated = prev.filter(p => p.id !== programId);
      saveStoredPrograms(updated);
      return updated;
    });
    if (activeProgramId === programId && programs.length > 1) {
      const nextProg = programs.find(p => p.id !== programId);
      if (nextProg) setActiveProgram(nextProg.id);
    }
    showToast({ type: 'info', title: 'Đã xóa chương trình' });
  }, [activeProgramId, programs, setActiveProgram, showToast]);

  const duplicateProgram = useCallback((programId: string): Program => {
    const target = programs.find(p => p.id === programId);
    if (!target) throw new Error('Program not found');

    const cloned: Program = {
      ...target,
      id: `prog_custom_${Date.now()}`,
      name: `${target.name} (Bản sao)`,
      isTemplate: false,
      isCustom: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      workouts: target.workouts.map((w, wIdx) => ({
        ...w,
        id: `w_clone_${Date.now()}_${wIdx}`,
        programId: `prog_custom_${Date.now()}`,
        exercises: w.exercises.map((e, eIdx) => ({
          ...e,
          id: `we_clone_${Date.now()}_${wIdx}_${eIdx}`,
        }))
      }))
    };

    setPrograms(prev => {
      const updated = [...prev, cloned];
      saveStoredPrograms(updated);
      return updated;
    });
    showToast({ type: 'success', title: 'Đã nhân bản chương trình' });
    return cloned;
  }, [programs, showToast]);

  // 3. Exercise Management
  const addCustomExercise = useCallback((exData: Omit<Exercise, 'id' | 'createdAt'>): Exercise => {
    const newEx: Exercise = {
      ...exData,
      id: `ex_custom_${Date.now()}`,
      isCustom: true,
      createdBy: profile.id,
      createdAt: new Date().toISOString(),
    };
    setExercises(prev => {
      const updated = [newEx, ...prev];
      saveStoredExercises(updated);
      return updated;
    });
    showToast({ type: 'success', title: `Đã thêm bài tập ${newEx.name}` });
    return newEx;
  }, [profile.id, showToast]);

  const updateExercise = useCallback((exercise: Exercise) => {
    setExercises(prev => {
      const updated = prev.map(e => e.id === exercise.id ? exercise : e);
      saveStoredExercises(updated);
      return updated;
    });
    showToast({ type: 'success', title: 'Đã cập nhật bài tập' });
  }, [showToast]);

  const deleteExercise = useCallback((exerciseId: string) => {
    setExercises(prev => {
      const updated = prev.filter(e => e.id !== exerciseId);
      saveStoredExercises(updated);
      return updated;
    });
    showToast({ type: 'info', title: 'Đã xóa bài tập' });
  }, [showToast]);

  // 4. Live Workout Session Management
  const startWorkout = useCallback((workout: Workout, program?: Program) => {
    const prog = program || activeProgram;
    const sessionId = `session_${Date.now()}`;
    const initialSets: SetLog[] = [];

    // Find previous sessions to extract ghost data
    const completedPastSessions = sessions
      .filter(s => s.status === 'completed')
      .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

    workout.exercises.forEach(we => {
      const pastSets = completedPastSessions
        .map(s => s.sets.filter(st => st.exerciseId === we.exerciseId && st.isCompleted && st.setType !== 'warmup'))
        .find(stList => stList.length > 0) || [];

      for (let i = 1; i <= we.targetSets; i++) {
        const prev = pastSets[i - 1] || pastSets[0];
        initialSets.push({
          id: `set_${sessionId}_${we.exerciseId}_${i}`,
          sessionId,
          exerciseId: we.exerciseId,
          setNumber: i,
          weightKg: prev ? prev.weightKg : (profile.experience === 'Beginner' ? 20 : 40),
          reps: prev ? prev.reps : 10,
          rpe: 8,
          setType: 'regular',
          isCompleted: false,
          previousLog: prev ? { weightKg: prev.weightKg, reps: prev.reps, rpe: prev.rpe } : undefined,
        });
      }
    });

    const newSession: WorkoutSession = {
      id: sessionId,
      workoutId: workout.id,
      workoutName: workout.name,
      programId: prog?.id,
      programName: prog?.name,
      startTime: new Date().toISOString(),
      durationSeconds: 0,
      totalVolumeKg: 0,
      setsCompleted: 0,
      status: 'in_progress',
      sets: initialSets,
    };

    setActiveSession(newSession);
    saveStoredActiveSession(newSession);
    setActiveTab('workout');
    showToast({ type: 'info', title: `Bắt đầu buổi tập: ${workout.name}` });
  }, [activeProgram, profile.experience, sessions, showToast]);

  const startEmptyWorkout = useCallback(() => {
    const sessionId = `session_${Date.now()}`;
    const newSession: WorkoutSession = {
      id: sessionId,
      workoutName: 'Buổi tập tự do (Quick Workout)',
      startTime: new Date().toISOString(),
      durationSeconds: 0,
      totalVolumeKg: 0,
      setsCompleted: 0,
      status: 'in_progress',
      sets: [],
    };
    setActiveSession(newSession);
    saveStoredActiveSession(newSession);
    setActiveTab('workout');
  }, []);

  const addSetToExercise = useCallback((exerciseId: string) => {
    if (!activeSession) return;
    const currentSets = activeSession.sets.filter(s => s.exerciseId === exerciseId);
    const nextSetNumber = currentSets.length + 1;
    const lastSet = currentSets[currentSets.length - 1];

    const newSet: SetLog = {
      id: `set_${activeSession.id}_${exerciseId}_${nextSetNumber}_${Date.now()}`,
      sessionId: activeSession.id,
      exerciseId,
      setNumber: nextSetNumber,
      weightKg: lastSet ? lastSet.weightKg : 40,
      reps: lastSet ? lastSet.reps : 10,
      rpe: lastSet?.rpe || 8,
      setType: 'regular',
      isCompleted: false,
      previousLog: lastSet?.previousLog,
    };

    const updatedSession = {
      ...activeSession,
      sets: [...activeSession.sets, newSet]
    };
    setActiveSession(updatedSession);
    saveStoredActiveSession(updatedSession);
    audioService.triggerHaptic('light');
  }, [activeSession]);

  const deleteSet = useCallback((setId: string) => {
    if (!activeSession) return;
    const set = activeSession.sets.find(s => s.id === setId);
    if (!set) return;

    const remainingSets = activeSession.sets
      .filter(s => s.id !== setId)
      .map(s => {
        if (s.exerciseId === set.exerciseId && s.setNumber > set.setNumber) {
          return { ...s, setNumber: s.setNumber - 1 };
        }
        return s;
      });

    const updatedSession = {
      ...activeSession,
      sets: remainingSets,
      setsCompleted: remainingSets.filter(s => s.isCompleted).length,
      totalVolumeKg: calculateSessionVolume(remainingSets),
    };
    setActiveSession(updatedSession);
    saveStoredActiveSession(updatedSession);
  }, [activeSession]);

  const updateSet = useCallback((setId: string, updates: Partial<SetLog>) => {
    if (!activeSession) return;
    const updatedSets = activeSession.sets.map(s => s.id === setId ? { ...s, ...updates } : s);
    const updatedSession = {
      ...activeSession,
      sets: updatedSets,
      totalVolumeKg: calculateSessionVolume(updatedSets),
    };
    setActiveSession(updatedSession);
    saveStoredActiveSession(updatedSession);
  }, [activeSession]);

  // Complete set with auto rest timer & PR check
  const completeSet = useCallback((setId: string) => {
    if (!activeSession) return;
    const targetSet = activeSession.sets.find(s => s.id === setId);
    if (!targetSet) return;

    const newCompletedState = !targetSet.isCompleted;
    let isPRFound = false;
    let detectedPR: PersonalRecord | undefined = undefined;

    const exercise = exercises.find(e => e.id === targetSet.exerciseId);

    if (newCompletedState && exercise) {
      // Check PR
      const updatedSetTemp = { ...targetSet, isCompleted: true, completedAt: new Date().toISOString() };
      const prResult = checkForPersonalRecord(updatedSetTemp, exercise, personalRecords, activeSession.id);
      
      if (prResult.isPR && prResult.newPR) {
        isPRFound = true;
        detectedPR = prResult.newPR;
        
        // Save PR to state & storage
        setPersonalRecords(prev => {
          const updated = [prResult.newPR!, ...prev];
          saveStoredPRs(updated);
          return updated;
        });

        // Trigger Celebration
        celebratePR(exercise.name, targetSet.weightKg, targetSet.reps);
        setActivePRModal(prResult.newPR);
      } else {
        audioService.triggerHaptic('success');
      }

      // Auto start rest timer
      startRestTimer(90, exercise.name, targetSet.setNumber);
    }

    const updatedSets = activeSession.sets.map(s => {
      if (s.id === setId) {
        return {
          ...s,
          isCompleted: newCompletedState,
          isPR: isPRFound,
          completedAt: newCompletedState ? new Date().toISOString() : undefined,
        };
      }
      return s;
    });

    const updatedSession: WorkoutSession = {
      ...activeSession,
      sets: updatedSets,
      setsCompleted: updatedSets.filter(s => s.isCompleted).length,
      totalVolumeKg: calculateSessionVolume(updatedSets),
      newPRs: detectedPR ? [...(activeSession.newPRs || []), detectedPR] : activeSession.newPRs,
    };

    setActiveSession(updatedSession);
    saveStoredActiveSession(updatedSession);
  }, [activeSession, exercises, personalRecords]);

  const addExerciseToSession = useCallback((exercise: Exercise) => {
    if (!activeSession) return;
    const initialSets: SetLog[] = [1, 2, 3].map(setNum => ({
      id: `set_${activeSession.id}_${exercise.id}_${setNum}_${Date.now()}`,
      sessionId: activeSession.id,
      exerciseId: exercise.id,
      setNumber: setNum,
      weightKg: 30,
      reps: 10,
      rpe: 8,
      setType: 'regular',
      isCompleted: false,
    }));

    const updatedSession = {
      ...activeSession,
      sets: [...activeSession.sets, ...initialSets],
    };
    setActiveSession(updatedSession);
    saveStoredActiveSession(updatedSession);
    showToast({ type: 'success', title: `Đã thêm ${exercise.name} vào buổi tập` });
  }, [activeSession, showToast]);

  const removeExerciseFromSession = useCallback((exerciseId: string) => {
    if (!activeSession) return;
    const updatedSets = activeSession.sets.filter(s => s.exerciseId !== exerciseId);
    const updatedSession = {
      ...activeSession,
      sets: updatedSets,
      setsCompleted: updatedSets.filter(s => s.isCompleted).length,
      totalVolumeKg: calculateSessionVolume(updatedSets),
    };
    setActiveSession(updatedSession);
    saveStoredActiveSession(updatedSession);
  }, [activeSession]);

  const cancelWorkout = useCallback(() => {
    setActiveSession(null);
    saveStoredActiveSession(null);
    setRestTimer(null);
    setActiveTab('home');
    showToast({ type: 'info', title: 'Đã hủy buổi tập' });
  }, [showToast]);

  const finishWorkout = useCallback(() => {
    if (!activeSession) throw new Error('No active workout');

    const completedSets = activeSession.sets.filter(s => s.isCompleted);
    const totalVolume = calculateSessionVolume(completedSets);
    const endTime = new Date().toISOString();

    const rpes = completedSets.map(s => s.rpe || 8).filter(Boolean);
    const rpeAvg = rpes.length > 0 ? Math.round((rpes.reduce((a, b) => a + b, 0) / rpes.length) * 10) / 10 : 8;

    const completedSession: WorkoutSession = {
      ...activeSession,
      status: 'completed',
      endTime,
      totalVolumeKg: totalVolume,
      setsCompleted: completedSets.length,
      rpeAvg,
    };

    // Analyze Progressive Overload recommendations
    const recommendations = analyzeProgressiveOverload(completedSession, sessions, exercises);
    completedSession.overloadRecommendations = recommendations;

    // Save session to history
    setSessions(prev => {
      const updated = [completedSession, ...prev];
      saveStoredSessions(updated);
      return updated;
    });

    // Clear active session
    setActiveSession(null);
    saveStoredActiveSession(null);
    setRestTimer(null);

    // Show summary modal
    setCompletedSummarySession(completedSession);
    audioService.playPRSound();

    return { session: completedSession, recommendations };
  }, [activeSession, exercises, sessions]);

  // 5. Rest Timer Controls
  const startRestTimer = useCallback((seconds: number, exerciseName?: string, setNumber?: number) => {
    setRestTimer({
      isActive: true,
      durationSeconds: seconds,
      remainingSeconds: seconds,
      exerciseName,
      setNumber,
      startedAt: Date.now(),
    });
  }, []);

  const addRestSeconds = useCallback((seconds: number) => {
    setRestTimer(prev => {
      if (!prev) return null;
      return {
        ...prev,
        remainingSeconds: prev.remainingSeconds + seconds,
        durationSeconds: prev.durationSeconds + seconds,
      };
    });
    audioService.triggerHaptic('light');
  }, []);

  const skipRestTimer = useCallback(() => {
    setRestTimer(null);
    audioService.triggerHaptic('light');
  }, []);

  // 6. History Management
  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => {
      const updated = prev.filter(s => s.id !== sessionId);
      saveStoredSessions(updated);
      return updated;
    });
    showToast({ type: 'info', title: 'Đã xóa buổi tập khỏi lịch sử' });
  }, [showToast]);

  // 7. Body Tracker & Photos
  const addMeasurement = useCallback((data: Omit<BodyMeasurement, 'id'>) => {
    const newM: BodyMeasurement = {
      ...data,
      id: `m_${Date.now()}`,
    };
    setMeasurements(prev => {
      const updated = [newM, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      saveStoredMeasurements(updated);
      return updated;
    });
    showToast({ type: 'success', title: 'Đã lưu số đo cơ thể' });
  }, [showToast]);

  const deleteMeasurement = useCallback((id: string) => {
    setMeasurements(prev => {
      const updated = prev.filter(m => m.id !== id);
      saveStoredMeasurements(updated);
      return updated;
    });
    showToast({ type: 'info', title: 'Đã xóa số đo' });
  }, [showToast]);

  const addPhoto = useCallback((data: Omit<ProgressPhoto, 'id'>) => {
    const newP: ProgressPhoto = {
      ...data,
      id: `photo_${Date.now()}`,
    };
    setPhotos(prev => {
      const updated = [newP, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      saveStoredPhotos(updated);
      return updated;
    });
    showToast({ type: 'success', title: 'Đã thêm ảnh tiến độ' });
  }, [showToast]);

  const deletePhoto = useCallback((id: string) => {
    setPhotos(prev => {
      const updated = prev.filter(p => p.id !== id);
      saveStoredPhotos(updated);
      return updated;
    });
    showToast({ type: 'info', title: 'Đã xóa ảnh' });
  }, [showToast]);

  const closeSummaryModal = useCallback(() => {
    setCompletedSummarySession(null);
    setActiveTab('home');
  }, []);

  const closePRModal = useCallback(() => {
    setActivePRModal(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        isOnboarded,
        completeOnboarding,
        programs,
        activeProgram,
        setActiveProgram,
        saveProgram,
        deleteProgram,
        duplicateProgram,
        exercises,
        addCustomExercise,
        updateExercise,
        deleteExercise,
        activeSession,
        startWorkout,
        startEmptyWorkout,
        addSetToExercise,
        deleteSet,
        updateSet,
        completeSet,
        addExerciseToSession,
        removeExerciseFromSession,
        cancelWorkout,
        finishWorkout,
        restTimer,
        startRestTimer,
        addRestSeconds,
        skipRestTimer,
        sessions,
        deleteSession,
        personalRecords,
        measurements,
        addMeasurement,
        deleteMeasurement,
        photos,
        addPhoto,
        deletePhoto,
        toasts,
        showToast,
        removeToast,
        activeTab,
        setActiveTab,
        completedSummarySession,
        closeSummaryModal,
        activePRModal,
        closePRModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
