# Swap Pages - Solflare Technical Test

Nuxt 3 application for displaying Solana token swap information with real-time pricing.

## Features
- Dynamic routing for token pairs (`/swap/{token1}/{token2}`)
- Server-side rendering with 1-minute caching
- Real-time token prices from Solflare Wallet API
- Conversion tables
- SEO optimized
- Responsive design

## Tech Stack
- Nuxt 3
- TypeScript
- Tailwind CSS
- Solflare Wallet API

## Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Example Routes
- `/swap/sol/usdc`
- `/swap/sol/pump`
- `/swap/usdt/usdc`

## API
Token data is fetched from: `https://wallet-api.solflare.com/v2/portfolio/token/{mint}/full-info`
