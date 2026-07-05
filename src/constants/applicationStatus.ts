export const APPLICATION_STATUSES = [
  "submitted",
  "accepted",
  "rejected",
  "cancelled"
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  submitted: "지원 완료",
  accepted: "출역 확정",
  rejected: "미선정",
  cancelled: "지원 취소"
};
