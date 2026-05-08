import type { ReactNode, ComponentType } from 'react'
import { Sparkles, Search, Bell, ChevronDown } from 'lucide-react'
import '../../_group.css'

export interface DashNavItem {
  id: string
  label: string
  Icon: ComponentType<{ className?: string }>
  count?: number | string
  active?: boolean
}

export interface DashNavSection {
  label?: string
  items: DashNavItem[]
}

export interface DashboardShellProps {
  /** Accent color hex (e.g. "#F4636E") used for active states + role badge */
  accent: string
  /** Soft accent rgba used for backgrounds + glows */
  accentSoft: string
  /** Role label shown in the topbar pill (e.g. "ADMIN") */
  roleLabel: string
  sections: DashNavSection[]
  user: { name: string; role: string; initials: string }
  /** Optional extra elements before the avatar in the topbar */
  topbarExtras?: ReactNode
  /** Search placeholder */
  searchPlaceholder?: string
  children: ReactNode
}

export function DashboardShell({
  accent,
  accentSoft,
  roleLabel,
  sections,
  user,
  topbarExtras,
  searchPlaceholder = 'Search…',
  children,
}: DashboardShellProps) {
  return (
    <div className="hm-root" style={{ minHeight: '900px' }}>
      <div className="flex" style={{ minHeight: '900px' }}>
        {/* ───────── Sidebar ───────── */}
        <aside
          className="flex flex-col shrink-0"
          style={{
            width: 248,
            background: 'var(--hm-bg-elev)',
            borderRight: '1px solid var(--hm-border)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Brand */}
          <div
            className="flex items-center gap-2.5 px-5"
            style={{ height: 64, borderBottom: '1px solid var(--hm-border)' }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: 'var(--hm-grad-primary)', boxShadow: 'var(--hm-glow-violet)' }}
            >
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span
              className="text-[16px] font-semibold tracking-tight"
              style={{ fontFamily: 'var(--hm-font-display)', color: 'var(--hm-text)' }}
            >
              Hyper<span style={{ color: 'var(--hm-violet-2)' }}>Mind</span>
            </span>
          </div>

          {/* Nav sections */}
          <nav className="flex-1 overflow-y-auto px-3 py-5">
            {sections.map((section, sIdx) => (
              <div key={sIdx} className={sIdx > 0 ? 'mt-6' : ''}>
                {section.label && (
                  <p
                    className="hm-mono px-2 mb-2 text-[10px]"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
                  >
                    {section.label.toUpperCase()}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = item.active
                    return (
                      <li key={item.id}>
                        <a
                          href="#"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] transition-colors"
                          style={{
                            color: isActive ? accent : 'var(--hm-text-muted)',
                            background: isActive ? accentSoft : 'transparent',
                            fontWeight: isActive ? 600 : 500,
                            border: isActive ? `1px solid ${accentSoft}` : '1px solid transparent',
                            position: 'relative',
                          }}
                        >
                          {isActive && (
                            <span
                              aria-hidden
                              style={{
                                position: 'absolute',
                                left: -3,
                                top: 8,
                                bottom: 8,
                                width: 3,
                                borderRadius: 2,
                                background: accent,
                                boxShadow: `0 0 12px ${accent}`,
                              }}
                            />
                          )}
                          <item.Icon className="h-4 w-4 shrink-0" />
                          <span className="flex-1">{item.label}</span>
                          {item.count !== undefined && (
                            <span
                              className="hm-mono text-[10.5px] px-1.5 py-0.5 rounded-md"
                              style={{
                                color: isActive ? accent : 'var(--hm-text-dim)',
                                background: isActive ? accentSoft : 'var(--hm-bg-card)',
                                border: '1px solid var(--hm-border)',
                                letterSpacing: '0.06em',
                              }}
                            >
                              {item.count}
                            </span>
                          )}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* User card */}
          <div className="px-3 py-3" style={{ borderTop: '1px solid var(--hm-border)' }}>
            <div
              className="flex items-center gap-2.5 px-2 py-2 rounded-lg"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold"
                style={{
                  background: `linear-gradient(180deg, ${accent} 0%, ${accent}cc 100%)`,
                  color: 'white',
                }}
              >
                {user.initials}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[12.5px] font-medium truncate"
                  style={{ color: 'var(--hm-text)' }}
                >
                  {user.name}
                </p>
                <p className="text-[11px] truncate" style={{ color: 'var(--hm-text-dim)' }}>
                  {user.role}
                </p>
              </div>
              <ChevronDown className="h-3.5 w-3.5" style={{ color: 'var(--hm-text-dim)' }} />
            </div>
          </div>
        </aside>

        {/* ───────── Main column ───────── */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Topbar */}
          <header
            className="flex items-center gap-4 px-7 shrink-0"
            style={{
              height: 64,
              borderBottom: '1px solid var(--hm-border)',
              background: 'rgba(11,13,23,0.7)',
              backdropFilter: 'blur(12px)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Role badge */}
            <span
              className="hm-mono inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-semibold"
              style={{
                color: accent,
                background: accentSoft,
                border: `1px solid ${accent}40`,
                letterSpacing: '0.14em',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: accent,
                  boxShadow: `0 0 8px ${accent}`,
                }}
              />
              {roleLabel}
            </span>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                }}
              >
                <Search className="h-3.5 w-3.5" style={{ color: 'var(--hm-text-dim)' }} />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="flex-1 bg-transparent outline-none text-[13px]"
                  style={{ color: 'var(--hm-text)' }}
                  defaultValue=""
                />
                <span
                  className="hm-mono text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    color: 'var(--hm-text-dim)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  ⌘K
                </span>
              </div>
            </div>

            {topbarExtras}

            {/* Notifications */}
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-lg"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              <Bell className="h-4 w-4" />
              <span
                style={{
                  position: 'absolute',
                  top: 7,
                  right: 7,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: accent,
                  boxShadow: `0 0 8px ${accent}`,
                }}
              />
            </button>

            {/* Avatar */}
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold"
              style={{
                background: `linear-gradient(180deg, ${accent} 0%, ${accent}cc 100%)`,
                color: 'white',
              }}
            >
              {user.initials}
            </span>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto" style={{ padding: '26px 28px 40px' }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
