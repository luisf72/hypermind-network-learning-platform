import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ShieldCheck, Palette, ClipboardCheck, GraduationCap, Check } from 'lucide-react'
import type { Role } from '@/stores/authStore'

type AccountRoleKey = Exclude<Role, 'guest'>

type RoleMeta = {
  labelKey: string
  descKey: string
  color: string
  soft: string
  Icon: React.ComponentType<{ className?: string }>
}

const ROLE_META: Record<AccountRoleKey, RoleMeta> = {
  admin: {
    labelKey: 'roleSwitch.admin',
    descKey: 'roleSwitch.descAdmin',
    Icon: ShieldCheck,
    color: '#F4636E',
    soft: 'rgba(244,99,110,0.10)',
  },
  creator: {
    labelKey: 'roleSwitch.creator',
    descKey: 'roleSwitch.descCreator',
    Icon: Palette,
    color: '#F4B26C',
    soft: 'rgba(244,178,108,0.14)',
  },
  evaluator: {
    labelKey: 'roleSwitch.evaluator',
    descKey: 'roleSwitch.descEvaluator',
    Icon: ClipboardCheck,
    color: '#5BC8C5',
    soft: 'rgba(91,200,197,0.14)',
  },
  student: {
    labelKey: 'roleSwitch.student',
    descKey: 'roleSwitch.descStudent',
    Icon: GraduationCap,
    color: '#7C5CF6',
    soft: 'rgba(124,92,246,0.12)',
  },
}

type MenuItem =
  | { kind: 'single'; role: AccountRoleKey }
  | { kind: 'studio'; hasCreator: boolean; hasEvaluator: boolean }

function isStudioRole(role: Role): boolean {
  return role === 'creator' || role === 'evaluator'
}

function studioSwitchTarget(hasCreator: boolean, hasEvaluator: boolean): AccountRoleKey {
  if (hasCreator) return 'creator'
  return 'evaluator'
}

function buildMenuItems(availableRoles: AccountRoleKey[]): MenuItem[] {
  const set = new Set(availableRoles)
  const hasCreator = set.has('creator')
  const hasEvaluator = set.has('evaluator')
  const hasStudio = hasCreator || hasEvaluator

  const items: MenuItem[] = []
  if (set.has('admin')) items.push({ kind: 'single', role: 'admin' })
  if (hasStudio) items.push({ kind: 'studio', hasCreator, hasEvaluator })
  if (set.has('student')) items.push({ kind: 'single', role: 'student' })
  return items
}

interface RoleSwitcherProps {
  availableRoles: Array<Exclude<Role, 'guest'>>
  activeRole: Role
  onSwitch: (role: Exclude<Role, 'guest'>) => void
  titleKey?: string
}

