
import { Stock, SectorReturn, FutureData, ForexData, Fund } from './types';

export const MOCK_WATCHLIST: Stock[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 912.14,
    changePercent: 4.22,
    volume: '42.1M',
    marketCap: '$2.28T',
    peRatio: '72.4x',
    trend: [820, 840, 835, 850, 880, 875, 890, 912],
    signal: 'STRONG BUY',
    sector: 'Technology'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 173.52,
    changePercent: -1.15,
    volume: '54.2M',
    marketCap: '$2.68T',
    peRatio: '26.2x',
    trend: [182, 180, 181, 178, 176, 175, 173.5],
    signal: 'ACCUMULATE',
    sector: 'Technology'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 425.22,
    changePercent: 0.85,
    volume: '18.2M',
    marketCap: '$3.16T',
    peRatio: '35.8x',
    trend: [410, 415, 418, 420, 422, 423, 425],
    signal: 'STRONG BUY',
    sector: 'Technology'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 172.63,
    changePercent: -4.20,
    volume: '102.5M',
    marketCap: '$548.2B',
    peRatio: '45.2x',
    trend: [195, 190, 188, 182, 180, 175, 172.6],
    signal: 'REDUCE',
    sector: 'Consumer Discretionary'
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    price: 183.42,
    changePercent: 1.25,
    volume: '68.4M',
    marketCap: '$296.2B',
    peRatio: '312.1x',
    trend: [175, 178, 177, 180, 181, 182, 183.4],
    signal: 'ACCUMULATE',
    sector: 'Technology'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.18,
    changePercent: 2.15,
    volume: '28.1M',
    marketCap: '$1.78T',
    peRatio: '24.5x',
    trend: [135, 137, 138, 139, 140, 141, 142.2],
    signal: 'STRONG BUY',
    sector: 'Comm. Services'
  },
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    price: 64250.00,
    changePercent: 3.42,
    volume: '32.1B',
    marketCap: '$1.26T',
    peRatio: 'N/A',
    trend: [58000, 61000, 60500, 62000, 63500, 63800, 64250],
    signal: 'ACCUMULATE',
    sector: 'Crypto'
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum',
    price: 3425.12,
    changePercent: 1.12,
    volume: '14.5B',
    marketCap: '$412.5B',
    peRatio: 'N/A',
    trend: [3200, 3300, 3250, 3350, 3400, 3410, 3425],
    signal: 'NEUTRAL',
    sector: 'Crypto'
  }
];

export const HEATMAP_STOCKS = [
  { symbol: 'AAPL', change: 1.95, sector: 'Technology' },
  { symbol: 'MSFT', change: 0.85, sector: 'Technology' },
  { symbol: 'NVDA', change: 4.82, sector: 'Technology' },
  { symbol: 'GOOGL', change: 1.12, sector: 'Comm. Services' },
  { symbol: 'META', change: 2.15, sector: 'Comm. Services' },
  { symbol: 'AMZN', change: -0.45, sector: 'Consumer Discretionary' },
  { symbol: 'TSLA', change: -1.20, sector: 'Consumer Discretionary' },
  { symbol: 'BRK.B', change: 0.32, sector: 'Financials' },
  { symbol: 'JPM', change: 0.15, sector: 'Financials' },
  { symbol: 'V', change: 0.55, sector: 'Financials' },
  { symbol: 'LLY', change: -2.45, sector: 'Healthcare' },
  { symbol: 'UNH', change: -0.88, sector: 'Healthcare' },
  { symbol: 'XOM', change: -1.45, sector: 'Energy' },
  { symbol: 'CVX', change: -1.12, sector: 'Energy' },
  { symbol: 'JNJ', change: 0.05, sector: 'Healthcare' },
  { symbol: 'PG', change: -0.21, sector: 'Cons. Staples' },
  { symbol: 'AVGO', change: 3.21, sector: 'Technology' },
  { symbol: 'HD', change: 0.45, sector: 'Consumer Discretionary' },
  { symbol: 'MA', change: 0.82, sector: 'Financials' },
  { symbol: 'COST', change: 0.15, sector: 'Cons. Staples' },
  { symbol: 'ABBV', change: -0.12, sector: 'Healthcare' },
  { symbol: 'ADBE', change: 1.45, sector: 'Technology' },
  { symbol: 'BAC', change: -0.32, sector: 'Financials' },
  { symbol: 'CAT', change: 0.12, sector: 'Industrials' },
  { symbol: 'NEE', change: -0.85, sector: 'Utilities' },
  { symbol: 'PLD', change: -1.45, sector: 'Real Estate' },
  { symbol: 'LIN', change: -0.32, sector: 'Materials' }
];

