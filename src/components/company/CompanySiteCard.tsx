import { StatusBadge } from "@/components/common/StatusBadge";
import type { JobCategory } from "@/constants/jobCategory";
import type { Region } from "@/constants/region";
import type { JobPost } from "@/types/job";
import type { Site } from "@/types/site";

type CompanySiteCardProps = {
  site: Site;
  jobs: JobPost[];
};

const regionLabels: Record<Region, string> = {
  gyeonggi_suwon: "경기 수원",
  gyeonggi_yongin: "경기 용인",
  gyeonggi_hwaseong: "경기 화성",
  gyeonggi_pyeongtaek: "경기 평택",
  chungcheong_daejeon: "대전",
  chungcheong_sejong: "세종",
  chungcheong_cheonan: "충남 천안",
  chungcheong_cheongju: "충북 청주"
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

export function CompanySiteCard({ site, jobs }: CompanySiteCardProps) {
  const siteJobs = jobs.filter((job) => job.siteId === site.id);
  const neededWorkers = siteJobs.reduce((sum, job) => sum + job.requiredWorkers, 0);
  const categories = Array.from(new Set(siteJobs.map((job) => job.category)));
  const display = siteDisplayById[site.id];

  return (
    <article className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="blue">{regionLabels[site.region]}</StatusBadge>
            <StatusBadge tone="green">필요 {neededWorkers}명</StatusBadge>
          </div>
          <h2 className="mt-3 text-xl font-bold text-[#071B3A] sm:text-2xl">
            {display?.name ?? site.name}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{display?.address ?? site.address}</p>
        </div>
        <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
          <p className="text-xs font-semibold text-blue-100">등록된 일자리</p>
          <p className="mt-1 text-2xl font-bold">{siteJobs.length}건</p>
        </div>
      </div>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <InfoItem label="현장 담당자" value={display?.managerName ?? site.managerName} />
        <InfoItem label="오늘 필요한 인원" value={`${neededWorkers}명`} strong />
        <InfoItem
          label="필요 직종"
          value={categories.map((category) => jobCategoryLabels[category]).join(", ") || "확인 중"}
          strong
        />
        <InfoItem label="현장 주소" value={display?.address ?? site.address} />
      </dl>
    </article>
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
