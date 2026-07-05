import { StatusBadge } from "@/components/common/StatusBadge";
import type { JobCategory } from "@/constants/jobCategory";
import type { PaymentOption } from "@/constants/paymentOption";
import type { Region } from "@/constants/region";
import type { JobPost } from "@/types/job";
import type { Site } from "@/types/site";

type WorkerJobDetailProps = {
  job: JobPost;
  site?: Site;
};

const checkItems = [
  "근무일과 출근 시간을 확인하세요.",
  "현장 주소를 확인하고 이동 시간을 미리 확인하세요.",
  "지급 조건은 현장 안내 기준을 따릅니다.",
  "안전모 등 기본 안전장비를 준비하세요."
];

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

const paymentOptionLabels: Record<PaymentOption, string> = {
  same_day: "당일 지급",
  weekly: "주급"
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

const jobDisplayById: Record<string, { title: string; description: string }> = {
  "job-001": {
    title: "보통인부 3명 모집",
    description: "아파트 보수 현장에서 자재 정리와 현장 보조 업무를 맡습니다."
  },
  "job-002": {
    title: "철근 보조 2명 모집",
    description: "물류센터 공사 현장에서 철근 작업 보조 인력을 모집합니다."
  },
  "job-003": {
    title: "전기 보조 1명 모집",
    description: "상가 리모델링 현장에서 전기 배선 보조 업무를 맡습니다."
  }
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

export function WorkerJobDetail({ job, site }: WorkerJobDetailProps) {
  const jobDisplay = jobDisplayById[job.id];
  const siteDisplay = site ? siteDisplayById[site.id] : undefined;

  return (
    <article className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">{regionLabels[job.region]}</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A] sm:text-3xl">
              {jobDisplay?.title ?? job.title}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone="green">모집 중</StatusBadge>
            <StatusBadge tone={job.paymentOption === "same_day" ? "green" : "blue"}>
              {paymentOptionLabels[job.paymentOption]}
            </StatusBadge>
          </div>
        </div>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {jobDisplay?.description ?? job.description}
        </p>
        <div className="mt-5 rounded-xl bg-[#0B1F3A] p-4 text-white">
          <p className="text-sm font-semibold text-blue-100">일당</p>
          <p className="mt-1 text-3xl font-bold">{job.dailyWage.toLocaleString("ko-KR")}원</p>
        </div>
        <dl className="mt-4 grid gap-2 sm:grid-cols-2">
          <InfoItem label="근무일" value={job.workDate} />
          <InfoItem label="근무 시간" value={`${job.startTime} - ${job.endTime}`} />
          <InfoItem label="지역" value={regionLabels[job.region]} />
          <InfoItem label="직종" value={jobCategoryLabels[job.category]} />
          <InfoItem label="모집인원" value={`${job.requiredWorkers}명`} />
          <InfoItem label="지급 조건" value={paymentOptionLabels[job.paymentOption]} />
        </dl>
      </section>
      <aside className="space-y-5">
        <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
          <h3 className="text-xl font-bold text-[#071B3A]">현장 정보</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <InfoItem label="현장명" value={siteDisplay?.name ?? "현장 확인 중"} />
            <InfoItem label="현장 주소" value={siteDisplay?.address ?? "주소 확인 중"} />
            <InfoItem label="담당자" value={siteDisplay?.managerName ?? "담당자 확인 중"} />
          </dl>
        </section>
        <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
          <h3 className="text-xl font-bold text-[#071B3A]">지원 전 확인사항</h3>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            {checkItems.map((item) => (
              <li key={item} className="rounded-lg bg-blue-50 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
          <span className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-blue-700 px-5 text-sm font-bold text-white">
            지원하기
          </span>
        </section>
      </aside>
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
