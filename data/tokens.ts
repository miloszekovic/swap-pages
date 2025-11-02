export interface Token {
  name: string
  ticker: string
  mint: string
}

export interface TokensData {
  [key: string]: Token
}

export const tokensData: TokensData = {
  sol: {
    name: "Solana",
    ticker: "SOL",
    mint: "So11111111111111111111111111111111111111112"
  },
  tsat: {
    name: "Satoshi a BTC Stablecoin",
    ticker: "TSAT",
    mint: "tSATdGGSLYBVCrm3pXiib8NmzKcB1iUdjRRseNGssxu"
  },
  usdc: {
    name: "USD Coin",
    ticker: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  },
  pump: {
    name: "Pump",
    ticker: "PUMP",
    mint: "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn"
  },
  usdt: {
    name: "USDT",
    ticker: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
  },
  jitosol: {
    name: "Jito Staked SOL",
    ticker: "JITOSOL",
    mint: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"
  },
  jlp: {
    name: "Jupiter Perps",
    ticker: "JLP",
    mint: "27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4"
  },
  dzsol: {
    name: "DoubleZero Staked SOL",
    ticker: "DZSOL",
    mint: "Gekfj7SL2fVpTDxJZmeC46cTYxinjB6gkAnb6EGT6mnn"
  },
  "2z": {
    name: "DoubleZero",
    ticker: "2Z",
    mint: "J6pQQ3FAcJQeWPPGppWRb4nM8jU3wLyYbRrLh7feMfvd"
  },
  bnsol: {
    name: "Binance Staked SOL",
    ticker: "BNSOL",
    mint: "BNso1VUJnh4zcfpZa6986Ea66P6TCp59hvtNJ8b1X85"
  }
}
