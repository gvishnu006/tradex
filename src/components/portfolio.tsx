"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { Reveal } from "./motion";
import { AnimatedCounter } from "./animated-counter";
import { cn } from "@/lib/utils";

const holdings = [
  { symbol: "BTC", name: "Bitcoin", amount: 0.485, value: 32700, allocation: 44, change: 5.2, color: "#f7931a" },
  { symbol: "ETH", name: "Ethereum", amount: 5.2, value: 17800, allocation: 24, change: 3.1, color: "#627eea" },
  { symbol: "SOL", name: "Solana", amount: 42.5, value: 7300, allocation: 10, change: -1.4, color: "#9945ff" },
  { symbol: "AAPL", name: "Apple Inc.", amount: 38, value: 8680, allocation: 12, change: 0.9, color: "#a2aaad" },
  { symbol: "XAU", name: "Gold", amount: 2.4, value: 5620, allocation: 7, change: 0.3, color: "#ffd700" },
  { symbol: "USDT", name: "USDT", amount: 1900, value: 1900, allocation: 3, change: 0, color: "#26a17b" },
];

const totalValue = 74000;

function generatePoints() {
  const height = 220;
  const width = 700;
  const num = 40;
  const pts: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < num; i++) {
    const t = i / (num - 1);
    const x = t * width;
    const y =
      height -
      (30 +
        60 * Math.sin(t * Math.PI * 2.2 + 0.3) +
        30 * Math.sin(t * Math.PI * 5) +
        t * 55);
    pts.push({ x, y });
  }
  return pts;
}

function PortfolioChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [progress, setProgress] = useState(0);
  const [points] = useState<Array<{ x: number; y: number }>>(() =>
    generatePoints()
  );

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const maxY = 240;
  const visible = points.slice(0, Math.floor(points.length * progress));
  const linePath =
    visible.length > 0
      ? "M" + visible.map((p) => `${p.x},${p.y}`).join(" L")
      : "";
  const areaPath =
    visible.length > 0
      ? `${linePath} L${visible[visible.length - 1].x},${maxY} L${visible[0].x},${maxY} Z`
      : "";

  const lastY = visible.length ? visible[visible.length - 1].y : maxY;
  const lastX = visible.length ? visible[visible.length - 1].x : 0;

  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-xl bg-surface-2/50 border border-border p-3">
      <svg viewBox="0 0 700 240" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="portfolio-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e09e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00e09e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="portfolio-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#00e09e" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0, 60, 120, 180].map((y) => (
          <line key={y} x1="0" x2="700" y1={y} y2={y} stroke="rgba(255,255,255,0.04)" strokeDasharray="4 6" />
        ))}

        {areaPath && <motion.path d={areaPath} fill="url(#portfolio-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />}
        {linePath && (
          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#portfolio-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {lastY > 0 && lastX > 0 && (
          <>
            <circle cx={lastX} cy={lastY} r="5" fill="#00e09e" />
            <circle cx={lastX} cy={lastY} r="9" fill="#00e09e" opacity="0.2">
              <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>

      <div className="flex justify-between px-2 -mt-2 text-[10px] text-muted-light font-mono">
        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] radial-glow-green pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-positive bg-positive-dim border border-positive/20 rounded-full px-3 py-1 mb-4">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              Your portfolio, <span className="gradient-text-accent">in focus</span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-muted-light mb-1">Total Balance</div>
                <div className="text-3xl font-bold font-mono">
                  <AnimatedCounter value={totalValue} prefix="$" />
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <span className="flex items-center gap-1 text-positive bg-positive-dim border border-positive/20 rounded-lg px-2 py-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +$1,284 Today
                </span>
                <span className="flex items-center gap-1 text-positive bg-positive-dim border border-positive/20 rounded-lg px-2 py-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% Overall
                </span>
              </div>
            </div>
          </Reveal>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Chart */}
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <div className="bg-surface border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-sm font-semibold mb-1">Performance</div>
                    <div className="text-2xl font-bold text-positive font-mono">
                      <AnimatedCounter value={18.4} prefix="+" suffix="%" decimals={1} />
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    {["1M", "3M", "6M", "1Y", "ALL"].map((p, i) => (
                      <button
                        key={p}
                        className={cn(
                          "px-3 py-1.5 rounded-lg transition-colors",
                          i === 4 ? "bg-white/10 text-white" : "text-muted-light hover:text-white hover:bg-white/5"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <PortfolioChart />
                <div className="flex items-center justify-center gap-4 text-xs text-muted-light mt-4">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" /> Portfolio Value</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-positive" /> Profit</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Allocation */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Reveal delay={0.2}>
              <div className="bg-surface border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Asset Allocation</h3>
                  <span className="text-xs text-muted-light">6 assets</span>
                </div>

                {/* Donut */}
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <div className="relative w-36 h-36">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      {holdings.reduce((acc, h) => acc + h.allocation, 0) > 0 && (
                        <>
                          {(() => {
                            let cumulative = 0;
                            return holdings.map((h, i) => {
                              const start = (cumulative / 100) * 2 * Math.PI;
                              cumulative += h.allocation;
                              const end = (cumulative / 100) * 2 * Math.PI;
                              const large = h.allocation > 50 ? 1 : 0;
                              const x1 = 60 + 48 * Math.cos(start);
                              const y1 = 60 + 48 * Math.sin(start);
                              const x2 = 60 + 48 * Math.cos(end);
                              const y2 = 60 + 48 * Math.sin(end);
                              return (
                                <motion.path
                                  key={h.symbol}
                                  d={`M 60 60 L ${x1} ${y1} A 48 48 0 ${large} 1 ${x2} ${y2} Z`}
                                  fill={h.color}
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.2 + i * 0.15 }}
                                />
                              );
                            });
                          })()}
                        </>
                      )}
                      <circle cx="60" cy="60" r="32" fill="#0c1017" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-[10px] text-muted-light">Total</span>
                      <span className="text-lg font-bold font-mono">
                        <AnimatedCounter value={totalValue} prefix="$" />
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-[160px] space-y-2">
                    {holdings.map((h) => (
                      <div key={h.symbol} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: h.color }} />
                          <span className="text-muted-light">{h.symbol}</span>
                        </div>
                        <span className="font-mono font-medium">{h.allocation}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-surface border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Holdings</h3>
                </div>
                <div className="space-y-2">
                  {holdings.slice(0, 4).map((h) => (
                    <div key={h.symbol} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                      <div>
                        <div className="font-medium">{h.name} <span className="text-muted-light text-xs">({h.amount})</span></div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-medium">${h.value.toLocaleString()}</div>
                        <div className={cn("text-xs", h.change >= 0 ? "text-positive" : "text-negative")}>
                          {h.change >= 0 ? <Plus className="w-3 h-3 inline" /> : <Minus className="w-3 h-3 inline" />}
                          {h.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
