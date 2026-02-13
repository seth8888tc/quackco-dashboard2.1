
import React from 'react';
import { MOCK_MACRO, GLOBAL_INDICES } from '../constants';

const IndicatorCard: React.FC<{ data: any }> = ({ data }) => {
  const sparkPoints = data.trend.map((p: number, i: number) => `${i * (100 / (data.trend.length - 1))} ${30 - p}`).join(' L');
  
  return (
    <div className="bg-panel-dark border border-border-dark rounded-xl p-4 hover:bg-white/5 transition-all">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{data.label}</h3>
          <div className="text-2xl font-bold font-mono text-white mt-1">{data.value}</div>
        </div>
        <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
          data.status === 'Bullish' ? 'bg-primary/10 text-primary' : 
          data.status === 'Warning' ? 'bg-trend-down/10 text-trend-down' : 
          'bg-slate-500/10 text-slate-400'
        }`}>
          {data.status}
        </div>
      </div>
      
      <div className="h-10 w-full mt-4">
        <svg className="w-full h-full text-primary/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 30" preserveAspectRatio="none">
          <path d={`M0 ${30 - data.trend[0]} L${sparkPoints}`} />
        </svg>
      </div>
    </div>
  );
};

export const MacroDeepDive: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* Top Indicators Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_MACRO.map((m) => (
          <IndicatorCard key={m.label} data={m} />
        ))}
      </div>

      {/* Global Markets & Fed Policy Section */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-7 bg-panel-dark border border-border-dark rounded-xl p-4">
          <h2 className="text-xs font-bold flex items-center gap-2 mb-4 uppercase tracking-widest text-slate-400">
            <span className="material-symbols-outlined text-primary text-sm">globe_uk</span>
            Global Indices Pulse
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {GLOBAL_INDICES.map((idx) => (
              <div key={idx.name} className="bg-background-dark border border-border-dark p-3 rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                <div className="text-[10px] text-slate-500 font-bold uppercase truncate">{idx.name}</div>
                <div className="text-sm font-mono font-bold mt-1">{idx.price}</div>
                <div className={`text-[10px] font-bold ${idx.change >= 0 ? 'text-trend-up' : 'text-trend-down'}`}>
                  {idx.change >= 0 ? '▲' : '▼'} {Math.abs(idx.change)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 bg-panel-dark border border-border-dark rounded-xl p-4">
          <h2 className="text-xs font-bold flex items-center gap-2 mb-4 uppercase tracking-widest text-slate-400">
            <span className="material-symbols-outlined text-primary text-sm">history_edu</span>
            Central Bank Sentiment (Fed)
          </h2>
          <div className="space-y-4">
            <div className="border-l-2 border-primary/40 pl-3 py-1 bg-primary/5 rounded-r">
              <p className="text-[11px] text-slate-300 leading-relaxed italic">
                "The Committee does not expect it will be appropriate to reduce the target range until it has gained greater confidence that inflation is moving sustainably toward 2 percent."
              </p>
              <div className="text-[9px] text-primary font-bold mt-1 uppercase">FOMC STATEMENT • MAR 2024</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                <span>Hawkish Sentiment</span>
                <span className="text-trend-down">64%</span>
              </div>
              <div className="h-1.5 w-full bg-background-dark rounded-full overflow-hidden">
                <div className="h-full bg-trend-down" style={{ width: '64%' }}></div>
              </div>
              <p className="text-[9px] text-slate-500 leading-tight">
                Market pricing currently reflecting "higher for longer" narrative despite recent manufacturing slowdown.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Yield Curve Visualizer */}
      <div className="bg-panel-dark border border-border-dark rounded-xl p-4">
        <h2 className="text-xs font-bold flex items-center gap-2 mb-6 uppercase tracking-widest text-slate-400">
          <span className="material-symbols-outlined text-primary text-sm">show_chart</span>
          US Treasury Yield Curve
        </h2>
        <div className="h-48 w-full flex items-end gap-2 px-4 border-b border-l border-border-dark relative">
          {[2.1, 3.4, 4.2, 4.5, 4.4, 4.24, 4.15].map((y, i) => (
             <div key={i} className="flex-1 group relative">
               <div className="bg-primary/20 hover:bg-primary/40 transition-colors w-full rounded-t" style={{ height: `${y * 20}px` }}></div>
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                 {y}%
               </div>
               <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-slate-500 uppercase whitespace-nowrap font-bold">
                 {['1M', '3M', '6M', '1Y', '2Y', '10Y', '30Y'][i]}
               </div>
             </div>
          ))}
          {/* Inversion Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-trend-down/30 border-t border-dashed border-trend-down/50"></div>
          <span className="absolute right-2 top-[calc(50%-12px)] text-[8px] text-trend-down font-bold uppercase">Inversion Threshold</span>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] text-slate-500">
          <div className="flex gap-2 items-start">
            <span className="material-symbols-outlined text-trend-down text-sm">warning</span>
            <p>10Y-2Y Spread: <span className="text-white font-bold">-0.26bps</span>. Curve remains inverted, signaling persistent recessionary risks over a 12-18 month horizon.</p>
          </div>
          <div className="flex gap-2 items-start">
            <span className="material-symbols-outlined text-primary text-sm">info</span>
            <p>Real Yields (Inflation Adjusted): <span className="text-white font-bold">+1.14%</span>. Highest levels in a decade, applying pressure to risk-on asset valuations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
