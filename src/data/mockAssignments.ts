import type { Assignment } from "@/types/assignment";

export const mockAssignments: Assignment[] = [
  {
    id: "assignment-001",
    jobPostId: "job-002",
    workerId: "worker-002",
    applicationId: "application-002",
    status: "confirmed",
    confirmedAt: "2026-07-03T10:00:00.000Z",
    createdAt: "2026-07-03T10:00:00.000Z",
    updatedAt: "2026-07-03T10:00:00.000Z"
  },
  {
    id: "assignment-002",
    jobPostId: "job-003",
    workerId: "worker-003",
    applicationId: "application-003",
    status: "completed",
    confirmedAt: "2026-07-03T10:10:00.000Z",
    createdAt: "2026-07-03T10:10:00.000Z",
    updatedAt: "2026-07-04T18:00:00.000Z"
  },
  {
    id: "assignment-003",
    jobPostId: "job-001",
    workerId: "worker-001",
    applicationId: "application-001",
    status: "no_show",
    confirmedAt: "2026-07-03T10:30:00.000Z",
    createdAt: "2026-07-03T10:30:00.000Z",
    updatedAt: "2026-07-04T09:00:00.000Z"
  }
];
