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
            </ul>
          </nav>
        </header>
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