export function RoleSwitcher({
  availableRoles,
  activeRole,
  onSwitch,
  titleKey = 'shell.switchRole',
}: RoleSwitcherProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const normalizedAvailable = useMemo(
    () =>
      Array.from(new Set(availableRoles)).filter((role): role is AccountRoleKey => role in ROLE_META),
    [availableRoles]
  )

  const menuItems = useMemo(() => buildMenuItems(normalizedAvailable), [normalizedAvailable])

  const studioActive =
    activeRole !== 'guest' && isStudioRole(activeRole) && menuItems.some((i) => i.kind === 'studio')

  const currentRoleKey: AccountRoleKey = useMemo(() => {
    if (studioActive) return 'creator'
    if (activeRole !== 'guest' && normalizedAvailable.includes(activeRole as AccountRoleKey)) {
      return activeRole as AccountRoleKey
    }
    const first = menuItems[0]
    if (!first) return 'student'
    if (first.kind === 'studio') return 'creator'
    return first.role
  }, [studioActive, activeRole, normalizedAvailable, menuItems])

  const currentMeta = ROLE_META[currentRoleKey] ?? ROLE_META.student

  if (menuItems.length <= 1) return null

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => menuItems.length > 1 && setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 pl-1 pr-2.5 h-8 rounded-full transition-all"
        style={{
          background: open ? currentMeta.soft : 'transparent',
          border: `1px solid ${open ? `${currentMeta.color}55` : 'var(--hm-border)'}`,
          boxShadow: open ? `0 0 0 3px ${currentMeta.color}14` : 'none',
          cursor: menuItems.length > 1 ? 'pointer' : 'default',
        }}
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full shrink-0"
          style={{
            background: currentMeta.soft,
            color: currentMeta.color,
            boxShadow: `0 0 10px ${currentMeta.color}44`,
          }}
        >
          <currentMeta.Icon className="h-3 w-3" />
        </span>
        <span className="hidden md:flex flex-col items-start leading-tight">
          <span className="hm-mono text-[8.5px] font-semibold" style={{ color: 'var(--hm-text-dim)' }}>
            {t('shell.viewingAs')}
          </span>
          <span
            className="hm-mono text-[10.5px] font-semibold leading-none"
            style={{ color: currentMeta.color, letterSpacing: '0.1em' }}
          >
            {t(currentMeta.labelKey).toUpperCase()}
          </span>
        </span>
        <ChevronDown
          className="h-3 w-3 transition-transform shrink-0"
          style={{
            color: 'var(--hm-text-dim)',
            transform: open ? 'rotate(180deg)' : 'none',
            opacity: menuItems.length > 1 ? 1 : 0.5,
          }}
        />
      </button>

      {open && menuItems.length > 1 && (
        <>
          <button
            type="button"
            aria-label={t('shell.closeRoleMenu')}
            onClick={() => setOpen(false)}
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
              background: 'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
              border: '1px solid var(--hm-border-strong)',
              boxShadow: `0 24px 60px -12px rgba(0,0,0,0.75), 0 0 0 1px ${currentMeta.color}10`,
            }}
          >
            <div className="px-4 py-2.5" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <p className="hm-mono text-[9.5px] font-semibold" style={{ color: 'var(--hm-text-dim)' }}>
                {t(titleKey)}
              </p>
            </div>
            {menuItems.map((item, idx) => {
              if (item.kind === 'single') {
                const roleMeta = ROLE_META[item.role]
                const isActive = activeRole === item.role
                return (
                  <button
                    key={item.role}
                    role="menuitem"
                    type="button"
                    onClick={() => {
                      onSwitch(item.role)
                      setOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                    style={{
                      background: isActive ? roleMeta.soft : 'transparent',
                      borderTop: idx === 0 ? 'none' : '1px solid var(--hm-border)',
                    }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                      style={{
                        background: roleMeta.soft,
                        color: roleMeta.color,
                      }}
                    >
                      <roleMeta.Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          className="text-[13px] font-semibold"
                          style={{ color: isActive ? roleMeta.color : 'var(--hm-text)' }}
                        >
                          {t(roleMeta.labelKey)}
                        </p>
                        {isActive && <Check className="h-3 w-3" style={{ color: roleMeta.color }} />}
                      </div>
                      <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                        {t(roleMeta.descKey)}
                      </p>
                    </div>
                  </button>
                )
              }

              const roleMeta = ROLE_META.creator
              const isActive = studioActive
              const evalAccent = ROLE_META.evaluator.color
              return (
                <button
                  key="studio"
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    onSwitch(studioSwitchTarget(item.hasCreator, item.hasEvaluator))
                    setOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                  style={{
                    background: isActive ? roleMeta.soft : 'transparent',
                    borderTop: idx === 0 ? 'none' : '1px solid var(--hm-border)',
                  }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                    style={{
                      background: roleMeta.soft,
                      color: roleMeta.color,
                    }}
                  >
                    <roleMeta.Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className="text-[13px] font-semibold"
                        style={{ color: isActive ? roleMeta.color : 'var(--hm-text)' }}
                      >
                        {t(roleMeta.labelKey)}
                      </p>
                      {item.hasEvaluator && (
                        <span
                          className="hm-mono text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                          style={{
                            color: evalAccent,
                            background: ROLE_META.evaluator.soft,
                            border: `1px solid ${evalAccent}33`,
                          }}
                        >
                          {t('roleSwitch.alsoEvaluator')}
                        </span>
                      )}
                      {isActive && <Check className="h-3 w-3 shrink-0" style={{ color: roleMeta.color }} />}
                    </div>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                      {t(roleMeta.descKey)}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
