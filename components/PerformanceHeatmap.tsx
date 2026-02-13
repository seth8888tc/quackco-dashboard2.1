
import React, { useMemo } from 'react';
import { HEATMAP_STOCKS } from '../constants';
import { useTranslation } from '../LanguageContext';

const HeatmapCell: React.FC<{ symbol: string; change: number; span?: string }> = ({ symbol, change, span = 'col-span-1 row-span-1' }) => {
  const isUp = change >= 0;
  const absChange = Math.abs(change);
  
  const bgClass = isUp 
    ? (absChange > 3 ? 'bg-primary' : absChange > 1.5 ? 'bg-primary/80' : 'bg-primary/40')
    : (absChange > 3 ? 'bg-trend-down' : absChange > 1.5 ? 'bg-trend-down/80' : 'bg-trend-down/40');

  return (
    <a 
      href={`https://www.tradingview.com/chart/?symbol=${symbol}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`${span} ${bgClass} rounded p-2 flex flex-col justify-center items-center border border-white/5 cursor-pointer hover:brightness-110 transition-all group overflow-hidden`}
    >
      <span className="text-sm font-extrabold text-white leading-none group-hover:scale-110 transition-transform">{symbol}</span>
      <span className="text-[10px] text-white/90 font-bold mt-1">{isUp ? '+' : ''}{change}%</span>
    </a>
  );
};

interface PerformanceHeatmapProps {
  selectedSector: string | null;
  onClearSector: () => void;
}

export const PerformanceHeatmap: React.FC<PerformanceHeatmapProps> = ({ selectedSector, onClearSector }) => {
  const { t } = useTranslation();
  
  const filteredStocks = useMemo(() => {
    if (!selectedSector) return HEATMAP_STOCKS.slice(0, 16);
    return HEATMAP_STOCKS.filter(s => s.sector === selectedSector);
  }, [selectedSector]);

  const getSpan = (index: number, total: number) => {
    if (total <= 4) return 'col-span-6 row-span-3';
    if (total <= 9) return 'col-span-4 row-span-2';
    if (index === 0) return 'col-span-4 row-span-4';
    if (index === 1) return 'col-span-4 row-span-2';
    return 'col-span-2 row-span-2';
  };

  return (
    <div className="bg-panel-dark rounded-xl border border-border-dark p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[11px] font-bold flex items-center gap-2 uppercase tracking-tight text-slate-400">
          <span className="material-symbols-outlined text-primary text-sm">grid_view</span>
          {t('heatmap_title')} {selectedSector && `• ${selectedSector}`}
        </h2>
        <div className="flex gap-2 text-[9px]">
          {selectedSector && (
            <button 
              onClick={onClearSector}
              className="bg-background-dark px-2 py-0.5 rounded border border-border-dark text-primary hover:text-white flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[10px]">close</span>
              Reset
            </button>
          )}
          <span className="bg-background-dark px-2 py-0.5 rounded border border-border-dark text-slate-400 cursor-pointer hover:text-white">VOL</span>
          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/50 cursor-pointer">PERF</span>
        </div>
      </div>
      
      <div className={`flex-1 grid grid-cols-12 grid-rows-6 gap-1 min-h-[200px] transition-all duration-500 ${filteredStocks.length === 0 ? 'opacity-50' : 'opacity-100'}`}>
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock, i) => (
            <HeatmapCell 
              key={stock.symbol} 
              symbol={stock.symbol} 
              change={stock.change} 
              span={getSpan(i, filteredStocks.length)}
            />
          ))
        ) : (
          <div className="col-span-12 row-span-6 flex flex-col items-center justify-center text-slate-600 border border-dashed border-border-dark rounded">
            <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
            <p className="text-xs font-bold uppercase tracking-widest">No matching assets for this sector</p>
          </div>
        )}
      </div>

      {!selectedSector && (
        <div className="mt-2 text-[8px] text-slate-600 uppercase tracking-tighter text-center italic">
          Select a sector on the right to drill down into specific holdings
        </div>
      )}
    </div>
  );
};
