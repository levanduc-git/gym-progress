import React from 'react';
import { WorkoutSession } from '../../db/schema';
import { useApp } from '../../context/AppContext';
import { X, Clock, TrendingUp, Layers, Flame, Trophy, Trash2 } from 'lucide-react';
import { formatDuration } from '../../utils/calculations';

interface SessionDetailModalProps {
  session: WorkoutSession;
  onClose: () => void;
}

export const SessionDetailModal: React.FC<SessionDetailModalProps> = ({ session, onClose }) => {
  const { exercises, profile, deleteSession } = useApp();

  const exerciseIds = Array.from(new Set(session.sets.map(s => s.exerciseId)));

  const handleDelete = () => {
    if (confirm('Bạn có chắc muốn xóa buổi tập này khỏi lịch sử?')) {
      deleteSession(session.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end max-w-md mx-auto animate-scale-in">
      <div className="bg-dark-900 border-t border-white/10 rounded-t-3xl max-h-[85vh] flex flex-col p-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="font-black text-lg text-white">{session.workoutName}</h3>
            <p className="text-xs text-gray-400">
              {new Date(session.startTime).toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={handleDelete}
              className="p-2 rounded-xl bg-dark-800 text-gray-400 hover:text-rose-400"
              title="Xóa buổi tập"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-dark-800 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 text-center text-xs">
          <div className="bg-dark-850 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block">Thời gian</span>
            <span className="font-bold text-white">{formatDuration(session.durationSeconds)}</span>
          </div>
          <div className="bg-dark-850 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block">Tổng Volume</span>
            <span className="font-bold text-primary-400">{session.totalVolumeKg} {profile.unit}</span>
          </div>
          <div className="bg-dark-850 p-2 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-400 block">Sets hoàn thành</span>
            <span className="font-bold text-white">{session.setsCompleted}</span>
          </div>
        </div>

        {/* Exercises Drilldown */}
        <div className="flex-1 overflow-y-auto space-y-3 py-2">
          {exerciseIds.map(exId => {
            const exercise = exercises.find(e => e.id === exId);
            const sets = session.sets.filter(s => s.exerciseId === exId && s.isCompleted);
            if (sets.length === 0) return null;

            return (
              <div key={exId} className="bg-dark-850 border border-white/5 rounded-2xl p-3.5 space-y-2">
                <h4 className="font-bold text-xs text-white flex items-center space-x-1.5">
                  <span>{exercise?.name || 'Bài tập'}</span>
                  <span className="text-[10px] font-normal text-gray-400">({sets.length} sets)</span>
                </h4>

                <div className="space-y-1.5">
                  {sets.map(set => (
                    <div
                      key={set.id}
                      className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-dark-900 border border-white/5"
                    >
                      <span className="font-semibold text-gray-400">Set {set.setNumber}</span>
                      <span className="font-bold text-white">
                        {set.weightKg} {profile.unit} × {set.reps} reps
                      </span>
                      {set.rpe ? (
                        <span className="text-[10px] text-primary-400">RPE {set.rpe}</span>
                      ) : (
                        <span className="text-[10px] text-gray-500">-</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
