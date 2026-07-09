import Link from "next/link";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { JobCategory } from "@/constants/jobCategory";
import type { JobStatus } from "@/constants/jobStatus";
import type { PaymentOption } from "@/constants/paymentOption";
import type { Region } from "@/constants/region";
import type { JobPost } from "@/types/job";

type WorkerJobCardProps = {
  job: JobPost;
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

const jobTitleById: Record<string, string> = {
  "job-001": "보통인부 3명 모집",
  "job-002": "철근 보조 2명 모집",
  "job-003": "전기 보조 1명 모집"
};

export function WorkerJobCard({ job }: WorkerJobCardProps) {
  return (
    <article className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone={job.paymentOption === "same_day" ? "green" : "blue"}>
              {paymentOptionLabels[job.paymentOption]}
            </StatusBadge>
            <StatusBadge tone={job.status === "open" ? "green" : "slate"}>
              {jobStatusLabels[job.status]}
            </StatusBadge>
          </div>
          <h2 className="mt-3 text-xl font-bold text-[#071B3A] sm:text-2xl">
            {jobTitleById[job.id] ?? job.title}
          </h2>
          <p className="mt-2 text-sm font-semibold text-blue-700">
            {regionLabels[job.region]} · {jobCategoryLabels[job.category]}
          </p>
        </div>
        <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
          <p className="text-xs font-semibold text-blue-100">일당</p>
          <p className="mt-1 text-2xl font-bold">{job.dailyWage.toLocaleString("ko-KR")}원</p>
        </div>
      </div>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <InfoItem label="근무일" value={job.workDate} strong />
        <InfoItem label="지역" value={regionLabels[job.region]} strong />
        <InfoItem label="직종" value={jobCategoryLabels[job.category]} />
        <InfoItem label="지급 조건" value={paymentOptionLabels[job.paymentOption]} />
        <InfoItem label="근무 시간" value={`${job.startTime} - ${job.endTime}`} />
        <InfoItem label="모집인원" value={`${job.requiredWorkers}명`} />
      </dl>
      <div className="mt-4">
        <Link
          href={`/worker/jobs/${job.id}`}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0B1F3A] px-5 text-sm font-bold text-white transition-colors hover:bg-[#12315C] sm:w-auto"
        >
          상세 확인
        </Link>
      </div>
    </article>
  );
}

function InfoItem({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="rounded-lg bg-blue-50 px-3 py-3 sm:px-4">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className={`mt-1 font-bold ${strong ? "text-blue-800" : "text-[#071B3A]"}`}>
        {value}
      </dd>
    </div>
  );
}
