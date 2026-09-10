import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Program } from '../../db/schema';
import { ProgramBuilder } from './ProgramBuilder';
import { 
  Plus, 
  Copy, 
  Edit3, 
  Trash2, 
  Check, 
  Dumbbell, 
  Layers, 
  Sparkles, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const ProgramsView: React.FC = () => {
  const { programs, activeProgram, setActiveProgram, deleteProgram, duplicateProgram } = useApp();

  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);
  const [editingProgram, setEditingProgram] = useState<Program | undefined>(undefined);

  const handleEdit = (prog: Program, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProgram(prog);
    setIsBuilderOpen(true);
  };

  const handleDuplicate = (progId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const cloned = duplicateProgram(progId);
    setEditingProgram(cloned);
    setIsBuilderOpen(true);
  };

  const handleDelete = (progId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa giáo án này? Lịch sử các buổi tập trước vẫn được giữ nguyên.')) {
      deleteProgram(progId);
    }
  };

  const templates = programs.filter(p => p.isTemplate);
  const customPrograms = programs.filter(p => !p.isTemplate);

  return (
    <div className="p-4 space-y-5 animate-scale-in">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">Chương trình tập</h2>
          <p className="text-xs text-gray-400">Chọn giáo án chuẩn hoặc tự thiết kế</p>
        </div>
        <button
          onClick={() => {
            setEditingProgram(undefined);
            setIsBuilderOpen(true);
          }}
          className="px-3.5 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo giáo án</span>
        </button>
      </div>

      {/* 1. Custom User Programs Section */}
      {customPrograms.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Giáo án của tôi (My Programs)
            </h3>
          </div>

          <div className="space-y-3">
            {customPrograms.map((prog) => {
              const isActive = activeProgram?.id === prog.id;
              return (
                <div
                  key={prog.id}
                  onClick={() => setActiveProgram(prog.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-dark-850 to-emerald-950/30 border-primary-500 shadow-lg ring-1 ring-primary-500/50'
                      : 'bg-dark-900 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-black text-base text-white">{prog.name}</h4>
                        {isActive && (
                          <span className="text-[10px] bg-primary-500 text-dark-950 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>ĐANG SỬ DỤNG</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{prog.description}</p>
                    </div>
                  </div>

                  {/* Workouts list chips */}
                  <div className="flex gap-1.5 overflow-x-auto py-1 mb-3 no-scrollbar">
                    {prog.workouts.map((w, idx) => (
                      <span
                        key={w.id}
                        className="text-[10px] font-semibold bg-dark-800 text-gray-300 px-2 py-1 rounded-lg border border-white/5 shrink-0"
                      >
                        D{idx + 1}: {w.isRestDay ? 'Nghỉ' : w.name.split('—')[1] || w.name}
                      </span>
                    ))}
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <span className="text-[11px] text-gray-400 font-medium">
                      {prog.workouts.filter(w => !w.isRestDay).length} buổi tập / tuần
                    </span>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={(e) => handleEdit(prog, e)}
                        className="px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-750 text-gray-300 font-medium text-xs flex items-center space-x-1 border border-white/5"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Sửa</span>
                      </button>
                      <button
                        onClick={(e) => handleDuplicate(prog.id, e)}
                        className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-gray-300 border border-white/5"
                        title="Nhân bản"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(prog.id, e)}
                        className="p-1.5 rounded-lg bg-dark-800 hover:bg-rose-500/20 text-rose-400 border border-white/5"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Official Pre-built Templates */}
      <div className="space-y-3">
        <div className="flex items-center space-x-1.5">
          <Layers className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
            Giáo án mẫu có sẵn (Pre-built Templates)
          </h3>
        </div>

        <div className="space-y-3">
          {templates.map((prog) => {
            const isActive = activeProgram?.id === prog.id;
            return (
              <div
                key={prog.id}
                onClick={() => setActiveProgram(prog.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-dark-850 to-emerald-950/30 border-primary-500 shadow-lg ring-1 ring-primary-500/50'
                    : 'bg-dark-900 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-black text-base text-white">{prog.name}</h4>
                      {isActive && (
                        <span className="text-[10px] bg-primary-500 text-dark-950 px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>ĐANG SỬ DỤNG</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{prog.description}</p>
                  </div>
                </div>

                {/* Workouts list chips */}
                <div className="flex gap-1.5 overflow-x-auto py-1 mb-3 no-scrollbar">
                  {prog.workouts.map((w, idx) => (
                    <span
                      key={w.id}
                      className="text-[10px] font-semibold bg-dark-800 text-gray-300 px-2 py-1 rounded-lg border border-white/5 shrink-0"
                    >
                      D{idx + 1}: {w.isRestDay ? 'Nghỉ' : w.name.split('—')[1] || w.name}
                    </span>
                  ))}
                </div>

                {/* Actions Row */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                  <span className="text-[11px] text-gray-400 font-medium">
                    {prog.daysPerWeek} buổi / tuần
                  </span>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={(e) => handleDuplicate(prog.id, e)}
                      className="px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-750 text-gray-300 font-medium text-xs flex items-center space-x-1 border border-white/5"
                    >
                      <Copy className="w-3 h-3 text-primary-400" />
                      <span>Sao chép & Tùy chỉnh</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Builder Modal */}
      {isBuilderOpen && (
        <ProgramBuilder
          initialProgram={editingProgram}
          onClose={() => {
            setIsBuilderOpen(false);
            setEditingProgram(undefined);
          }}
        />
      )}
    </div>
  );
};