export const MOCK_SECTORS: SectorReturn[] = [
  { name: 'Technology', return: 2.45, flow: '$1.2B' },
  { name: 'Financials', return: 0.82, flow: '$312M' },
  { name: 'Healthcare', return: 0.15, flow: '$145M' },
  { name: 'Energy', return: -1.12, flow: '-$82M' },
  { name: 'Consumer Discretionary', return: 0.45, flow: '$210M' },
  { name: 'Materials', return: -0.32, flow: '-$15M' }
];

export const FULL_GICS_SECTORS: SectorReturn[] = [
  ...MOCK_SECTORS,
  { name: 'Industrials', return: 0.12, flow: '$45M' },
  { name: 'Utilities', return: -0.85, flow: '-$22M' },
  { name: 'Real Estate', return: -1.45, flow: '-$110M' },
  { name: 'Comm. Services', return: 1.88, flow: '$450M' },
  { name: 'Cons. Staples', return: -0.21, flow: '$12M' }
];

export const MOCK_FUTURES: FutureData[] = [
  {
    symbol: 'DXY',
    name: '美元指数',
    price: '104.12',
    change: 0.15,
    data: [40, 45, 42, 50, 55, 52, 58, 60, 57, 55, 59, 62]
  },
  {
    symbol: 'US10Y',
    name: '10Y债利率',
    price: '4.24%',
    change: -0.05,
    data: [70, 75, 72, 68, 65, 62, 65, 60, 58, 55, 52, 50]
  },
  {
    symbol: 'BTC',
    name: '比特币',
    price: '$64,250',
    change: 2.10,
    data: [30, 35, 45, 40, 55, 60, 65, 75, 80, 85, 90, 95]
  }
];

export const MOCK_FOREX: ForexData[] = [
  { pair: 'EUR/USD', base: 'EUR', quote: 'USD', price: 1.0842, change: -0.12, trend: [60, 58, 62, 55, 50, 45, 48], high: 1.0865, low: 1.0830 },
  { pair: 'GBP/USD', base: 'GBP', quote: 'USD', price: 1.2654, change: 0.05, trend: [40, 42, 45, 48, 50, 52, 55], high: 1.2680, low: 1.2640 },
  { pair: 'USD/JPY', base: 'USD', quote: 'JPY', price: 150.24, change: 0.45, trend: [30, 35, 45, 55, 65, 75, 85], high: 150.50, low: 149.80 },
  { pair: 'USD/CNH', base: 'USD', quote: 'CNH', price: 7.1945, change: 0.08, trend: [50, 52, 51, 53, 55, 54, 56], high: 7.2100, low: 7.1850 },
  { pair: 'AUD/USD', base: 'AUD', quote: 'USD', price: 0.6542, change: -0.32, trend: [70, 65, 60, 55, 50, 45, 40], high: 0.6580, low: 0.6520 },
  { pair: 'USD/CAD', base: 'USD', quote: 'CAD', price: 1.3512, change: 0.15, trend: [45, 48, 52, 55, 58, 60, 62], high: 1.3540, low: 1.3480 },
  { pair: 'USD/CHF', base: 'USD', quote: 'CHF', price: 0.8812, change: 0.10, trend: [40, 42, 45, 44, 46, 48, 50], high: 0.8835, low: 0.8795 },
  { pair: 'USD/HKD', base: 'USD', quote: 'HKD', price: 7.8214, change: 0.01, trend: [50, 50, 51, 50, 50, 51, 51], high: 7.8250, low: 7.8180 },
];

