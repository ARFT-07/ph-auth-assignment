import { Suspense } from "react";
import Hero from "@/components/Hero";
import ProductGrid, { GridSkeleton } from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { bn } from "@/lib/format";

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-10">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="mb-4 text-base-content/60">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </section>
  );
}

async function Sections() {
  const products = await getProducts();
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Section title={<><span className="text-success">▲</span> আজ দাম বেড়েছে</>}>
        <ProductGrid items={risers} />
      </Section>
      <Section title={<><span className="text-error">▼</span> আজ দাম কমেছে</>}>
        <ProductGrid items={fallers} />
      </Section>
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${bn(products.length)}টি পণ্য দেখানো হচ্ছে`}
      >
        <ProductGrid items={products} />
      </Section>
    </>
  );
}

function SectionsSkeleton() {
  return (
    <>
      {["আজ দাম বেড়েছে ▲", "আজ দাম কমেছে ▼", "সব পণ্য"].map((t) => (
        <section key={t} className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">{t}</h2>
          <GridSkeleton />
        </section>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionsSkeleton />}>
        <Sections />
      </Suspense>
    </>
  );
}
