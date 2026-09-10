import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Exercise } from '../../db/schema';
import { SetLogger } from './SetLogger';
import { RestTimerBar } from './RestTimerBar';
import { PRCelebrationModal } from './PRCelebrationModal';
import { WorkoutSummaryModal } from './WorkoutSummaryModal';
import { ExerciseDetailModal } from '../exercises/ExerciseDetailModal';
import { 
  Play, 
  Clock, 
  TrendingUp, 
  Plus, 
  CheckCircle, 
  X, 
  AlertCircle, 
  Dumbbell, 
  ChevronDown, 
  Info, 
  Sparkles,
  Layers
} from 'lucide-react';
import { formatDuration, displayWeight } from '../../utils/calculations';
import { getMuscleSvgFallback } from '../../utils/imageProvider';

export const WorkoutSession: React.FC = () => {
  const { 
    activeSession, 
    finishWorkout, 
    cancelWorkout, 
    addSetToExercise, 
    deleteSet, 
    updateSet, 
    completeSet, 
    addExerciseToSession, 
    removeExerciseFromSession, 
    exercises, 
    profile, 
    startEmptyWorkout,
    setActiveTab
  } = useApp();

  const [selectedExerciseDetail, setSelectedExerciseDetail] = useState<Exercise | null>(null);
  const [isExercisePickerOpen, setIsExercisePickerOpen] = useState<boolean>(false);
  const [pickerSearch, setPickerSearch] = useState<string>('');

  if (!activeSession) {
    return (
      <div className="p-6 text-center space-y-6 my-auto animate-scale-in">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-dark-900 border border-white/10 flex items-center justify-center text-primary-400 shadow-xl">
          <Dumbbell className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-white">Chưa có buổi tập nào đang diễn ra</h2>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Hãy chọn một buổi tập từ giáo án của bạn hoặc bắt đầu một buổi tập tự do ngay bây giờ.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => setActiveTab('programs')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-400 text-dark-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-primary-500/25 active:scale-95 transition-all"
          >
            <Layers className="w-4 h-4" />
            <span>XEM GIÁO ÁN ĐỂ CHỌN BUỔI TẬP</span>
          </button>

          <button
            onClick={startEmptyWorkout}
            className="w-full py-3.5 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-white/10 text-gray-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
          >
            <Plus className="w-4 h-4 text-primary-400" />
            <span>Bắt đầu buổi tập tự do (Quick Start)</span>
          </button>
        </div>
      </div>
    );
  }

  // Group active session sets by exercise
  const exerciseIds = Array.from(new Set(activeSession.sets.map(s => s.exerciseId)));

  const handleFinish = () => {
    const completedCount = activeSession.sets.filter(s => s.isCompleted).length;
    if (completedCount === 0) {
      if (!confirm('Bạn chưa đánh dấu hoàn thành set nào. Bạn có chắc muốn kết thúc buổi tập?')) {
        return;
      }
    }
    finishWorkout();
  };

  const handleCancel = () => {
    if (confirm('Bạn có chắc muốn hủy buổi tập hiện tại? Dữ liệu hiệp tập chưa hoàn thành sẽ bị xóa.')) {
      cancelWorkout();
    }
  };

  return (
    <div className="p-4 space-y-4 pb-28 animate-scale-in relative">
      {/* Top Floating Active Workout Info Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border border-emerald-500/40 shadow-xl space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                Đang trong buổi tập
              </span>
            </div>
            <h2 className="text-lg font-black text-white tracking-tight">{activeSession.workoutName}</h2>
          </div>

          <button
            onClick={handleCancel}
            className="p-1.5 rounded-xl bg-dark-800 text-gray-400 hover:text-rose-400 border border-white/5"
            title="Hủy buổi tập"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Counters Grid */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-white/5 text-xs">
          <div className="bg-dark-950/60 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block font-bold">Thời gian</span>
            <span className="font-mono font-black text-white text-sm">
              {formatDuration(activeSession.durationSeconds)}
            </span>
          </div>

          <div className="bg-dark-950/60 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block font-bold">Volume</span>
            <span className="font-mono font-black text-primary-400 text-sm">
              {activeSession.totalVolumeKg} {profile.unit}
            </span>
          </div>

          <div className="bg-dark-950/60 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block font-bold">Sets đã xong</span>
            <span className="font-mono font-black text-white text-sm">
              {activeSession.setsCompleted} / {activeSession.sets.length}
            </span>
          </div>
        </div>
      </div>

      {/* Exercises & Set Logging Area */}
      <div className="space-y-4">
        {exerciseIds.length === 0 ? (
          <div className="p-8 text-center bg-dark-900 border border-dashed border-white/10 rounded-2xl space-y-3">
            <Dumbbell className="w-8 h-8 mx-auto text-gray-600" />
            <p className="text-xs text-gray-400">Buổi tập chưa có bài nào. Hãy thêm bài tập ngay!</p>
            <button
              onClick={() => setIsExercisePickerOpen(true)}
              className="px-4 py-2 rounded-xl bg-primary-500 text-dark-950 font-bold text-xs"
            >
              + Chọn bài tập
            </button>
          </div>
        ) : (
          exerciseIds.map(exId => {
            const exercise = exercises.find(e => e.id === exId);
            const exerciseSets = activeSession.sets.filter(s => s.exerciseId === exId);
            if (!exercise) return null;

            const fallbackSvg = getMuscleSvgFallback(exercise.primaryMuscle);

            return (
              <div
                key={exId}
                className="bg-dark-950/70 border border-white/10 rounded-3xl p-4 space-y-3 shadow-md"
              >
                {/* Exercise Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div
                    onClick={() => setSelectedExerciseDetail(exercise)}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-dark-800 border border-white/10 overflow-hidden shrink-0">
                      <img
                        src={exercise.images[0]?.url || fallbackSvg}
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = fallbackSvg;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-white group-hover:text-primary-400 transition-colors flex items-center space-x-1">
                        <span>{exercise.name}</span>
                        <Info className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary-400" />
                      </h3>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {exercise.primaryMuscle} • {exercise.equipment}
                      </p>
                    </div>
                  </div>

                  {/* Remove Exercise */}
                  <button
                    onClick={() => removeExerciseFromSession(exId)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10"
                    title="Xóa bài tập khỏi buổi này"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Sets List */}
                <div className="space-y-2.5">
                  {exerciseSets.map(set => (
                    <SetLogger
                      key={set.id}
                      setLog={set}
                      unit={profile.unit}
                      onUpdate={(updates) => updateSet(set.id, updates)}
                      onComplete={() => completeSet(set.id)}
                      onDelete={() => deleteSet(set.id)}
                    />
                  ))}
                </div>

                {/* Add Set Button */}
                <button
                  onClick={() => addSetToExercise(exId)}
                  className="w-full py-2.5 rounded-xl bg-dark-900 hover:bg-dark-850 border border-white/5 text-gray-300 font-bold text-xs flex items-center justify-center space-x-1.5 active:scale-98 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-primary-400" />
                  <span>Thêm hiệp (Add Set)</span>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Add Exercise CTA Button */}
      <button
        onClick={() => setIsExercisePickerOpen(true)}
        className="w-full py-3.5 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-white/10 text-gray-200 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
      >
        <Plus className="w-4 h-4 text-primary-400" />
        <span>Thêm bài tập vào buổi này</span>
      </button>

      {/* FINISH WORKOUT BUTTON */}
      <div className="pt-2">
        <button
          onClick={handleFinish}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-400 hover:from-primary-600 text-dark-950 font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-primary-500/30 active:scale-[0.98] transition-all cursor-pointer"
        >
          <CheckCircle className="w-5 h-5 stroke-[2.5]" />
          <span>KẾT THÚC BUỔI TẬP (FINISH)</span>
        </button>
      </div>

      {/* Floating Rest Timer Bar */}
      <RestTimerBar />

      {/* PR Celebration Modal */}
      <PRCelebrationModal />

      {/* Workout Summary Modal */}
      <WorkoutSummaryModal />

      {/* Exercise Detail Modal */}
      {selectedExerciseDetail && (
        <ExerciseDetailModal
          exercise={selectedExerciseDetail}
          onClose={() => setSelectedExerciseDetail(null)}
        />
      )}

      {/* Exercise Picker Modal */}
      {isExercisePickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end max-w-md mx-auto">
          <div className="bg-dark-900 border-t border-white/10 rounded-t-3xl max-h-[80vh] flex flex-col p-4 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-white text-sm">Chọn bài tập thêm vào</h3>
              <button
                onClick={() => setIsExercisePickerOpen(false)}
                className="p-1.5 rounded-full bg-dark-800 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-2">
              <input
                type="text"
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                placeholder="Tìm bài tập..."
                className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-xs text-white focus:outline-none focus:border-primary-500"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 py-2">
              {exercises
                .filter(ex => ex.name.toLowerCase().includes(pickerSearch.toLowerCase()) || ex.primaryMuscle.toLowerCase().includes(pickerSearch.toLowerCase()))
                .map(ex => (
                  <div
                    key={ex.id}
                    onClick={() => {
                      addExerciseToSession(ex);
                      setIsExercisePickerOpen(false);
                    }}
                    className="p-3 rounded-xl bg-dark-850 border border-white/5 hover:border-primary-500 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-white">{ex.name}</h4>
                      <p className="text-[10px] text-gray-400">{ex.primaryMuscle} • {ex.equipment}</p>
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
