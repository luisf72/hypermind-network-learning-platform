import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, LogOut, UserCircle2 } from 'lucide-react'

interface UserProfileMenuProps {
  name: string
  email?: string
  initials: string
  profilePath: string
  accentColor: string
  accentTextColor?: string
  subtitle?: string
  onLogout: () => void
}

export function UserProfileMenu({
  name,
  email,
  initials,
  profilePath,
  accentColor,
  accentTextColor = '#fff',
  subtitle,
  onLogout,
}: UserProfileMenuProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-full transition-colors"
        style={{
          background: open ? 'var(--hm-bg-card)' : 'transparent',
          border: `1px solid ${open ? 'var(--hm-border)' : 'transparent'}`,
        }}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-[11.5px] font-semibold"
          style={{
            background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
            color: accentTextColor,
          }}
        >
          {initials}
        </span>
        <div className="hidden md:flex flex-col items-start leading-tight">
          <span className="text-[12.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            {name}
          </span>
          {subtitle && <span className="text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>{subtitle}</span>}
        </div>
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform"
          style={{
            color: 'var(--hm-text-dim)',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label={t('shell.closeMenu')}
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
              width: 240,
              background: 'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
              border: '1px solid var(--hm-border-strong)',
              boxShadow: '0 24px 60px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,92,246,0.08)',
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
            <div className="px-3.5 py-3 flex items-center gap-3" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold"
                style={{
                  background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
                  color: accentTextColor,
                }}
              >
                {initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--hm-text)' }}>
                  {name}
                </p>
                {email && <p className="text-[11px] truncate" style={{ color: 'var(--hm-text-dim)' }}>{email}</p>}
              </div>
            </div>
            <Link
              to={profilePath}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] text-left transition-colors hover:bg-[var(--hm-violet-soft)]"
              style={{ color: 'var(--hm-text)' }}
            >
              <UserCircle2 className="h-4 w-4" style={{ color: 'var(--hm-text-muted)' }} />
              {t('shell.viewProfile')}
            </Link>
            <button
              role="menuitem"
              type="button"
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] text-left transition-colors hover:bg-[var(--hm-violet-soft)]"
              style={{ color: accentColor, borderTop: '1px solid var(--hm-border)' }}
            >
              <LogOut className="h-4 w-4" />
              {t('shell.logOut')}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
