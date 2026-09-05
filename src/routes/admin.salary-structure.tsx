import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Save, Wallet } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Avatar,
  Button,
  Card,
  DemoNote,
  Field,
  Input,
  PageHeader,
  SectionTitle,
  Select,
  StatCard,
} from "@/components/hr/UI";
import { EMPLOYEES, computeSalary } from "@/data/mock";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/admin/salary-structure")({
  head: () => ({
    meta: [
      { title: "Salary Structure — STELGROW HR Payroll Admin" },
      {
        name: "description",
        content: "Build employee salary structures with earnings, deductions, gross and net salary.",
      },
      { property: "og:title", content: "Salary Structure — STELGROW HR Payroll Admin" },
      {
        property: "og:description",
        content: "Build employee salary structures with earnings, deductions, gross and net salary.",
      },
    ],
  }),
  component: SalaryStructurePage,
});

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div
      className={
        strong
          ? "flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-foreground"
          : "flex items-center justify-between text-sm"
      }
    >
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span className={strong ? "" : "font-medium text-foreground"}>{value}</span>
    </div>
  );
}

function SalaryStructurePage() {
  const [empId, setEmpId] = useState(EMPLOYEES[0]?.id ?? "");
  const employee = EMPLOYEES.find((e) => e.id === empId) ?? EMPLOYEES[0]!;
  const [basic, setBasic] = useState(employee.basic);
  const [bonus, setBonus] = useState(Math.round(employee.basic * 0.05));
  const [loan, setLoan] = useState(0);
  const [saved, setSaved] = useState(false);

  const s = useMemo(() => computeSalary(basic, { bonus, loan }), [basic, bonus, loan]);

  const pickEmployee = (id: string) => {
    const e = EMPLOYEES.find((x) => x.id === id);
    if (!e) return;
    setEmpId(id);
    setBasic(e.basic);
    setBonus(Math.round(e.basic * 0.05));
    setLoan(0);
    setSaved(false);
  };

  return (
    <AdminShell>
      <PageHeader
        title="Salary Structure"
        subtitle="Define earnings and deductions per employee"
      >
        <Button
          onClick={() => {
            setSaved(true);
            window.setTimeout(() => setSaved(false), 2500);
          }}
        >
          <Save className="h-4 w-4" />
          {saved ? "Structure Saved" : "Save Structure"}
        </Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Gross Salary"
          value={inr(s.gross)}
          icon={<Wallet className="h-5 w-5" />}
          hint="Monthly earnings"
        />
        <StatCard label="Total Deductions" value={inr(s.deductions)} tone="danger" />
        <StatCard label="Net Salary" value={inr(s.net)} tone="success" hint="Take home per month" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <Card>
          <SectionTitle title="Select Employee" subtitle="Structure applies to the chosen employee" />
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-muted/60 p-3">
            <Avatar name={employee.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{employee.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {employee.designation} · {employee.department}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <Field label="Employee">
              <Select value={empId} onChange={(e) => pickEmployee(e.target.value)}>
                {EMPLOYEES.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.id} — {e.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Basic Salary (₹)">
              <Input
                type="number"
                value={basic}
                onChange={(e) => setBasic(Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="Performance Bonus (₹)">
              <Input
                type="number"
                value={bonus}
                onChange={(e) => setBonus(Number(e.target.value) || 0)}
              />
            </Field>
            <Field label="Loan Deduction (₹)">
              <Input
                type="number"
                value={loan}
                onChange={(e) => setLoan(Number(e.target.value) || 0)}
              />
            </Field>
            <DemoNote>
              Amounts recalculate instantly — HRA 40% of basic, PF 12% of basic (capped), ESIC and
              TDS as per demo slabs.
            </DemoNote>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <SectionTitle title="Earnings" subtitle="Monthly components" />
            <div className="space-y-3">
              <Row label="Basic Salary" value={inr(s.basic)} />
              <Row label="House Rent Allowance" value={inr(s.hra)} />
              <Row label="Conveyance Allowance" value={inr(s.conveyance)} />
              <Row label="Medical Allowance" value={inr(s.medical)} />
              <Row label="Special Allowance" value={inr(s.special)} />
              <Row label="Performance Bonus" value={inr(s.bonus)} />
              <Row label="Overtime" value={inr(s.overtime)} />
              <Row label="Gross Salary" value={inr(s.gross)} strong />
            </div>
          </Card>

          <Card>
            <SectionTitle title="Deductions" subtitle="Statutory and other deductions" />
            <div className="space-y-3">
              <Row label="Provident Fund" value={inr(s.pf)} />
              <Row label="ESIC" value={inr(s.esic)} />
              <Row label="Professional Tax" value={inr(s.pt)} />
              <Row label="TDS" value={inr(s.tds)} />
              <Row label="Loan Deduction" value={inr(s.loan)} />
              <Row label="Other Deduction" value={inr(s.other)} />
              <Row label="Total Deductions" value={inr(s.deductions)} strong />
            </div>
          </Card>

          <Card className="md:col-span-2 bg-primary text-primary-foreground">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wide uppercase opacity-80">
                  Net Salary Payable
                </p>
                <p className="mt-1 text-3xl font-semibold">{inr(s.net)}</p>
              </div>
              <p className="max-w-xs text-sm opacity-80">
                Gross {inr(s.gross)} minus deductions {inr(s.deductions)} for {employee.name}.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
