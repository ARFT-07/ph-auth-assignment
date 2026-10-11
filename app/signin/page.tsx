import { Suspense } from "react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import SignInForm from "@/components/SignInForm";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন ইন" };

export default async function SignInPage() {
  if (await getSession()) redirect("/");
  return (
    <Suspense fallback={<div className="skeleton mx-auto h-96 max-w-md" />}>
      <SignInForm />
    </Suspense>
  );
}
