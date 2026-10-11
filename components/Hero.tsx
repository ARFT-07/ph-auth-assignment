import BnDate from "./BnDate";

export default function Hero() {
  return (
    <section className="grid items-center gap-8 rounded-box bg-base-200 px-6 py-10 md:grid-cols-2 md:px-10 md:py-12">
      <div className="space-y-4">
        <p className="min-h-5 text-sm font-semibold text-primary">
          <BnDate />
        </p>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">
          আজকের বাজারের দাম <span className="whitespace-nowrap text-primary">এক নজরে</span>
        </h1>
        <p className="max-w-md text-base-content/70">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="btn btn-primary">
          সব পণ্য দেখুন
        </a>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bazar-hero.png"
        alt="বাজারের তাজা পণ্য"
        className="mx-auto h-auto w-full max-w-md object-contain"
      />
    </section>
  );
}
