import type { WorkerProfile } from "@/types/worker";

export const mockWorkers: WorkerProfile[] = [
  {
    id: "worker-001",
    userId: "user-worker-001",
    name: "김민수",
    phone: "010-1000-0001",
    jobCategories: ["general_labor"],
    preferredRegions: ["gyeonggi_suwon", "gyeonggi_hwaseong"],
    preferredPaymentOption: "same_day",
    experienceYears: 2,
    createdAt: "2026-07-01T09:00:00.000Z",
    updatedAt: "2026-07-01T09:00:00.000Z"
  },
  {
    id: "worker-002",
    userId: "user-worker-002",
    name: "박철호",
    phone: "010-1000-0002",
    jobCategories: ["rebar"],
    preferredRegions: ["gyeonggi_pyeongtaek", "chungcheong_cheonan"],
    preferredPaymentOption: "weekly",
    experienceYears: 7,
    createdAt: "2026-07-01T09:10:00.000Z",
    updatedAt: "2026-07-01T09:10:00.000Z"
  },
  {
    id: "worker-003",
    userId: "user-worker-003",
    name: "이정훈",
    phone: "010-1000-0003",
    jobCategories: ["electrical"],
    preferredRegions: ["chungcheong_daejeon", "chungcheong_sejong"],
    preferredPaymentOption: "same_day",
    experienceYears: 1,
    createdAt: "2026-07-01T09:20:00.000Z",
    updatedAt: "2026-07-01T09:20:00.000Z"
  }
];
