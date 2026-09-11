import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Exercise } from '../../db/schema';
import { ImagePickerModal } from './ImagePickerModal';
import { 
  X, 
  Dumbbell, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Trophy, 
  TrendingUp, 
  Plus, 
  Flame,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { getMuscleSvgFallback } from '../../utils/imageProvider';
import { calculateEstimated1RM } from '../../utils/calculations';

interface ExerciseDetailModalProps {
  exercise: Exercise;
  onClose: () => void;
  onAddToWorkout?: (exercise: Exercise) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({ 
  exercise, 
  onClose, 
  onAddToWorkout 
}) => {
  const { profile, sessions, personalRecords, activeSession, addExerciseToSession, updateExercise, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'instructions' | 'history'>('instructions');
  const [imageError, setImageError] = useState<boolean>(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState<boolean>(false);

  const primaryImage = exercise.images[0];
  const fallbackSvg = getMuscleSvgFallback(exercise.primaryMuscle);

  const handleSaveNewImage = (newImageUrl: string) => {
    const updatedExercise: Exercise = {
      ...exercise,
      images: [
        {
          id: `img_${Date.now()}`,
          url: newImageUrl,
          thumbnailUrl: newImageUrl,
          fallbackSvg,
          type: newImageUrl.startsWith('data:image/svg') ? 'svg' : 'image',
          provider: 'custom',
          altText: exercise.name,
        }
      ]
    };
    updateExercise(updatedExercise);
    setImageError(false);
    showToast({ type: 'success', title: `Đã cập nhật hình ảnh cho bài ${exercise.name}!` });
  };

  // Extract personal history for this exercise
  const exerciseSets = sessions
    .filter(s => s.status === 'completed')
    .flatMap(s => 
      s.sets
        .filter(st => st.exerciseId === exercise.id && st.isCompleted && st.setType !== 'warmup')
        .map(st => ({
          ...st,
          sessionDate: s.startTime,
          e1rm: calculateEstimated1RM(st.weightKg, st.reps),
        }))
    )
    .sort((a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime());

  // Personal Records
  const exercisePRs = personalRecords.filter(p => p.exerciseId === exercise.id);
  const bestWeight = exerciseSets.length > 0 ? Math.max(...exerciseSets.map(s => s.weightKg)) : 0;
  const bestE1RM = exerciseSets.length > 0 ? Math.max(...exerciseSets.map(s => s.e1rm)) : 0;

  const handleAdd = () => {
    if (onAddToWorkout) {
      onAddToWorkout(exercise);
    } else if (activeSession) {
      addExerciseToSession(exercise);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end max-w-md mx-auto animate-scale-in">
      <div className="bg-dark-900 border-t border-white/10 rounded-t-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Floating Close Button */}
        <div className="relative w-full h-52 bg-dark-950 shrink-0 overflow-hidden">
          {!imageError && primaryImage?.url ? (
            <img
              src={primaryImage.url}
              alt={exercise.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={fallbackSvg}
              alt={exercise.name}
              className="w-full h-full object-cover p-6"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-black/60" />

          {/* Action Buttons Top Right (Close & Change Image) */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <button
              onClick={() => setIsImagePickerOpen(true)}
              className="px-3 py-1.5 rounded-full bg-dark-900/80 border border-white/20 text-white flex items-center space-x-1.5 backdrop-blur hover:bg-dark-800 text-xs font-bold shadow-lg"
              title="Đổi hình ảnh minh họa"
            >
              <Camera className="w-3.5 h-3.5 text-primary-400" />
              <span>Đổi hình</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur hover:bg-black"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary-500 text-dark-950 font-black">
                {exercise.primaryMuscle}
              </span>
              <span className="text-[10px] font-bold text-gray-200 bg-black/50 px-2 py-0.5 rounded backdrop-blur">
                {exercise.equipment}
              </span>
              <span className="text-[10px] font-bold text-amber-400 bg-black/50 px-2 py-0.5 rounded backdrop-blur">
                {exercise.difficulty}
              </span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight drop-shadow-md">
              {exercise.name}
            </h2>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 bg-dark-950/60 px-4">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
              activeTab === 'instructions'
                ? 'border-primary-500 text-primary-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Hướng dẫn kỹ thuật
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
              activeTab === 'history'
                ? 'border-primary-500 text-primary-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Lịch sử & Kỷ lục ({exerciseSets.length})
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'instructions' ? (
            <div className="space-y-4">
              {/* Muscle Details */}
              <div className="p-3 rounded-xl bg-dark-850 border border-white/5 space-y-1">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Nhóm cơ tham gia:
                </div>
                <div className="text-xs text-gray-200">
                  <strong className="text-primary-400">Cơ chính:</strong> {exercise.primaryMuscle}
                </div>
                {exercise.secondaryMuscles.length > 0 && (
                  <div className="text-xs text-gray-300">
                    <strong className="text-gray-400">Cơ phụ:</strong> {exercise.secondaryMuscles.join(', ')}
                  </div>
                )}
              </div>

              {/* Step by step Instructions */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary-400" />
                  <span>Các bước thực hiện</span>
                </h3>
                <div className="space-y-2">
                  {exercise.instructions.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-gray-300 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-dark-800 text-[10px] font-bold text-primary-400 flex items-center justify-center shrink-0 mt-0.5 border border-white/5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tips */}
              {exercise.tips.length > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center space-x-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>Mẹo tối ưu cảm nhận cơ (Pro Tips)</span>
                  </h4>
                  <ul className="text-xs text-amber-200/90 space-y-1 pl-4 list-disc">
                    {exercise.tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Mistakes */}
              {exercise.commonMistakes.length > 0 && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                  <h4 className="text-xs font-bold text-rose-400 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Lỗi sai thường gặp</span>
                  </h4>
                  <ul className="text-xs text-rose-200/90 space-y-1 pl-4 list-disc">
                    {exercise.commonMistakes.map((mistake, idx) => (
                      <li key={idx}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            /* History & Personal Records Tab */
            <div className="space-y-4">
              {/* Best Numbers Overview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-dark-850 border border-amber-500/30 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Mức tạ cao nhất</span>
                    <p className="text-base font-black text-amber-400">
                      {bestWeight > 0 ? `${bestWeight} ${profile.unit}` : 'Chưa có'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-dark-850 border border-primary-500/30 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Estimated 1RM</span>
                    <p className="text-base font-black text-primary-400">
                      {bestE1RM > 0 ? `${bestE1RM} ${profile.unit}` : 'Chưa có'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Set History Log */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Lịch sử các hiệp tập gần đây
                </h4>

                {exerciseSets.length === 0 ? (
                  <div className="text-center py-8 bg-dark-850/50 rounded-2xl border border-white/5">
                    <Dumbbell className="w-8 h-8 mx-auto text-gray-600 mb-2" />
                    <p className="text-xs text-gray-400">Chưa có dữ liệu tập cho bài này.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {exerciseSets.slice(0, 10).map((set, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-dark-850 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-white">
                            {set.weightKg} {profile.unit} × {set.reps} reps
                          </p>
                          <span className="text-[10px] text-gray-400">
                            {new Date(set.sessionDate).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-semibold text-primary-400 block">
                            e1RM: {set.e1rm} {profile.unit}
                          </span>
                          {set.rpe && (
                            <span className="text-[10px] text-gray-400">RPE {set.rpe}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions (e.g. Add to active workout session) */}
        {activeSession && (
          <div className="p-4 bg-dark-950 border-t border-white/10">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 rounded-2xl bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm vào buổi tập hiện tại</span>
            </button>
          </div>
        )}
      </div>

      {/* Image Picker Modal */}
      {isImagePickerOpen && (
        <ImagePickerModal
          exercise={exercise}
          onSaveImage={handleSaveNewImage}
          onClose={() => setIsImagePickerOpen(false)}
        />
      )}
    </div>
  );
};
