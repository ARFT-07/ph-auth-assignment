const nf = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 });
const pf = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const bn = (n: number) => nf.format(n);
export const price = (n: number) => `${nf.format(n)} টাকা`;

export const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitLabel = (u: string) => `প্রতি ${UNIT_BN[u] ?? u}`;

export type Dir = "up" | "down" | "flat";

export function changeText(dir: Dir, pct: number) {
  const v = pf.format(Math.abs(pct));
  if (dir === "up") return `▲ ${v}%`;
  if (dir === "down") return `▼ ${v}%`;
  return `— ${pf.format(0)}%`;
}

export function bnDate(d = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(d);
}
