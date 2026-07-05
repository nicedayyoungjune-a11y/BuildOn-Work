import Link from "next/link";
import { APPLICATION_STATUS_LABELS } from "@/constants/applicationStatus";
import { JOB_CATEGORY_LABELS } from "@/constants/jobCategory";
import { PAYMENT_OPTION_LABELS } from "@/constants/paymentOption";
import { REGION_LABELS } from "@/constants/region";
import type { Assignment } from "@/types/assignment";
import type { JobApplication } from "@/types/application";
import type { JobPost } from "@/types/job";
import { StatusBadge } from "@/components/common/StatusBadge";

type WorkerApplicationItem = {
  application: JobApplication;
  job?: JobPost;
  assignment?: Assignment;
};

type WorkerApplicationListProps = {
  items: WorkerApplicationItem[];
};

export function WorkerApplicationList({ items }: WorkerApplicationListProps) {
  return (
    <section className="space-y-4">
      {items.map(({ application, job, assignment }) => (
        <article
          key={application.id}
          className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#071B3A]">
                {job?.title ?? "일자리 정보 확인 중"}
              </h2>
              {job ? (
                <p className="mt-2 text-sm font-semibold text-blue-700">
                  {REGION_LABELS[job.region]} · {JOB_CATEGORY_LABELS[job.category]}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone={application.status === "accepted" ? "green" : "blue"}>
                {APPLICATION_STATUS_LABELS[application.status]}
              </StatusBadge>
              <StatusBadge tone={assignment ? "green" : "slate"}>
                {assignment ? "출근 확정" : "출근 미확정"}
              </StatusBadge>
            </div>
          </div>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem label="근무일" value={job?.workDate ?? "확인 중"} />
            <InfoItem
              label="지원일"
              value={new Date(application.appliedAt).toLocaleDateString("ko-KR")}
            />
            <InfoItem
              label="일당"
              value={job ? `${job.dailyWage.toLocaleString("ko-KR")}원` : "확인 중"}
            />
            <InfoItem
              label="지급 조건"
              value={job ? PAYMENT_OPTION_LABELS[job.paymentOption] : "확인 중"}
            />
          </dl>
          {job ? (
            <Link
              href={`/worker/jobs/${job.id}`}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md border border-blue-100 bg-blue-50 px-5 text-sm font-bold text-blue-800 transition-colors hover:bg-blue-100"
            >
              일자리 다시 보기
            </Link>
          ) : null}
        </article>
      ))}
    </section>
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
