"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import BnDate from "./BnDate";
import type { Category } from "@/lib/api";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
        },
      },
    });
  }

  const linkCls = (active: boolean) =>
    `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-primary text-primary-content"
        : "text-base-content/80 hover:bg-base-200"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="flex items-center gap-2 text-xl font-bold text-primary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon.png" alt="" className="size-8 object-contain" />
            বাজার দর
          </span>
          <BnDate className="min-h-4 text-xs text-base-content/60" />
        </Link>

        <nav
          aria-label="ক্যাটাগরি"
          className="order-3 -mx-4 flex w-[calc(100%+2rem)] gap-1 overflow-x-auto px-4 pb-1 md:order-none md:mx-0 md:w-auto md:flex-1 md:justify-center md:overflow-visible md:px-0 md:pb-0"
        >
          <Link href="/" className={linkCls(pathname === "/")}>
            সব
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className={linkCls(pathname === `/category/${c.slug}`)}
              aria-current={
                pathname === `/category/${c.slug}` ? "page" : undefined
              }
            >
              {c.nameBn}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-9 w-28" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-sm gap-2 sm:btn-md"
                aria-label="প্রোফাইল মেনু"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                  {session.user.name?.[0]?.toUpperCase() ?? "U"}
                </span>
                <span className="hidden max-w-28 truncate sm:inline">
                  {session.user.name}
                </span>
                <span className="text-xs" aria-hidden>▾</span>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-2 w-48 rounded-box border border-base-300 bg-white p-2 shadow"
              >
                <li>
                  <Link href="/profile">আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={signOut}>সাইন আউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
