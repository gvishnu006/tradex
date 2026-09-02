"use client";

import { motion } from "framer-motion";
import {
  Server,
  ShieldCheck,
  Lock,
  KeyRound,
  ReceiptText,
  Scale,
} from "lucide-react";
import { Reveal } from "./motion";

const badges = [
  {
    icon: Server,
    title: "Secure Infrastructure",
    desc: "Enterprise-grade infrastructure with redundant systems and 99.99% uptime.",
  },
  {
    icon: ShieldCheck,
    title: "Two-Factor Authentication",
    desc: "Protect your account with hardware, authenticator, or biometric 2FA.",
  },
  {
    icon: Lock,
    title: "Bank-Grade Encryption",
    desc: "AES-256 encryption protects your data and funds at rest and in transit.",
  },
  {
    icon: KeyRound,
    title: "Account Protection",
    desc: "Advanced fraud monitoring and instant lockout on suspicious activity.",
  },
  {
    icon: ReceiptText,
    title: "Transparent Fees",
    desc: "Clear, low-cost fee structure with no hidden charges. Know your costs.",
  },
  {
    icon: Scale,
    title: "Risk Controls",
    desc: "Negative balance protection, order limits, and customizable risk settings.",
  },
];

export function Security() {
  return (
    <section id="security" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-positive bg-positive-dim border border-positive/20 rounded-full px-3 py-1 mb-4">
            Security
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Built on trust, engineered for safety
          </h2>
          <p className="text-muted-light text-lg leading-relaxed">
            Your funds and data are protected by the same security standards used
            by leading financial institutions.
          </p>
        </Reveal>

        <div className="flex justify-center mb-12">
          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="w-16 h-16 rounded-2xl bg-positive-dim border border-positive/20 flex items-center justify-center shadow-lg shadow-positive/10"
          >
            <ShieldCheck className="w-8 h-8 text-positive" />
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {badges.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.1} y={20}>
              <div className="group bg-surface border border-border rounded-2xl p-6 hover:border-positive/30 hover:bg-surface-2 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-positive-dim border border-positive/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <b.icon className="w-5 h-5 text-positive" />
                </div>
                <h3 className="font-semibold mb-1.5">{b.title}</h3>
                <p className="text-sm text-muted-light leading-relaxed">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
