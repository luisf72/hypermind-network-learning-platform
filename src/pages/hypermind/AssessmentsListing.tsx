import { useState } from 'react'
import {
  Search,
  ChevronDown,
  Clock,
  Users,
  ShieldCheck,
  Eye,
  Award,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Check,
  ChevronRight,
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
  GraduationCap,
  FileCheck,
  ListChecks,
  Trophy,
  Lock,
} from 'lucide-react'
import './_group.css'
import { Header } from './_shared/Header'
import { Footer } from './_shared/Footer'

type Cat = {
  name: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  count: number
}

const categories: Cat[] = [
  { name: 'All', icon: BookOpen, count: 354 },
  { name: 'Business', icon: Briefcase, count: 38 },
  { name: 'Languages', icon: Languages, count: 22 },
  { name: 'Photography', icon: Camera, count: 17 },
  { name: 'Music', icon: Music, count: 14 },
  { name: 'Finance', icon: DollarSign, count: 24 },
  { name: 'Arts & Crafts', icon: Brush, count: 19 },
  { name: 'Cooking', icon: ChefHat, count: 12 },
  { name: 'Health', icon: Heart, count: 21 },
  { name: 'Communication', icon: Mic, count: 16 },
  { name: 'Tech & Coding', icon: Code2, count: 62 },
  { name: 'Personal Growth', icon: Sparkles, count: 28 },
  { name: 'Academics', icon: GraduationCap, count: 81 },
]

type Status = 'available' | 'earned' | 'new' | 'locked'
type Featured = {
  id: string
  title: string
  category: string
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  description: string
  duration: string
  questions: number
  passRate: string
  holders: string
  badge?: 'Trending' | 'New'
}

const featured: Featured[] = [
  {
    id: 'f1',
    title: 'AI Engineer · Foundations',
    category: 'Tech & Coding',
    Icon: Code2,
    description:
      'Demonstrate working intuition for large language models, embeddings, retrieval, and prompt design.',
    duration: '60 min',
    questions: 50,
    passRate: '62%',
    holders: '1,240',
    badge: 'Trending',
  },
  {
    id: 'f2',
    title: 'Business Strategy · Pro',
    category: 'Business',
    Icon: Briefcase,
    description:
      'Show you can spot product opportunities, frame strategy, and build defensible competitive moats.',
    duration: '75 min',
    questions: 60,
    passRate: '58%',
    holders: '890',
  },
  {
    id: 'f3',
    title: 'Spanish Proficiency · B1',
    category: 'Languages',
    Icon: Languages,
    description:
      'Prove you can hold business conversations, write professional emails, and present in Spanish.',
    duration: '50 min',
    questions: 45,
    passRate: '71%',
    holders: '2,180',
    badge: 'New',
  },
]

type Assessment = {
  id: string
  title: string
  category: string
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  duration: string
  questions: number
  passRate: string
  holders: string
  status: Status
}

const assessments: Assessment[] = [
  {
    id: 'a1',
    title: 'Personal Finance Essentials',
    category: 'Finance',
    Icon: DollarSign,
    duration: '45 min',
    questions: 50,
    passRate: '78%',
    holders: '12.3k',
    status: 'earned',
  },
  {
    id: 'a2',
    title: 'Italian Cooking · Chef Basics',
    category: 'Cooking',
    Icon: ChefHat,
    duration: '40 min',
    questions: 40,
    passRate: '74%',
    holders: '3.8k',
    status: 'available',
  },
  {
    id: 'a3',
    title: 'Photography Fundamentals',
    category: 'Photography',
    Icon: Camera,
    duration: '50 min',
    questions: 50,
    passRate: '70%',
    holders: '5.2k',
    status: 'available',
  },
  {
    id: 'a4',
    title: 'Music Theory · Level I',
    category: 'Music',
    Icon: Music,
    duration: '55 min',
    questions: 55,
    passRate: '65%',
    holders: '4.1k',
    status: 'available',
  },
  {
    id: 'a5',
    title: 'Modern React Patterns',
    category: 'Tech & Coding',
    Icon: Code2,
    duration: '75 min',
    questions: 60,
    passRate: '68%',
    holders: '5.1k',
    status: 'new',
  },
  {
    id: 'a6',
    title: 'Mindful Communication',
    category: 'Communication',
    Icon: Mic,
    duration: '40 min',
    questions: 45,
    passRate: '72%',
    holders: '2.6k',
    status: 'available',
  },
  {
    id: 'a7',
    title: 'Yoga Teacher · RYT-200',
    category: 'Health',
    Icon: Heart,
    duration: '90 min',
    questions: 75,
    passRate: '54%',
    holders: '1.4k',
    status: 'locked',
  },
  {
    id: 'a8',
    title: 'Watercolor Techniques',
    category: 'Arts & Crafts',
    Icon: Brush,
    duration: '45 min',
    questions: 40,
    passRate: '76%',
    holders: '2.9k',
    status: 'available',
  },
]

