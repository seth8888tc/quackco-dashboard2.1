
import React from 'react';
import { FUTURES_CATEGORIES } from '../constants';

const FutureCategoryColumn: React.FC<{ title: string; icon: string; assets: any[] }> = ({ title, icon, assets }) => (
  <div className="bg-panel-dark border border-border-dark rounded-xl overflow-hidden flex flex-col h-full">
    <div className="px-4 py-3 border-b border-border-dark bg-background-dark/30 flex items-center gap-2">
      <span className="material-symbols-outlined text-primary text-sm">{icon}</span>
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{title}</h2>
    </div>
    <div className="flex-1 divide-y divide-border-dark/50">
      {assets.map((asset) => (
        <div key={asset.symbol} className="px-4 py-3 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-1">
            <a 
              href={`https://www.tradingview.com/chart/?symbol=${asset.symbol}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] font-bold text-white group-hover:text-primary transition-colors hover:underline"
            >
              {asset.symbol}
            </a>
            <span className={`text-[10px] font-mono font-bold ${asset.change >= 0 ? 'text-trend-up' : 'text-trend-down'}`}>
              {asset.change >= 0 ? '+' : ''}{asset.change}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-slate-500 uppercase truncate pr-2">{asset.name}</span>
            <span className="text-[11px] font-mono text-slate-300 font-bold">{asset.price}</span>
          </div>
          <div className="mt-2 h-0.5 w-full bg-border-dark rounded-full overflow-hidden">
             <div 
               className={`h-full transition-all duration-1000 ${asset.change >= 0 ? 'bg-trend-up/40' : 'bg-trend-down/40'}`} 
               style={{ width: `${Math.min(Math.abs(asset.change) * 20 + 10, 100)}%` }}
             ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const FuturesAnalysis: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 space-y-6 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white uppercase tracking-tight">Global Derivatives Terminal</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Real-time futures contract monitoring & categorical analysis</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-panel-dark border border-border-dark text-slate-400 px-3 py-1.5 rounded text-[10px] font-bold uppercase hover:text-white transition-colors">
             Historical Basis
           </button>
           <button className="bg-primary/20 text-primary border border-primary/40 px-3 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-primary/30 transition-colors">
             Open Int. Map
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        <FutureCategoryColumn 
          title="Stock Indices" 
          icon="show_chart" 
          assets={FUTURES_CATEGORIES.indices} 
        />
        <FutureCategoryColumn 
          title="Metal Futures" 
          icon="diamond" 
          assets={FUTURES_CATEGORIES.metals} 
        />
        <FutureCategoryColumn 
          title="Agriculture" 
          icon="grass" 
          assets={FUTURES_CATEGORIES.agri} 
        />
        <FutureCategoryColumn 
          title="Crude Oil & Energy" 
          icon="oil_barrel" 
          assets={FUTURES_CATEGORIES.energy} 
        />
      </div>

      <div className="bg-panel-dark/50 border border-border-dark border-dashed rounded-xl p-4">
        <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase">
          <span className="text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">info</span>
            Technical Summary:
          </span>
          <p className="leading-relaxed">
            Overall sentiment is <span className="text-trend-up">Positive</span> for Equities despite rising energy costs. 
            Metals showing resilience amid inflation hedging. Agricultural flows remain seasonal but volatile.
          </p>
        </div>
      </div>
    </div>
  );
};