import { EmptyState } from "@/components/common/EmptyState";
import { WorkerPageShell } from "@/components/worker/WorkerPageShell";
import { WorkerProfileCard } from "@/components/worker/WorkerProfileCard";
import { mockApplications } from "@/data/mockApplications";
import { mockWorkers } from "@/data/mockWorkers";

const currentWorkerId = "worker-002";

export default function WorkerMyPage() {
  const worker = mockWorkers.find((item) => item.id === currentWorkerId);
  const recentApplications = mockApplications.filter(
    (application) => application.workerId === currentWorkerId
  );

  return (
    <WorkerPageShell
      title="내 정보"
      description="선호 지역, 직종, 지급 조건과 최근 지원 내역을 확인하세요."
      activeKey="my"
    >
      {worker ? (
        <WorkerProfileCard worker={worker} recentApplications={recentApplications} />
      ) : (
        <EmptyState
          title="근로자 정보를 찾을 수 없습니다."
          description="현재 표시할 근로자 정보가 없습니다."
        />
      )}
    </WorkerPageShell>
  );
}
