import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Volume2, VolumeX, Play, Cloud, ShieldCheck } from 'lucide-react';
import { calculateWorkoutStreak, formatDuration } from '../../utils/calculations';

export const Header: React.FC = () => {
  const { profile, updateProfile, activeSession, sessions, setActiveTab } = useApp();
  const streak = calculateWorkoutStreak(sessions);

  return (
    <header className="sticky top-0 z-30 bg-dark-950/90 backdrop-blur-md border-b border-white/5 px-4 pt-3 pb-3">
      <div className="flex items-center justify-between">
        {/* Logo & App Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center shadow-md shadow-primary-500/20">
            <span className="text-dark-950 font-black text-lg tracking-tighter">GP</span>
          </div>
          <div>
            <h1 className="text-base font-black text-white tracking-tight flex items-center space-x-1.5">
              <span>Gym Progress</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-primary-500/20 text-primary-400 border border-primary-500/30">
                PRO
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">
              Chào {profile.name || 'Gymer'} • {profile.goal}
            </p>
          </div>
        </div>

        {/* Quick Actions (Streak, Sound toggle) */}
        <div className="flex items-center space-x-2">
          {/* Streak Badge */}
          <div className="flex items-center space-x-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{streak} ngày</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => updateProfile({ soundEnabled: !profile.soundEnabled })}
            className="w-8 h-8 rounded-full bg-dark-850 hover:bg-dark-800 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
            title={profile.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {profile.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-primary-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Active Workout Sticky Notification (Crash Recovery / Minimized Bar) */}
      {activeSession && activeSession.status === 'in_progress' && (
        <div 
          onClick={() => setActiveTab('workout')}
          className="mt-2.5 p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-dark-850 border border-emerald-500/40 flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-all shadow-lg animate-glow"
        >
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pulse">
              <Play className="w-3.5 h-3.5 fill-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center space-x-1.5">
                <span>Đang tập: {activeSession.workoutName}</span>
              </p>
              <p className="text-[10px] text-emerald-300">
                Thời gian: {formatDuration(activeSession.durationSeconds)} • {activeSession.setsCompleted} sets hoàn thành
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
            Quay lại →
          </span>
        </div>
      )}
    </header>
  );
};
