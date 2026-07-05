import type { UserRole } from "@/constants/userRole";

export type { UserRole };

export type BaseUser = {
  id: string;
  role: UserRole;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};
