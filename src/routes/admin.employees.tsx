import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyRow,
  Field,
  Input,
  Modal,
  PageHeader,
  Select,
  TableShell,
  Td,
  Textarea,
} from "@/components/hr/UI";
import {
  DEPARTMENT_NAMES,
  DESIGNATIONS,
  EMPLOYEES,
  PAYROLL_HISTORY_BY_EMPLOYEE,
  MONTHLY_ATTENDANCE_SUMMARY,
  computeSalary,
  type Employee,
} from "@/data/mock";
import { formatDate, inr } from "@/lib/format";

export const Route = createFileRoute("/admin/employees")({
  head: () => ({
    meta: [
      { title: "Employees — STELGROW HR Payroll Admin" },
      { name: "description", content: "Manage employee records, departments, designations and salary details." },
      { property: "og:title", content: "Employees — STELGROW HR Payroll Admin" },
      { property: "og:description", content: "Manage employee records, departments, designations and salary details." },
    ],
  }),
  component: EmployeesPage,
});

const EMPTY: Employee = {
  id: "",
  name: "",
  email: "",
  phone: "",
  gender: "Male",
  dob: "",
  joiningDate: "",
  department: "Human Resources",
  designation: "HR Executive",
  employmentType: "Full Time",
  basic: 30000,
  bankName: "",
  accountNumber: "",
  ifsc: "",
  pan: "",
  uan: "",
  esic: "",
  address: "",
  status: "Active",
};

