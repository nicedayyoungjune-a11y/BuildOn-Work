import type { ApplicationStatus } from "@/constants/applicationStatus";

export type JobApplication = {
  id: string;
  jobPostId: string;
  workerId: string;
  status: ApplicationStatus;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
};
