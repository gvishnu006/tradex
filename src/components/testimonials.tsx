"use client";

import { Quote } from "lucide-react";
import { Reveal, SectionHeading } from "./motion";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Full-time Trader",
    exp: "5+ years experience",
    quote:
      "TradeX completely changed how I trade. The AI insights alone have saved me from several bad entries. The platform is fast, clean, and genuinely powerful.",
    avatar: "SM",
    color: "bg-accent",
  },
  {
    name: "James Chen",
    role: "Portfolio Manager",
    exp: "12+ years experience",
    quote:
      "The professional-grade tools combined with a beautiful interface make this the best trading platform I've used. Execution speed is remarkable.",
    avatar: "JC",
    color: "bg-positive",
  },
  {
    name: "Elena Rodriguez",
    role: "Active Investor",
    exp: "3+ years experience",
    quote:
      "I started as a complete beginner and TradeX made it easy to learn. The risk management tools give me confidence, and the UI is gorgeous.",
    avatar: "ER",
    color: "bg-warning",
  },
  {
    name: "David Okafor",
    role: "Crypto Trader",
    exp: "8+ years experience",
    quote:
      "The AI pattern detection is incredibly accurate. It caught a reversal I would have completely missed. This is the next generation of trading.",
    avatar: "DO",
    color: "bg-rose-400",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by traders worldwide"
            subtitle="Join thousands of traders who rely on TradeX every day."
          />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.12}>
              <div className="group bg-surface border border-border rounded-2xl p-6 hover:border-border-hover hover:bg-surface-2 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <Quote className="w-6 h-6 text-accent/60 mb-4" />
                <p className="text-muted-light leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full ${t.color} flex items-center justify-center text-sm font-bold text-background`}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-light">{t.role}</div>
                    </div>
                  </div>
                  <span className="text-xs text-positive bg-positive-dim border border-positive/20 rounded-full px-3 py-1">
                    {t.exp}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
