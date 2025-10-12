"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

function GearIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19.14 12.936a7.972 7.972 0 0 0 .06-.936c0-.318-.02-.63-.06-.936l2.02-1.58a.5.5 0 0 0 .12-.66l-1.91-3.304a.5.5 0 0 0-.61-.22l-2.38.96a7.987 7.987 0 0 0-1.62-.936l-.36-2.52a.5.5 0 0 0-.5-.424h-3.82a.5.5 0 0 0-.5.424l-.36 2.52a7.987 7.987 0 0 0-1.62.936l-2.38-.96a.5.5 0 0 0-.61.22L2.68 6.824a.5.5 0 0 0 .12.66l2.02 1.58c-.04.306-.06.618-.06.936s.02.63.06.936l-2.02 1.58a.5.5 0 0 0-.12.66l1.91 3.304a.5.5 0 0 0 .61.22l2.38-.96c.5.38 1.04.69 1.62.936l.36 2.52a.5.5 0 0 0 .5.424h3.82a.5.5 0 0 0 .5-.424l.36-2.52c.58-.246 1.12-.556 1.62-.936l2.38.96a.5.5 0 0 0 .61-.22l1.91-3.304a.5.5 0 0 0-.12-.66l-2.02-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z" />
    </svg>
  )
}

function BarsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6 17a1 1 0 0 1-1-1V9a1 1 0 1 1 2 0v7a1 1 0 0 1-1 1Zm6 0a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v9a1 1 0 0 1-1 1Zm6 0a1 1 0 0 1-1-1v-5a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1Z" />
    </svg>
  )
}

export default function NewSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const items = [
    {
      label: "Dashboard",
      href: "/dashboard/overview",
      Icon: BarsIcon,
    },
    {
      label: "Admin Configuration",
      href: "/admin/configuration",
      Icon: GearIcon,
    },
  ]

  return (
    <aside
      className={`border-r border-slate-200 bg-white transition-[width] duration-200 ${
        collapsed ? "w-56 md:w-16" : "w-56"
      }`}
      aria-label="Sidebar"
    >
      {/* Brand + Collapse */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-slate-900" />
          <span
            className={`text-sm font-semibold text-slate-900 ${
              collapsed ? "hidden md:inline-block md:opacity-0" : ""
            }`}
          >
            Your Product
          </span>
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-100"
          aria-label="Toggle sidebar"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 transition ${collapsed ? "rotate-180" : ""}`}
            fill="currentColor"
            aria-hidden
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="px-2 pb-2 pt-1">
        <ul className="space-y-1">
          {items.map(({ label, href, Icon }) => {
            const active =
              pathname === href || pathname?.startsWith(href + "/")
            return (
              <li key={href}>
                <button
                  onClick={() => router.push(href)}
                  className={`group flex w-full items-center gap-3 rounded-md px-2 py-2 transition focus:outline-none focus:ring-4 focus:ring-sky-100
                    ${
                      active
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-sky-50 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      collapsed ? "hidden md:inline-block md:opacity-0" : ""
                    }`}
                  >
                    {label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Minimal footer area inside sidebar (optional) */}
      <div className="mt-auto hidden p-2 text-center text-[11px] text-slate-500 md:block">
        {/* Keep it empty for sober look or place version */}
      </div>
    </aside>
  )
}