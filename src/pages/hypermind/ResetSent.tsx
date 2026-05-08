import { useState } from 'react'
import { Header } from './_shared/Header'
import { Footer } from './_shared/Footer'
import { Mail, ArrowLeft, Clock, CheckCircle2 } from 'lucide-react'
import './_group.css'

export default function ResetSent() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const isLight = theme === 'light'
  const toggleTheme = () => setTheme(isLight ? 'dark' : 'light')

  return (
    <div className={`hm-root ${isLight ? 'hm-light' : ''}`}>
      <Header theme={theme} onThemeToggle={toggleTheme} />

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
              <CheckCircle2 className="w-3 h-3" /> Check your inbox
            </span>
            <h1
              className="mt-3 text-[36px] md:text-[42px] font-semibold mb-3"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Reset link{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                sent.
              </span>
            </h1>
            <p
              className="text-[14px] max-w-sm mx-auto"
              style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
            >
              We've emailed a password reset link. Click it to set a new password — the link expires
              in 30 minutes.
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
            <div className="relative flex flex-col items-center text-center">
              {/* Mail icon ring */}
              <div className="relative mb-5">
                <div
                  className="absolute inset-0 rounded-full blur-[24px] opacity-60"
                  style={{ background: 'var(--hm-violet)' }}
                />
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--hm-violet) 0%, var(--hm-violet-2) 100%)',
                    boxShadow: '0 0 0 6px rgba(139, 92, 246, 0.10)',
                  }}
                >
                  <Mail className="w-7 h-7" style={{ color: '#fff' }} strokeWidth={2.2} />
                </div>
              </div>

              {/* Email pill */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full mb-5"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                }}
              >
                <span
                  className="hm-mono text-[11px]"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                >
                  SENT TO
                </span>
                <span className="text-[13px] font-medium" style={{ color: 'var(--hm-text)' }}>
                  alex@studio.com
                </span>
              </div>

              {/* Steps */}
              <div className="w-full grid grid-cols-1 gap-2 mb-6">
                {[
                  { n: '1', label: 'Open the email from HyperMind' },
                  { n: '2', label: 'Click the secure reset link' },
                  { n: '3', label: 'Set your new password' },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-left"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      border: '1px solid var(--hm-border)',
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0"
                      style={{
                        background: 'var(--hm-violet-soft)',
                        color: 'var(--hm-violet-2)',
                        border: '1px solid var(--hm-border-accent)',
                      }}
                    >
                      {s.n}
                    </span>
                    <span className="text-[12.5px]" style={{ color: 'var(--hm-text-muted)' }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="hm-btn-primary h-11 w-full justify-center text-[13.5px] font-semibold gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </a>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-1.5 text-[12px] mt-4"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                <Clock className="w-3 h-3" />
                Didn't get it? Resend in{' '}
                <span className="hm-mono" style={{ color: 'var(--hm-text-muted)' }}>
                  00:30
                </span>
              </button>
            </div>
          </div>

          {/* Footer help */}
          <p className="text-center text-[12px] mt-6" style={{ color: 'var(--hm-text-dim)' }}>
            Wrong address?{' '}
            <a href="#" className="hm-link">
              Try a different email
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
