"use client";

import { TrendingUp, Globe, Mail, MessageCircle, Rss } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: ["Trading Terminal", "AI Insights", "Portfolio Tracker", "Mobile App", "API Access"],
  },
  {
    title: "Markets",
    links: ["Crypto", "Stocks", "Forex", "Commodities", "Indices"],
  },
  {
    title: "Resources",
    links: ["Learn", "Documentation", "Market Analysis", "Help Center", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact", "Press"],
  },
  {
    title: "Security",
    links: ["Security Overview", "Audits", "Bug Bounty", "Privacy Policy"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Risk Disclosure", "Cookies", "AML Policy"],
  },
];

const socials = [
  { icon: Globe, label: "Website" },
  { icon: MessageCircle, label: "Discord" },
  { icon: Rss, label: "Blog feed" },
  { icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-positive flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-background" strokeWidth={3} />
              </div>
              <span className="text-xl font-bold tracking-tight">Trade<span className="text-positive">X</span></span>
            </a>
            <p className="text-sm text-muted-light leading-relaxed">
              The next-generation trading platform for real-time markets and
              intelligent insights.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center text-muted-light hover:text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-light mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Risk disclaimer */}
        <div className="border-t border-border pt-6 mb-8">
          <p className="text-xs text-muted/70 leading-relaxed max-w-4xl">
            <span className="font-semibold text-muted">Risk Disclaimer: </span>
            Trading cryptocurrencies, stocks, forex, and commodities involves substantial
            risk of loss and is not suitable for every investor. The value of investments
            may fluctuate, and past performance is not indicative of future results. The
            information provided on this platform is for educational and informational
            purposes only and should not be considered financial advice. TradeX does not
            provide investment, legal, or tax advice. Always seek the advice of a qualified
            financial professional before making investment decisions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© {new Date().getFullYear()} TradeX. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Risk Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
