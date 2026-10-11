import type { Product } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="লোড হচ্ছে…"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 rounded-box border border-base-300 bg-white p-4"
        >
          <div className="skeleton size-16 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-2/3" />
            <div className="skeleton h-3 w-1/3" />
            <div className="skeleton mt-3 h-6 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
