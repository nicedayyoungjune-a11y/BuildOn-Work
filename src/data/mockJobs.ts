import type { JobPost } from "@/types/job";

export const mockJobs: JobPost[] = [
  {
    id: "job-001",
    siteId: "site-001",
    companyId: "company-001",
    title: "보통인부 3명 모집",
    category: "general_labor",
    region: "gyeonggi_suwon",
    workDate: "2026-07-10",
    startTime: "08:00",
    endTime: "17:00",
    dailyWage: 150000,
    requiredWorkers: 3,
    paymentOption: "same_day",
    status: "open",
    description: "아파트 보수 현장 자재 정리와 보조 업무입니다.",
    createdAt: "2026-07-02T08:00:00.000Z",
    updatedAt: "2026-07-02T08:00:00.000Z"
  },
  {
    id: "job-002",
    siteId: "site-002",
    companyId: "company-001",
    title: "철근 보조 2명 모집",
    category: "rebar",
    region: "gyeonggi_pyeongtaek",
    workDate: "2026-07-11",
    startTime: "07:30",
    endTime: "17:00",
    dailyWage: 180000,
    requiredWorkers: 2,
    paymentOption: "weekly",
    status: "open",
    description: "물류센터 골조 공사 철근 작업 보조 인력을 모집합니다.",
    createdAt: "2026-07-02T08:20:00.000Z",
    updatedAt: "2026-07-02T08:20:00.000Z"
  },
  {
    id: "job-003",
    siteId: "site-003",
    companyId: "company-002",
    title: "전기 보조 1명 모집",
    category: "electrical",
    region: "chungcheong_sejong",
    workDate: "2026-07-12",
    startTime: "08:30",
    endTime: "17:30",
    dailyWage: 160000,
    requiredWorkers: 1,
    paymentOption: "same_day",
    status: "open",
    description: "상가 리모델링 현장 전기 배선 보조 업무입니다.",
    createdAt: "2026-07-02T08:40:00.000Z",
    updatedAt: "2026-07-02T08:40:00.000Z"
  }
];
