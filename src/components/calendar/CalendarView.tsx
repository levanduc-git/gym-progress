import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Clock, XCircle, Coffee, Play } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { sessions, activeProgram, startWorkout } = useApp();

  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  // Days in month
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Group completed workout dates
  const workoutDatesMap: Record<string, string> = {};
  sessions
    .filter(s => s.status === 'completed')
    .forEach(s => {
      const d = new Date(s.startTime).toISOString().split('T')[0];
      workoutDatesMap[d] = s.workoutName;
    });

  return (
    <div className="p-4 space-y-4 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">Lịch tập & Nghỉ ngơi</h2>
          <p className="text-xs text-gray-400">Theo dõi độ chăm chỉ và lịch trình các tuần</p>
        </div>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center justify-between bg-dark-900 p-3 rounded-2xl border border-white/5">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-xl bg-dark-850 text-gray-400 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <h3 className="font-black text-sm text-white">
          {currentMonthDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
        </h3>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-xl bg-dark-850 text-gray-400 hover:text-white"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Legend status indicators (Section 15) */}
      <div className="flex flex-wrap gap-2 justify-between text-[11px] px-1 text-gray-300">
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>Đã tập (✓)</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          <span>Nghỉ ngơi (○)</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>Dự kiến (⏳)</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span>Bỏ lỡ (✕)</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-dark-900 border border-white/10 rounded-3xl p-4 shadow-xl">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-gray-400 pb-2 border-b border-white/5">
          <span>CN</span>
          <span>T2</span>
          <span>T3</span>
          <span>T4</span>
          <span>T5</span>
          <span>T6</span>
          <span>T7</span>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1.5 pt-2">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty_${i}`} className="h-12" />
          ))}

          {/* Month days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateObj = new Date(year, month, dayNum);
            dateObj.setHours(0, 0, 0, 0);

            const dateStr = dateObj.toISOString().split('T')[0];
            const isCompleted = !!workoutDatesMap[dateStr];
            const isToday = dateObj.getTime() === today.getTime();
            const isPast = dateObj.getTime() < today.getTime();
            const isFuture = dateObj.getTime() > today.getTime();

            // Program schedule day for this date (Monday=1..Sunday=7)
            const dayOfWeek = dateObj.getDay() === 0 ? 7 : dateObj.getDay();
            const scheduledWorkout = activeProgram?.workouts.find(w => w.dayNumber === dayOfWeek);
            const isScheduledRest = scheduledWorkout?.isRestDay;

            let badgeColor = 'bg-dark-850 text-gray-400 border-white/5';
            let icon = null;

            if (isCompleted) {
              badgeColor = 'bg-primary-500/20 text-primary-400 border-primary-500/50 font-bold';
              icon = '✓';
            } else if (isScheduledRest) {
              badgeColor = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
              icon = '○';
            } else if (isPast) {
              badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
              icon = '✕';
            } else if (isFuture || isToday) {
              badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
              icon = '⏳';
            }

            return (
              <div
                key={dayNum}
                className={`h-12 rounded-xl border flex flex-col items-center justify-between p-1 transition-all ${badgeColor} ${
                  isToday ? 'ring-2 ring-primary-400' : ''
                }`}
              >
                <span className="text-[10px] font-bold">{dayNum}</span>
                <span className="text-[11px] font-black">{icon}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
