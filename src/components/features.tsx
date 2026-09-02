"use client";

import { motion } from "framer-motion";
import {
  Zap,
  CandlestickChart as CandlestickIcon,
  BrainCircuit,
  PieChart,
  ShieldAlert,
  Gauge,
} from "lucide-react";
import { SectionHeading, Reveal } from "./motion";

const features = [
  {
    icon: Zap,
    title: "Real-Time Trading",
    desc: "Sub-millisecond execution across 350+ markets with live streaming prices and instant fills.",
    color: "text-warning",
    glow: "bg-warning/10 border-warning/20",
  },
  {
    icon: CandlestickIcon,
    title: "Advanced Charts",
    desc: "Professional candlestick analysis with 40+ indicators, drawing tools, and multi-timeframe support.",
    color: "text-accent",
    glow: "bg-accent/10 border-accent/20",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Market Insights",
    desc: "Machine learning models analyze patterns, sentiment, and momentum to surface actionable signals.",
    color: "text-positive",
    glow: "bg-positive/10 border-positive/20",
  },
  {
    icon: PieChart,
    title: "Smart Portfolio Tracking",
    desc: "Real-time allocation, performance analytics, and P/L tracking across all your positions.",
    color: "text-sky-400",
    glow: "bg-sky-400/10 border-sky-400/20",
  },
  {
    icon: ShieldAlert,
    title: "Risk Management",
    desc: "Set stop-losses, take-profits, and position limits with intelligent risk alerts and safeguards.",
    color: "text-rose-400",
    glow: "bg-rose-400/10 border-rose-400/20",
  },
  {
    icon: Gauge,
    title: "Lightning-Fast Execution",
    desc: "Engineered for speed with low-latency routing and a trading engine that never sleeps.",
    color: "text-emerald-400",
    glow: "bg-emerald-400/10 border-emerald-400/20",
  },
];

export function Features() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] radial-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Platform"
            title="Everything you need to trade with confidence"
            subtitle="A complete suite of tools designed for both beginners and experienced traders, engineered for performance."
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
              className="group relative bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:bg-surface-2 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${f.glow} ${f.color} transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-light leading-relaxed">{f.desc}</p>

              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
