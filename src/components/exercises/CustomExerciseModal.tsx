import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MuscleGroup, EquipmentType, DifficultyLevel } from '../../db/schema';
import { X, Plus, Image as ImageIcon, Save, Dumbbell } from 'lucide-react';
import { createExerciseImages } from '../../utils/imageProvider';

interface CustomExerciseModalProps {
  onClose: () => void;
}

export const CustomExerciseModal: React.FC<CustomExerciseModalProps> = ({ onClose }) => {
  const { addCustomExercise } = useApp();

  const [name, setName] = useState<string>('');
  const [primaryMuscle, setPrimaryMuscle] = useState<MuscleGroup>('Chest');
  const [secondaryMuscles, setSecondaryMuscles] = useState<MuscleGroup[]>([]);
  const [equipment, setEquipment] = useState<EquipmentType>('Barbell');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [instructionText, setInstructionText] = useState<string>('');
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [tipsText, setTipsText] = useState<string>('');

  const muscles: MuscleGroup[] = ['Chest', 'Back', 'Shoulders', 'Legs', 'Biceps', 'Triceps', 'Core', 'Forearms', 'Calves'];
  const equipments: EquipmentType[] = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight', 'Smith Machine', 'Kettlebell', 'Other'];
  const difficulties: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

  const handleToggleSecondaryMuscle = (muscle: MuscleGroup) => {
    if (secondaryMuscles.includes(muscle)) {
      setSecondaryMuscles(secondaryMuscles.filter(m => m !== muscle));
    } else {
      setSecondaryMuscles([...secondaryMuscles, muscle]);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;

    const instructions = instructionText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const tips = tipsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    addCustomExercise({
      name: name.trim(),
      primaryMuscle,
      secondaryMuscles,
      equipment,
      difficulty,
      instructions: instructions.length > 0 ? instructions : ['Thực hiện động tác chuẩn form và kiểm soát nhịp hạ.'],
      tips: tips.length > 0 ? tips : ['Hít thở đều và gồng chặt cơ bụng.'],
      commonMistakes: [],
      images: createExerciseImages(name.trim(), primaryMuscle, customImageUrl.trim() || undefined),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end max-w-md mx-auto animate-scale-in">
      <div className="bg-dark-900 border-t border-white/10 rounded-t-3xl max-h-[85vh] flex flex-col p-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="font-black text-white text-base">Tạo bài tập tùy chỉnh</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-dark-800 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 text-xs">
          {/* Exercise Name */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
              Tên bài tập *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Smith Machine Incline Press..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-white font-bold text-sm focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Primary Muscle Group */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Nhóm cơ chính *
            </label>
            <div className="flex flex-wrap gap-1.5">
              {muscles.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPrimaryMuscle(m)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    primaryMuscle === m
                      ? 'bg-primary-500 text-dark-950 font-black'
                      : 'bg-dark-850 text-gray-400 border border-white/5'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Muscles */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Nhóm cơ phụ (Tùy chọn)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {muscles.filter(m => m !== primaryMuscle).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleToggleSecondaryMuscle(m)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    secondaryMuscles.includes(m)
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                      : 'bg-dark-850 text-gray-400 border border-white/5'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Thiết bị / Dụng cụ *
            </label>
            <div className="flex flex-wrap gap-1.5">
              {equipments.map((eq) => (
                <button
                  key={eq}
                  type="button"
                  onClick={() => setEquipment(eq)}
                  className={`px-2.5 py-1.5 rounded-xl font-medium transition-all ${
                    equipment === eq
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50 font-bold'
                      : 'bg-dark-850 text-gray-400 border border-white/5'
                  }`}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Độ khó
            </label>
            <div className="grid grid-cols-3 gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`py-2 rounded-xl text-center font-bold border transition-all ${
                    difficulty === d
                      ? 'bg-primary-500/20 border-primary-500 text-primary-400'
                      : 'bg-dark-850 border-white/5 text-gray-400'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Image URL (Optional) */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
              Link hình ảnh minh họa (Tùy chọn)
            </label>
            <input
              type="url"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
              Các bước hướng dẫn (Mỗi dòng một bước)
            </label>
            <textarea
              value={instructionText}
              onChange={(e) => setInstructionText(e.target.value)}
              rows={3}
              placeholder="1. Ngồi thẳng lưng...&#10;2. Đẩy tạ lên...&#10;3. Hạ chậm 2 giây..."
              className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white resize-none focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>

        {/* Bottom Save Button */}
        <div className="pt-3 border-t border-white/10">
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="w-full py-3.5 rounded-2xl bg-primary-500 hover:bg-primary-600 disabled:opacity-30 disabled:cursor-not-allowed text-dark-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>LƯU BÀI TẬP VÀO THƯ VIỆN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
