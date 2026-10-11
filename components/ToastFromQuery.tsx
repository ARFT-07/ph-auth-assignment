"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ToastFromQuery() {
  const params = useSearchParams();
  const shown = useRef(false);
  useEffect(() => {
    if (shown.current) return;
    if (params.get("reason") === "protected") {
      shown.current = true;
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "protected" });
    } else if (params.get("registered") === "1") {
      shown.current = true;
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন", {
        id: "registered",
      });
    }
  }, [params]);
  return null;
}
