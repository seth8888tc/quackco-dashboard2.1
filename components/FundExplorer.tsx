
import React, { useMemo } from 'react';
import { MOCK_FUNDS } from '../constants';
import { Fund } from '../types';

const FundHeroCard: React.FC<{ fund: Fund; rank: number; metricLabel: string; metricValue: string; isReturn?: boolean }> = ({ fund, rank, metricLabel, metricValue, isReturn }) => (
  <div className="bg-panel-dark border border-border-dark p-5 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-all cursor-pointer shadow-xl">
    <div className="absolute top-[-10px] right-[-10px] text-6xl font-black text-white/5 group-hover:text-primary/10 transition-colors italic">
      #{rank}
    </div>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg bg-background-dark flex items-center justify-center font-bold text-primary border border-primary/20 shadow-[0_0_10px_rgba(17,212,17,0.1)]">
        {fund.symbol.substring(0, 2)}
      </div>
      <div>
        <a 
          href={`https://www.tradingview.com/chart/?symbol=${fund.symbol}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-lg font-black text-white group-hover:text-primary transition-colors hover:underline"
        >
          {fund.symbol}
        </a>
        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{fund.category}</div>
      </div>
    </div>
    
    <div className="space-y-4">
      <div>
        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{metricLabel}</div>
        <div className={`text-2xl font-mono font-black ${isReturn ? 'text-trend-up' : 'text-primary'}`}>
          {metricValue}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-dark/50">
        <div>
          <div className="text-[9px] text-slate-600 uppercase font-bold">Total AUM</div>
          <div className="text-xs font-mono text-slate-300">{fund.aum}</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-600 uppercase font-bold">Exp. Ratio</div>
          <div className="text-xs font-mono text-slate-300">{fund.expenseRatio}</div>
        </div>
      </div>
    </div>
  </div>
);

const FundTable: React.FC<{ funds: Fund[]; metricKey: 'inflow1Y' | 'return5Y'; isReturn?: boolean }> = ({ funds, metricKey, isReturn }) => (
  <div className="bg-panel-dark border border-border-dark rounded-xl overflow-hidden mt-6">
    <table className="w-full text-left">
      <thead className="bg-background-dark/50 text-[10px] text-slate-500 uppercase font-bold">
        <tr>
          <th className="px-6 py-3">Rank & Symbol</th>
          <th className="px-6 py-3">Fund Name</th>
          <th className="px-6 py-3 text-right">NAV</th>
          <th className="px-6 py-3 text-right">{metricKey === 'inflow1Y' ? '1Y Net Inflow' : '5Y Total Return'}</th>
          <th className="px-6 py-3 text-right">AUM</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border-dark/50">
        {funds.map((fund, idx) => (
          <tr key={fund.symbol} className="hover:bg-white/5 transition-colors cursor-pointer group">
            <td className="px-6 py-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-600">#{idx + 1}</span>
                <a 
                  href={`https://www.tradingview.com/chart/?symbol=${fund.symbol}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-bold text-white group-hover:text-primary hover:underline"
                >
                  {fund.symbol}
                </a>
              </div>
            </td>
            <td className="px-6 py-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase">{fund.name}</span>
            </td>
            <td className="px-6 py-3 text-right font-mono text-xs text-slate-300">
              ${fund.nav.toFixed(2)}
            </td>
            <td className={`px-6 py-3 text-right font-mono text-xs font-bold ${isReturn ? 'text-trend-up' : 'text-primary'}`}>
              {metricKey === 'inflow1Y' ? `+$${fund.inflow1Y}B` : `+${fund.return5Y}%`}
            </td>
            <td className="px-6 py-3 text-right font-mono text-xs text-slate-500">
              {fund.aum}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const FundExplorer: React.FC = () => {
  // Logic to sort and filter Top 10
  const topInflow = useMemo(() => 
    [...MOCK_FUNDS].sort((a, b) => b.inflow1Y - a.inflow1Y).slice(0, 10), 
  []);

  const topReturns = useMemo(() => 
    [...MOCK_FUNDS].sort((a, b) => b.return5Y - a.return5Y).slice(0, 10), 
  []);

  return (
    <div className="animate-in fade-in duration-700 space-y-12 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-dark pb-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Institutional Fund Intelligence</h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-[0.2em] font-bold">
            Terminal Alpha • <span className="text-primary">Global Capital Flow monitoring</span>
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-primary text-black px-4 py-1.5 rounded text-[10px] font-black uppercase hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(17,212,17,0.2)]">
            Live Stream
          </button>
          <button className="bg-panel-dark border border-border-dark text-slate-300 px-4 py-1.5 rounded text-[10px] font-black uppercase hover:text-white transition-all">
            Data Export
          </button>
        </div>
      </div>

      {/* SECTION 1: CAPITAL MAGNETS (1Y INFLOW) */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary text-xl">payments</span>
          <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
            Capital Magnets <span className="text-slate-500 text-[10px]">/ Top 10 Net Inflow (1 Year)</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topInflow.slice(0, 3).map((fund, idx) => (
            <FundHeroCard 
              key={fund.symbol} 
              fund={fund} 
              rank={idx + 1} 
              metricLabel="1-Year Net Inflow" 
              metricValue={`+$${fund.inflow1Y}B`}
            />
          ))}
        </div>

        <FundTable funds={topInflow} metricKey="inflow1Y" />
      </section>

      {/* SECTION 2: PROFIT GIANTS (5Y RETURN) */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-trend-up text-xl">trending_up</span>
          <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
            Alpha Drivers <span className="text-slate-500 text-[10px]">/ Top 10 Total Return (5 Years)</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topReturns.slice(0, 3).map((fund, idx) => (
            <FundHeroCard 
              key={fund.symbol} 
              fund={fund} 
              rank={idx + 1} 
              metricLabel="5-Year Cumul. Profit" 
              metricValue={`+${fund.return5Y}%`}
              isReturn
            />
          ))}
        </div>

        <FundTable funds={topReturns} metricKey="return5Y" isReturn />
      </section>

      {/* DISCLAIMER / SUMMARY */}
      <div className="p-6 bg-panel-dark/30 border border-border-dark border-dashed rounded-2xl flex items-center gap-4 text-slate-600">
        <span className="material-symbols-outlined text-3xl">shield</span>
        <p className="text-[10px] leading-relaxed uppercase font-bold italic">
          Aggregate data sourced from 13F institutional filings and real-time exchange feeds. 
          Historical performance is not indicative of future results. Inflow metrics reflect secondary market capital commitment.
        </p>
      </div>
    </div>
  );
};