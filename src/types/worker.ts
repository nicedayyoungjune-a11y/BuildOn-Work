import type { JobCategory } from "@/constants/jobCategory";
import type { PaymentOption } from "@/constants/paymentOption";
import type { Region } from "@/constants/region";

export type WorkerProfile = {
  id: string;
  userId: string;
  name: string;
  phone: string;
  jobCategories: JobCategory[];
  preferredRegions: Region[];
  preferredPaymentOption: PaymentOption;
  experienceYears: number;
  createdAt: string;
  updatedAt: string;
};
