import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Header } from './_shared/Header'
import { Footer } from './_shared/Footer'
import { useThemeStore } from '@/stores/themeStore'
import { useLoginMutation } from '@/api/auth/auth.api'
import { getDashboardPathByRole, pickCurrentRole } from '@/lib/dashboardPaths'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import './_group.css'

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
    <path
      d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </svg>
)

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      fill="#1877F2"
    />
  </svg>
)

export default function Login() {
  const { t } = useTranslation()
  const theme = useThemeStore((s) => s.theme)
  const isLight = theme === 'light'
  const { mutateAsync: loginUser, isPending: isLoggingIn } = useLoginMutation()
  const navigate = useNavigate()

  const [showPw, setShowPw] = useState(false)

  const schema = z.object({
    email: z.string().min(1, t('auth.enterCreds')).email(t('auth.enterCreds')),
    password: z.string().min(1, t('auth.enterCreds')),
  })
  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const { user: authUser } = await loginUser({ email, password })
      const apiRoles = authUser.roles.map((role) => role.name)
      const currentRole = pickCurrentRole(apiRoles)
      const dest = getDashboardPathByRole(currentRole)
      navigate(dest, { replace: true })
    } catch {
      // API errors are surfaced via toast inside useLoginMutation.
    }
  })

  return (
    <div className={`hm-root ${isLight ? 'hm-light' : ''}`}>
      <Header />

      <main
        className="relative flex flex-col items-center justify-start w-full px-6 pt-14 pb-20"
        style={{ minHeight: 'calc(900px - 56px - 80px)' }}
      >
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[520px] rounded-full blur-[140px] opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.30) 0%, transparent 65%)',
          }}
        />

        <div className="relative w-full max-w-[440px]">
          {/* Heading */}
          <div className="text-center mb-7">
            <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
              <Lock className="w-3 h-3" /> {t('common.signIn')}
            </span>
            <h1
              className="mt-3 text-[36px] md:text-[42px] font-semibold mb-3"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              {t('auth.welcomeBack')}{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                {t('auth.welcomeBackAccent')}
              </span>
            </h1>
            <p
              className="text-[14px] max-w-sm mx-auto"
              style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
            >
              {t('auth.subtitle')}
            </p>
          </div>

          {/* Card */}
          <div className="hm-card p-7 md:p-8 relative overflow-hidden">
            <div
              className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-[90px] opacity-50 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)',
              }}
            />
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-5">
                <SocialButton
                  icon={<GoogleIcon />}
                  label={t('auth.google')}
                  onClick={() => {}}
                />
                <SocialButton
                  icon={<FacebookIcon />}
                  label={t('auth.facebook')}
                  onClick={() => {}}
                />
              </div>

              <Divider label={t('auth.orEmail')} />

              <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
                <InputField
                  label={t('auth.email')}
                  type="email"
                  placeholder="admin@hypermind.io"
                  Icon={Mail}
                  inputProps={register('email')}
                  autoComplete="email"
                  error={errors.email?.message}
                />
                <InputField
                  label={t('auth.password')}
                  type={showPw ? 'text' : 'password'}
                  placeholder="password"
                  Icon={Lock}
                  inputProps={register('password')}
                  autoComplete="current-password"
                  eye={{ visible: showPw, onToggle: () => setShowPw((v) => !v) }}
                  error={errors.password?.message}
                />

                <div className="flex items-center justify-end pt-1">
                  <Link to="/forgot-password" className="hm-link text-[12.5px]">
                    {t('auth.forgot')}
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isLoggingIn}
                  className="hm-btn-primary h-11 w-full justify-center text-[13.5px] font-semibold gap-1.5 mt-2"
                  style={isSubmitting || isLoggingIn ? { opacity: 0.7, cursor: 'wait' } : undefined}
                >
                  {isSubmitting || isLoggingIn ? (
                    t('auth.submitting')
                  ) : (
                    <>
                      {t('auth.submit')} <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Footer link */}
          <p className="text-center text-[13px] mt-6" style={{ color: 'var(--hm-text-muted)' }}>
            {t('auth.newHere')}{' '}
            <Link to="/register" className="hm-link">
              {t('auth.createAccount')}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="h-11 w-full inline-flex items-center justify-center rounded-lg transition-colors"
      style={{
        background: 'var(--hm-bg-card-2)',
        border: '1px solid var(--hm-border)',
        color: 'var(--hm-text)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--hm-violet-soft)'
        e.currentTarget.style.borderColor = 'var(--hm-border-accent)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--hm-bg-card-2)'
        e.currentTarget.style.borderColor = 'var(--hm-border)'
      }}
    >
      {icon}
    </button>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <span className="flex-1 h-px" style={{ background: 'var(--hm-border)' }} />
      <span
        className="hm-mono text-[10px]"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
      >
        {label}
      </span>
      <span className="flex-1 h-px" style={{ background: 'var(--hm-border)' }} />
    </div>
  )
}

interface InputFieldProps {
  label: string
  type?: string
  placeholder?: string
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  eye?: { visible: boolean; onToggle: () => void }
  hint?: React.ReactNode
  value?: string
  onChange?: (v: string) => void
  autoComplete?: string
  /** When provided, spread directly onto <input> (e.g. RHF register output). */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  /** Inline validation error rendered below the input. */
  error?: string
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    label,
    type = 'text',
    placeholder,
    Icon,
    eye,
    hint,
    value,
    onChange,
    autoComplete,
    inputProps,
    error,
  },
  ref
) {
  const showError = Boolean(error)
  return (
    <div>
      <label
        className="hm-mono text-[10px] mb-1.5 block"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
          style={{ color: 'var(--hm-text-dim)' }}
        />
        <input
          ref={ref}
          type={type}
          {...(inputProps ?? {})}
          value={inputProps ? inputProps.value : value}
          onChange={
            inputProps
              ? inputProps.onChange
              : onChange
                ? (e) => onChange(e.currentTarget.value)
                : undefined
          }
          autoComplete={autoComplete ?? inputProps?.autoComplete}
          placeholder={placeholder}
          aria-invalid={showError || undefined}
          className={`w-full h-11 pl-9 ${eye ? 'pr-10' : 'pr-3'} text-[13.5px] outline-none transition-colors rounded-lg`}
          style={{
            background: 'var(--hm-bg-card-2)',
            border: `1px solid ${showError ? 'var(--hm-pink, #F4636E)' : 'var(--hm-border)'}`,
            color: 'var(--hm-text)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = showError
              ? 'var(--hm-pink, #F4636E)'
              : 'var(--hm-violet-2)'
            e.currentTarget.style.boxShadow = showError
              ? '0 0 0 3px rgba(244,99,110,0.15)'
              : '0 0 0 3px rgba(139, 92, 246, 0.12)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = showError
              ? 'var(--hm-pink, #F4636E)'
              : 'var(--hm-border)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
        {eye && (
          <button
            type="button"
            onClick={eye.onToggle}
            aria-label="Toggle password visibility"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded transition-colors hover:bg-[var(--hm-violet-soft)]"
            style={{ color: 'var(--hm-text-dim)' }}
          >
            {eye.visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
      {showError && (
        <p className="text-[11.5px] mt-1.5" style={{ color: 'var(--hm-pink, #F4636E)' }}>
          {error}
        </p>
      )}
      {!showError && hint && <div className="mt-1.5">{hint}</div>}
    </div>
  )
})
