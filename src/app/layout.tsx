import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aotearoa Festivals",
  description:
    "New Zealand music festivals, promoters, and the artists who play them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
                <Link href="/search" className="site-nav__link">
                  Search
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="site-content">{children}</div>
        <footer
          style={{
            borderTop: "1px solid var(--color-border, #e5e7eb)",
            marginTop: "3rem",
            padding: "1.5rem 1rem",
            color: "var(--color-muted, #6b7280)",
            fontSize: "0.875rem",
          }}
        >
          <div
            style={{
              maxWidth: "var(--site-content-max-width, 72rem)",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>© 2026 Aotearoa Festivals · Built with ❤️ in Aotearoa</span>
            <nav aria-label="Footer links" style={{ display: "flex", gap: "1rem" }}>
              <Link href="/feed.xml" style={{ color: "inherit" }}>
                RSS
              </Link>
              <Link href="/sitemap.xml" style={{ color: "inherit" }}>
                Sitemap
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
