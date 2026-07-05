import type { AssignmentStatus } from "@/constants/assignmentStatus";

export type Assignment = {
  id: string;
  jobPostId: string;
  workerId: string;
  applicationId: string;
  status: AssignmentStatus;
  confirmedAt: string;
  createdAt: string;
  updatedAt: string;
};
