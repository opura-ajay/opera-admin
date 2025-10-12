'use client'

import { useState, Fragment } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

type NavItem = {
  label: string
  icon?: React.ReactNode
  href?: string
  children?: Array<{ label: string; href: string; icon?: React.ReactNode }>
}

/* Inline SVG icons (same pattern as your existing ones) */
const IconDashboard = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M6 17a1 1 0 0 1-1-1V9a1 1 0 1 1 2 0v7a1 1 0 0 1-1 1Zm6 0a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v9a1 1 0 0 1-1 1Zm6 0a1 1 0 0 1-1-1v-5a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1Z" />
  </svg>
)

const IconAdmin = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M19.14 12.936a7.972 7.972 0 0 0 .06-.936c0-.318-.02-.63-.06-.936l2.02-1.58a.5.5 0 0 0 .12-.66l-1.91-3.304a.5.5 0 0 0-.61-.22l-2.38.96a7.987 7.987 0 0 0-1.62-.936l-.36-2.52a.5.5 0 0 0-.5-.424h-3.82a.5.5 0 0 0-.5.424l-.36 2.52a7.987 7.987 0 0 0-1.62.936l-2.38-.96a.5.5 0 0 0-.61.22L2.68 6.824a.5.5 0 0 0 .12.66l2.02 1.58c-.04.306-.06.618-.06.936s.02.63.06.936l-2.02 1.58a.5.5 0 0 0-.12.66l1.91 3.304a.5.5 0 0 0 .61.22l2.38-.96c.5.38 1.04.69 1.62.936l.36 2.52a.5.5 0 0 0 .5.424h3.82a.5.5 0 0 0 .5-.424l.36-2.52c.58-.246 1.12-.556 1.62-.936l2.38.96a.5.5 0 0 0 .61-.22l1.91-3.304a.5.5 0 0 0-.12-.66l-2.02-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z" />
  </svg>
)

/* Section-specific icons (inline, same style) */
const IconBotSetup = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 2a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v3h2a1 1 0 1 1 0 2h-2v2a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V11H4a1 1 0 1 1 0-2h2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1Zm-4 9a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" />
  </svg>
)

const IconBranding = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M4 6a2 2 0 0 1 2-2h7l3 3h4v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm5 4h10v2H9v-2zm0 4h7v2H9v-2z" />
  </svg>
)

const IconAISettings = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 2a5 5 0 0 1 5 5v2h1a2 2 0 1 1 0 4h-1v2a5 5 0 0 1-10 0v-2H6a2 2 0 1 1 0-4h1V7a5 5 0 0 1 5-5Zm-3 9v2a3 3 0 0 0 6 0v-2H9Z" />
  </svg>
)

const IconBehavior = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M4 5h10a2 2 0 0 1 2 2v3H9l-4 3V7a2 2 0 0 1 2-2Zm6 9h10l-4 3v3H10a2 2 0 0 1-2-2v-4z" />
  </svg>
)

const IconKnowledge = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M6 4h9a3 3 0 0 1 3 3v10a1 1 0 0 1-1.447.894L13 16.118l-3.553 1.776A1 1 0 0 1 8 17V7a3 3 0 0 1-2-3Z" />
  </svg>
)

const IconHandoff = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M9 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm14 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM8 22v-3a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v3H8Zm8 0v-3a5.99 5.99 0 0 0-2-4.472A5.99 5.99 0 0 1 18 19v3h-2Z" />
  </svg>
)

const IconGuardrails = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
  </svg>
)

const IconAnalytics = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M4 19h16v2H4v-2Zm2-9h3v7H6v-7Zm5-4h3v11h-3V6Zm5 6h3v5h-3v-5Z" />
  </svg>
)

const IconDevOptions = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M8.5 6.5 3 12l5.5 5.5 1.5-1.5L6 12l4-4-1.5-1.5Zm7 0L21 12l-5.5 5.5-1.5-1.5 4-4-4-4 1.5-1.5Z" />
  </svg>
)

