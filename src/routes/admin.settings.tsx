import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, CalendarCheck, CalendarDays, Save, Settings, UserCog, Wallet } from "lucide-react";
import { AdminShell } from "@/components/hr/AdminShell";
import {
  Button,
  Card,
  DemoNote,
  Field,
  Input,
  PageHeader,
  SectionTitle,
  Select,
  Textarea,
  Toggle,
} from "@/components/hr/UI";
import { COMPANY } from "@/data/mock";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Admin Settings — STELGROW HR Payroll Admin" },
      {
        name: "description",
        content: "Configure company details, payroll cycle, statutory deductions, attendance rules and leave policy.",
      },
      { property: "og:title", content: "Admin Settings — STELGROW HR Payroll Admin" },
      {
        property: "og:description",
        content: "Company, payroll, attendance, leave and admin profile settings for the payroll demo.",
      },
    ],
  }),
  component: SettingsPage,
});

const TABS = [
  { id: "company", label: "Company", icon: <Building2 className="h-4 w-4" /> },
  { id: "payroll", label: "Payroll", icon: <Wallet className="h-4 w-4" /> },
  { id: "attendance", label: "Attendance", icon: <CalendarCheck className="h-4 w-4" /> },
  { id: "leave", label: "Leave", icon: <CalendarDays className="h-4 w-4" /> },
  { id: "profile", label: "Admin Profile", icon: <UserCog className="h-4 w-4" /> },
] as const;

type TabId = (typeof TABS)[number]["id"];

