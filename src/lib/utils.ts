import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

export function formatCurrency(num: number, decimals = 2): string {
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(num: number): string {
  return `${num >= 0 ? "+" : ""}${num.toFixed(2)}%`;
}

export type MarketAsset = {
  symbol: string;
  name: string;
  category: "Crypto" | "Stocks" | "Forex" | "Commodities";
  price: number;
  change: number;
  volume: number;
  marketCap: number;
  sparkline: number[];
  color: string;
};

export const marketAssets: MarketAsset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    category: "Crypto",
    price: 67420.5,
    change: 2.43,
    volume: 38210000000,
    marketCap: 1310000000000,
    sparkline: [1, 1.02, 1.01, 1.03, 1.05, 1.04, 1.06, 1.08],
    color: "#f7931a",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    category: "Crypto",
    price: 3421.85,
    change: 1.82,
    volume: 21450000000,
    marketCap: 411000000000,
    sparkline: [1, 1.03, 1.02, 1.05, 1.04, 1.06, 1.07, 1.09],
    color: "#627eea",
  },
  {
    symbol: "SOL",
    name: "Solana",
    category: "Crypto",
    price: 172.34,
    change: -0.72,
    volume: 8900000000,
    marketCap: 78000000000,
    sparkline: [1, 1.04, 1.03, 1.07, 1.06, 1.02, 0.99, 0.97],
    color: "#9945ff",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    category: "Stocks",
    price: 228.42,
    change: 0.84,
    volume: 68000000000,
    marketCap: 3470000000000,
    sparkline: [1, 1.01, 1, 1.02, 1.03, 1.02, 1.03, 1.04],
    color: "#a2aaad",
  },
  {
    symbol: "SPX",
    name: "S&P 500",
    category: "Stocks",
    price: 5924.18,
    change: 0.64,
    volume: 240000000000,
    marketCap: 0,
    sparkline: [1, 1.02, 1.01, 1.04, 1.03, 1.05, 1.04, 1.06],
    color: "#f0f2f5",
  },
  {
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    category: "Forex",
    price: 1.0832,
    change: -0.18,
    volume: 820000000000,
    marketCap: 0,
    sparkline: [1, 0.99, 1.01, 1, 0.99, 0.98, 0.99, 0.98],
    color: "#f0f2f5",
  },
  {
    symbol: "XAU",
    name: "Gold Spot",
    category: "Commodities",
    price: 2341.67,
    change: 0.31,
    volume: 45000000000,
    marketCap: 0,
    sparkline: [1, 1.01, 1.02, 1.01, 1.03, 1.02, 1.03, 1.04],
    color: "#ffd700",
  },
  {
    symbol: "XAG",
    name: "Silver Spot",
    category: "Commodities",
    price: 29.84,
    change: -1.24,
    volume: 8200000000,
    marketCap: 0,
    sparkline: [1, 1.03, 1.02, 1.05, 1.02, 0.99, 0.97, 0.95],
    color: "#c0c0c0",
  },
];

export const tickerItems = [
  { symbol: "BTC", change: 2.43 },
  { symbol: "ETH", change: 1.82 },
  { symbol: "SOL", change: -0.72 },
  { symbol: "NASDAQ", change: 0.64 },
  { symbol: "GOLD", change: 0.31 },
];
