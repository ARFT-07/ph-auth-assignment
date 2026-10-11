export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(10000),
      });
      if (res.status === 404) throw new NotFoundError(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    } catch (e) {
      if (e instanceof NotFoundError) throw e;
      lastError = e;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("API unavailable");
}

export class NotFoundError extends Error {}

export async function getProducts(category?: string): Promise<Product[]> {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  const data = await get<Product[] | { data: Product[] }>(`/products${q}`);
  return Array.isArray(data) ? data : data.data;
}

export async function getCategories(): Promise<Category[]> {
  const data = await get<Category[] | { data: Category[] }>("/categories");
  return Array.isArray(data) ? data : data.data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug || String(p.id) === slug) ?? null;
}

export function stats(p: Product) {
  const mins = p.markets.map((m) => m.min);
  const maxs = p.markets.map((m) => m.max);
  const avg =
    p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
    Math.max(p.markets.length, 1);
  return {
    min: Math.min(...mins),
    max: Math.max(...maxs),
    avg: Math.round(avg),
  };
}
