
import React, { useState, useEffect } from 'react';
import { MOCK_WATCHLIST } from '../constants';
import { Stock } from '../types';
import { useTranslation } from '../LanguageContext';

const Sparkline: React.FC<{ points: number[]; color: string }> = ({ points, color }) => {
  if (!points || points.length < 2) return <div className="w-20 h-6 bg-border-dark/20 rounded"></div>;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const padding = 3;
  const h = 30 - (padding * 2);
  const normalized = points.map(p => 30 - (padding + ((p - min) / range) * h));
  const path = normalized.map((p, i) => `${i * (100 / (normalized.length - 1))} ${p}`).join(' L');
  return (
    <svg className={`w-20 h-6 ${color}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 30" preserveAspectRatio="none">
      <path d={`M0 ${normalized[0]} L${path}`} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Watchlist: React.FC<{ tick?: number }> = ({ tick = 0 }) => {
  const { t } = useTranslation();
  const [stocks, setStocks] = useState<Stock[]>(MOCK_WATCHLIST);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [newSymbol, setNewSymbol] = useState({ symbol: '', name: '', price: '' });

  // Simulate real-time price fluctuation
  useEffect(() => {
    if (tick === 0) return;
    setStocks(prev => prev.map(s => {
      const change = (Math.random() - 0.5) * 0.2;
      return {
        ...s,
        price: s.price + (s.price * (change / 100))
      };
    }));
  }, [tick]);

  const filteredStocks = stocks.filter(s => 
    s.symbol.toLowerCase().includes(filterQuery.toLowerCase()) || 
    s.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleRemoveSymbol = (symbol: string) => {
    setStocks(prev => prev.filter(s => s.symbol !== symbol));
  };

  const formatPrice = (p: number) => {
    return p >= 1000 ? p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : p.toFixed(2);
  };

  return (
    <div className="bg-panel-dark rounded-xl border border-border-dark overflow-hidden flex flex-col relative">
      <div className="px-4 py-3 border-b border-border-dark flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h2 className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest text-white">
          <span className="material-symbols-outlined text-primary text-sm">star_rate</span>
          {t('watchlist_title')}
          <span className="text-[8px] bg-primary/20 text-primary px-1 rounded animate-pulse">LIVE</span>
        </h2>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2 top-1.5 text-xs text-slate-500">search</span>
            <input 
              className="bg-background-dark border border-border-dark text-[10px] pl-7 pr-3 py-1.5 rounded focus:outline-none focus:border-primary/50 w-full sm:w-64 text-slate-300"
              placeholder={t('filter_holdings')} 
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </div>
          <button className="bg-primary text-black px-4 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-primary/90 transition-colors">
            {t('add_symbol')}
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-background-dark/50 text-[10px] text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-3 font-bold">{t('symbol')}</th>
              <th className="px-6 py-3 font-bold">{t('price')}</th>
              <th className="px-6 py-3 font-bold">{t('change')}</th>
              <th className="px-6 py-3 font-bold">{t('volume')}</th>
              <th className="px-6 py-3 font-bold">{t('market_cap')}</th>
              <th className="px-6 py-3 font-bold">{t('trend')}</th>
              <th className="px-6 py-3 font-bold">{t('signal')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark">
            {filteredStocks.map((stock) => (
              <tr key={stock.symbol} className="hover:bg-primary/5 transition-colors group cursor-pointer relative overflow-hidden">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-background-dark flex items-center justify-center font-bold text-[9px] border border-border-dark text-slate-300">
                      {stock.symbol.substring(0, 2)}
                    </div>
                    <div>
                      <a href={`https://www.tradingview.com/chart/?symbol=${stock.symbol.replace('/','')}`} target="_blank" className="text-xs font-bold text-white group-hover:text-primary transition-colors">
                        {stock.symbol}
                      </a>
                      <div className="text-[9px] text-slate-500 uppercase font-medium">{stock.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-300">
                  <span className="text-slate-500 text-[10px] mr-1">$</span>
                  <span className="transition-all duration-300">{formatPrice(stock.price)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`${stock.changePercent >= 0 ? 'text-trend-up' : 'text-trend-down'} text-xs font-bold flex items-center gap-1`}>
                    {stock.changePercent >= 0 ? '▲' : '▼'}
                    {Math.abs(stock.changePercent)}%
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-400 font-mono">{stock.volume}</td>
                <td className="px-6 py-4 text-xs text-slate-400 font-mono">{stock.marketCap}</td>
                <td className="px-6 py-4">
                  <Sparkline points={stock.trend} color={stock.changePercent >= 0 ? 'text-primary' : 'text-trend-down'} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      stock.signal === 'STRONG BUY' ? 'bg-primary/10 text-primary' :
                      stock.signal === 'REDUCE' ? 'bg-trend-down/10 text-trend-down' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {stock.signal}
                    </span>
                    <button 
                      onClick={() => handleRemoveSymbol(stock.symbol)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-trend-down/20 rounded transition-all text-slate-500 hover:text-trend-down"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
