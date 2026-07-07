import { StatusBadge } from "@/components/common/StatusBadge";
import type { AttendanceRecord } from "@/types/attendance";
import type { Assignment } from "@/types/assignment";
import type { JobPost } from "@/types/job";
import type { Site } from "@/types/site";
import type { WorkerProfile } from "@/types/worker";

type CompanyAttendanceListProps = {
  attendance: AttendanceRecord[];
  assignments: Assignment[];
  jobs: JobPost[];
  sites: Site[];
  workers: WorkerProfile[];
};

const attendanceLabels: Record<AttendanceRecord["status"], string> = {
  pending: "확인 전",
  checked_in: "출근 완료",
  completed: "근무 완료",
  absent: "미출근"
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

export function CompanyAttendanceList({
  attendance,
  assignments,
  jobs,
  sites,
  workers
}: CompanyAttendanceListProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      {attendance.map((record) => {
        const job = jobs.find((item) => item.id === record.jobPostId);
        const site = job ? sites.find((item) => item.id === job.siteId) : undefined;
        const worker = workers.find((item) => item.id === record.workerId);
        const assignment = assignments.find((item) => item.id === record.assignmentId);
        const tone =
          record.status === "completed" || record.status === "checked_in"
            ? "green"
            : record.status === "absent"
              ? "red"
              : "amber";

        return (
          <article
            key={record.id}
            className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={tone}>{attendanceLabels[record.status]}</StatusBadge>
                  <StatusBadge tone={assignment ? "green" : "amber"}>
                    {assignment ? "출근 예정자" : "확인 예정"}
                  </StatusBadge>
                </div>
                <h2 className="mt-3 text-xl font-bold text-[#071B3A]">
                  {worker ? workerNameById[worker.id] ?? worker.name : "근로자 확인 중"}
                </h2>
                <p className="mt-2 text-sm font-semibold text-blue-700">
                  {site ? siteNameById[site.id] ?? site.name : "현장 확인 중"}
                </p>
              </div>
              <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
                <p className="text-xs font-semibold text-blue-100">근무일</p>
                <p className="mt-1 text-lg font-bold">{job?.workDate ?? "확인 중"}</p>
              </div>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem label="일자리" value={job ? jobTitleById[job.id] ?? job.title : "확인 중"} />
              <InfoItem label="출근 상태" value={attendanceLabels[record.status]} />
              <InfoItem
                label="출근 시간"
                value={
                  record.checkedInAt
                    ? new Date(record.checkedInAt).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })
                    : "확인 전"
                }
              />
              <InfoItem label="근무 완료" value={record.completedAt ? "완료" : "확인 전"} />
            </dl>
          </article>
        );
      })}
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-blue-50 px-3 py-3 sm:px-4">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 font-bold text-[#071B3A]">{value}</dd>
    </div>
  );
}
