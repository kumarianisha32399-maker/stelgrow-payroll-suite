import { createFileRoute } from "@tanstack/react-router";
import { Users, UserCheck, CalendarDays, Banknote, Clock, Building2 } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Card,
  PageHeader,
  SectionTitle,
  StatCard,
  TableShell,
  Td,
  Badge,
  BarChart,
  DonutChart,
  ProgressRows,
  DemoNote,
} from "@/components/hr/UI";
import {
  ATTENDANCE_OVERVIEW,
  CURRENT_MONTH,
  DEPARTMENT_SALARY,
  PAYROLL,
  PAYROLL_TREND,
} from "@/data/mock";
import { compactInr, inr } from "@/lib/format";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — STELGROW HR Payroll Admin" },
      { name: "description", content: "Payroll and HR analytics dashboard with employee, attendance and salary metrics." },
      { property: "og:title", content: "Dashboard — STELGROW HR Payroll Admin" },
      { property: "og:description", content: "Payroll and HR analytics dashboard with employee, attendance and salary metrics." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const recent = PAYROLL.slice(0, 8);

  return (
    <AdminShell>
      <PageHeader title="Dashboard" subtitle={`Payroll overview for ${CURRENT_MONTH}`} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Employees" value="250" hint="Across 12 departments" icon={<Users className="h-5 w-5" />} />
        <StatCard label="Present Today" value="232" hint="92.8% attendance" tone="success" icon={<UserCheck className="h-5 w-5" />} />
        <StatCard label="On Leave" value="12" hint="Approved leave today" tone="warning" icon={<CalendarDays className="h-5 w-5" />} />
        <StatCard label="Monthly Payroll" value={inr(1850000)} hint="Net salary payable" icon={<Banknote className="h-5 w-5" />} />
        <StatCard label="Pending Payroll" value={inr(240000)} hint="Awaiting processing" tone="warning" icon={<Clock className="h-5 w-5" />} />
        <StatCard label="Departments" value="12" hint="8 active business units" icon={<Building2 className="h-5 w-5" />} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <SectionTitle title="Monthly Payroll Overview" subtitle="Net payroll disbursed per month" />
          <BarChart data={PAYROLL_TREND.map((p) => ({ label: p.month, value: p.value, caption: p.label }))} />
        </Card>
        <Card>
          <SectionTitle title="Attendance Overview" subtitle="Today across the organisation" />
          <DonutChart data={ATTENDANCE_OVERVIEW} />
        </Card>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <Card>
          <SectionTitle title="Department Salary Distribution" subtitle="Monthly gross by department" />
          <ProgressRows
            data={DEPARTMENT_SALARY.map((d) => ({ label: d.name, value: d.value }))}
            formatValue={compactInr}
          />
        </Card>

        <div className="xl:col-span-2">
          <SectionTitle title="Recent Payroll Activity" subtitle={`Latest salary runs for ${CURRENT_MONTH}`} />
          <TableShell head={["Employee", "Month", "Gross Salary", "Deduction", "Net Salary", "Status"]}>
            {recent.map((r) => (
              <tr key={r.employeeId} className="hover:bg-muted/50">
                <Td>
                  <span className="font-medium text-foreground">{r.name}</span>
                  <span className="block text-xs text-muted-foreground">{r.employeeId}</span>
                </Td>
                <Td className="text-muted-foreground">{CURRENT_MONTH}</Td>
                <Td>{inr(r.gross)}</Td>
                <Td className="text-danger">{inr(r.deductions)}</Td>
                <Td className="font-semibold">{inr(r.net)}</Td>
                <Td>
                  <Badge>{r.status}</Badge>
                </Td>
              </tr>
            ))}
          </TableShell>
          <div className="mt-3">
            <DemoNote>All figures are demo data generated for this software presentation.</DemoNote>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