/* Nav config with icons everywhere */
const nav: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard/overview',
    icon: IconDashboard,
  },
  {
    label: 'Admin Config',
    icon: IconAdmin,
    children: [
      { label: 'Bot Setup', href: '/admin/configuration/bot-setup', icon: IconBotSetup },
      { label: 'Branding', href: '/admin/configuration/branding', icon: IconBranding },
      { label: 'AI Settings', href: '/admin/configuration/ai-settings', icon: IconAISettings },
      { label: 'Behavior', href: '/admin/configuration/behavior', icon: IconBehavior },
      { label: 'Knowledge Base', href: '/admin/configuration/knowledge', icon: IconKnowledge },
      { label: 'Human Handoff', href: '/admin/configuration/handoff', icon: IconHandoff },
      { label: 'AI Guardrails', href: '/admin/configuration/guardrails', icon: IconGuardrails },
      { label: 'Analytics', href: '/admin/configuration/analytics', icon: IconAnalytics },
      { label: 'Developer Options', href: '/admin/configuration/dev-options', icon: IconDevOptions },
    ],
  },
]

const logoSrc: string = '/icons/opura-logo.png'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState<Record<string, boolean>>({
    'Admin Config': true,
  })
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href?: string) =>
    href ? pathname === href || pathname?.startsWith(href + '/') : false

  return (
    <aside
      className={`flex pt-1 h-screen flex-col border-r border-slate-200 bg-white transition-[width] duration-200 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top brand + collapse button */}
      <div className="flex items-center justify-between gap-2 px-3 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-grid h-9 w-9 place-items-center overflow-hidden rounded-md">
            <Image
              src={logoSrc}
              alt="Opura Admin"
              width={28}
              height={28}
              className="h-8 w-8 object-contain"
              priority
            />
          </span>
          {!collapsed && (
            <span className="text-sm font-semibold text-slate-900">
              Opura Admin
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-100"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 transition ${collapsed ? 'rotate-180' : ''}`}
            fill="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <ul className="space-y-1">
          {nav.map((item) => {
            const hasChildren = !!item.children?.length
            const openState = open[item.label] ?? false
            const active =
              isActive(item.href) ||
              (hasChildren && item.children!.some((c) => isActive(c.href)))

            return (
              <li key={item.label}>
                {/* Parent row */}
                <div
                  className={`group flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-slate-700 hover:bg-slate-100 ${
                    active ? 'bg-slate-100 text-slate-900' : ''
                  }`}
                  onClick={() => {
                    if (hasChildren) {
                      setOpen((s) => ({ ...s, [item.label]: !openState }))
                    } else if (item.href) {
                      router.push(item.href)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      if (hasChildren) {
                        setOpen((s) => ({ ...s, [item.label]: !openState }))
                      } else if (item.href) {
                        router.push(item.href)
                      }
                    }
                  }}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center text-sky-700">
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <Fragment>
                      <span className="flex-1 truncate text-sm font-medium">
                        {item.label}
                      </span>
                      {hasChildren ? (
                        <ChevronRight
                          className={`h-4 w-4 text-slate-500 transition-transform ${
                            openState ? 'rotate-90' : ''
                          }`}
                        />
                      ) : null}
                    </Fragment>
                  )}
                </div>

                {/* Children */}
                {hasChildren && openState && !collapsed && (
                  <ul className="mt-1 space-y-1 pl-8">
                    {item.children!.map((c) => (
                      <li key={c.href}>
                        <button
                          onClick={() => router.push(c.href)}
                          className={`w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 ${
                            isActive(c.href)
                              ? 'bg-slate-100 font-medium text-slate-900'
                              : ''
                          }`}
                        >
                          <span className="inline-flex h-5 w-5 items-center justify-center text-sky-700">
                            {c.icon}
                          </span>
                          <span>{c.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-slate-200 p-[6px]">
        <button className="w-full rounded-md px-2 py-2 text-left text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          Logout
        </button>
      </div>
    </aside>
  )
}