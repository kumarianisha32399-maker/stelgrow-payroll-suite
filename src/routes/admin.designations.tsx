import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Pencil, Plus, Search, Trash2 } from "lucide-react";
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
import { DEPARTMENT_NAMES, DESIGNATIONS, type Designation } from "@/data/mock";

export const Route = createFileRoute("/admin/designations")({
  head: () => ({
    meta: [
      { title: "Designations — STELGROW HR Payroll Admin" },
      {
        name: "description",
        content: "Manage job designations, mapped departments and employee counts.",
      },
      { property: "og:title", content: "Designations — STELGROW HR Payroll Admin" },
      {
        property: "og:description",
        content: "Manage job designations, mapped departments and employee counts.",
      },
    ],
  }),
  component: DesignationsPage,
});

const blank: Designation = {
  id: "",
  title: "",
  department: "Human Resources",
  employees: 0,
  status: "Active",
};

function DesignationsPage() {
  const [rows, setRows] = useState<Designation[]>(DESIGNATIONS);
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [form, setForm] = useState<Designation | null>(null);
  const [editing, setEditing] = useState(false);

  const filtered = useMemo(
    () =>
      rows.filter(
        (d) =>
          (dept === "All" || d.department === dept) &&
          d.title.toLowerCase().includes(q.toLowerCase()),
      ),
    [rows, q, dept],
  );

  const save = () => {
    if (!form) return;
    if (editing) setRows((prev) => prev.map((d) => (d.id === form.id ? form : d)));
    else
      setRows((prev) => [
        ...prev,
        { ...form, id: `DSG-${String(prev.length + 1).padStart(2, "0")}` },
      ]);
    setForm(null);
  };

  return (
    <AdminShell>
      <PageHeader title="Designations" subtitle="Job titles mapped to departments">
        <Button
          onClick={() => {
            setEditing(false);
            setForm(blank);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Designation
        </Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Designations"
          value={String(rows.length)}
          icon={<BadgeCheck className="h-5 w-5" />}
        />
        <StatCard
          label="Active"
          value={String(rows.filter((d) => d.status === "Active").length)}
          tone="success"
        />
        <StatCard
          label="Employees Mapped"
          value={String(rows.reduce((s, d) => s + d.employees, 0))}
          tone="info"
        />
      </div>

      <Card className="mb-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search designation"
              className="pl-9"
            />
          </div>
          <Select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="All">All Departments</option>
            {DEPARTMENT_NAMES.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </Select>
        </div>
      </Card>

      <TableShell head={["ID", "Designation", "Department", "Employees", "Status", "Actions"]}>
        {filtered.map((d) => (
          <tr key={d.id} className="hover:bg-muted/40">
            <Td className="text-muted-foreground">{d.id}</Td>
            <Td className="font-medium text-foreground">{d.title}</Td>
            <Td className="text-muted-foreground">{d.department}</Td>
            <Td>{d.employees}</Td>
            <Td>
              <Badge>{d.status}</Badge>
            </Td>
            <Td>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
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
            </Td>
          </tr>
        ))}
        {filtered.length === 0 ? <EmptyRow colSpan={6} /> : null}
      </TableShell>

      <div className="mt-6">
        <DemoNote>Demo data only — changes are stored in the browser for this session.</DemoNote>
      </div>

      <Modal
        open={form !== null}
        onClose={() => setForm(null)}
        title={editing ? "Edit Designation" : "Add Designation"}
        footer={
          <>
            <Button variant="outline" onClick={() => setForm(null)}>
              Cancel
            </Button>
            <Button onClick={save}>{editing ? "Save Changes" : "Add Designation"}</Button>
          </>
        }
      >
        {form ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Designation Title">
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Sales Executive"
              />
            </Field>
            <Field label="Department">
              <Select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              >
                {DEPARTMENT_NAMES.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Select>
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
                  setForm({ ...form, status: e.target.value as Designation["status"] })
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
