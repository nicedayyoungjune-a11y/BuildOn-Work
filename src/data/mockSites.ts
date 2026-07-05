import type { Site } from "@/types/site";

export const mockSites: Site[] = [
  {
    id: "site-001",
    companyId: "company-001",
    name: "수원 아파트 보수 현장",
    region: "gyeonggi_suwon",
    address: "경기 수원시 권선구 샘플로 12",
    managerName: "오지훈",
    managerPhone: "010-2000-0001",
    createdAt: "2026-07-01T11:00:00.000Z",
    updatedAt: "2026-07-01T11:00:00.000Z"
  },
  {
    id: "site-002",
    companyId: "company-001",
    name: "평택 물류센터 공사 현장",
    region: "gyeonggi_pyeongtaek",
    address: "경기 평택시 고덕면 샘플로 45",
    managerName: "남도윤",
    managerPhone: "010-2000-0002",
    createdAt: "2026-07-01T11:10:00.000Z",
    updatedAt: "2026-07-01T11:10:00.000Z"
  },
  {
    id: "site-003",
    companyId: "company-002",
    name: "세종 상가 리모델링 현장",
    region: "chungcheong_sejong",
    address: "세종시 한누리대로 샘플빌딩 3층",
    managerName: "문하준",
    managerPhone: "010-2000-0003",
    createdAt: "2026-07-01T11:20:00.000Z",
    updatedAt: "2026-07-01T11:20:00.000Z"
  }
];
