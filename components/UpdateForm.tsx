"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateForm({ name }: { name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newName = String(new FormData(e.currentTarget).get("name") ?? "").trim();
    if (!newName) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }
    setLoading(true);
    const { error } = await authClient.updateUser({ name: newName });
    setLoading(false);
    if (error) {
      toast.error(error.message || "আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md rounded-box border border-base-300 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="mb-5 text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input name="name" defaultValue={name} className="input w-full" />
        </label>
        <button disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          তথ্য আপডেট করুন
        </button>
      </form>
    </div>
  );
}
