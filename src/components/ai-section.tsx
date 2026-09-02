"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Activity,
  AlertTriangle,
  BrainCircuit,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "./motion";

const insights = [
  {
    icon: TrendingUp,
    label: "Momentum",
    value: "Increasing",
    color: "text-positive",
    bar: "bg-positive",
    width: "78%",
  },
  {
    icon: Activity,
    label: "Volatility",
    value: "Moderate",
    color: "text-warning",
    bar: "bg-warning",
    width: "52%",
  },
  {
    icon: AlertTriangle,
    label: "Risk Level",
    value: "Low",
    color: "text-positive",
    bar: "bg-positive",
    width: "24%",
  },
  {
    icon: BrainCircuit,
    label: "AI Confidence",
    value: "87%",
    color: "text-accent",
    bar: "bg-accent",
    width: "87%",
  },
];

function AiVisual() {
  const waves = [0, 1, 2, 3, 4];
  return (
    <div className="relative w-full aspect-square max-w-[360px] mx-auto">
      {/* Orbit rings */}
      {[0, 60, 120].map((r) => (
        <div
          key={r}
          className="absolute inset-0 rounded-full border border-border-hover/40"
          style={{ margin: r }}
        />
      ))}
      {/* Orbiting dot */}
      <motion.div
        className="absolute inset-0 flex items-start justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-3 h-3 rounded-full bg-positive shadow-glow shadow-positive/60 mt-[-3px]" />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-end justify-center"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-2 h-2 rounded-full bg-accent shadow-glow shadow-accent/60 mb-[-2px]" />
      </motion.div>

      {/* Core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-accent via-accent/60 to-positive/60 shadow-2xl shadow-accent/30 flex items-center justify-center"
        >
          <BrainCircuit className="w-14 h-14 text-white" />
          <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm" />
          <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-xl" />
        </motion.div>
      </div>

      {/* Floating data chips */}
      {waves.map((w, i) => (
        <motion.div
          key={w}
          className="absolute glass-strong rounded-lg px-2 py-0.5 text-[9px] font-mono text-muted-light"
          animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
          style={{
            top: `${10 + w * 18}%`,
            left: `${i % 2 === 0 ? 4 : 72}%`,
          }}
        >
          {["+2.43% BTC", "RSI 64", "MA Cross", "Buy Signal", "Conf 87%", "Vol 38B"][i]}
        </motion.div>
      ))}
    </div>
  );
}

export function AiSection() {
  return (
    <section id="ai" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="order-2 lg:order-1">
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-accent bg-accent-dim border border-accent/20 rounded-full px-3 py-1 mb-4">
              AI Trading Assistant
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">
              Your intelligent partner in the markets
            </h2>
            <p className="text-muted-light text-lg leading-relaxed mb-8">
              TradeX AI continuously analyzes live market data, news sentiment,
              and technical patterns to deliver clear, actionable insights — so
              you can make confident decisions.
            </p>

            <div className="grid gap-3">
              {insights.map((item, i) => (
                <Reveal key={item.label} delay={0.1 + i * 0.08} y={16}>
                  <div className="bg-surface border border-border rounded-xl p-4 hover:border-border-hover transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-sm text-muted-light">{item.label}</span>
                      </div>
                      <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                      <motion.div
                        className={`h-full ${item.bar} rounded-full`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: item.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.3 + i * 0.1 }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.5}>
              <div className="mt-6 glass-strong rounded-xl p-4 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-accent mb-1">AI Market Insight</div>
                  <p className="text-sm text-muted-light leading-relaxed">
                    Bitcoin momentum is increasing as buying pressure rises across
                    major exchanges.
                  </p>
                </div>
              </div>
            </Reveal>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={0.2}>
            <div className="relative flex items-center justify-center">
              <AiVisual />
              <div className="absolute bottom-6 glass-strong rounded-xl px-5 py-3 text-center shadow-2xl">
                <div className="text-[11px] text-muted-light mb-1">Market Sentiment Score</div>
                <div className="text-2xl font-bold"><span className="text-positive">+72</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
