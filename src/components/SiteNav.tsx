"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/festivals", label: "Festivals" },
  { href: "/calendar", label: "Calendar" },
  { href: "/map", label: "Map" },
  { href: "/search", label: "Search" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" role="banner">
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="site-nav__brand" aria-label="Aotearoa Festivals home">
          Aotearoa Festivals
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:block">
        <ul className="site-nav__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="site-nav__link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        </div>

        {/* Mobile hamburger + theme toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop theme toggle */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {open && (
        <div id="mobile-menu" className="border-t border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-[#0a0a0a] md:hidden" role="navigation" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
