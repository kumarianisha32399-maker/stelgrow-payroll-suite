import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, PlayCircle, Search } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Badge,
  Button,
  Card,
  DemoNote,
  EmptyRow,
  Modal,
  PageHeader,
  Input,
  Select,
  StatCard,
  TableShell,
  Td,
} from "@/components/hr/UI";
import {
  CURRENT_MONTH,
  DEPARTMENT_NAMES,
  MONTHS,
  PAYROLL,
  type PayrollRow,
  type PayrollStatus,
} from "@/data/mock";
import { compactInr, inr } from "@/lib/format";

export const Route = createFileRoute("/admin/payroll")({
  head: () => ({
    meta: [
      { title: "Payroll — STELGROW HR Payroll Admin" },
      {
        name: "description",
        content: "Process monthly payroll, review gross salary, deductions and net payable amounts.",
      },
      { property: "og:title", content: "Payroll — STELGROW HR Payroll Admin" },
      {
        property: "og:description",
        content: "Process monthly payroll, review gross salary, deductions and net payable amounts.",
      },
    ],
  }),
  component: PayrollPage,
});

const STATUSES: PayrollStatus[] = ["Draft", "Processing", "Processed", "Paid"];

function PayrollPage() {
  const [rows, setRows] = useState<PayrollRow[]>(PAYROLL);
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [status, setStatus] = useState("All");
  const [confirm, setConfirm] = useState(false);
  const [summary, setSummary] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (dept === "All" || r.department === dept) &&
          (status === "All" || r.status === status) &&
          (r.name.toLowerCase().includes(q.toLowerCase()) ||
            r.employeeId.toLowerCase().includes(q.toLowerCase())),
      ),
    [rows, q, dept, status],
  );

  const totals = useMemo(
    () =>
      rows.reduce(
        (a, r) => ({
          gross: a.gross + r.gross,
          deductions: a.deductions + r.deductions,
          net: a.net + r.net,
          processed: a.processed + (r.status === "Processed" || r.status === "Paid" ? 1 : 0),
        }),
        { gross: 0, deductions: 0, net: 0, processed: 0 },
      ),
    [rows],
  );

  const processAll = () => {
    setRows((prev) =>
      prev.map((r) => (r.status === "Draft" || r.status === "Processing" ? { ...r, status: "Processed" } : r)),
    );
    setConfirm(false);
    setNote(`Payroll processed for ${month}.`);
    window.setTimeout(() => setNote(null), 3000);
  };

  const setRowStatus = (id: string, s: PayrollStatus) =>
    setRows((prev) => prev.map((r) => (r.employeeId === id ? { ...r, status: s } : r)));

  return (
    <AdminShell>
      <PageHeader title="Monthly Payroll" subtitle={`Payroll run for ${month}`}>
        <Select value={month} onChange={(e) => setMonth(e.target.value)} className="w-44">
          {MONTHS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </Select>
        <Button variant="outline" onClick={() => setSummary(true)}>
          View Summary
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setNote("Export started — demo only, no file is generated.");
            window.setTimeout(() => setNote(null), 3000);
          }}
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button onClick={() => setConfirm(true)}>
          <PlayCircle className="h-4 w-4" />
          Process Payroll
        </Button>
      </PageHeader>

      {note ? (
        <div className="mb-4 rounded-lg bg-success-soft px-4 py-3 text-sm font-medium text-success">
          {note}
        </div>
      ) : null}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Gross Salary" value={compactInr(totals.gross)} hint={inr(totals.gross)} />
        <StatCard
          label="Total Deductions"
          value={compactInr(totals.deductions)}
          hint={inr(totals.deductions)}
          tone="danger"
        />
        <StatCard
          label="Total Net Salary"
          value={compactInr(totals.net)}
          hint={inr(totals.net)}
          tone="success"
        />
        <StatCard
          label="Employees Processed"
          value={`${totals.processed}/${rows.length}`}
          tone="info"
        />
      </div>

      <Card className="mb-6">
        <div className="grid gap-3 md:grid-cols-[1fr_200px_180px]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search employee or ID"
              className="pl-9"
            />
          </div>
          <Select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="All">All Departments</option>
            {DEPARTMENT_NAMES.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
      </Card>

      <TableShell
        head={[
          "Employee ID",
          "Employee Name",
          "Basic",
          "Allowances",
          "Gross Salary",
          "Deductions",
          "Net Salary",
          "Status",
          "Actions",
        ]}
      >
        {filtered.map((r) => (
          <tr key={r.employeeId} className="hover:bg-muted/40">
            <Td className="text-muted-foreground">{r.employeeId}</Td>
            <Td>
              <span className="font-medium text-foreground">{r.name}</span>
              <span className="block text-xs text-muted-foreground">{r.designation}</span>
            </Td>
            <Td>{inr(r.basic)}</Td>
            <Td>{inr(r.allowances)}</Td>
            <Td className="font-medium text-foreground">{inr(r.gross)}</Td>
            <Td className="text-danger">-{inr(r.deductions)}</Td>
            <Td className="font-semibold text-foreground">{inr(r.net)}</Td>
            <Td>
              <Badge>{r.status}</Badge>
            </Td>
            <Td>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setRowStatus(r.employeeId, "Processed")}
                >
                  Process
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setRowStatus(r.employeeId, "Paid")}>
                  Mark Paid
                </Button>
              </div>
            </Td>
          </tr>
        ))}
        {filtered.length === 0 ? <EmptyRow colSpan={9} /> : null}
      </TableShell>

      <div className="mt-6">
        <DemoNote>
          Payroll processing is simulated in the browser — no bank transfer or backend is involved.
        </DemoNote>
      </div>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Process Payroll"
        subtitle={`This will mark all draft and in-progress records for ${month} as processed.`}
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={processAll}>Confirm & Process</Button>
          </>
        }
      >
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Employees in this run: <span className="font-semibold text-foreground">{rows.length}</span>
          </p>
          <p>
            Total net payable:{" "}
            <span className="font-semibold text-foreground">{inr(totals.net)}</span>
          </p>
          <DemoNote>Demo action — payroll statuses update in local state only.</DemoNote>
        </div>
      </Modal>

      <Modal
        open={summary}
        onClose={() => setSummary(false)}
        title={`Payroll Summary — ${month}`}
        wide
        footer={<Button onClick={() => setSummary(false)}>Close</Button>}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {STATUSES.map((s) => {
            const list = rows.filter((r) => r.status === s);
            return (
              <Card key={s}>
                <div className="flex items-center justify-between">
                  <Badge>{s}</Badge>
                  <span className="text-sm font-semibold text-foreground">{list.length} employees</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Net value {inr(list.reduce((a, r) => a + r.net, 0))}
                </p>
              </Card>
            );
          })}
        </div>
      </Modal>
    </AdminShell>
  );
}
