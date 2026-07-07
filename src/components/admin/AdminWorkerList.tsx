import { StatusBadge } from "@/components/common/StatusBadge";
import type { JobApplication } from "@/types/application";
import type { WorkerProfile } from "@/types/worker";

type AdminWorkerListProps = {
  workers: WorkerProfile[];
  applications: JobApplication[];
};

const workerNameById: Record<string, string> = {
  "worker-001": "김민수",
  "worker-002": "박철호",
  "worker-003": "이정훈"
};

const regionLabels: Record<string, string> = {
  gyeonggi_suwon: "경기 수원",
  gyeonggi_hwaseong: "경기 화성",
  gyeonggi_pyeongtaek: "경기 평택",
  chungcheong_cheonan: "충남 천안",
  chungcheong_daejeon: "대전",
  chungcheong_sejong: "세종"
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

export function AdminWorkerList({ workers, applications }: AdminWorkerListProps) {
  return (
    <section className="space-y-3 sm:space-y-4">
      {workers.map((worker) => {
        const workerApplications = applications.filter(
          (application) => application.workerId === worker.id
        );

        return (
          <article
            key={worker.id}
            className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <StatusBadge tone="blue">근로자</StatusBadge>
                <h2 className="mt-3 text-xl font-bold text-[#071B3A] sm:text-2xl">
                  {workerNameById[worker.id] ?? worker.name}
                </h2>
                <p className="mt-2 text-sm font-semibold text-blue-700">{worker.phone}</p>
              </div>
              <div className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-white sm:text-right">
                <p className="text-xs font-semibold text-blue-100">지원 내역</p>
                <p className="mt-1 text-2xl font-bold">{workerApplications.length}건</p>
              </div>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem label="선호 지역" value={worker.preferredRegions.map((region) => regionLabels[region] ?? region).join(", ")} />
              <InfoItem label="선호 직종" value={worker.jobCategories.map((category) => categoryLabels[category] ?? category).join(", ")} />
              <InfoItem label="선호 지급 조건" value={paymentLabels[worker.preferredPaymentOption]} />
              <InfoItem label="경력" value={`${worker.experienceYears}년`} />
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
