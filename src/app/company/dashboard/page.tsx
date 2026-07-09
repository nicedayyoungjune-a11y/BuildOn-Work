import { CompanyDashboardOverview } from "@/components/company/CompanyDashboardOverview";
import { CompanyPageShell } from "@/components/company/CompanyPageShell";
import { CompanySummaryCards } from "@/components/company/CompanySummaryCards";
import { mockApplications } from "@/data/mockApplications";
import { mockAssignments } from "@/data/mockAssignments";
import { mockAttendance } from "@/data/mockAttendance";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";

export default function CompanyDashboardPage() {
  const neededWorkers = mockJobs.reduce((sum, job) => sum + job.requiredWorkers, 0);
  const scheduledWorkers = mockAssignments.length;
  const checkedInWorkers = mockAttendance.filter(
    (record) => record.status === "checked_in"
  ).length;
  const absentWorkers = mockAttendance.filter((record) => record.status === "absent").length;

  return (
    <CompanyPageShell
      title="현장관리"
      description="오늘 필요한 인원과 출근 현황을 한눈에 확인하세요."
      activeKey="dashboard"
    >
      <CompanySummaryCards
        items={[
          {
            label: "오늘 필요한 인원",
            value: `${neededWorkers}명`,
            description: "등록된 일자리 기준으로 필요한 전체 인원입니다."
          },
          {
            label: "지원자",
            value: `${mockApplications.length}명`,
            description: "오늘 확인할 지원자입니다."
          },
          {
            label: "출근 예정자",
            value: `${scheduledWorkers}명`,
            description: "출근이 확정된 인원입니다."
          },
          {
            label: "출근 완료",
            value: `${checkedInWorkers}명`,
            description: "현장 도착이 확인된 인원입니다."
          },
          {
            label: "미출근",
            value: `${absentWorkers}명`,
            description: "출근 확인이 필요한 인원입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <CompanyDashboardOverview
          sites={mockSites}
          jobs={mockJobs}
          applications={mockApplications}
          assignments={mockAssignments}
          attendance={mockAttendance}
        />
      </div>
    </CompanyPageShell>
  );
}
