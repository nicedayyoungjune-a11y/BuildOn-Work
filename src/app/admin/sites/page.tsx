import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminSiteList } from "@/components/admin/AdminSiteList";
import { AdminSummaryCards } from "@/components/admin/AdminSummaryCards";
import { mockCompanies } from "@/data/mockCompanies";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";

export default function AdminSitesPage() {
  const neededWorkers = mockJobs.reduce((sum, job) => sum + job.requiredWorkers, 0);

  return (
    <AdminPageShell
      title="현장 관리"
      description="전체 현장과 건설사, 담당자, 진행 일자리를 확인하세요."
    >
      <AdminSummaryCards
        items={[
          {
            label: "전체 현장",
            value: `${mockSites.length}곳`,
            description: "등록된 현장입니다."
          },
          {
            label: "진행 일자리",
            value: `${mockJobs.length}건`,
            description: "현장별 등록 일자리입니다."
          },
          {
            label: "필요 인원",
            value: `${neededWorkers}명`,
            description: "전체 현장 기준 모집인원입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <AdminSiteList sites={mockSites} companies={mockCompanies} jobs={mockJobs} />
      </div>
    </AdminPageShell>
  );
}
