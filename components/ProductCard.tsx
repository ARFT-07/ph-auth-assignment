import Link from "next/link";
import type { Product } from "@/lib/api";
import { price, unitLabel } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex gap-4 rounded-box border border-base-300 bg-white p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-base-200 text-4xl">
        {p.image}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-bold leading-snug group-hover:text-primary">
          {p.nameBn}
        </h3>
        <p className="text-sm text-base-content/60">{unitLabel(p.unit)}</p>
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-base-300 pt-2">
          <div className="text-xs text-base-content/60">
            আজকের দাম
            <div className="text-base font-bold text-base-content">
              {price(p.today)}
            </div>
          </div>
          <ChangeBadge dir={p.change.dir} pct={p.change.pct} />
        </div>
      </div>
    </Link>
  );
}
