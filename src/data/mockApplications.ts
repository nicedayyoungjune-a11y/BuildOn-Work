import type { JobApplication } from "@/types/application";

export const mockApplications: JobApplication[] = [
  {
    id: "application-001",
    jobPostId: "job-001",
    workerId: "worker-001",
    status: "submitted",
    appliedAt: "2026-07-03T09:00:00.000Z",
    createdAt: "2026-07-03T09:00:00.000Z",
    updatedAt: "2026-07-03T09:00:00.000Z"
  },
  {
    id: "application-002",
    jobPostId: "job-002",
    workerId: "worker-002",
    status: "accepted",
    appliedAt: "2026-07-03T09:10:00.000Z",
    createdAt: "2026-07-03T09:10:00.000Z",
    updatedAt: "2026-07-03T10:00:00.000Z"
  },
  {
    id: "application-003",
    jobPostId: "job-003",
    workerId: "worker-003",
    status: "accepted",
    appliedAt: "2026-07-03T09:20:00.000Z",
    createdAt: "2026-07-03T09:20:00.000Z",
    updatedAt: "2026-07-03T10:10:00.000Z"
  },
  {
    id: "application-004",
    jobPostId: "job-001",
    workerId: "worker-002",
    status: "rejected",
    appliedAt: "2026-07-03T09:30:00.000Z",
    createdAt: "2026-07-03T09:30:00.000Z",
    updatedAt: "2026-07-03T10:20:00.000Z"
  }
];
