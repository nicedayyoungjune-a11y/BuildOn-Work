import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import type { Inquiry } from "@/types/inquiry";

type AdminInquiryListProps = {
  inquiries: Inquiry[];
};

const inquiryStatusLabels: Record<Inquiry["status"], string> = {
  submitted: "접수 완료",
  in_progress: "처리 예정",
  resolved: "답변 완료"
};

const userTypeLabels: Record<Inquiry["userType"], string> = {
  worker: "근로자",
  company: "건설사",
  admin: "관리자"
};

const inquiryDisplayById: Record<string, { name: string; title: string; summary: string }> = {
  "inquiry-001": {
    name: "상담 요청 A",
    title: "수원 일자리 문의",
    summary: "수원 지역 건설 일자리 등록 안내를 받고 싶다는 문의입니다."
  },
  "inquiry-002": {
    name: "상담 요청 B",
    title: "평택 현장 인력 문의",
    summary: "평택 현장의 인력 모집 방법을 상담받고 싶다는 문의입니다."
  },
  "inquiry-003": {
    name: "상담 요청 C",
    title: "운영 현황 문의",
    summary: "운영자가 확인할 현황 범위에 대한 문의입니다."
  }
};

export function AdminInquiryList({ inquiries }: AdminInquiryListProps) {
  if (inquiries.length === 0) {
    return <EmptyState title="아직 접수된 문의가 없습니다." />;
  }

  return (
    <section className="space-y-3 sm:space-y-4">
      {inquiries.map((inquiry) => {
        const display = inquiryDisplayById[inquiry.id];

        return (
          <article
            key={inquiry.id}
            className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={inquiry.status === "resolved" ? "green" : "amber"}>
                    {inquiryStatusLabels[inquiry.status]}
                  </StatusBadge>
                  <StatusBadge tone="blue">{userTypeLabels[inquiry.userType]}</StatusBadge>
                </div>
                <h2 className="mt-3 text-xl font-bold text-[#071B3A] sm:text-2xl">
                  {display?.title ?? "문의 확인 전"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {display?.summary ?? inquiry.message}
                </p>
              </div>
              <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
                <p className="text-xs font-semibold text-blue-100">접수일</p>
                <p className="mt-1 text-lg font-bold">
                  {new Date(inquiry.createdAt).toLocaleDateString("ko-KR")}
                </p>
              </div>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem label="문의자" value={display?.name ?? inquiry.name} />
              <InfoItem label="연락처" value={inquiry.phone} />
              <InfoItem label="문의 유형" value={userTypeLabels[inquiry.userType]} />
              <InfoItem label="문의 상태" value={inquiryStatusLabels[inquiry.status]} />
            </dl>
          </article>
        );
      })}
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-blue-50 px-3 py-3 sm:px-4">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 font-bold text-[#071B3A]">{value}</dd>
    </div>
  );
}
