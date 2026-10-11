"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import ProductGrid from "./ProductGrid";
import EmptyState from "./EmptyState";

type Sort = "default" | "asc" | "desc";

export default function CategoryList({ items }: { items: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  const sorted = useMemo(() => {
    // sort on the numeric `today` value, never on the formatted Bengali string
    if (sort === "asc") return [...items].sort((a, b) => a.today - b.today);
    if (sort === "desc") return [...items].sort((a, b) => b.today - a.today);
    return items;
  }, [items, sort]);

  if (!items.length) {
    return (
      <EmptyState
        code="০"
        title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
        message="অন্য ক্যাটাগরি দেখুন বা হোম পেজে ফিরে যান।"
      />
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm font-medium">
          সাজান:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="select select-sm w-auto sm:select-md"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <ProductGrid items={sorted} />
    </>
  );
}
