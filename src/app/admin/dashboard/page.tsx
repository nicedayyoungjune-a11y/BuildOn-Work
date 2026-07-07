import { AdminDashboardOverview } from "@/components/admin/AdminDashboardOverview";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminSummaryCards } from "@/components/admin/AdminSummaryCards";
import { mockApplications } from "@/data/mockApplications";
import { mockAttendance } from "@/data/mockAttendance";
import { mockCompanies } from "@/data/mockCompanies";
import { mockInquiries } from "@/data/mockInquiries";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";
import { mockWorkers } from "@/data/mockWorkers";

export default function AdminDashboardPage() {
  const checkedIn = mockAttendance.filter(
    (record) => record.status === "checked_in" || record.status === "completed"
  ).length;

  return (
    <AdminPageShell
      title="전체 현황"
      description="근로자, 건설사, 현장, 일자리와 문의 현황을 확인하세요."
    >
      <AdminSummaryCards
        items={[
          {
            label: "전체 근로자",
            value: `${mockWorkers.length}명`,
            description: "등록된 근로자 수입니다."
          },
          {
            label: "전체 건설사",
            value: `${mockCompanies.length}곳`,
            description: "등록된 건설사 수입니다."
          },
          {
            label: "등록 현장",
            value: `${mockSites.length}곳`,
            description: "운영 중인 현장 수입니다."
          },
          {
            label: "출근 완료",
            value: `${checkedIn}명`,
            description: "출근 완료 또는 근무 완료 인원입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <AdminDashboardOverview
          jobs={mockJobs}
          applications={mockApplications}
          attendance={mockAttendance}
          inquiries={mockInquiries}
        />
      </div>
    </AdminPageShell>
  );
}
