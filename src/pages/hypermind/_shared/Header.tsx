import { useState } from 'react'
import { Sun, Moon, Globe, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/stores/themeStore'
import { useLangStore } from '@/stores/langStore'
import { useAuthStore } from '@/stores/authStore'

interface HeaderProps {
  active?: 'courses' | 'assessments' | 'community' | 'home'
  theme?: 'dark' | 'light'
  onThemeToggle?: () => void
}

export function Header({ active: activeProp }: HeaderProps = {}) {
  const { t } = useTranslation()
  const theme = useThemeStore((s) => s.theme)
  const onThemeToggle = useThemeStore((s) => s.toggle)
  const lang = useLangStore((s) => s.lang)
  const setLang = useLangStore((s) => s.set)
  const user = useAuthStore((s) => s.user)
  const activeRole = useAuthStore((s) => s.activeRole)
  const logout = useAuthStore((s) => s.logout)
  const isLight = theme === 'light'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { id: 'courses', label: t('nav.courses'), href: '/courses' },
    { id: 'assessments', label: t('nav.assessments'), href: '/assessments' },
    { id: 'community', label: t('nav.community'), href: '/community' },
  ]

  const active =
    activeProp ??
    (location.pathname.startsWith('/courses')
      ? 'courses'
      : location.pathname.startsWith('/assessments')
        ? 'assessments'
        : location.pathname.startsWith('/community')
          ? 'community'
          : 'home')

  const dashHref = user
    ? activeRole === 'admin'
      ? '/admin'
      : activeRole === 'creator' || activeRole === 'evaluator'
        ? '/creator'
        : activeRole === 'student'
          ? '/student'
          : user.role === 'admin'
            ? '/admin'
            : user.role === 'creator'
              ? '/creator'
              : '/student'
    : '/login'

  return (
    <>
      <header
        className="w-full"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: isLight ? 'var(--hm-header-bg)' : 'rgba(11, 12, 30, 0.92)',
          borderBottom: '1px solid var(--hm-border)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <div className="mx-auto flex h-14 w-full max-w-[1280px] items-center gap-6 px-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
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
                to={item.href}
                className="relative inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors"
                style={{
                  color: active === item.id ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                  background: active === item.id ? 'var(--hm-violet-soft)' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Utilities: language + theme — desktop */}
          <div className="hidden sm:flex items-center gap-0.5 relative">
            {/* Language */}
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="flex h-8 items-center gap-1 rounded-md px-2 transition-colors"
              style={{ color: 'var(--hm-text-muted)' }}
              title={t('common.language')}
              aria-label={t('common.language')}
            >
              <Globe className="h-3.5 w-3.5" />
              <span
                className="hm-mono text-[10.5px] font-semibold tracking-wider"
                style={{ color: 'var(--hm-text)' }}
              >
                {lang}
              </span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>
            {langOpen && (
              <>
                <button
                  type="button"
                  onClick={() => setLangOpen(false)}
                  aria-label="Close"
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
                  className="overflow-hidden rounded-lg"
                  style={{
                    position: 'absolute',
                    right: 36,
                    top: 'calc(100% + 6px)',
                    width: 120,
                    zIndex: 9990,
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border-strong)',
                    boxShadow: '0 16px 40px -8px rgba(0,0,0,0.6)',
                  }}
                >
                  {(['EN', 'ES'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => {
                        setLang(l)
                        setLangOpen(false)
                      }}
                      className="w-full px-3 py-2 text-left text-[12.5px] font-medium hm-mono"
                      style={{
                        color: lang === l ? 'var(--hm-violet-2)' : 'var(--hm-text)',
                        background: lang === l ? 'var(--hm-violet-soft)' : 'transparent',
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Theme */}
            <button
              type="button"
              onClick={onThemeToggle}
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
              style={{ color: 'var(--hm-text-muted)', cursor: 'pointer' }}
              title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Auth CTAs — desktop */}
          <div className="hidden sm:flex items-center gap-2">
            {user ? (
              <>
                <Link
                  to={dashHref}
                  className="h-8 inline-flex items-center rounded-md px-3 text-[13px] font-medium"
                  style={{ color: 'var(--hm-text-muted)' }}
                >
                  {t('common.dashboard')}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="h-8 inline-flex items-center rounded-lg px-3.5 text-[13px] font-semibold"
                  style={{
                    background: 'var(--hm-violet-2)',
                    color: '#fff',
                    boxShadow: '0 0 0 1px rgba(124,92,246,0.35)',
                  }}
                >
                  {t('common.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="h-8 inline-flex items-center rounded-md px-3 text-[13px] font-medium"
                  style={{ color: 'var(--hm-text-muted)' }}
                >
                  {t('common.login')}
                </Link>
                <Link
                  to="/register"
                  className="h-8 inline-flex items-center rounded-lg px-3.5 text-[13px] font-semibold"
                  style={{
                    background: 'var(--hm-violet-2)',
                    color: '#fff',
                    boxShadow: '0 0 0 1px rgba(124,92,246,0.35)',
                  }}
                >
                  {t('common.signUp')}
                </Link>
              </>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t('common.openMenu')}
            className="flex sm:hidden h-9 w-9 items-center justify-center rounded-lg transition-colors"
            style={{
              color: 'var(--hm-text-muted)',
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 4h12M2 8h12M2 12h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label={t('common.closeMenu')}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 190,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              border: 'none',
              padding: 0,
              cursor: 'default',
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 200,
              width: 272,
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
              <div className="flex items-center gap-2.5">
                <span className="hm-mark relative h-7 w-7">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
                  className="text-[15px] font-semibold"
                  style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
                >
                  HyperMind
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  color: 'var(--hm-text-muted)',
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                }}
                aria-label={t('common.closeMenu')}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2 2l10 10M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="px-2 py-3" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <p
                className="hm-mono text-[9px] uppercase tracking-[0.10em] px-3 mb-1.5"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                {t('common.navigate')}
              </p>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors"
                  style={{
                    color: active === item.id ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                    background: active === item.id ? 'var(--hm-violet-soft)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language + Theme */}
            <div className="px-2 py-3" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <p
                className="hm-mono text-[9px] uppercase tracking-[0.10em] px-3 mb-1.5"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                {t('common.preferences')}
              </p>
              <button
                type="button"
                onClick={() => setLang(lang === 'EN' ? 'ES' : 'EN')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg"
                style={{ background: 'transparent' }}
              >
                <Globe className="h-4 w-4" style={{ color: 'var(--hm-text-muted)' }} />
                <span className="text-[13.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
                  {t('common.language')}
                </span>
                <span
                  className="ml-auto hm-mono text-[11px] font-semibold"
                  style={{ color: 'var(--hm-text)' }}
                >
                  {lang}
                </span>
                <ChevronDown className="h-3.5 w-3.5" style={{ color: 'var(--hm-text-dim)' }} />
              </button>
              <button
                type="button"
                onClick={onThemeToggle}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg"
                style={{ background: 'transparent' }}
              >
                {isLight ? (
                  <Moon className="h-4 w-4" style={{ color: 'var(--hm-text-muted)' }} />
                ) : (
                  <Sun className="h-4 w-4" style={{ color: '#F4B26C' }} />
                )}
                <span className="text-[13.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
                  {isLight ? t('common.darkMode') : t('common.lightMode')}
                </span>
              </button>
            </div>

            {/* Auth CTAs */}
            <div className="px-4 py-4 flex flex-col gap-2.5">
              {user ? (
                <>
                  <Link
                    to={dashHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center h-10 rounded-lg text-[13.5px] font-medium"
                    style={{ color: 'var(--hm-text-muted)', border: '1px solid var(--hm-border)' }}
                  >
                    {t('common.dashboard')}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-center h-10 rounded-lg text-[13.5px] font-semibold"
                    style={{ background: 'var(--hm-violet-2)', color: '#fff' }}
                  >
                    {t('common.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center h-10 rounded-lg text-[13.5px] font-medium"
                    style={{ color: 'var(--hm-text-muted)', border: '1px solid var(--hm-border)' }}
                  >
                    {t('common.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center h-10 rounded-lg text-[13.5px] font-semibold"
                    style={{ background: 'var(--hm-violet-2)', color: '#fff' }}
                  >
                    {t('common.signUp')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
