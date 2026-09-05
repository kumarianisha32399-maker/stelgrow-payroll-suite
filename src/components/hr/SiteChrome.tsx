import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MapPin } from "lucide-react";
import { COMPANY } from "@/data/mock";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#modules", label: "Modules" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            SG
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-foreground sm:text-base">{COMPANY.short}</span>
            <span className="block text-[11px] text-muted-foreground">{COMPANY.tagline}</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          to="/admin/login"
          className="ml-auto hidden rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90 lg:ml-4 lg:inline-flex"
        >
          Admin Login
        </Link>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="ml-auto rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/admin/login"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-secondary px-3 py-2.5 text-center text-sm font-semibold text-secondary-foreground"
          >
            Admin Login
          </Link>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-base font-bold">{COMPANY.name}</p>
          <p className="mt-2 text-sm opacity-80">Smart HR & Payroll Management Solutions</p>
          <p className="mt-4 flex gap-2 text-sm opacity-80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            {COMPANY.address}
          </p>
          <p className="mt-3 text-xs opacity-70">CIN: {COMPANY.cin}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            {LINKS.filter((l) => l.label !== "About").map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:opacity-100 hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Software Access</p>
          <p className="mt-4 text-sm opacity-80">
            Administrators can sign in to the payroll management demo panel.
          </p>
          <Link
            to="/admin/login"
            className="mt-4 inline-flex rounded-lg border border-primary-foreground/40 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
          >
            Admin Login
          </Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 px-4 py-5 text-center text-xs opacity-75">
        © 2026 {COMPANY.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
