import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/stores/themeStore'
import { useLangStore } from '@/stores/langStore'
import { useAuthStore } from '@/stores/authStore'
import { STUDENT_PATHS, ROLE_BASE } from '@/lib/dashboardPaths'
import {
  Sun,
  Moon,
  Flame,
  Sparkles,
  Bell,
  Globe,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Award,
  BookOpen,
  GraduationCap,
  AtSign,
  CheckCheck,
  Settings2,
  User,
  LogOut,
  Menu,
  X,
  CreditCard,
  MessageSquarePlus,
  Receipt,
  Palette,
  Bug,
  Lightbulb,
  ThumbsUp,
  AlertCircle,
  HelpCircle,
  Send,
  ArrowLeftRight,
  Check,
  ClipboardCheck,
  type LucideIcon,
} from 'lucide-react'
import { Footer } from '../../_shared/Footer'
import '../../_group.css'

export const VIOLET = '#7C5CF6'
export const VIOLET_SOFT = 'rgba(124,92,246,0.12)'
export const VIOLET_GLOW = 'rgba(124,92,246,0.25)'
export const GREEN = '#5EE6A8'
export const AMBER = '#F4B26C'
export const BLUE = '#60A5FA'

type RoleId = 'admin' | 'student' | 'creator' | 'evaluator'
interface RoleDef {
  id: RoleId
  label: string
  description: string
  Icon: LucideIcon
  color: string
  soft: string
}
const SWITCH_ROLES: RoleDef[] = [
  {
    id: 'admin',
    label: 'Admin',
    description: 'Manage the full platform',
    Icon: User,
    color: '#F4636E',
    soft: 'rgba(244,99,110,0.10)',
  },
  {
    id: 'creator',
    label: 'Creator',
    description: 'Publish & manage your courses',
    Icon: Palette,
    color: '#F4B26C',
    soft: 'rgba(244,178,108,0.14)',
  },
  {
    id: 'evaluator',
    label: 'Evaluator',
    description: 'Grade subjective answers',
    Icon: ClipboardCheck,
    color: '#5BC8C5',
    soft: 'rgba(91,200,197,0.14)',
  },
  {
    id: 'student',
    label: 'Student',
    description: 'Continue your learning journey',
    Icon: GraduationCap,
    color: '#7C5CF6',
    soft: 'rgba(124,92,246,0.12)',
  },
]

type Panel = 'notifications' | 'messages' | 'profile' | 'feedback' | null

const notifications = [
  {
    id: 1,
    icon: Award,
    tint: 'var(--hm-amber)',
    titleKey: 'notif1Title',
    bodyKey: 'notif1Body',
    timeKey: 'notif1Time',
    unread: true,
  },
  {
    id: 2,
    icon: GraduationCap,
    tint: 'var(--hm-violet-2)',
    titleKey: 'notif2Title',
    bodyKey: 'notif2Body',
    timeKey: 'notif2Time',
    unread: true,
  },
  {
    id: 3,
    icon: Flame,
    tint: 'var(--hm-amber)',
    titleKey: 'notif3Title',
    bodyKey: 'notif3Body',
    timeKey: 'notif3Time',
    unread: true,
  },
  {
    id: 4,
    icon: AtSign,
    tint: 'var(--hm-violet-2)',
    titleKey: 'notif4Title',
    bodyKey: 'notif4Body',
    timeKey: 'notif4Time',
    unread: false,
  },
  {
    id: 5,
    icon: BookOpen,
    tint: 'var(--hm-violet-2)',
    titleKey: 'notif5Title',
    bodyKey: 'notif5Body',
    timeKey: 'notif5Time',
    unread: false,
  },
] as const

type MsgBadgeKey = 'msg1Badge' | 'msg3Badge' | 'msg5Badge' | undefined
const messages: ReadonlyArray<{
  id: number
  nameKey: string
  initials: string
  avatarBg: string
  previewKey: string
  timeKey: string
  unread: boolean
  badgeKey: MsgBadgeKey
  badgeIsAI: boolean
}> = [
  {
    id: 1,
    nameKey: 'msg1Name',
    initials: 'MC',
    avatarBg: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
    previewKey: 'msg1Preview',
    timeKey: 'msg1Time',
    unread: true,
    badgeKey: 'msg1Badge',
    badgeIsAI: false,
  },
  {
    id: 2,
    nameKey: 'msg2Name',
    initials: 'PS',
    avatarBg: 'linear-gradient(135deg,#f4b26c,#d97706)',
    previewKey: 'msg2Preview',
    timeKey: 'msg2Time',
    unread: true,
    badgeKey: undefined,
    badgeIsAI: false,
  },
  {
    id: 3,
    nameKey: 'msg3Name',
    initials: 'ES',
    avatarBg: 'linear-gradient(135deg,#a78bfa,#4c1d95)',
    previewKey: 'msg3Preview',
    timeKey: 'msg3Time',
    unread: true,
    badgeKey: 'msg3Badge',
    badgeIsAI: false,
  },
  {
    id: 4,
    nameKey: 'msg4Name',
    initials: 'JR',
    avatarBg: 'linear-gradient(135deg,#34d399,#047857)',
    previewKey: 'msg4Preview',
    timeKey: 'msg4Time',
    unread: false,
    badgeKey: undefined,
    badgeIsAI: false,
  },
  {
    id: 5,
    nameKey: 'msg5Name',
    initials: 'SY',
    avatarBg: 'linear-gradient(135deg,#c4b5fd,#7c3aed)',
    previewKey: 'msg5Preview',
    timeKey: 'msg5Time',
    unread: false,
    badgeKey: 'msg5Badge',
    badgeIsAI: true,
  },
]