function EmployeesPage() {
  const [rows, setRows] = useState<Employee[]>(EMPLOYEES);
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [status, setStatus] = useState("All");
  const [form, setForm] = useState<Employee | null>(null);
  const [view, setView] = useState<Employee | null>(null);
  const [remove, setRemove] = useState<Employee | null>(null);
  const [editing, setEditing] = useState(false);

  const filtered = useMemo(
    () =>
      rows.filter(
        (e) =>
          (dept === "All" || e.department === dept) &&
          (status === "All" || e.status === status) &&
          (e.name.toLowerCase().includes(q.toLowerCase()) ||
            e.id.toLowerCase().includes(q.toLowerCase()) ||
            e.designation.toLowerCase().includes(q.toLowerCase())),
      ),
    [rows, q, dept, status],
  );

  function openAdd() {
    setEditing(false);
    setForm({ ...EMPTY, id: `STG-${1001 + rows.length}` });
  }

  function save(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    setRows((prev) =>
      editing ? prev.map((r) => (r.id === form.id ? form : r)) : [{ ...form }, ...prev],
    );
    setForm(null);
  }

  const set = (patch: Partial<Employee>) => setForm((f) => (f ? { ...f, ...patch } : f));

  return (
    <AdminShell>
      <PageHeader title="Employees" subtitle={`${filtered.length} of ${rows.length} employee records`}>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" /> Add Employee
        </Button>
      </PageHeader>

      <Card className="mb-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative lg:col-span-2">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, ID or designation"
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
            <option value="All">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </Select>
        </div>
      </Card>

      <TableShell
        head={[
          "Employee ID",
          "Employee Name",
          "Department",
          "Designation",
          "Joining Date",
          "Basic Salary",
          "Status",
          "Actions",
        ]}
      >
        {filtered.length === 0 ? (
          <EmptyRow colSpan={8} />
        ) : (
          filtered.map((e) => (
            <tr key={e.id} className="hover:bg-muted/50">
              <Td className="font-medium text-muted-foreground">{e.id}</Td>
              <Td>
                <span className="flex items-center gap-3">
                  <Avatar name={e.name} size="sm" />
                  <span>
                    <span className="block font-medium text-foreground">{e.name}</span>
                    <span className="block text-xs text-muted-foreground">{e.email}</span>
                  </span>
                </span>
              </Td>
              <Td className="text-muted-foreground">{e.department}</Td>
              <Td className="text-muted-foreground">{e.designation}</Td>
              <Td className="text-muted-foreground">{formatDate(e.joiningDate)}</Td>
              <Td className="font-semibold">{inr(e.basic)}</Td>
              <Td>
                <Badge>{e.status}</Badge>
              </Td>
              <Td>
                <span className="flex items-center gap-1">
                  <button
                    onClick={() => setView(e)}
                    aria-label={`View ${e.name}`}
                    className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-secondary"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setEditing(true);
                      setForm(e);
                    }}
                    aria-label={`Edit ${e.name}`}
                    className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-secondary"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setRemove(e)}
                    aria-label={`Delete ${e.name}`}
                    className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </span>
              </Td>
            </tr>
          ))
        )}
      </TableShell>

      {/* Add / edit */}
      <Modal
        open={!!form}
        onClose={() => setForm(null)}
        wide
        title={editing ? "Edit Employee" : "Add Employee"}
        subtitle="Demo form — records are stored in browser state only."
        footer={
          <>
            <Button variant="outline" onClick={() => setForm(null)}>
              Cancel
            </Button>
            <Button onClick={() => save(new Event("submit") as unknown as FormEvent)}>
              {editing ? "Save Changes" : "Add Employee"}
            </Button>
          </>
        }
      >
        {form ? (
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <Field label="Employee ID">
              <Input value={form.id} onChange={(e) => set({ id: e.target.value })} />
            </Field>
            <Field label="Full Name">
              <Input value={form.name} onChange={(e) => set({ name: e.target.value })} />
            </Field>
            <Field label="Email">
              <Input type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input value={form.phone} onChange={(e) => set({ phone: e.target.value })} />
            </Field>
            <Field label="Gender">
              <Select
                value={form.gender}
                onChange={(e) => set({ gender: e.target.value as Employee["gender"] })}
              >
                <option>Male</option>
                <option>Female</option>
              </Select>
            </Field>
            <Field label="Date of Birth">
              <Input type="date" value={form.dob} onChange={(e) => set({ dob: e.target.value })} />
            </Field>
            <Field label="Joining Date">
              <Input
                type="date"
                value={form.joiningDate}
                onChange={(e) => set({ joiningDate: e.target.value })}
              />
            </Field>
            <Field label="Department">
              <Select value={form.department} onChange={(e) => set({ department: e.target.value })}>
                {DEPARTMENT_NAMES.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Select>
            </Field>
            <Field label="Designation">
              <Select value={form.designation} onChange={(e) => set({ designation: e.target.value })}>
                {DESIGNATIONS.map((d) => (
                  <option key={d.id}>{d.title}</option>
                ))}
              </Select>
            </Field>
            <Field label="Employment Type">
              <Select
                value={form.employmentType}
                onChange={(e) => set({ employmentType: e.target.value as Employee["employmentType"] })}
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
                <option>Intern</option>
              </Select>
            </Field>
            <Field label="Basic Salary (₹)">
              <Input
                type="number"
                value={form.basic}
                onChange={(e) => set({ basic: Number(e.target.value) })}
              />
            </Field>
            <Field label="Status">
              <Select
                value={form.status}
                onChange={(e) => set({ status: e.target.value as Employee["status"] })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </Select>
            </Field>
            <Field label="Bank Name">
              <Input value={form.bankName} onChange={(e) => set({ bankName: e.target.value })} />
            </Field>
            <Field label="Account Number">
              <Input value={form.accountNumber} onChange={(e) => set({ accountNumber: e.target.value })} />
            </Field>
            <Field label="IFSC">
              <Input value={form.ifsc} onChange={(e) => set({ ifsc: e.target.value })} />
            </Field>
            <Field label="PAN">
              <Input value={form.pan} onChange={(e) => set({ pan: e.target.value })} />
            </Field>
            <Field label="UAN">
              <Input value={form.uan} onChange={(e) => set({ uan: e.target.value })} />
            </Field>
            <Field label="ESIC Number">
              <Input value={form.esic} onChange={(e) => set({ esic: e.target.value })} />
            </Field>
            <Field label="Address" className="sm:col-span-2">
              <Textarea rows={2} value={form.address} onChange={(e) => set({ address: e.target.value })} />
            </Field>
          </form>
        ) : null}
      </Modal>

      {/* Profile */}
      <Modal
        open={!!view}
        onClose={() => setView(null)}
        wide
        title={view ? view.name : ""}
        subtitle={view ? `${view.designation} · ${view.department}` : ""}
      >
        {view ? <EmployeeProfile employee={view} /> : null}
      </Modal>

      {/* Delete */}
      <Modal
        open={!!remove}
        onClose={() => setRemove(null)}
        title="Delete Employee"
        subtitle="This removes the record from the demo dataset."
        footer={
          <>
            <Button variant="outline" onClick={() => setRemove(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (remove) setRows((prev) => prev.filter((r) => r.id !== remove.id));
                setRemove(null);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete <strong className="text-foreground">{remove?.name}</strong> (
          {remove?.id})?
        </p>
      </Modal>
    </AdminShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border py-2 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value || "—"}</span>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-bold tracking-wide text-secondary uppercase">{title}</h4>
      {children}
    </div>
  );
}

export function EmployeeProfile({ employee }: { employee: Employee }) {
  const s = computeSalary(employee.basic);
  const a = MONTHLY_ATTENDANCE_SUMMARY;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar name={employee.name} size="lg" />
        <div>
          <p className="text-lg font-semibold text-foreground">{employee.name}</p>
          <p className="text-sm text-muted-foreground">
            {employee.id} · {employee.employmentType}
          </p>
        </div>
        <span className="ml-auto">
          <Badge>{employee.status}</Badge>
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Block title="Personal Information">
          <Row label="Email" value={employee.email} />
          <Row label="Phone" value={employee.phone} />
          <Row label="Gender" value={employee.gender} />
          <Row label="Date of Birth" value={formatDate(employee.dob)} />
          <Row label="Address" value={employee.address} />
        </Block>
        <Block title="Employment Information">
          <Row label="Department" value={employee.department} />
          <Row label="Designation" value={employee.designation} />
          <Row label="Joining Date" value={formatDate(employee.joiningDate)} />
          <Row label="Employment Type" value={employee.employmentType} />
          <Row label="PAN / UAN" value={`${employee.pan} / ${employee.uan}`} />
        </Block>
        <Block title="Salary Information">
          <Row label="Basic Salary" value={inr(s.basic)} />
          <Row label="Gross Salary" value={inr(s.gross)} />
          <Row label="Total Deductions" value={inr(s.deductions)} />
          <Row label="Net Salary" value={inr(s.net)} />
        </Block>
        <Block title="Attendance Summary">
          <Row label="Working Days" value={String(a.workingDays)} />
          <Row label="Present" value={String(a.present)} />
          <Row label="Half Day" value={String(a.halfDay)} />
          <Row label="Absent" value={String(a.absent)} />
        </Block>
        <Block title="Leave Summary">
          <Row label="Casual Leave" value="6 of 12 used" />
          <Row label="Sick Leave" value="2 of 8 used" />
          <Row label="Earned Leave" value="4 of 15 used" />
        </Block>
        <Block title="Documents">
          <Row label="Offer Letter" value="Uploaded" />
          <Row label="PAN Card" value="Uploaded" />
          <Row label="Bank Proof" value={`${employee.bankName} · ${employee.accountNumber}`} />
        </Block>
      </div>

      <Block title="Payroll History">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <tbody>
              {PAYROLL_HISTORY_BY_EMPLOYEE.map((p) => (
                <tr key={p.month} className="border-b border-border last:border-0">
                  <td className="py-2 text-muted-foreground">{p.month}</td>
                  <td className="py-2">{inr(s.gross)}</td>
                  <td className="py-2 text-danger">{inr(s.deductions)}</td>
                  <td className="py-2 font-semibold">{inr(s.net)}</td>
                  <td className="py-2 text-right">
                    <Badge>{p.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>
    </div>
  );
}
