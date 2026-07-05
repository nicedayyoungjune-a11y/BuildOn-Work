import type { Region } from "@/constants/region";

export type Site = {
  id: string;
  companyId: string;
  name: string;
  region: Region;
  address: string;
  managerName: string;
  managerPhone: string;
  createdAt: string;
  updatedAt: string;
};
