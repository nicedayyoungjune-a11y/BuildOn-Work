export const JOB_CATEGORIES = [
  "general_labor",
  "formwork",
  "rebar",
  "masonry",
  "plastering",
  "painting",
  "equipment",
  "electrical"
] as const;

export type JobCategory = (typeof JOB_CATEGORIES)[number];

export const JOB_CATEGORY_LABELS: Record<JobCategory, string> = {
  general_labor: "보통인부",
  formwork: "형틀",
  rebar: "철근",
  masonry: "조적",
  plastering: "미장",
  painting: "도장",
  equipment: "설비",
  electrical: "전기"
};
