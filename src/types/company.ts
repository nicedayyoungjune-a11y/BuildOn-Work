import type { Region } from "@/constants/region";

export type CompanyProfile = {
  id: string;
  userId: string;
  companyName: string;
  contactName: string;
  phone: string;
  regions: Region[];
  createdAt: string;
  updatedAt: string;
};
