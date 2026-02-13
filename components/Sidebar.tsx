
import React from 'react';
import { useTranslation } from '../LanguageContext';

type ViewType = 'overview' | 'macro' | 'futures' | 'fund' | 'news' | 'forex';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onOpenSettings: () => void;
  onOpenChat: () => void;
  onOpenProfile: () => void;
}

const NavItem: React.FC<{ icon: string; title: string; active?: boolean; onClick: () => void }> = ({ icon, title, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`${active ? 'text-primary bg-primary/10' : 'text-slate-500'} p-2 rounded-lg transition-all hover:scale-110 relative group`}
    title={title}
  >
    <span className="material-symbols-outlined">{icon}</span>
    <span className="absolute left-14 bg-panel-dark border border-border-dark px-2 py-1 text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-50 shadow-xl">
      {title}
    </span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onOpenSettings, onOpenChat, onOpenProfile }) => {
  const { t } = useTranslation();
  
  return (
    <aside className="w-16 flex-shrink-0 border-r border-border-dark flex flex-col items-center py-6 bg-panel-dark z-20">
      <div className="mb-10 px-2 w-full flex flex-col items-center gap-1 group">
        <button 
          onClick={onOpenChat}
          className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-green-600 flex items-center justify-center shadow-[0_0_15px_rgba(17,212,17,0.4)] hover:shadow-[0_0_25px_rgba(17,212,17,0.6)] transition-all active:scale-95 group"
          title={t('ask_ai')}
        >
          <span className="absolute inset-0 rounded-xl bg-primary/30 animate-ping"></span>
          <span className="material-icons text-white text-2xl relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">bolt</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full border-2 border-primary"></span>
        </button>
        <span className="text-[8px] font-black text-primary/80 uppercase tracking-tighter text-center leading-none mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
          {t('ask_ai')}
        </span>
      </div>
      
      <nav className="flex flex-col gap-6 flex-1">
        <NavItem icon="dashboard" title={t('overview')} active={activeView === 'overview'} onClick={() => onViewChange('overview')} />
        <NavItem icon="public" title={t('macro')} active={activeView === 'macro'} onClick={() => onViewChange('macro')} />
        <NavItem icon="currency_exchange" title={t('forex')} active={activeView === 'forex'} onClick={() => onViewChange('forex')} />
        <NavItem icon="candlestick_chart" title={t('futures')} active={activeView === 'futures'} onClick={() => onViewChange('futures')} />
        <NavItem icon="account_balance" title={t('fund')} active={activeView === 'fund'} onClick={() => onViewChange('fund')} />
        <NavItem icon="newspaper" title={t('news')} active={activeView === 'news'} onClick={() => onViewChange('news')} />
      </nav>

      <div className="mt-auto space-y-6 flex flex-col items-center">
        <button 
          onClick={onOpenSettings}
          className="text-slate-500 hover:text-white transition-all hover:rotate-45"
          title={t('settings')}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div 
          onClick={onOpenProfile}
          className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/50 cursor-pointer transition-all hover:scale-110 hover:border-primary shadow-[0_0_10px_rgba(17,212,17,0.3)]"
        >
          <img 
            alt="Profile" 
            src="https://picsum.photos/seed/quackco/64/64" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </aside>
  );
};
