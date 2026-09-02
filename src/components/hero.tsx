"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Zap, TrendingUp, Shield } from "lucide-react";
import { CandlestickChart } from "./candlestick-chart";
import { AnimatedCounter } from "./animated-counter";
import { MarketTicker } from "./market-ticker";

const stats = [
  { label: "Total Volume", value: 4.8, suffix: "B+", prefix: "$", decimals: 1 },
  { label: "Active Traders", value: 2.4, suffix: "M+", prefix: "", decimals: 1 },
  { label: "Markets", value: 350, suffix: "+", prefix: "", decimals: 0 },
  { label: "Avg. Execution", value: 12, suffix: "ms", prefix: "", decimals: 0 },
];

function FloatingStat({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute animate-float ${className ?? ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] radial-glow pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] radial-glow-green pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: text */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-positive animate-pulse-glow" />
              <span className="text-xs font-medium text-muted-light">
                Next-generation trading platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Trade Smarter.
              <br />
              <span className="gradient-text">Move Faster.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-lg text-muted-light leading-relaxed mb-8 max-w-lg"
            >
              One powerful platform for real-time markets, intelligent insights,
              and effortless trading.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <a
                href="#"
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                Start Trading
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#dashboard"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Explore Platform
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold font-mono">
                    <AnimatedCounter
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </div>
                  <div className="text-xs text-muted-light mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: chart preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-strong rounded-2xl p-4 relative shadow-2xl shadow-accent/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#f7931a]/15 border border-[#f7931a]/20 flex items-center justify-center text-[10px] font-bold text-[#f7931a]">
                    ₿
                  </div>
                  <span className="text-sm font-semibold">BTC/USD</span>
                  <span className="text-xs text-positive bg-positive-dim border border-positive/20 rounded px-1.5 py-0.5 font-medium">
                    Live
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono">
                    <AnimatedCounter value={67420.5} prefix="$" decimals={1} />
                  </div>
                  <div className="text-xs text-positive">+2.43%</div>
                </div>
              </div>

              <CandlestickChart height={280} />

              <div className="flex items-center justify-between text-xs text-muted-light mt-2 pt-2 border-t border-border">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-warning" /> AI Insight Active
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-positive" /> Secure
                </span>
              </div>
            </div>

            {/* Floating stats */}
            <FloatingStat delay={1}>
              <div className="glass-strong rounded-xl px-4 py-2 flex items-center gap-3 shadow-xl">
                <div className="w-8 h-8 rounded-lg bg-positive-dim border border-positive/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-positive" />
                </div>
                <div>
                  <div className="text-xs text-muted-light">Market Sentiment</div>
                  <div className="text-sm font-bold text-positive">Bullish 72%</div>
                </div>
              </div>
            </FloatingStat>

            <FloatingStat delay={1.4} className="top-1/2 -left-8 hidden sm:block">
              <div className="glass-strong rounded-xl px-4 py-2 shadow-xl">
                <div className="text-xs text-muted-light">ETH</div>
                <div className="text-sm font-bold">$3,421.85</div>
                <div className="text-xs text-positive">+1.82%</div>
              </div>
            </FloatingStat>

            <FloatingStat delay={1.7} className="bottom-8 -right-4 hidden md:block">
              <div className="glass-strong rounded-xl px-4 py-2 text-center shadow-xl">
                <div className="text-xs text-muted-light">Execution Speed</div>
                <div className="text-lg font-bold text-positive"><AnimatedCounter value={12} prefix="" suffix="ms" /></div>
              </div>
            </FloatingStat>
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0">
        <MarketTicker />
      </div>
    </section>
  );
}
