import { StatusBadge } from "@/components/common/StatusBadge";
import type { JobCategory } from "@/constants/jobCategory";
import type { JobStatus } from "@/constants/jobStatus";
import type { PaymentOption } from "@/constants/paymentOption";
import type { JobApplication } from "@/types/application";
import type { Assignment } from "@/types/assignment";
import type { JobPost } from "@/types/job";
import type { Site } from "@/types/site";

type CompanyJobCardProps = {
  job: JobPost;
  site?: Site;
  applications: JobApplication[];
  assignments: Assignment[];
};

const jobCategoryLabels: Record<JobCategory, string> = {
  general_labor: "보통인부",
  formwork: "형틀",
  rebar: "철근",
  masonry: "조적",
  plastering: "미장",
  painting: "도장",
  equipment: "장비",
  electrical: "전기"
};

const jobStatusLabels: Record<JobStatus, string> = {
  draft: "준비 중",
  open: "모집 중",
  closed: "마감",
  cancelled: "취소"
};

const paymentOptionLabels: Record<PaymentOption, string> = {
  same_day: "당일 지급",
  weekly: "주급"
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

export function CompanyJobCard({ job, site, applications, assignments }: CompanyJobCardProps) {
  const jobApplications = applications.filter((application) => application.jobPostId === job.id);
  const confirmedWorkers = assignments.filter((assignment) => assignment.jobPostId === job.id);

  return (
    <article className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone={job.status === "open" ? "green" : "slate"}>
              {jobStatusLabels[job.status]}
            </StatusBadge>
            <StatusBadge tone={job.paymentOption === "same_day" ? "green" : "blue"}>
              {paymentOptionLabels[job.paymentOption]}
            </StatusBadge>
          </div>
          <h2 className="mt-3 text-xl font-bold text-[#071B3A] sm:text-2xl">
            {jobTitleById[job.id] ?? job.title}
          </h2>
          <p className="mt-2 text-sm font-semibold text-blue-700">
            {site ? siteNameById[site.id] ?? site.name : "현장 확인 중"}
          </p>
        </div>
        <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
          <p className="text-xs font-semibold text-blue-100">모집인원</p>
          <p className="mt-1 text-2xl font-bold">{job.requiredWorkers}명</p>
        </div>
      </div>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <InfoItem label="지원자" value={`${jobApplications.length}명`} />
        <InfoItem label="출근 확정" value={`${confirmedWorkers.length}명`} />
        <InfoItem label="근무일" value={job.workDate} />
        <InfoItem label="직종" value={jobCategoryLabels[job.category]} />
        <InfoItem label="일당" value={`${job.dailyWage.toLocaleString("ko-KR")}원`} />
        <InfoItem label="지급 조건" value={paymentOptionLabels[job.paymentOption]} />
      </dl>
    </article>
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