const trustBadges = [
  { Icon: ShieldCheck, label: 'Independently verifiable' },
  { Icon: Eye, label: 'Live-proctored' },
  { Icon: Trophy, label: 'Recognized by 1,400 hiring partners' },
]

const stats = [
  { label: 'ASSESSMENTS', value: '354', sub: 'across 12 fields' },
  { label: 'ISSUED THIS WEEK', value: '2,418', sub: '+18% vs last week' },
  { label: 'AVERAGE PASS RATE', value: '67%', sub: 'across all subjects' },
  { label: 'HIRING PARTNERS', value: '1,400', sub: 'verifying credentials' },
]

export default function AssessmentsListing() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const isLight = theme === 'light'
  const toggleTheme = () => setTheme(isLight ? 'dark' : 'light')

  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div className={`hm-root ${isLight ? 'hm-light' : ''}`}>
      <Header active="assessments" theme={theme} onThemeToggle={toggleTheme} />

      <main className="mx-auto w-full max-w-[1280px] px-6 pt-14 pb-20">
        {/* ═════════ HERO ═════════ */}
        <section className="relative pb-10">
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full blur-[140px] opacity-40 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.30) 0%, transparent 65%)',
            }}
          />

          <div className="relative text-center max-w-3xl mx-auto">
            <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
              <ShieldCheck className="w-3 h-3" /> Assessments
            </span>
            <h1
              className="mt-3 text-[44px] md:text-[56px] font-semibold mb-4"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.035em', lineHeight: 1.0 }}
            >
              Prove what you know.{' '}
              <span
                className="hm-serif-italic"
                style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
              >
                Earn proof
              </span>{' '}
              worth showing.
            </h1>
            <p
              className="text-[15.5px] max-w-xl mx-auto mb-7"
              style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
            >
              354 proctored assessments across 12 disciplines. Pass once, share forever — every
              certificate is independently verifiable in a single click.
            </p>

            {/* Trust badges row */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-7">
              {trustBadges.map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5">
                  <b.Icon className="w-3.5 h-3.5" style={{ color: 'var(--hm-violet-2)' }} />
                  <span
                    className="hm-mono text-[11.5px]"
                    style={{ color: 'var(--hm-text)', letterSpacing: '0.02em' }}
                  >
                    {b.label}
                  </span>
                </span>
              ))}
            </div>

            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: 'var(--hm-text-dim)' }}
              />
              <input
                type="text"
                placeholder="Search assessments by title or skill…"
                className="w-full h-12 pl-11 pr-32 rounded-full text-[14px] outline-none transition-colors"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border-strong)',
                  color: 'var(--hm-text)',
                  boxShadow: '0 6px 24px -8px rgba(0,0,0,0.45)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hm-violet-2)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hm-border-strong)'
                  e.currentTarget.style.boxShadow = '0 6px 24px -8px rgba(0,0,0,0.45)'
                }}
              />
              <button
                type="button"
                className="hm-btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 text-[12.5px]"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {/* ═════════ Category pills ═════════ */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.name
              const Icon = cat.icon
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors"
                  style={{
                    background: isActive ? 'var(--hm-violet-soft)' : 'var(--hm-bg-card)',
                    color: isActive ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                    border: `1px solid ${isActive ? 'var(--hm-border-accent)' : 'var(--hm-border)'}`,
                  }}
                >
                  <Icon
                    className="w-3 h-3"
                    style={{ color: isActive ? 'var(--hm-violet-2)' : 'var(--hm-text-dim)' }}
                  />
                  {cat.name}
                  <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                    {cat.count.toLocaleString()}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* ═════════ Stats band ═════════ */}
        <section className="mb-16">
          <div className="hm-card p-1.5">
            <div
              className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x"
              style={{ borderColor: 'var(--hm-border)' }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="px-5 py-4"
                  style={{
                    borderColor: 'var(--hm-border)',
                    borderRightWidth: i < stats.length - 1 ? undefined : 0,
                  }}
                >
                  <p
                    className="hm-mono text-[10px] mb-1.5"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="text-[26px] font-semibold leading-none mb-1.5"
                    style={{ color: 'var(--hm-text)', letterSpacing: '-0.025em' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[11.5px]" style={{ color: 'var(--hm-text-muted)' }}>
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════ Featured certificates ═════════ */}
        <section className="mb-16">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="hm-eyebrow mb-2">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
              <h2
                className="mt-3 text-[28px] md:text-[32px] font-semibold"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.028em', lineHeight: 1.05 }}
              >
                Highlighted{' '}
                <span
                  className="hm-serif-italic"
                  style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
                >
                  certificates
                </span>{' '}
                this month
              </h2>
            </div>
            <a href="#" className="hm-link text-[12.5px] hidden md:inline-flex">
              View all 354 <ChevronRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((f) => (
              <FeaturedCard key={f.id} cert={f} />
            ))}
          </div>
        </section>

        {/* ═════════ All assessments ═════════ */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="hm-eyebrow mb-2">
                <ListChecks className="w-3 h-3" /> All assessments
              </span>
              <h2
                className="mt-3 text-[26px] md:text-[28px] font-semibold"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.024em', lineHeight: 1.05 }}
              >
                Browse the full{' '}
                <span
                  className="hm-serif-italic"
                  style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
                >
                  catalog
                </span>
              </h2>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-[12.5px] font-medium transition-colors shrink-0"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
              }}
            >
              <span style={{ color: 'var(--hm-text-dim)' }}>Sort:</span> Most popular
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {assessments.map((a) => (
              <AssessmentCard key={a.id} assessment={a} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-dim)',
              }}
              aria-label="Previous page"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <div
              className="flex items-center gap-0.5 p-1 rounded-full"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  className="h-7 w-7 rounded-full hm-mono text-[11.5px] font-semibold flex items-center justify-center transition-colors"
                  style={{
                    background: n === 1 ? 'var(--hm-violet-2)' : 'transparent',
                    color: n === 1 ? '#fff' : 'var(--hm-text-muted)',
                  }}
                >
                  {n}
                </button>
              ))}
              <span
                className="hm-mono text-[11.5px] px-1.5"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                ···
              </span>
              <button
                type="button"
                className="h-7 w-7 rounded-full hm-mono text-[11.5px] flex items-center justify-center"
                style={{ color: 'var(--hm-text-muted)' }}
              >
                45
              </button>
            </div>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border-accent)',
                color: 'var(--hm-text)',
              }}
              aria-label="Next page"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

