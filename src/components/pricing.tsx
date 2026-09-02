"use client";

import { Check, Sparkles } from "lucide-react";
import { Reveal, SectionHeading } from "./motion";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: 0,
    description: "For getting started with your trading journey.",
    features: [
      "Real-time market data",
      "Basic charting tools",
      "Standard execution",
      "Portfolio tracking",
      "Email support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "For active traders who need an edge.",
    features: [
      "Everything in Starter",
      "AI-powered insights",
      "Advanced charting & indicators",
      "Priority execution",
      "Risk management tools",
      "24/7 priority support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Advanced",
    price: 99,
    description: "For professionals and institutions.",
    features: [
      "Everything in Pro",
      "API access & webhooks",
      "Unlimited strategies",
      "Dedicated account manager",
      "Custom risk controls",
      "White-glove onboarding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, transparent pricing"
            subtitle="Start free and scale as you grow. No hidden fees, cancel anytime."
          />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.15}>
              <div
                className={cn(
                  "relative h-full flex flex-col rounded-2xl p-6 sm:p-8 transition-all hover:-translate-y-1",
                  plan.popular
                    ? "bg-gradient-to-b from-accent/15 to-surface border border-accent/40 shadow-2xl shadow-accent/20"
                    : "bg-surface border border-border hover:border-border-hover hover:shadow-xl hover:shadow-black/20"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-positive text-background text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Recommended
                  </div>
                )}

                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-light mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    {plan.price === 0 ? (
                      <span className="text-5xl font-bold tracking-tight">Free</span>
                    ) : (
                      <>
                        <span className="text-5xl font-bold tracking-tight">${plan.price}</span>
                        <span className="text-sm text-muted-light mb-2">/mo</span>
                      </>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={cn(
                          "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                          plan.popular
                            ? "bg-positive-dim text-positive border border-positive/20"
                            : "bg-white/5 text-muted-light border border-border"
                        )}
                      >
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="text-muted-light">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "w-full py-3 rounded-xl text-sm font-semibold transition-all",
                    plan.popular
                      ? "bg-gradient-to-r from-positive to-emerald-400 text-background hover:shadow-lg hover:shadow-positive/30 hover:-translate-y-0.5"
                      : "bg-white/5 border border-border text-white hover:bg-white/10 hover:-translate-y-0.5"
                  )}
                >
                  {plan.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="text-center text-xs text-muted-light mt-8">
            All plans include portfolio tracking, market analysis, and our security suite.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
