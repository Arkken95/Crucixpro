import { safeFetch } from '../utils/fetch.mjs';

const BASE = 'https://newsapi.org/v2';

async function fetchTopHeadlines(apiKey, language = 'en', pageSize = 20) {
  const url = `${BASE}/top-headlines?language=${language}&pageSize=${pageSize}&apiKey=${apiKey}`;
  return safeFetch(url);
}

export async function briefing() {
  const apiKey = process.env.NEWSAPI_API_KEY || process.env.NEWSAPI_KEY || '';
  if (!apiKey) {
    throw new Error('Missing NEWSAPI_API_KEY');
  }
  const data = await fetchTopHeadlines(apiKey, 'en', 25);
  const articles = data.articles || [];
  return {
    source: 'NEWSAPI',
    timestamp: new Date().toISOString(),
    headlines: articles.map(a => ({
      title: a.title,
      source: a.source?.name,
      url: a.url,
      publishedAt: a.publishedAt,
    })),
  };
}
