import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact — Aotearoa Festivals",
  description:
    "Get in touch about Aotearoa Festivals. Submit festivals, corrections, or ideas.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Contact</h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground dark:text-muted-foreground">
        <p>
          Got a festival to add? Found an error? Have an idea? We&apos;d love to
          hear from you.
        </p>
        <div className="space-y-2">
          <p>
            <strong className="text-black dark:text-primary-foreground">
              GitHub
            </strong>{" "}
            — The best way to submit corrections or new festivals:{" "}
            <a
              href="https://github.com/olitreadwell/aotearoa-festivals"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline dark:text-primary"
            >
              github.com/olitreadwell/aotearoa-festivals
            </a>
          </p>
          <p>
            Open an issue with festival details, or submit a pull request with
            seed data changes.
          </p>
          <p className="mt-6">
            For anything else, reach out on GitHub or email the maintainers
            listed in the repo.
          </p>
        </div>
      </div>
    </main>
  );
}
