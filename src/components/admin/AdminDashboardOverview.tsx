import { StatusBadge } from "@/components/common/StatusBadge";
import type { AttendanceRecord } from "@/types/attendance";
import type { Inquiry } from "@/types/inquiry";
import type { JobApplication } from "@/types/application";
import type { JobPost } from "@/types/job";

type AdminDashboardOverviewProps = {
  jobs: JobPost[];
  applications: JobApplication[];
  attendance: AttendanceRecord[];
  inquiries: Inquiry[];
};

const jobTitleById: Record<string, string> = {
  "job-001": "보통인부 3명 모집",
  "job-002": "철근 보조 2명 모집",
  "job-003": "전기 보조 1명 모집"
};

const inquiryStatusLabels: Record<Inquiry["status"], string> = {
  submitted: "접수 완료",
  in_progress: "처리 예정",
  resolved: "확인 완료"
};

const attendanceLabels: Record<AttendanceRecord["status"], string> = {
  pending: "확인 전",
  checked_in: "출근 완료",
  completed: "근무 완료",
  absent: "미출근"
};

export function AdminDashboardOverview({
  jobs,
  applications,
  attendance,
  inquiries
}: AdminDashboardOverviewProps) {
  const recentJobs = jobs.slice(0, 3);
  const recentInquiries = inquiries.slice(0, 3);
  const recentAttendance = attendance.slice(0, 4);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">최근 일자리</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">등록 일자리 요약</h2>
          </div>
          <StatusBadge tone="blue">{jobs.length}건</StatusBadge>
        </div>
        <div className="mt-4 space-y-3">
          {recentJobs.map((job) => {
            const applicantCount = applications.filter(
              (application) => application.jobPostId === job.id
            ).length;

            return (
              <article key={job.id} className="rounded-lg bg-blue-50 px-4 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-bold text-[#071B3A]">
                      {jobTitleById[job.id] ?? job.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">근무일 {job.workDate}</p>
                  </div>
                  <StatusBadge tone="green">지원자 {applicantCount}명</StatusBadge>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">문의 내역</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">최근 문의 요약</h2>
          </div>
          <StatusBadge tone="blue">{inquiries.length}건</StatusBadge>
        </div>
        <div className="mt-4 space-y-3">
          {recentInquiries.map((inquiry) => (
            <article key={inquiry.id} className="rounded-lg bg-blue-50 px-4 py-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-bold text-[#071B3A]">{inquiryTitle(inquiry.id)}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    접수일 {new Date(inquiry.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <StatusBadge tone={inquiry.status === "resolved" ? "green" : "amber"}>
                  {inquiryStatusLabels[inquiry.status]}
                </StatusBadge>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5 lg:col-span-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">출근 현황</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">최근 출근 상태</h2>
          </div>
          <StatusBadge tone="blue">{attendance.length}건</StatusBadge>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {recentAttendance.map((record) => (
            <article key={record.id} className="rounded-lg bg-blue-50 px-4 py-3">
              <h3 className="font-bold text-[#071B3A]">
                {jobTitleById[record.jobPostId] ?? "일자리 확인 중"}
              </h3>
              <div className="mt-3">
                <StatusBadge tone={attendanceTone(record.status)}>
                  {attendanceLabels[record.status]}
                </StatusBadge>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function inquiryTitle(id: string) {
  const titles: Record<string, string> = {
    "inquiry-001": "근로자 상담 문의",
    "inquiry-002": "현장 인력 문의",
    "inquiry-003": "관리자 화면 문의"
  };

  return titles[id] ?? "문의 확인 중";
}

function attendanceTone(status: AttendanceRecord["status"]) {
  if (status === "checked_in" || status === "completed") return "green";
  if (status === "absent") return "red";
  return "amber";
}
