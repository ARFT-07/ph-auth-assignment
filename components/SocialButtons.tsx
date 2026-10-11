"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons({ next = "/" }: { next?: string }) {
  async function go(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: next,
    });
    if (error) toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
  }
  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={() => go("google")}
        className="btn btn-outline"
      >
        <span className="font-bold text-[#4285F4]">G</span> Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => go("github")}
        className="btn btn-outline"
      >
        <span aria-hidden>🐙</span> GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
