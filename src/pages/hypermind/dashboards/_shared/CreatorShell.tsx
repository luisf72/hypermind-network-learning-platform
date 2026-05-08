import { useEffect, useState, type ReactNode } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'
import { CREATOR_PATHS, ROLE_BASE, getDashboardPathByRole } from '@/lib/dashboardPaths'
import { RoleSwitcher } from '@/components/RoleSwitcher'
import { UserProfileMenu } from '@/components/UserProfileMenu'
import { BrandLogo } from '@/components/BrandLogo'
import {
  LayoutGrid,
  BookOpen,
  GraduationCap,
  UserPlus,
  Star,
  Wallet,
  UserCircle2,
  Sun,
  Moon,
  Settings as SettingsIcon,
  PanelLeftClose,
  PanelLeftOpen,
  CreditCard,
  Receipt,
  Award,
  type LucideIcon,
} from 'lucide-react'
import '../../_group.css'

/**
 * Shared shell for the combined Creator + Evaluator dashboard.
 *
 * Modelled directly on AdminShell — same fixed sidebar (256px collapsing
 * keeping desktop layout intact and switching to overlay below 768px, same flat list of
 * top-level nav entries, same translucent topbar with theme toggle and
 * profile dropdown.
 *
 * The only structural differences vs AdminShell are:
 *  - Brand badge area carries TWO mono role pills side-by-side
 *    (CREATOR in amber + EVALUATOR in teal) since this user wears
 *    both hats — mirroring the admin's single ADMIN pill.
 *  - The accent driving the active nav state, profile gradient and the
 *    rest of the chrome is the warm amber #F4B26C — the creator/studio
 *    identity carries the role overall.
 *  - Sidebar contains exactly 7 nav entries: Overview, Courses,
 *    Assessments, Enrollments, Reviews, Profile, Earnings.
 */

const ACCENT = '#F4B26C' // amber — creator/studio
const ACCENT_SOFT = 'rgba(244,178,108,0.12)'
const SECONDARY = '#5BC8C5' // teal — evaluator
const SECONDARY_SOFT = 'rgba(91,200,197,0.12)'

export type CreatorPageId =
  | 'overview'
  | 'courses'
  | 'assessments'
  | 'enrollments'
  | 'reviews'
  | 'certificates'
  | 'profile'
  | 'earnings'
  | 'subscription'
  | 'credit-log'
  | 'settings'

interface NavLeaf {
  id: CreatorPageId
  tKey: string
  Icon: LucideIcon
}

const NAV_ENTRIES: NavLeaf[] = [
  { id: 'overview', tKey: 'creatorNav.overview', Icon: LayoutGrid },
  { id: 'courses', tKey: 'creatorNav.courses', Icon: BookOpen },
  { id: 'assessments', tKey: 'creatorNav.assessments', Icon: GraduationCap },
  { id: 'enrollments', tKey: 'creatorNav.enrollments', Icon: UserPlus },
  { id: 'reviews', tKey: 'creatorNav.reviews', Icon: Star },
  { id: 'certificates', tKey: 'creatorNav.certificates', Icon: Award },
  { id: 'profile', tKey: 'creatorNav.profile', Icon: UserCircle2 },
  { id: 'earnings', tKey: 'creatorNav.earnings', Icon: Wallet },
  { id: 'subscription', tKey: 'creatorNav.subscription', Icon: CreditCard },
  { id: 'credit-log', tKey: 'creatorNav.creditLog', Icon: Receipt },
  { id: 'settings', tKey: 'creatorNav.settings', Icon: SettingsIcon },
]

interface CreatorShellProps {
  activeId: CreatorPageId
  children: ReactNode
}

