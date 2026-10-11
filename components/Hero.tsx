const TILES = ["🍚", "🫘", "🛢️", "🥔", "🧅", "🌶️", "🐟", "🍗", "🥚"];

export default function Hero() {
  return (
    <section className="grid items-center gap-8 rounded-box bg-base-200 px-6 py-10 md:grid-cols-2 md:px-10 md:py-14">
      <div className="space-y-4">
        <p className="text-sm font-semibold tracking-wide text-primary">
          প্রতিদিনের বাজারদর
        </p>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">
          প্রয়োজনীয় পণ্যের দাম,{" "}
          <span className="text-primary">এক নজরে</span>
        </h1>
        <p className="max-w-md text-base-content/70">
          চাল, ডাল, তেল, সবজি, মাছ-মাংস ও মসলার আজকের দাম দেখুন এবং গতকালের তুলনায়
          কোন পণ্যের দাম বাড়ল বা কমল জানুন — দেশের বিভিন্ন বাজারের তথ্যসহ।
        </p>
        <a href="#সব-পণ্য" className="btn btn-primary">
          সব পণ্যের দাম দেখুন ↓
        </a>
      </div>
      <div
        className="mx-auto grid w-full max-w-sm grid-cols-3 gap-3"
        aria-hidden="true"
      >
        {TILES.map((e, i) => (
          <div
            key={e}
            className={`flex aspect-square items-center justify-center rounded-2xl bg-white text-4xl shadow-sm sm:text-5xl ${
              i % 2 ? "translate-y-3" : ""
            }`}
          >
            {e}
          </div>
        ))}
      </div>
    </section>
  );
}
