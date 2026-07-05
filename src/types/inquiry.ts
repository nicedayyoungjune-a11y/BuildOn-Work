import type { UserRole } from "@/constants/userRole";

export type InquiryStatus = "submitted" | "in_progress" | "resolved";

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  userType: UserRole;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
};
