import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WorkoutSession } from '../../db/schema';
import { SessionDetailModal } from './SessionDetailModal';
import { Clock, TrendingUp, Layers, Calendar, ChevronRight, Dumbbell, Award } from 'lucide-react';
import { formatDuration } from '../../utils/calculations';

export const HistoryView: React.FC = () => {
  const { sessions, profile, exercises } = useApp();
  const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(null);

  const completedSessions = sessions
    .filter(s => s.status === 'completed')
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  return (
    <div className="p-4 space-y-4 animate-scale-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-white tracking-tight">Lịch sử tập luyện</h2>
        <p className="text-xs text-gray-400">Xem lại chi tiết từng hiệp tập trong quá khứ</p>
      </div>

      {completedSessions.length === 0 ? (
        <div className="text-center py-16 bg-dark-900 rounded-3xl border border-white/5 space-y-3">
          <Calendar className="w-10 h-10 mx-auto text-gray-600" />
          <h4 className="text-sm font-bold text-gray-300">Chưa có lịch sử buổi tập</h4>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Khi bạn hoàn thành các buổi tập, chúng sẽ được lưu trữ và thống kê chi tiết tại đây.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {completedSessions.map(session => {
            const exerciseNames = Array.from(new Set(session.sets.map(s => {
              const ex = exercises.find(e => e.id === s.exerciseId);
              return ex?.name || 'Bài tập';
            })));

            return (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className="p-4 rounded-2xl bg-dark-900 border border-white/5 hover:border-primary-500/40 transition-all cursor-pointer space-y-2.5 group shadow-sm"
              >
                {/* Date & Title */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      {new Date(session.startTime).toLocaleDateString('vi-VN', {
                        weekday: 'short',
                        month: 'numeric',
                        day: 'numeric'
                      })}
                    </span>
                    <h3 className="font-bold text-sm text-white group-hover:text-primary-400 transition-colors">
                      {session.workoutName}
                    </h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </div>

                {/* Metrics Row */}
                <div className="flex items-center space-x-4 text-xs text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{formatDuration(session.durationSeconds)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3.5 h-3.5 text-primary-400" />
                    <span>{session.totalVolumeKg.toLocaleString()} {profile.unit}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>{session.setsCompleted} sets</span>
                  </div>
                </div>

                {/* Exercise Tags preview */}
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
                  {exerciseNames.slice(0, 3).map((name, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-dark-800 text-gray-400 px-2 py-0.5 rounded-md truncate max-w-[120px]"
                    >
                      {name}
                    </span>
                  ))}
                  {exerciseNames.length > 3 && (
                    <span className="text-[10px] text-gray-500 px-1 py-0.5">
                      +{exerciseNames.length - 3} bài khác
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Session Drilldown Modal */}
      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
};
