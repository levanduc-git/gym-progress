import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, Trophy, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 space-y-2 pointer-events-none">
      {toasts.map(toast => {
        let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
        let borderColor = 'border-blue-500/30';
        let bgColor = 'bg-dark-850/95';

        if (toast.type === 'success') {
          icon = <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />;
          borderColor = 'border-emerald-500/40';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
          borderColor = 'border-amber-500/40';
        } else if (toast.type === 'pr') {
          icon = <Trophy className="w-5 h-5 text-amber-300 shrink-0 animate-bounce" />;
          borderColor = 'border-amber-400/60';
          bgColor = 'bg-gradient-to-r from-dark-850 to-amber-950/40';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border ${borderColor} ${bgColor} backdrop-blur-md shadow-xl transition-all duration-300 animate-scale-in`}
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              {icon}
              <div className="text-left">
                <p className="text-xs font-bold text-gray-100">{toast.title}</p>
                {toast.message && (
                  <p className="text-[11px] text-gray-400 truncate max-w-[240px]">{toast.message}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
