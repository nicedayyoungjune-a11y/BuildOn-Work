import { AdminJobList } from "@/components/admin/AdminJobList";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminSummaryCards } from "@/components/admin/AdminSummaryCards";
import { mockApplications } from "@/data/mockApplications";
import { mockAssignments } from "@/data/mockAssignments";
import { mockCompanies } from "@/data/mockCompanies";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";

export default function AdminJobsPage() {
  const neededWorkers = mockJobs.reduce((sum, job) => sum + job.requiredWorkers, 0);

  return (
    <AdminPageShell
      title="일자리 관리"
      description="전체 일자리와 지원자, 출근 확정 인원을 확인하세요."
    >
      <AdminSummaryCards
        items={[
          {
            label: "등록 일자리",
            value: `${mockJobs.length}건`,
            description: "전체 등록 일자리입니다."
          },
          {
            label: "모집인원",
            value: `${neededWorkers}명`,
            description: "전체 모집인원입니다."
          },
          {
            label: "지원자",
            value: `${mockApplications.length}명`,
            description: "전체 지원자 수입니다."
          },
          {
            label: "출근 확정",
            value: `${mockAssignments.length}명`,
            description: "출근 확정 인원입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <AdminJobList
          jobs={mockJobs}
          sites={mockSites}
          companies={mockCompanies}
          applications={mockApplications}
          assignments={mockAssignments}
        />
      </div>
    </AdminPageShell>
  );
}
