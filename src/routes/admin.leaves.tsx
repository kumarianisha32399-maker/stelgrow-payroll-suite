import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Badge,
  Button,
  Card,
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
import { LEAVES, type LeaveRequest, type LeaveStatus } from "@/data/mock";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/admin/leaves")({
  head: () => ({
    meta: [
      { title: "Leave Management — STELGROW HR Payroll Admin" },
      { name: "description", content: "Review, approve and reject employee leave requests and balances." },
      { property: "og:title", content: "Leave Management — STELGROW HR Payroll Admin" },
      { property: "og:description", content: "Review, approve and reject employee leave requests and balances." },
    ],
  }),
  component: LeavesPage,
});

const TYPES = ["Casual Leave", "Sick Leave", "Earned Leave", "Paid Leave", "Unpaid Leave"];

function LeavesPage() {
  const [rows, setRows] = useState<LeaveRequest[]>(LEAVES);
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [view, setView] = useState<LeaveRequest | null>(null);

  const filtered = useMemo(
    () =>
      rows.filter(
        (l) =>
          (type === "All" || l.type === type) &&
          (status === "All" || l.status === status) &&
          l.employee.toLowerCase().includes(q.toLowerCase()),
      ),
    [rows, q, type, status],
  );

  const count = (s: LeaveStatus) => rows.filter((r) => r.status === s).length;
  const decide = (id: string, s: LeaveStatus) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: s } : r)));

  return (
    <AdminShell>
      <PageHeader title="Leave Management" subtitle="Approve or reject employee leave requests" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Requests" value={String(rows.length)} />
        <StatCard label="Pending" value={String(count("Pending"))} tone="warning" />
        <StatCard label="Approved" value={String(count("Approved"))} tone="success" />
        <StatCard label="Rejected" value={String(count("Rejected"))} tone="danger" />
      </div>

      <Card className="my-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Search Employee" className="lg:col-span-2">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Employee name" className="pl-9" />
            </div>
          </Field>
          <Field label="Leave Type">
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="All">All Types</option>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </Select>
          </Field>
        </div>
      </Card>

      <TableShell head={["Employee", "Leave Type", "From", "To", "Days", "Reason", "Status", "Action"]}>
        {filtered.length === 0 ? (
          <EmptyRow colSpan={8} />
        ) : (
          filtered.map((l) => (
            <tr key={l.id} className="hover:bg-muted/50">
              <Td>
                <span className="font-medium text-foreground">{l.employee}</span>
                <span className="block text-xs text-muted-foreground">{l.employeeId}</span>
              </Td>
              <Td className="text-muted-foreground">{l.type}</Td>
              <Td className="text-muted-foreground">{formatDate(l.from)}</Td>
              <Td className="text-muted-foreground">{formatDate(l.to)}</Td>
              <Td>{l.days}</Td>
              <Td className="max-w-[220px] truncate text-muted-foreground">{l.reason}</Td>
              <Td>
                <Badge>{l.status}</Badge>
              </Td>
              <Td>
                <span className="flex gap-1.5">
                  <Button size="sm" variant="success" onClick={() => decide(l.id, "Approved")}>
                    Approve
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => decide(l.id, "Rejected")}>
                    Reject
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setView(l)}>
                    View
                  </Button>
                </span>
              </Td>
            </tr>
          ))
        )}
      </TableShell>

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title="Leave Request"
        subtitle={view ? `${view.employee} · ${view.id}` : ""}
        footer={
          view ? (
            <>
              <Button
                variant="danger"
                onClick={() => {
                  decide(view.id, "Rejected");
                  setView(null);
                }}
              >
                Reject
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  decide(view.id, "Approved");
                  setView(null);
                }}
              >
                Approve
              </Button>
            </>
          ) : null
        }
      >
        {view ? (
          <dl className="space-y-3 text-sm">
            {[
              ["Employee", `${view.employee} (${view.employeeId})`],
              ["Leave Type", view.type],
              ["From", formatDate(view.from)],
              ["To", formatDate(view.to)],
              ["Total Days", String(view.days)],
              ["Reason", view.reason],
              ["Current Status", view.status],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Modal>
    </AdminShell>
  );
}
