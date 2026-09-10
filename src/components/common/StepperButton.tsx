import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface StepperProps {
  value: number;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
  onChange: (val: number) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StepperButton: React.FC<StepperProps> = ({
  value,
  step = 1,
  min = 0,
  max = 999,
  unit = '',
  onChange,
  label,
  size = 'md',
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVal = Math.max(min, Math.round((value - step) * 100) / 100);
    onChange(nextVal);
    audioService.triggerHaptic('light');
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVal = Math.min(max, Math.round((value + step) * 100) / 100);
    onChange(nextVal);
    audioService.triggerHaptic('light');
  };

  return (
    <div className="flex flex-col items-center">
      {label && <span className="text-[11px] font-medium text-gray-400 mb-1">{label}</span>}
      <div className="flex items-center bg-dark-900 border border-white/10 rounded-xl p-1 shadow-inner">
        {/* Minus Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="touch-target w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 hover:bg-dark-700 active:bg-dark-600 disabled:opacity-30 disabled:cursor-not-allowed text-gray-300 active:scale-95 transition-all"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Input / Display */}
        <div className="min-w-[64px] px-2 text-center">
          <input
            type="number"
            value={value}
            step={step}
            onChange={(e) => {
              const parsed = parseFloat(e.target.value);
              if (!isNaN(parsed)) {
                onChange(parsed);
              }
            }}
            className="w-full bg-transparent text-center font-bold text-gray-100 focus:outline-none text-base"
          />
          {unit && <span className="text-[10px] text-gray-400 block -mt-1">{unit}</span>}
        </div>

        {/* Plus Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="touch-target w-10 h-10 flex items-center justify-center rounded-lg bg-dark-800 hover:bg-dark-700 active:bg-dark-600 disabled:opacity-30 disabled:cursor-not-allowed text-primary-400 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
