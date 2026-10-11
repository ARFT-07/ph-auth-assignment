import { getProducts } from "@/lib/api";
import { price, unitLabel, changeText } from "@/lib/format";

export default async function Ticker() {
  let items: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    items = await getProducts();
  } catch {
    return null;
  }
  if (!items.length) return null;

  const row = items.map((p) => (
    <span
      key={p.id}
      className="inline-flex items-center gap-2 px-5 text-sm whitespace-nowrap"
    >
      <span>{p.image}</span>
      <span className="font-semibold">{p.nameBn}</span>
      <span className="text-base-content/70">
        {price(p.today)}/{unitLabel(p.unit).replace("প্রতি ", "")}
      </span>
      <span
        className={
          p.change.dir === "up"
            ? "font-semibold text-success"
            : p.change.dir === "down"
              ? "font-semibold text-error"
              : "text-base-content/50"
        }
      >
        {changeText(p.change.dir, p.change.pct)}
      </span>
    </span>
  ));

  return (
    <div
      className="ticker overflow-hidden border-b border-base-300 bg-base-200 py-2"
      aria-label="আজকের দামের তালিকা"
    >
      <div className="ticker-track flex w-max">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}

export function TickerSkeleton() {
  return <div className="skeleton h-10 w-full rounded-none" />;
}
