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
      description="이름, 연락처, 선호 직종, 선호 지역, 지급 조건을 확인하세요."
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
