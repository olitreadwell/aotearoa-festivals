import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aotearoa Festivals",
  description:
    "New Zealand music festivals, promoters, and the artists who play them.",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem("theme");
    var theme =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.classList.add(theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <header className="site-header" role="banner">
          <nav className="site-nav" aria-label="Main navigation">
            <Link
              href="/"
              className="site-nav__brand"
              aria-label="Aotearoa Festivals home"
            >
              Aotearoa Festivals
            </Link>
            <ul className="site-nav__links" role="list">
              <li>
                <Link href="/festivals" className="site-nav__link">
                  Festivals
                </Link>
              </li>
              <li>
                <Link href="/artists" className="site-nav__link">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="/promoters" className="site-nav__link">
                  Promoters
                </Link>
              </li>
              <li>
                <Link href="/regions" className="site-nav__link">
                  Regions
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="site-nav__link">
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="/about" className="site-nav__link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="site-nav__link">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/search" className="site-nav__link">
                  Search
                </Link>
              </li>
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </header>
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
