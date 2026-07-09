import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import type { JobApplication } from "@/types/application";
import type { Assignment } from "@/types/assignment";
import type { JobPost } from "@/types/job";
import type { Site } from "@/types/site";
import type { WorkerProfile } from "@/types/worker";

type AdminApplicationListProps = {
  applications: JobApplication[];
  assignments: Assignment[];
  jobs: JobPost[];
  sites: Site[];
  workers: WorkerProfile[];
};

const applicationStatusLabels: Record<JobApplication["status"], string> = {
  submitted: "확인 전",
  accepted: "출근 확정",
  rejected: "마감",
  cancelled: "취소"
};

const workerNameById: Record<string, string> = {
  "worker-001": "김민수",
  "worker-002": "박철호",
  "worker-003": "이정훈"
};

const jobTitleById: Record<string, string> = {
  "job-001": "보통인부 3명 모집",
  "job-002": "철근 보조 2명 모집",
  "job-003": "전기 보조 1명 모집"
};

const siteNameById: Record<string, string> = {
  "site-001": "수원 아파트 보수 현장",
  "site-002": "평택 물류센터 공사 현장",
  "site-003": "세종 상가 리모델링 현장"
};

const categoryLabels: Record<string, string> = {
  general_labor: "보통인부",
  rebar: "철근",
  electrical: "전기"
};

export function AdminApplicationList({
  applications,
  assignments,
  jobs,
  sites,
  workers
}: AdminApplicationListProps) {
  if (applications.length === 0) {
    return <EmptyState title="아직 지원 내역이 없습니다." />;
  }

  return (
    <section className="space-y-3 sm:space-y-4">
      {applications.map((application) => {
        const job = jobs.find((item) => item.id === application.jobPostId);
        const site = job ? sites.find((item) => item.id === job.siteId) : undefined;
        const worker = workers.find((item) => item.id === application.workerId);
        const assignment = assignments.find((item) => item.applicationId === application.id);

        return (
          <article
            key={application.id}
            className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={application.status === "accepted" ? "green" : "blue"}>
                    {applicationStatusLabels[application.status]}
                  </StatusBadge>
                  <StatusBadge tone={assignment ? "green" : "amber"}>
                    {assignment ? "출근 확정" : "확인 전"}
                  </StatusBadge>
                </div>
                <h2 className="mt-3 text-xl font-bold text-[#071B3A] sm:text-2xl">
                  {worker ? workerNameById[worker.id] ?? worker.name : "지원자 확인 전"}
                </h2>
                <p className="mt-2 text-sm font-semibold text-blue-700">
                  {job ? jobTitleById[job.id] ?? job.title : "일자리 확인 전"}
                </p>
              </div>
              <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
                <p className="text-xs font-semibold text-blue-100">지원일</p>
                <p className="mt-1 text-lg font-bold">
                  {new Date(application.appliedAt).toLocaleDateString("ko-KR")}
                </p>
              </div>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem label="현장명" value={site ? siteNameById[site.id] ?? site.name : "확인 전"} />
              <InfoItem label="근무일" value={job?.workDate ?? "확인 전"} strong />
              <InfoItem label="직종" value={job ? categoryLabels[job.category] ?? job.category : "확인 전"} />
              <InfoItem label="지원 상태" value={applicationStatusLabels[application.status]} />
              <InfoItem label="출근 확정 여부" value={assignment ? "출근 확정" : "확인 전"} strong />
            </dl>
          </article>
        );
      })}
    </section>
  );
}

function InfoItem({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="rounded-lg bg-blue-50 px-3 py-3 sm:px-4">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className={`mt-1 break-keep font-bold ${strong ? "text-blue-800" : "text-[#071B3A]"}`}>
        {value}
      </dd>
    </div>
  );
}
