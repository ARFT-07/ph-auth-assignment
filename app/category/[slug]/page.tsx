import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CategoryList from "@/components/CategoryList";
import { GridSkeleton } from "@/components/ProductGrid";
import { getCategories, getProducts } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = (await getCategories().catch(() => [])).find(
    (c) => c.slug === slug,
  );
  return { title: cat?.nameBn ?? "ক্যাটাগরি" };
}

async function Items({ slug }: { slug: string }) {
  const items = await getProducts(slug);
  return <CategoryList items={items} />;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = (await getCategories()).find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <>
      <h1 className="mb-4 flex items-center gap-3 text-3xl font-bold">
        <span className="flex size-12 items-center justify-center rounded-xl bg-base-200 text-3xl">
          {cat.icon}
        </span>
        {cat.nameBn}
      </h1>
      <Suspense
        fallback={
          <>
            <div className="skeleton mb-4 ml-auto h-9 w-48" />
            <GridSkeleton count={6} />
          </>
        }
      >
        <Items slug={slug} />
      </Suspense>
    </>
  );
}
