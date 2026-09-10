import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Flame, 
  Dumbbell, 
  Trophy, 
  Calendar, 
  ChevronRight, 
  TrendingUp, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Coffee 
} from 'lucide-react';
import { calculateWorkoutStreak, formatDuration, displayWeight } from '../../utils/calculations';

export const Dashboard: React.FC = () => {
  const { 
    profile, 
    activeProgram, 
    sessions, 
    personalRecords, 
    startWorkout, 
    startEmptyWorkout, 
    exercises, 
    setActiveTab 
  } = useApp();

  const streak = calculateWorkoutStreak(sessions);
  const totalVolume = sessions
    .filter(s => s.status === 'completed')
    .reduce((acc, s) => acc + s.totalVolumeKg, 0);
  const completedWorkoutsCount = sessions.filter(s => s.status === 'completed').length;

  // Determine Today's workout from active program based on day of week (Monday=1 .. Sunday=7)
  const todayDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  const dayNumber = todayDayIndex === 0 ? 7 : todayDayIndex;
  
  const todayWorkout = activeProgram?.workouts.find(w => w.dayNumber === dayNumber) || activeProgram?.workouts[0];

  // Last workout
  const lastCompletedSession = sessions
    .filter(s => s.status === 'completed')
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())[0];

  return (
    <div className="p-4 space-y-5 animate-scale-in">
      {/* 1. Quick Hero Stats Banner */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Streak */}
        <div className="bg-dark-900 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-md">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-1.5">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
          </div>
          <span className="text-lg font-black text-white">{streak}</span>
          <span className="text-[10px] text-gray-400 font-medium">Chuỗi ngày</span>
        </div>

        {/* Total Sessions */}
        <div className="bg-dark-900 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-md">
          <div className="w-8 h-8 rounded-full bg-primary-500/10 text-primary-400 flex items-center justify-center mb-1.5">
            <Dumbbell className="w-4 h-4" />
          </div>
          <span className="text-lg font-black text-white">{completedWorkoutsCount}</span>
          <span className="text-[10px] text-gray-400 font-medium">Buổi tập</span>
        </div>

        {/* Total Volume */}
        <div className="bg-dark-900 border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-md">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-1.5">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-lg font-black text-white">
            {totalVolume >= 1000 ? `${(totalVolume / 1000).toFixed(1)}t` : `${totalVolume}k`}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">Volume ({profile.unit})</span>
        </div>
      </div>

      {/* 2. Today's Workout Card (Centerpiece of the App) */}
      <div className="rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border border-white/10 p-5 shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-ping" />
            <span className="text-xs font-black tracking-wider uppercase text-primary-400">
              Buổi tập hôm nay
            </span>
          </div>
          <span className="text-[11px] font-bold text-gray-400 bg-dark-800 px-2.5 py-1 rounded-full border border-white/5">
            {activeProgram?.name}
          </span>
        </div>

        {todayWorkout && !todayWorkout.isRestDay ? (
          <div>
            <h2 className="text-xl font-black text-white tracking-tight mb-2">
              {todayWorkout.name}
            </h2>

            {/* Exercise preview summary */}
            <div className="bg-dark-950/60 rounded-2xl p-3 border border-white/5 space-y-2 mb-5">
              {todayWorkout.exercises.slice(0, 4).map((we, idx) => {
                const ex = exercises.find(e => e.id === we.exerciseId);
                return (
                  <div key={we.id} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                    <div className="flex items-center space-x-2 truncate pr-2">
                      <span className="w-4 h-4 rounded-full bg-dark-800 text-[10px] font-bold text-gray-400 flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-gray-200 truncate">{ex?.name || 'Bài tập'}</span>
                    </div>
                    <span className="text-gray-400 font-medium shrink-0">
                      {we.targetSets} sets × {we.repRange} reps
                    </span>
                  </div>
                );
              })}
              {todayWorkout.exercises.length > 4 && (
                <div className="text-center pt-1 text-[11px] text-gray-400 font-medium">
                  + {todayWorkout.exercises.length - 4} bài tập khác
                </div>
              )}
            </div>

            {/* BIG START WORKOUT BUTTON */}
            <button
              onClick={() => startWorkout(todayWorkout, activeProgram)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-400 hover:from-primary-600 hover:to-emerald-500 active:scale-[0.98] text-dark-950 font-black text-base flex items-center justify-center space-x-2.5 shadow-xl shadow-primary-500/30 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-dark-950" />
              <span>BẮT ĐẦU BUỔI TẬP (START)</span>
            </button>
          </div>
        ) : (
          /* Scheduled Rest Day UI */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Coffee className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Hôm nay là ngày nghỉ (Rest Day)</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto mt-1">
                Cơ bắp phát triển trong lúc nghỉ ngơi và ngủ đủ giấc. Hãy bổ sung protein và phục hồi nhé!
              </p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => {
                  const firstWorkout = activeProgram?.workouts.find(w => !w.isRestDay);
                  if (firstWorkout) startWorkout(firstWorkout, activeProgram);
                }}
                className="px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 border border-white/10 text-xs font-bold text-gray-200"
              >
                Tập buổi tiếp theo
              </button>
              <button
                onClick={startEmptyWorkout}
                className="px-4 py-2.5 rounded-xl bg-primary-500/20 hover:bg-primary-500/30 border border-primary-500/40 text-xs font-bold text-primary-400"
              >
                + Buổi tập tự do
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Recent Personal Records (PR) Carousel */}
      {personalRecords.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Kỷ lục cá nhân gần đây (PRs)</h3>
            </div>
            <button 
              onClick={() => setActiveTab('progress')}
              className="text-xs text-primary-400 hover:underline flex items-center"
            >
              Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            {personalRecords.slice(0, 4).map((pr) => (
              <div
                key={pr.id}
                className="min-w-[190px] p-3 rounded-2xl bg-gradient-to-br from-dark-850 to-dark-900 border border-amber-500/30 shadow-md flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide bg-amber-500/10 px-2 py-0.5 rounded-full">
                    🏆 New PR
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(pr.date).toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs font-bold text-gray-100 truncate mb-1">{pr.exerciseName}</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-base font-black text-amber-300">{pr.weightKg} {profile.unit}</span>
                  <span className="text-xs text-gray-400">× {pr.reps} reps</span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1">
                  Est. 1RM: <strong className="text-gray-200">{pr.estimated1RM} {profile.unit}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Weekly Consistency Bar */}
      <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-300">Tần suất tập tuần này</span>
          <span className="text-[11px] text-primary-400 font-semibold">
            Mục tiêu: {profile.trainingDaysPerWeek} buổi / tuần
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((dayName, idx) => {
            const isToday = (todayDayIndex === 0 ? 6 : todayDayIndex - 1) === idx;
            // Check if had workout on this day of week
            const hasWorkout = sessions.some(s => {
              if (s.status !== 'completed') return false;
              const d = new Date(s.startTime);
              const dayIdx = d.getDay() === 0 ? 6 : d.getDay() - 1;
              const diffDays = Math.floor((Date.now() - d.getTime()) / 86400000);
              return dayIdx === idx && diffDays < 7;
            });

            return (
              <div
                key={dayName}
                className={`py-2 rounded-xl flex flex-col items-center justify-center border text-center transition-all ${
                  hasWorkout
                    ? 'bg-primary-500/20 border-primary-500 text-primary-400 font-bold'
                    : isToday
                    ? 'bg-dark-800 border-white/20 text-white'
                    : 'bg-dark-950/40 border-white/5 text-gray-500'
                }`}
              >
                <span className="text-[10px] mb-1">{dayName}</span>
                {hasWorkout ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Quick Workout Action Button */}
      <div className="pt-1">
        <button
          onClick={startEmptyWorkout}
          className="w-full py-3.5 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-white/10 text-gray-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4 text-primary-400" />
          <span>Tạo buổi tập tự do không theo lịch</span>
        </button>
      </div>
    </div>
  );
};
