import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Banknote, Download } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Badge,
  BarChart,
  Button,
  Card,
  DemoNote,
  EmptyRow,
  Field,
  PageHeader,
  ProgressRows,
  SectionTitle,
  Select,
  StatCard,
  TableShell,
  Td,
} from "@/components/hr/UI";
import {
  CURRENT_MONTH,
  DEPARTMENT_NAMES,
  MONTHLY_PAYROLL_HISTORY,
  MONTHS,
  PAYROLL,
} from "@/data/mock";
import { compactInr, inr } from "@/lib/format";

export const Route = createFileRoute("/admin/reports/payroll")({
  head: () => ({
    meta: [
      { title: "Payroll Report — STELGROW HR Payroll Admin" },
      {
        name: "description",
        content: "Monthly payroll report with gross salary, deductions, net payroll, paid and pending amounts.",
      },
      { property: "og:title", content: "Payroll Report — STELGROW HR Payroll Admin" },
      {
        property: "og:description",
        content: "Monthly payroll trends, paid vs pending payouts and department distribution.",
      },
    ],
  }),
  component: PayrollReportPage,
});

function PayrollReportPage() {
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [dept, setDept] = useState("All");
  const [notice, setNotice] = useState<string | null>(null);

  const current =
    MONTHLY_PAYROLL_HISTORY.find((m) => m.month === month) ?? MONTHLY_PAYROLL_HISTORY[0]!;

  const rows = useMemo(
    () => PAYROLL.filter((r) => dept === "All" || r.department === dept),
    [dept],
  );

  const byDept = DEPARTMENT_NAMES.map((name) => ({
    label: name,
    value: PAYROLL.filter((r) => r.department === name).reduce((s, r) => s + r.net, 0),
  })).filter((d) => d.value > 0);

  return (
    <AdminShell title="Payroll Report">
      <PageHeader title="Payroll Report" subtitle={`Monthly payroll performance · ${month}`}>
        <Button
          variant="outline"
          onClick={() => {
            setNotice("Demo export: payroll report would download as CSV.");
            window.setTimeout(() => setNotice(null), 2500);
          }}
        >
          <Download className="h-4 w-4" /> Export
        </Button>
      </PageHeader>

      <DemoNote>Payroll figures are mock data illustrating a six-month payroll cycle.</DemoNote>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Gross Salary" value={inr(current.gross)} icon={<Banknote className="h-5 w-5" />} />
        <StatCard label="Deductions" value={inr(current.deductions)} tone="danger" />
        <StatCard label="Net Payroll" value={inr(current.net)} tone="info" />
        <StatCard label="Paid" value={inr(current.paid)} tone="success" />
        <StatCard label="Pending" value={inr(current.pending)} tone="warning" />
      </div>

      <Card className="mt-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Month">
            <Select value={month} onChange={(e) => setMonth(e.target.value)}>
              {MONTHS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </Select>
          </Field>
          <Field label="Department">
            <Select value={dept} onChange={(e) => setDept(e.target.value)}>
              <option>All</option>
              {DEPARTMENT_NAMES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </Select>
          </Field>
        </div>
      </Card>

      {notice ? (
        <p className="mt-4 rounded-lg bg-success-soft px-4 py-3 text-sm font-medium text-success">{notice}</p>
      ) : null}

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <SectionTitle title="Net payroll trend" subtitle="Last six payroll cycles" />
          <BarChart
            data={[...MONTHLY_PAYROLL_HISTORY]
              .reverse()
              .map((m) => ({ label: m.month.slice(0, 3), value: m.net, caption: compactInr(m.net) }))}
          />
        </Card>
        <Card>
          <SectionTitle title="Department payroll distribution" subtitle="Net salary by department" />
          <ProgressRows data={byDept} formatValue={compactInr} />
        </Card>
      </div>

      <div className="mt-6">
        <SectionTitle title="Monthly payroll summary" subtitle="Gross, deductions and settlement status" />
        <TableShell head={["Month", "Gross Salary", "Deductions", "Net Payroll", "Paid", "Pending", "Status"]}>
          {MONTHLY_PAYROLL_HISTORY.map((m) => (
            <tr key={m.month} className="hover:bg-muted/40">
              <Td className="font-medium text-foreground">{m.month}</Td>
              <Td>{inr(m.gross)}</Td>
              <Td className="text-danger">-{inr(m.deductions)}</Td>
              <Td className="font-semibold">{inr(m.net)}</Td>
              <Td className="text-success">{inr(m.paid)}</Td>
              <Td className="text-warning-foreground">{inr(m.pending)}</Td>
              <Td>
                <Badge>{m.pending > 0 ? "Pending" : "Paid"}</Badge>
              </Td>
            </tr>
          ))}
        </TableShell>
      </div>

      <div className="mt-6">
        <SectionTitle
          title="Employee payroll detail"
          subtitle={dept === "All" ? "All departments" : dept}
        />
        <TableShell head={["Employee ID", "Employee", "Department", "Gross", "Deductions", "Net Salary", "Status"]}>
          {rows.length === 0 ? (
            <EmptyRow colSpan={7} />
          ) : (
            rows.map((r) => (
              <tr key={r.employeeId} className="hover:bg-muted/40">
                <Td className="text-muted-foreground">{r.employeeId}</Td>
                <Td className="font-medium text-foreground">{r.name}</Td>
                <Td className="text-muted-foreground">{r.department}</Td>
                <Td>{inr(r.gross)}</Td>
                <Td className="text-danger">-{inr(r.deductions)}</Td>
                <Td className="font-semibold">{inr(r.net)}</Td>
                <Td>
                  <Badge>{r.status}</Badge>
                </Td>
              </tr>
            ))
          )}
        </TableShell>
      </div>
    </AdminShell>
  );
}
