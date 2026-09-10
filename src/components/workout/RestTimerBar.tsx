import React from 'react';
import { useApp } from '../../context/AppContext';
import { Timer, Plus, SkipForward, Bell } from 'lucide-react';
import { formatSeconds } from '../../utils/calculations';

export const RestTimerBar: React.FC = () => {
  const { restTimer, addRestSeconds, skipRestTimer } = useApp();

  if (!restTimer || !restTimer.isActive) return null;

  const percentage = Math.max(0, Math.min(100, (restTimer.remainingSeconds / restTimer.durationSeconds) * 100));

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-3 z-40 animate-scale-in">
      <div className="bg-dark-900/95 border border-primary-500/50 rounded-2xl p-3 shadow-2xl backdrop-blur-xl space-y-2 relative overflow-hidden ring-1 ring-primary-500/30">
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-dark-800">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-emerald-400 transition-all duration-1000 ease-linear"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* Timer Display */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center animate-pulse">
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-black text-white tracking-wider font-mono">
                  {formatSeconds(restTimer.remainingSeconds)}
                </span>
                <span className="text-[10px] text-primary-400 font-bold uppercase tracking-wider">
                  Thời gian nghỉ
                </span>
              </div>
              {restTimer.exerciseName && (
                <p className="text-[10px] text-gray-400 truncate max-w-[140px]">
                  Hiệp tiếp: {restTimer.exerciseName}
                </p>
              )}
            </div>
          </div>

          {/* Quick Timer Controls */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => addRestSeconds(30)}
              className="px-2.5 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-xs font-bold text-gray-200 border border-white/5 active:scale-95 transition-all flex items-center space-x-0.5"
            >
              <Plus className="w-3 h-3 text-primary-400" />
              <span>30s</span>
            </button>

            <button
              onClick={() => addRestSeconds(60)}
              className="px-2.5 py-1.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-xs font-bold text-gray-200 border border-white/5 active:scale-95 transition-all flex items-center space-x-0.5"
            >
              <Plus className="w-3 h-3 text-primary-400" />
              <span>60s</span>
            </button>

            <button
              onClick={skipRestTimer}
              className="p-2 rounded-xl bg-dark-800 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/5 active:scale-95 transition-all"
              title="Bỏ qua nghỉ"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
