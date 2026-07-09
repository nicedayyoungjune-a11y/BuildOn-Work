type StatusBadgeTone = "blue" | "green" | "slate" | "red" | "amber";

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: StatusBadgeTone;
};

const statusLabels: Record<string, string> = {
  open: "모집 중",
  closed: "마감",
  cancelled: "취소",
  submitted: "지원 완료",
  accepted: "출근 확정",
  rejected: "마감",
  confirmed: "출근 확정",
  completed: "근무 완료",
  no_show: "미출근",
  pending: "확인 전",
  checked_in: "출근 완료",
  absent: "미출근",
  received: "접수 완료",
  in_review: "확인 중",
  planned: "처리 예정",
  answered: "답변 완료"
};

const toneClassNames: Record<StatusBadgeTone, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  slate: "bg-slate-50 text-slate-700 border-slate-200",
  red: "bg-red-50 text-red-700 border-red-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100"
};

export function StatusBadge({ children, tone = "blue" }: StatusBadgeProps) {
  const label = typeof children === "string" ? statusLabels[children] ?? children : children;

  return (
    <span
      className={`inline-flex min-h-7 items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-bold leading-none ${toneClassNames[tone]}`}
    >
      {label}
    </span>
  );
}
