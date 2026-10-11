import Link from "next/link";

export default function EmptyState({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।",
  code = "৪০৪",
}: {
  title?: string;
  message?: string;
  code?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-20 text-center">
      <div className="text-6xl">🧺</div>
      <p className="text-5xl font-extrabold text-primary">{code}</p>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-2">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
