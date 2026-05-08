import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Header } from './_shared/Header'
import { Footer } from './_shared/Footer'
import { useThemeStore } from '@/stores/themeStore'
import { Lock, ShieldCheck, KeyRound, Check, ArrowRight } from 'lucide-react'
import { InputField } from './Login'
import './_group.css'

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'At least 8 characters')
      .regex(/[A-Z]/, 'Must include one uppercase letter')
      .regex(/[0-9]/, 'Must include one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
type FormValues = z.infer<typeof schema>

export default function ResetPassword() {
  const navigate = useNavigate()
  const isLight = useThemeStore((s) => s.theme === 'light')

  const [showPw, setShowPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const pw = watch('password')
  const requirements = [
    { ok: pw.length >= 8, label: 'At least 8 characters' },
    { ok: /[A-Z]/.test(pw), label: 'One uppercase letter' },
    { ok: /[0-9]/.test(pw), label: 'One number' },
    { ok: /[!@#$%^&*]/.test(pw), label: 'One symbol (! @ #)' },
  ]

  const onSubmit = handleSubmit(async () => {
    await new Promise((r) => setTimeout(r, 400))
    toast.success('Password updated')
    navigate('/login', { replace: true })
  })

  return (
    <div className={`hm-root ${isLight ? 'hm-light' : ''}`}>
      <Header />

      <main
        className="relative flex flex-col items-center justify-start w-full px-6 pt-14 pb-20"
        style={{ minHeight: 'calc(900px - 56px - 80px)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[520px] rounded-full blur-[140px] opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.30) 0%, transparent 65%)',
          }}
        />

        <div className="relative w-full max-w-[440px]">
          <div className="text-center mb-7">
            <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
              <KeyRound className="w-3 h-3" /> New password
            </span>
            <h1
              className="mt-3 text-[36px] md:text-[42px] font-semibold mb-3"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Set a{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                new
              </span>{' '}
              password.
            </h1>
            <p
              className="text-[14px] max-w-sm mx-auto"
              style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
            >
              Choose something memorable but strong. You'll be signed in automatically once you
              save.
            </p>
          </div>

          <div className="hm-card p-7 md:p-8 relative overflow-hidden">
            <div
              className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-[90px] opacity-50 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)',
              }}
            />
            <form className="relative flex flex-col gap-4" onSubmit={onSubmit} noValidate>
              <InputField
                label="NEW PASSWORD"
                type={showPw ? 'text' : 'password'}
                placeholder="At least 8 characters"
                Icon={Lock}
                inputProps={register('password')}
                eye={{ visible: showPw, onToggle: () => setShowPw((v) => !v) }}
                error={errors.password?.message}
              />
              <InputField
                label="CONFIRM PASSWORD"
                type={showConfirmPw ? 'text' : 'password'}
                placeholder="Re-enter your new password"
                Icon={ShieldCheck}
                inputProps={register('confirmPassword')}
                eye={{ visible: showConfirmPw, onToggle: () => setShowConfirmPw((v) => !v) }}
                error={errors.confirmPassword?.message}
              />

              <div
                className="rounded-lg p-3 mt-1"
                style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
              >
                <p
                  className="hm-mono text-[10px] mb-2"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
                >
                  PASSWORD MUST INCLUDE
                </p>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                  {requirements.map((r) => (
                    <div key={r.label} className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: r.ok ? 'var(--hm-violet-2)' : 'var(--hm-bg-card)',
                          border: r.ok ? 'none' : '1px solid var(--hm-border)',
                        }}
                      >
                        {r.ok && (
                          <Check
                            className="w-2.5 h-2.5"
                            style={{ color: '#fff' }}
                            strokeWidth={3.5}
                          />
                        )}
                      </span>
                      <span
                        className="text-[11.5px]"
                        style={{ color: r.ok ? 'var(--hm-text-muted)' : 'var(--hm-text-dim)' }}
                      >
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="hm-btn-primary h-11 w-full justify-center text-[13.5px] font-semibold gap-1.5 mt-1"
                style={isSubmitting ? { opacity: 0.7, cursor: 'wait' } : undefined}
              >
                {isSubmitting ? (
                  'Updating…'
                ) : (
                  <>
                    Update password <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-[12px] mt-6" style={{ color: 'var(--hm-text-dim)' }}>
            Reset link expires in{' '}
            <span className="hm-mono" style={{ color: 'var(--hm-text-muted)' }}>
              29:42
            </span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
