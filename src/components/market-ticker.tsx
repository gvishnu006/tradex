"use client";

import { tickerItems } from "@/lib/utils";

function TickerRow() {
  const items = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];
  return (
    <div className="flex shrink-0 gap-12 px-6 animate-ticker">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-semibold text-white">{item.symbol}</span>
          <span
            className={
              item.change >= 0 ? "text-positive" : "text-negative"
            }
          >
            {item.change >= 0 ? "+" : ""}
            {item.change.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );
}

export function MarketTicker() {
  return (
    <div className="w-full overflow-hidden border-y border-border bg-surface/80 py-3 relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent" />
      <div className="flex overflow-hidden">
        <TickerRow />
      </div>
    </div>
  );
}
