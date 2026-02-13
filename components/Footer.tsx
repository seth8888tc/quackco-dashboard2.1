
import React from 'react';

interface FooterProps {
  lastUpdate: string;
  isSyncing?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ lastUpdate, isSyncing }) => {
  return (
    <footer className="h-8 border-t border-border-dark bg-background-dark flex items-center justify-between px-4 text-[10px] text-slate-500">
      <div className="flex gap-4">
        <span className="flex items-center gap-1">
          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            isSyncing ? 'bg-white scale-125' : 'bg-primary shadow-[0_0_8px_rgba(17,212,17,0.8)]'
          }`}></span>
          {isSyncing ? 'SYNCING DATA...' : 'SYSTEM ONLINE'}
        </span>
        <span className="border-l border-border-dark pl-4 uppercase tracking-tighter">
          Update: {lastUpdate}
        </span>
        <span className="border-l border-border-dark pl-4 uppercase tracking-tighter">
          Lat: 1.2ms
        </span>
        <span className="border-l border-border-dark pl-4 uppercase tracking-tighter hidden sm:inline">
          Terminal Status: Ready
        </span>
      </div>
      <div className="flex gap-4 uppercase font-bold">
        <span className="hover:text-primary cursor-pointer transition-colors">Documentation</span>
        <span className="text-slate-600">© 2024 V2.1 QUACKCOPULSE PLATFORM</span>
      </div>
    </footer>
  );
};