import Link from "next/link";
import type { Metadata } from "next";
import SignOutButton from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-base-content/60">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-box border border-base-300 bg-white p-5">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-2xl font-bold text-primary-content">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="size-full object-cover" />
          ) : (
            (user.name?.[0]?.toUpperCase() ?? "U")
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl font-bold">{user.name}</p>
          <p className="truncate text-base-content/60">{user.email}</p>
        </div>
        <SignOutButton />
      </div>

      <div className="rounded-box border border-base-300 bg-white p-5">
        <h2 className="mb-4 text-lg font-bold">তথ্য</h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-base-content/60">নাম</dt>
            <dd className="mt-1 rounded-field border border-base-300 bg-base-100 px-3 py-2">
              {user.name}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-base-content/60">ইমেইল</dt>
            <dd className="mt-1 truncate rounded-field border border-base-300 bg-base-100 px-3 py-2 text-base-content/70">
              {user.email}
            </dd>
          </div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary mt-5">
          আপডেট
        </Link>
      </div>
    </div>
  );
}
