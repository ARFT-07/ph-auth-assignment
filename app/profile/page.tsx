import Link from "next/link";
import type { Metadata } from "next";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");
  return (
    <div className="mx-auto max-w-md rounded-box border border-base-300 bg-white p-6 text-center shadow-sm sm:p-8">
      <div className="mx-auto mb-3 flex size-20 items-center justify-center overflow-hidden rounded-full bg-primary text-3xl font-bold text-primary-content">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="size-full object-cover" />
        ) : (
          (user.name?.[0]?.toUpperCase() ?? "U")
        )}
      </div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="mb-5 text-base-content/60">{user.email}</p>
      <Link href="/profile/update" className="btn btn-primary">
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
}
