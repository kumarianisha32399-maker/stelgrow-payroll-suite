import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Eye, FileText, Printer, Search } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Badge,
  Button,
  Card,
  DemoNote,
  EmptyRow,
  Field,
  Input,
  Modal,
  PageHeader,
  Select,
  StatCard,
  TableShell,
  Td,
} from "@/components/hr/UI";
import {
  COMPANY,
  CURRENT_MONTH,
  EMPLOYEES,
  MONTHS,
  computeSalary,
  type Employee,
} from "@/data/mock";
import { formatDate, inr, rupeesInWords } from "@/lib/format";

export const Route = createFileRoute("/admin/payslips")({
  head: () => ({
    meta: [
      { title: "Payslips — STELGROW HR Payroll Admin" },
      {
        name: "description",
        content: "Search, preview and print professional monthly employee payslips with earnings and deductions.",
      },
      { property: "og:title", content: "Payslips — STELGROW HR Payroll Admin" },
      {
        property: "og:description",
        content: "Search, preview and print professional monthly employee payslips.",
      },
    ],
  }),
  component: PayslipsPage,
});

type Slip = {
  employee: Employee;
  month: string;
  gross: number;
  deductions: number;
  net: number;
  status: "Paid" | "Pending" | "Processing";
};

const STATUS_PATTERN: Slip["status"][] = ["Paid", "Paid", "Processing", "Paid", "Pending"];

