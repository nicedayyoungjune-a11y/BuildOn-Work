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
      description="가까운 현장과 원하는 직종의 일자리를 확인하세요."
      activeKey="jobs"
    >
      <WorkerSummaryCards
        items={[
          {
            label: "오늘 볼 수 있는 일자리",
            value: `${mockJobs.length}건`,
            description: "경기와 충청 지역 현장 일자리입니다."
          },
          {
            label: "당일 지급",
            value: `${sameDayJobs.length}건`,
            description: "현장 안내 기준으로 당일 지급 조건을 확인할 수 있습니다."
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
