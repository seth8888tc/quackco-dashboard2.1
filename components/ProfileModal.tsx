
import React from 'react';
import { useTranslation } from '../LanguageContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div 
        className="bg-panel-dark border border-border-dark rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-32 bg-gradient-to-r from-primary/20 to-blue-500/20">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="absolute -bottom-10 left-8">
            <div className="w-20 h-20 rounded-2xl border-4 border-panel-dark overflow-hidden bg-background-dark shadow-xl">
              <img src="https://picsum.photos/seed/quackco/128/128" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="pt-14 px-8 pb-8 space-y-6">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              Quackco_Trader_Alpha
              <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded font-black border border-primary/30 uppercase tracking-widest">PRO TIER</span>
            </h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Terminal ID: QP-8821-X99</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background-dark p-4 rounded-2xl border border-border-dark">
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Trading Personality</div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                Growth-Oriented
              </div>
            </div>
            <div className="bg-background-dark p-4 rounded-2xl border border-border-dark">
              <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Security Status</div>
              <div className="text-xs font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                Encrypted Pulse
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Account Overview</h3>
             <div className="space-y-2">
               {[
                 { label: 'Market Access', val: 'Global (All Exchanges)', status: 'Active' },
                 { label: 'Neural Quota', val: '92k/100k Tokens', status: 'Healthy' },
                 { label: 'Linked Accounts', val: 'IBKR, Binance, Alpaca', status: 'Syncing' }
               ].map(item => (
                 <div key={item.label} className="flex justify-between items-center py-2 border-b border-border-dark/30">
                   <div>
                     <div className="text-[11px] font-bold text-slate-300">{item.label}</div>
                     <div className="text-[9px] text-slate-500 font-mono">{item.val}</div>
                   </div>
                   <span className="text-[9px] font-black text-primary uppercase">{item.status}</span>
                 </div>
               ))}
             </div>
          </div>

          <button className="w-full bg-primary text-black py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all">
            MANAGE TERMINAL ACCESS
          </button>
        </div>
      </div>
    </div>
  );
};
