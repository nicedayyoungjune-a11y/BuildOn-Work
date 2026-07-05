import Link from "next/link";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { ApplicationStatus } from "@/constants/applicationStatus";
import type { JobCategory } from "@/constants/jobCategory";
import type { PaymentOption } from "@/constants/paymentOption";
import type { Region } from "@/constants/region";
import type { Assignment } from "@/types/assignment";
import type { JobApplication } from "@/types/application";
import type { JobPost } from "@/types/job";

type WorkerApplicationItem = {
  application: JobApplication;
  job?: JobPost;
  assignment?: Assignment;
};

type WorkerApplicationListProps = {
  items: WorkerApplicationItem[];
};

const applicationStatusLabels: Record<ApplicationStatus, string> = {
  submitted: "지원 완료",
  accepted: "출근 확정",
  rejected: "마감",
  cancelled: "취소"
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

export function WorkerApplicationList({ items }: WorkerApplicationListProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      {items.map(({ application, job, assignment }) => (
        <article
          key={application.id}
          className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone={application.status === "accepted" ? "green" : "blue"}>
                  {applicationStatusLabels[application.status]}
                </StatusBadge>
                <StatusBadge tone={assignment ? "green" : "slate"}>
                  {assignment ? "출근 확정" : "확인 중"}
                </StatusBadge>
              </div>
              <h2 className="mt-3 text-xl font-bold text-[#071B3A]">
                {job ? jobTitleById[job.id] ?? job.title : "일자리 확인 중"}
              </h2>
              {job ? (
                <p className="mt-2 text-sm font-semibold text-blue-700">
                  {regionLabels[job.region]} · {jobCategoryLabels[job.category]}
                </p>
              ) : null}
            </div>
            {job ? (
              <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
                <p className="text-xs font-semibold text-blue-100">일당</p>
                <p className="mt-1 text-2xl font-bold">
                  {job.dailyWage.toLocaleString("ko-KR")}원
                </p>
              </div>
            ) : null}
          </div>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem label="근무일" value={job?.workDate ?? "확인 중"} />
            <InfoItem
              label="지원일"
              value={new Date(application.appliedAt).toLocaleDateString("ko-KR")}
            />
            <InfoItem label="지급 조건" value={job ? paymentOptionLabels[job.paymentOption] : "확인 중"} />
            <InfoItem label="출근 상태" value={assignment ? "출근 확정" : "확인 중"} />
          </dl>
          {job ? (
            <Link
              href={`/worker/jobs/${job.id}`}
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-blue-100 bg-blue-50 px-5 text-sm font-bold text-blue-800 transition-colors hover:bg-blue-100 sm:w-auto"
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
    <div className="rounded-lg bg-blue-50 px-3 py-3 sm:px-4">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 font-bold text-[#071B3A]">{value}</dd>
    </div>
  );
}
