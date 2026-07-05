import Link from "next/link";
import { JOB_CATEGORY_LABELS } from "@/constants/jobCategory";
import { JOB_STATUS_LABELS } from "@/constants/jobStatus";
import { PAYMENT_OPTION_LABELS } from "@/constants/paymentOption";
import { REGION_LABELS } from "@/constants/region";
import type { JobPost } from "@/types/job";
import { StatusBadge } from "@/components/common/StatusBadge";

type WorkerJobCardProps = {
  job: JobPost;
};

export function WorkerJobCard({ job }: WorkerJobCardProps) {
  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#071B3A]">{job.title}</h2>
          <p className="mt-2 text-sm font-semibold text-blue-700">
            {REGION_LABELS[job.region]} · {JOB_CATEGORY_LABELS[job.category]}
          </p>
        </div>
        <StatusBadge tone={job.status === "open" ? "green" : "slate"}>
          {JOB_STATUS_LABELS[job.status]}
        </StatusBadge>
      </div>
      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <InfoItem label="근무일" value={job.workDate} />
        <InfoItem label="근무 시간" value={`${job.startTime} - ${job.endTime}`} />
        <InfoItem label="일당" value={`${job.dailyWage.toLocaleString("ko-KR")}원`} />
        <InfoItem label="모집인원" value={`${job.requiredWorkers}명`} />
        <InfoItem label="지급 조건" value={PAYMENT_OPTION_LABELS[job.paymentOption]} />
      </dl>
      <div className="mt-5">
        <Link
          href={`/worker/jobs/${job.id}`}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#0B1F3A] px-5 text-sm font-bold text-white transition-colors hover:bg-[#12315C]"
        >
          상세 보기
        </Link>
      </div>
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
