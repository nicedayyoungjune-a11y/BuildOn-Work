import { EmptyState } from "@/components/common/EmptyState";
import { WorkerJobDetail } from "@/components/worker/WorkerJobDetail";
import { WorkerPageShell } from "@/components/worker/WorkerPageShell";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";

type WorkerJobDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return mockJobs.map((job) => ({
    id: job.id
  }));
}

export default async function WorkerJobDetailPage({ params }: WorkerJobDetailPageProps) {
  const { id } = await params;
  const job = mockJobs.find((item) => item.id === id);
  const site = job ? mockSites.find((item) => item.id === job.siteId) : undefined;

  return (
    <WorkerPageShell
      title="일자리 상세"
      description="출근 전 일당, 근무일, 현장 위치, 지급 조건을 차례로 확인하세요."
      activeKey="jobs"
    >
      {job ? (
        <WorkerJobDetail job={job} site={site} />
      ) : (
        <EmptyState
          title="일자리를 찾을 수 없습니다."
          description="일자리 찾기 화면에서 다시 확인하세요."
        />
      )}
    </WorkerPageShell>
  );
}
