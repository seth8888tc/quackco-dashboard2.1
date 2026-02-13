
import React, { useState, useMemo } from 'react';
import { MOCK_NEWS } from '../constants';

export const NewsCenter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredNews = useMemo(() => {
    if (activeCategory === '全部') return MOCK_NEWS;
    return MOCK_NEWS.filter(news => news.category === activeCategory);
  }, [activeCategory]);

  const categories = ['全部', '经济', '市场', '新闻'];

  const getSourceLink = (cat: string) => {
    switch(cat) {
      case '经济': return 'https://zh.tradingeconomics.com/stream?i=economy';
      case '市场': return 'https://zh.tradingeconomics.com/stream?i=markets';
      case '新闻': return 'https://zh.tradingeconomics.com/stream';
      default: return 'https://zh.tradingeconomics.com/stream';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col h-full gap-4 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-panel-dark border border-border-dark p-4 rounded-xl gap-4">
        <div className="flex items-center gap-6">
          <h2 className="text-lg font-black text-white flex items-center gap-2 tracking-tighter uppercase">
            <span className="material-symbols-outlined text-primary">dynamic_feed</span>
            Terminal Alpha Stream
          </h2>
          <div className="flex gap-1 bg-background-dark p-1 rounded-lg border border-border-dark">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-primary text-black shadow-[0_0_15px_rgba(17,212,17,0.3)]' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href={getSourceLink(activeCategory)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-primary/70 hover:text-primary font-black uppercase tracking-widest flex items-center gap-1 group transition-colors"
          >
            Source: TradingEconomics 
            <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">open_in_new</span>
          </a>
          <div className="h-4 w-px bg-border-dark"></div>
          <div className="text-[10px] text-slate-500 flex items-center gap-2 font-black">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            LIVE FEED
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border-dark">
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <div key={`${news.category}-${news.id}`} className="bg-panel-dark border border-border-dark p-5 rounded-xl hover:bg-primary/[0.02] hover:border-primary/30 transition-all cursor-pointer group flex gap-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-border-dark group-hover:bg-primary transition-colors"></div>
              
              <div className="flex-shrink-0 pt-1">
                <div className={`w-8 h-8 rounded flex items-center justify-center ${
                  news.impact === 'High' ? 'bg-trend-down/10 text-trend-down' : 
                  news.impact === 'Medium' ? 'bg-primary/10 text-primary' : 
                  'bg-slate-500/10 text-slate-500'
                }`}>
                  <span className="material-symbols-outlined text-sm font-bold">
                    {news.impact === 'High' ? 'priority_high' : news.impact === 'Medium' ? 'bolt' : 'info'}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-[0.15em] border ${
                      news.category === '经济' ? 'text-primary border-primary/20 bg-primary/5' :
                      news.category === '市场' ? 'text-blue-400 border-blue-400/20 bg-blue-400/5' :
                      'text-orange-400 border-orange-400/20 bg-orange-400/5'
                    }`}>
                      {news.category}
                    </span>
                    <span className="text-[9px] text-slate-600 font-mono font-bold">{news.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] text-slate-500 uppercase font-black">Impact:</span>
                    <span className={`text-[9px] font-black uppercase ${
                      news.impact === 'High' ? 'text-trend-down' : news.impact === 'Medium' ? 'text-primary' : 'text-slate-500'
                    }`}>
                      {news.impact}
                    </span>
                  </div>
                </div>
                
                <a 
                  href={(news as any).url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block group/title"
                >
                  <h3 className="text-[13px] font-black text-white leading-relaxed group-hover/title:text-primary transition-colors pr-8">
                    {news.title}
                  </h3>
                </a>

                <div className="mt-4 flex gap-6 items-center border-t border-border-dark/30 pt-3">
                  <div className="flex gap-4">
                    <button className="text-[9px] text-slate-500 font-black hover:text-white flex items-center gap-1 uppercase tracking-widest transition-colors">
                      <span className="material-symbols-outlined text-xs">analytics</span> Full Insight
                    </button>
                    <button className="text-[9px] text-slate-500 font-black hover:text-white flex items-center gap-1 uppercase tracking-widest transition-colors">
                      <span className="material-symbols-outlined text-xs">bookmark</span> Store
                    </button>
                  </div>
                  <a 
                    href={(news as any).url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[9px] text-primary font-black hover:underline flex items-center gap-1 uppercase tracking-[0.1em] ml-auto group/btn"
                  >
                    Trading Stream <span className="material-symbols-outlined text-xs group-hover/btn:translate-x-1 transition-transform">arrow_right_alt</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-20 text-slate-700 border border-dashed border-border-dark rounded-2xl bg-panel-dark/20">
            <span className="material-symbols-outlined text-5xl mb-4 opacity-20">cloud_off</span>
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Broadcasts Cached for this Stream</p>
          </div>
        )}

        <div className="flex items-center justify-center p-12 text-slate-700">
           <div className="flex flex-col items-center gap-3">
             <div className="w-8 h-8 border-2 border-border-dark border-t-primary rounded-full animate-spin"></div>
             <p className="text-[9px] font-black uppercase tracking-[0.2em] italic">Synchronizing Global Archives...</p>
           </div>
        </div>
      </div>
    </div>
  );
};
