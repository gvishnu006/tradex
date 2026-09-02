"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./motion";

export function FinalCta() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      {/* Animated market lines background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 400">
          {[0, 1, 2, 3, 4].map((i) => {
            const path = `M0,${200 + i * 40} C 300,${140 + i * 30} 600,${260 + i * 20} 900,${180 + i * 30} C 1150,${120 + i * 25} 1300,${240 + i * 15} 1440,${160 + i * 20}`;
            return (
              <motion.path
                key={i}
                d={path}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: i * 0.3, ease: "easeInOut" }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-glow" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Your Next Trade
            <br />
            <span className="gradient-text-accent">Starts Here.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-lg sm:text-xl text-muted-light mb-10 max-w-xl mx-auto">
            Build your strategy. Follow the markets. Trade with confidence.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#"
              className="btn-primary text-lg px-10 py-4 flex items-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Trading
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <MotionSecondaryLink />
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="text-xs text-muted-light mt-8">
            No credit card required · Free to start · Cancel anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function MotionSecondaryLink() {
  return (
    <a
      href="#pricing"
      className="btn-secondary text-lg px-10 py-4"
    >
      View Pricing
    </a>
  );
}
