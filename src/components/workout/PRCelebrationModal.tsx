import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Sparkles, Check, Flame } from 'lucide-react';

export const PRCelebrationModal: React.FC = () => {
  const { activePRModal, closePRModal, profile } = useApp();

  if (!activePRModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-scale-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-dark-850 to-dark-900 border border-amber-500/50 rounded-3xl p-6 text-center shadow-2xl space-y-4 ring-1 ring-amber-500/30 relative overflow-hidden">
        {/* Glow & Confetti background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-xl shadow-amber-500/40 animate-bounce-subtle">
          <Trophy className="w-10 h-10 text-dark-950 fill-dark-950" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
            🏆 KỶ LỤC CÁ NHÂN MỚI!
          </span>
          <h3 className="text-xl font-black text-white pt-2">{activePRModal.exerciseName}</h3>
        </div>

        {/* PR Stats Showcase */}
        <div className="bg-dark-950/70 rounded-2xl p-4 border border-white/5 space-y-2">
          <div className="flex items-baseline justify-center space-x-2">
            <span className="text-3xl font-black text-amber-300">
              {activePRModal.weightKg} {profile.unit}
            </span>
            <span className="text-lg font-bold text-gray-300">× {activePRModal.reps} reps</span>
          </div>

          <div className="flex justify-around text-xs text-gray-400 pt-2 border-t border-white/5">
            {activePRModal.previousValue ? (
              <div>
                <span className="block text-[10px] uppercase">Kỷ lục cũ</span>
                <strong className="text-gray-300">{activePRModal.previousValue} {profile.unit}</strong>
              </div>
            ) : null}
            <div>
              <span className="block text-[10px] uppercase">Estimated 1RM</span>
              <strong className="text-primary-400">{activePRModal.estimated1RM} {profile.unit}</strong>
            </div>
          </div>
        </div>

        <button
          onClick={closePRModal}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-dark-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/30 active:scale-95 transition-all"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>TUYỆT VỜI, TIẾP TỤC TẬP!</span>
        </button>
      </div>
    </div>
  );
};
