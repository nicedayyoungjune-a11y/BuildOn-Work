import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import type { JobApplication } from "@/types/application";
import type { Assignment } from "@/types/assignment";
import type { CompanyProfile } from "@/types/company";
import type { JobPost } from "@/types/job";
import type { Site } from "@/types/site";

type AdminJobListProps = {
  jobs: JobPost[];
  sites: Site[];
  companies: CompanyProfile[];
  applications: JobApplication[];
  assignments: Assignment[];
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

const companyNameById: Record<string, string> = {
  "company-001": "서진건설",
  "company-002": "충청현장파트너스"
};

const categoryLabels: Record<string, string> = {
  general_labor: "보통인부",
  rebar: "철근",
  electrical: "전기"
};

const paymentLabels: Record<string, string> = {
  same_day: "당일 지급",
  weekly: "주급"
};

const statusLabels: Record<string, string> = {
  draft: "준비 중",
  open: "모집 중",
  closed: "마감",
  cancelled: "취소"
};

export function AdminJobList({ jobs, sites, companies, applications, assignments }: AdminJobListProps) {
  if (jobs.length === 0) {
    return <EmptyState title="아직 등록된 일자리가 없습니다." />;
  }

  return (
    <section className="space-y-3 sm:space-y-4">
      {jobs.map((job) => {
        const site = sites.find((item) => item.id === job.siteId);
        const company = companies.find((item) => item.id === job.companyId);
        const jobApplications = applications.filter((application) => application.jobPostId === job.id);
        const confirmedWorkers = assignments.filter((assignment) => assignment.jobPostId === job.id);

        return (
          <article
            key={job.id}
            className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge tone={job.status === "open" ? "green" : "slate"}>
                    {statusLabels[job.status]}
                  </StatusBadge>
                  <StatusBadge tone={job.paymentOption === "same_day" ? "green" : "blue"}>
                    {paymentLabels[job.paymentOption]}
                  </StatusBadge>
                </div>
                <h2 className="mt-3 text-xl font-bold text-[#071B3A] sm:text-2xl">
                  {jobTitleById[job.id] ?? job.title}
                </h2>
                <p className="mt-2 text-sm font-semibold text-blue-700">
                  {site ? siteNameById[site.id] ?? site.name : "현장 확인 전"}
                </p>
              </div>
              <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
                <p className="text-xs font-semibold text-blue-100">모집인원</p>
                <p className="mt-1 text-2xl font-bold">{job.requiredWorkers}명</p>
              </div>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem label="건설사명" value={company ? companyNameById[company.id] ?? company.companyName : "확인 전"} />
              <InfoItem label="모집인원" value={`${job.requiredWorkers}명`} strong />
              <InfoItem label="지원자" value={`${jobApplications.length}명`} strong />
              <InfoItem label="출근 확정자" value={`${confirmedWorkers.length}명`} strong />
              <InfoItem label="근무일" value={job.workDate} />
              <InfoItem label="직종" value={categoryLabels[job.category] ?? job.category} />
              <InfoItem label="지급 조건" value={paymentLabels[job.paymentOption]} />
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
