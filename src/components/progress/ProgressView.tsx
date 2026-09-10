import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Trophy, 
  Scale, 
  Dumbbell, 
  Calendar, 
  Award, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { calculateEstimated1RM } from '../../utils/calculations';

type TimeRange = '7d' | '30d' | '90d' | '6m' | '1y' | 'all';
type MetricType = 'volume' | 'weight' | 'exercise_1rm';

export const ProgressView: React.FC = () => {
  const { sessions, measurements, personalRecords, exercises, profile } = useApp();

  const [metric, setMetric] = useState<MetricType>('volume');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('ex_bb_bench_press');

  // Filter sessions and measurements based on time range
  const now = Date.now();
  const getDaysLimit = (range: TimeRange): number => {
    switch (range) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      case '6m': return 180;
      case '1y': return 365;
      case 'all': return 9999;
    }
  };

  const daysLimit = getDaysLimit(timeRange);

  // Compute Chart Data Points
  let chartData: { label: string; value: number }[] = [];

  if (metric === 'volume') {
    chartData = sessions
      .filter(s => s.status === 'completed')
      .filter(s => {
        const diffDays = (now - new Date(s.startTime).getTime()) / 86400000;
        return diffDays <= daysLimit;
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .map(s => ({
        label: new Date(s.startTime).toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric' }),
        value: s.totalVolumeKg,
      }));
  } else if (metric === 'weight') {
    chartData = measurements
      .filter(m => {
        const diffDays = (now - new Date(m.date).getTime()) / 86400000;
        return diffDays <= daysLimit;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(m => ({
        label: new Date(m.date).toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric' }),
        value: m.weightKg,
      }));
  } else if (metric === 'exercise_1rm') {
    // Extract sets for selected exercise across completed sessions
    const points: { label: string; value: number }[] = [];
    sessions
      .filter(s => s.status === 'completed')
      .filter(s => {
        const diffDays = (now - new Date(s.startTime).getTime()) / 86400000;
        return diffDays <= daysLimit;
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .forEach(s => {
        const matchingSets = s.sets.filter(
          st => st.exerciseId === selectedExerciseId && st.isCompleted && st.setType !== 'warmup'
        );
        if (matchingSets.length > 0) {
          const maxE1RM = Math.max(...matchingSets.map(st => calculateEstimated1RM(st.weightKg, st.reps)));
          points.push({
            label: new Date(s.startTime).toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric' }),
            value: maxE1RM,
          });
        }
      });
    chartData = points;
  }

  // Calculate min & max for SVG chart scaling
  const values = chartData.map(d => d.value);
  const maxValue = values.length > 0 ? Math.max(...values) : 100;
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const rangeDiff = maxValue - minValue || 1;

  const width = 340;
  const height = 160;
  const padding = 25;

  const pointsString = chartData.map((d, idx) => {
    const x = padding + (idx / Math.max(1, chartData.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - minValue) / rangeDiff) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="p-4 space-y-5 animate-scale-in">
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-black text-white tracking-tight">Biểu đồ tiến bộ</h2>
        <p className="text-xs text-gray-400">Theo dõi Volume, Cân nặng và Sức mạnh (1RM)</p>
      </div>

      {/* Metric Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-dark-900 p-1.5 rounded-2xl border border-white/5 text-xs font-bold">
        <button
          onClick={() => setMetric('volume')}
          className={`py-2 rounded-xl transition-all ${
            metric === 'volume'
              ? 'bg-primary-500 text-dark-950 shadow-sm font-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Volume ({profile.unit})
        </button>

        <button
          onClick={() => setMetric('weight')}
          className={`py-2 rounded-xl transition-all ${
            metric === 'weight'
              ? 'bg-primary-500 text-dark-950 shadow-sm font-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Cân nặng ({profile.unit})
        </button>

        <button
          onClick={() => setMetric('exercise_1rm')}
          className={`py-2 rounded-xl transition-all ${
            metric === 'exercise_1rm'
              ? 'bg-primary-500 text-dark-950 shadow-sm font-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Sức mạnh (1RM)
        </button>
      </div>

      {/* Exercise Picker when 1RM selected */}
      {metric === 'exercise_1rm' && (
        <div className="bg-dark-900 p-3 rounded-2xl border border-white/5 flex items-center justify-between text-xs">
          <span className="text-gray-400 font-bold">Chọn bài tập:</span>
          <select
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(e.target.value)}
            className="bg-dark-850 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-primary-400 font-bold focus:outline-none"
          >
            {exercises.slice(0, 15).map(ex => (
              <option key={ex.id} value={ex.id} className="bg-dark-900 text-white">
                {ex.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Time Range Selector */}
      <div className="flex gap-1.5 justify-between">
        {(['7d', '30d', '90d', '6m', '1y', 'all'] as TimeRange[]).map((r) => (
          <button
            key={r}
            onClick={() => setTimeRange(r)}
            className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold uppercase transition-all ${
              timeRange === r
                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/40'
                : 'bg-dark-900 text-gray-400 border border-white/5 hover:text-white'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Main Chart Canvas Container */}
      <div className="p-4 rounded-3xl bg-gradient-to-b from-dark-850 to-dark-900 border border-white/10 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary-400" />
            <span className="font-bold text-gray-200">
              {metric === 'volume' && 'Tổng khối lượng nâng (Volume)'}
              {metric === 'weight' && 'Diễn biến cân nặng'}
              {metric === 'exercise_1rm' && `Tiến trình 1RM (${exercises.find(e => e.id === selectedExerciseId)?.name})`}
            </span>
          </div>

          {values.length > 0 && (
            <span className="font-mono font-black text-primary-400 text-sm">
              Mới nhất: {values[values.length - 1]} {profile.unit}
            </span>
          )}
        </div>

        {/* Chart Area */}
        {chartData.length >= 2 ? (
          <div className="w-full flex justify-center py-2">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#ffffff" strokeOpacity="0.05" />
              <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#ffffff" strokeOpacity="0.05" />
              <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#ffffff" strokeOpacity="0.05" />

              {/* Area Fill */}
              <polygon
                points={`${padding},${height - padding} ${pointsString} ${width - padding},${height - padding}`}
                fill="url(#chartGradient)"
              />

              {/* Polyline Line */}
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsString}
              />

              {/* Points */}
              {chartData.map((d, idx) => {
                const x = padding + (idx / Math.max(1, chartData.length - 1)) * (width - padding * 2);
                const y = height - padding - ((d.value - minValue) / rangeDiff) * (height - padding * 2);
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r={idx === chartData.length - 1 ? 5 : 3.5}
                    className="fill-dark-950 stroke-primary-400 stroke-2"
                  />
                );
              })}
            </svg>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-10 space-y-2">
            <TrendingUp className="w-8 h-8 mx-auto text-gray-600" />
            <p className="text-xs text-gray-400">
              Cần ít nhất 2 buổi tập hoặc 2 lần ghi số đo để vẽ biểu đồ tiến độ.
            </p>
          </div>
        )}
      </div>

      {/* PR Wall of Fame Section */}
      <div className="space-y-3">
        <div className="flex items-center space-x-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
            Bảng vàng Kỷ lục cá nhân (PR Wall of Fame)
          </h3>
        </div>

        {personalRecords.length === 0 ? (
          <div className="p-6 text-center bg-dark-900 rounded-2xl border border-white/5 space-y-2">
            <Award className="w-8 h-8 mx-auto text-gray-600" />
            <p className="text-xs text-gray-400">
              Chưa có kỷ lục nào. Hãy bắt đầu buổi tập và phá vỡ giới hạn bản thân!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {personalRecords.map((pr) => (
              <div
                key={pr.id}
                className="p-3.5 rounded-2xl bg-dark-900 border border-amber-500/20 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-black">
                    🏆
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">{pr.exerciseName}</h4>
                    <p className="text-[10px] text-gray-400">
                      {new Date(pr.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-amber-300 block">
                    {pr.weightKg} {profile.unit} × {pr.reps}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Est. 1RM: <strong className="text-primary-400">{pr.estimated1RM} {profile.unit}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
