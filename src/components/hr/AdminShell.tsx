import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  Building2,
  BadgeCheck,
  Wallet,
  SlidersHorizontal,
  Banknote,
  FileText,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
} from "lucide-react";
import { COMPANY, CURRENT_MONTH } from "@/data/mock";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: ReactNode };

const GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Main",
    items: [{ to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> }],
  },
  {
    title: "HR Management",
    items: [
      { to: "/admin/employees", label: "Employees", icon: <Users className="h-4 w-4" /> },
      { to: "/admin/attendance", label: "Attendance", icon: <CalendarCheck className="h-4 w-4" /> },
      { to: "/admin/leaves", label: "Leave Management", icon: <CalendarDays className="h-4 w-4" /> },
      { to: "/admin/departments", label: "Departments", icon: <Building2 className="h-4 w-4" /> },
      { to: "/admin/designations", label: "Designations", icon: <BadgeCheck className="h-4 w-4" /> },
    ],
  },
  {
    title: "Payroll",
    items: [
      { to: "/admin/salary-structure", label: "Salary Structure", icon: <Wallet className="h-4 w-4" /> },
      { to: "/admin/salary-components", label: "Salary Components", icon: <SlidersHorizontal className="h-4 w-4" /> },
      { to: "/admin/payroll", label: "Payroll", icon: <Banknote className="h-4 w-4" /> },
      { to: "/admin/payslips", label: "Payslips", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    title: "Reports",
    items: [
      { to: "/admin/reports/salary", label: "Salary Reports", icon: <BarChart3 className="h-4 w-4" /> },
      { to: "/admin/reports/attendance", label: "Attendance Reports", icon: <PieChart className="h-4 w-4" /> },
      { to: "/admin/reports/payroll", label: "Payroll Reports", icon: <LineChart className="h-4 w-4" /> },
    ],
  },
  {
    title: "Administration",
    items: [{ to: "/admin/settings", label: "Admin Settings", icon: <Settings className="h-4 w-4" /> }],
  },
];

function Brand() {
  return (
    <div className="flex items-center gap-3 px-5 py-5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-sm font-bold text-secondary-foreground">
        SG
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-sidebar-foreground">{COMPANY.short}</p>
        <p className="truncate text-[11px] text-sidebar-muted">{COMPANY.tagline}</p>
      </div>
    </div>
  );
}

export function AdminShell({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6 no-scrollbar">
      {GROUPS.map((g) => (
        <div key={g.title}>
          <p className="px-3 pb-2 text-[10px] font-bold tracking-widest text-sidebar-muted uppercase">
            {g.title}
          </p>
          <ul className="space-y-1">
            {g.items.map((item) => {
              const active = pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-secondary text-secondary-foreground font-semibold"
                        : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  const sidebarFooter = (
    <div className="border-t border-sidebar-border px-3 py-4">
      <div className="flex items-center gap-3 rounded-lg px-3 py-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-foreground">
          AD
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-sidebar-foreground">Admin</p>
          <p className="truncate text-[11px] text-sidebar-muted">Administrator</p>
        </div>
      </div>
      <button
        onClick={() => navigate({ to: "/admin/login" })}
        className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-sidebar lg:flex">
        <Brand />
        {nav}
        {sidebarFooter}
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar">
            <div className="flex items-center justify-between">
              <Brand />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="mr-3 rounded-md p-2 text-sidebar-muted hover:text-sidebar-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {nav}
            {sidebarFooter}
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative hidden max-w-sm flex-1 sm:block">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search employees, payslips…"
                className="w-full rounded-lg border border-input bg-background py-2 pr-3 pl-9 text-sm focus:border-ring focus:ring-2 focus:ring-ring/30 focus:outline-none"
              />
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <span className="hidden rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground md:inline">
                {CURRENT_MONTH}
              </span>
              <button
                aria-label="Notifications"
                className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setMenu((m) => !m)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    AD
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-sm font-medium text-foreground">Admin</span>
                    <span className="block text-[11px] text-muted-foreground">Administrator</span>
                  </span>
                </button>
                {menu ? (
                  <div className="absolute right-0 z-40 mt-2 w-48 overflow-hidden rounded-lg border border-border bg-card shadow-elevated">
                    <Link
                      to="/admin/settings"
                      onClick={() => setMenu(false)}
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                    >
                      Admin Settings
                    </Link>
                    <Link
                      to="/"
                      onClick={() => setMenu(false)}
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                    >
                      View Website
                    </Link>
                    <button
                      onClick={() => navigate({ to: "/admin/login" })}
                      className="block w-full px-4 py-2.5 text-left text-sm text-danger hover:bg-muted"
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          {title ? <span className="sr-only">{title}</span> : null}
          {children}
        </main>
      </div>
    </div>
  );
}
