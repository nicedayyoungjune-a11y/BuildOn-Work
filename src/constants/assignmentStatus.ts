export const ASSIGNMENT_STATUSES = [
  "confirmed",
  "completed",
  "cancelled",
  "no_show"
] as const;

export type AssignmentStatus = (typeof ASSIGNMENT_STATUSES)[number];

export const ASSIGNMENT_STATUS_LABELS: Record<AssignmentStatus, string> = {
  confirmed: "출역 확정",
  completed: "근무 완료",
  cancelled: "출역 취소",
  no_show: "미출근"
};
