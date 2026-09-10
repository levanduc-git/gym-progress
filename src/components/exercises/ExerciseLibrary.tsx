import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Exercise, MuscleGroup, EquipmentType, DifficultyLevel } from '../../db/schema';
import { ExerciseCard } from './ExerciseCard';
import { ExerciseDetailModal } from './ExerciseDetailModal';
import { CustomExerciseModal } from './CustomExerciseModal';
import { Search, Plus, Filter, Dumbbell, Sparkles, X } from 'lucide-react';

export const ExerciseLibrary: React.FC = () => {
  const { exercises } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  const muscles = ['All', 'Chest', 'Back', 'Shoulders', 'Legs', 'Biceps', 'Triceps', 'Core', 'Calves'];
  const equipments = ['All', 'Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter logic
  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.primaryMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.secondaryMuscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMuscle = selectedMuscle === 'All' || ex.primaryMuscle === selectedMuscle;
    const matchesEquipment = selectedEquipment === 'All' || ex.equipment === selectedEquipment;
    const matchesDifficulty = selectedDifficulty === 'All' || ex.difficulty === selectedDifficulty;

    return matchesSearch && matchesMuscle && matchesEquipment && matchesDifficulty;
  });

  const clearFilters = () => {
    setSelectedMuscle('All');
    setSelectedEquipment('All');
    setSelectedDifficulty('All');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedMuscle !== 'All' || selectedEquipment !== 'All' || selectedDifficulty !== 'All' || searchQuery !== '';

  return (
    <div className="p-4 space-y-4 animate-scale-in">
      {/* Top Header & Custom Exercise CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">Thư viện bài tập</h2>
          <p className="text-xs text-gray-400">Hơn {exercises.length} bài tập có hướng dẫn chuẩn</p>
        </div>
        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tự tạo bài</span>
        </button>
      </div>

      {/* Search Bar & Filter Toggle */}
      <div className="space-y-2.5">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên bài tập hoặc cơ bắp..."
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-dark-900 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-primary-500 transition-all placeholder:text-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Muscle Group Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {muscles.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMuscle(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedMuscle === m
                  ? 'bg-primary-500 text-dark-950 shadow-sm shadow-primary-500/20 font-black'
                  : 'bg-dark-900 text-gray-400 border border-white/5 hover:text-white'
              }`}
            >
              {m === 'All' ? 'Tất cả' : m}
            </button>
          ))}
        </div>

        {/* Advanced Filters (Equipment & Difficulty) */}
        <div className="flex items-center justify-between text-xs pt-1">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="text-gray-400 hover:text-primary-400 flex items-center space-x-1 font-semibold"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Bộ lọc nâng cao {showAdvancedFilters ? '▲' : '▼'}</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-primary-400 text-xs font-bold hover:underline"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {showAdvancedFilters && (
          <div className="p-3 bg-dark-900 rounded-2xl border border-white/5 space-y-3 animate-scale-in text-xs">
            {/* Equipment */}
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1.5">Dụng cụ</span>
              <div className="flex flex-wrap gap-1.5">
                {equipments.map((eq) => (
                  <button
                    key={eq}
                    onClick={() => setSelectedEquipment(eq)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      selectedEquipment === eq
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold'
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
              <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1.5">Độ khó</span>
              <div className="flex gap-1.5">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDifficulty(d)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      selectedDifficulty === d
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 font-bold'
                        : 'bg-dark-850 text-gray-400 border border-white/5'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exercises Cards Grid / List */}
      <div className="space-y-2.5 pt-1">
        <div className="text-[11px] font-bold text-gray-400">
          Kết quả ({filteredExercises.length} bài)
        </div>

        {filteredExercises.length === 0 ? (
          <div className="text-center py-12 bg-dark-900/50 rounded-2xl border border-white/5">
            <Dumbbell className="w-10 h-10 mx-auto text-gray-600 mb-2" />
            <h4 className="text-sm font-bold text-gray-300">Không tìm thấy bài tập</h4>
            <p className="text-xs text-gray-500 mt-1">Hãy thử tìm với từ khóa khác hoặc xóa bộ lọc.</p>
            <button
              onClick={clearFilters}
              className="mt-3 px-4 py-1.5 rounded-xl bg-dark-800 text-xs text-primary-400 font-bold"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onSelect={(ex) => setSelectedExercise(ex)}
            />
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      {/* Custom Exercise Creator Modal */}
      {isCustomModalOpen && (
        <CustomExerciseModal onClose={() => setIsCustomModalOpen(false)} />
      )}
    </div>
  );
};
