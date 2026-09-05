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
  ProgressRows,
  Select,
  SectionTitle,
  StatCard,
  TableShell,
  Td,
} from "@/components/hr/UI";
import {
  ATTENDANCE,
  DEPARTMENT_NAMES,
  MONTHLY_ATTENDANCE_SUMMARY,
  type AttendanceRow,
  type AttendanceStatus,
} from "@/data/mock";

export const Route = createFileRoute("/admin/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — STELGROW HR Payroll Admin" },
      { name: "description", content: "Track daily employee attendance, working hours, half days and leave." },
      { property: "og:title", content: "Attendance — STELGROW HR Payroll Admin" },
      { property: "og:description", content: "Track daily employee attendance, working hours, half days and leave." },
    ],
  }),
  component: AttendancePage,
});

const STATUSES: AttendanceStatus[] = ["Present", "Absent", "Half Day", "Leave", "Work From Home"];

function AttendancePage() {
  const [rows, setRows] = useState<AttendanceRow[]>(ATTENDANCE);
  const [date, setDate] = useState("2026-09-05");
  const [dept, setDept] = useState("All");
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState<AttendanceRow | null>(null);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (dept === "All" || r.department === dept) &&
          (r.name.toLowerCase().includes(q.toLowerCase()) ||
            r.employeeId.toLowerCase().includes(q.toLowerCase())),
      ),
    [rows, dept, q],
  );

  const count = (s: AttendanceStatus) => rows.filter((r) => r.status === s).length;

  function setStatus(employeeId: string, status: AttendanceStatus) {
    setRows((prev) =>
      prev.map((r) => {
        if (r.employeeId !== employeeId) return r;
        const off = status === "Absent" || status === "Leave";
        const hours = off ? 0 : status === "Half Day" ? 4.5 : 8.5;
        return {
          ...r,
          status,
          hours,
          checkIn: off ? "—" : r.checkIn === "—" ? "09:15 AM" : r.checkIn,
          checkOut: off ? "—" : hours === 4.5 ? "01:45 PM" : "06:40 PM",
        };
      }),
    );
  }

  return (
    <AdminShell>
      <PageHeader title="Attendance Management" subtitle="Daily attendance register and monthly summary" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Present" value={String(count("Present"))} tone="success" />
        <StatCard label="Absent" value={String(count("Absent"))} tone="danger" />
        <StatCard label="Half Day" value={String(count("Half Day"))} tone="warning" />
        <StatCard label="Leave / WFH" value={String(count("Leave") + count("Work From Home"))} tone="info" />
      </div>

      <Card className="my-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Date">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Department">
            <Select value={dept} onChange={(e) => setDept(e.target.value)}>
              <option value="All">All Departments</option>
              {DEPARTMENT_NAMES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </Select>
          </Field>
          <Field label="Search Employee" className="lg:col-span-2">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or employee ID" className="pl-9" />
            </div>
          </Field>
        </div>
      </Card>

      <TableShell
        head={["Employee ID", "Employee", "Department", "Check In", "Check Out", "Hours", "Status", "Actions"]}
      >
        {filtered.length === 0 ? (
          <EmptyRow colSpan={8} />
        ) : (
          filtered.map((r) => (
            <tr key={r.employeeId} className="hover:bg-muted/50">
              <Td className="text-muted-foreground">{r.employeeId}</Td>
              <Td className="font-medium text-foreground">{r.name}</Td>
              <Td className="text-muted-foreground">{r.department}</Td>
              <Td className="text-muted-foreground">{r.checkIn}</Td>
              <Td className="text-muted-foreground">{r.checkOut}</Td>
              <Td>{r.hours ? `${r.hours} hrs` : "—"}</Td>
              <Td>
                <Badge>{r.status}</Badge>
              </Td>
              <Td>
                <span className="flex gap-1.5">
                  <Button size="sm" variant="success" onClick={() => setStatus(r.employeeId, "Present")}>
                    Present
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => setStatus(r.employeeId, "Absent")}>
                    Absent
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEdit(r)}>
                    Edit
                  </Button>
                </span>
              </Td>
            </tr>
          ))
        )}
      </TableShell>

      <Card className="mt-6">
        <SectionTitle title="Monthly Attendance Summary" subtitle={`Working days: ${MONTHLY_ATTENDANCE_SUMMARY.workingDays}`} />
        <ProgressRows
          data={[
            { label: "Present days", value: MONTHLY_ATTENDANCE_SUMMARY.present, tone: "success" },
            { label: "Half days", value: MONTHLY_ATTENDANCE_SUMMARY.halfDay, tone: "warning" },
            { label: "Leave days", value: MONTHLY_ATTENDANCE_SUMMARY.leave, tone: "info" },
            { label: "Absent days", value: MONTHLY_ATTENDANCE_SUMMARY.absent, tone: "danger" },
          ]}
        />
      </Card>

      <Modal
        open={!!edit}
        onClose={() => setEdit(null)}
        title="Edit Attendance"
        subtitle={edit ? `${edit.name} · ${date}` : ""}
        footer={
          <Button variant="outline" onClick={() => setEdit(null)}>
            Done
          </Button>
        }
      >
        {edit ? (
          <div className="space-y-4">
            <Field label="Status">
              <Select
                value={rows.find((r) => r.employeeId === edit.employeeId)?.status ?? edit.status}
                onChange={(e) => setStatus(edit.employeeId, e.target.value as AttendanceStatus)}
              >
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Check In">
                <Input defaultValue={edit.checkIn} />
              </Field>
              <Field label="Check Out">
                <Input defaultValue={edit.checkOut} />
              </Field>
            </div>
          </div>
        ) : null}
      </Modal>
    </AdminShell>
  );
}
