import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Layers, Dumbbell, TrendingUp, MoreHorizontal, Sparkles } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, activeSession } = useApp();

  interface NavItem {
    id: 'home' | 'programs' | 'workout' | 'progress' | 'more';
    label: string;
    icon: typeof Home;
    badge?: string;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'programs', label: 'Lịch tập', icon: Layers },
    { 
      id: 'workout', 
      label: activeSession ? 'Đang tập' : 'Tập luyện', 
      icon: Dumbbell,
      badge: activeSession ? '●' : undefined 
    },
    { id: 'progress', label: 'Tiến độ', icon: TrendingUp },
    { id: 'more', label: 'Thêm', icon: MoreHorizontal },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] lg:max-w-4xl z-40 bg-dark-950/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 safe-area-bottom shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isWorkoutActive = item.id === 'workout' && !!activeSession;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 relative ${
                isActive
                  ? 'text-primary-400 font-bold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {/* Active Highlight Indicator Bar */}
              {isActive && (
                <div className="absolute -top-2 w-8 h-1 bg-primary-500 rounded-full shadow-[0_0_8px_#10b981]" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-primary-400' : ''
                  } ${isWorkoutActive ? 'animate-bounce-subtle text-emerald-400' : ''}`}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                )}
              </div>

              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
