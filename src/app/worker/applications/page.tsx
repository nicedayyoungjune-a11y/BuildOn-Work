import { EmptyState } from "@/components/common/EmptyState";
import { WorkerApplicationList } from "@/components/worker/WorkerApplicationList";
import { WorkerPageShell } from "@/components/worker/WorkerPageShell";
import { WorkerSummaryCards } from "@/components/worker/WorkerSummaryCards";
import { mockApplications } from "@/data/mockApplications";
import { mockAssignments } from "@/data/mockAssignments";
import { mockJobs } from "@/data/mockJobs";

const currentWorkerId = "worker-002";

export default function WorkerApplicationsPage() {
  const applications = mockApplications.filter(
    (application) => application.workerId === currentWorkerId
  );
  const acceptedApplications = applications.filter(
    (application) => application.status === "accepted"
  );
  const confirmedAssignments = mockAssignments.filter(
    (assignment) => assignment.workerId === currentWorkerId
  );

  const items = applications.map((application) => ({
    application,
    job: mockJobs.find((job) => job.id === application.jobPostId),
    assignment: mockAssignments.find(
      (assignment) => assignment.applicationId === application.id
    )
  }));

  return (
    <WorkerPageShell
      title="지원한 일자리"
      description="지원한 일자리와 출근 확정 여부를 확인하세요."
    >
      <WorkerSummaryCards
        items={[
          {
            label: "지원한 일자리",
            value: `${applications.length}건`,
            description: "현재 근로자의 지원 내역입니다."
          },
          {
            label: "출근 확정",
            value: `${confirmedAssignments.length}건`,
            description: "출근 예정자로 확정된 일자리입니다."
          },
          {
            label: "지원 완료",
            value: `${acceptedApplications.length}건`,
            description: "현장에서 검토 후 확정된 지원입니다."
          }
        ]}
      />
      <div className="mt-6">
        {items.length > 0 ? (
          <WorkerApplicationList items={items} />
        ) : (
          <EmptyState
            title="지원한 일자리가 없습니다."
            description="일자리 찾기 화면에서 원하는 현장을 확인하세요."
          />
        )}
      </div>
    </WorkerPageShell>
  );
}