function SettingsPage() {
  const [tab, setTab] = useState<TabId>("company");
  const [saved, setSaved] = useState<string | null>(null);

  const [company, setCompany] = useState({
    name: COMPANY.name,
    cin: COMPANY.cin,
    address: COMPANY.address,
    phone: "",
    email: "",
    logo: "SG",
  });

  const [payroll, setPayroll] = useState({
    cycle: "Monthly",
    payDate: "1",
    pf: true,
    esic: true,
    pt: true,
    tds: true,
  });

  const [attendance, setAttendance] = useState({
    workingDays: "26",
    workHours: "8",
    halfDayHours: "4",
    lateAfter: "10:15",
    lateToHalfDay: true,
  });

  const [leave, setLeave] = useState({ casual: "12", sick: "8", earned: "15", carryForward: true });

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@stelgrowhr.com",
    password: "",
    confirm: "",
  });

  function save(section: string) {
    setSaved(`${section} settings saved in this demo session.`);
    window.setTimeout(() => setSaved(null), 2500);
  }

  return (
    <AdminShell title="Admin Settings">
      <PageHeader title="Admin Settings" subtitle="Company, payroll, attendance and leave configuration">
        <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-muted-foreground">
          <Settings className="h-4 w-4" /> Demo configuration
        </span>
      </PageHeader>

      <DemoNote>
        Settings are stored in browser state only and reset on refresh. Phone and email are intentionally blank
        because the client did not provide them.
      </DemoNote>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              tab === t.id
                ? "inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                : "inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            }
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {saved ? (
        <p className="mt-4 rounded-lg bg-success-soft px-4 py-3 text-sm font-medium text-success">{saved}</p>
      ) : null}

      <div className="mt-6 space-y-6">
        {tab === "company" ? (
          <Card>
            <SectionTitle title="Company Settings" subtitle="Details printed on payslips and reports" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company Name" className="sm:col-span-2">
                <Input value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} />
              </Field>
              <Field label="CIN">
                <Input value={company.cin} onChange={(e) => setCompany({ ...company, cin: e.target.value })} />
              </Field>
              <Field label="Logo Initials">
                <Input value={company.logo} onChange={(e) => setCompany({ ...company, logo: e.target.value })} />
              </Field>
              <Field label="Phone">
                <Input
                  value={company.phone}
                  onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                  placeholder="Not provided"
                />
              </Field>
              <Field label="Email">
                <Input
                  value={company.email}
                  onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  placeholder="Not provided"
                />
              </Field>
              <Field label="Registered Address" className="sm:col-span-2">
                <Textarea
                  rows={3}
                  value={company.address}
                  onChange={(e) => setCompany({ ...company, address: e.target.value })}
                />
              </Field>
            </div>
            <div className="mt-5 flex justify-end">
              <Button onClick={() => save("Company")}>
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </Card>
        ) : null}

        {tab === "payroll" ? (
          <Card>
            <SectionTitle title="Payroll Settings" subtitle="Cycle, payment date and statutory components" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Payroll Cycle">
                <Select value={payroll.cycle} onChange={(e) => setPayroll({ ...payroll, cycle: e.target.value })}>
                  {["Monthly", "Bi-Weekly", "Weekly"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Salary Payment Date">
                <Select value={payroll.payDate} onChange={(e) => setPayroll({ ...payroll, payDate: e.target.value })}>
                  {["1", "5", "7", "10", "Last working day"].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </Select>
              </Field>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Toggle label="Provident Fund (PF)" checked={payroll.pf} onChange={(v) => setPayroll({ ...payroll, pf: v })} />
              <Toggle label="ESIC" checked={payroll.esic} onChange={(v) => setPayroll({ ...payroll, esic: v })} />
              <Toggle label="Professional Tax" checked={payroll.pt} onChange={(v) => setPayroll({ ...payroll, pt: v })} />
              <Toggle label="TDS" checked={payroll.tds} onChange={(v) => setPayroll({ ...payroll, tds: v })} />
            </div>
            <div className="mt-5 flex justify-end">
              <Button onClick={() => save("Payroll")}>
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </Card>
        ) : null}

        {tab === "attendance" ? (
          <Card>
            <SectionTitle title="Attendance Settings" subtitle="Working days, hours and late-mark rules" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Working Days per Month">
                <Input
                  value={attendance.workingDays}
                  onChange={(e) => setAttendance({ ...attendance, workingDays: e.target.value })}
                />
              </Field>
              <Field label="Daily Work Hours">
                <Input
                  value={attendance.workHours}
                  onChange={(e) => setAttendance({ ...attendance, workHours: e.target.value })}
                />
              </Field>
              <Field label="Half Day Hours">
                <Input
                  value={attendance.halfDayHours}
                  onChange={(e) => setAttendance({ ...attendance, halfDayHours: e.target.value })}
                />
              </Field>
              <Field label="Late Mark After">
                <Input
                  value={attendance.lateAfter}
                  onChange={(e) => setAttendance({ ...attendance, lateAfter: e.target.value })}
                />
              </Field>
            </div>
            <div className="mt-4">
              <Toggle
                label="Convert 3 late marks into a half day"
                checked={attendance.lateToHalfDay}
                onChange={(v) => setAttendance({ ...attendance, lateToHalfDay: v })}
              />
            </div>
            <div className="mt-5 flex justify-end">
              <Button onClick={() => save("Attendance")}>
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </Card>
        ) : null}

        {tab === "leave" ? (
          <Card>
            <SectionTitle title="Leave Settings" subtitle="Annual leave entitlement per employee" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Casual Leave (days)">
                <Input value={leave.casual} onChange={(e) => setLeave({ ...leave, casual: e.target.value })} />
              </Field>
              <Field label="Sick Leave (days)">
                <Input value={leave.sick} onChange={(e) => setLeave({ ...leave, sick: e.target.value })} />
              </Field>
              <Field label="Earned Leave (days)">
                <Input value={leave.earned} onChange={(e) => setLeave({ ...leave, earned: e.target.value })} />
              </Field>
            </div>
            <div className="mt-4">
              <Toggle
                label="Allow unused earned leave to carry forward"
                checked={leave.carryForward}
                onChange={(v) => setLeave({ ...leave, carryForward: v })}
              />
            </div>
            <div className="mt-5 flex justify-end">
              <Button onClick={() => save("Leave")}>
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </Card>
        ) : null}

        {tab === "profile" ? (
          <Card>
            <SectionTitle title="Admin Profile" subtitle="Administrator account details" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Admin Name">
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </Field>
              <Field label="Email">
                <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </Field>
              <Field label="New Password">
                <Input
                  type="password"
                  value={profile.password}
                  onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                  placeholder="••••••••"
                />
              </Field>
              <Field label="Confirm Password">
                <Input
                  type="password"
                  value={profile.confirm}
                  onChange={(e) => setProfile({ ...profile, confirm: e.target.value })}
                  placeholder="••••••••"
                />
              </Field>
            </div>
            <div className="mt-5 flex justify-end">
              <Button onClick={() => save("Admin profile")}>
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </div>
          </Card>
        ) : null}
      </div>
    </AdminShell>
  );
}
