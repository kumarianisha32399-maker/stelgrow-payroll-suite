import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
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
import { SALARY_COMPONENTS, type CalcMethod, type SalaryComponent } from "@/data/mock";

export const Route = createFileRoute("/admin/salary-components")({
  head: () => ({
    meta: [
      { title: "Salary Components — STELGROW HR Payroll Admin" },
      {
        name: "description",
        content: "Configure earning and deduction components with fixed, percentage or basic-based rules.",
      },
      { property: "og:title", content: "Salary Components — STELGROW HR Payroll Admin" },
      {
        property: "og:description",
        content: "Configure earning and deduction components with fixed, percentage or basic-based rules.",
      },
    ],
  }),
  component: SalaryComponentsPage,
});

const METHODS: CalcMethod[] = ["Fixed Amount", "Percentage", "Based on Basic Salary"];
const blank: SalaryComponent = {
  id: "",
  name: "",
  type: "Earning",
  method: "Fixed Amount",
  value: "",
  status: "Active",
};

function SalaryComponentsPage() {
  const [rows, setRows] = useState<SalaryComponent[]>(SALARY_COMPONENTS);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"All" | "Earning" | "Deduction">("All");
  const [form, setForm] = useState<SalaryComponent | null>(null);
  const [editing, setEditing] = useState(false);

  const filtered = useMemo(
    () =>
      rows.filter(
        (c) => (tab === "All" || c.type === tab) && c.name.toLowerCase().includes(q.toLowerCase()),
      ),
    [rows, q, tab],
  );

  const save = () => {
    if (!form) return;
    if (editing) setRows((prev) => prev.map((c) => (c.id === form.id ? form : c)));
    else
      setRows((prev) => [
        ...prev,
        { ...form, id: `SC-${String(prev.length + 1).padStart(2, "0")}` },
      ]);
    setForm(null);
  };

  return (
    <AdminShell>
      <PageHeader title="Salary Components" subtitle="Earnings and deductions used in payroll">
        <Button
          onClick={() => {
            setEditing(false);
            setForm(blank);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Component
        </Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Components" value={String(rows.length)} />
        <StatCard
          label="Earning Components"
          value={String(rows.filter((c) => c.type === "Earning").length)}
          tone="success"
        />
        <StatCard
          label="Deduction Components"
          value={String(rows.filter((c) => c.type === "Deduction").length)}
          tone="danger"
        />
      </div>

      <Card className="mb-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search component"
              className="pl-9"
            />
          </div>
          <Select value={tab} onChange={(e) => setTab(e.target.value as typeof tab)}>
            <option value="All">All Types</option>
            <option value="Earning">Earnings</option>
            <option value="Deduction">Deductions</option>
          </Select>
        </div>
      </Card>

      <TableShell
        head={["ID", "Component Name", "Type", "Calculation Method", "Value", "Status", "Actions"]}
      >
        {filtered.map((c) => (
          <tr key={c.id} className="hover:bg-muted/40">
            <Td className="text-muted-foreground">{c.id}</Td>
            <Td className="font-medium text-foreground">{c.name}</Td>
            <Td>
              <Badge tone={c.type === "Earning" ? "success" : "danger"}>{c.type}</Badge>
            </Td>
            <Td className="text-muted-foreground">{c.method}</Td>
            <Td>{c.value}</Td>
            <Td>
              <Badge>{c.status}</Badge>
            </Td>
            <Td>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditing(true);
                    setForm(c);
                  }}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setRows((prev) => prev.filter((x) => x.id !== c.id))}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </Td>
          </tr>
        ))}
        {filtered.length === 0 ? <EmptyRow colSpan={7} /> : null}
      </TableShell>

      <div className="mt-6">
        <DemoNote>Demo data only — component changes are not saved to any server.</DemoNote>
      </div>

      <Modal
        open={form !== null}
        onClose={() => setForm(null)}
        title={editing ? "Edit Component" : "Add Salary Component"}
        footer={
          <>
            <Button variant="outline" onClick={() => setForm(null)}>
              Cancel
            </Button>
            <Button onClick={save}>{editing ? "Save Changes" : "Add Component"}</Button>
          </>
        }
      >
        {form ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Component Name">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Travel Allowance"
              />
            </Field>
            <Field label="Type">
              <Select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as SalaryComponent["type"] })
                }
              >
                <option value="Earning">Earning</option>
                <option value="Deduction">Deduction</option>
              </Select>
            </Field>
            <Field label="Calculation Method">
              <Select
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value as CalcMethod })}
              >
                {METHODS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </Select>
            </Field>
            <Field label="Value">
              <Input
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                placeholder="e.g. ₹2,000 or 10% of Basic"
              />
            </Field>
            <Field label="Status">
              <Select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as SalaryComponent["status"] })
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
