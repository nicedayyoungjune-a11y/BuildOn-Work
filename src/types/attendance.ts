import type { AttendanceStatus } from "@/constants/attendanceStatus";

export type AttendanceRecord = {
  id: string;
  assignmentId: string;
  jobPostId: string;
  workerId: string;
  status: AttendanceStatus;
  checkedInAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
