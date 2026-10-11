"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";
import ToastFromQuery from "./ToastFromQuery";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("next") ?? "/";
  const next = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") ?? "").trim();
    const password = String(f.get("password") ?? "");
    if (!email || !password) {
      const m = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(m);
      toast.error(m);
      return;
    }
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      const m = "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(m);
      toast.error(m);
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(next);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-box border border-base-300 bg-white p-6 shadow-sm sm:p-8">
      <ToastFromQuery />
      <h1 className="mb-1 text-2xl font-bold">সাইন ইন</h1>
      <p className="mb-5 text-sm text-base-content/60">
        আপনার অ্যাকাউন্টে প্রবেশ করুন
      </p>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
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
            autoComplete="current-password"
            placeholder="••••••"
            className="input w-full"
          />
        </label>
        {error && (
          <p role="alert" className="text-sm font-medium text-error">
            {error}
          </p>
        )}
        <button disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          সাইন ইন
        </button>
      </form>
      <div className="divider text-xs">অথবা</div>
      <SocialButtons next={next} />
      <p className="mt-5 text-center text-sm">
        নতুন ব্যবহারকারী?{" "}
        <Link href="/signup" className="font-semibold text-primary">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}
