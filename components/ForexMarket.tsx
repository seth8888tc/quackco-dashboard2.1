
import React from 'react';
import { MOCK_FOREX } from '../constants';

const ForexCard: React.FC<{ data: any }> = ({ data }) => {
  const isUp = data.change >= 0;
  const sparkPoints = data.trend.map((p: number, i: number) => `${i * (100 / (data.trend.length - 1))} ${30 - p}`).join(' L');
  const tradingViewSymbol = data.pair.replace('/', '');

  return (
    <div className="bg-panel-dark border border-border-dark rounded-xl p-4 hover:border-primary/40 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <div>
          <a 
            href={`https://www.tradingview.com/chart/?symbol=FX:${tradingViewSymbol}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs font-bold text-white mb-1 hover:text-primary hover:underline transition-colors block"
          >
            {data.pair}
          </a>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">
            {data.base} / <span className="text-primary/70">{data.quote}</span>
          </p>
        </div>
        <div className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${isUp ? 'text-trend-up bg-trend-up/10' : 'text-trend-down bg-trend-down/10'}`}>
          {isUp ? '▲' : '▼'} {Math.abs(data.change)}%
        </div>
      </div>
      
      <div className="text-2xl font-bold font-mono text-white mb-4">
        {data.price.toFixed(4)}
      </div>

      <div className="h-10 w-full mb-3">
        <svg className={`w-full h-full ${isUp ? 'text-trend-up/40' : 'text-trend-down/40'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 30" preserveAspectRatio="none">
          <path d={`M0 ${30 - data.trend[0]} L${sparkPoints}`} />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-dark/30">
        <div>
          <span className="text-[9px] text-slate-500 uppercase block font-bold">H: {data.high.toFixed(4)}</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-slate-500 uppercase block font-bold">L: {data.low.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
};

export const ForexMarket: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-tight">Foreign Exchange Market</h2>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">
            Major Global Currency Pairs • <span className="text-primary">Base Reference: USD</span>
          </p>
        </div>
        <div className="flex gap-2">
           <div className="bg-panel-dark border border-border-dark rounded flex p-1">
             <button className="px-3 py-1 bg-primary text-black text-[10px] font-bold rounded uppercase">Spot</button>
             <button className="px-3 py-1 text-slate-500 text-[10px] font-bold uppercase hover:text-white transition-colors">Forwards</button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_FOREX.map((pair) => (
          <ForexCard key={pair.pair} data={pair} />
        ))}
      </div>

      <div className="bg-panel-dark border border-border-dark rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border-dark bg-background-dark/20">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">FX Liquidity & Heat</h3>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] text-slate-500 uppercase font-bold border-b border-border-dark">
              <tr>
                <th className="pb-3">Symbol</th>
                <th className="pb-3 text-right">Price (USD Base)</th>
                <th className="pb-3 text-right">Spread (pips)</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark/50">
              {MOCK_FOREX.map(fx => (
                <tr key={fx.pair} className="group hover:bg-white/5 transition-colors">
                  <td className="py-3">
                    <a 
                      href={`https://www.tradingview.com/chart/?symbol=FX:${fx.pair.replace('/', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-white group-hover:text-primary transition-colors hover:underline"
                    >
                      {fx.pair}
                    </a>
                    <span className="text-[9px] text-slate-600 ml-2">{fx.base === 'USD' ? 'Direct Quote' : 'Indirect Quote'}</span>
                  </td>
                  <td className="py-3 text-right font-mono text-xs text-slate-300">
                    {fx.price.toFixed(5)}
                  </td>
                  <td className="py-3 text-right font-mono text-xs text-slate-500">
                    0.4
                  </td>
                  <td className="py-3 text-right">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block mr-2 animate-pulse"></span>
                    <span className="text-[10px] text-primary font-bold uppercase">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};