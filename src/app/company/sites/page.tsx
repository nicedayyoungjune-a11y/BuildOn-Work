import { CompanyPageShell } from "@/components/company/CompanyPageShell";
import { CompanySiteCard } from "@/components/company/CompanySiteCard";
import { CompanySummaryCards } from "@/components/company/CompanySummaryCards";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";

export default function CompanySitesPage() {
  const neededWorkers = mockJobs.reduce((sum, job) => sum + job.requiredWorkers, 0);

  return (
    <CompanyPageShell
      title="현장 목록"
      description="현장명, 지역, 필요한 직종과 진행 중인 일자리를 확인하세요."
      activeKey="sites"
    >
      <CompanySummaryCards
        items={[
          {
            label: "등록된 현장",
            value: `${mockSites.length}곳`,
            description: "화면 예시로 확인할 수 있는 현장입니다."
          },
          {
            label: "진행 중인 일자리",
            value: `${mockJobs.length}건`,
            description: "현장별로 올라온 일자리입니다."
          },
          {
            label: "오늘 필요 인원",
            value: `${neededWorkers}명`,
            description: "전체 현장 기준 필요 인원입니다."
          }
        ]}
      />
      <section className="mt-5 space-y-3 sm:mt-6 sm:space-y-4" aria-label="현장 목록">
        {mockSites.map((site) => (
          <CompanySiteCard key={site.id} site={site} jobs={mockJobs} />
        ))}
      </section>
    </CompanyPageShell>
  );
}