/* ── Featured card (large, descriptive) ──────────────────────────────── */

function FeaturedCard({ cert }: { cert: Featured }) {
  const Icon = cert.Icon

  return (
    <a
      href="#"
      className="hm-card hm-card-hover group flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Cover */}
      <div
        className="relative h-40 w-full overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(139, 92, 246, 0.04) 100%)',
          borderBottom: '1px solid var(--hm-border)',
        }}
      >
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(167, 139, 250, 0.18) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          <span
            className="hm-mono inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-semibold uppercase tracking-wider"
            style={{
              background: 'rgba(11, 12, 30, 0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: 'var(--hm-text)',
              border: '1px solid var(--hm-border-strong)',
              letterSpacing: '0.08em',
            }}
          >
            <Icon className="w-2.5 h-2.5" style={{ color: 'var(--hm-violet-2)' }} />
            {cert.category}
          </span>
          {cert.badge && (
            <span
              className="hm-mono px-1.5 py-0.5 rounded-full text-[9.5px] font-semibold uppercase tracking-wider"
              style={{
                background: 'var(--hm-amber-soft)',
                color: 'var(--hm-amber)',
                border: '1px solid rgba(244,178,108,0.28)',
                letterSpacing: '0.08em',
              }}
            >
              {cert.badge}
            </span>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-2xl"
            style={{
              background: 'var(--hm-violet-soft)',
              border: '1px solid var(--hm-border-accent)',
              boxShadow: '0 10px 32px -10px rgba(139, 92, 246, 0.45)',
            }}
          >
            <Icon className="w-7 h-7" style={{ color: 'var(--hm-violet-2)' }} />
          </div>
        </div>

        <div className="absolute bottom-3 right-3 z-10">
          <span
            className="hm-mono inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-semibold"
            style={{
              background: 'rgba(11, 12, 30, 0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: 'var(--hm-violet-2)',
              border: '1px solid var(--hm-border-accent)',
              letterSpacing: '0.06em',
            }}
          >
            <ShieldCheck className="w-2.5 h-2.5" />
            VERIFIABLE
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-[16.5px] font-semibold leading-snug mb-2"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.016em' }}
        >
          {cert.title}
        </h3>
        <p
          className="text-[12.5px] mb-4 line-clamp-2 flex-1"
          style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
        >
          {cert.description}
        </p>

        {/* Mini stats grid */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          <Mini label="DURATION" value={cert.duration} />
          <Mini label="QS" value={String(cert.questions)} />
          <Mini label="PASS" value={cert.passRate} />
          <Mini label="HOLDERS" value={cert.holders} />
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-2 pt-4"
          style={{ borderTop: '1px solid var(--hm-border)' }}
        >
          <span className="hm-btn-primary h-9 flex-1 text-[12.5px] gap-1.5">
            <FileCheck className="w-3.5 h-3.5" /> Begin assessment
          </span>
          <span className="hm-btn-ghost h-9 px-3 text-[12px]">Details</span>
        </div>
      </div>
    </a>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p
        className="hm-mono text-[9px] mb-0.5"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
      >
        {label}
      </p>
      <p className="hm-mono text-[12px] font-semibold" style={{ color: 'var(--hm-text)' }}>
        {value}
      </p>
    </div>
  )
}

/* ── Compact assessment card (4-column grid) ─────────────────────────── */

function AssessmentCard({ assessment }: { assessment: Assessment }) {
  const Icon = assessment.Icon
  const isLocked = assessment.status === 'locked'

  return (
    <a
      href="#"
      className={`hm-card ${isLocked ? '' : 'hm-card-hover'} group flex flex-col overflow-hidden`}
      style={{ opacity: isLocked ? 0.6 : 1 }}
    >
      {/* Cover */}
      <div
        className="relative h-28 w-full overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(139, 92, 246, 0.04) 100%)',
          borderBottom: '1px solid var(--hm-border)',
        }}
      >
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(167, 139, 250, 0.18) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />

        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2 z-10">
          <span
            className="hm-mono inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase"
            style={{
              background: 'rgba(11, 12, 30, 0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: 'var(--hm-text)',
              border: '1px solid var(--hm-border-strong)',
              letterSpacing: '0.06em',
            }}
          >
            <Icon className="w-2.5 h-2.5" style={{ color: 'var(--hm-violet-2)' }} />
            {assessment.category}
          </span>
          <StatusPill status={assessment.status} />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl"
            style={{
              background: 'var(--hm-violet-soft)',
              border: '1px solid var(--hm-border-accent)',
              boxShadow: '0 6px 22px -8px rgba(139, 92, 246, 0.40)',
            }}
          >
            <Icon className="w-5 h-5" style={{ color: 'var(--hm-violet-2)' }} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h4
          className="text-[13.5px] font-semibold leading-snug mb-2 line-clamp-2"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.012em', minHeight: 36 }}
        >
          {assessment.title}
        </h4>

        <div
          className="flex flex-wrap items-center gap-x-2.5 gap-y-1 hm-mono text-[10px] mb-3"
          style={{ color: 'var(--hm-text-dim)' }}
        >
          <span className="inline-flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" /> {assessment.duration}
          </span>
          <span style={{ color: 'var(--hm-border-strong)' }}>·</span>
          <span>{assessment.questions}q</span>
          <span style={{ color: 'var(--hm-border-strong)' }}>·</span>
          <span className="inline-flex items-center gap-1">
            <Award className="w-2.5 h-2.5" /> {assessment.passRate}
          </span>
        </div>

        <div
          className="mt-auto flex items-center justify-between gap-2 pt-3"
          style={{ borderTop: '1px solid var(--hm-border)' }}
        >
          <span
            className="hm-mono text-[10.5px] inline-flex items-center gap-1"
            style={{ color: 'var(--hm-text-dim)' }}
          >
            <Users className="w-2.5 h-2.5" /> {assessment.holders}
          </span>
          <span
            className="hm-mono text-[11px] inline-flex items-center gap-1 font-medium"
            style={{
              color: isLocked ? 'var(--hm-text-dim)' : 'var(--hm-violet-2)',
            }}
          >
            {isLocked ? (
              <>
                Locked <Lock className="w-3 h-3" />
              </>
            ) : assessment.status === 'earned' ? (
              <>
                View cert <ChevronRight className="w-3 h-3" />
              </>
            ) : (
              <>
                Begin <ChevronRight className="w-3 h-3" />
              </>
            )}
          </span>
        </div>
      </div>
    </a>
  )
}

function StatusPill({ status }: { status: Status }) {
  if (status === 'available') return null

  const config: Record<
    Exclude<Status, 'available'>,
    { bg: string; color: string; border: string; label: string; Icon: typeof Check }
  > = {
    earned: {
      bg: 'var(--hm-violet-soft)',
      color: 'var(--hm-violet-2)',
      border: 'var(--hm-border-accent)',
      label: 'EARNED',
      Icon: Check,
    },
    new: {
      bg: 'var(--hm-amber-soft)',
      color: 'var(--hm-amber)',
      border: 'rgba(244,178,108,0.28)',
      label: 'NEW',
      Icon: Sparkles,
    },
    locked: {
      bg: 'rgba(11, 12, 30, 0.65)',
      color: 'var(--hm-text-dim)',
      border: 'var(--hm-border-strong)',
      label: 'LOCKED',
      Icon: Lock,
    },
  }

  const c = config[status]
  const Icon = c.Icon

  return (
    <span
      className="hm-mono inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase"
      style={{
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        letterSpacing: '0.08em',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <Icon className="w-2.5 h-2.5" strokeWidth={3} />
      {c.label}
    </span>
  )
}
