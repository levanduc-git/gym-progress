import React, { useState } from 'react';
import { Exercise } from '../../db/schema';
import { Dumbbell, ChevronRight, Sparkles } from 'lucide-react';
import { getMuscleSvgFallback } from '../../utils/imageProvider';

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect: (exercise: Exercise) => void;
  onQuickAdd?: (exercise: Exercise) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onSelect, onQuickAdd }) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const primaryImage = exercise.images[0];
  const fallbackSvg = getMuscleSvgFallback(exercise.primaryMuscle);

  return (
    <div
      onClick={() => onSelect(exercise)}
      className="p-3.5 rounded-2xl bg-dark-900 border border-white/5 hover:border-primary-500/40 transition-all cursor-pointer flex items-center space-x-3.5 group shadow-sm"
    >
      {/* Exercise Image / Anatomical Diagram */}
      <div className="w-16 h-16 rounded-xl bg-dark-800 border border-white/10 overflow-hidden shrink-0 relative flex items-center justify-center">
        {!imageError && primaryImage?.url ? (
          <img
            src={primaryImage.url}
            alt={exercise.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <img
            src={fallbackSvg}
            alt={exercise.name}
            className="w-full h-full object-cover p-1"
          />
        )}

        {exercise.isCustom && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-400" />
        )}
      </div>

      {/* Info Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1.5 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-dark-800 text-primary-400 border border-white/5">
            {exercise.primaryMuscle}
          </span>
          <span className="text-[10px] text-gray-400 font-medium truncate">
            {exercise.equipment}
          </span>
        </div>

        <h4 className="font-bold text-white text-sm truncate group-hover:text-primary-400 transition-colors">
          {exercise.name}
        </h4>

        <div className="flex items-center space-x-2 text-[11px] text-gray-400 mt-1 truncate">
          <span>Độ khó: {exercise.difficulty}</span>
          {exercise.secondaryMuscles.length > 0 && (
            <span>• Cơ phụ: {exercise.secondaryMuscles.join(', ')}</span>
          )}
        </div>
      </div>

      {/* Arrow Indicator */}
      <div className="shrink-0 text-gray-500 group-hover:text-white transition-colors">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
};
