import { safeFetch } from '../utils/fetch.mjs';

import { safeFetch } from '../utils/fetch.mjs';
const BASE = 'https://api.binance.com/api/v3';

export async function getMarketData(symbol = 'BTCUSDT') {
  const price = await safeFetch(`${BASE}/ticker/price?symbol=${symbol}`);
  const stats = await safeFetch(`${BASE}/ticker/24hr?symbol=${symbol}`);

  return {
    source: 'BINANCE',
    type: 'market',
    timestamp: new Date().toISOString(),
    symbol,
    price: parseFloat(price.price),
    volume: parseFloat(stats.volume),
    changePercent: parseFloat(stats.priceChangePercent),
  };
}

export async function briefing() {
  const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];

  const data = await Promise.all(symbols.map(getMarketData));

  const bullish = data.filter(d => d.changePercent > 2);
  const bearish = data.filter(d => d.changePercent < -2);

  return {
    source: 'BINANCE',
    timestamp: new Date().toISOString(),
    allMarkets: data,
    bullish,
    bearish,
    highVolume: data.filter(d => d.volume > 100000),
  };
}