export const MOCK_FUNDS: Fund[] = [
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', nav: 472.45, inflow1Y: 425.2, return5Y: 82.1, category: 'Large Blend', aum: '$412B', expenseRatio: '0.03%' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', nav: 442.12, inflow1Y: 312.5, return5Y: 148.5, category: 'Large Growth', aum: '$252B', expenseRatio: '0.20%' },
  { symbol: 'IVV', name: 'iShares Core S&P 500', nav: 512.10, inflow1Y: 388.4, return5Y: 81.8, category: 'Large Blend', aum: '$440B', expenseRatio: '0.03%' },
  { symbol: 'VTI', name: 'Vanguard Total Stock Market', nav: 258.40, inflow1Y: 210.1, return5Y: 76.4, category: 'Large Blend', aum: '$380B', expenseRatio: '0.03%' },
  { symbol: 'SCHD', name: 'Schwab US Dividend Equity', nav: 78.42, inflow1Y: 145.8, return5Y: 62.5, category: 'Large Value', aum: '$52B', expenseRatio: '0.06%' },
  { symbol: 'JEPI', name: 'JPMorgan Equity Premium Income', nav: 54.12, inflow1Y: 185.2, return5Y: 42.1, category: 'Derivative Income', aum: '$33B', expenseRatio: '0.35%' },
  { symbol: 'SMH', name: 'VanEck Semiconductor ETF', nav: 228.45, inflow1Y: 98.4, return5Y: 284.2, category: 'Technology', aum: '$18B', expenseRatio: '0.35%' },
  { symbol: 'TQQQ', name: 'ProShares UltraPro QQQ', nav: 58.21, inflow1Y: 112.4, return5Y: 342.1, category: 'Leveraged', aum: '$22B', expenseRatio: '0.95%' },
  { symbol: 'FNGU', name: 'MicroSectors FANG+ Index 3X', nav: 385.12, inflow1Y: 45.2, return5Y: 412.5, category: 'Leveraged', aum: '$5B', expenseRatio: '0.95%' },
  { symbol: 'SOXL', name: 'Direxion Daily Semi 3X', nav: 42.50, inflow1Y: 82.1, return5Y: 521.4, category: 'Leveraged', aum: '$12B', expenseRatio: '0.95%' },
  { symbol: 'XLK', name: 'Technology Select Sector', nav: 205.12, inflow1Y: 125.4, return5Y: 168.2, category: 'Technology', aum: '$65B', expenseRatio: '0.10%' },
  { symbol: 'VGT', name: 'Vanguard Information Tech', nav: 525.42, inflow1Y: 85.2, return5Y: 165.4, category: 'Technology', aum: '$62B', expenseRatio: '0.10%' },
  { symbol: 'SCHG', name: 'Schwab US Large-Cap Growth', nav: 88.42, inflow1Y: 155.4, return5Y: 125.4, category: 'Large Growth', aum: '$28B', expenseRatio: '0.04%' },
  { symbol: 'IBIT', name: 'iShares Bitcoin Trust', nav: 38.42, inflow1Y: 185.0, return5Y: 0, category: 'Digital Assets', aum: '$18B', expenseRatio: '0.25%' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', nav: 512.42, inflow1Y: 355.2, return5Y: 81.2, category: 'Large Blend', aum: '$502B', expenseRatio: '0.09%' },
  { symbol: 'BITO', name: 'ProShares Bitcoin Strategy', nav: 32.15, inflow1Y: 42.5, return5Y: 0, category: 'Digital Assets', aum: '$2.5B', expenseRatio: '0.95%' },
  { symbol: 'AVUV', name: 'Avantis US Small Cap Value', nav: 88.42, inflow1Y: 72.1, return5Y: 85.4, category: 'Small Value', aum: '$10B', expenseRatio: '0.25%' },
  { symbol: 'MGK', name: 'Vanguard Mega Cap Growth', nav: 265.42, inflow1Y: 55.4, return5Y: 135.2, category: 'Large Growth', aum: '$18B', expenseRatio: '0.07%' },
  { symbol: 'SOXX', name: 'iShares Semiconductor ETF', nav: 215.12, inflow1Y: 65.2, return5Y: 212.4, category: 'Technology', aum: '$15B', expenseRatio: '0.35%' },
  { symbol: 'QLD', name: 'ProShares Ultra QQQ', nav: 88.42, inflow1Y: 35.2, return5Y: 215.2, category: 'Leveraged', aum: '$6B', expenseRatio: '0.95%' },
];

export const FUTURES_CATEGORIES = {
  indices: [
    { symbol: 'ES1!', name: 'S&P 500', price: '4,452.25', change: 0.42 },
    { symbol: 'NQ1!', name: 'Nasdaq 100', price: '18,245.50', change: 1.25 },
    { symbol: 'YM1!', name: 'Dow 30', price: '38,450.00', change: -0.15 },
    { symbol: 'RTY1!', name: 'Russell 2000', price: '2,042.10', change: -0.85 },
  ],
  metals: [
    { symbol: 'GC1!', name: 'Gold', price: '2,145.20', change: 0.12 },
    { symbol: 'SI1!', name: 'Silver', price: '24.12', change: -0.45 },
    { symbol: 'HG1!', name: 'Copper', price: '4.125', change: 0.88 },
    { symbol: 'PL1!', name: 'Platinum', price: '942.50', change: -1.20 },
  ],
  agri: [
    { symbol: 'ZC1!', name: 'Corn', price: '442.25', change: 0.15 },
    { symbol: 'ZW1!', name: 'Wheat', price: '542.50', change: 1.12 },
    { symbol: 'ZS1!', name: 'Soybeans', price: '1,185.00', change: -0.32 },
    { symbol: 'KC1!', name: 'Coffee', price: '185.40', change: 2.45 },
  ],
  energy: [
    { symbol: 'CL1!', name: 'Crude Oil WTI', price: '78.42', change: -1.25 },
    { symbol: 'BZ1!', name: 'Brent Oil', price: '82.15', change: -1.15 },
    { symbol: 'NG1!', name: 'Natural Gas', price: '1.745', change: -4.82 },
    { symbol: 'RB1!', name: 'Gasoline', price: '2.421', change: -0.45 },
  ]
};