/* ── Dropdown panel shell ─────────────────────────────────────────────────── */
interface DropdownPanelProps {
  title: string
  meta?: string
  actionLabel?: string
  actionIcon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  footerLabel?: string
  children: React.ReactNode
  isLight: boolean
  settingsLabel: string
}

function DropdownPanel({
  title,
  meta,
  actionLabel,
  actionIcon: ActionIcon,
  footerLabel,
  children,
  settingsLabel,
}: DropdownPanelProps) {
  return (
    <div
      className="w-[380px] overflow-hidden rounded-xl"
      style={{
        position: 'absolute',
        right: 0,
        top: 'calc(100% + 8px)',
        zIndex: 9990,
        background: 'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
        border: '1px solid var(--hm-border-strong)',
        boxShadow:
          '0 30px 80px -12px rgba(0,0,0,0.85), 0 12px 32px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.10)',
        isolation: 'isolate',
      }}
      role="dialog"
      aria-label={title}
    >
      <span
        aria-hidden="true"
        className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 z-10"
        style={{
          background: 'var(--hm-bg-card-2)',
          borderLeft: '1px solid var(--hm-border-strong)',
          borderTop: '1px solid var(--hm-border-strong)',
        }}
      />
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <div className="flex items-baseline gap-2 flex-1 min-w-0">
          <h3
            className="text-[14px] font-semibold"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.014em' }}
          >
            {title}
          </h3>
          {meta && (
            <span className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
              {'·'} {meta}
            </span>
          )}
        </div>
        {actionLabel && (
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded px-1.5 py-1 text-[11.5px] font-medium transition-colors"
            style={{ color: 'var(--hm-text-muted)' }}
          >
            {ActionIcon && <ActionIcon className="h-3 w-3" />}
            {actionLabel}
          </button>
        )}
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded transition-colors"
          style={{ color: 'var(--hm-text-dim)' }}
          aria-label={settingsLabel}
        >
          <Settings2 className="h-3 w-3" />
        </button>
      </div>
      <div className="max-h-[420px] overflow-y-auto">{children}</div>
      {footerLabel && (
        <a
          href="#"
          className="flex items-center justify-center gap-1.5 px-4 py-3 text-[12px] font-semibold transition-colors"
          style={{
            color: 'var(--hm-violet-2)',
            borderTop: '1px solid var(--hm-border)',
            letterSpacing: '0.01em',
          }}
        >
          {footerLabel}
        </a>
      )}
    </div>
  )
}

