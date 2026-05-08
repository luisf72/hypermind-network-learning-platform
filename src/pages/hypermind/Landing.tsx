import { useState } from 'react'
import { Header } from './_shared/Header'
import { Footer } from './_shared/Footer'
import {
  ArrowRight,
  Sparkles,
  Star,
  Users,
  Award,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Plus,
  Minus,
  HelpCircle,
  Mail,
  Lock,
  Briefcase,
  Languages,
  Camera,
  Music,
  DollarSign,
  Brush,
  ChefHat,
  Heart,
  Mic,
  Code2,
  UserPlus,
  Search,
  Check,
} from 'lucide-react'
import './_group.css'

export default function Landing() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const isLight = theme === 'light'
  const toggleTheme = () => setTheme(isLight ? 'dark' : 'light')

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')

  return (
    <div className={`hm-root ${isLight ? 'hm-light' : ''}`}>
      <Header active="home" theme={theme} onThemeToggle={toggleTheme} />

      <main className="flex flex-col items-center w-full">
        {/* ═════════ 1 · HERO BANNER ═════════ */}
        <section className="relative w-full max-w-[1280px] px-6 pt-24 pb-24 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[520px] rounded-full blur-[140px] opacity-40 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.30) 0%, transparent 65%)',
            }}
          />

          <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="hm-glass inline-flex items-center gap-2 rounded-full pl-2.5 pr-3 py-1 mb-7">
              <span className="hm-pulse-dot" />
              <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-muted)' }}>
                <span style={{ color: 'var(--hm-text)' }}>237,491</span> learners online · 12,000+
                courses
              </span>
            </div>

            <h1
              className="text-[56px] md:text-[80px] font-semibold mb-5"
              style={{ letterSpacing: '-0.04em', lineHeight: 0.98, color: 'var(--hm-text)' }}
            >
              Learn anything.
              <br />
              <span className="hm-grad-text">Prove it</span>{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                on chain.
              </span>
            </h1>

            <p
              className="text-[17px] md:text-[18px] max-w-xl mb-9"
              style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
            >
              The familiar online classroom — from guitar to graphic design, finance to French —
              with blockchain-verified certificates that employers and schools can confirm in one
              click.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <a href="#" className="hm-btn-primary h-12 px-6 text-[14px] gap-2">
                <Sparkles className="w-4 h-4" /> Start learning free
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { Icon: BookOpen, val: '12k+', label: 'courses' },
                { Icon: Award, val: '350+', label: 'verifiable certs' },
                { Icon: Users, val: '2.4M', label: 'learners' },
                { Icon: Star, val: '4.92', label: 'avg rating' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <s.Icon className="w-3.5 h-3.5" style={{ color: 'var(--hm-violet-2)' }} />
                  <span
                    className="hm-mono text-[13px] font-semibold"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    {s.val}
                  </span>
                  <span className="text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════ 2 · FEATURES ═════════ */}
        <section className="w-full max-w-[1280px] px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
              Why HyperMind
            </span>
            <h2
              className="mt-3 text-[34px] md:text-[44px] font-semibold mb-4"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em' }}
            >
              Everything you need to{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                actually
              </span>{' '}
              learn
            </h2>
            <p className="text-[15px]" style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}>
              A full learning experience plus a blockchain credential layer that makes your skills
              verifiable, portable, and yours forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BookOpen,
                title: '12,000+ courses',
                desc: 'Hand-picked instructors across 60 fields — from watercolor and music to finance and project management.',
              },
              {
                icon: GraduationCap,
                title: 'Real assessments',
                desc: 'Proctored, anti-cheat exams that test what you actually learned. Practice quizzes built into every course.',
              },
              {
                icon: ShieldCheck,
                title: 'On-chain certificates',
                desc: 'Each pass mints a tamper-proof credential anyone can verify in one click. No paper, no PDFs, no fakes.',
              },
              {
                icon: Users,
                title: 'Active community',
                desc: 'Study groups, weekly live AMAs, and a 190k-strong Discord where learners help learners.',
              },
            ].map((f) => (
              <div key={f.title} className="hm-card p-6">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    background: 'var(--hm-violet-soft)',
                    border: '1px solid var(--hm-border-accent)',
                  }}
                >
                  <f.icon className="w-5 h-5" style={{ color: 'var(--hm-violet-2)' }} />
                </div>
                <h3
                  className="text-[16px] font-semibold mb-2"
                  style={{ color: 'var(--hm-text)', letterSpacing: '-0.014em' }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[13.5px]"
                  style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════ 3 · HOW IT WORKS ═════════ */}
        <section className="w-full max-w-[1280px] px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
              How it works
            </span>
            <h2
              className="mt-3 text-[34px] md:text-[44px] font-semibold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em' }}
            >
              Four steps from curious to{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                certified
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {[
              {
                step: '01',
                icon: UserPlus,
                title: 'Create your account',
                desc: 'Sign up free in 30 seconds. No card, no crypto wallet required.',
              },
              {
                step: '02',
                icon: Search,
                title: 'Pick a course',
                desc: 'Browse 60 disciplines or let Synthia recommend a learning path for your goal.',
              },
              {
                step: '03',
                icon: GraduationCap,
                title: 'Take the assessment',
                desc: "Practice as you go. When you're ready, sit a proctored, anti-cheat exam.",
              },
              {
                step: '04',
                icon: Award,
                title: 'Mint your certificate',
                desc: 'A unique credential is recorded on-chain. Share one link to verify it forever.',
              },
            ].map((s, i, arr) => (
              <div key={s.step} className="hm-card p-6 relative">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="hm-mono text-[24px] font-semibold"
                    style={{ color: 'var(--hm-violet-2)', opacity: 0.4, letterSpacing: '-0.04em' }}
                  >
                    {s.step}
                  </span>
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center"
                    style={{
                      background: 'var(--hm-violet-soft)',
                      border: '1px solid var(--hm-border-accent)',
                    }}
                  >
                    <s.icon className="w-4.5 h-4.5" style={{ color: 'var(--hm-violet-2)' }} />
                  </div>
                </div>
                <h3
                  className="text-[15.5px] font-semibold mb-2"
                  style={{ color: 'var(--hm-text)', letterSpacing: '-0.014em' }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-[13px]"
                  style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
                >
                  {s.desc}
                </p>
                {i < arr.length - 1 && (
                  <div
                    className="hidden lg:flex items-center justify-center absolute top-1/2 -right-2 w-4 h-4 -translate-y-1/2"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--hm-text-dim)' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ═════════ 4 · PRICING ═════════ */}
        <section className="w-full max-w-[1280px] px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
              Pricing
            </span>
            <h2
              className="mt-3 text-[34px] md:text-[44px] font-semibold mb-4"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em' }}
            >
              Simple plans,{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                no surprises
              </span>
            </h2>
            <p className="text-[15px]" style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}>
              Start free forever. Upgrade for premium courses, proctored assessments, and unlimited
              on-chain certs.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex justify-center mb-10">
            <div
              className="hm-glass inline-flex items-center rounded-full p-1"
              style={{ border: '1px solid var(--hm-border)' }}
            >
              {(['monthly', 'yearly'] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBilling(b)}
                  className="relative h-9 px-5 rounded-full text-[12.5px] font-medium transition-colors"
                  style={{
                    background: billing === b ? 'var(--hm-violet-soft)' : 'transparent',
                    color: billing === b ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                    border:
                      billing === b ? '1px solid var(--hm-border-accent)' : '1px solid transparent',
                  }}
                >
                  {b === 'monthly' ? 'Monthly' : 'Yearly'}
                  {b === 'yearly' && (
                    <span
                      className="hm-mono ml-2 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                      style={{
                        background: 'var(--hm-amber-soft)',
                        color: 'var(--hm-amber)',
                        border: '1px solid rgba(244, 178, 108, 0.22)',
                      }}
                    >
                      − 20%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                tagline: 'For dipping your toes in',
                priceMonthly: 0,
                priceYearly: 0,
                cta: 'Get started free',
                highlight: false,
                features: [
                  'Free courses across all 12 disciplines',
                  'Up to 3 on-chain certificates',
                  'Synthia AI mentor (5 queries/day)',
                  'Community access',
                ],
              },
              {
                name: 'Pro',
                tagline: 'For serious learners',
                priceMonthly: 19,
                priceYearly: 15,
                cta: 'Start 14-day trial',
                highlight: true,
                features: [
                  'Everything in Starter',
                  'All 12,000+ courses unlocked',
                  'Unlimited on-chain certificates',
                  'Unlimited Synthia AI mentor',
                  'Proctored assessments included',
                  'Priority support',
                ],
              },
              {
                name: 'Team',
                tagline: 'For schools & companies',
                priceMonthly: 49,
                priceYearly: 39,
                cta: 'Talk to sales',
                highlight: false,
                features: [
                  'Everything in Pro · per seat',
                  'Admin dashboard & seat management',
                  'Verifier API for credentials',
                  'Custom learning paths',
                  'SSO & SAML',
                  'Dedicated success manager',
                ],
              },
            ].map((p) => {
              const price = billing === 'monthly' ? p.priceMonthly : p.priceYearly
              return (
                <div
                  key={p.name}
                  className={`${p.highlight ? 'hm-iridescent' : 'hm-card'} p-7 relative flex flex-col`}
                >
                  {p.highlight && (
                    <span
                      className="hm-mono absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[9.5px] font-semibold uppercase tracking-wider"
                      style={{
                        background: 'var(--hm-violet-2)',
                        color: 'var(--hm-bg)',
                        border: '1px solid var(--hm-border-accent)',
                      }}
                    >
                      Most popular
                    </span>
                  )}

                  <h3
                    className="text-[20px] font-semibold mb-1"
                    style={{ color: 'var(--hm-text)', letterSpacing: '-0.018em' }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-[12.5px] mb-6" style={{ color: 'var(--hm-text-dim)' }}>
                    {p.tagline}
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span
                      className="text-[44px] font-semibold"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em', lineHeight: 1 }}
                    >
                      ${price}
                    </span>
                    <span className="hm-mono text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
                      / {billing === 'monthly' ? 'mo' : 'mo, billed yearly'}
                    </span>
                  </div>
                  <p className="hm-mono text-[10.5px] mb-6" style={{ color: 'var(--hm-text-dim)' }}>
                    {price === 0
                      ? 'free forever · no card required'
                      : billing === 'yearly'
                        ? `$${p.priceYearly * 12} billed annually · save 20%`
                        : `or save 20% with yearly billing`}
                  </p>

                  <a
                    href="#"
                    className={`${p.highlight ? 'hm-btn-primary' : 'hm-btn-ghost'} h-11 w-full justify-center text-[13.5px] font-semibold mb-7`}
                  >
                    {p.cta}
                  </a>

                  <ul className="space-y-2.5">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-[13px]"
                        style={{ color: 'var(--hm-text)' }}
                      >
                        <Check
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: 'var(--hm-violet-2)' }}
                        />
                        <span style={{ color: 'var(--hm-text-muted)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* ═════════ 5 · CATEGORIES ═════════ */}
        <section className="w-full max-w-[1280px] px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
              Categories
            </span>
            <h2
              className="mt-3 text-[34px] md:text-[44px] font-semibold mb-4"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em' }}
            >
              Twelve disciplines,{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                one chain
              </span>
            </h2>
            <p className="text-[15px]" style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}>
              Pick a field, find a course you love, and start your skill chain today.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: 'Business', icon: Briefcase, count: 412 },
              { name: 'Languages', icon: Languages, count: 286 },
              { name: 'Photography', icon: Camera, count: 197 },
              { name: 'Music', icon: Music, count: 184 },
              { name: 'Finance', icon: DollarSign, count: 161 },
              { name: 'Arts & Crafts', icon: Brush, count: 148 },
              { name: 'Cooking', icon: ChefHat, count: 127 },
              { name: 'Health & Fitness', icon: Heart, count: 119 },
              { name: 'Communication', icon: Mic, count: 98 },
              { name: 'Tech & Coding', icon: Code2, count: 342 },
              { name: 'Personal Growth', icon: Sparkles, count: 211 },
              { name: 'Academics', icon: GraduationCap, count: 173 },
            ].map((cat) => (
              <a href="#" key={cat.name} className="hm-card hm-card-hover p-5 group cursor-pointer">
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border-strong)',
                  }}
                >
                  <cat.icon style={{ color: 'var(--hm-violet-2)', width: 18, height: 18 }} />
                </div>
                <h4
                  className="text-[14.5px] font-semibold mb-1"
                  style={{ color: 'var(--hm-text)', letterSpacing: '-0.012em' }}
                >
                  {cat.name}
                </h4>
                <p className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                  {cat.count} courses
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ═════════ 6 · FAQs ═════════ */}
        <section className="w-full max-w-[1280px] px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="hm-eyebrow mb-3">
                <HelpCircle className="w-3 h-3" /> FAQs
              </span>
              <h2
                className="mt-3 text-[34px] md:text-[40px] font-semibold mb-4"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em' }}
              >
                Questions,{' '}
                <span
                  className="hm-serif-italic"
                  style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
                >
                  answered.
                </span>
              </h2>
              <p
                className="text-[14.5px] mb-6"
                style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
              >
                The most common things learners, instructors, and recruiters ask before they get
                started.
              </p>
              <a href="#" className="hm-btn-ghost h-10 px-4 text-[13px] gap-1.5">
                Full help center <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="lg:col-span-8 space-y-2.5">
              {[
                {
                  q: 'How does a blockchain certificate work?',
                  a: 'When you pass an assessment, HyperMind writes a unique cryptographic hash to a public chain. Anyone with your share link can confirm the certificate is real, who issued it, and when — instantly, forever.',
                },
                {
                  q: 'Is HyperMind free to start?',
                  a: 'Yes. The Starter plan is free forever and includes free courses across all 12 disciplines, up to 3 on-chain certificates, and access to the community.',
                },
                {
                  q: 'What subjects can I learn?',
                  a: 'Anything from watercolor and acoustic guitar to project management, Spanish, accounting, photography, cooking — and yes, coding. 12,000+ courses across 60 disciplines, with new ones added every week.',
                },
                {
                  q: 'Do I need a crypto wallet?',
                  a: "No. Your certificates live in your HyperMind account by default. If you ever want to take custody in your own wallet, you can connect one in seconds — but it's optional.",
                },
                {
                  q: 'Can my employer or school verify a certificate?',
                  a: 'In one click. Each cert has a public verification page, and we offer a free Verifier API for HR teams, schools, and platforms to bulk-check applicants.',
                },
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes — cancel from settings in two clicks, no questions asked. Your earned certificates stay yours forever, regardless of plan.',
                },
              ].map((f, i) => (
                <div key={i} className="hm-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className="text-[14.5px] font-semibold"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.012em' }}
                    >
                      {f.q}
                    </span>
                    <span
                      className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-colors"
                      style={{
                        background: openFaq === i ? 'var(--hm-violet-soft)' : 'var(--hm-bg-card-2)',
                        border: '1px solid var(--hm-border)',
                      }}
                    >
                      {openFaq === i ? (
                        <Minus className="w-3.5 h-3.5" style={{ color: 'var(--hm-violet-2)' }} />
                      ) : (
                        <Plus className="w-3.5 h-3.5" style={{ color: 'var(--hm-text-muted)' }} />
                      )}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div
                      className="px-5 pb-5 pt-1 text-[13.5px]"
                      style={{
                        color: 'var(--hm-text-muted)',
                        lineHeight: 1.6,
                        borderTop: '1px solid var(--hm-border)',
                      }}
                    >
                      <p className="pt-4">{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════ 7 · CONTACT US ═════════ */}
        <section className="w-full max-w-[1280px] px-6 py-20 pb-28">
          <div className="max-w-3xl mx-auto">
            <div className="hm-card p-8 md:p-10 relative overflow-hidden">
              <div
                className="absolute -top-24 -left-24 w-56 h-56 rounded-full blur-[100px] opacity-50"
                style={{
                  background: 'radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)',
                }}
              />
              <div className="relative">
                <div className="text-center mb-8">
                  <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
                    <Mail className="w-3 h-3" /> Contact us
                  </span>
                  <h2
                    className="mt-3 text-[32px] md:text-[40px] font-semibold mb-3"
                    style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em' }}
                  >
                    Talk to a{' '}
                    <span
                      className="hm-serif-italic"
                      style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
                    >
                      human
                    </span>
                  </h2>
                  <p
                    className="text-[14.5px] max-w-md mx-auto"
                    style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
                  >
                    Questions about courses, pricing, or verifying certificates at scale? We read
                    every message and reply within 24 hours.
                  </p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-1">
                    <label
                      className="hm-mono text-[10px] mb-1.5 block"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
                    >
                      NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Alex Kim"
                      className="hm-input w-full h-10 px-3 text-[13px]"
                      style={{
                        background: 'var(--hm-bg-card-2)',
                        border: '1px solid var(--hm-border)',
                        borderRadius: 8,
                        color: 'var(--hm-text)',
                      }}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label
                      className="hm-mono text-[10px] mb-1.5 block"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="alex@studio.com"
                      className="hm-input w-full h-10 px-3 text-[13px]"
                      style={{
                        background: 'var(--hm-bg-card-2)',
                        border: '1px solid var(--hm-border)',
                        borderRadius: 8,
                        color: 'var(--hm-text)',
                      }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      className="hm-mono text-[10px] mb-1.5 block"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
                    >
                      I'M REACHING OUT AS A...
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Learner', 'Instructor', 'Company', 'Press'].map((t, i) => (
                        <button
                          key={t}
                          type="button"
                          className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors"
                          style={{
                            background: i === 0 ? 'var(--hm-violet-soft)' : 'var(--hm-bg-card-2)',
                            color: i === 0 ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                            border: `1px solid ${i === 0 ? 'var(--hm-border-accent)' : 'var(--hm-border)'}`,
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label
                      className="hm-mono text-[10px] mb-1.5 block"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
                    >
                      MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what's on your mind…"
                      className="hm-input w-full px-3 py-2.5 text-[13px] resize-none"
                      style={{
                        background: 'var(--hm-bg-card-2)',
                        border: '1px solid var(--hm-border)',
                        borderRadius: 8,
                        color: 'var(--hm-text)',
                      }}
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center justify-between gap-3 pt-1">
                    <p
                      className="hm-mono text-[10.5px] flex items-center gap-1.5"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      <Lock className="w-3 h-3" />
                      end-to-end encrypted · we reply within 24h
                    </p>
                    <button type="button" className="hm-btn-primary h-10 px-5 text-[13px] gap-1.5">
                      Send message <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
