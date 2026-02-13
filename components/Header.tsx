
import React from 'react';
import { useTranslation } from '../LanguageContext';

interface HeaderProps {
  activeView: string;
  isAutoSyncEnabled: boolean;
  onToggleAutoSync: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, isAutoSyncEnabled, onToggleAutoSync }) => {
  const { t } = useTranslation();
  
  const getBreadcrumb = () => {
    switch(activeView) {
      case 'macro': return `Macro Analysis / ${t('macro')}`;
      case 'futures': return `Derivatives / ${t('futures')}`;
      case 'fund': return `Portfolio / ${t('fund')}`;
      case 'news': return `Intelligence / ${t('news')}`;
      case 'forex': return `Currencies / ${t('forex')}`;
      default: return `Markets / ${t('overview')}`;
    }
  };

  return (
    <header className="border-b border-border-dark bg-panel-dark/50 backdrop-blur-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold tracking-tight uppercase text-white">
          QuackcoPulse <span className="text-primary font-light">Pro v2.1</span>
        </h1>
        <div className="h-4 w-px bg-border-dark mx-2"></div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          {getBreadcrumb()}
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-background-dark border border-border-dark px-3 py-1 rounded">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">{t('secure_connected')}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`text-[10px] uppercase tracking-tighter transition-colors ${isAutoSyncEnabled ? 'text-primary font-bold' : 'text-slate-500'}`}>
            {t('auto_sync')} {isAutoSyncEnabled ? 'ON' : 'OFF'}
          </span>
          <button 
            onClick={onToggleAutoSync}
            className={`w-10 h-5 rounded-full relative transition-all duration-300 border ${
              isAutoSyncEnabled ? 'bg-primary/20 border-primary' : 'bg-slate-800 border-slate-700'
            }`}
          >
            <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all duration-300 shadow-sm ${
              isAutoSyncEnabled ? 'right-1 bg-primary' : 'left-1 bg-slate-500'
            }`}></div>
          </button>
        </div>
      </div>
    </header>
  );
};
