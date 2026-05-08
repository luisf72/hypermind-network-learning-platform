import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Header } from './_shared/Header'
import { Footer } from './_shared/Footer'
import { useThemeStore } from '@/stores/themeStore'
import { Mail, Lock, User, ArrowRight, Sparkles, Check, ShieldCheck } from 'lucide-react'
import { InputField } from './Login'
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

const SocialButton = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}) => (
  <button
    type="button"
    onClick={onClick}
    className="h-11 w-full inline-flex items-center justify-center gap-2.5 rounded-lg text-[13px] font-semibold transition-colors"
    style={{
      background: 'var(--hm-bg-card-2)',
      border: '1px solid var(--hm-border)',
      color: 'var(--hm-text)',
    }}
  >
    {icon}
    {label}
  </button>
)

export default function Register() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isLight = useThemeStore((s) => s.theme === 'light')

  const [showPw, setShowPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [agreed, setAgreed] = useState(true)

  const schema = z
    .object({
      name: z.string().min(2, 'Please enter your name'),
      email: z.string().email('Enter a valid email address'),
      password: z.string().min(8, 'At least 8 characters'),
      confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((d) => d.password === d.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    })
  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    if (!agreed) {
      toast.error('Please accept the terms to continue')
      return
    }
    await new Promise((r) => setTimeout(r, 400))
    toast.success(t('auth.welcomeToast', { name: values.name.split(' ')[0] }))
    navigate('/login', { replace: true })
  })

  return (
    <div className={`hm-root ${isLight ? 'hm-light' : ''}`}>
      <Header />

      <main
        className="relative flex flex-col items-center justify-start w-full px-6 pt-12 pb-16"
        style={{ minHeight: 'calc(900px - 56px - 80px)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[520px] rounded-full blur-[140px] opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.30) 0%, transparent 65%)',
          }}
        />

        <div className="relative w-full max-w-[460px]">
          <div className="text-center mb-6">
            <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
              <Sparkles className="w-3 h-3" /> Sign up · free forever
            </span>
            <h1
              className="mt-3 text-[36px] md:text-[42px] font-semibold mb-3"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Start your{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                learning
              </span>{' '}
              chain.
            </h1>
            <p
              className="text-[14px] max-w-sm mx-auto"
              style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
            >
              Join 2.4M learners. No credit card required — pick a course and start in under a
              minute.
            </p>
          </div>

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
                  onClick={() => toast.info(t('auth.socialDemoToast'))}
                />
                <SocialButton
                  icon={<FacebookIcon />}
                  label={t('auth.facebook')}
                  onClick={() => toast.info(t('auth.socialDemoToast'))}
                />
              </div>

              <div className="flex items-center gap-3 my-5">
                <span className="flex-1 h-px" style={{ background: 'var(--hm-border)' }} />
                <span
                  className="hm-mono text-[10px]"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
                >
                  OR SIGN UP WITH EMAIL
                </span>
                <span className="flex-1 h-px" style={{ background: 'var(--hm-border)' }} />
              </div>

              <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
                <InputField
                  label="FULL NAME"
                  type="text"
                  placeholder="Alex Kim"
                  Icon={User}
                  inputProps={register('name')}
                  error={errors.name?.message}
                />
                <InputField
                  label={t('auth.email')}
                  type="email"
                  placeholder="alex@studio.com"
                  Icon={Mail}
                  inputProps={register('email')}
                  error={errors.email?.message}
                />
                <InputField
                  label={t('auth.password')}
                  type={showPw ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  Icon={Lock}
                  inputProps={register('password')}
                  eye={{ visible: showPw, onToggle: () => setShowPw((v) => !v) }}
                  hint={errors.password ? undefined : <PasswordStrength />}
                  error={errors.password?.message}
                />
                <InputField
                  label="CONFIRM PASSWORD"
                  type={showConfirmPw ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  Icon={ShieldCheck}
                  inputProps={register('confirmPassword')}
                  eye={{ visible: showConfirmPw, onToggle: () => setShowConfirmPw((v) => !v) }}
                  error={errors.confirmPassword?.message}
                />

                <button
                  type="button"
                  onClick={() => setAgreed((a) => !a)}
                  className="flex items-start gap-2.5 text-left mt-1"
                >
                  <span
                    className="mt-0.5 w-4 h-4 rounded shrink-0 flex items-center justify-center transition-colors"
                    style={{
                      background: agreed ? 'var(--hm-violet-2)' : 'var(--hm-bg-card-2)',
                      border: `1px solid ${agreed ? 'var(--hm-violet-2)' : 'var(--hm-border)'}`,
                    }}
                  >
                    {agreed && (
                      <Check className="w-3 h-3" style={{ color: '#fff' }} strokeWidth={3} />
                    )}
                  </span>
                  <span
                    className="text-[12px] leading-relaxed"
                    style={{ color: 'var(--hm-text-muted)' }}
                  >
                    I agree to the <span className="hm-link">Terms of Service</span> and{' '}
                    <span className="hm-link">Privacy Policy</span>.
                  </span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hm-btn-primary h-11 w-full justify-center text-[13.5px] font-semibold gap-1.5 mt-2"
                  style={isSubmitting ? { opacity: 0.7, cursor: 'wait' } : undefined}
                >
                  {isSubmitting ? (
                    t('auth.submitting')
                  ) : (
                    <>
                      Create account <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <p className="text-center text-[13px] mt-6" style={{ color: 'var(--hm-text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="hm-link">
              {t('common.signIn')}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function PasswordStrength() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 flex-1">
        {[true, true, true, false].map((active, i) => (
          <span
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{
              background: active ? 'var(--hm-violet-2)' : 'var(--hm-bg-card-2)',
              border: active ? 'none' : '1px solid var(--hm-border)',
            }}
          />
        ))}
      </div>
      <span
        className="hm-mono text-[10px]"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
      >
        STRONG
      </span>
    </div>
  )
}
