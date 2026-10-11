import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ChangeBadge from "@/components/ChangeBadge";
import { getProductBySlug, stats } from "@/lib/api";
import { price, unitLabel } from "@/lib/format";
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
  const summary = `${p.nameBn} — আজকের গড় বাজারদর ${price(s.avg)} (${unitLabel(p.unit)})। ${
    diff === 0
      ? "গতকালের তুলনায় দাম অপরিবর্তিত আছে।"
      : `গতকালের তুলনায় ${price(Math.abs(diff))} ${diff > 0 ? "বেড়েছে" : "কমেছে"}।`
  }`;

  const byDivision = p.markets.reduce<Record<string, typeof p.markets>>(
    (acc, m) => {
      (acc[m.division] ??= []).push(m);
      return acc;
    },
    {},
  );

  const history = [
    { label: "গতকাল", v: p.yesterday },
    { label: "গত সপ্তাহ", v: p.lastWeek },
    { label: "গত মাস", v: p.lastMonth },
  ];

  return (
    <article className="space-y-8">
      <nav className="text-sm text-base-content/60" aria-label="breadcrumb">
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>{" "}
        /{" "}
        <Link
          href={`/category/${p.category}`}
          className="hover:text-primary"
        >
          {p.categoryNameBn}
        </Link>{" "}
        / <span className="text-base-content">{p.nameBn}</span>
      </nav>

      <header className="flex flex-col gap-5 rounded-box border border-base-300 bg-white p-6 sm:flex-row sm:items-center">
        <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-6xl">
          {p.image}
        </div>
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold">{p.nameBn}</h1>
          <p className="text-base-content/70">{summary}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/category/${p.category}`}
              className="badge badge-primary badge-soft"
            >
              {p.categoryIcon} {p.categoryNameBn}
            </Link>
            <span className="badge badge-ghost">{unitLabel(p.unit)}</span>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-base-content/60">আজকের দাম</p>
          <p className="text-3xl font-extrabold text-primary">
            {price(p.today)}
          </p>
          <ChangeBadge dir={p.change.dir} pct={p.change.pct} />
        </div>
      </header>

      <section>
        <h2 className="mb-3 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "সর্বনিম্ন দাম", v: s.min, c: "text-success" },
            { label: "সর্বোচ্চ দাম", v: s.max, c: "text-error" },
            { label: "গড় দাম", v: s.avg, c: "text-primary" },
          ].map((x) => (
            <div
              key={x.label}
              className="rounded-box border border-base-300 bg-white p-5"
            >
              <p className="text-sm text-base-content/60">{x.label}</p>
              <p className={`text-2xl font-bold ${x.c}`}>{price(x.v)}</p>
              <p className="text-xs text-base-content/50">{unitLabel(p.unit)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          {history.map((h) => (
            <div key={h.label} className="rounded-box bg-base-200 p-3">
              <p className="text-base-content/60">{h.label}</p>
              <p className="font-semibold">{price(h.v)}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(byDivision).map(([division, markets]) => (
            <div
              key={division}
              className="overflow-hidden rounded-box border border-base-300 bg-white"
            >
              <h3 className="border-b border-base-300 bg-base-200 px-4 py-2 font-bold">
                📍 {division}
              </h3>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>বাজার</th>
                    <th className="text-right">সর্বনিম্ন</th>
                    <th className="text-right">সর্বোচ্চ</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((m) => (
                    <tr key={m.market}>
                      <td>{m.market}</td>
                      <td className="text-right font-medium text-success">
                        {price(m.min)}
                      </td>
                      <td className="text-right font-medium text-error">
                        {price(m.max)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
