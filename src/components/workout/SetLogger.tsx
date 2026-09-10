import React from 'react';
import { useApp } from '../../context/AppContext';
import { SetLog, SetType } from '../../db/schema';
import { Check, Trash2, Copy, Flame, HelpCircle } from 'lucide-react';
import { StepperButton } from '../common/StepperButton';
import { RPE_MAP } from '../../utils/calculations';

interface SetLoggerProps {
  setLog: SetLog;
  onUpdate: (updates: Partial<SetLog>) => void;
  onComplete: () => void;
  onDelete: () => void;
  unit: string;
}

export const SetLogger: React.FC<SetLoggerProps> = ({
  setLog,
  onUpdate,
  onComplete,
  onDelete,
  unit,
}) => {
  const setTypeLabels: Record<SetType, { label: string; tag: string; color: string }> = {
    regular: { label: 'Bình thường', tag: 'R', color: 'bg-dark-800 text-gray-300' },
    warmup: { label: 'Khởi động', tag: 'W', color: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' },
    dropset: { label: 'Drop Set', tag: 'D', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
    failure: { label: 'Tới giới hạn', tag: 'F', color: 'bg-rose-500/20 text-rose-400 border border-rose-500/30' },
  };

  const cycleSetType = () => {
    const types: SetType[] = ['regular', 'warmup', 'dropset', 'failure'];
    const nextIdx = (types.indexOf(setLog.setType) + 1) % types.length;
    onUpdate({ setType: types[nextIdx] });
  };

  return (
    <div
      className={`p-3 rounded-2xl border transition-all duration-200 ${
        setLog.isCompleted
          ? 'bg-gradient-to-r from-emerald-950/40 to-dark-900 border-primary-500/50 shadow-sm'
          : 'bg-dark-900 border-white/5 hover:border-white/10'
      }`}
    >
      {/* Top Meta: Set Number, Ghost Prev Data, Type Tag */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs">
        <div className="flex items-center space-x-2">
          {/* Set Type Switcher Button */}
          <button
            type="button"
            onClick={cycleSetType}
            className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center transition-all ${
              setTypeLabels[setLog.setType].color
            }`}
            title={`Loại set: ${setTypeLabels[setLog.setType].label} (Bấm để đổi)`}
          >
            {setLog.setType === 'regular' ? setLog.setNumber : setTypeLabels[setLog.setType].tag}
          </button>

          <span className="font-bold text-white text-xs">Set {setLog.setNumber}</span>

          {/* Ghost Previous Performance */}
          {setLog.previousLog && (
            <span className="text-[10px] text-gray-400 bg-dark-800/80 px-2 py-0.5 rounded-md border border-white/5 truncate">
              Trước: {setLog.previousLog.weightKg}kg × {setLog.previousLog.reps}
            </span>
          )}
        </div>

        {/* Delete Set Button */}
        <button
          type="button"
          onClick={onDelete}
          className="p-1 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          title="Xóa hiệp này"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Fast Input Controls (Steppers) */}
      <div className="grid grid-cols-2 gap-3 py-2.5">
        {/* Weight Stepper */}
        <StepperButton
          value={setLog.weightKg}
          step={2.5}
          min={0}
          unit={unit}
          label="Mức tạ"
          onChange={(val) => onUpdate({ weightKg: val })}
        />

        {/* Reps Stepper */}
        <StepperButton
          value={setLog.reps}
          step={1}
          min={1}
          unit="reps"
          label="Số reps"
          onChange={(val) => onUpdate({ reps: val })}
        />
      </div>

      {/* Bottom Row: RPE Selector & Big Complete Set Checkmark */}
      <div className="flex items-center justify-between pt-1 gap-2">
        {/* RPE Selector */}
        <div className="flex items-center space-x-1.5 bg-dark-850 px-2.5 py-1.5 rounded-xl border border-white/5">
          <span className="text-[10px] text-gray-400 font-bold uppercase">RPE</span>
          <select
            value={setLog.rpe || 8}
            onChange={(e) => onUpdate({ rpe: parseFloat(e.target.value) })}
            className="bg-transparent text-xs font-bold text-primary-400 focus:outline-none cursor-pointer"
          >
            <option value={6} className="bg-dark-900 text-white">6 (Dễ - còn 4 reps)</option>
            <option value={7} className="bg-dark-900 text-white">7 (Còn 3 reps)</option>
            <option value={7.5} className="bg-dark-900 text-white">7.5 (Còn 2-3 reps)</option>
            <option value={8} className="bg-dark-900 text-white">8 (Chuẩn - còn 2 reps)</option>
            <option value={8.5} className="bg-dark-900 text-white">8.5 (Còn 1-2 reps)</option>
            <option value={9} className="bg-dark-900 text-white">9 (Nặng - còn 1 rep)</option>
            <option value={9.5} className="bg-dark-900 text-white">9.5 (Gần chạm Failure)</option>
            <option value={10} className="bg-dark-900 text-white">10 (Hết sức - Failure)</option>
          </select>
        </div>

        {/* Complete Checkmark CTA Button */}
        <button
          type="button"
          onClick={onComplete}
          className={`flex-1 py-2 px-3 rounded-xl font-black text-xs flex items-center justify-center space-x-1.5 transition-all active:scale-95 shadow-md ${
            setLog.isCompleted
              ? 'bg-primary-500 text-dark-950 shadow-primary-500/20'
              : 'bg-dark-800 hover:bg-dark-750 text-gray-300 border border-white/10 hover:border-primary-500/40'
          }`}
        >
          <Check className={`w-4 h-4 stroke-[3] ${setLog.isCompleted ? 'text-dark-950' : 'text-primary-400'}`} />
          <span>{setLog.isCompleted ? 'HOÀN THÀNH' : 'XÁC NHẬN SET'}</span>
        </button>
      </div>
    </div>
  );
};
