import type { JobCategory } from "@/constants/jobCategory";
import type { JobStatus } from "@/constants/jobStatus";
import type { PaymentOption } from "@/constants/paymentOption";
import type { Region } from "@/constants/region";

export type JobPost = {
  id: string;
  siteId: string;
  companyId: string;
  title: string;
  category: JobCategory;
  region: Region;
  workDate: string;
  startTime: string;
  endTime: string;
  dailyWage: number;
  requiredWorkers: number;
  paymentOption: PaymentOption;
  status: JobStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
};
