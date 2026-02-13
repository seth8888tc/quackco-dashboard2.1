
import React from 'react';
import { MOCK_FUTURES } from '../constants';

const FutureCard: React.FC<{ data: any }> = ({ data }) => {
  const isUp = data.change >= 0;
  
  return (
    <div className="bg-panel-dark border border-border-dark rounded-xl p-3 hover:border-primary/30 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter flex items-center gap-1">
            <a href={`https://www.tradingview.com/chart/?symbol=${data.symbol}`} target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:underline">{data.symbol}</a> 
            <span className="text-slate-400">|</span> 
            {data.name}
          </h3>
          <div className="text-lg font-bold font-mono text-white mt-1">
            {data.price} <span className={`${isUp ? 'text-trend-up' : 'text-trend-down'} text-[10px] ml-1 font-bold`}>{isUp ? '▲' : '▼'} {Math.abs(data.change)}%</span>
          </div>
        </div>
        <span className="material-symbols-outlined text-slate-600 text-sm group-hover:text-primary transition-colors">monitoring</span>
      </div>
      
      <div className="h-20 w-full relative flex items-end justify-between gap-1 mt-2">
        {data.data.map((h: number, idx: number) => (
          <div 
            key={idx}
            className={`w-full rounded-t-sm transition-all duration-700 ${isUp ? 'bg-trend-up' : 'bg-trend-down'}`}
            style={{ 
              height: `${h}%`,
              opacity: idx === data.data.length - 1 ? 1 : 0.2 + (idx / data.data.length) * 0.4
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const FuturesMatrix: React.FC = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-[11px] font-bold flex items-center gap-2 uppercase tracking-tight text-slate-400">
        <span className="material-symbols-outlined text-primary text-sm">finance_mode</span>
        Futures Matrix (1M Daily Performance)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_FUTURES.map(f => <FutureCard key={f.symbol} data={f} />)}
      </div>
    </div>
  );
};