import { JOB_CATEGORY_LABELS } from "@/constants/jobCategory";
import { PAYMENT_OPTION_LABELS } from "@/constants/paymentOption";
import { REGION_LABELS } from "@/constants/region";
import type { JobApplication } from "@/types/application";
import type { WorkerProfile } from "@/types/worker";
import { StatusBadge } from "@/components/common/StatusBadge";

type WorkerProfileCardProps = {
  worker: WorkerProfile;
  recentApplications: JobApplication[];
};

export function WorkerProfileCard({ worker, recentApplications }: WorkerProfileCardProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
        <p className="text-sm font-bold text-blue-700">근로자 기본 정보</p>
        <h2 className="mt-3 text-3xl font-bold text-[#071B3A]">{worker.name}</h2>
        <dl className="mt-6 space-y-3 text-sm">
          <InfoItem label="연락처" value={worker.phone} />
          <InfoItem
            label="선호 직종"
            value={worker.jobCategories.map((category) => JOB_CATEGORY_LABELS[category]).join(", ")}
          />
          <InfoItem
            label="선호 지역"
            value={worker.preferredRegions.map((region) => REGION_LABELS[region]).join(", ")}
          />
          <InfoItem
            label="선호 지급 조건"
            value={PAYMENT_OPTION_LABELS[worker.preferredPaymentOption]}
          />
          <InfoItem label="경력" value={`${worker.experienceYears}년`} />
        </dl>
      </section>
      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-lg shadow-blue-950/5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">최근 지원 내역</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">
              지원한 일자리 요약
            </h2>
          </div>
          <StatusBadge tone="blue">{recentApplications.length}건</StatusBadge>
        </div>
        <div className="mt-5 space-y-3">
          {recentApplications.slice(0, 3).map((application) => (
            <div key={application.id} className="rounded-xl bg-blue-50 px-4 py-3">
              <p className="font-bold text-[#071B3A]">
                {new Date(application.appliedAt).toLocaleDateString("ko-KR")} 지원
              </p>
              <p className="mt-1 text-sm text-slate-600">
                지원 상태와 출근 확정 여부는 지원한 일자리 화면에서 확인하세요.
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          현재 화면은 mock 데이터 기반 정적 화면입니다. 개인정보 수정이나 저장 기능은
          아직 연결하지 않았습니다.
        </p>
      </section>
    </div>
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
