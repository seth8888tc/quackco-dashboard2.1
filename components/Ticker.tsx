
import React from 'react';
import { useTranslation } from '../LanguageContext';

interface TickerProps {
  aiInsight: string;
  isSyncing: boolean;
  onPulse: () => void;
}

const getTradingViewLink = (symbol: string) => {
  const cleanSymbol = symbol.replace('/', '');
  return `https://www.tradingview.com/chart/?symbol=${cleanSymbol}`;
};

export const Ticker: React.FC<TickerProps> = ({ aiInsight, isSyncing, onPulse }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-background-dark border-b border-border-dark overflow-hidden py-2 flex items-center">
      <button 
        onClick={onPulse}
        disabled={isSyncing}
        className={`flex-shrink-0 px-4 py-1 text-xs font-bold border-r border-border-dark z-10 transition-all duration-300 min-w-[100px] ${
          isSyncing 
            ? 'bg-primary text-black' 
            : 'bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer'
        }`}
      >
        {isSyncing ? t('syncing') : t('pulse')}
      </button>
      <div className="ticker-container flex-1">
        <div className="ticker-scroll whitespace-nowrap">
          <div className="inline-flex items-center gap-8 px-4">
            <a href={getTradingViewLink('SPY')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity">
              <span className="font-bold">SPY</span> 
              <span className="text-trend-up">442.10 (+1.2%)</span>
            </a>
            <a href={getTradingViewLink('QQQ')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity">
              <span className="font-bold">QQQ</span> 
              <span className="text-trend-up">371.45 (+1.8%)</span>
            </a>
            <a href={getTradingViewLink('VIX')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity">
              <span className="font-bold">VIX</span> 
              <span className="text-trend-down">14.02 (-4.2%)</span>
            </a>
            <span className="text-slate-500 text-xs">|</span>
            <span className="text-xs text-primary/80 uppercase tracking-wide font-semibold italic">
              {t('ai_intel')}: {aiInsight}
            </span>
            <span className="text-slate-500 text-xs">|</span>
            <span className="text-xs text-slate-300">FED CHAIR REITERATES DATA-DEPENDENT APPROACH...</span>
            <span className="text-xs text-slate-300">CHIP DEMAND DRIVES SECTOR RALLY...</span>
          </div>
          <div className="inline-flex items-center gap-8 px-4">
            <a href={getTradingViewLink('SPY')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs">
              <span className="font-bold">SPY</span> 
              <span className="text-trend-up">442.10 (+1.2%)</span>
            </a>
            <a href={getTradingViewLink('QQQ')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs">
              <span className="font-bold">QQQ</span> 
              <span className="text-trend-up">371.45 (+1.8%)</span>
            </a>
            <a href={getTradingViewLink('VIX')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs">
              <span className="font-bold">VIX</span> 
              <span className="text-trend-down">14.02 (-4.2%)</span>
            </a>
            <span className="text-slate-500 text-xs">|</span>
            <span className="text-xs text-primary/80 uppercase tracking-wide font-semibold italic">
              {t('ai_intel')}: {aiInsight}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