export default function CreatorShell({ activeId, children }: CreatorShellProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggle)
  const isLight = theme === 'light'
  const authUser = useAuthStore((s) => s.user)
  const activeAuthRole = useAuthStore((s) => s.activeRole)
  const switchAuthRole = useAuthStore((s) => s.switchRole)
  const logout = useAuthStore((s) => s.logout)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  // Auto-close the mobile sidebar overlay whenever the user navigates.
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])
  const handleSidebarToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileOpen((v) => !v)
    } else {
      setSidebarCollapsed((v) => !v)
    }
  }
  const handleRoleSwitch = (id: 'admin' | 'creator' | 'evaluator' | 'student') => {
    const nextRole = switchAuthRole(id)
    if (nextRole === 'guest') return
    navigate(getDashboardPathByRole(nextRole))
  }
  const displayName = authUser?.name ?? 'User'
  const displayEmail = authUser?.email ?? ''
  const displayInitials =
    authUser?.initials ||
    displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')
  const roleBadgeMeta =
    activeAuthRole === 'admin'
      ? { color: '#F4636E', soft: 'rgba(244,99,110,0.10)', tKey: 'roleSwitch.admin' }
      : activeAuthRole === 'student'
        ? { color: '#7C5CF6', soft: 'rgba(124,92,246,0.12)', tKey: 'roleSwitch.student' }
        : { color: '#F4B26C', soft: 'rgba(244,178,108,0.14)', tKey: 'roleSwitch.creator' }
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div
      className={`hm-root hm-creator-shell${isLight ? ' hm-light' : ''}`}
      style={{
        height: '100vh',
        minHeight: 900,
        display: 'flex',
        overflow: 'hidden',
        background: 'var(--hm-bg)',
      }}
    >
      <ResponsiveStyles />

      {/* ─────────── Sticky sidebar ─────────── */}
      <aside
        className="hm-creator-sidebar flex flex-col shrink-0"
        data-mobile-open={mobileOpen ? 'true' : 'false'}
        style={{
          width: sidebarCollapsed ? 60 : 256,
          transition: 'width 0.2s ease',
          background: 'var(--hm-bg-elev)',
          borderRight: '1px solid var(--hm-border)',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Brand */}
        <Link
          to="/creator"
          aria-label={t('common.dashboard')}
          className="hm-creator-brand flex items-center shrink-0"
          style={{
            height: 64,
            borderBottom: '1px solid var(--hm-border)',
            padding: sidebarCollapsed ? '0 12px' : '0 20px',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            gap: sidebarCollapsed ? 0 : 10,
            textDecoration: 'none',
          }}
        >
          <BrandLogo size={32} />
          {!sidebarCollapsed && (
            <>
              <span
                className="text-[16px] font-semibold tracking-tight"
                style={{ fontFamily: 'var(--hm-font-display)', color: 'var(--hm-text)' }}
              >
                Hyper<span style={{ color: 'var(--hm-violet-2)' }}>Mind</span>
              </span>
            </>
          )}
        </Link>

        {/* Scrollable nav — flat list, no submenus */}
        <nav
          className="flex-1 overflow-y-auto hm-scroll"
          style={{ padding: sidebarCollapsed ? '16px 8px' : '16px 12px' }}
        >
          <ul className="space-y-0.5">
            {NAV_ENTRIES.map((entry) => (
              <li key={entry.id}>
                <NavLeafLink
                  leaf={entry}
                  active={entry.id === activeId}
                  collapsed={sidebarCollapsed}
                />
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* ─────────── Main column ─────────── */}
      <div className="flex-1 min-w-0 flex flex-col" style={{ height: '100%' }}>
        {/* Topbar */}
        <header
          className="flex items-center gap-3 px-7 shrink-0 relative"
          style={{
            height: 64,
            borderBottom: '1px solid var(--hm-border)',
            background: isLight ? 'rgba(255,255,255,0.72)' : 'rgba(11,13,23,0.6)',
            backdropFilter: 'blur(10px)',
            zIndex: 50,
          }}
        >
          {/* Sidebar toggle */}
          <button
            type="button"
            onClick={handleSidebarToggle}
            title={sidebarCollapsed ? t('shell.expandSidebar') : t('shell.collapseSidebar')}
            aria-label={mobileOpen ? t('shell.closeSidebar') : t('shell.openSidebar')}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors shrink-0"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-muted)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ACCENT_SOFT
              e.currentTarget.style.color = ACCENT
              e.currentTarget.style.borderColor = `${ACCENT}44`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--hm-bg-card)'
              e.currentTarget.style.color = 'var(--hm-text-muted)'
              e.currentTarget.style.borderColor = 'var(--hm-border)'
            }}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-3.5 w-3.5" />
            ) : (
              <PanelLeftClose className="h-3.5 w-3.5" />
            )}
          </button>

          <div className="flex-1" />

          <RoleSwitcher
            availableRoles={authUser?.roles ?? []}
            activeRole={activeAuthRole}
            onSwitch={handleRoleSwitch}
            titleKey="shell.switchPerspective"
          />

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isLight ? t('shell.switchToDark') : t('shell.switchToLight')}
            title={isLight ? t('shell.switchToDark') : t('shell.switchToLight')}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            style={{
              background: 'transparent',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-muted)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--hm-bg-card)'
              e.currentTarget.style.color = 'var(--hm-text)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--hm-text-muted)'
            }}
          >
            {isLight ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          </button>

          <UserProfileMenu
            name={displayName}
            email={displayEmail}
            initials={displayInitials}
            profilePath="/creator/profile"
            accentColor={ACCENT}
            accentTextColor="#1a1208"
            subtitle={t(roleBadgeMeta.tKey).toUpperCase()}
            onLogout={handleLogout}
          />
        </header>

        {/* Scrollable main */}
        <main className="flex-1 overflow-y-auto hm-scroll" style={{ padding: '26px 28px 40px' }}>
          {children}
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label={t('shell.closeSidebar')}
          className="hm-mobile-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  )
}

/* ── Nav helper ──────────────────────────────────────────────── */

function NavLeafLink({
  leaf,
  active,
  collapsed,
}: {
  leaf: NavLeaf
  active: boolean
  collapsed: boolean
}) {
  const { t } = useTranslation()
  const to = CREATOR_PATHS[leaf.id] ?? '/creator'
  const label = t(leaf.tKey)
  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      className="flex items-center rounded-lg text-[13px] transition-colors"
      style={{
        paddingLeft: collapsed ? 0 : 12,
        paddingRight: collapsed ? 0 : 10,
        paddingTop: 6,
        paddingBottom: 6,
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: collapsed ? 0 : 10,
        color: active ? ACCENT : 'var(--hm-text-muted)',
        background: active ? ACCENT_SOFT : 'transparent',
        fontWeight: active ? 600 : 500,
        border: active ? `1px solid ${ACCENT}26` : '1px solid transparent',
        position: 'relative',
      }}
    >
      {active && !collapsed && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: -3,
            top: 7,
            bottom: 7,
            width: 3,
            borderRadius: 2,
            background: ACCENT,
            boxShadow: `0 0 12px ${ACCENT}`,
          }}
        />
      )}
      <leaf.Icon className="h-3.5 w-3.5 shrink-0" />
      {!collapsed && <span className="flex-1 truncate">{label}</span>}
    </Link>
  )
}

/* ── Responsive rules ────────────────────────────────────────── */

function ResponsiveStyles() {
  return (
    <style>{`
      /* Desktop (>= 768px) keeps full sidebar in flow.
         Below 768px the sidebar slides in as an overlay (handled in hypermind.css). */
    `}</style>
  )
}
