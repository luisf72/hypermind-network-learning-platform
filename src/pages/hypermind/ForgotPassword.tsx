import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Header } from './_shared/Header'
import { Footer } from './_shared/Footer'
import { useThemeStore } from '@/stores/themeStore'
import { Mail, Send, ArrowLeft, ShieldCheck } from 'lucide-react'
import { InputField } from './Login'
import './_group.css'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
})
type FormValues = z.infer<typeof schema>

export default function ForgotPassword() {
  const navigate = useNavigate()
  const isLight = useThemeStore((s) => s.theme === 'light')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  })

  const onSubmit = handleSubmit(async ({ email }) => {
    await new Promise((r) => setTimeout(r, 400))
    toast.success(`Reset link sent to ${email}`)
    navigate('/reset-sent')
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
              <ShieldCheck className="w-3 h-3" /> Reset password
            </span>
            <h1
              className="mt-3 text-[36px] md:text-[42px] font-semibold mb-3"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Forgot your{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                password?
              </span>
            </h1>
            <p
              className="text-[14px] max-w-sm mx-auto"
              style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
            >
              Enter the email you signed up with — we'll send you a secure reset link within
              seconds.
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
                label="EMAIL"
                type="email"
                placeholder="alex@studio.com"
                Icon={Mail}
                inputProps={register('email')}
                error={errors.email?.message}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="hm-btn-primary h-11 w-full justify-center text-[13.5px] font-semibold gap-1.5 mt-1"
                style={isSubmitting ? { opacity: 0.7, cursor: 'wait' } : undefined}
              >
                {isSubmitting ? (
                  'Sending…'
                ) : (
                  <>
                    Send reset link <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-1.5 text-[12.5px] mt-1"
                style={{ color: 'var(--hm-text-muted)' }}
              >
                <ArrowLeft className="w-3 h-3" />
                <span className="hm-link">Back to sign in</span>
              </Link>
            </form>
          </div>

          <p className="text-center text-[12px] mt-6" style={{ color: 'var(--hm-text-dim)' }}>
            Need help?{' '}
            <Link to="/" className="hm-link">
              Contact support
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
