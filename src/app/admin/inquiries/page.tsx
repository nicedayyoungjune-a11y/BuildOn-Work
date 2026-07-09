import { AdminInquiryList } from "@/components/admin/AdminInquiryList";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminSummaryCards } from "@/components/admin/AdminSummaryCards";
import { mockInquiries } from "@/data/mockInquiries";

export default function AdminInquiriesPage() {
  const pendingInquiries = mockInquiries.filter((inquiry) => inquiry.status !== "resolved");

  return (
    <AdminPageShell
      title="문의 내역"
      description="접수된 문의와 처리 예정 항목을 확인하세요."
      activeKey="inquiries"
    >
      <AdminSummaryCards
        items={[
          {
            label: "전체 문의",
            value: `${mockInquiries.length}건`,
            description: "접수된 문의입니다."
          },
          {
            label: "처리 예정",
            value: `${pendingInquiries.length}건`,
            description: "아직 확인이 필요한 문의입니다."
          },
          {
            label: "답변 완료",
            value: `${mockInquiries.length - pendingInquiries.length}건`,
            description: "답변이 끝난 문의입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <AdminInquiryList inquiries={mockInquiries} />
      </div>
    </AdminPageShell>
  );
}
