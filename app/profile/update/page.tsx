import type { Metadata } from "next";
import UpdateForm from "@/components/UpdateForm";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default async function UpdatePage() {
  const { user } = await requireSession("/profile/update");
  return <UpdateForm name={user.name} />;
}
