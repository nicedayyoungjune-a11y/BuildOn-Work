import { StatusBadge } from "@/components/common/StatusBadge";
import type { CompanyProfile } from "@/types/company";
import type { JobPost } from "@/types/job";
import type { Site } from "@/types/site";

type AdminSiteListProps = {
  sites: Site[];
  companies: CompanyProfile[];
  jobs: JobPost[];
};

const siteDisplayById: Record<string, { name: string; address: string; managerName: string }> = {
  "site-001": {
    name: "수원 아파트 보수 현장",
    address: "경기 수원시 권선구 샘플로 12",
    managerName: "현장 담당자"
  },
  "site-002": {
    name: "평택 물류센터 공사 현장",
    address: "경기 평택시 고덕면 샘플로 45",
    managerName: "현장 담당자"
  },
  "site-003": {
    name: "세종 상가 리모델링 현장",
    address: "세종시 새누리로 샘플빌딩 3층",
    managerName: "현장 담당자"
  }
};

const companyNameById: Record<string, string> = {
  "company-001": "서진건설",
  "company-002": "충청현장파트너스"
};

const regionLabels: Record<string, string> = {
  gyeonggi_suwon: "경기 수원",
  gyeonggi_pyeongtaek: "경기 평택",
  chungcheong_sejong: "세종"
};

const categoryLabels: Record<string, string> = {
  general_labor: "보통인부",
  rebar: "철근",
  electrical: "전기"
};

export function AdminSiteList({ sites, companies, jobs }: AdminSiteListProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      {sites.map((site) => {
        const display = siteDisplayById[site.id];
        const company = companies.find((item) => item.id === site.companyId);
        const siteJobs = jobs.filter((job) => job.siteId === site.id);
        const categories = Array.from(new Set(siteJobs.map((job) => job.category)));

        return (
          <article
            key={site.id}
            className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <StatusBadge tone="blue">{regionLabels[site.region] ?? "지역 확인"}</StatusBadge>
                <h2 className="mt-3 text-xl font-bold text-[#071B3A] sm:text-2xl">
                  {display?.name ?? site.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {display?.address ?? site.address}
                </p>
              </div>
              <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
                <p className="text-xs font-semibold text-blue-100">진행 일자리</p>
                <p className="mt-1 text-2xl font-bold">{siteJobs.length}건</p>
              </div>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem label="건설사" value={company ? companyNameById[company.id] ?? company.companyName : "확인 중"} />
              <InfoItem label="담당자" value={display?.managerName ?? site.managerName} />
              <InfoItem label="필요 직종" value={categories.map((category) => categoryLabels[category] ?? category).join(", ") || "확인 중"} />
              <InfoItem label="연락처" value={site.managerPhone} />
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
