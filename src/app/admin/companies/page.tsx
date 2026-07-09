import { AdminCompanyList } from "@/components/admin/AdminCompanyList";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { AdminSummaryCards } from "@/components/admin/AdminSummaryCards";
import { mockCompanies } from "@/data/mockCompanies";
import { mockJobs } from "@/data/mockJobs";
import { mockSites } from "@/data/mockSites";

export default function AdminCompaniesPage() {
  return (
    <AdminPageShell
      title="건설사 현황"
      description="건설사, 담당자, 등록 현장과 일자리 현황을 확인하세요."
      activeKey="companies"
    >
      <AdminSummaryCards
        items={[
          {
            label: "전체 건설사",
            value: `${mockCompanies.length}곳`,
            description: "등록된 건설사 수입니다."
          },
          {
            label: "등록 현장",
            value: `${mockSites.length}곳`,
            description: "건설사가 등록한 현장입니다."
          },
          {
            label: "등록 일자리",
            value: `${mockJobs.length}건`,
            description: "건설사가 등록한 일자리입니다."
          }
        ]}
      />
      <div className="mt-5 sm:mt-6">
        <AdminCompanyList companies={mockCompanies} sites={mockSites} jobs={mockJobs} />
      </div>
    </AdminPageShell>
  );
}