function PayslipsPage() {
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [preview, setPreview] = useState<Slip | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const slips = useMemo<Slip[]>(
    () =>
      EMPLOYEES.filter((e) => e.status === "Active").map((e, i) => {
        const s = computeSalary(e.basic, { loan: i % 5 === 0 ? 2500 : 0 });
        return {
          employee: e,
          month,
          gross: s.gross,
          deductions: s.deductions,
          net: s.net,
          status: STATUS_PATTERN[i % STATUS_PATTERN.length] ?? "Paid",
        };
      }),
    [month],
  );

  const filtered = slips.filter((s) => {
    const text = `${s.employee.name} ${s.employee.id}`.toLowerCase();
    return text.includes(q.trim().toLowerCase()) && (status === "All" || s.status === status);
  });

  const totals = filtered.reduce(
    (acc, s) => ({ gross: acc.gross + s.gross, ded: acc.ded + s.deductions, net: acc.net + s.net }),
    { gross: 0, ded: 0, net: 0 },
  );

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2500);
  }

  return (
    <AdminShell title="Payslips">
      <PageHeader title="Payslips" subtitle={`Generated payslips for ${month}`}>
        <Select value={month} onChange={(e) => setMonth(e.target.value)} className="w-44">
          {MONTHS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </Select>
        <Button variant="outline" onClick={() => flash("Demo export: payslip archive would download here.")}>
          <Download className="h-4 w-4" /> Export All
        </Button>
      </PageHeader>

      <DemoNote>
        Payslips are generated from mock salary structures. Printing uses your browser; downloads are
        demonstration-only because this prototype has no backend.
      </DemoNote>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Payslips" value={String(filtered.length)} hint={month} icon={<FileText className="h-5 w-5" />} />
        <StatCard label="Total Gross" value={inr(totals.gross)} tone="info" />
        <StatCard label="Total Deductions" value={inr(totals.ded)} tone="danger" />
        <StatCard label="Total Net Paid" value={inr(totals.net)} tone="success" />
      </div>

      <Card className="mt-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Search employee / ID">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rahul Sharma or STG-1001"
                className="pl-9"
              />
            </div>
          </Field>
          <Field label="Month">
            <Select value={month} onChange={(e) => setMonth(e.target.value)}>
              {MONTHS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              {["All", "Paid", "Pending", "Processing"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </Field>
        </div>
      </Card>

      {notice ? (
        <p className="mt-4 rounded-lg bg-success-soft px-4 py-3 text-sm font-medium text-success">{notice}</p>
      ) : null}

      <div className="mt-6">
        <TableShell head={["Employee", "Month", "Gross Salary", "Deductions", "Net Salary", "Status", "Actions"]}>
          {filtered.length === 0 ? (
            <EmptyRow colSpan={7} />
          ) : (
            filtered.map((s) => (
              <tr key={s.employee.id} className="hover:bg-muted/40">
                <Td>
                  <span className="block font-medium text-foreground">{s.employee.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {s.employee.id} · {s.employee.department}
                  </span>
                </Td>
                <Td className="text-muted-foreground">{s.month}</Td>
                <Td>{inr(s.gross)}</Td>
                <Td className="text-danger">-{inr(s.deductions)}</Td>
                <Td className="font-semibold">{inr(s.net)}</Td>
                <Td>
                  <Badge>{s.status}</Badge>
                </Td>
                <Td>
                  <div className="flex items-center gap-1.5">
                    <Button size="sm" variant="outline" onClick={() => setPreview(s)}>
                      <Eye className="h-3.5 w-3.5" /> View
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => window.print()}>
                      <Printer className="h-3.5 w-3.5" /> Print
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => flash(`Demo download started for ${s.employee.name}'s payslip.`)}
                    >
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  </div>
                </Td>
              </tr>
            ))
          )}
        </TableShell>
      </div>

      <Modal
        open={preview !== null}
        onClose={() => setPreview(null)}
        title="Salary Slip"
        subtitle={preview ? `${preview.employee.name} · ${preview.month}` : undefined}
        wide
        footer={
          <>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button onClick={() => setPreview(null)}>Close</Button>
          </>
        }
      >
        {preview ? <Payslip slip={preview} /> : null}
      </Modal>
    </AdminShell>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div
      className={
        strong
          ? "flex items-center justify-between border-t border-border px-4 py-2.5 text-sm font-semibold text-foreground"
          : "flex items-center justify-between px-4 py-2 text-sm"
      }
    >
      <span className={strong ? "" : "text-muted-foreground"}>{label}</span>
      <span className={strong ? "" : "font-medium text-foreground"}>{value}</span>
    </div>
  );
}

function Payslip({ slip }: { slip: Slip }) {
  const e = slip.employee;
  const s = computeSalary(e.basic, { loan: 0 });

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-5 text-center">
        <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">{COMPANY.name}</h2>
        <p className="mx-auto mt-1 max-w-lg text-xs text-muted-foreground">{COMPANY.address}</p>
        <p className="mt-1 text-xs text-muted-foreground">CIN: {COMPANY.cin}</p>
        <p className="mt-3 inline-block rounded-md bg-muted px-4 py-1.5 text-sm font-semibold tracking-wide text-foreground uppercase">
          Salary Slip
        </p>
        <p className="mt-2 text-xs font-semibold text-muted-foreground">Month: {slip.month}</p>
      </div>

      <dl className="grid gap-x-6 gap-y-3 border-b border-border px-5 py-5 text-sm sm:grid-cols-2">
        {[
          ["Employee Name", e.name],
          ["Employee ID", e.id],
          ["Department", e.department],
          ["Designation", e.designation],
          ["Joining Date", formatDate(e.joiningDate)],
          ["PAN", e.pan],
          ["Bank Account", `${e.bankName} · ${e.accountNumber}`],
          ["UAN", e.uan],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 sm:block">
            <dt className="text-xs font-semibold text-muted-foreground">{k}</dt>
            <dd className="text-right font-medium text-foreground sm:mt-0.5 sm:text-left">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-0 sm:grid-cols-2">
        <div className="border-b border-border sm:border-r sm:border-b-0">
          <p className="bg-muted/70 px-4 py-2 text-xs font-bold tracking-wide text-muted-foreground uppercase">
            Earnings
          </p>
          <Row label="Basic Salary" value={inr(s.basic)} />
          <Row label="HRA" value={inr(s.hra)} />
          <Row label="Conveyance" value={inr(s.conveyance)} />
          <Row label="Medical Allowance" value={inr(s.medical)} />
          <Row label="Special Allowance" value={inr(s.special)} />
          <Row label="Performance Bonus" value={inr(s.bonus)} />
          <Row label="Overtime" value={inr(s.overtime)} />
          <Row label="Gross Earnings" value={inr(s.gross)} strong />
        </div>
        <div>
          <p className="bg-muted/70 px-4 py-2 text-xs font-bold tracking-wide text-muted-foreground uppercase">
            Deductions
          </p>
          <Row label="Provident Fund" value={inr(s.pf)} />
          <Row label="ESIC" value={inr(s.esic)} />
          <Row label="Professional Tax" value={inr(s.pt)} />
          <Row label="TDS" value={inr(s.tds)} />
          <Row label="Loan Deduction" value={inr(s.loan)} />
          <Row label="Other Deduction" value={inr(s.other)} />
          <Row label="Total Deductions" value={inr(s.deductions)} strong />
        </div>
      </div>

      <div className="border-t border-border bg-muted/50 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-muted-foreground">Net Salary</span>
          <span className="text-xl font-bold text-foreground">{inr(s.net, true)}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          <span className="font-semibold">In words:</span> {rupeesInWords(s.net)}
        </p>
      </div>

      <p className="px-5 py-4 text-center text-[11px] text-muted-foreground">
        This is a computer-generated demo payslip and does not require a signature.
      </p>
    </div>
  );
}
