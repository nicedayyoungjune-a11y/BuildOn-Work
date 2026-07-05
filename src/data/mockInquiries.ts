import type { Inquiry } from "@/types/inquiry";

export const mockInquiries: Inquiry[] = [
  {
    id: "inquiry-001",
    name: "상담 신청자 A",
    phone: "010-3000-0001",
    userType: "worker",
    message: "수원 지역 일용직 일자리 등록 알림을 받고 싶습니다.",
    status: "submitted",
    createdAt: "2026-07-04T09:00:00.000Z",
    updatedAt: "2026-07-04T09:00:00.000Z"
  },
  {
    id: "inquiry-002",
    name: "상담 신청자 B",
    phone: "010-3000-0002",
    userType: "company",
    message: "평택 현장 인력 모집 흐름을 상담받고 싶습니다.",
    status: "in_progress",
    createdAt: "2026-07-04T09:20:00.000Z",
    updatedAt: "2026-07-04T10:00:00.000Z"
  },
  {
    id: "inquiry-003",
    name: "상담 신청자 C",
    phone: "010-3000-0003",
    userType: "admin",
    message: "관리자 화면에서 확인할 기본 통계 범위가 궁금합니다.",
    status: "resolved",
    createdAt: "2026-07-04T09:40:00.000Z",
    updatedAt: "2026-07-04T11:00:00.000Z"
  }
];
