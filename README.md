# TradeX — Premium Trading Platform

A premium, modern next-generation trading platform website with a clean fintech aesthetic. Dark-first interface, animated candlestick charts, live market data, and polished motion design throughout.

## Live Demo

- **Production:** https://tradex-beryl-eight.vercel.app
- **Repository:** https://github.com/gvishnu006/tradex

## Features

- **Hero** — high-impact section with live market ticker, animated trading chart preview, floating market statistics, and animated counters
- **Trading Terminal Dashboard** — interactive animated candlestick chart with hover tooltips, crosshair, order book, recent trades, buy/sell controls, watchlist, and market sentiment
- **Features** — six feature cards with animated icons and hover interactions
- **AI Trading Section** — AI market assistant visualization with animated insight metrics and AI market summary
- **Portfolio** — animated self-drawing performance chart, asset allocation donut, and holdings with count-up values
- **Live Markets** — filterable table (All / Crypto / Stocks / Forex / Commodities) with sparklines and sorting
- **Security** — trust and safety section with shield animations
- **Pricing** — three tiers with a highlighted recommended plan
- **Testimonials** — premium customer cards
- **Final CTA + Footer** — dramatic minimal closing section with animated market lines and full footer with risk disclaimer
- **Mobile-ready** — bottom navigation, responsive layout, touch-friendly controls

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animations
- **Lucide Icons**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Lint

```bash
npm run build
npm run lint
```

Note: build uses `next build --webpack` for local Windows compatibility.

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Design system, theme tokens, animations
│   ├── layout.tsx         # Root layout & fonts
│   └── page.tsx           # Page assembly
├── components/            # UI sections & shared components
└── lib/
    └── utils.ts           # Data, helpers, market data
```

## Deploy

Deployed to Vercel via the Vercel CLI. Any push to `main` triggers a new production deployment.
