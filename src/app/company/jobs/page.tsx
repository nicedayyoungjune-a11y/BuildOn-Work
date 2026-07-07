import { CompanyJobCard } from "@/components/company/CompanyJobCard";
import { CompanyPageShell } from "@/components/company/CompanyPageShell";
import { CompanySummaryCards } from "@/components/company/CompanySummaryCards";
import { mockApplications } from "@/data/mockApplications";
import { mockAssignments } from "@/data/mockAssignments";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";

export default function CompanyJobsPage() {
  const neededWorkers = mockJobs.reduce((sum, job) => sum + job.requiredWorkers, 0);
  const confirmedWorkers = mockAssignments.length;

  return (
    <CompanyPageShell
      title="일자리 관리"
      description="등록된 일자리의 모집 현황과 출근 확정 인원을 확인하세요."
    >
      <CompanySummaryCards
        items={[
          {
            label: "등록된 일자리",
            value: `${mockJobs.length}건`,
            description: "현재 현장에 올라온 일자리입니다."
          },
          {
            label: "모집인원",
            value: `${neededWorkers}명`,
            description: "전체 일자리 기준 모집인원입니다."
          },
          {
            label: "지원자",
            value: `${mockApplications.length}명`,
            description: "일자리별 지원자 수입니다."
          },
          {
            label: "출근 확정",
            value: `${confirmedWorkers}명`,
            description: "출근 예정자로 확정된 인원입니다."
          }
        ]}
      />
      <section className="mt-5 space-y-3 sm:mt-6 sm:space-y-4" aria-label="일자리 목록">
        {mockJobs.map((job) => (
          <CompanyJobCard
            key={job.id}
            job={job}
            site={mockSites.find((site) => site.id === job.siteId)}
            applications={mockApplications}
            assignments={mockAssignments}
          />
        ))}
      </section>
    </CompanyPageShell>
  );
}
