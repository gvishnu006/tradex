"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CandlestickChart } from "./candlestick-chart";
import { Reveal } from "./motion";
import { AnimatedCounter } from "./animated-counter";
import { Star, Bell, Search, Settings, ArrowUpRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const orderBook = [
  { price: 67418.5, size: 0.42 },
  { price: 67415.2, size: 0.31 },
  { price: 67412.8, size: 0.55 },
  { price: 67410.1, size: 0.22 },
  { price: 67407.4, size: 0.61 },
  { price: 67404.9, size: 0.34 },
  { price: 67402.2, size: 0.48 },
  { price: 67399.6, size: 0.27 },
  { price: 67396.8, size: 0.51 },
  { price: 67394.1, size: 0.39 },
];

const recentTrades = [
  { price: 67418.5, size: 0.42, side: "buy" },
  { price: 67415.2, size: 0.31, side: "sell" },
  { price: 67412.8, size: 0.55, side: "buy" },
  { price: 67410.1, size: 0.22, side: "sell" },
  { price: 67407.4, size: 0.61, side: "buy" },
  { price: 67404.9, size: 0.34, side: "sell" },
  { price: 67402.2, size: 0.48, side: "buy" },
  { price: 67399.6, size: 0.27, side: "sell" },
];

const watchlist = [
  { symbol: "BTC", price: 67420.5, change: 2.43 },
  { symbol: "ETH", price: 3421.85, change: 1.82 },
  { symbol: "SOL", price: 172.34, change: -0.72 },
  { symbol: "AAPL", price: 228.42, change: 0.84 },
  { symbol: "XAU", price: 2341.67, change: 0.31 },
];

const timeframes = ["1H", "4H", "1D", "1W", "1M"];

export function Dashboard() {
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [watchlistFav, setWatchlistFav] = useState<Set<string>>(new Set(["BTC", "ETH"]));

  const toggleFav = (s: string) => {
    setWatchlistFav((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  const sentiment = 72;

  return (
    <section id="dashboard" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 text-center"
        >
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-positive bg-positive-dim border border-positive/20 rounded-full px-3 py-1 mb-4">
            Trading Terminal
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            A professional terminal, <span className="gradient-text-accent">beautifully simple</span>
          </h2>
          <p className="text-muted-light text-lg max-w-2xl mx-auto">
            Everything you need to analyze, execute, and track your trades in one real-time interface.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
            {/* Terminal top bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-surface/60">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-negative/70" />
                  <span className="w-3 h-3 rounded-full bg-warning/70" />
                  <span className="w-3 h-3 rounded-full bg-positive/70" />
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs text-muted-light">
                  <span className="px-2 py-1 rounded-md bg-white/5 text-white">Chart</span>
                  <span className="px-2 py-1 rounded-md hover:bg-white/5">Order Book</span>
                  <span className="px-2 py-1 rounded-md hover:bg-white/5">Recent Trades</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-light">
                <Search className="w-4 h-4" />
                <Bell className="w-4 h-4" />
                <Settings className="w-4 h-4" />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-px bg-border">
              {/* Main chart area */}
              <div className="lg:col-span-2 bg-surface p-4 sm:p-6 relative">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#f7931a]/15 border border-[#f7931a]/20 flex items-center justify-center text-xs font-bold text-[#f7931a]">
                        ₿
                      </div>
                      <span className="text-lg sm:text-xl font-semibold">BTC/USDT</span>
                    </div>
                    <button
                      onClick={() => toggleFav("BTC")}
                      className={cn(
                        "p-1.5 rounded-lg transition-all",
                        watchlistFav.has("BTC") ? "text-warning scale-110" : "text-muted-light hover:text-white"
                      )}
                      aria-label="Toggle watchlist"
                    >
                      <Star className="w-5 h-5" fill={watchlistFav.has("BTC") ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight">
                      <AnimatedCounter value={67420.5} prefix="$" decimals={1} />
                    </div>
                    <div className="flex items-center gap-2 justify-end text-sm mt-0.5">
                      <span className="text-positive flex items-center gap-0.5">
                        <ArrowUpRight className="w-4 h-4" /> +2.43%
                      </span>
                      <span className="text-positive-dim text-positive border border-positive/20 px-1.5 py-0.5 rounded text-xs font-medium">
                        Bullish
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeframes */}
                <div className="flex items-center gap-1 mb-4">
                  {timeframes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTimeframe(t)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                        activeTimeframe === t
                          ? "bg-white/10 text-white"
                          : "text-muted-light hover:text-white hover:bg-white/5"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                  <div className="ml-auto flex items-center gap-1 text-xs text-muted-light">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent inline-block" /> MA</span>
                  </div>
                </div>

                {/* Chart */}
                <CandlestickChart />

                {/* Market sentiment strip */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-lg bg-surface-2 border border-border p-3">
                    <div className="text-xs text-muted-light mb-1">24h Volume</div>
                    <div className="text-sm font-semibold font-mono">
                      <AnimatedCounter value={38.4} prefix="$" suffix="B" decimals={1} />
                    </div>
                  </div>
                  <div className="rounded-lg bg-surface-2 border border-border p-3">
                    <div className="text-xs text-muted-light mb-1">Market Cap</div>
                    <div className="text-sm font-semibold font-mono">
                      <AnimatedCounter value={1.31} prefix="$" suffix="T" decimals={2} />
                    </div>
                  </div>
                  <div className="rounded-lg bg-surface-2 border border-border p-3">
                    <div className="text-xs text-muted-light mb-1">High / Low</div>
                    <div className="text-sm font-semibold font-mono text-positive">68.1K / 65.9K</div>
                  </div>
                  <div className="rounded-lg bg-surface-2 border border-border p-3">
                    <div className="text-xs text-muted-light mb-1">Sentiment</div>
                    <div className="mt-1">
                      <div className="w-full h-1.5 rounded-full bg-negative/30 overflow-hidden relative">
                        <motion.div
                          className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-negative via-warning to-positive"
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${sentiment}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3 }}
                        />
                      </div>
                      <div className="text-[11px] mt-1 font-medium text-muted-light flex justify-between">
                        <span>Bearish</span><span className={sentiment > 50 ? "text-positive" : "text-negative"}>{sentiment}% Bullish</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel: order book, trades, buy/sell */}
              <div className="bg-surface flex flex-col min-w-0">
                {/* Buy/Sell toggle */}
                <div className="p-4 border-b border-border">
                  <div className="flex bg-surface-3 rounded-xl p-1 mb-3">
                    <button
                      onClick={() => setSide("buy")}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
                        side === "buy"
                          ? "bg-positive text-background shadow-lg shadow-positive/20"
                          : "text-muted-light hover:text-white"
                      )}
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => setSide("sell")}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
                        side === "sell"
                          ? "bg-negative text-white shadow-lg shadow-negative/20"
                          : "text-muted-light hover:text-white"
                      )}
                    >
                      Sell
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-surface-2 rounded-lg p-2">
                      <div className="text-muted-light mb-1">Available</div>
                      <div className="font-mono font-medium">0.0000 BTC</div>
                    </div>
                    <div className="bg-surface-2 rounded-lg p-2">
                      <div className="text-muted-light mb-1">USDT Balance</div>
                      <div className="font-mono font-medium">$24,582</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    {[25, 50, 75, 100].map((p) => (
                      <button
                        key={p}
                        className="flex-1 py-1.5 rounded-md bg-surface-3 text-xs text-muted-light hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {p}%
                      </button>
                    ))}
                  </div>

                  <button
                    className={cn(
                      "w-full mt-3 py-2.5 rounded-xl font-semibold text-sm transition-all",
                      side === "buy"
                        ? "bg-positive text-background hover:bg-emerald-300"
                        : "bg-negative text-white hover:bg-rose-400"
                    )}
                  >
                    {side === "buy" ? "Buy BTC" : "Sell BTC"} · $1,000
                  </button>
                </div>

                {/* Order book */}
                <div className="p-4 flex-1 border-b border-border min-h-0">
                  <div className="flex justify-between text-xs font-medium text-muted-light mb-2">
                    <span>Order Book</span>
                    <span>Price / Size</span>
                  </div>
                  <div className="space-y-0.5">
                    {orderBook.slice(0, 5).map((o, i) => (
                      <div key={`a-${i}`} className="relative flex items-center justify-between py-0.5 text-xs font-mono rounded px-1.5 overflow-hidden group">
                        <div className="absolute inset-y-0 right-0 bg-negative/10 group-hover:bg-negative/20" style={{ width: `${(o.size / 0.61) * 40}%` }} />
                        <span className="relative text-negative">{o.price.toFixed(1)}</span>
                        <span className="relative text-muted-light">{o.size}</span>
                      </div>
                    ))}
                    <div className="py-1 text-center text-sm font-semibold font-mono text-positive my-1">67,420.5</div>
                    {orderBook.slice(5).map((o, i) => (
                      <div key={`b-${i}`} className="relative flex items-center justify-between py-0.5 text-xs font-mono rounded px-1.5 overflow-hidden group">
                        <div className="absolute inset-y-0 right-0 bg-positive/10 group-hover:bg-positive/20" style={{ width: `${(o.size / 0.61) * 40}%` }} />
                        <span className="relative text-positive">{o.price.toFixed(1)}</span>
                        <span className="relative text-muted-light">{o.size}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent trades */}
                <div className="p-4 hidden sm:block">
                  <div className="flex justify-between text-xs font-medium text-muted-light mb-2">
                    <span>Recent Trades</span>
                  </div>
                  <div className="space-y-1 text-xs font-mono">
                    {recentTrades.map((t, i) => (
                      <div key={i} className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-white/5">
                        <span className={t.side === "buy" ? "text-positive" : "text-negative"}>
                          {t.side === "buy" ? "▲" : "▼"} {t.price.toFixed(1)}
                        </span>
                        <span className="text-muted-light">{t.size} BTC</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Watchlist bar */}
        <Reveal delay={0.2}>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4 text-negative" fill="currentColor" />
                Watchlist
              </h3>
              <span className="text-xs text-muted-light">Live · Real-time data</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {watchlist.map((w) => (
                <div
                  key={w.symbol}
                  className="bg-surface-2 border border-border rounded-xl p-3 hover:border-border-hover hover:-translate-y-0.5 transition-all cursor-default"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{w.symbol}</span>
                    <button
                      onClick={() => toggleFav(w.symbol)}
                      className={cn(
                        "transition-transform",
                        watchlistFav.has(w.symbol) ? "text-warning scale-100" : "text-muted-light hover:text-warning hover:scale-125"
                      )}
                      aria-label={`Toggle ${w.symbol} watchlist`}
                    >
                      <Star className="w-4 h-4" fill={watchlistFav.has(w.symbol) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="font-mono font-medium text-sm">${w.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                  <div className={cn("text-xs mt-0.5", w.change >= 0 ? "text-positive" : "text-negative")}>
                    {w.change >= 0 ? "+" : ""}{w.change}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
