"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ChartPie, Wallet, BrainCircuit, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: Home, label: "Home", href: "#" },
  { icon: ChartPie, label: "Markets", href: "#markets" },
  { icon: Wallet, label: "Trade", href: "#dashboard", primary: true },
  { icon: BrainCircuit, label: "Insights", href: "#ai" },
  { icon: User, label: "Portfolio", href: "#portfolio" },
];

export function MobileNav() {
  const [active, setActive] = useState("Home");
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 300) setVisible(false);
      else setVisible(true);
      setLastScroll(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 glass-strong rounded-2xl px-2 py-2 flex items-center gap-1 md:hidden"
        >
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all relative",
                item.primary
                  ? "bg-gradient-to-r from-positive to-emerald-400 text-background"
                  : active === item.label
                    ? "text-white"
                    : "text-muted-light",
                !item.primary && "min-w-[52px]"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{item.label}</span>
              {!item.primary && active === item.label && (
                <motion.span
                  layoutId="mobile-nav-dot"
                  className="absolute bottom-0.5 w-1 h-1 rounded-full bg-positive"
                />
              )}
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
