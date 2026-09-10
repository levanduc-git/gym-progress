import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  const [deviceMode, setDeviceMode] = useState<'mobile_frame' | 'full_width'>('mobile_frame');

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-start text-gray-100 relative selection:bg-primary-500 selection:text-white">
      {/* Viewport Mode Switcher (For Desktop Testing & Preview) */}
      <div className="hidden lg:flex fixed top-3 right-4 z-40 items-center bg-dark-900/90 border border-white/10 rounded-full px-3 py-1.5 shadow-lg backdrop-blur space-x-2 text-xs text-gray-400">
        <span className="text-[11px] font-semibold text-gray-300">Chế độ xem:</span>
        <button
          onClick={() => setDeviceMode('mobile_frame')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full transition-all ${
            deviceMode === 'mobile_frame'
              ? 'bg-primary-500 text-dark-950 font-bold shadow-sm'
              : 'hover:text-white hover:bg-white/5'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile App</span>
        </button>
        <button
          onClick={() => setDeviceMode('full_width')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full transition-all ${
            deviceMode === 'full_width'
              ? 'bg-primary-500 text-dark-950 font-bold shadow-sm'
              : 'hover:text-white hover:bg-white/5'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Width</span>
        </button>
      </div>

      {/* Main Container Wrapper */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceMode === 'mobile_frame'
            ? 'max-w-[440px] my-0 lg:my-6 min-h-screen lg:min-h-[860px] lg:max-h-[920px] lg:rounded-[44px] lg:border-[6px] lg:border-dark-800 lg:shadow-[0_25px_70px_rgba(0,0,0,0.8)] lg:overflow-hidden flex flex-col relative'
            : 'max-w-4xl min-h-screen flex flex-col relative'
        }`}
      >
        {/* Dynamic Island / Speaker Notch for Mobile Frame mode */}
        {deviceMode === 'mobile_frame' && (
          <div className="hidden lg:flex w-full justify-center pt-2 pb-1 bg-dark-950 absolute top-0 left-0 right-0 z-40">
            <div className="w-24 h-4 bg-black rounded-full border border-white/5 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-dark-900 mr-2 border border-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
            </div>
          </div>
        )}

        {/* Inner Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden pt-0 lg:pt-3 pb-24">
          {children}
        </div>
      </div>
    </div>
  );
};
