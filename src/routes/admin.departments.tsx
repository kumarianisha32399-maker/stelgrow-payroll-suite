import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Badge,
  Button,
  Card,
  DemoNote,
  Field,
  Input,
  Modal,
  PageHeader,
  Select,
  StatCard,
} from "@/components/hr/UI";
import { DEPARTMENTS, type Department } from "@/data/mock";

export const Route = createFileRoute("/admin/departments")({
  head: () => ({
    meta: [
      { title: "Departments — STELGROW HR Payroll Admin" },
      {
        name: "description",
        content: "Create, edit and manage company departments, department heads and headcount.",
      },
      { property: "og:title", content: "Departments — STELGROW HR Payroll Admin" },
      {
        property: "og:description",
        content: "Create, edit and manage company departments, department heads and headcount.",
      },
    ],
  }),
  component: DepartmentsPage,
});

const blank: Department = { id: "", name: "", head: "", employees: 0, status: "Active" };

function DepartmentsPage() {
  const [rows, setRows] = useState<Department[]>(DEPARTMENTS);
  const [q, setQ] = useState("");
  const [form, setForm] = useState<Department | null>(null);
  const [editing, setEditing] = useState(false);

  const filtered = useMemo(
    () =>
      rows.filter(
        (d) =>
          d.name.toLowerCase().includes(q.toLowerCase()) ||
          d.head.toLowerCase().includes(q.toLowerCase()),
      ),
    [rows, q],
  );

  const totalEmployees = rows.reduce((s, d) => s + d.employees, 0);

  const save = () => {
    if (!form) return;
    if (editing) {
      setRows((prev) => prev.map((d) => (d.id === form.id ? form : d)));
    } else {
      setRows((prev) => [
        ...prev,
        { ...form, id: `DEP-${String(prev.length + 1).padStart(2, "0")}` },
      ]);
    }
    setForm(null);
  };

  return (
    <AdminShell>
      <PageHeader title="Departments" subtitle="Organise your workforce into departments">
        <Button
          onClick={() => {
            setEditing(false);
            setForm(blank);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Department
        </Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Departments"
          value={String(rows.length)}
          icon={<Building2 className="h-5 w-5" />}
        />
        <StatCard
          label="Employees Mapped"
          value={String(totalEmployees)}
          tone="success"
          hint="Across all departments"
        />
        <StatCard
          label="Active Departments"
          value={String(rows.filter((d) => d.status === "Active").length)}
          tone="info"
        />
      </div>

      <Card className="mb-6">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search department or head"
            className="pl-9"
          />
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((d) => (
          <Card key={d.id} className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{d.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{d.id}</p>
              </div>
              <Badge>{d.status}</Badge>
            </div>
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Department Head</dt>
                <dd className="font-medium text-foreground">{d.head}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Employees</dt>
                <dd className="font-medium text-foreground">{d.employees}</dd>
              </div>
            </dl>
            <div className="mt-auto flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(true);
                  setForm(d);
                }}
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setRows((prev) => prev.filter((x) => x.id !== d.id))}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
        {filtered.length === 0 ? (
          <Card className="sm:col-span-2 xl:col-span-3">
            <p className="py-8 text-center text-sm text-muted-foreground">
              No departments match your search.
            </p>
          </Card>
        ) : null}
      </div>

      <div className="mt-6">
        <DemoNote>Demo data only — changes are stored in the browser for this session.</DemoNote>
      </div>

      <Modal
        open={form !== null}
        onClose={() => setForm(null)}
        title={editing ? "Edit Department" : "Add Department"}
        subtitle="Department details are saved to demo state"
        footer={
          <>
            <Button variant="outline" onClick={() => setForm(null)}>
              Cancel
            </Button>
            <Button onClick={save}>{editing ? "Save Changes" : "Add Department"}</Button>
          </>
        }
      >
        {form ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Department Name">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Information Technology"
              />
            </Field>
            <Field label="Department Head">
              <Input
                value={form.head}
                onChange={(e) => setForm({ ...form, head: e.target.value })}
                placeholder="e.g. Amit Kulkarni"
              />
            </Field>
            <Field label="Employee Count">
              <Input
                type="number"
                value={form.employees}
                onChange={(e) => setForm({ ...form, employees: Number(e.target.value) })}
              />
            </Field>
            <Field label="Status">
              <Select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as Department["status"] })
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </Select>
            </Field>
          </div>
        ) : null}
      </Modal>
    </AdminShell>
  );
}
