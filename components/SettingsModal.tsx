
import React, { useState } from 'react';
import { useTranslation, Language } from '../LanguageContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('general');
  const { language, setLanguage, t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-panel-dark border border-border-dark rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[500px] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar Tabs */}
        <div className="w-full lg:w-48 bg-background-dark/50 border-r border-border-dark flex flex-row lg:flex-col p-4 lg:p-6 gap-2">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex-1 lg:flex-none flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'general' ? 'bg-primary text-black shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            {t('terminal')}
          </button>
          <button 
            onClick={() => setActiveTab('stream')}
            className={`flex-1 lg:flex-none flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'stream' ? 'bg-primary text-black shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-sm">rss_feed</span>
            {t('streams')}
          </button>
          <button 
            onClick={() => setActiveTab('api')}
            className={`flex-1 lg:flex-none flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'api' ? 'bg-primary text-black shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-sm">api</span>
            {t('engine')}
          </button>
          
          <div className="hidden lg:block mt-auto pt-6 border-t border-border-dark/30">
             <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Version</div>
             <div className="text-[10px] text-primary font-mono font-bold">Quackco v2.1.4-beta</div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between p-6 border-b border-border-dark">
            <h2 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">settings</span>
              {t('system_config')}
            </h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors text-slate-500 hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                {/* Language Section */}
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-border-dark/30 pb-2">{t('language')}</h3>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-2">{t('select_lang')}</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setLanguage('en')}
                        className={`flex-1 p-2 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${
                          language === 'en' ? 'border-primary bg-primary/10 text-primary' : 'border-border-dark bg-background-dark text-slate-500 hover:text-white'
                        }`}
                      >
                        English
                      </button>
                      <button 
                        onClick={() => setLanguage('zh')}
                        className={`flex-1 p-2 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${
                          language === 'zh' ? 'border-primary bg-primary/10 text-primary' : 'border-border-dark bg-background-dark text-slate-500 hover:text-white'
                        }`}
                      >
                        简体中文
                      </button>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-border-dark/30 pb-2">{t('visual_perf')}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{t('high_freq_ticker')}</div>
                      <p className="text-[10px] text-slate-500">Smooth 60FPS animation for market data stream.</p>
                    </div>
                    <div className="w-10 h-5 bg-primary/20 rounded-full relative border border-primary">
                      <div className="absolute right-1 top-0.5 w-3.5 h-3.5 bg-primary rounded-full shadow-[0_0_8px_rgba(17,212,17,0.5)]"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{t('neon_glow')}</div>
                      <p className="text-[10px] text-slate-500">Enable aesthetic glow effects for high-volatility moves.</p>
                    </div>
                    <div className="w-10 h-5 bg-background-dark rounded-full relative border border-border-dark">
                      <div className="absolute left-1 top-0.5 w-3.5 h-3.5 bg-slate-600 rounded-full"></div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'stream' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-border-dark/30 pb-2">Data Update Interval</h3>
                  <div className="space-y-4">
                    <input type="range" className="w-full h-1 bg-border-dark rounded-lg appearance-none cursor-pointer accent-primary" min="10" max="300" step="10" />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>10S (TURBO)</span>
                      <span className="text-primary font-bold">30S (DEFAULT)</span>
                      <span>300S (ECO)</span>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex gap-4 items-start">
                   <span className="material-symbols-outlined text-primary mt-1">psychology</span>
                   <div>
                     <h4 className="text-sm font-black text-white uppercase tracking-tight">AI Neural Engine Active</h4>
                     <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                       Powered by Gemini 3.0 Pro. Our engine provides contextual alpha based on your current terminal view.
                     </p>
                   </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-border-dark bg-background-dark/30 flex gap-4">
             <button 
               onClick={onClose}
               className="flex-1 bg-primary text-black py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(17,212,17,0.3)] hover:scale-[1.02] transition-transform active:scale-95"
             >
               {t('apply')}
             </button>
             <button 
               onClick={onClose}
               className="px-6 border border-border-dark text-slate-500 hover:text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white/5"
             >
               {t('discard')}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
