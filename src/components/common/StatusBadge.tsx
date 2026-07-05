type StatusBadgeTone = "blue" | "green" | "slate" | "red" | "amber";

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: StatusBadgeTone;
};

const toneClassNames: Record<StatusBadgeTone, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
  red: "bg-red-50 text-red-700 border-red-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100"
};

export function StatusBadge({ children, tone = "blue" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex min-h-7 items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-bold ${toneClassNames[tone]}`}
    >
      {children}
    </span>
  );
}
