
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  peRatio: string;
  trend: number[];
  signal: 'STRONG BUY' | 'ACCUMULATE' | 'REDUCE' | 'NEUTRAL';
  sector: string;
}

export interface SectorReturn {
  name: string;
  return: number;
  flow: string;
}

export interface HeatmapItem {
  symbol: string;
  change: number;
  weight: number; // For grid sizing
}

export interface FutureData {
  symbol: string;
  name: string;
  price: string;
  change: number;
  data: number[];
}

export interface ForexData {
  pair: string;
  base: string;
  quote: string;
  price: number;
  change: number;
  trend: number[];
  high: number;
  low: number;
}

export interface Fund {
  symbol: string;
  name: string;
  nav: number;
  inflow1Y: number; // 1年净流入 (单位: 亿美元)
  return5Y: number; // 5年累计收益 (单位: %)
  category: string;
  aum: string;     // 管理规模
  expenseRatio: string; // 费率
}
