export const USER_ROLES = ["worker", "company", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  worker: "근로자",
  company: "건설사",
  admin: "관리자"
};
