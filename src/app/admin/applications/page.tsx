import { AdminApplicationList } from "@/components/admin/AdminApplicationList";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminSummaryCards } from "@/components/admin/AdminSummaryCards";
import { mockApplications } from "@/data/mockApplications";
import { mockAssignments } from "@/data/mockAssignments";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";
import { mockWorkers } from "@/data/mockWorkers";

export default function AdminApplicationsPage() {
  const confirmedApplications = mockApplications.filter(
    (application) => application.status === "accepted"
  );

  return (
    <AdminPageShell
      title="지원 내역"
      description="근로자의 지원 현황과 출근 확정 상태를 확인하세요."
      activeKey="applications"
    >
      <AdminSummaryCards
        items={[
          {
            label: "전체 지원",
            value: `${mockApplications.length}건`,
            description: "전체 지원 내역입니다."
          },
          {
            label: "출근 확정",
            value: `${confirmedApplications.length}건`,
            description: "출근 확정된 지원입니다."
          },
          {
            label: "확인 전",
            value: `${mockApplications.length - confirmedApplications.length}건`,
            description: "아직 확인이 필요한 지원입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <AdminApplicationList
          applications={mockApplications}
          assignments={mockAssignments}
          jobs={mockJobs}
          sites={mockSites}
          workers={mockWorkers}
        />
      </div>
    </AdminPageShell>
  );
}
