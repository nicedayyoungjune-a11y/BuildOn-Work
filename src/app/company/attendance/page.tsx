import { CompanyAttendanceList } from "@/components/company/CompanyAttendanceList";
import { CompanyPageShell } from "@/components/company/CompanyPageShell";
import { CompanySummaryCards } from "@/components/company/CompanySummaryCards";
import { mockAssignments } from "@/data/mockAssignments";
import { mockAttendance } from "@/data/mockAttendance";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";
import { mockWorkers } from "@/data/mockWorkers";

export default function CompanyAttendancePage() {
  const checkedIn = mockAttendance.filter((record) => record.status === "checked_in").length;
  const completed = mockAttendance.filter((record) => record.status === "completed").length;
  const absent = mockAttendance.filter((record) => record.status === "absent").length;

  return (
    <CompanyPageShell
      title="출근 현황"
      description="현장별 출근 예정자와 출근 완료 인원을 확인하세요."
      activeKey="attendance"
    >
      <CompanySummaryCards
        items={[
          {
            label: "출근 예정자",
            value: `${mockAssignments.length}명`,
            description: "출근이 확정된 인원입니다."
          },
          {
            label: "출근 완료",
            value: `${checkedIn}명`,
            description: "현장 도착이 확인된 인원입니다."
          },
          {
            label: "미출근",
            value: `${absent}명`,
            description: "아직 출근 확인이 안 된 인원입니다."
          },
          {
            label: "근무 완료",
            value: `${completed}명`,
            description: "근무가 끝난 인원입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <CompanyAttendanceList
          attendance={mockAttendance}
          assignments={mockAssignments}
          jobs={mockJobs}
          sites={mockSites}
          workers={mockWorkers}
        />
      </div>
    </CompanyPageShell>
  );
}
