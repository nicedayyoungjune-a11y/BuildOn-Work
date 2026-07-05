export const JOB_STATUSES = ["draft", "open", "closed", "cancelled"] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  draft: "작성 중",
  open: "모집 중",
  closed: "마감",
  cancelled: "취소"
};
