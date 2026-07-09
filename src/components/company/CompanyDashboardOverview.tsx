import { StatusBadge } from "@/components/common/StatusBadge";
import type { AttendanceRecord } from "@/types/attendance";
import type { JobApplication } from "@/types/application";
import type { Assignment } from "@/types/assignment";
import type { JobPost } from "@/types/job";
import type { Site } from "@/types/site";

type CompanyDashboardOverviewProps = {
  sites: Site[];
  jobs: JobPost[];
  applications: JobApplication[];
  assignments: Assignment[];
  attendance: AttendanceRecord[];
};

const siteDisplayById: Record<string, { name: string; address: string }> = {
  "site-001": { name: "수원 아파트 보수 현장", address: "경기 수원시 권선구 샘플로 12" },
  "site-002": { name: "평택 물류센터 공사 현장", address: "경기 평택시 고덕면 샘플로 45" },
  "site-003": { name: "세종 상가 리모델링 현장", address: "세종시 새누리로 샘플빌딩 3층" }
};

const jobTitleById: Record<string, string> = {
  "job-001": "보통인부 3명 모집",
  "job-002": "철근 보조 2명 모집",
  "job-003": "전기 보조 1명 모집"
};

export function CompanyDashboardOverview({
  sites,
  jobs,
  applications,
  assignments,
  attendance
}: CompanyDashboardOverviewProps) {
  const mainSites = sites.slice(0, 3);
  const recentApplications = applications.slice(0, 4);
  const todayAttendance = attendance.slice(0, 4);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">주요 현장</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">오늘 확인할 현장</h2>
          </div>
          <StatusBadge tone="blue">{mainSites.length}곳</StatusBadge>
        </div>
        <div className="mt-4 space-y-3">
          {mainSites.map((site) => {
            const siteJobs = jobs.filter((job) => job.siteId === site.id);
            const neededWorkers = siteJobs.reduce((sum, job) => sum + job.requiredWorkers, 0);
            const siteDisplay = siteDisplayById[site.id];

            return (
              <article key={site.id} className="rounded-lg bg-blue-50 px-4 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-bold text-[#071B3A]">{siteDisplay?.name ?? site.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {siteDisplay?.address ?? site.address}
                    </p>
                  </div>
                  <StatusBadge tone="green">필요 {neededWorkers}명</StatusBadge>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">최근 지원자</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">확인할 지원</h2>
          </div>
          <StatusBadge tone="blue">{recentApplications.length}건</StatusBadge>
        </div>
        <div className="mt-4 space-y-3">
          {recentApplications.map((application) => {
            const job = jobs.find((item) => item.id === application.jobPostId);
            const isConfirmed = assignments.some(
              (assignment) => assignment.applicationId === application.id
            );

            return (
              <article key={application.id} className="rounded-lg bg-blue-50 px-4 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-bold text-[#071B3A]">
                      {job ? jobTitleById[job.id] ?? job.title : "일자리 확인 중"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      지원일 {new Date(application.appliedAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                  <StatusBadge tone={isConfirmed ? "green" : "amber"}>
                    {isConfirmed ? "출근 확정" : "확인 예정"}
                  </StatusBadge>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5 lg:col-span-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">오늘 출근 현황</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">출근 상태 요약</h2>
          </div>
          <StatusBadge tone="blue">{todayAttendance.length}건</StatusBadge>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {todayAttendance.map((record) => {
            const job = jobs.find((item) => item.id === record.jobPostId);
            const isAbsent = record.status === "absent";
            const tone =
              record.status === "completed" || record.status === "checked_in"
                ? "green"
                : isAbsent
                  ? "red"
                  : "amber";

            return (
              <article
                key={record.id}
                className={`rounded-lg px-4 py-3 ${
                  isAbsent ? "bg-red-50" : "bg-blue-50"
                }`}
              >
                <h3 className="font-bold text-[#071B3A]">
                  {job ? jobTitleById[job.id] ?? job.title : "일자리 확인 중"}
                </h3>
                <div className="mt-3">
                  <StatusBadge tone={tone}>{attendanceLabel(record.status)}</StatusBadge>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function attendanceLabel(status: AttendanceRecord["status"]) {
  const labels: Record<AttendanceRecord["status"], string> = {
    pending: "확인 전",
    checked_in: "출근 완료",
    completed: "근무 완료",
    absent: "미출근"
  };

  return labels[status];
}
