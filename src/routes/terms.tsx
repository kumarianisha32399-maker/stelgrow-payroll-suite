import { createFileRoute } from "@tanstack/react-router";
import { SiteNavbar, SiteFooter } from "@/components/hr/SiteChrome";
import { COMPANY } from "@/data/mock";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — STELGROW HR HOUSE" },
      { name: "description", content: "Terms of use for the STELGROW HR HOUSE payroll management software demo." },
      { property: "og:title", content: "Terms of Use — STELGROW HR HOUSE" },
      { property: "og:description", content: "Terms of use for the STELGROW HR HOUSE payroll management software demo." },
    ],
  }),
  component: Terms,
});

const SECTIONS = [
  {
    title: "Acceptance",
    body: `By accessing this demo you agree to these terms. The software is presented by ${COMPANY.name} for evaluation purposes.`,
  },
  {
    title: "Demonstration only",
    body: "All employees, salaries, attendance records and payroll figures shown are fictional sample data created for demonstration.",
  },
  {
    title: "No warranty",
    body: "The demo is provided as-is, without warranty of availability, accuracy or fitness for a particular purpose.",
  },
  {
    title: "Admin access",
    body: "The admin portal uses demo credentials and performs no real authentication. Do not enter confidential information.",
  },
  {
    title: "Intellectual property",
    body: `Branding, layout and content belong to ${COMPANY.name} (CIN ${COMPANY.cin}).`,
  },
];

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground">Terms of Use</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: September 2026</p>
        <div className="mt-8 space-y-7">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