/* ── Shell ─────────────────────────────────────────────────────────────── */
export default function StudentShell({
  children,
  activeTab,
  fullWidth,
}: {
  children: ReactNode
  activeTab?: string | null
  fullWidth?: boolean
}) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.set)
  const isLight = theme === 'light'
  const setIsLight = (v: boolean | ((p: boolean) => boolean)) => {
    const next = typeof v === 'function' ? v(isLight) : v
    setTheme(next ? 'light' : 'dark')
  }
  const activeLang = useLangStore((s) => s.lang)
  const setActiveLang = (l: string) => useLangStore.getState().set(l === 'ES' ? 'ES' : 'EN')
  const switchAuthRole = useAuthStore((s) => s.switchRole)
  const logout = useAuthStore((s) => s.logout)
  const [openPanel, setOpenPanel] = useState<Panel>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)
  const [activeRole, setActiveRole] = useState<RoleId>('student')
  const handleRoleSwitch = (id: RoleId) => {
    setActiveRole(id)
    setRoleOpen(false)
    switchAuthRole(id === 'evaluator' ? 'creator' : id)
    navigate(ROLE_BASE[id])
  }
  const handleLogout = () => {
    logout()
    setOpenPanel(null)
    navigate('/login')
  }

  const togglePanel = (p: Exclude<Panel, null>) => setOpenPanel((cur) => (cur === p ? null : p))

  const navItems = [
    { id: 'courses', label: t('nav.courses') },
    { id: 'assessments', label: t('nav.assessments') },
    { id: 'community', label: t('nav.community') },
  ]

  const switchRoles: RoleDef[] = SWITCH_ROLES.map((r) => ({
    ...r,
    label: t(`roleSwitch.${r.id}`),
    description:
      r.id === 'admin'
        ? t('roleSwitch.descAdmin')
        : r.id === 'creator'
          ? t('roleSwitch.descCreator')
          : r.id === 'evaluator'
            ? t('roleSwitch.descEvaluator')
            : t('roleSwitch.descStudent'),
  }))
  const activeRoleDef = switchRoles.find((r) => r.id === activeRole)!

  return (
    <div className={`hm-root${isLight ? ' hm-light' : ''}`} style={{ minHeight: '100vh' }}>
      {/* ── Header ── */}
      <header
        className="w-full"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: isLight ? 'var(--hm-header-bg)' : 'rgba(11,12,30,0.92)',
          borderBottom: '1px solid var(--hm-border)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <div className="mx-auto flex h-14 w-full max-w-[1280px] items-center gap-6 px-6">
          {/* Brand */}
          <Link
            to="/student"
            className="flex items-center gap-2.5 shrink-0"
            style={{ textDecoration: 'none' }}
          >
            <span className="hm-mark relative h-7 w-7">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 13V3M13 13V3M3 8H13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  style={{ color: 'var(--hm-violet-2)' }}
                />
              </svg>
            </span>
            <span
              className="text-[15px] font-semibold leading-none"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
            >
              HyperMind
            </span>
          </Link>

          {/* Nav — hidden on mobile, shown md+ */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={STUDENT_PATHS[item.id] ?? '/student'}
                className="relative inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors"
                style={{
                  color: activeTab === item.id ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                  background: activeTab === item.id ? 'var(--hm-violet-soft)' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Player HUD — compact single pill */}
          <div className="hidden lg:flex items-center">
            <div
              className="flex items-center gap-2 rounded-lg px-2.5 h-8"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <span className="flex items-center gap-1" title={t('studentShell.streakTitle')}>
                <Flame className="h-3 w-3" style={{ color: 'var(--hm-amber)' }} />
                <span
                  className="hm-mono text-[10.5px] font-semibold"
                  style={{ color: 'var(--hm-text)' }}
                >
                  12d
                </span>
              </span>
              <span className="h-3 w-px shrink-0" style={{ background: 'var(--hm-border)' }} />
              <span className="flex items-center gap-1" title={t('studentShell.karmaTitle')}>
                <Sparkles className="h-3 w-3" style={{ color: 'var(--hm-violet-2)' }} />
                <span
                  className="hm-mono text-[10.5px] font-semibold"
                  style={{ color: 'var(--hm-text)' }}
                >
                  1,840
                </span>
              </span>
              <span className="h-3 w-px shrink-0" style={{ background: 'var(--hm-border)' }} />
              <span className="flex items-center gap-1.5" title={t('studentShell.levelTitle')}>
                <span
                  className="hm-mono inline-flex items-center justify-center rounded px-1 text-[9px] font-bold leading-4"
                  style={{
                    background: 'var(--hm-violet-soft)',
                    color: 'var(--hm-violet-2)',
                    border: '1px solid var(--hm-border-accent)',
                    minWidth: 18,
                  }}
                >
                  14
                </span>
                <div className="hm-progress" style={{ width: 44, height: 3 }}>
                  <div className="hm-progress-fill" style={{ width: '78%' }} />
                </div>
              </span>
            </div>
          </div>

          <span className="hidden h-6 w-px lg:block" style={{ background: 'var(--hm-border)' }} />

          {/* Utilities — desktop only (lg+) */}
          <div className="relative hidden lg:flex items-center gap-0.5">
            {/* Messages */}
            <div className="relative">
              <button
                type="button"
                onClick={() => togglePanel('messages')}
                className="relative flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                style={{
                  color: openPanel === 'messages' ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                  background: openPanel === 'messages' ? 'var(--hm-violet-soft)' : 'transparent',
                }}
                title={t('studentShell.messages')}
                aria-label={t('studentShell.openMessages')}
                aria-expanded={openPanel === 'messages'}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span
                  className="hm-mono absolute -top-0.5 -right-0.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full px-[3px] text-[8.5px] font-semibold"
                  style={{
                    background: 'var(--hm-violet-2)',
                    color: '#fff',
                    border: `1.5px solid ${isLight ? 'rgba(248,246,240,1)' : 'rgba(11,12,30,1)'}`,
                  }}
                >
                  3
                </span>
              </button>
              {openPanel === 'messages' && (
                <DropdownPanel
                  title={t('studentShell.messages')}
                  meta={t('studentShell.messagesMeta', { count: 3 })}
                  actionLabel={t('studentShell.markAllRead')}
                  actionIcon={CheckCheck}
                  footerLabel={t('studentShell.openInbox')}
                  isLight={isLight}
                  settingsLabel={t('studentShell.settings')}
                >
                  <ul className="flex flex-col">
                    {messages.map((m) => (
                      <li key={m.id}>
                        <a
                          href="#"
                          className="flex items-start gap-3 px-4 py-3 transition-colors"
                          style={{
                            background: m.unread ? 'rgba(139,92,246,0.05)' : 'transparent',
                            borderTop: m.id === 1 ? 'none' : '1px solid var(--hm-border)',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = 'var(--hm-violet-soft)')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = m.unread
                              ? 'rgba(139,92,246,0.05)'
                              : 'transparent')
                          }
                        >
                          <div
                            className="shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-[11.5px] font-semibold"
                            style={{ background: m.avatarBg, color: '#fff' }}
                          >
                            {m.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span
                                className="text-[13px] font-semibold truncate"
                                style={{ color: 'var(--hm-text)', letterSpacing: '-0.012em' }}
                              >
                                {t(`studentShell.${m.nameKey}`)}
                              </span>
                              {m.badgeKey && (
                                <span
                                  className="hm-mono shrink-0 rounded px-1.5 py-[1px] text-[8.5px] font-semibold uppercase tracking-wider"
                                  style={{
                                    background: m.badgeIsAI
                                      ? 'var(--hm-amber-soft)'
                                      : 'var(--hm-violet-soft)',
                                    color: m.badgeIsAI ? 'var(--hm-amber)' : 'var(--hm-violet-2)',
                                    border: `1px solid ${m.badgeIsAI ? 'rgba(244,178,108,0.22)' : 'var(--hm-border-accent)'}`,
                                  }}
                                >
                                  {t(`studentShell.${m.badgeKey}`)}
                                </span>
                              )}
                              <span
                                className="hm-mono ml-auto shrink-0 text-[10px]"
                                style={{ color: 'var(--hm-text-dim)' }}
                              >
                                {t(`studentShell.${m.timeKey}`)}
                              </span>
                            </div>
                            <p
                              className="text-[12.5px] line-clamp-1"
                              style={{
                                color: m.unread ? 'var(--hm-text-muted)' : 'var(--hm-text-dim)',
                                lineHeight: 1.45,
                              }}
                            >
                              {t(`studentShell.${m.previewKey}`)}
                            </p>
                          </div>
                          {m.unread && (
                            <span
                              className="shrink-0 mt-2 h-1.5 w-1.5 rounded-full"
                              style={{
                                background: 'var(--hm-violet-2)',
                                boxShadow: '0 0 6px var(--hm-violet-2)',
                              }}
                            />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </DropdownPanel>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => togglePanel('notifications')}
                className="relative flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                style={{
                  color: openPanel === 'notifications' ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                  background:
                    openPanel === 'notifications' ? 'var(--hm-violet-soft)' : 'transparent',
                }}
                title={t('studentShell.notifications')}
                aria-label={t('studentShell.openNotifications')}
                aria-expanded={openPanel === 'notifications'}
              >
                <Bell className="h-3.5 w-3.5" />
                <span
                  className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--hm-amber)', boxShadow: '0 0 6px var(--hm-amber)' }}
                />
              </button>
              {openPanel === 'notifications' && (
                <DropdownPanel
                  title={t('studentShell.notifications')}
                  meta={t('studentShell.notificationsMeta', { count: 3 })}
                  actionLabel={t('studentShell.markAllRead')}
                  actionIcon={CheckCheck}
                  footerLabel={t('studentShell.seeAllActivity')}
                  isLight={isLight}
                  settingsLabel={t('studentShell.settings')}
                >
                  <ul className="flex flex-col">
                    {notifications.map((n, idx) => (
                      <li key={n.id}>
                        <a
                          href="#"
                          className="flex items-start gap-3 px-4 py-3 transition-colors"
                          style={{
                            background: n.unread ? 'rgba(139,92,246,0.05)' : 'transparent',
                            borderTop: idx === 0 ? 'none' : '1px solid var(--hm-border)',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = 'var(--hm-violet-soft)')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = n.unread
                              ? 'rgba(139,92,246,0.05)'
                              : 'transparent')
                          }
                        >
                          <div
                            className="shrink-0 h-9 w-9 rounded-md flex items-center justify-center"
                            style={{
                              background: 'var(--hm-bg-card-2)',
                              border: '1px solid var(--hm-border-strong)',
                            }}
                          >
                            <n.icon className="h-4 w-4" style={{ color: n.tint }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span
                                className="text-[13px] font-semibold"
                                style={{ color: 'var(--hm-text)', letterSpacing: '-0.012em' }}
                              >
                                {t(`studentShell.${n.titleKey}`)}
                              </span>
                              <span
                                className="hm-mono ml-auto shrink-0 text-[10px]"
                                style={{ color: 'var(--hm-text-dim)' }}
                              >
                                {t(`studentShell.${n.timeKey}`)}
                              </span>
                            </div>
                            <p
                              className="text-[12.5px] line-clamp-2"
                              style={{
                                color: n.unread ? 'var(--hm-text-muted)' : 'var(--hm-text-dim)',
                                lineHeight: 1.45,
                              }}
                            >
                              {t(`studentShell.${n.bodyKey}`)}
                            </p>
                          </div>
                          {n.unread && (
                            <span
                              className="shrink-0 mt-2 h-1.5 w-1.5 rounded-full"
                              style={{
                                background: 'var(--hm-amber)',
                                boxShadow: '0 0 6px var(--hm-amber)',
                              }}
                            />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </DropdownPanel>
              )}
            </div>
          </div>

          {/* ── Role switcher chip ── */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => {
                setRoleOpen((v) => !v)
                setOpenPanel(null)
              }}
              aria-expanded={roleOpen}
              className="flex items-center gap-2 pl-1 pr-2.5 h-8 rounded-full transition-all"
              style={{
                background: roleOpen ? activeRoleDef.soft : 'transparent',
                border: `1px solid ${roleOpen ? activeRoleDef.color + '55' : 'var(--hm-border)'}`,
                boxShadow: roleOpen ? `0 0 0 3px ${activeRoleDef.color}14` : 'none',
              }}
              onMouseEnter={(e) => {
                if (!roleOpen) {
                  e.currentTarget.style.background = activeRoleDef.soft
                  e.currentTarget.style.borderColor = `${activeRoleDef.color}55`
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
                  background: activeRoleDef.soft,
                  color: activeRoleDef.color,
                  boxShadow: `0 0 10px ${activeRoleDef.color}44`,
                }}
              >
                <activeRoleDef.Icon className="h-3 w-3" />
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span
                  className="hm-mono text-[8px] font-semibold"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
                >
                  {t('shell.viewingAs')}
                </span>
                <span
                  className="hm-mono text-[10px] font-semibold leading-none"
                  style={{ color: activeRoleDef.color, letterSpacing: '0.10em' }}
                >
                  {activeRoleDef.label.toUpperCase()}
                </span>
              </span>
              <ChevronDown
                className="h-3 w-3 ml-0.5 shrink-0 transition-transform"
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
                  aria-label={t('studentShell.closeRoleMenu')}
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
                    width: 300,
                    zIndex: 9990,
                    background:
                      'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
                    border: '1px solid var(--hm-border-strong)',
                    boxShadow: `0 24px 60px -12px rgba(0,0,0,0.75), 0 0 0 1px ${activeRoleDef.color}10`,
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

                  {/* Header */}
                  <div
                    className="px-4 py-2.5 flex items-center gap-2"
                    style={{ borderBottom: '1px solid var(--hm-border)' }}
                  >
                    <ArrowLeftRight className="h-3 w-3" style={{ color: 'var(--hm-text-dim)' }} />
                    <p
                      className="hm-mono text-[9.5px] font-semibold"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
                    >
                      {t('shell.switchRole')}
                    </p>
                  </div>

                  {/* Role rows */}
                  {switchRoles.map((r) => {
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
                              boxShadow: `0 0 10px ${r.color}`,
                            }}
                          />
                        )}
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                          style={{
                            background: r.soft,
                            color: r.color,
                            boxShadow: `0 0 14px ${r.color}33`,
                          }}
                        >
                          <r.Icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p
                              className="text-[13px] font-semibold"
                              style={{ color: active ? r.color : 'var(--hm-text)' }}
                            >
                              {r.label}
                            </p>
                            {active && <Check className="h-3 w-3" style={{ color: r.color }} />}
                          </div>
                          <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                            {r.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          {/* Avatar — desktop only (lg+) */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => togglePanel('profile')}
              aria-expanded={openPanel === 'profile'}
              aria-label={t('studentShell.openUserMenu')}
              className="flex items-center gap-2 pl-1.5 pr-2.5 h-9 rounded-lg transition-colors"
              style={{
                background: openPanel === 'profile' ? VIOLET_SOFT : 'var(--hm-bg-card)',
                border: `1px solid ${openPanel === 'profile' ? VIOLET + '44' : 'var(--hm-border)'}`,
              }}
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full hm-mono text-[10px] font-semibold shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #7C5CF6 0%, #A78BFA 100%)',
                  color: 'white',
                }}
              >
                {t('studentShell.demoInitials')}
              </span>
              <span
                className="text-[12.5px] font-medium"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
              >
                {t('studentShell.demoFirstName')}
              </span>
              <ChevronDown
                className="h-3.5 w-3.5 ml-0.5 transition-transform"
                style={{
                  color: 'var(--hm-text-dim)',
                  transform: openPanel === 'profile' ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            {openPanel === 'profile' && (
              <div
                className="absolute right-0 top-[calc(100%+8px)] z-[9999] w-52 rounded-xl overflow-visible"
                style={{
                  background:
                    'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
                  border: '1px solid var(--hm-border-strong)',
                  boxShadow:
                    '0 24px 60px -10px rgba(0,0,0,0.80), 0 8px 24px -6px rgba(0,0,0,0.55), 0 0 0 1px rgba(139,92,246,0.10)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 z-10"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    borderLeft: '1px solid var(--hm-border-strong)',
                    borderTop: '1px solid var(--hm-border-strong)',
                  }}
                />

                {/* ── Compact user header ── */}
                <div
                  className="flex items-center gap-2.5 px-3 py-2.5"
                  style={{ borderBottom: '1px solid var(--hm-border)' }}
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full hm-mono text-[10px] font-semibold shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #7C5CF6 0%, #A78BFA 100%)',
                      color: 'white',
                    }}
                  >
                    {t('studentShell.demoInitials')}
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-[12.5px] font-semibold truncate leading-tight"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
                    >
                      {t('studentShell.demoFullName')}
                    </p>
                    <p className="text-[10.5px] truncate" style={{ color: 'var(--hm-text-dim)' }}>
                      {t('studentShell.demoEmail')}
                    </p>
                  </div>
                </div>

                {/* ── Main items ── */}
                <div className="py-1">
                  {[
                    {
                      icon: Award,
                      label: t('shell.myCertificates'),
                      tint: 'var(--hm-amber)',
                      to: '/student/certificates',
                    },
                    {
                      icon: Bell,
                      label: t('shell.notifications'),
                      tint: 'var(--hm-amber)',
                      to: '/student/notifications',
                    },
                    {
                      icon: MessageSquare,
                      label: t('shell.inbox'),
                      tint: BLUE,
                      to: '/student/inbox',
                    },
                    {
                      icon: CreditCard,
                      label: t('shell.subscription'),
                      tint: GREEN,
                      to: '/student/subscription',
                    },
                    {
                      icon: Receipt,
                      label: t('shell.creditLog'),
                      tint: GREEN,
                      to: '/student/credit-log',
                    },
                    {
                      icon: MessageSquarePlus,
                      label: t('shell.sendFeedback'),
                      tint: VIOLET,
                      to: '/student/feedback',
                    },
                    {
                      icon: User,
                      label: t('shell.profile'),
                      tint: 'var(--hm-text-muted)',
                      to: '/student/profile',
                    },
                  ].map(({ icon: Icon, label, tint, to }) => (
                    <Link
                      key={label}
                      to={to}
                      onClick={() => setOpenPanel(null)}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left transition-colors"
                      onMouseEnter={(e) => (e.currentTarget.style.background = VIOLET_SOFT)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      style={{ background: 'transparent' }}
                    >
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
                        style={{
                          background: 'var(--hm-bg-card-2)',
                          border: '1px solid var(--hm-border)',
                        }}
                      >
                        <Icon className="h-3 w-3" style={{ color: tint }} />
                      </span>
                      <span
                        className="text-[12.5px] font-medium"
                        style={{ color: 'var(--hm-text)' }}
                      >
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* ── Apply as Creator ── */}
                <div
                  className="px-2 pb-1.5"
                  style={{ borderTop: '1px solid var(--hm-border)', paddingTop: 6 }}
                >
                  <Link
                    to="/student/apply-creator"
                    onClick={() => setOpenPanel(null)}
                    className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left transition-all"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'rgba(244,178,108,0.10)')
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    style={{ background: 'transparent' }}
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
                      style={{
                        background: 'rgba(244,178,108,0.14)',
                        border: '1px solid rgba(244,178,108,0.30)',
                      }}
                    >
                      <Palette className="h-3 w-3" style={{ color: 'var(--hm-amber)' }} />
                    </span>
                    <span
                      className="text-[12.5px] font-semibold flex-1"
                      style={{ color: 'var(--hm-amber)' }}
                    >
                      {t('shell.applyAsCreator')}
                    </span>
                    <span
                      className="hm-mono text-[8px] px-1 py-0.5 rounded font-bold"
                      style={{
                        background: 'rgba(244,178,108,0.14)',
                        color: 'var(--hm-amber)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      NEW
                    </span>
                  </Link>
                </div>

                {/* ── Language (submenu) + Theme ── */}
                <div className="py-1" style={{ borderTop: '1px solid var(--hm-border)' }}>
                  {/* Language row — submenu trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setLangOpen((v) => !v)}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left transition-colors"
                      onMouseEnter={(e) => (e.currentTarget.style.background = VIOLET_SOFT)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      style={{ background: langOpen ? VIOLET_SOFT : 'transparent' }}
                    >
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
                        style={{
                          background: 'var(--hm-bg-card-2)',
                          border: '1px solid var(--hm-border)',
                        }}
                      >
                        <Globe className="h-3 w-3" style={{ color: BLUE }} />
                      </span>
                      <span
                        className="text-[12.5px] font-medium flex-1"
                        style={{ color: 'var(--hm-text)' }}
                      >
                        {t('studentShell.language')}
                      </span>
                      <span
                        className="hm-mono flex items-center gap-1 text-[10.5px] font-semibold"
                        style={{ color: BLUE }}
                      >
                        {activeLang}
                        <ChevronRight className="h-3 w-3" style={{ opacity: 0.7 }} />
                      </span>
                    </button>

                    {/* Language flyout submenu — opens to the left */}
                    {langOpen && (
                      <div
                        className="absolute rounded-xl overflow-hidden"
                        style={{
                          right: 'calc(100% + 8px)',
                          top: -8,
                          width: 180,
                          zIndex: 9999,
                          background:
                            'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
                          border: '1px solid var(--hm-border-strong)',
                          boxShadow:
                            '0 20px 50px -8px rgba(0,0,0,0.75), 0 8px 20px -4px rgba(0,0,0,0.50)',
                        }}
                      >
                        {/* Submenu header */}
                        <div
                          className="flex items-center gap-2 px-3 py-2.5"
                          style={{ borderBottom: '1px solid var(--hm-border)' }}
                        >
                          <Globe className="h-3 w-3 shrink-0" style={{ color: BLUE }} />
                          <span
                            className="hm-mono text-[10px] font-bold tracking-[0.10em]"
                            style={{ color: 'var(--hm-text-dim)' }}
                          >
                            {t('creatorEdit.languageLabel')}
                          </span>
                        </div>
                        {/* Options */}
                        {[
                          { code: 'EN', label: t('studentShell.langEnglish'), flag: '🇺🇸' },
                          { code: 'ES', label: t('studentShell.langSpanish'), flag: '🇪🇸' },
                        ].map(({ code, label, flag }, i) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => {
                              setActiveLang(code)
                              setLangOpen(false)
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 transition-colors"
                            onMouseEnter={(e) => (e.currentTarget.style.background = VIOLET_SOFT)}
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background =
                                activeLang === code ? `${BLUE}12` : 'transparent')
                            }
                            style={{
                              background: activeLang === code ? `${BLUE}12` : 'transparent',
                              borderTop: i === 0 ? 'none' : '1px solid var(--hm-border)',
                            }}
                          >
                            <span className="text-[14px] leading-none">{flag}</span>
                            <span
                              className="text-[12.5px] flex-1 text-left"
                              style={{ color: 'var(--hm-text)' }}
                            >
                              {label}
                            </span>
                            {activeLang === code && (
                              <span
                                className="hm-mono text-[9.5px] font-bold px-1.5 py-0.5 rounded"
                                style={{ background: `${BLUE}20`, color: BLUE }}
                              >
                                {code}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Theme toggle */}
                  <button
                    type="button"
                    onClick={() => setIsLight((v) => !v)}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.background = VIOLET_SOFT)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    style={{ background: 'transparent' }}
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
                      style={{
                        background: 'var(--hm-bg-card-2)',
                        border: '1px solid var(--hm-border)',
                      }}
                    >
                      {isLight ? (
                        <Moon className="h-3 w-3" style={{ color: 'var(--hm-violet-2)' }} />
                      ) : (
                        <Sun className="h-3 w-3" style={{ color: 'var(--hm-amber)' }} />
                      )}
                    </span>
                    <span
                      className="text-[12.5px] font-medium flex-1"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {isLight ? t('studentShell.darkMode') : t('studentShell.lightMode')}
                    </span>
                    <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                      {isLight ? t('studentShell.on') : t('studentShell.off')}
                    </span>
                  </button>
                </div>

                {/* ── Sign out ── */}
                <div className="py-1" style={{ borderTop: '1px solid var(--hm-border)' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenPanel(null)
                      logout()
                      navigate('/login', { replace: true })
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left transition-colors"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'rgba(244,99,110,0.08)')
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    style={{ background: 'transparent' }}
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
                      style={{
                        background: 'rgba(244,99,110,0.10)',
                        border: '1px solid rgba(244,99,110,0.20)',
                      }}
                    >
                      <LogOut className="h-3 w-3" style={{ color: '#F4636E' }} />
                    </span>
                    <span className="text-[12.5px] font-medium" style={{ color: '#F4636E' }}>
                      {t('shell.signOut')}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger — visible on mobile + tablet (hidden at lg+) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t('studentShell.openMenu')}
            className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg transition-colors"
            style={{
              color: 'var(--hm-text-muted)',
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
            }}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Click-away backdrop for desktop dropdowns */}
      {openPanel !== null && (
        <button
          type="button"
          aria-label={t('studentShell.closePanel')}
          onClick={() => setOpenPanel(null)}
          className="cursor-default"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 95,
            background: 'transparent',
            border: 'none',
            padding: 0,
          }}
        />
      )}

      {/* ── Mobile / Tablet sidebar ── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label={t('studentShell.closeMenu')}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 190,
              background: 'rgba(0,0,0,0.60)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              border: 'none',
              padding: 0,
              cursor: 'default',
            }}
          />

          {/* Sidebar panel */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 200,
              width: 296,
              overflowY: 'auto',
              background: isLight ? 'rgba(244, 246, 251, 0.98)' : 'rgba(13,14,35,0.98)',
              borderLeft: '1px solid var(--hm-border-strong)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Sidebar header */}
            <div
              className="flex items-center justify-between px-4"
              style={{ height: 56, borderBottom: '1px solid var(--hm-border)' }}
            >
              <Link
                to="/student"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
                style={{ textDecoration: 'none' }}
              >
                <span className="hm-mark relative h-7 w-7">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 13V3M13 13V3M3 8H13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      style={{ color: 'var(--hm-violet-2)' }}
                    />
                  </svg>
                </span>
                <span
                  className="text-[15px] font-semibold leading-none"
                  style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
                >
                  HyperMind
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                style={{
                  color: 'var(--hm-text-muted)',
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                }}
                aria-label={t('studentShell.closeMenu')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* User info */}
            <div className="px-4 py-4" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full hm-mono text-[13px] font-semibold shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #7C5CF6 0%, #A78BFA 100%)',
                    color: 'white',
                  }}
                >
                  {t('studentShell.demoInitials')}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-[13.5px] font-semibold"
                    style={{ color: 'var(--hm-text)', letterSpacing: '-0.012em' }}
                  >
                    {t('studentShell.demoFullName')}
                  </p>
                  <p className="text-[11.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                    {t('studentShell.demoEmail')}
                  </p>
                </div>
              </div>
            </div>

            {/* Player HUD */}
            <div className="px-4 py-4" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <p
                className="hm-mono text-[9px] uppercase tracking-[0.10em] mb-3"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                {t('studentShell.progress')}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                  style={{
                    background: 'var(--hm-violet-soft)',
                    border: '1px solid var(--hm-border-accent)',
                  }}
                >
                  <span
                    className="hm-mono text-[12px] font-semibold"
                    style={{ color: 'var(--hm-violet-2)' }}
                  >
                    14
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                    {t('studentShell.xpProgress')}
                  </span>
                  <div className="hm-progress mt-1.5" style={{ height: 3 }}>
                    <div className="hm-progress-fill" style={{ width: '78%' }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5" style={{ color: 'var(--hm-amber)' }} />
                  <span
                    className="hm-mono text-[12px] font-semibold"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    {t('studentShell.streakLabel')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--hm-violet-2)' }} />
                  <span
                    className="hm-mono text-[12px] font-semibold"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    {t('studentShell.karmaLabel')}
                  </span>
                </div>
              </div>
            </div>

            {/* Nav — only on mobile (md shows nav in header already) */}
            <div
              className="px-2 py-2 md:hidden"
              style={{ borderBottom: '1px solid var(--hm-border)' }}
            >
              <p
                className="hm-mono text-[9px] uppercase tracking-[0.10em] px-3 mb-1.5"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                {t('common.navigate')}
              </p>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={STUDENT_PATHS[item.id] ?? '/student'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors"
                  style={{
                    color: activeTab === item.id ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                    background: activeTab === item.id ? 'var(--hm-violet-soft)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Utilities */}
            <div className="px-2 py-2" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <p
                className="hm-mono text-[9px] uppercase tracking-[0.10em] px-3 mb-1.5"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                {t('studentShell.quickAccess')}
              </p>

              {/* Messages */}
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left"
                onMouseEnter={(e) => (e.currentTarget.style.background = VIOLET_SOFT)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                style={{ background: 'transparent' }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  <MessageSquare className="h-3.5 w-3.5" style={{ color: BLUE }} />
                </span>
                <span className="text-[13.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
                  {t('studentShell.messages')}
                </span>
                <span
                  className="ml-auto hm-mono flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[9.5px] font-semibold"
                  style={{ background: VIOLET, color: '#fff' }}
                >
                  3
                </span>
              </button>

              {/* Notifications */}
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left"
                onMouseEnter={(e) => (e.currentTarget.style.background = VIOLET_SOFT)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                style={{ background: 'transparent' }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  <Bell className="h-3.5 w-3.5" style={{ color: AMBER }} />
                </span>
                <span className="text-[13.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
                  {t('studentShell.notifications')}
                </span>
                <span
                  className="ml-auto h-2 w-2 rounded-full shrink-0"
                  style={{ background: AMBER, boxShadow: `0 0 6px ${AMBER}` }}
                />
              </button>

              {/* Language */}
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left"
                onMouseEnter={(e) => (e.currentTarget.style.background = VIOLET_SOFT)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                style={{ background: 'transparent' }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  <Globe className="h-3.5 w-3.5" style={{ color: 'var(--hm-text-muted)' }} />
                </span>
                <span className="text-[13.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
                  {t('studentShell.language')}
                </span>
                <div className="ml-auto flex items-center gap-1">
                  <span
                    className="hm-mono text-[11px] font-semibold"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    {t('studentShell.langBadgeEN')}
                  </span>
                  <ChevronDown className="h-3 w-3" style={{ color: 'var(--hm-text-dim)' }} />
                </div>
              </button>

              {/* Theme toggle */}
              <button
                type="button"
                onClick={() => setIsLight((v) => !v)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left"
                onMouseEnter={(e) => (e.currentTarget.style.background = VIOLET_SOFT)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                style={{ background: 'transparent' }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  {isLight ? (
                    <Moon className="h-3.5 w-3.5" style={{ color: 'var(--hm-text-muted)' }} />
                  ) : (
                    <Sun className="h-3.5 w-3.5" style={{ color: AMBER }} />
                  )}
                </span>
                <span className="text-[13.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
                  {isLight ? t('studentShell.darkMode') : t('studentShell.lightMode')}
                </span>
              </button>
            </div>

            {/* Account links */}
            <div className="px-2 py-2" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <p
                className="hm-mono text-[9px] uppercase tracking-[0.10em] px-3 mb-1.5"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                {t('studentShell.account')}
              </p>
              {[
                { icon: BookOpen, label: t('studentShell.myCourses'), tint: VIOLET },
                { icon: GraduationCap, label: t('studentShell.myAssessments'), tint: VIOLET },
                { icon: User, label: t('studentShell.profile'), tint: 'var(--hm-text-muted)' },
              ].map(({ icon: Icon, label, tint }) => (
                <button
                  key={label}
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left"
                  onMouseEnter={(e) => (e.currentTarget.style.background = VIOLET_SOFT)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  style={{ background: 'transparent' }}
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      border: '1px solid var(--hm-border)',
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: tint }} />
                  </span>
                  <span className="text-[13.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Sign out */}
            <div className="px-2 py-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setOpenPanel(null)
                  logout()
                  navigate('/login', { replace: true })
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left"
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244,99,110,0.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                style={{ background: 'transparent' }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                  style={{
                    background: 'rgba(244,99,110,0.10)',
                    border: '1px solid rgba(244,99,110,0.20)',
                  }}
                >
                  <LogOut className="h-3.5 w-3.5" style={{ color: '#F4636E' }} />
                </span>
                <span className="text-[13.5px] font-medium" style={{ color: '#F4636E' }}>
                  {t('studentShell.signOut')}
                </span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Content ── */}
      {fullWidth ? (
        <div>
          {children}
          <Footer />
        </div>
      ) : (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px 0' }}>{children}</div>
      )}
      {!fullWidth && <Footer />}
    </div>
  )
}
