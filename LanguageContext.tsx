
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header & Sidebar
    overview: 'Overview',
    macro: 'Macro Deep-Dive',
    forex: 'Forex Market',
    futures: 'Futures Analysis',
    fund: 'Fund Explorer',
    news: 'News Center',
    settings: 'Settings',
    secure_connected: 'Secure Engine Connected',
    auto_sync: 'Auto-Sync',
    ask_ai: 'Ask AI',
    
    // Ticker
    pulse: 'PULSE',
    syncing: 'SYNCING...',
    ai_intel: 'AI INTEL',
    
    // Components
    heatmap_title: 'Performance Heatmap',
    sector_title: 'Sector Returns',
    futures_matrix_title: 'Futures Matrix (1M Daily Performance)',
    watchlist_title: 'Personal Strategic Watchlist',
    filter_holdings: 'Filter holdings...',
    new_group: 'New Group',
    add_symbol: 'Add Symbol',
    rank: 'Rank',
    symbol: 'Symbol',
    price: 'Price',
    change: 'Chg %',
    volume: 'Volume',
    market_cap: 'Market Cap',
    pe_ratio: 'PE Ratio',
    trend: '7D Trend',
    signal: 'Signal',
    
    // Macro
    macro_indicators: 'Macro Indicators',
    global_indices: 'Global Indices Pulse',
    fed_sentiment: 'Central Bank Sentiment (Fed)',
    yield_curve: 'US Treasury Yield Curve',
    
    // Funds
    fund_intelligence: 'Institutional Fund Intelligence',
    capital_magnets: 'Capital Magnets',
    alpha_drivers: 'Alpha Drivers',
    total_aum: 'Total AUM',
    exp_ratio: 'Exp. Ratio',
    
    // News
    terminal_stream: 'Terminal Alpha Stream',
    all: 'All',
    economy: 'Economy',
    markets: 'Markets',
    impact: 'Impact',
    trading_stream: 'Trading Stream',
    
    // Settings
    system_config: 'Terminal System Config',
    terminal: 'Terminal',
    streams: 'Streams',
    engine: 'Engine',
    language: 'Language',
    visual_perf: 'Visual Performance',
    high_freq_ticker: 'High-Frequency Ticker',
    neon_glow: 'Neon Glow Accents',
    apply: 'Apply Parameters',
    discard: 'Discard',
    select_lang: 'Select Language',
  },
  zh: {
    // Header & Sidebar
    overview: '市场总览',
    macro: '宏观深度分析',
    forex: '外汇市场',
    futures: '期货分析',
    fund: '基金探索',
    news: '新闻中心',
    settings: '系统设置',
    secure_connected: '安全引擎已连接',
    auto_sync: '自动同步',
    ask_ai: '问问 AI',
    
    // Ticker
    pulse: '脉冲更新',
    syncing: '同步中...',
    ai_intel: 'AI 洞察',
    
    // Components
    heatmap_title: '表现热力图',
    sector_title: '板块收益率',
    futures_matrix_title: '期货矩阵 (1月日度表现)',
    watchlist_title: '个人策略自选股',
    filter_holdings: '搜索代码/名称...',
    new_group: '新建分组',
    add_symbol: '添加品种',
    rank: '排名',
    symbol: '代码',
    price: '价格',
    change: '涨跌幅',
    volume: '成交量',
    market_cap: '市值',
    pe_ratio: '市盈率',
    trend: '7日趋势',
    signal: '交易信号',
    
    // Macro
    macro_indicators: '宏观指标',
    global_indices: '全球指数脉搏',
    fed_sentiment: '央行情绪 (美联储)',
    yield_curve: '美国国债收益率曲线',
    
    // Funds
    fund_intelligence: '机构基金情报',
    capital_magnets: '资金吸铁石',
    alpha_drivers: '阿尔法驱动器',
    total_aum: '总资产管理规模',
    exp_ratio: '管理费率',
    
    // News
    terminal_stream: '终端阿尔法流',
    all: '全部',
    economy: '经济',
    markets: '市场',
    impact: '影响力',
    trading_stream: '交易流',
    
    // Settings
    system_config: '终端系统配置',
    terminal: '终端',
    streams: '数据流',
    engine: '计算引擎',
    language: '语言设置',
    visual_perf: '视觉性能',
    high_freq_ticker: '高频行情条',
    neon_glow: '霓虹发光特效',
    apply: '应用参数',
    discard: '放弃修改',
    select_lang: '选择语言',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
};
