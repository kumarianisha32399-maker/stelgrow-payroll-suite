import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Search, Wallet } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Button,
  Card,
  DemoNote,
  EmptyRow,
  Field,
  Input,
  PageHeader,
  ProgressRows,
  Select,
  SectionTitle,
  StatCard,
  TableShell,
  Td,
} from "@/components/hr/UI";
import { CURRENT_MONTH, DEPARTMENT_NAMES, EMPLOYEES, MONTHS, computeSalary } from "@/data/mock";
import { compactInr, inr } from "@/lib/format";

export const Route = createFileRoute("/admin/reports/salary")({
  head: () => ({
    meta: [
      { title: "Salary Report — STELGROW HR Payroll Admin" },
      {
        name: "description",
        content: "Employee-wise and department-wise salary report with gross salary, deductions and net pay.",
      },
      { property: "og:title", content: "Salary Report — STELGROW HR Payroll Admin" },
      {
        property: "og:description",
        content: "Employee-wise and department-wise salary reporting for monthly payroll review.",
      },
    ],
  }),
  component: SalaryReportPage,
});

function SalaryReportPage() {
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [dept, setDept] = useState("All");
  const [q, setQ] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      EMPLOYEES.filter((e) => e.status === "Active").map((e, i) => {
        const s = computeSalary(e.basic, { loan: i % 5 === 0 ? 2500 : 0 });
        return { ...e, gross: s.gross, deductions: s.deductions, net: s.net };
      }),
    [],
  );

  const filtered = rows.filter(
    (r) =>
      (dept === "All" || r.department === dept) &&
      `${r.name} ${r.id}`.toLowerCase().includes(q.trim().toLowerCase()),
  );

  const totals = filtered.reduce(
    (a, r) => ({ gross: a.gross + r.gross, ded: a.ded + r.deductions, net: a.net + r.net }),
    { gross: 0, ded: 0, net: 0 },
  );

  const byDept = DEPARTMENT_NAMES.map((name) => ({
    label: name,
    value: filtered.filter((r) => r.department === name).reduce((s, r) => s + r.net, 0),
  })).filter((d) => d.value > 0);

  return (
    <AdminShell title="Salary Report">
      <PageHeader title="Salary Report" subtitle={`Employee and department salary breakdown · ${month}`}>
        <Button
          variant="outline"
          onClick={() => {
            setNotice("Demo export: salary report would download as CSV.");
            window.setTimeout(() => setNotice(null), 2500);
          }}
        >
          <Download className="h-4 w-4" /> Export
        </Button>
      </PageHeader>

      <DemoNote>All figures are generated from mock salary structures for demonstration purposes.</DemoNote>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Employees" value={String(filtered.length)} icon={<Wallet className="h-5 w-5" />} />
        <StatCard label="Gross Salary" value={inr(totals.gross)} tone="info" />
        <StatCard label="Total Deductions" value={inr(totals.ded)} tone="danger" />
        <StatCard label="Net Salary" value={inr(totals.net)} tone="success" />
      </div>

      <Card className="mt-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
          <Field label="Search employee">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or ID" className="pl-9" />
            </div>
          </Field>
        </div>
      </Card>

      {notice ? (
        <p className="mt-4 rounded-lg bg-success-soft px-4 py-3 text-sm font-medium text-success">{notice}</p>
      ) : null}

      <Card className="mt-6">
        <SectionTitle title="Department-wise net salary" subtitle="Total monthly net payout per department" />
        <ProgressRows data={byDept} formatValue={compactInr} />
      </Card>

      <div className="mt-6">
        <TableShell
          head={["Employee ID", "Employee", "Department", "Designation", "Basic", "Gross", "Deductions", "Net Salary"]}
        >
          {filtered.length === 0 ? (
            <EmptyRow colSpan={8} />
          ) : (
            filtered.map((r) => (
              <tr key={r.id} className="hover:bg-muted/40">
                <Td className="text-muted-foreground">{r.id}</Td>
                <Td className="font-medium text-foreground">{r.name}</Td>
                <Td className="text-muted-foreground">{r.department}</Td>
                <Td className="text-muted-foreground">{r.designation}</Td>
                <Td>{inr(r.basic)}</Td>
                <Td>{inr(r.gross)}</Td>
                <Td className="text-danger">-{inr(r.deductions)}</Td>
                <Td className="font-semibold">{inr(r.net)}</Td>
              </tr>
            ))
          )}
        </TableShell>
      </div>
    </AdminShell>
  );
}
