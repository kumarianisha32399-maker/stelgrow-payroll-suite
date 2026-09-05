import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button, Field, Input } from "@/components/hr/UI";
import { COMPANY } from "@/data/mock";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — STELGROW HR HOUSE Payroll" },
      { name: "description", content: "Sign in to the STELGROW HR HOUSE payroll management demo admin portal." },
      { property: "og:title", content: "Admin Login — STELGROW HR HOUSE Payroll" },
      { property: "og:description", content: "Sign in to the STELGROW HR HOUSE payroll management demo admin portal." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@stelgrowhr.com");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (email.trim().toLowerCase() === "admin@stelgrowhr.com" && password === "admin123") {
      setError("");
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid credentials. Please check your email and password and try again.");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-b from-accent/60 to-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            SG
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-foreground">{COMPANY.short}</span>
            <span className="block text-[11px] text-muted-foreground">{COMPANY.tagline}</span>
          </span>
        </div>

        <form onSubmit={submit} className="card-surface p-6 sm:p-8">
          <h1 className="text-xl font-semibold text-foreground">Admin Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage payroll and HR operations.</p>

          {error ? (
            <p className="mt-5 flex items-start gap-2 rounded-lg bg-danger-soft px-3 py-2.5 text-sm text-danger">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </p>
          ) : null}

          <div className="mt-5 space-y-4">
            <Field label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@stelgrowhr.com"
                required
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </Field>
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-input accent-[var(--secondary)]"
            />
            Remember Me
          </label>

          <Button type="submit" className="mt-6 w-full">
            Login
          </Button>

          <p className="mt-5 rounded-lg border border-dashed border-border bg-muted/60 px-3 py-2.5 text-xs text-muted-foreground">
            Demo credentials — Email: <strong>admin@stelgrowhr.com</strong> · Password: <strong>admin123</strong>
          </p>

          <Link
            to="/"
            className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-secondary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Website
          </Link>
        </form>
      </div>
    </div>
  );
}
