'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PlanNavLink } from '@/components/PlanNavLink';

const NAV_LINKS: { href: string; label: string }[] = [{ href: '/plan', label: 'Plan' }];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" role="banner">
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="site-nav__brand" aria-label="Aotearoa Festivals home">
          Aotearoa Festivals
        </Link>

        {/* Desktop links + theme */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="site-nav__links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.href === '/plan' ? (
                  <PlanNavLink className="site-nav__link" />
                ) : (
                  <Link href={link.href} className="site-nav__link">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted dark:hover:bg-muted"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen glass overlay */}
      {open && (
        <div
          id="mobile-menu"
          className="site-nav__mobile-menu flex flex-col items-center justify-center"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col items-center gap-2" role="list">
            {NAV_LINKS.map((link, index) => (
              <li
                key={link.href}
                className="menu-link-in"
                style={{ animationDelay: `${index * 70 + 60}ms` }}
              >
                {link.href === '/plan' ? (
                  <PlanNavLink
                    className="block px-6 py-3 text-2xl font-semibold tracking-tight"
                    onClick={() => setOpen(false)}
                  />
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-3 text-2xl font-semibold tracking-tight"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li
              className="menu-link-in"
              style={{ animationDelay: `${NAV_LINKS.length * 70 + 60}ms` }}
            >
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block px-6 py-3 text-lg text-muted-foreground"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
