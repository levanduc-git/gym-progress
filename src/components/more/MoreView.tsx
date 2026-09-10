import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExerciseLibrary } from '../exercises/ExerciseLibrary';
import { HistoryView } from '../history/HistoryView';
import { CalendarView } from '../calendar/CalendarView';
import { BodyTracker } from '../body/BodyTracker';
import { 
  Dumbbell, 
  History, 
  Calendar, 
  Scale, 
  Settings, 
  Download, 
  Upload, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Sparkles, 
  Cloud, 
  ShieldCheck,
  User,
  ChevronLeft
} from 'lucide-react';
import { exportAllDataAsJson, importAllDataFromJson } from '../../db/storage';
import { syncService } from '../../services/syncService';

type SubView = 'menu' | 'exercises' | 'history' | 'calendar' | 'body' | 'settings';

export const MoreView: React.FC = () => {
  const { profile, updateProfile, showToast } = useApp();
  const [activeSubView, setActiveSubView] = useState<SubView>('menu');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Backup download handler
  const handleExport = () => {
    const jsonStr = exportAllDataAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gym_progress_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast({ type: 'success', title: 'Đã xuất file sao lưu dữ liệu JSON' });
  };

  // Restore file handler
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importAllDataFromJson(content);
        if (success) {
          showToast({ type: 'success', title: 'Khôi phục dữ liệu thành công! Đang tải lại...' });
          setTimeout(() => window.location.reload(), 1200);
        } else {
          showToast({ type: 'warning', title: 'File sao lưu không hợp lệ' });
        }
      }
    };
    reader.readAsText(file);
  };

  const handleSyncCloud = async () => {
    setIsSyncing(true);
    const ok = await syncService.syncWithCloud();
    setIsSyncing(false);
    if (ok) {
      showToast({ type: 'success', title: 'Đã đồng bộ dữ liệu đám mây thành công!' });
    }
  };

  if (activeSubView === 'exercises') {
    return (
      <div>
        <div className="p-3 border-b border-white/10 bg-dark-900/80 backdrop-blur">
          <button
            onClick={() => setActiveSubView('menu')}
            className="flex items-center space-x-1.5 text-xs text-primary-400 font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại Menu</span>
          </button>
        </div>
        <ExerciseLibrary />
      </div>
    );
  }

  if (activeSubView === 'history') {
    return (
      <div>
        <div className="p-3 border-b border-white/10 bg-dark-900/80 backdrop-blur">
          <button
            onClick={() => setActiveSubView('menu')}
            className="flex items-center space-x-1.5 text-xs text-primary-400 font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại Menu</span>
          </button>
        </div>
        <HistoryView />
      </div>
    );
  }

  if (activeSubView === 'calendar') {
    return (
      <div>
        <div className="p-3 border-b border-white/10 bg-dark-900/80 backdrop-blur">
          <button
            onClick={() => setActiveSubView('menu')}
            className="flex items-center space-x-1.5 text-xs text-primary-400 font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại Menu</span>
          </button>
        </div>
        <CalendarView />
      </div>
    );
  }

  if (activeSubView === 'body') {
    return (
      <div>
        <div className="p-3 border-b border-white/10 bg-dark-900/80 backdrop-blur">
          <button
            onClick={() => setActiveSubView('menu')}
            className="flex items-center space-x-1.5 text-xs text-primary-400 font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại Menu</span>
          </button>
        </div>
        <BodyTracker />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5 animate-scale-in">
      {/* User Profile Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-dark-850 to-dark-900 border border-white/10 shadow-lg flex items-center space-x-3.5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center font-black text-dark-950 text-xl shadow-md shadow-primary-500/20 shrink-0">
          {profile.name ? profile.name[0].toUpperCase() : 'G'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-black text-white truncate">{profile.name}</h3>
          <p className="text-xs text-gray-400">
            Mục tiêu: <span className="text-primary-400 font-semibold">{profile.goal}</span> • {profile.experience}
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-gray-400 mt-0.5">
            <span>{profile.weightKg} {profile.unit}</span>
            <span>• {profile.heightCm} cm</span>
          </div>
        </div>
      </div>

      {/* Main Features Menu Grid */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block px-1">
          Tính năng & Tiện ích
        </span>

        {/* 1. Exercise Library */}
        <div
          onClick={() => setActiveSubView('exercises')}
          className="p-3.5 rounded-2xl bg-dark-900 border border-white/5 hover:border-primary-500/40 flex items-center justify-between cursor-pointer group shadow-sm transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-primary-500/15 text-primary-400 flex items-center justify-center">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white group-hover:text-primary-400 transition-colors">
                Thư viện bài tập (Exercise Library)
              </h4>
              <p className="text-[10px] text-gray-400">55+ bài tập minh họa, hướng dẫn và lỗi sai</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
        </div>

        {/* 2. Workout History */}
        <div
          onClick={() => setActiveSubView('history')}
          className="p-3.5 rounded-2xl bg-dark-900 border border-white/5 hover:border-primary-500/40 flex items-center justify-between cursor-pointer group shadow-sm transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white group-hover:text-primary-400 transition-colors">
                Lịch sử các buổi tập (History)
              </h4>
              <p className="text-[10px] text-gray-400">Xem lại từng hiệp tập và khối lượng volume</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
        </div>

        {/* 3. Calendar & Rest Days */}
        <div
          onClick={() => setActiveSubView('calendar')}
          className="p-3.5 rounded-2xl bg-dark-900 border border-white/5 hover:border-primary-500/40 flex items-center justify-between cursor-pointer group shadow-sm transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white group-hover:text-primary-400 transition-colors">
                Lịch tập & Nghỉ ngơi (Calendar)
              </h4>
              <p className="text-[10px] text-gray-400">Theo dõi chuỗi ngày tập, ngày nghỉ</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
        </div>

        {/* 4. Body Tracker & Progress Photos */}
        <div
          onClick={() => setActiveSubView('body')}
          className="p-3.5 rounded-2xl bg-dark-900 border border-white/5 hover:border-primary-500/40 flex items-center justify-between cursor-pointer group shadow-sm transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white group-hover:text-primary-400 transition-colors">
                Số đo cơ thể & Ảnh tiến độ
              </h4>
              <p className="text-[10px] text-gray-400">Cân nặng, % mỡ, số đo các vòng, ảnh Front/Side</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
        </div>
      </div>

      {/* Settings & Preferences */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block px-1">
          Cài đặt ứng dụng
        </span>

        <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-3.5 text-xs">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Volume2 className="w-4 h-4 text-primary-400" />
              <span className="font-bold text-gray-200">Âm thanh đếm ngược Rest Timer</span>
            </div>
            <button
              onClick={() => updateProfile({ soundEnabled: !profile.soundEnabled })}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                profile.soundEnabled ? 'bg-primary-500' : 'bg-dark-750'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  profile.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Haptics Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center space-x-2.5">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-gray-200">Rung phản hồi (Haptic feedback)</span>
            </div>
            <button
              onClick={() => updateProfile({ hapticsEnabled: !profile.hapticsEnabled })}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                profile.hapticsEnabled ? 'bg-primary-500' : 'bg-dark-750'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  profile.hapticsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Unit System */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="font-bold text-gray-200">Đơn vị đo lường</span>
            <div className="flex rounded-xl bg-dark-850 p-1 border border-white/5">
              <button
                onClick={() => updateProfile({ unit: 'kg' })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  profile.unit === 'kg' ? 'bg-primary-500 text-dark-950 font-black' : 'text-gray-400'
                }`}
              >
                kg
              </button>
              <button
                onClick={() => updateProfile({ unit: 'lb' })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  profile.unit === 'lb' ? 'bg-primary-500 text-dark-950 font-black' : 'text-gray-400'
                }`}
              >
                lb
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Sync & Backup Data */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block px-1">
          Đồng bộ & Sao lưu (Offline-First)
        </span>

        <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-3">
          {/* Cloud Sync Status */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold text-white block">Đồng bộ Cloud / Supabase</span>
                <span className="text-[10px] text-emerald-400">Trực tuyến (Online First)</span>
              </div>
            </div>
            <button
              onClick={handleSyncCloud}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-xs font-bold text-gray-200 border border-white/10"
            >
              {isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ ngay'}
            </button>
          </div>

          {/* Backup & Restore JSON Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
            <button
              onClick={handleExport}
              className="p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-xs font-bold text-gray-300 flex items-center justify-center space-x-1.5 border border-white/5"
            >
              <Download className="w-3.5 h-3.5 text-primary-400" />
              <span>Xuất sao lưu (JSON)</span>
            </button>

            <label className="p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-xs font-bold text-gray-300 flex items-center justify-center space-x-1.5 border border-white/5 cursor-pointer text-center">
              <Upload className="w-3.5 h-3.5 text-blue-400" />
              <span>Nhập sao lưu</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
