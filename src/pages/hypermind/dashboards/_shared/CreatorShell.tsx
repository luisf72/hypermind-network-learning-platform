import { useEffect, useState, type ReactNode } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'
import { CREATOR_PATHS, ROLE_BASE } from '@/lib/dashboardPaths'
import {
  LayoutGrid,
  BookOpen,
  GraduationCap,
  UserPlus,
  Star,
  Wallet,
  UserCircle2,
  Sparkles,
  ChevronDown,
  LogOut,
  Sun,
  Moon,
  Settings as SettingsIcon,
  Palette,
  ClipboardCheck,
  Check,
  ArrowLeftRight,
  PanelLeftClose,
  PanelLeftOpen,
  CreditCard,
  Receipt,
  Award,
  ShieldCheck,
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

type RoleId = 'admin' | 'creator' | 'evaluator' | 'student'
interface RoleDef {
  id: RoleId
  tKey: string
  descKey: string
  Icon: LucideIcon
  color: string
  soft: string
  queueLabelKey: string
  queueValue: string
}

const ROLES: RoleDef[] = [
  {
    id: 'admin',
    tKey: 'roleSwitch.admin',
    descKey: 'roleSwitch.descAdmin',
    Icon: ShieldCheck,
    color: '#F4636E',
    soft: 'rgba(244,99,110,0.10)',
    queueLabelKey: 'roleSwitch.queuePending',
    queueValue: '4',
  },
  {
    id: 'creator',
    tKey: 'roleSwitch.creator',
    descKey: 'roleSwitch.descCreator',
    Icon: Palette,
    color: '#F4B26C',
    soft: 'rgba(244,178,108,0.14)',
    queueLabelKey: 'roleSwitch.queueCourses',
    queueValue: '7',
  },
  {
    id: 'evaluator',
    tKey: 'roleSwitch.evaluator',
    descKey: 'roleSwitch.descEvaluator',
    Icon: ClipboardCheck,
    color: '#5BC8C5',
    soft: 'rgba(91,200,197,0.14)',
    queueLabelKey: 'roleSwitch.queueInQueue',
    queueValue: '12',
  },
  {
    id: 'student',
    tKey: 'roleSwitch.student',
    descKey: 'roleSwitch.descStudent',
    Icon: GraduationCap,
    color: '#7C5CF6',
    soft: 'rgba(124,92,246,0.12)',
    queueLabelKey: 'roleSwitch.queueActive',
    queueValue: '3',
  },
]

export default function CreatorShell({ activeId, children }: CreatorShellProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggle)
  const isLight = theme === 'light'
  const switchAuthRole = useAuthStore((s) => s.switchRole)
  const logout = useAuthStore((s) => s.logout)
  const [profileOpen, setProfileOpen] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)
  const [activeRole, setActiveRole] = useState<RoleId>('creator')
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
  const role = ROLES.find((r) => r.id === activeRole)!
  const handleRoleSwitch = (id: RoleId) => {
    setActiveRole(id)
    setRoleOpen(false)
    switchAuthRole(id === 'evaluator' ? 'creator' : id)
    navigate(ROLE_BASE[id])
  }
  const handleLogout = () => {
    logout()
    setProfileOpen(false)
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
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
            style={{ background: 'var(--hm-grad-primary)', boxShadow: 'var(--hm-glow-violet)' }}
          >
            <Sparkles className="h-4 w-4 text-white" />
          </span>
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

          {/* ─────────── Perspective switcher ─────────── */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleOpen((v) => !v)}
              aria-expanded={roleOpen}
              aria-haspopup="menu"
              className="hm-creator-role-chip group flex items-center gap-2 pl-1 pr-2.5 h-8 rounded-full transition-all"
              style={{
                background: roleOpen ? role.soft : 'transparent',
                border: `1px solid ${roleOpen ? role.color + '55' : 'var(--hm-border)'}`,
                boxShadow: roleOpen ? `0 0 0 3px ${role.color}14` : 'none',
              }}
              onMouseEnter={(e) => {
                if (!roleOpen) {
                  e.currentTarget.style.background = role.soft
                  e.currentTarget.style.borderColor = `${role.color}55`
                }
              }}
              onMouseLeave={(e) => {
                if (!roleOpen) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'var(--hm-border)'
                }
              }}
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full shrink-0 transition-colors"
                style={{
                  background: role.soft,
                  color: role.color,
                  boxShadow: `0 0 12px ${role.color}55`,
                }}
              >
                <role.Icon className="h-3 w-3" />
              </span>
              <span className="hm-creator-role-label hidden md:flex flex-col items-start leading-tight">
                <span
                  className="hm-mono text-[8.5px] font-semibold"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
                >
                  {t('shell.viewingAs')}
                </span>
                <span
                  className="hm-mono text-[10.5px] font-semibold leading-none"
                  style={{ color: role.color, letterSpacing: '0.1em' }}
                >
                  {t(role.tKey).toUpperCase()}
                </span>
              </span>
              <ChevronDown
                className="h-3 w-3 transition-transform shrink-0"
                style={{
                  color: 'var(--hm-text-dim)',
                  transform: roleOpen ? 'rotate(180deg)' : 'none',
                }}
              />
            </button>

            {roleOpen && (
              <>
                <button
                  type="button"
                  aria-label={t('shell.closePerspectiveMenu')}
                  onClick={() => setRoleOpen(false)}
                  className="cursor-default"
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9980,
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                  }}
                />
                <div
                  role="menu"
                  className="overflow-hidden rounded-xl"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: 320,
                    background:
                      'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
                    border: '1px solid var(--hm-border-strong)',
                    boxShadow: `0 24px 60px -12px rgba(0,0,0,0.7), 0 0 0 1px ${role.color}10`,
                    zIndex: 9990,
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute -top-1.5 right-12 h-3 w-3 rotate-45"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      borderLeft: '1px solid var(--hm-border-strong)',
                      borderTop: '1px solid var(--hm-border-strong)',
                    }}
                  />
                  <div
                    className="px-4 py-2.5 flex items-center gap-2"
                    style={{ borderBottom: '1px solid var(--hm-border)' }}
                  >
                    <ArrowLeftRight className="h-3 w-3" style={{ color: 'var(--hm-text-dim)' }} />
                    <p
                      className="hm-mono text-[9.5px] font-semibold"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
                    >
                      {t('shell.switchPerspective')}
                    </p>
                  </div>
                  {ROLES.map((r) => {
                    const active = r.id === activeRole
                    return (
                      <button
                        key={r.id}
                        role="menuitem"
                        type="button"
                        onClick={() => handleRoleSwitch(r.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left relative transition-colors"
                        style={{
                          background: active ? r.soft : 'transparent',
                          borderTop: '1px solid var(--hm-border)',
                        }}
                        onMouseEnter={(e) => {
                          if (!active) e.currentTarget.style.background = 'var(--hm-bg-card)'
                        }}
                        onMouseLeave={(e) => {
                          if (!active) e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        {active && (
                          <span
                            aria-hidden
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: 8,
                              bottom: 8,
                              width: 3,
                              background: r.color,
                              borderRadius: 2,
                              boxShadow: `0 0 12px ${r.color}`,
                            }}
                          />
                        )}
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-full shrink-0"
                          style={{
                            background: r.soft,
                            color: r.color,
                            boxShadow: `0 0 16px ${r.color}33`,
                          }}
                        >
                          <r.Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p
                              className="text-[13px] font-semibold"
                              style={{ color: active ? r.color : 'var(--hm-text)' }}
                            >
                              {t(r.tKey)}
                            </p>
                            {active && <Check className="h-3 w-3" style={{ color: r.color }} />}
                          </div>
                          <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                            {t(r.descKey)}
                          </p>
                        </div>
                        <span
                          className="hm-mono inline-flex flex-col items-end shrink-0 leading-tight"
                          style={{ letterSpacing: '0.06em' }}
                        >
                          <span className="text-[13px] font-semibold" style={{ color: r.color }}>
                            {r.queueValue}
                          </span>
                          <span
                            className="text-[8.5px] font-medium"
                            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
                          >
                            {t(r.queueLabelKey).toUpperCase()}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                  <div
                    className="px-4 py-2.5 flex items-center gap-2"
                    style={{
                      borderTop: '1px solid var(--hm-border)',
                      background: 'var(--hm-bg-card)',
                    }}
                  >
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full hm-mono text-[9px] font-semibold shrink-0"
                      style={{
                        background: `linear-gradient(180deg, ${role.color} 0%, ${role.color}cc 100%)`,
                        color: '#1a1208',
                      }}
                    >
                      SL
                    </span>
                    <p className="text-[11px] truncate" style={{ color: 'var(--hm-text-dim)' }}>
                      Sarah Lin · sarah@hypermind.io
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

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

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-full transition-colors"
              style={{
                background: profileOpen ? 'var(--hm-bg-card)' : 'transparent',
                border: `1px solid ${profileOpen ? 'var(--hm-border)' : 'transparent'}`,
              }}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-[11.5px] font-semibold"
                style={{
                  background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}cc 100%)`,
                  color: '#1a1208',
                }}
              >
                SL
              </span>
              <div className="hm-creator-profile-text hidden md:flex flex-col items-start leading-tight">
                <span className="text-[12.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Sarah Lin
                </span>
                <span className="flex items-center mt-0.5">
                  <span
                    className="hm-mono px-1 py-0.5 rounded text-[8px] font-semibold"
                    style={{
                      background: role.soft,
                      color: role.color,
                      border: `1px solid ${role.color}40`,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {t(role.tKey).toUpperCase()}
                  </span>
                </span>
              </div>
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform"
                style={{
                  color: 'var(--hm-text-dim)',
                  transform: profileOpen ? 'rotate(180deg)' : 'none',
                }}
              />
            </button>

            {profileOpen && (
              <>
                <button
                  type="button"
                  aria-label={t('shell.closeMenu')}
                  onClick={() => setProfileOpen(false)}
                  className="cursor-default"
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9980,
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                  }}
                />
                <div
                  role="menu"
                  className="overflow-hidden rounded-xl"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: 240,
                    background:
                      'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
                    border: '1px solid var(--hm-border-strong)',
                    boxShadow:
                      '0 24px 60px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(244,178,108,0.06)',
                    zIndex: 9990,
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute -top-1.5 right-5 h-3 w-3 rotate-45"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      borderLeft: '1px solid var(--hm-border-strong)',
                      borderTop: '1px solid var(--hm-border-strong)',
                    }}
                  />
                  <div
                    className="px-3.5 py-3 flex items-center gap-3"
                    style={{ borderBottom: '1px solid var(--hm-border)' }}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold"
                      style={{
                        background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}cc 100%)`,
                        color: '#1a1208',
                      }}
                    >
                      SL
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[13px] font-semibold truncate"
                        style={{ color: 'var(--hm-text)' }}
                      >
                        Sarah Lin
                      </p>
                      <p className="text-[11px] truncate" style={{ color: 'var(--hm-text-dim)' }}>
                        sarah@hypermind.io
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/creator/profile"
                    role="menuitem"
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] text-left transition-colors hover:bg-[var(--hm-violet-soft)]"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    <UserCircle2 className="h-4 w-4" style={{ color: 'var(--hm-text-muted)' }} />
                    {t('shell.viewProfile')}
                  </Link>
                  <button
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      setProfileOpen(false)
                      handleLogout()
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] text-left transition-colors hover:bg-[var(--hm-violet-soft)]"
                    style={{ color: ACCENT, borderTop: '1px solid var(--hm-border)' }}
                  >
                    <LogOut className="h-4 w-4" />
                    {t('shell.logOut')}
                  </button>
                </div>
              </>
            )}
          </div>
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
