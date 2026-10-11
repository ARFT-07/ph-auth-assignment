"use client";

import { useEffect, useState } from "react";
import { bnDate } from "@/lib/format";

/** Today's date in Bangla; computed on the client so a cached page never shows a stale day. */
export default function BnDate({ className }: { className?: string }) {
  const [d, setD] = useState("");
  useEffect(() => setD(bnDate()), []);
  return <span className={className}>{d}</span>;
}
