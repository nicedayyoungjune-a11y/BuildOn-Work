import { WorkerJobCard } from "@/components/worker/WorkerJobCard";
import { WorkerPageShell } from "@/components/worker/WorkerPageShell";
import { WorkerSummaryCards } from "@/components/worker/WorkerSummaryCards";
import { mockJobs } from "@/data/mockJobs";

export default function WorkerJobsPage() {
  const sameDayJobs = mockJobs.filter((job) => job.paymentOption === "same_day");
  const weeklyJobs = mockJobs.filter((job) => job.paymentOption === "weekly");

  return (
    <WorkerPageShell
      title="일자리 찾기"
      description="일당, 근무일, 지역, 직종을 먼저 비교하고 가까운 현장을 확인하세요."
      activeKey="jobs"
    >
      <WorkerSummaryCards
        items={[
          {
            label: "확인 가능한 일자리",
            value: `${mockJobs.length}건`,
            description: "경기와 충청 지역의 화면 예시 일자리입니다."
          },
          {
            label: "당일 지급 조건",
            value: `${sameDayJobs.length}건`,
            description: "현장에서 안내한 지급 조건을 확인합니다."
          },
          {
            label: "주급",
            value: `${weeklyJobs.length}건`,
            description: "주급 조건으로 안내되는 일자리입니다."
          }
        ]}
      />
      <section className="mt-5 space-y-3 sm:mt-6 sm:space-y-4" aria-label="일자리 목록">
        {mockJobs.map((job) => (
          <WorkerJobCard key={job.id} job={job} />
        ))}
      </section>
    </WorkerPageShell>
  );
}
