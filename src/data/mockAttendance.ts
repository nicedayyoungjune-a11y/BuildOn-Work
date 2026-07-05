import type { AttendanceRecord } from "@/types/attendance";

export const mockAttendance: AttendanceRecord[] = [
  {
    id: "attendance-001",
    assignmentId: "assignment-001",
    jobPostId: "job-002",
    workerId: "worker-002",
    status: "pending",
    checkedInAt: null,
    completedAt: null,
    createdAt: "2026-07-03T10:00:00.000Z",
    updatedAt: "2026-07-03T10:00:00.000Z"
  },
  {
    id: "attendance-002",
    assignmentId: "assignment-002",
    jobPostId: "job-003",
    workerId: "worker-003",
    status: "completed",
    checkedInAt: "2026-07-04T08:20:00.000Z",
    completedAt: "2026-07-04T17:40:00.000Z",
    createdAt: "2026-07-03T10:10:00.000Z",
    updatedAt: "2026-07-04T17:40:00.000Z"
  },
  {
    id: "attendance-003",
    assignmentId: "assignment-003",
    jobPostId: "job-001",
    workerId: "worker-001",
    status: "absent",
    checkedInAt: null,
    completedAt: null,
    createdAt: "2026-07-03T10:30:00.000Z",
    updatedAt: "2026-07-04T09:00:00.000Z"
  },
  {
    id: "attendance-004",
    assignmentId: "assignment-001",
    jobPostId: "job-002",
    workerId: "worker-002",
    status: "checked_in",
    checkedInAt: "2026-07-05T07:25:00.000Z",
    completedAt: null,
    createdAt: "2026-07-05T07:25:00.000Z",
    updatedAt: "2026-07-05T07:25:00.000Z"
  }
];
