"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Markets", href: "#markets" },
  { label: "Trade", href: "#dashboard" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Insights", href: "#ai" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-2 px-4" : "py-4 px-0"
      )}
    >
      <nav
        className={cn(
          "mx-auto max-w-7xl transition-all duration-500",
          scrolled ? "glass-strong rounded-2xl px-4" : "px-6"
        )}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group" aria-label="TradeX home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-positive flex items-center justify-center shadow-lg shadow-positive/20 group-hover:shadow-positive/40 transition-shadow">
              <TrendingUp className="w-5 h-5 text-background" strokeWidth={3} />
            </div>
            <span className="text-xl font-bold tracking-tight">Trade<span className="text-positive">X</span></span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-light hover:text-white transition-colors group relative py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-positive rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#"
              className="text-sm font-medium text-muted-light hover:text-white transition-colors px-3 py-2"
            >
              Sign In
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-positive to-emerald-400 text-background font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-positive/30 hover:-translate-y-0.5 transition-all"
            >
              Start Trading
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-2.5 rounded-lg hover:bg-white/5 text-muted-light hover:text-white transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="mt-3 flex flex-col gap-2 px-3">
                  <a href="#" className="text-center text-white bg-white/10 py-2.5 rounded-xl font-medium">
                    Sign In
                  </a>
                  <a href="#" className="text-center bg-gradient-to-r from-positive to-emerald-400 text-background font-semibold py-2.5 rounded-xl">
                    Start Trading
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
