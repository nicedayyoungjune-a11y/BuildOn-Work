import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import type { CompanyProfile } from "@/types/company";
import type { JobPost } from "@/types/job";
import type { Site } from "@/types/site";

type AdminCompanyListProps = {
  companies: CompanyProfile[];
  sites: Site[];
  jobs: JobPost[];
};

const companyNameById: Record<string, { name: string; contact: string }> = {
  "company-001": { name: "서진건설", contact: "최현우" },
  "company-002": { name: "충청현장파트너스", contact: "정서윤" }
};

const jobTitleById: Record<string, string> = {
  "job-001": "보통인부 3명 모집",
  "job-002": "철근 보조 2명 모집",
  "job-003": "전기 보조 1명 모집"
};

export function AdminCompanyList({ companies, sites, jobs }: AdminCompanyListProps) {
  if (companies.length === 0) {
    return <EmptyState title="아직 등록된 건설사가 없습니다." />;
  }

  return (
    <section className="space-y-3 sm:space-y-4">
      {companies.map((company) => {
        const companySites = sites.filter((site) => site.companyId === company.id);
        const companyJobs = jobs.filter((job) => job.companyId === company.id);
        const recentJob = companyJobs[0];
        const display = companyNameById[company.id];

        return (
          <article
            key={company.id}
            className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <StatusBadge tone="blue">건설사</StatusBadge>
                <h2 className="mt-3 text-xl font-bold text-[#071B3A] sm:text-2xl">
                  {display?.name ?? company.companyName}
                </h2>
                <p className="mt-2 text-sm font-semibold text-blue-700">
                  담당자 {display?.contact ?? company.contactName}
                </p>
              </div>
              <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
                <p className="text-xs font-semibold text-blue-100">등록 현장</p>
                <p className="mt-1 text-2xl font-bold">{companySites.length}곳</p>
              </div>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem label="연락처" value={company.phone} />
              <InfoItem label="등록 일자리" value={`${companyJobs.length}건`} />
              <InfoItem label="최근 일자리" value={recentJob ? jobTitleById[recentJob.id] ?? recentJob.title : "아직 등록된 일자리가 없습니다."} />
              <InfoItem label="운영 지역" value={`${company.regions.length}곳`} />
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
