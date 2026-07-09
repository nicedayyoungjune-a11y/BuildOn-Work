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
  const scheduledAttendance = mockAttendance.filter((record) => record.status === "pending").length;
  const checkedIn = mockAttendance.filter(
    (record) => record.status === "checked_in"
  ).length;
  const absent = mockAttendance.filter((record) => record.status === "absent").length;
  const pendingInquiries = mockInquiries.filter((inquiry) => inquiry.status !== "resolved").length;

  return (
    <AdminPageShell
      title="전체 현황"
      description="근로자, 건설사, 현장, 일자리, 문의 현황을 한눈에 확인하세요."
      activeKey="dashboard"
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
            description: "등록된 현장 수입니다."
          },
          {
            label: "등록 일자리",
            value: `${mockJobs.length}건`,
            description: "등록된 일자리 수입니다."
          },
          {
            label: "지원 내역",
            value: `${mockApplications.length}건`,
            description: "근로자 지원 내역입니다."
          },
          {
            label: "문의 접수",
            value: `${mockInquiries.length}건`,
            description: `처리 예정 ${pendingInquiries}건입니다.`
          },
          {
            label: "확인 필요",
            value: `${scheduledAttendance + absent + pendingInquiries}건`,
            description: "출근 확인과 문의 확인이 필요한 항목입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <AdminDashboardOverview
          jobs={mockJobs}
          applications={mockApplications}
          attendance={mockAttendance}
          inquiries={mockInquiries}
          scheduledAttendance={scheduledAttendance}
          checkedIn={checkedIn}
          absent={absent}
        />
      </div>
    </AdminPageShell>
  );
}
