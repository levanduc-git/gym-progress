import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Program, Workout, WorkoutExercise, Exercise } from '../../db/schema';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  ChevronLeft, 
  Save, 
  Dumbbell, 
  Clock, 
  Layers, 
  HelpCircle,
  X
} from 'lucide-react';

interface ProgramBuilderProps {
  initialProgram?: Program;
  onClose: () => void;
}

export const ProgramBuilder: React.FC<ProgramBuilderProps> = ({ initialProgram, onClose }) => {
  const { exercises, saveProgram } = useApp();

  const [name, setName] = useState<string>(initialProgram?.name || 'Giáo án mới (Custom)');
  const [description, setDescription] = useState<string>(initialProgram?.description || 'Chương trình tập luyện cá nhân hóa');
  const [daysPerWeek, setDaysPerWeek] = useState<number>(initialProgram?.daysPerWeek || 4);
  const [workouts, setWorkouts] = useState<Workout[]>(
    initialProgram?.workouts || [
      {
        id: `w_${Date.now()}_1`,
        programId: initialProgram?.id || 'temp',
        dayNumber: 1,
        name: 'Day 1 — Chest & Triceps',
        exercises: [],
      },
      {
        id: `w_${Date.now()}_2`,
        programId: initialProgram?.id || 'temp',
        dayNumber: 2,
        name: 'Day 2 — Back & Biceps',
        exercises: [],
      },
      {
        id: `w_${Date.now()}_3`,
        programId: initialProgram?.id || 'temp',
        dayNumber: 3,
        name: 'Day 3 — Legs & Shoulders',
        exercises: [],
      },
      {
        id: `w_${Date.now()}_4`,
        programId: initialProgram?.id || 'temp',
        dayNumber: 4,
        name: 'Day 4 — Rest Day',
        isRestDay: true,
        exercises: [],
      },
    ]
  );

  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);
  const [isExercisePickerOpen, setIsExercisePickerOpen] = useState<boolean>(false);
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState<string>('');
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState<string>('All');

  // Handle save
  const handleSave = () => {
    if (!name.trim()) return;

    const programToSave: Program = {
      id: initialProgram?.id || `prog_custom_${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      type: 'Custom',
      daysPerWeek,
      isTemplate: false,
      isCustom: true,
      createdAt: initialProgram?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      workouts: workouts.map((w, idx) => ({
        ...w,
        dayNumber: idx + 1,
      })),
    };

    saveProgram(programToSave);
    onClose();
  };

  // Add workout day
  const handleAddDay = () => {
    const nextDayNum = workouts.length + 1;
    const newDay: Workout = {
      id: `w_${Date.now()}_${nextDayNum}`,
      programId: initialProgram?.id || 'temp',
      dayNumber: nextDayNum,
      name: `Day ${nextDayNum} — Workout`,
      exercises: [],
    };
    setWorkouts([...workouts, newDay]);
    setActiveDayIdx(workouts.length);
  };

  // Remove workout day
  const handleRemoveDay = (dayIdx: number) => {
    if (workouts.length <= 1) return;
    const updated = workouts.filter((_, i) => i !== dayIdx);
    setWorkouts(updated);
    setActiveDayIdx(Math.max(0, dayIdx - 1));
  };

  // Toggle Rest day
  const handleToggleRestDay = (dayIdx: number) => {
    const updated = [...workouts];
    const isRest = !updated[dayIdx].isRestDay;
    updated[dayIdx] = {
      ...updated[dayIdx],
      isRestDay: isRest,
      name: isRest ? `Day ${dayIdx + 1} — Rest Day` : `Day ${dayIdx + 1} — Workout`,
      exercises: isRest ? [] : updated[dayIdx].exercises,
    };
    setWorkouts(updated);
  };

  // Add exercise to active day
  const handleAddExerciseToActiveDay = (exercise: Exercise) => {
    const updated = [...workouts];
    const currentExercises = updated[activeDayIdx].exercises;

    const newWorkoutEx: WorkoutExercise = {
      id: `we_${Date.now()}_${exercise.id}`,
      exerciseId: exercise.id,
      targetSets: 3,
      repRange: '8-12',
      defaultRestSeconds: 90,
      order: currentExercises.length + 1,
    };

    updated[activeDayIdx] = {
      ...updated[activeDayIdx],
      exercises: [...currentExercises, newWorkoutEx],
    };

    setWorkouts(updated);
    setIsExercisePickerOpen(false);
  };

  // Update exercise properties
  const handleUpdateExercise = (exIdx: number, updates: Partial<WorkoutExercise>) => {
    const updated = [...workouts];
    const currentExercises = [...updated[activeDayIdx].exercises];
    currentExercises[exIdx] = { ...currentExercises[exIdx], ...updates };
    updated[activeDayIdx].exercises = currentExercises;
    setWorkouts(updated);
  };

  // Remove exercise from active day
  const handleRemoveExercise = (exIdx: number) => {
    const updated = [...workouts];
    updated[activeDayIdx].exercises = updated[activeDayIdx].exercises.filter((_, i) => i !== exIdx);
    setWorkouts(updated);
  };

  // Move exercise up/down
  const handleMoveExercise = (exIdx: number, direction: 'up' | 'down') => {
    const currentExercises = [...workouts[activeDayIdx].exercises];
    const targetIdx = direction === 'up' ? exIdx - 1 : exIdx + 1;
    if (targetIdx < 0 || targetIdx >= currentExercises.length) return;

    const temp = currentExercises[exIdx];
    currentExercises[exIdx] = currentExercises[targetIdx];
    currentExercises[targetIdx] = temp;

    const updated = [...workouts];
    updated[activeDayIdx].exercises = currentExercises;
    setWorkouts(updated);
  };

  const currentWorkout = workouts[activeDayIdx];

  // Filter exercises for picker modal
  const filteredExercises = exercises.filter(ex => {
    const matchSearch = ex.name.toLowerCase().includes(exerciseSearchQuery.toLowerCase());
    const matchMuscle = selectedMuscleFilter === 'All' || ex.primaryMuscle === selectedMuscleFilter;
    return matchSearch && matchMuscle;
  });

  return (
    <div className="fixed inset-0 z-50 bg-dark-950 flex flex-col max-w-md mx-auto overflow-hidden animate-scale-in">
      {/* Top Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-dark-900/90 backdrop-blur">
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-dark-850 border border-white/10 text-gray-400 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-black text-white">
          {initialProgram ? 'Chỉnh sửa giáo án' : 'Tạo giáo án tùy chỉnh'}
        </h2>
        <button
          onClick={handleSave}
          className="px-3.5 py-1.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-primary-500/20"
        >
          <Save className="w-4 h-4" />
          <span>Lưu</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Basic Program Info */}
        <div className="space-y-3 bg-dark-900 p-4 rounded-2xl border border-white/5">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Tên chương trình
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Hypertrophy 5 Days, Strength Building..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-white font-bold text-sm focus:outline-none focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Mô tả ngắn
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Mục tiêu tập luyện, số tuần áp dụng..."
              className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:outline-none focus:border-primary-500 resize-none"
            />
          </div>
        </div>

        {/* Days Horizontal Tab Selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              Các ngày trong tuần ({workouts.length} ngày)
            </span>
            <button
              onClick={handleAddDay}
              className="text-xs text-primary-400 font-bold flex items-center space-x-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm ngày</span>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {workouts.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => setActiveDayIdx(idx)}
                className={`px-3 py-2 rounded-xl border text-xs font-bold shrink-0 transition-all ${
                  activeDayIdx === idx
                    ? 'bg-primary-500/20 border-primary-500 text-primary-400 shadow-sm'
                    : 'bg-dark-900 border-white/10 text-gray-400'
                }`}
              >
                Day {idx + 1} {w.isRestDay ? '😴' : '🏋️'}
              </button>
            ))}
          </div>
        </div>

        {/* Active Workout Day Editor */}
        {currentWorkout && (
          <div className="bg-dark-900 border border-white/10 rounded-2xl p-4 space-y-4">
            {/* Day Title & Rest Day Toggle */}
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={currentWorkout.name}
                onChange={(e) => {
                  const updated = [...workouts];
                  updated[activeDayIdx].name = e.target.value;
                  setWorkouts(updated);
                }}
                className="flex-1 px-3 py-1.5 rounded-xl bg-dark-850 border border-white/10 text-white font-bold text-sm focus:outline-none focus:border-primary-500"
              />
              <button
                onClick={() => handleToggleRestDay(activeDayIdx)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shrink-0 ${
                  currentWorkout.isRestDay
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                    : 'bg-dark-850 border-white/10 text-gray-400'
                }`}
              >
                {currentWorkout.isRestDay ? 'Ngày nghỉ ✓' : 'Nghỉ ngơi?'}
              </button>
              {workouts.length > 1 && (
                <button
                  onClick={() => handleRemoveDay(activeDayIdx)}
                  className="p-2 rounded-xl bg-dark-850 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/10 shrink-0"
                  title="Xóa ngày này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Exercise List for Day */}
            {!currentWorkout.isRestDay ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">
                    Danh sách bài tập ({currentWorkout.exercises.length})
                  </span>
                  <button
                    onClick={() => setIsExercisePickerOpen(true)}
                    className="px-2.5 py-1 rounded-lg bg-primary-500/20 border border-primary-500/40 text-primary-400 text-xs font-bold flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm bài tập</span>
                  </button>
                </div>

                {currentWorkout.exercises.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
                    <Dumbbell className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                    <p className="text-xs text-gray-400">Chưa có bài tập nào trong ngày này.</p>
                    <button
                      onClick={() => setIsExercisePickerOpen(true)}
                      className="mt-3 px-3 py-1.5 rounded-xl bg-primary-500 text-dark-950 font-bold text-xs"
                    >
                      + Chọn bài tập từ thư viện
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {currentWorkout.exercises.map((we, exIdx) => {
                      const ex = exercises.find(e => e.id === we.exerciseId);
                      return (
                        <div
                          key={we.id}
                          className="p-3 rounded-xl bg-dark-850 border border-white/10 space-y-2.5 shadow-sm"
                        >
                          {/* Exercise Header & Order Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="w-5 h-5 rounded-full bg-dark-750 text-[10px] font-bold text-primary-400 flex items-center justify-center">
                                {exIdx + 1}
                              </span>
                              <h4 className="font-bold text-white text-xs truncate max-w-[170px]">
                                {ex?.name || 'Bài tập'}
                              </h4>
                            </div>

                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => handleMoveExercise(exIdx, 'up')}
                                disabled={exIdx === 0}
                                className="p-1 rounded bg-dark-800 disabled:opacity-20 text-gray-400"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleMoveExercise(exIdx, 'down')}
                                disabled={exIdx === currentWorkout.exercises.length - 1}
                                className="p-1 rounded bg-dark-800 disabled:opacity-20 text-gray-400"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleRemoveExercise(exIdx)}
                                className="p-1 rounded bg-dark-800 text-rose-400 hover:bg-rose-500/20"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Sets, Rep Range, Rest Seconds */}
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            {/* Target Sets */}
                            <div className="bg-dark-900 p-2 rounded-lg border border-white/5">
                              <span className="text-[10px] text-gray-400 block mb-0.5">Số Sets</span>
                              <input
                                type="number"
                                min={1}
                                max={10}
                                value={we.targetSets}
                                onChange={(e) => handleUpdateExercise(exIdx, { targetSets: parseInt(e.target.value) || 3 })}
                                className="w-full bg-transparent font-bold text-white focus:outline-none"
                              />
                            </div>

                            {/* Rep Range */}
                            <div className="bg-dark-900 p-2 rounded-lg border border-white/5">
                              <span className="text-[10px] text-gray-400 block mb-0.5">Reps</span>
                              <input
                                type="text"
                                value={we.repRange}
                                onChange={(e) => handleUpdateExercise(exIdx, { repRange: e.target.value })}
                                placeholder="8-12"
                                className="w-full bg-transparent font-bold text-white focus:outline-none"
                              />
                            </div>

                            {/* Rest Time */}
                            <div className="bg-dark-900 p-2 rounded-lg border border-white/5">
                              <span className="text-[10px] text-gray-400 block mb-0.5">Nghỉ (giây)</span>
                              <input
                                type="number"
                                step={15}
                                value={we.defaultRestSeconds}
                                onChange={(e) => handleUpdateExercise(exIdx, { defaultRestSeconds: parseInt(e.target.value) || 90 })}
                                className="w-full bg-transparent font-bold text-white focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Notes */}
                          <input
                            type="text"
                            value={we.notes || ''}
                            onChange={(e) => handleUpdateExercise(exIdx, { notes: e.target.value })}
                            placeholder="Ghi chú kỹ thuật (VD: RPE 8, hạ tạ chậm...)"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-dark-900 border border-white/5 text-[11px] text-gray-300 focus:outline-none focus:border-primary-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 bg-dark-950/40 rounded-xl border border-white/5">
                <p className="text-xs text-blue-400 font-semibold">Đây là ngày nghỉ phục hồi thể lực.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Exercise Picker Modal */}
      {isExercisePickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-dark-900 border-t border-white/10 rounded-t-3xl max-h-[80vh] flex flex-col p-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-white text-sm">Chọn bài tập từ thư viện</h3>
              <button
                onClick={() => setIsExercisePickerOpen(false)}
                className="p-1.5 rounded-full bg-dark-800 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="py-3 space-y-2">
              <input
                type="text"
                value={exerciseSearchQuery}
                onChange={(e) => setExerciseSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài tập..."
                className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-xs text-white focus:outline-none focus:border-primary-500"
              />

              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {['All', 'Chest', 'Back', 'Shoulders', 'Legs', 'Biceps', 'Triceps', 'Core'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMuscleFilter(m)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all ${
                      selectedMuscleFilter === m
                        ? 'bg-primary-500 text-dark-950'
                        : 'bg-dark-800 text-gray-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 py-2">
              {filteredExercises.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => handleAddExerciseToActiveDay(ex)}
                  className="p-3 rounded-xl bg-dark-850 border border-white/5 hover:border-primary-500/50 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <h4 className="font-bold text-xs text-white">{ex.name}</h4>
                    <p className="text-[10px] text-gray-400">
                      {ex.primaryMuscle} • {ex.equipment}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-primary-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
