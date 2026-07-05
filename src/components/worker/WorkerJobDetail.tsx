import { JOB_CATEGORY_LABELS } from "@/constants/jobCategory";
import { PAYMENT_OPTION_LABELS } from "@/constants/paymentOption";
import { REGION_LABELS } from "@/constants/region";
import type { JobPost } from "@/types/job";
import type { Site } from "@/types/site";
import { StatusBadge } from "@/components/common/StatusBadge";

type WorkerJobDetailProps = {
  job: JobPost;
  site?: Site;
};

const checkItems = [
  "근무일과 출근 시간을 확인하세요.",
  "현장 주소와 담당자 안내를 확인하세요.",
  "일당과 지급 조건을 지원 전에 확인하세요."
];

export function WorkerJobDetail({ job, site }: WorkerJobDetailProps) {
  return (
    <article className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">{REGION_LABELS[job.region]}</p>
            <h2 className="mt-2 text-3xl font-bold text-[#071B3A]">{job.title}</h2>
          </div>
          <StatusBadge tone="green">모집 중</StatusBadge>
        </div>
        <p className="mt-5 text-base leading-7 text-slate-600">
          {job.description}
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <InfoItem label="직종" value={JOB_CATEGORY_LABELS[job.category]} />
          <InfoItem label="근무일" value={job.workDate} />
          <InfoItem label="근무 시간" value={`${job.startTime} - ${job.endTime}`} />
          <InfoItem label="일당" value={`${job.dailyWage.toLocaleString("ko-KR")}원`} />
          <InfoItem label="모집인원" value={`${job.requiredWorkers}명`} />
          <InfoItem label="지급 조건" value={PAYMENT_OPTION_LABELS[job.paymentOption]} />
        </dl>
      </section>
      <aside className="space-y-5">
        <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
          <h3 className="text-xl font-bold text-[#071B3A]">현장 정보</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <InfoItem label="현장명" value={site?.name ?? "현장 정보 확인 중"} />
            <InfoItem label="현장 주소" value={site?.address ?? "주소 정보 확인 중"} />
            <InfoItem label="담당자" value={site?.managerName ?? "담당자 확인 중"} />
          </dl>
        </section>
        <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
          <h3 className="text-xl font-bold text-[#071B3A]">지원 전 확인사항</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            {checkItems.map((item) => (
              <li key={item} className="rounded-xl bg-blue-50 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
          <span className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-blue-700 px-5 text-sm font-bold text-white">
            지원하기
          </span>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            현재 버튼은 화면 확인용이며 실제 지원 기능은 연결하지 않았습니다.
          </p>
        </section>
      </aside>
    </article>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-blue-50 px-4 py-3">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 font-bold text-[#071B3A]">{value}</dd>
    </div>
  );
}
