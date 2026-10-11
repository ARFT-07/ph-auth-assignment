"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // keep the form disabled until hydrated so it can never fall back to a native GET submit
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    const confirm = String(f.get("confirm") ?? "");
    let m = "";
    if (!name) m = "আপনার নাম দিন";
    else if (!/^\S+@\S+\.\S+$/.test(email)) m = "সঠিক ইমেইল দিন";
    else if (password.length < 8) m = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    else if (password !== confirm) m = "দুটি পাসওয়ার্ড মিলছে না";
    if (m) {
      setError(m);
      toast.error(m);
      return;
    }
    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (error) {
      const msg =
        error.message ||
        `রেজিস্ট্রেশন করা যায়নি (${error.status ?? "?"} ${error.statusText ?? ""}) — টার্মিনালের এরর দেখুন`;
      setError(msg);
      toast.error(msg);
      return;
    }
    router.push("/signin?registered=1");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-box border border-base-300 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="mb-1 text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-5 text-sm text-base-content/60">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="যেমন: রহিম উদ্দিন"
            className="input w-full"
          />
        </label>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input w-full"
          />
        </label>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input w-full"
          />
        </label>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
          <input
            name="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="আবার লিখুন"
            className="input w-full"
          />
        </label>
        {error && (
          <p role="alert" className="text-sm font-medium text-error">
            {error}
          </p>
        )}
        <button disabled={loading || !ready} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>
      <div className="divider text-xs">অথবা</div>
      <SocialButtons />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-primary">
          সাইন ইন করুন
        </Link>
      </p>
      <p className="mt-3 text-center text-sm">
        <Link href="/" className="text-base-content/60 hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
