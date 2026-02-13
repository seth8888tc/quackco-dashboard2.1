
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Ticker } from './components/Ticker';
import { PerformanceHeatmap } from './components/PerformanceHeatmap';
import { SectorReturns } from './components/SectorReturns';
import { FuturesMatrix } from './components/FuturesMatrix';
import { Watchlist } from './components/Watchlist';
import { Footer } from './components/Footer';
import { MacroDeepDive } from './components/MacroDeepDive';
import { FuturesAnalysis } from './components/FuturesAnalysis';
import { FundExplorer } from './components/FundExplorer';
import { NewsCenter } from './components/NewsCenter';
import { ForexMarket } from './components/ForexMarket';
import { SettingsModal } from './components/SettingsModal';
import { ProfileModal } from './components/ProfileModal';
import { AiChatWindow } from './components/AiChatWindow';
import { getMarketIntelligence } from './geminiService';
import { LanguageProvider } from './LanguageContext';

type ViewType = 'overview' | 'macro' | 'futures' | 'fund' | 'news' | 'forex';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('overview');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState<string>("Initializing Neural Engine...");
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString());
  
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Real-time tick simulation state
  const [tick, setTick] = useState(0);

  const fetchInsight = useCallback(async (isManual: boolean = false) => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      const insight = await getMarketIntelligence({ 
        context: activeView,
        selectedSector: selectedSector || 'Global'
      });
      setAiInsight(insight);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (e) {
      setAiInsight("Monitoring standard feeds...");
    } finally {
      setTimeout(() => setIsSyncing(false), 800);
    }
  }, [activeView, selectedSector, isSyncing]);

  useEffect(() => {
    fetchInsight();
    const interval = setInterval(() => {
      if (isAutoSyncEnabled) fetchInsight();
    }, 45000);
    
    // UI "Pulse" simulation every 3 seconds
    const tickInterval = setInterval(() => {
      setTick(t => t + 1);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(tickInterval);
    };
  }, [isAutoSyncEnabled, fetchInsight]);

  return (
    <div className="flex h-screen w-full bg-background-dark font-sans overflow-hidden text-slate-200">
      <Sidebar 
        activeView={activeView} 
        onViewChange={(view) => { setActiveView(view); setSelectedSector(null); }} 
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeView={activeView} 
          isAutoSyncEnabled={isAutoSyncEnabled} 
          onToggleAutoSync={() => setIsAutoSyncEnabled(!isAutoSyncEnabled)} 
        />
        <Ticker 
          aiInsight={aiInsight} 
          isSyncing={isSyncing} 
          onPulse={() => fetchInsight(true)} 
        />
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeView === 'overview' && (
            <>
              <section className="grid grid-cols-12 gap-4 h-auto lg:min-h-[320px]">
                <div className="col-span-12 lg:col-span-8">
                  <PerformanceHeatmap tick={tick} selectedSector={selectedSector} onClearSector={() => setSelectedSector(null)} />
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <SectorReturns selectedSector={selectedSector} onSelectSector={setSelectedSector} />
                </div>
              </section>
              <section><FuturesMatrix /></section>
              <section><Watchlist tick={tick} /></section>
            </>
          )}

          {activeView === 'macro' && <MacroDeepDive />}
          {activeView === 'futures' && <FuturesAnalysis />}
          {activeView === 'fund' && <FundExplorer />}
          {activeView === 'news' && <NewsCenter />}
          {activeView === 'forex' && <ForexMarket />}
        </div>

        <Footer lastUpdate={lastUpdate} isSyncing={isSyncing} />
      </main>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <AiChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);

export default App;
