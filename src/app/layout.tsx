import type { Metadata } from "next";
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
            <a href="/" className="site-nav__brand" aria-label="Aotearoa Festivals home">
              Aotearoa Festivals
            </a>
            <ul className="site-nav__links" role="list">
              <li>
                <a href="/festivals" className="site-nav__link">Festivals</a>
              </li>
              <li>
                <a href="/artists" className="site-nav__link">Artists</a>
              </li>
              <li>
                <a href="/promoters" className="site-nav__link">Promoters</a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="site-content">
          {children}
        </div>
      </body>
    </html>
  );
}
