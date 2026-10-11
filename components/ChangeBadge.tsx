import { changeText, type Dir } from "@/lib/format";

const style: Record<Dir, string> = {
  up: "bg-success/15 text-success",
  down: "bg-error/15 text-error",
  flat: "bg-base-300 text-base-content/60",
};

export default function ChangeBadge({ dir, pct }: { dir: Dir; pct: number }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${style[dir]}`}
    >
      {changeText(dir, pct)}
    </span>
  );
}
