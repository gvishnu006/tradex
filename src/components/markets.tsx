"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { SectionHeading, Reveal } from "./motion";
import { Sparkline } from "./sparkline";
import { marketAssets, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

const filters = ["All", "Crypto", "Stocks", "Forex", "Commodities"] as const;
type Filter = (typeof filters)[number];

export function Markets() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = marketAssets.filter(
    (a) => activeFilter === "All" || a.category === activeFilter
  );

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    switch (sortKey) {
      case "price": return sortDir === "asc" ? a.price - b.price : b.price - a.price;
      case "change": return sortDir === "asc" ? a.change - b.change : b.change - a.change;
      case "volume": return sortDir === "asc" ? a.volume - b.volume : b.volume - a.volume;
      default: return 0;
    }
  });

  return (
    <section id="markets" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Markets"
            title="Live markets at your fingertips"
            subtitle="Track thousands of assets across every major market with real-time prices and deep analytics."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-strong rounded-2xl overflow-hidden">
            {/* Filters */}
            <div className="flex items-center gap-2 p-4 border-b border-border overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                    activeFilter === f
                      ? "bg-white/10 text-white border border-border-hover"
                      : "text-muted-light hover:text-white hover:bg-white/5"
                  )}
                >
                  {f}
                </button>
              ))}
              <span className="ml-auto text-xs text-muted-light hidden sm:block">
                Updated in real-time
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="text-left text-xs text-muted-light border-b border-border">
                    <th className="px-4 py-3 font-medium">Asset</th>
                    <th className="px-4 py-3 font-medium cursor-pointer hover:text-white select-none" onClick={() => handleSort("price")}>
                      Price {sortKey === "price" && <span className="text-positive">{sortDir === "asc" ? "↑" : "↓"}</span>}
                    </th>
                    <th className="px-4 py-3 font-medium cursor-pointer hover:text-white select-none" onClick={() => handleSort("change")}>
                      24h Change {sortKey === "change" && <span className="text-positive">{sortDir === "asc" ? "↑" : "↓"}</span>}
                    </th>
                    <th className="px-4 py-3 font-medium cursor-pointer hover:text-white select-none" onClick={() => handleSort("volume")}>
                      24h Volume {sortKey === "volume" && <span className="text-positive">{sortDir === "asc" ? "↑" : "↓"}</span>}
                    </th>
                    <th className="px-4 py-3 font-medium">Market Cap</th>
                    <th className="px-4 py-3 font-medium">Trend</th>
                    <th className="px-4 py-3 font-medium text-right">Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((asset, i) => (
                    <motion.tr
                      key={asset.symbol}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                      className="border-b border-border/50 hover:bg-white/[0.02] group transition-colors"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                            style={{ background: `${asset.color}1a`, border: `1px solid ${asset.color}30`, color: asset.color }}
                          >
                            {asset.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <div className="font-semibold">{asset.symbol}</div>
                            <div className="text-xs text-muted-light">{asset.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-mono group-hover:text-white transition-colors">
                        ${asset.price >= 1000 ? asset.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : asset.price.toFixed(4)}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={cn(
                            "inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-medium",
                            asset.change >= 0
                              ? "text-positive bg-positive-dim border border-positive/20"
                              : "text-negative bg-negative-dim border border-negative/20"
                          )}
                        >
                          {asset.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {asset.change >= 0 ? "+" : ""}{asset.change}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-muted-light">{formatNumber(asset.volume)}</td>
                      <td className="px-4 py-3.5 font-mono text-muted-light">
                        {asset.marketCap > 0 ? formatNumber(asset.marketCap) : "—"}
                      </td>
                      <td className="px-4 py-3.5">
                        <Sparkline data={asset.sparkline} color={asset.change >= 0 ? "#00e09e" : "#ff4d6a"} width={70} height={24} />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button className="px-4 py-2 rounded-lg bg-white/5 border border-border text-xs font-semibold text-white hover:bg-positive hover:text-background hover:border-positive transition-all group-hover:opacity-100 opacity-60">
                          Trade
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
