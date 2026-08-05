import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aotearoa Festivals",
  description: "New Zealand music festivals, promoters, and the artists who play them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
