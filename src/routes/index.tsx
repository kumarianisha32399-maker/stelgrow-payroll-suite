import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  CalendarCheck,
  Banknote,
  FileText,
  CalendarDays,
  BarChart3,
  MapPin,
  Building2,
  ArrowRight,
} from "lucide-react";
import heroImage from "@/assets/hero-payroll.jpg";
import { SiteNavbar, SiteFooter } from "@/components/hr/SiteChrome";
import { COMPANY } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STELGROW HR HOUSE — Salary & Payroll Management Software" },
      {
        name: "description",
        content:
          "Demo of STELGROW HR HOUSE payroll software: manage employees, attendance, leave, salary structures, payroll and payslips from one HR platform.",
      },
      { property: "og:title", content: "STELGROW HR HOUSE — Salary & Payroll Management Software" },
      {
        property: "og:description",
        content:
          "Manage employees, attendance, salary, payroll, leave and payslips from one powerful HR management platform.",
      },
    ],
  }),
  component: Landing,
});

const STATS = [
  { value: "250+", label: "Employees Managed" },
  { value: "12", label: "Departments" },
  { value: "₹18.5L", label: "Monthly Payroll" },
  { value: "99.9%", label: "Payroll Accuracy" },
];

const FEATURES = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "Employee Management",
    text: "Manage employee profiles, departments, designations and salary structures.",
  },
  {
    icon: <CalendarCheck className="h-5 w-5" />,
    title: "Attendance Management",
    text: "Track daily attendance, working days, absences and half-days.",
  },
  {
    icon: <Banknote className="h-5 w-5" />,
    title: "Payroll Processing",
    text: "Calculate monthly salary, allowances and deductions.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Payslip Generation",
    text: "Create professional employee payslips.",
  },
  {
    icon: <CalendarDays className="h-5 w-5" />,
    title: "Leave Management",
    text: "Manage leave requests, balances and approvals.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Reports & Analytics",
    text: "View salary, attendance and payroll reports.",
  },
];

const MODULES = [
  "Dashboard",
  "Employees",
  "Attendance",
  "Leave Management",
  "Salary Structure",
  "Payroll",
  "Payslips",
  "Departments",
  "Designations",
  "Salary Components",
  "Reports",
  "Admin Settings",
];

const STEPS = [
  { n: "01", title: "Add Employees", text: "Create employee records with department, designation and salary details." },
  { n: "02", title: "Track Attendance", text: "Record daily presence, half days, leave and work from home." },
  { n: "03", title: "Process Monthly Payroll", text: "Apply allowances and deductions, then process the salary run." },
  { n: "04", title: "Generate Payslips", text: "Publish professional payslips with a full salary breakup." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />

      {/* Hero */}
      <section id="home" className="border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <span className="inline-flex rounded-full bg-info-soft px-3 py-1 text-xs font-semibold text-secondary">
              HR & Payroll Software Demo
            </span>
            <h1 className="mt-5 text-3xl leading-tight font-bold text-foreground sm:text-4xl lg:text-5xl">
              Smart Salary & Payroll Management Made Simple
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Manage employees, attendance, salary, payroll, leave and payslips from one powerful HR
              management platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Explore Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Admin Login
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="card-surface p-4">
                  <dt className="text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="mt-1 text-xl font-bold text-primary">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">* Demo statistics shown with mock data.</p>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="HR payroll management dashboard with salary analytics and payslip preview"
              width={1280}
              height={960}
              className="w-full rounded-2xl border border-border shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Everything your HR team needs</h2>
          <p className="mt-3 text-muted-foreground">
            A complete payroll workflow, from onboarding an employee to publishing their monthly payslip.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="card-surface p-6 transition-shadow hover:shadow-elevated">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-info-soft text-secondary">
                {f.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Software modules</h2>
            <p className="mt-3 text-muted-foreground">
              Every module is available inside the admin panel with realistic demo data.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((m) => (
              <div key={m} className="card-surface flex items-center gap-3 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Building2 className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-foreground">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">How it works</h2>
          <p className="mt-3 text-muted-foreground">
            {COMPANY.short} keeps the monthly payroll cycle down to four clear steps.
          </p>
        </div>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="card-surface p-6">
              <span className="text-sm font-bold text-secondary">{s.n}</span>
              <h3 className="mt-3 text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="max-w-xl text-2xl font-bold text-primary-foreground sm:text-3xl">
            Ready to simplify your payroll management?
          </h2>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-card px-5 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
          >
            Explore Software Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Contact</h2>
            <p className="mt-3 text-muted-foreground">
              Reach out to our team for a walkthrough of the payroll management software.
            </p>
          </div>
          <div className="card-surface p-6">
            <p className="text-base font-semibold text-foreground">{COMPANY.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">CIN: {COMPANY.cin}</p>
            <p className="mt-4 flex gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              {COMPANY.address}
            </p>
            <p className="mt-4 rounded-lg border border-dashed border-border bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
              Phone and email were not provided by the client, so they are intentionally not listed here.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
