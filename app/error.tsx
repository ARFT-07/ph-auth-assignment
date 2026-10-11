"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-20 text-center">
      <div className="text-6xl">⚠️</div>
      <h1 className="text-2xl font-bold">ডেটা লোড করা যায়নি</h1>
      <p className="text-base-content/70">
        সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।
      </p>
      <button onClick={reset} className="btn btn-primary mt-2">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
