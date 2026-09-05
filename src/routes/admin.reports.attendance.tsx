import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Download, Search } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Badge,
  Button,
  Card,
  DemoNote,
  DonutChart,
  EmptyRow,
  Field,
  Input,
  PageHeader,
  PageHeader as _PH,
  SectionTitle,
  Select,
  StatCard,
  TableShell,
  Td,
} from "@/components/hr/UI";
import {
  CURRENT_MONTH,
  DEPARTMENT_NAMES,
  EMPLOYEE_ATTENDANCE_REPORT,
  MONTHS,
} from "@/data/mock";

void _PH;

export const Route = createFileRoute("/admin/reports/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance Report — STELGROW HR Payroll Admin" },
      {
        name: "description",
        content: "Monthly attendance report with present, absent, half-day, leave counts and attendance percentage.",
      },
      { property: "og:title", content: "Attendance Report — STELGROW HR Payroll Admin" },
      {
        property: "og:description",
        content: "Monthly attendance analytics per employee and department.",
      },
    ],
  }),
  component: AttendanceReportPage,
});

function AttendanceReportPage() {
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [dept, setDept] = useState("All");
  const [q, setQ] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      EMPLOYEE_ATTENDANCE_REPORT.filter(
        (r) =>
          (dept === "All" || r.department === dept) &&
          `${r.name} ${r.employeeId}`.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [dept, q],
  );

  const totals = filtered.reduce(
    (a, r) => ({
      present: a.present + r.present,
      absent: a.absent + r.absent,
      halfDay: a.halfDay + r.halfDay,
      leave: a.leave + r.leave,
    }),
    { present: 0, absent: 0, halfDay: 0, leave: 0 },
  );

  const avg = filtered.length
    ? Math.round(filtered.reduce((s, r) => s + r.percentage, 0) / filtered.length)
    : 0;

  return (
    <AdminShell title="Attendance Report">
      <PageHeader title="Attendance Report" subtitle={`Working-day attendance summary · ${month}`}>
        <Button
          variant="outline"
          onClick={() => {
            setNotice("Demo export: attendance report would download as CSV.");
            window.setTimeout(() => setNotice(null), 2500);
          }}
        >
          <Download className="h-4 w-4" /> Export
        </Button>
      </PageHeader>

      <DemoNote>Attendance data is mock data based on a 26 working-day month.</DemoNote>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Present Days" value={String(totals.present)} tone="success" icon={<CalendarCheck className="h-5 w-5" />} />
        <StatCard label="Absent Days" value={String(totals.absent)} tone="danger" />
        <StatCard label="Half Days" value={String(totals.halfDay)} tone="warning" />
        <StatCard label="Leave Days" value={String(totals.leave)} tone="info" />
        <StatCard label="Avg Attendance" value={`${avg}%`} tone="success" />
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
        <SectionTitle title="Attendance distribution" subtitle="Share of all recorded attendance days" />
        <DonutChart
          data={[
            { label: "Present", value: totals.present, tone: "success" },
            { label: "Absent", value: totals.absent, tone: "danger" },
            { label: "Half Day", value: totals.halfDay, tone: "warning" },
            { label: "Leave", value: totals.leave, tone: "info" },
          ]}
        />
      </Card>

      <div className="mt-6">
        <TableShell
          head={["Employee ID", "Employee", "Department", "Present", "Absent", "Half Day", "Leave", "Attendance %"]}
        >
          {filtered.length === 0 ? (
            <EmptyRow colSpan={8} />
          ) : (
            filtered.map((r) => (
              <tr key={r.employeeId} className="hover:bg-muted/40">
                <Td className="text-muted-foreground">{r.employeeId}</Td>
                <Td className="font-medium text-foreground">{r.name}</Td>
                <Td className="text-muted-foreground">{r.department}</Td>
                <Td>{r.present}</Td>
                <Td>{r.absent}</Td>
                <Td>{r.halfDay}</Td>
                <Td>{r.leave}</Td>
                <Td>
                  <Badge tone={r.percentage >= 90 ? "success" : r.percentage >= 75 ? "warning" : "danger"}>
                    {r.percentage}%
                  </Badge>
                </Td>
              </tr>
            ))
          )}
        </TableShell>
      </div>
    </AdminShell>
  );
}
