import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  FileCheck,
  ListChecks,
  Trophy,
  Lock,
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
} from 'lucide-react'
import StudentShell, { VIOLET } from './StudentShell'

const CATEGORIES = [
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

const TRUST_BADGES = [
  { Icon: ShieldCheck, label: 'Independently verifiable' },
  { Icon: Eye, label: 'Live-proctored' },
  { Icon: Trophy, label: 'Recognized by 1,400 hiring partners' },
]

const STATS = [
  { label: 'ASSESSMENTS', value: '354', sub: 'across 12 fields' },
  { label: 'ISSUED THIS WEEK', value: '2,418', sub: '+18% vs last week' },
  { label: 'AVERAGE PASS RATE', value: '67%', sub: 'across all subjects' },
  { label: 'HIRING PARTNERS', value: '1,400', sub: 'verifying credentials' },
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

const FEATURED: Featured[] = [
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

const ASSESSMENTS: Assessment[] = [
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

function FeaturedCard({ cert }: { cert: Featured }) {
  const { t } = useTranslation()
  const Icon = cert.Icon
  return (
    <Link
      to={`/student/assessments/${cert.id}`}
      className="hm-card hm-card-hover group flex flex-col overflow-hidden cursor-pointer"
      style={{ textDecoration: 'none' }}
    >
      {/* Cover */}
      <div
        className="relative h-40 w-full overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.04) 100%)',
          borderBottom: '1px solid var(--hm-border)',
        }}
      >
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(167,139,250,0.18) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          <span
            className="hm-mono inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-semibold uppercase tracking-wider"
            style={{
              background: 'rgba(11,12,30,0.65)',
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
              boxShadow: '0 10px 32px -10px rgba(139,92,246,0.45)',
            }}
          >
            <Icon className="w-7 h-7" style={{ color: 'var(--hm-violet-2)' }} />
          </div>
        </div>

        <div className="absolute bottom-3 right-3 z-10">
          <span
            className="hm-mono inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-semibold"
            style={{
              background: 'rgba(11,12,30,0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: 'var(--hm-violet-2)',
              border: '1px solid var(--hm-border-accent)',
              letterSpacing: '0.06em',
            }}
          >
            <ShieldCheck className="w-2.5 h-2.5" />
            {t('studentShell.assessVerifiable')}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-[15.5px] font-semibold leading-snug mb-2"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.015em' }}
        >
          {cert.title}
        </h3>
        <p
          className="text-[12.5px] mb-4 line-clamp-2 flex-1"
          style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
        >
          {cert.description}
        </p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <Mini label="DURATION" value={cert.duration} />
          <Mini label="QS" value={String(cert.questions)} />
          <Mini label="PASS" value={cert.passRate} />
          <Mini label="HOLDERS" value={cert.holders} />
        </div>
        <div
          className="flex items-center gap-2 pt-3"
          style={{ borderTop: '1px solid var(--hm-border)' }}
        >
          <span className="hm-btn-primary h-9 flex-1 text-[12.5px] gap-1.5 cursor-pointer">
            <FileCheck className="w-3.5 h-3.5" /> {t('studentShell.assessBeginAssessment')}
          </span>
          <span className="hm-btn-ghost h-9 px-3 text-[12px] cursor-pointer">
            {t('studentShell.assessDetails')}
          </span>
        </div>
      </div>
    </Link>
  )
}

function AssessmentCard({ assessment }: { assessment: Assessment }) {
  const { t } = useTranslation()
  const Icon = assessment.Icon
  const isLocked = assessment.status === 'locked'
  const isEarned = assessment.status === 'earned'
  const isNew = assessment.status === 'new'

  return (
    <Link
      to={isLocked ? '#' : `/student/assessments/${assessment.id}`}
      className={`hm-card ${isLocked ? '' : 'hm-card-hover'} group flex flex-col overflow-hidden`}
      style={{
        opacity: isLocked ? 0.6 : 1,
        textDecoration: 'none',
        pointerEvents: isLocked ? 'none' : 'auto',
      }}
    >
      {/* Cover */}
      <div
        className="relative h-28 w-full overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.04) 100%)',
          borderBottom: '1px solid var(--hm-border)',
        }}
      >
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(167,139,250,0.18) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />

        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2 z-10">
          <span
            className="hm-mono inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase"
            style={{
              background: 'rgba(11,12,30,0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: 'var(--hm-text)',
              border: '1px solid var(--hm-border-strong)',
              letterSpacing: '0.08em',
            }}
          >
            <Icon className="w-2.5 h-2.5" style={{ color: 'var(--hm-violet-2)' }} />
            {assessment.category}
          </span>

          {/* Status badge */}
          {isEarned && (
            <span
              className="hm-mono px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase"
              style={{
                background: 'rgba(94,230,168,0.18)',
                color: '#5EE6A8',
                border: '1px solid rgba(94,230,168,0.30)',
                letterSpacing: '0.08em',
              }}
            >
              {t('studentShell.assessEarned')}
            </span>
          )}
          {isNew && (
            <span
              className="hm-mono px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase"
              style={{
                background: 'var(--hm-amber-soft)',
                color: 'var(--hm-amber)',
                border: '1px solid rgba(244,178,108,0.28)',
                letterSpacing: '0.08em',
              }}
            >
              {t('studentShell.assessNew')}
            </span>
          )}
          {isLocked && <Lock className="w-3.5 h-3.5" style={{ color: 'var(--hm-text-dim)' }} />}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl"
            style={{
              background: isEarned ? 'rgba(94,230,168,0.18)' : 'var(--hm-violet-soft)',
              border: `1px solid ${isEarned ? 'rgba(94,230,168,0.35)' : 'var(--hm-border-accent)'}`,
            }}
          >
            {isEarned ? (
              <Award className="w-5 h-5" style={{ color: '#5EE6A8' }} />
            ) : (
              <Icon className="w-5 h-5" style={{ color: 'var(--hm-violet-2)' }} />
            )}
          </div>
        </div>

        {isEarned && (
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <span
              className="hm-mono inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold"
              style={{
                background: 'rgba(11,12,30,0.65)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                color: '#5EE6A8',
                border: '1px solid rgba(94,230,168,0.30)',
                letterSpacing: '0.06em',
              }}
            >
              <ShieldCheck className="w-2.5 h-2.5" />
              {t('studentShell.assessVerifiable')}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-[13px] font-semibold leading-snug mb-3 flex-1"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.012em' }}
        >
          {assessment.title}
        </h3>
        <div className="grid grid-cols-3 gap-1.5 mb-4">
          <Mini label="DURATION" value={assessment.duration} />
          <Mini label="QUESTIONS" value={String(assessment.questions)} />
          <Mini label="PASS RATE" value={assessment.passRate} />
        </div>
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid var(--hm-border)' }}
        >
          <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
            <Users className="w-3 h-3 inline mr-1" style={{ color: 'var(--hm-text-dim)' }} />
            {t('studentShell.assessHolders', {
              count: Number(String(assessment.holders).replace(/[^0-9]/g, '')) || 0,
            })}
          </span>
          {isLocked ? (
            <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
              {t('studentShell.assessLocked')}
            </span>
          ) : isEarned ? (
            <span className="hm-mono text-[11px] font-semibold" style={{ color: '#5EE6A8' }}>
              {t('studentShell.assessViewCert')}
            </span>
          ) : (
            <span className="hm-btn-primary h-7 px-3 text-[11.5px] gap-1 cursor-pointer">
              <FileCheck className="w-3 h-3" /> {t('studentShell.assessStart')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function StudentAssessments() {
  const [activeCat, setActiveCat] = useState('All')

  return (
    <StudentShell activeTab="assessments">
      {/* ── Hero ── */}
      <section className="relative pb-10 pt-2">
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full blur-[120px] opacity-35 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.30) 0%, transparent 65%)',
          }}
        />
        <div className="relative text-center max-w-2xl mx-auto">
          <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
            <ShieldCheck className="w-3 h-3" /> Assessments
          </span>
          <h1
            className="mt-3 text-[38px] font-semibold mb-3"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.032em', lineHeight: 1.05 }}
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
            className="text-[14.5px] max-w-lg mx-auto mb-6"
            style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
          >
            354 proctored assessments across 12 disciplines. Pass once, share forever — every
            certificate is independently verifiable in a single click.
          </p>
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-6">
            {TRUST_BADGES.map((b) => (
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
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'var(--hm-text-dim)' }}
            />
            <input
              type="text"
              placeholder="Search assessments by title or skill…"
              className="w-full h-11 pl-11 pr-28 rounded-full text-[13.5px] outline-none transition-colors"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border-strong)',
                color: 'var(--hm-text)',
                boxShadow: '0 6px 20px -8px rgba(0,0,0,0.4)',
              }}
            />
            <button
              type="button"
              className="hm-btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-4 text-[12px]"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── Category pills ── */}
      <section className="mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.name
            const Icon = cat.icon
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setActiveCat(cat.name)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors"
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
                <span className="hm-mono text-[9.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                  {cat.count.toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="mb-14">
        <div className="hm-card p-1.5">
          <div
            className="grid grid-cols-2 sm:grid-cols-4 divide-x"
            style={{ borderColor: 'var(--hm-border)' }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="px-5 py-4" style={{ borderColor: 'var(--hm-border)' }}>
                <p
                  className="hm-mono text-[9.5px] mb-1.5"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
                >
                  {s.label}
                </p>
                <p
                  className="text-[24px] font-semibold leading-none mb-1.5"
                  style={{ color: 'var(--hm-text)', letterSpacing: '-0.025em' }}
                >
                  {s.value}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--hm-text-muted)' }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured certificates ── */}
      <section className="mb-14">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <span className="hm-eyebrow mb-2">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
            <h2
              className="mt-3 text-[26px] font-semibold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.026em', lineHeight: 1.05 }}
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
          <a href="#" className="hm-link text-[12.5px] hidden md:inline-flex items-center gap-1">
            View all 354 <ChevronRight className="w-3 h-3" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED.map((f) => (
            <FeaturedCard key={f.id} cert={f} />
          ))}
        </div>
      </section>

      {/* ── All assessments ── */}
      <section>
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <span className="hm-eyebrow mb-2">
              <ListChecks className="w-3 h-3" /> All assessments
            </span>
            <h2
              className="mt-3 text-[24px] font-semibold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.022em', lineHeight: 1.05 }}
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
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-[12.5px] font-medium shrink-0 transition-colors"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ASSESSMENTS.map((a) => (
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
            <span className="hm-mono text-[11.5px] px-1.5" style={{ color: 'var(--hm-text-dim)' }}>
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
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </StudentShell>
  )
}