export const DETAILED_FUTURES = [
  ...MOCK_FUTURES,
  { symbol: 'NQ1!', name: 'NASDAQ 100', price: '18,245.50', change: 1.2, data: [40, 50, 60, 55, 70, 85, 90] },
  { symbol: 'YM1!', name: 'DOW 30', price: '38,450.00', change: -0.1, data: [70, 65, 68, 62, 60, 58, 55] },
  { symbol: 'TY1!', name: '10Y NOTE', price: '110.12', change: -0.3, data: [50, 55, 52, 48, 45, 40, 38] },
];

export const MOCK_MACRO = [
  { label: 'CPI (Inflation)', value: '3.1%', status: 'Stable', trend: [10, 15, 12, 10, 8, 5, 8] },
  { label: 'US 10Y Yield', value: '4.24%', status: 'Bullish', trend: [5, 8, 15, 25, 20, 30, 35] },
  { label: 'DXY Index', value: '104.12', status: 'Range', trend: [20, 18, 22, 20, 21, 19, 20] },
  { label: 'GDP Growth', value: '2.1%', status: 'Warning', trend: [30, 25, 20, 15, 10, 8, 5] },
];

export const GLOBAL_INDICES = [
  { name: 'Nikkei 225', price: '38,125', change: 1.45 },
  { name: 'DAX', price: '17,812', change: -0.22 },
  { name: 'FTSE 100', price: '7,614', change: 0.15 },
  { name: 'HSI', price: '16,215', change: -1.82 },
  { name: 'Shanghai', price: '3,012', change: 0.45 },
  { name: 'CAC 40', price: '8,015', change: -0.05 },
];

export const MOCK_NEWS = [
  // 经济分类 (Economy)
  { id: 1, title: '中国三月制造业PMI升至50.8，超出市场预期', time: '12m ago', category: '经济', impact: 'High', url: 'https://zh.tradingeconomics.com/stream?i=economy' },
  { id: 2, title: '美国二月核心PCE物价指数同比上涨2.8%，符合预期', time: '45m ago', category: '经济', impact: 'Medium', url: 'https://zh.tradingeconomics.com/stream?i=economy' },
  { id: 3, title: '欧洲央行官员：六月可能是首次降息的合适时机', time: '1h ago', category: '经济', impact: 'Medium', url: 'https://zh.tradingeconomics.com/stream?i=economy' },
  { id: 4, title: '德国三月IFO商业景气指数回升至87.8，创近期新高', time: '2h ago', category: '经济', impact: 'Low', url: 'https://zh.tradingeconomics.com/stream?i=economy' },
  
  // 市场分类 (Markets)
  { id: 10, title: '标普500指数录得五个月连涨，创下自2013年以来最佳开年表现', time: '15m ago', category: '市场', impact: 'High', url: 'https://zh.tradingeconomics.com/stream?i=markets' },
  { id: 11, title: '比特币价格在减半前夕震荡，ETF流入资金放缓', time: '30m ago', category: '市场', impact: 'Medium', url: 'https://zh.tradingeconomics.com/stream?i=markets' },
  { id: 12, title: '国际油价因地缘政治风险溢价而走高，突破85美元关口', time: '1h ago', category: '市场', impact: 'Medium', url: 'https://zh.tradingeconomics.com/stream?i=markets' },
  { id: 13, title: '日元触及34年低点，市场高度关注日本当局是否进行干预', time: '3h ago', category: '市场', impact: 'High', url: 'https://zh.tradingeconomics.com/stream?i=markets' },

  // 新闻分类 (News)
  { id: 20, title: '英伟达宣布推出下一代AI芯片Blackwell，算力实现质的飞跃', time: '5m ago', category: '新闻', impact: 'High', url: 'https://zh.tradingeconomics.com/stream' },
  { id: 21, title: '由于需求疲软，特斯拉将调整北美和欧洲市场的部分车型价格', time: '2h ago', category: '新闻', impact: 'Medium', url: 'https://zh.tradingeconomics.com/stream' },
  { id: 22, title: '苹果开发者大会WWDC定于6月10日举行，焦点转向生成式AI', time: '4h ago', category: '新闻', impact: 'Medium', url: 'https://zh.tradingeconomics.com/stream' },
  { id: 23, title: '瑞银将瑞士央行降息预期提前至三月，预计将连续降息', time: '5h ago', category: '新闻', impact: 'Low', url: 'https://zh.tradingeconomics.com/stream' },
];
