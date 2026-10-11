import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ChangeBadge from "@/components/ChangeBadge";
import { getProductBySlug, stats } from "@/lib/api";
import { avgText, price, UNIT_BN, unitLabel } from "@/lib/format";
import { requireSession } from "@/lib/session";

type Props = { params: Promise<{ slug: string }> };

export const metadata: Metadata = { title: "পণ্যের বিস্তারিত" };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  await requireSession(`/product/${slug}`);

  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const s = stats(p);
  const diff = p.today - p.yesterday;

  // every market with its own average, cheapest first (as in the design)
  const rows = p.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  return (
    <article className="space-y-8">
      <nav className="text-sm text-base-content/60" aria-label="breadcrumb">
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>{" "}
        ›{" "}
        <Link href={`/category/${p.category}`} className="hover:text-primary">
          {p.categoryNameBn}
        </Link>{" "}
        › <span className="text-base-content">{p.nameBn}</span>
      </nav>

      <header className="flex flex-col gap-5 rounded-box border border-base-300 bg-white p-6 sm:flex-row sm:items-center">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-5xl">
          {p.image}
        </div>
        <div className="flex-1 space-y-1">
          <h1 className="text-3xl font-bold">{p.nameBn}</h1>
          <p className="text-sm text-base-content/60">
            {unitLabel(p.unit)} · {p.categoryNameBn}
          </p>
          <p className="text-sm">
            {diff === 0 ? (
              "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
            ) : (
              <>
                গতকালের তুলনায় আজ দাম{" "}
                <strong>{diff > 0 ? "বেড়েছে" : "কমেছে"}</strong> ·{" "}
                {price(Math.abs(diff))}
              </>
            )}
          </p>
        </div>
        <div className="rounded-box bg-base-200 px-6 py-4 text-center">
          <p className="text-sm text-base-content/60">আজকের দাম</p>
          <p className="text-3xl font-extrabold">{price(p.today).replace(" টাকা", "")}</p>
          <p className="text-sm text-base-content/60">
            টাকা / {UNIT_BN[p.unit] ?? p.unit}
          </p>
          <ChangeBadge dir={p.change.dir} pct={p.change.pct} />
        </div>
      </header>

      <section className="rounded-box border border-base-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "সর্বনিম্ন দাম", v: s.min, note: "সবচেয়ে কম দামের বাজার", c: "text-success" },
            { label: "সর্বাধিক দাম", v: s.max, note: "সবচেয়ে বেশি দামের বাজার", c: "text-error" },
            {
              label: "গড় দাম",
              v: s.avg,
              note: `${unitLabel(p.unit)}-এর হিসাবে`,
              c: "text-success",
            },
          ].map((x) => (
            <div
              key={x.label}
              className="rounded-box border border-base-300 bg-base-100 p-5"
            >
              <p className="text-sm text-base-content/60">{x.label}</p>
              <p className="text-2xl font-bold">
                <span className={x.c}>{avgText(x.v)}</span>{" "}
                <span className="text-base font-medium text-base-content/70">টাকা</span>
              </p>
              <p className="text-xs text-base-content/50">{x.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-box border border-base-300 bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead className="bg-base-200 text-base-content/70">
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বাধিক</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.market} className="hover:bg-base-200/50">
                  <td className="whitespace-nowrap">{m.market}</td>
                  <td className="whitespace-nowrap text-base-content/70">{m.division}</td>
                  <td className="whitespace-nowrap text-right">{price(m.min)}</td>
                  <td className="whitespace-nowrap text-right">{price(m.max)}</td>
                  <td className="whitespace-nowrap text-right font-bold">
                    {avgText(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
