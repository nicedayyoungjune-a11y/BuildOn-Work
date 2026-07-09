import { CompanyApplicantList } from "@/components/company/CompanyApplicantList";
import { CompanyPageShell } from "@/components/company/CompanyPageShell";
import { CompanySummaryCards } from "@/components/company/CompanySummaryCards";
import { mockApplications } from "@/data/mockApplications";
import { mockAssignments } from "@/data/mockAssignments";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";
import { mockWorkers } from "@/data/mockWorkers";

export default function CompanyApplicantsPage() {
  const confirmedApplications = mockApplications.filter(
    (application) => application.status === "accepted"
  );

  return (
    <CompanyPageShell
      title="지원자 확인"
      description="지원자와 출근 확정 상태를 확인하세요."
      activeKey="applicants"
    >
      <CompanySummaryCards
        items={[
          {
            label: "지원자",
            value: `${mockApplications.length}명`,
            description: "현장에서 확인할 지원자입니다."
          },
          {
            label: "출근 확정",
            value: `${confirmedApplications.length}명`,
            description: "출근 예정자로 확정된 지원자입니다."
          },
          {
            label: "확인 예정",
            value: `${mockApplications.length - confirmedApplications.length}명`,
            description: "아직 확인이 필요한 지원자입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <CompanyApplicantList
          applications={mockApplications}
          jobs={mockJobs}
          sites={mockSites}
          workers={mockWorkers}
          assignments={mockAssignments}
        />
      </div>
    </CompanyPageShell>
  );
}
