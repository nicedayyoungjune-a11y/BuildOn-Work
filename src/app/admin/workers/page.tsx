import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminSummaryCards } from "@/components/admin/AdminSummaryCards";
import { AdminWorkerList } from "@/components/admin/AdminWorkerList";
import { mockApplications } from "@/data/mockApplications";
import { mockWorkers } from "@/data/mockWorkers";

export default function AdminWorkersPage() {
  const experiencedWorkers = mockWorkers.filter((worker) => worker.experienceYears >= 3);

  return (
    <AdminPageShell
      title="근로자 현황"
      description="등록된 근로자와 선호 직종, 최근 지원 내역을 확인하세요."
      activeKey="workers"
    >
      <AdminSummaryCards
        items={[
          {
            label: "전체 근로자",
            value: `${mockWorkers.length}명`,
            description: "등록된 근로자 수입니다."
          },
          {
            label: "지원 내역",
            value: `${mockApplications.length}건`,
            description: "근로자 지원 내역입니다."
          },
          {
            label: "경력 근로자",
            value: `${experiencedWorkers.length}명`,
            description: "3년 이상 경력자입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <AdminWorkerList workers={mockWorkers} applications={mockApplications} />
      </div>
    </AdminPageShell>
  );
}
