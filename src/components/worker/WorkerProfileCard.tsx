import { StatusBadge } from "@/components/common/StatusBadge";
import type { JobCategory } from "@/constants/jobCategory";
import type { PaymentOption } from "@/constants/paymentOption";
import type { Region } from "@/constants/region";
import type { JobApplication } from "@/types/application";
import type { WorkerProfile } from "@/types/worker";

type WorkerProfileCardProps = {
  worker: WorkerProfile;
  recentApplications: JobApplication[];
};

const workerNameById: Record<string, string> = {
  "worker-001": "김민수",
  "worker-002": "박철호",
  "worker-003": "이정훈"
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

function maskPhone(phone: string) {
  const parts = phone.split("-");
  if (parts.length !== 3) {
    return "연락처 확인 예정";
  }

  return `${parts[0]}-****-${parts[2]}`;
}

export function WorkerProfileCard({ worker, recentApplications }: WorkerProfileCardProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
        <p className="text-sm font-bold text-blue-700">내 기본 정보</p>
        <h2 className="mt-3 text-2xl font-bold text-[#071B3A] sm:text-3xl">
          {workerNameById[worker.id] ?? worker.name}
        </h2>
        <dl className="mt-5 space-y-2 text-sm sm:mt-6">
          <InfoItem label="연락처" value={maskPhone(worker.phone)} />
          <InfoItem
            label="선호 직종"
            value={worker.jobCategories.map((category) => jobCategoryLabels[category]).join(", ")}
            strong
          />
          <InfoItem
            label="선호 지역"
            value={worker.preferredRegions.map((region) => regionLabels[region]).join(", ")}
            strong
          />
          <InfoItem
            label="선호 지급 조건"
            value={paymentOptionLabels[worker.preferredPaymentOption]}
            strong
          />
          <InfoItem label="경력" value={`${worker.experienceYears}년`} />
        </dl>
      </section>
      <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-950/5 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">최근 지원 내역</p>
            <h2 className="mt-2 text-2xl font-bold text-[#071B3A]">
              지원 상태 요약
            </h2>
          </div>
          <StatusBadge tone="blue">{recentApplications.length}건</StatusBadge>
        </div>
        <div className="mt-4 space-y-3 sm:mt-5">
          {recentApplications.slice(0, 3).map((application) => (
            <div key={application.id} className="rounded-lg bg-blue-50 px-4 py-3">
              <p className="font-bold text-[#071B3A]">
                {new Date(application.appliedAt).toLocaleDateString("ko-KR")} 지원
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                출근 확정 여부는 지원한 일자리 화면에서 확인하세요.
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-lg bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          출근 전에는 근무일, 현장 위치, 지급 조건을 다시 확인하세요. 실제 계정 기능은
          이후 단계에서 연결됩니다.
        </p>
      </section>
    </div>
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
