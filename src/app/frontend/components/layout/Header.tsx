'use client';

import Link from 'next/link';
import Image from 'next/image'
import { useState } from 'react';
import { ThemeSwitcher } from '../ui/theme-switcher';

type AdminHeaderProps = {
  onToggleSidebar?: () => void;
  title?: string;
  showSearch?: boolean;
  onLogout?: () => Promise<void> | void; // optional custom logout
  logoSrc?: string;
};

export default function Header({
  onToggleSidebar,
  title = 'Admin',
  showSearch = true,
  onLogout,
  logoSrc = '/icons/opura-logo.png'
}: AdminHeaderProps) {
  const [q, setQ] = useState('');
  const [loadingLogout, setLoadingLogout] = useState(false);

  async function handleLogout() {
    try {
      setLoadingLogout(true);
      if (onLogout) {
        await onLogout();
      } else {
        // default logout: adjust endpoint if needed
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        // Optionally redirect:
        localStorage.clear();
        if (typeof window !== 'undefined') window.location.href = '/sign-in';
      }
    } catch (e) {
      console.error('Logout failed', e);
    } finally {
      setLoadingLogout(false);
    }
  }

  return (
    <div className="sticky top-0 z-40 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center gap-3">
          {/* Sidebar toggle (mobile) */}
          <button
            aria-label="Toggle Sidebar"
            onClick={onToggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Brand with PNG logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <span className="inline-grid h-9 w-9 place-items-center overflow-hidden rounded-md">
              <Image
                src={logoSrc}
                alt="Opura Admin"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
                priority
              />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Opura Admin
              </p>
            </div>
          </Link>

          {/* Divider */}
          <div className="mx-2 hidden h-6 w-px bg-slate-200 dark:bg-slate-800 md:block" />

          {/* Page title (desktop) */}
          <h1 className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 md:block">
            {title}
          </h1>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search (desktop) */}
          {showSearch && (
            <div className="relative hidden w-full max-w-sm md:block">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="7" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" strokeWidth="2" />
                </svg>
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* <Link
              href="/"
              className="hidden rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 md:inline-flex"
            >
              View Site
            </Link> */}

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeWidth="2"
                  d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 1 1-6 0"
                />
              </svg>
            </button>

            <ThemeSwitcher />

            {/* Profile dropdown (minimal) */}
            <div className="relative">
              <details className="group">
                <summary className="list-none inline-flex h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-full bg-slate-200 px-3 text-sm font-medium text-slate-800 hover:ring-2 hover:ring-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:ring-slate-700">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                    AA
                  </span>
                  <svg
                    className="h-4 w-4 text-slate-500 group-open:rotate-180 transition"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeWidth="2" d="M6 9l6 6 6-6" />
                  </svg>
                </summary>

                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-md border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-900">
                  <div className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400">
                    Signed in as admin@example.com
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-700" />
                  <Link
                    href="/admin/account"
                    className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Account Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loadingLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-700 hover:bg-rose-50 disabled:opacity-60 dark:text-rose-300 dark:hover:bg-rose-900/30"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="2" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
                    </svg>
                    {loadingLogout ? 'Logging out…' : 'Logout'}
                  </button>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}