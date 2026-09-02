"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Candle = {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

function generateCandles(count: number, startPrice = 100, seed = 1): Candle[] {
  const candles: Candle[] = [];
  let price = startPrice;
  let prev = seed;
  for (let i = 0; i < count; i++) {
    // deterministic pseudo-random
    prev = (prev * 9301 + 49297) % 233280;
    const rand = prev / 233280;
    const drift = 0.3 + rand * 0.9;
    const trend = i > count * 0.6 ? 0.6 : -0.2;
    const change = (rand - 0.45 + trend * 0.02) * drift;
    const open = price;
    const close = Math.max(1, open + change * 2);
    const high = Math.max(open, close) + Math.abs(change) * 0.6;
    const low = Math.min(open, close) - Math.abs(change) * 0.5;
    candles.push({
      open,
      high,
      low,
      close,
      volume: 40 + rand * 90 + (i > count * 0.6 ? 30 : 0),
    });
    price = close;
  }
  return candles;
}

export function CandlestickChart({
  width = 640,
  height = 300,
  candles: rawCandles,
  animate = true,
}: {
  width?: number;
  height?: number;
  candles?: Candle[];
  animate?: boolean;
}) {
  const candles = rawCandles ?? generateCandles(48, 67200, 7);
  const [hover, setHover] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(() =>
    animate ? 0 : candles.length
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewSize, setViewSize] = useState({ width, height });
  const padding = { top: 20, bottom: 40, left: 12, right: 8 };

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const w = window.innerWidth < 480 ? 340 : rect.width;
        setViewSize({ width: w, height: rect.width < 480 ? 240 : height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [height]);

  useEffect(() => {
    if (!animate) return;
    let i = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            i += 1;
            setVisibleCount(i);
            if (i >= candles.length) clearInterval(interval);
          }, 45);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [candles.length, animate]);

  const visCandles = candles.slice(0, visibleCount);
  const allHigh = Math.max(...candles.map((c) => c.high));
  const allLow = Math.min(...candles.map((c) => c.low));
  const range = allHigh - allLow || 1;
  const chartW = viewSize.width - padding.left - padding.right;
  const chartH = viewSize.height - padding.top - padding.bottom;
  const candleW = chartW / candles.length;
  const bodyW = Math.max(3, Math.min(candleW * 0.6, 12));

  const maxVol = Math.max(...candles.map((c) => c.volume));
  const volH = 36;

  const xOf = (i: number) => padding.left + i * candleW + candleW / 2;
  const yOf = (price: number) => padding.top + ((allHigh - price) / range) * chartH;

  const lastCandle = candles[candles.length - 1];
  const lastClose = lastCandle?.close ?? 0;
  const prevClose = candles[candles.length - 2]?.close ?? lastClose;
  const isUp = lastClose >= prevClose;
  const lastColor = isUp ? "#00e09e" : "#ff4d6a";

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <svg
        width={viewSize.width}
        height={viewSize.height}
        viewBox={`0 0 ${viewSize.width} ${viewSize.height}`}
        onMouseMove={(e) => {
          const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const idx = Math.floor((x - padding.left) / candleW);
          if (idx >= 0 && idx < candles.length) setHover(idx);
        }}
        onMouseLeave={() => setHover(null)}
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padding.left}
            x2={viewSize.width - padding.right}
            y1={padding.top + t * chartH}
            y2={padding.top + t * chartH}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}

        {/* Candles */}
        {visCandles.map((candle, i) => {
          const up = candle.close >= candle.open;
          const color = up ? "#00e09e" : "#ff4d6a";
          const x = xOf(i);
          const yOpen = yOf(candle.open);
          const yClose = yOf(candle.close);
          const yHigh = yOf(candle.high);
          const yLow = yOf(candle.low);
          const bodyTop = Math.min(yOpen, yClose);
          const bodyH = Math.max(1, Math.abs(yClose - yOpen));
          const hovered = hover === i;
          const volX = x - bodyW / 2;

          return (
            <g key={i} opacity={hovered ? 1 : 0.85}>
              {/* Wick */}
              <line
                x1={x}
                y1={yHigh}
                x2={x}
                y2={yLow}
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.7"
              />
              {/* Body */}
              <rect
                x={x - bodyW / 2}
                y={bodyTop}
                width={bodyW}
                height={bodyH}
                fill={color}
                rx="1.5"
                opacity={hovered ? 1 : 0.9}
              />
              {/* Volume bar */}
              <rect
                x={volX}
                y={viewSize.height - padding.bottom - (candle.volume / maxVol) * volH}
                width={bodyW}
                height={(candle.volume / maxVol) * volH}
                fill={color}
                opacity={0.18}
                rx="1"
              />

              {/* Hover highlight */}
              {hovered && (
                <>
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={viewSize.height - padding.bottom}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <circle cx={x} cy={yClose} r="4" fill={color} />
                  <circle cx={x} cy={yClose} r="7" fill={color} opacity="0.2" />
                </>
              )}
            </g>
          );
        })}

        {/* Last price line */}
        <line
          x1={padding.left}
          x2={viewSize.width - padding.right}
          y1={yOf(lastClose)}
          y2={yOf(lastClose)}
          stroke={lastColor}
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.5"
        />
        <motion.g
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <rect
            x={viewSize.width - padding.right - 78}
            y={yOf(lastClose) - 11}
            width="78"
            height="22"
            rx="6"
            fill={lastColor}
            opacity="0.18"
          />
          <text
            x={viewSize.width - padding.right - 70}
            y={yOf(lastClose) + 4}
            fill={lastColor}
            fontSize="11"
            fontWeight="600"
            fontFamily="var(--font-mono)"
          >
            {lastClose >= 1000 ? lastClose.toLocaleString(undefined, { maximumFractionDigits: 1 }) : lastClose.toFixed(2)}
          </text>
        </motion.g>

        {/* X labels */}
        <text x={padding.left} y={viewSize.height - 12} fill="rgba(255,255,255,0.3)" fontSize="10">
          09:30
        </text>
        <text x={viewSize.width / 2 - 12} y={viewSize.height - 12} fill="rgba(255,255,255,0.3)" fontSize="10">
          12:00
        </text>
        <text x={viewSize.width - padding.right - 30} y={viewSize.height - 12} fill="rgba(255,255,255,0.3)" fontSize="10">
          16:00
        </text>

        {/* Y labels */}
        <text x="2" y={padding.top + 5} fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="var(--font-mono)">
          {allHigh.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </text>
        <text x="2" y={padding.top + chartH / 2} fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="var(--font-mono)">
          {((allHigh + allLow) / 2).toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </text>
        <text x="2" y={padding.top + chartH + 5} fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="var(--font-mono)">
          {allLow.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </text>
      </svg>

      {/* Tooltip */}
      {hover !== null && hover < candles.length && (
        <div
          className="absolute glass-strong rounded-lg px-3 py-2 text-xs font-mono pointer-events-none z-10"
          style={{
            left: Math.min(Math.max(xOf(hover) - 70, 0), viewSize.width - 160),
            top: 0,
          }}
        >
          <div className="text-muted-light mb-1">O: {candles[hover].open.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
          <div className="text-muted-light">H: {candles[hover].high.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
          <div className="text-muted-light">L: {candles[hover].low.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
          <div className={candles[hover].close >= candles[hover].open ? "text-positive" : "text-negative"}>
            C: {candles[hover].close.toLocaleString(undefined, { maximumFractionDigits: 1 })}
          </div>
        </div>
      )}
    </div>
  );
}
