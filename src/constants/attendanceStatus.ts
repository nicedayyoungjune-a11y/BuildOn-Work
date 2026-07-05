export const ATTENDANCE_STATUSES = [
  "pending",
  "checked_in",
  "completed",
  "absent"
] as const;

export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];

export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  pending: "출근 예정",
  checked_in: "출근 확인",
  completed: "근무 완료",
  absent: "결근"
};
