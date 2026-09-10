import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, 
  Check, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  Layers, 
  Dumbbell, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import { formatDuration, displayWeight } from '../../utils/calculations';

export const WorkoutSummaryModal: React.FC = () => {
  const { completedSummarySession, closeSummaryModal, profile } = useApp();

  if (!completedSummarySession) return null;

  const prCount = completedSummarySession.newPRs?.length || 0;
  const recommendations = completedSummarySession.overloadRecommendations || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-end max-w-md mx-auto animate-scale-in">
      <div className="bg-dark-900 border-t border-white/10 rounded-t-3xl max-h-[90vh] flex flex-col p-5 shadow-2xl overflow-y-auto">
        {/* Header Celebration */}
        <div className="text-center space-y-2 pb-2">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-primary-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Award className="w-9 h-9 text-dark-950" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">HOÀN THÀNH BUỔI TẬP!</h2>
          <p className="text-xs text-gray-400 font-medium">
            {completedSummarySession.workoutName} • {new Date(completedSummarySession.startTime).toLocaleDateString('vi-VN')}
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 gap-3 py-3">
          {/* Duration */}
          <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold">Thời gian</span>
              <p className="text-sm font-black text-white">
                {formatDuration(completedSummarySession.durationSeconds)}
              </p>
            </div>
          </div>

          {/* Volume */}
          <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold">Tổng Volume</span>
              <p className="text-sm font-black text-primary-400">
                {completedSummarySession.totalVolumeKg.toLocaleString()} {profile.unit}
              </p>
            </div>
          </div>

          {/* Sets Completed */}
          <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold">Số Sets đạt</span>
              <p className="text-sm font-black text-white">
                {completedSummarySession.setsCompleted} sets
              </p>
            </div>
          </div>

          {/* Avg RPE */}
          <div className="p-3.5 rounded-2xl bg-dark-850 border border-white/5 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold">Độ gắng sức (RPE)</span>
              <p className="text-sm font-black text-white">
                RPE {completedSummarySession.rpeAvg || 8}
              </p>
            </div>
          </div>
        </div>

        {/* PRs Section */}
        {prCount > 0 && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-dark-850 to-amber-950/30 border border-amber-500/40 space-y-2 mb-3">
            <div className="flex items-center space-x-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
                Kỷ lục mới đạt được ({prCount} PRs)
              </h4>
            </div>
            <div className="space-y-1.5">
              {completedSummarySession.newPRs?.map(pr => (
                <div key={pr.id} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                  <span className="font-bold text-gray-200 truncate">{pr.exerciseName}</span>
                  <span className="font-black text-amber-300">
                    {pr.weightKg} {profile.unit} × {pr.reps} reps
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progressive Overload Recommendations (Section 11) */}
        {recommendations.length > 0 && (
          <div className="space-y-2.5 my-2">
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <h4 className="text-xs font-black uppercase tracking-wider text-primary-400">
                Đề xuất tăng tiến (Progressive Overload)
              </h4>
            </div>

            <div className="space-y-2">
              {recommendations.map(rec => (
                <div
                  key={rec.id}
                  className="p-3 rounded-2xl bg-dark-850 border border-primary-500/30 space-y-1.5 text-xs shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{rec.exerciseName}</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-primary-500/20 text-primary-400 border border-primary-500/30">
                      {rec.recommendationType === 'increase_weight' ? 'Tăng mức tạ' : 'Tăng số reps'}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-300 leading-relaxed">{rec.reason}</p>

                  <div className="flex items-center justify-between text-[11px] bg-dark-900/80 p-2 rounded-xl border border-white/5">
                    <span className="text-gray-400">Đề xuất buổi tới:</span>
                    <span className="font-black text-primary-300">
                      {rec.suggestedWeightKg} {profile.unit} × {rec.suggestedReps} reps
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close CTA */}
        <div className="pt-4">
          <button
            onClick={closeSummaryModal}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-400 hover:from-primary-600 text-dark-950 font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-primary-500/25 active:scale-95 transition-all"
          >
            <span>ĐÓNG & XEM TIẾN ĐỘ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
