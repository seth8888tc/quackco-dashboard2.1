
import React, { useState } from 'react';
import { MOCK_SECTORS, FULL_GICS_SECTORS } from '../constants';
import { useTranslation } from '../LanguageContext';

interface SectorReturnsProps {
  selectedSector: string | null;
  onSelectSector: (sector: string | null) => void;
}

export const SectorReturns: React.FC<SectorReturnsProps> = ({ selectedSector, onSelectSector }) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const displaySectors = showAll ? FULL_GICS_SECTORS : MOCK_SECTORS;

  const handleSectorClick = (name: string) => {
    if (selectedSector === name) {
      onSelectSector(null);
    } else {
      onSelectSector(name);
    }
  };

  return (
    <div className="bg-panel-dark rounded-xl border border-border-dark p-4 flex flex-col h-full overflow-hidden relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[11px] font-bold flex items-center gap-2 uppercase tracking-tight text-slate-400">
          <span className="material-symbols-outlined text-primary text-sm">bar_chart</span>
          {t('sector_title')} {showAll && "(All)"}
        </h2>
        <div className="flex gap-2">
          {selectedSector && (
            <button 
              onClick={() => onSelectSector(null)}
              className="text-[9px] text-slate-400 font-bold uppercase hover:text-white"
            >
              Clear
            </button>
          )}
          {showAll && (
            <button 
              onClick={() => setShowAll(false)}
              className="text-[9px] text-primary font-bold uppercase hover:underline"
            >
              Collapse
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-1">
        <div className="grid grid-cols-3 text-[9px] text-slate-500 pb-2 px-1 border-b border-border-dark uppercase font-bold">
          <div>Sector</div>
          <div className="text-right">Return</div>
          <div className="text-right">Flow</div>
        </div>
        
        {displaySectors.map((sector) => (
          <div 
            key={sector.name} 
            onClick={() => handleSectorClick(sector.name)}
            className={`grid grid-cols-3 items-center p-1.5 rounded transition-all cursor-pointer group ${
              selectedSector === sector.name ? 'bg-primary/20 border border-primary/30' : 'hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className={`text-[11px] font-bold truncate transition-colors ${
              selectedSector === sector.name ? 'text-primary' : 'group-hover:text-primary'
            }`}>
              {sector.name}
            </div>
            <div className={`text-right text-[11px] font-bold ${sector.return >= 0 ? 'text-trend-up' : 'text-trend-down'}`}>
              {sector.return > 0 ? '+' : ''}{sector.return}%
            </div>
            <div className="text-right text-slate-400 text-[11px] font-mono">{sector.flow}</div>
          </div>
        ))}
      </div>
      
      {!showAll && (
        <div className="mt-4 pt-4 border-t border-border-dark text-center">
          <button 
            onClick={() => setShowAll(true)}
            className="text-[9px] text-slate-500 hover:text-primary uppercase tracking-widest font-bold transition-colors"
          >
            View All 11 GICS Sectors
          </button>
        </div>
      )}
    </div>
  );
};
