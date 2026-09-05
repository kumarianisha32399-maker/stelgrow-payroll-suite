import { createFileRoute } from "@tanstack/react-router";
import { SiteNavbar, SiteFooter } from "@/components/hr/SiteChrome";
import { COMPANY } from "@/data/mock";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — STELGROW HR HOUSE" },
      { name: "description", content: "Privacy policy for the STELGROW HR HOUSE payroll management software demo." },
      { property: "og:title", content: "Privacy Policy — STELGROW HR HOUSE" },
      { property: "og:description", content: "Privacy policy for the STELGROW HR HOUSE payroll management software demo." },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    title: "Demo application notice",
    body: "This website is a frontend software demonstration. It stores no data on a server and uses mock information only.",
  },
  {
    title: "Information we collect",
    body: "No personal information is collected, transmitted or stored by this demo. Any details entered in forms remain in your browser session and are lost on refresh.",
  },
  {
    title: "Employee data in the live product",
    body: "In a production deployment, employee, payroll and attendance data would be processed solely to operate HR and payroll services for the employer.",
  },
  {
    title: "Cookies",
    body: "This demo does not set advertising or tracking cookies.",
  },
  {
    title: "Contact",
    body: `Questions about this policy can be addressed to ${COMPANY.name}, ${COMPANY.address}.`,
  },
];

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
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
