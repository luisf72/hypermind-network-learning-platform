import { useEffect, useState, type ReactNode } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'
import { ADMIN_PATHS, ROLE_BASE, getDashboardPathByRole } from '@/lib/dashboardPaths'
import { RoleSwitcher } from '@/components/RoleSwitcher'
import { UserProfileMenu } from '@/components/UserProfileMenu'
import { BrandLogo } from '@/components/BrandLogo'
import '../../_group.css'
import {
  LayoutGrid,
  Users,
  UsersRound,
  MessagesSquare,
  BookOpen,
  FolderTree,
  GraduationCap,
  SlidersHorizontal,
  Video,
  ShieldCheck,
  Key,
  Lock,
  Repeat,
  Receipt,
  HelpCircle,
  MessageCircle,
  Coins,
  Settings2,
  Award,
  Wallet,
  UserPlus,
  Star,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  ClipboardCheck,
  type LucideIcon,
} from 'lucide-react'

const ACCENT = '#F4636E'
const ACCENT_SOFT = 'rgba(244,99,110,0.10)'

export type AdminPageId =
  | 'overview'
  | 'courses'
  | 'course-categories'
  | 'assessments'
  | 'assessment-variables'
  | 'session-types'
  | 'users'
  | 'roles'
  | 'permissions'
  | 'role-permission'
  | 'subscriptions'
  | 'transactions'
  | 'earnings'
  | 'certificates'
  | 'study-groups'
  | 'posts'
  | 'reviews'
  | 'faqs'
  | 'feedbacks'
  | 'ledgers'
  | 'creator-applications'
  | 'settings'
  | 'profile'

interface NavLeaf {
  id: AdminPageId
  tKey: string
  Icon: LucideIcon
}

/**
 * Admin sidebar — fully flat list, no submenu groups, no expand/collapse.
 * Every page gets its own top-level entry so navigation never requires a click
 * to reveal what's available.
 */
const NAV_ENTRIES: NavLeaf[] = [
  { id: 'overview', tKey: 'adminNav.overview', Icon: LayoutGrid },
  { id: 'courses', tKey: 'adminNav.courses', Icon: BookOpen },
  { id: 'course-categories', tKey: 'adminNav.courseCategories', Icon: FolderTree },
  { id: 'assessments', tKey: 'adminNav.assessments', Icon: GraduationCap },
  { id: 'assessment-variables', tKey: 'adminNav.assessmentVariables', Icon: SlidersHorizontal },
  { id: 'session-types', tKey: 'adminNav.sessionTypes', Icon: Video },
  { id: 'users', tKey: 'adminNav.users', Icon: Users },
  { id: 'roles', tKey: 'adminNav.roles', Icon: ShieldCheck },
  { id: 'permissions', tKey: 'adminNav.permissions', Icon: Key },
  { id: 'role-permission', tKey: 'adminNav.rolePermission', Icon: Lock },
  { id: 'subscriptions', tKey: 'adminNav.subscriptions', Icon: Repeat },
  { id: 'transactions', tKey: 'adminNav.transactions', Icon: Receipt },
  { id: 'earnings', tKey: 'adminNav.earnings', Icon: Wallet },
  { id: 'certificates', tKey: 'adminNav.certificates', Icon: Award },
  { id: 'study-groups', tKey: 'adminNav.studyGroups', Icon: UsersRound },
  { id: 'posts', tKey: 'adminNav.posts', Icon: MessagesSquare },
  { id: 'reviews', tKey: 'adminNav.studentReviews', Icon: Star },
  { id: 'faqs', tKey: 'adminNav.faqs', Icon: HelpCircle },
  { id: 'feedbacks', tKey: 'adminNav.feedbacks', Icon: MessageCircle },
  { id: 'ledgers', tKey: 'adminNav.ledgers', Icon: Coins },
  { id: 'creator-applications', tKey: 'adminNav.creatorApplications', Icon: UserPlus },
  { id: 'settings', tKey: 'adminNav.settings', Icon: Settings2 },
]

interface AdminShellProps {
  activeId: AdminPageId
  children: ReactNode
}

export default function AdminShell({ activeId, children }: AdminShellProps) {
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
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div
      className={`hm-root hm-admin-shell${isLight ? ' hm-light' : ''}`}
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
        className="hm-admin-sidebar flex flex-col shrink-0"
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
          to="/admin"
          aria-label={t('common.dashboard')}
          className="hm-admin-brand flex items-center shrink-0"
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
                className="hm-admin-brand-text text-[16px] font-semibold tracking-tight"
                style={{ fontFamily: 'var(--hm-font-display)', color: 'var(--hm-text)' }}
              >
                Hyper<span style={{ color: 'var(--hm-violet-2)' }}>Mind</span>
              </span>
              <span
                className="hm-admin-badge hm-mono ml-auto px-1.5 py-0.5 rounded text-[9px] font-semibold"
                style={{
                  background: ACCENT_SOFT,
                  color: ACCENT,
                  border: `1px solid ${ACCENT}40`,
                  letterSpacing: '0.14em',
                }}
              >
                ADMIN
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
            profilePath="/admin/profile"
            accentColor={ACCENT}
            subtitle={t('shell.platformAdmin')}
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
  const to = ADMIN_PATHS[leaf.id] ?? '/admin'
  const label = t(leaf.tKey)
  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      className="hm-admin-nav-link flex items-center rounded-lg text-[13px] transition-colors"
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
      {!collapsed && <span className="hm-admin-nav-label flex-1 truncate">{label}</span>}
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
