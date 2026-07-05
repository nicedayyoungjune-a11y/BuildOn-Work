import type { CompanyProfile } from "@/types/company";

export const mockCompanies: CompanyProfile[] = [
  {
    id: "company-001",
    userId: "user-company-001",
    companyName: "한빛건설",
    contactName: "최현우",
    phone: "031-100-0001",
    regions: ["gyeonggi_suwon", "gyeonggi_hwaseong", "gyeonggi_pyeongtaek"],
    createdAt: "2026-07-01T10:00:00.000Z",
    updatedAt: "2026-07-01T10:00:00.000Z"
  },
  {
    id: "company-002",
    userId: "user-company-002",
    companyName: "충청현장파트너스",
    contactName: "정서연",
    phone: "042-100-0002",
    regions: ["chungcheong_daejeon", "chungcheong_sejong", "chungcheong_cheonan"],
    createdAt: "2026-07-01T10:10:00.000Z",
    updatedAt: "2026-07-01T10:10:00.000Z"
  }
];
