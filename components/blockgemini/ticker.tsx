"use client";

import { useEffect, useState } from "react";

interface TickerItem {
  symbol: string;
  price: string;
  change: number;
}

interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

const COIN_MAP: { [key: string]: string } = {
  bitcoin: "BTC",
  ethereum: "ETH",
  "pi-network": "PI",
  solana: "SOL",
};

const BASE_PRICES: TickerItem[] = [
  { symbol: "BTC", price: "67,842", change: 2.34 },
  { symbol: "ETH", price: "3,521", change: -1.12 },
  { symbol: "PI", price: "0.842", change: 5.67 },
  { symbol: "SOL", price: "185.3", change: 3.21 },
];

async function fetchCryptoprices(): Promise<TickerItem[]> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,pi-network,solana&vs_currencies=usd&include_24hr_change=true"
    );

    if (!response.ok) throw new Error("Failed to fetch prices");

    const data: CoinGeckoResponse = await response.json();

    const prices: TickerItem[] = [];

    for (const [coinId, symbol] of Object.entries(COIN_MAP)) {
      if (data[coinId]) {
        const priceUsd = data[coinId].usd;
        const change = data[coinId].usd_24h_change;

        prices.push({
          symbol,
          price:
            priceUsd >= 1
              ? priceUsd.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : priceUsd.toFixed(3),
          change: parseFloat(change.toFixed(2)),
        });
      }
    }

    return prices.length > 0 ? prices : BASE_PRICES;
  } catch (error) {
    console.error("[v0] Error fetching crypto prices:", error);
    return BASE_PRICES;
  }
}

function TickerItem({ item }: { item: TickerItem }) {
  const isPositive = item.change >= 0;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 whitespace-nowrap select-none">
      <span className="text-white font-bold text-[11px]">{item.symbol}</span>
      <span className="text-gray-400 text-[11px]">${item.price}</span>
      <span
        className="text-[11px] font-semibold"
        style={{ color: isPositive ? "#22c55e" : "#ef4444" }}
      >
        {isPositive ? "+" : ""}
        {item.change.toFixed(2)}%
      </span>
      <span className="text-gray-700 text-xs ml-1">•</span>
    </span>
  );
}

export function Ticker() {
  const [prices, setPrices] = useState<TickerItem[]>(BASE_PRICES);

  useEffect(() => {
    // Fetch prices immediately on mount
    fetchCryptoprices().then(setPrices);

    // Set up auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchCryptoprices().then(setPrices);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const doubled = [...prices, ...prices];

  return (
    <div
      className="overflow-hidden border-b"
      style={{ backgroundColor: "#060d1f", borderColor: "#1e293b" }}
      aria-label="Live crypto prices"
    >
      <div className="ticker-track py-2">
        {doubled.map((item, i) => (
          <TickerItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
