import { redirect } from "next/navigation";
import type { Metadata } from "next";
import SignUpForm from "@/components/SignUpForm";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন আপ" };

export default async function SignUpPage() {
  if (await getSession()) redirect("/");
  return <SignUpForm />;
}
