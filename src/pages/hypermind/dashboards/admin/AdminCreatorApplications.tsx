import { useState } from 'react'
import {
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  ExternalLink,
  Link2,
  Youtube,
  Linkedin,
  Globe,
  BookOpen,
  Check,
  X,
  ChevronDown,
  Search,
  Filter,
  Sparkles,
} from 'lucide-react'
import AdminShell from '../_shared/AdminShell'

const ACCENT = '#F4636E'
const GREEN = '#5EE6A8'
const GREEN_SOFT = 'rgba(94,230,168,0.12)'
const AMBER = '#F4B26C'
const AMBER_SOFT = 'rgba(244,178,108,0.14)'
const VIOLET = '#7C5CF6'
const VIOLET_SOFT = 'rgba(124,92,246,0.12)'
const RED_SOFT = 'rgba(244,99,110,0.10)'

/* ── Mock application data ────────────────────────────────────────── */
type AppStatus = 'pending' | 'accepted' | 'rejected'
interface Application {
  id: number
  name: string
  initials: string
  avatarBg: string
  email: string
  date: string
  status: AppStatus
  topics: string[]
  experience: string
  bio: string
  portfolio?: string
  youtube?: string
  linkedin?: string
  site?: string
  instagram?: string
  courses_planned: number
  sample_title: string
}

const APPS: Application[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    initials: 'PS',
    avatarBg: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
    email: 'priya.sharma@gmail.com',
    date: 'May 2, 2026',
    status: 'pending',
    topics: ['Music', 'Guitar', 'Music Theory'],
    experience: '6 yrs',
    bio: 'Professional guitarist and Berklee-trained music teacher. I have 6 years of private instruction experience and a YouTube channel with 28k subscribers. I want to bring structured guitar learning to HyperMind — from absolute beginners to advanced fingerstyle.',
    youtube: 'youtube.com/@priya.guitar',
    linkedin: 'linkedin.com/in/priyasharma',
    courses_planned: 3,
    sample_title: 'Acoustic Guitar: Zero to Fingerstyle',
  },
  {
    id: 2,
    name: 'Marcus Delgado',
    initials: 'MD',
    avatarBg: 'linear-gradient(135deg,#f4b26c,#d97706)',
    email: 'marcus.d@outlook.com',
    date: 'May 1, 2026',
    status: 'pending',
    topics: ['Finance', 'Investing', 'Personal Finance'],
    experience: '9 yrs',
    bio: 'CFA charterholder with 9 years in portfolio management at Morgan Stanley. Left finance to focus on financial education. My goal is to demystify investing for everyday people — building practical, exam-ready courses that map to real market scenarios.',
    linkedin: 'linkedin.com/in/marcusdelgado',
    site: 'marcusfinance.com',
    courses_planned: 4,
    sample_title: 'Personal Finance Masterclass 2026',
  },
  {
    id: 3,
    name: 'Li Wei',
    initials: 'LW',
    avatarBg: 'linear-gradient(135deg,#34d399,#047857)',
    email: 'liwei.dev@proton.me',
    date: 'Apr 30, 2026',
    status: 'accepted',
    topics: ['Tech & Coding', 'Python', 'Machine Learning'],
    experience: '11 yrs',
    bio: 'Senior ML engineer at Stripe. Open-source contributor. I want to teach practical ML — not textbook math but production patterns, real datasets, and portfolio projects that help learners land jobs.',
    youtube: 'youtube.com/@liwei.ml',
    site: 'liwei.dev',
    courses_planned: 5,
    sample_title: 'Python for Machine Learning Engineers',
  },
  {
    id: 4,
    name: 'Aisha Okafor',
    initials: 'AO',
    avatarBg: 'linear-gradient(135deg,#f472b6,#be185d)',
    email: 'aisha.ok@creativestudio.ng',
    date: 'Apr 29, 2026',
    status: 'accepted',
    topics: ['Arts & Crafts', 'Photography', 'Lightroom'],
    experience: '8 yrs',
    bio: 'Award-winning portrait and travel photographer. Worked with Vogue, BBC and National Geographic. I want to teach the full photographic workflow — from composition fundamentals to advanced post-processing.',
    youtube: 'youtube.com/@aishaphotos',
    instagram: 'instagram.com/aisha.captures',
    courses_planned: 2,
    sample_title: 'Portrait Photography: Light & Shadow',
  },
  {
    id: 5,
    name: 'Tomás Herrera',
    initials: 'TH',
    avatarBg: 'linear-gradient(135deg,#60a5fa,#1d4ed8)',
    email: 'tomas.h@idiomas.mx',
    date: 'Apr 28, 2026',
    status: 'pending',
    topics: ['Languages', 'Spanish', 'Business Spanish'],
    experience: '14 yrs',
    bio: 'Native Spanish speaker and certified DELE examiner with 14 years of experience teaching Spanish at university level in Mexico City. Want to publish structured Spanish courses for English speakers — A1 through C2.',
    linkedin: 'linkedin.com/in/tomasherrera',
    site: 'tomasidiomas.com',
    courses_planned: 6,
    sample_title: 'Spanish A1–A2: Complete Beginner Course',
  },
  {
    id: 6,
    name: 'Mia Tanaka',
    initials: 'MT',
    avatarBg: 'linear-gradient(135deg,#c4b5fd,#7c3aed)',
    email: 'mia.tanaka@cookwithmia.jp',
    date: 'Apr 27, 2026',
    status: 'rejected',
    topics: ['Cooking', 'Japanese Cuisine'],
    experience: '3 yrs',
    bio: 'Home cook and food blogger based in Tokyo. My recipes have been featured in several lifestyle magazines. Looking to share authentic Japanese home cooking with a global audience.',
    site: 'cookwithmia.jp',
    courses_planned: 1,
    sample_title: 'Japanese Home Cooking Essentials',
  },
  {
    id: 7,
    name: 'Kwame Asante',
    initials: 'KA',
    avatarBg: 'linear-gradient(135deg,#fbbf24,#92400e)',
    email: 'k.asante@fitcoach.gh',
    date: 'Apr 25, 2026',
    status: 'pending',
    topics: ['Health & Fitness', 'Strength Training', 'Nutrition'],
    experience: '7 yrs',
    bio: 'NSCA-certified strength coach and sports nutritionist. Built a 50k-strong Instagram community around evidence-based fitness. Want to create structured 12-week programs on HyperMind with built-in assessments.',
    linkedin: 'linkedin.com/in/kwameasante',
    courses_planned: 3,
    sample_title: 'Strength Foundations: 12-Week Program',
  },
  {
    id: 8,
    name: 'Elena Voronova',
    initials: 'EV',
    avatarBg: 'linear-gradient(135deg,#5bc8c5,#0e7490)',
    email: 'elena.v@designcraft.ru',
    date: 'Apr 23, 2026',
    status: 'accepted',
    topics: ['Arts & Crafts', 'UX Design', 'Figma'],
    experience: '10 yrs',
    bio: 'Senior product designer at Figma. Previously at Notion and Dropbox. I want to teach design systems, component-driven thinking, and the full UX process using real project case studies.',
    linkedin: 'linkedin.com/in/elenavoronova',
    site: 'designcraft.studio',
    courses_planned: 4,
    sample_title: 'Design Systems: From Components to Product',
  },
]

const STATUS_META: Record<AppStatus, { label: string; color: string; soft: string; Icon: any }> = {
  pending: { label: 'Pending', color: AMBER, soft: AMBER_SOFT, Icon: Clock },
  accepted: { label: 'Accepted', color: GREEN, soft: GREEN_SOFT, Icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: ACCENT, soft: RED_SOFT, Icon: XCircle },
}

type FilterTab = 'all' | AppStatus

/* ── Detail Modal ─────────────────────────────────────────────────── */
function ApplicationModal({
  app,
  onClose,
  onAccept,
  onReject,
}: {
  app: Application
  onClose: () => void
  onAccept: (id: number) => void
  onReject: (id: number) => void
}) {
  const st = STATUS_META[app.status]
  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(0,0,0,0.62)',
          backdropFilter: 'blur(4px)',
          border: 'none',
          cursor: 'default',
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Creator application"
        className="overflow-hidden rounded-2xl"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: 210,
          width: 680,
          maxWidth: '95vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--hm-bg-card)',
          border: '1px solid var(--hm-border-strong)',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(124,92,246,0.08)',
        }}
      >
        {/* Header */}
        <div
          className="relative flex items-start gap-4 p-6 pb-5"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[16px] font-bold text-white"
            style={{ background: app.avatarBg, boxShadow: '0 4px 16px -4px rgba(0,0,0,0.4)' }}
          >
            {app.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2
                className="text-[18px] font-semibold"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.018em' }}
              >
                {app.name}
              </h2>
              <span
                className="hm-mono inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ background: st.soft, color: st.color, border: `1px solid ${st.color}44` }}
              >
                <st.Icon className="h-2.5 w-2.5" />
                {st.label.toUpperCase()}
              </span>
            </div>
            <p className="text-[12.5px]" style={{ color: 'var(--hm-text-dim)' }}>
              {app.email}
            </p>
            <p className="hm-mono text-[11px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
              Applied {app.date} · {app.experience} teaching experience
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
            style={{
              background: 'var(--hm-bg-card-2)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-muted)',
            }}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Topics */}
          <div>
            <p
              className="hm-mono text-[10px] font-semibold mb-2"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              TEACHING TOPICS
            </p>
            <div className="flex flex-wrap gap-1.5">
              {app.topics.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-[12px] font-medium"
                  style={{
                    background: VIOLET_SOFT,
                    color: VIOLET,
                    border: `1px solid ${VIOLET}30`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <p
              className="hm-mono text-[10px] font-semibold mb-2"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              APPLICANT BIO
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--hm-text-muted)' }}>
              {app.bio}
            </p>
          </div>

          {/* Sample content + plan */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-xl p-4"
              style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
            >
              <p
                className="hm-mono text-[10px] font-semibold mb-1.5"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
              >
                SAMPLE COURSE TITLE
              </p>
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 shrink-0 mt-0.5" style={{ color: AMBER }} />
                <p
                  className="text-[13px] font-semibold leading-tight"
                  style={{ color: 'var(--hm-text)' }}
                >
                  {app.sample_title}
                </p>
              </div>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
            >
              <p
                className="hm-mono text-[10px] font-semibold mb-1.5"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
              >
                PLANNED COURSES
              </p>
              <div className="flex items-baseline gap-1">
                <span
                  className="hm-mono text-[28px] font-bold leading-none"
                  style={{ color: 'var(--hm-text)' }}
                >
                  {app.courses_planned}
                </span>
                <span className="text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
                  courses
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          {(app.youtube || app.linkedin || app.site || (app as any).instagram) && (
            <div>
              <p
                className="hm-mono text-[10px] font-semibold mb-2"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
              >
                LINKS & PORTFOLIO
              </p>
              <div className="flex flex-wrap gap-2">
                {app.youtube && (
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium"
                    style={{
                      background: 'rgba(255,0,0,0.08)',
                      color: '#FF4444',
                      border: '1px solid rgba(255,68,68,0.22)',
                    }}
                  >
                    <Youtube className="h-3.5 w-3.5" /> {app.youtube}
                  </a>
                )}
                {app.linkedin && (
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium"
                    style={{
                      background: 'rgba(10,102,194,0.08)',
                      color: '#0A66C2',
                      border: '1px solid rgba(10,102,194,0.22)',
                    }}
                  >
                    <Linkedin className="h-3.5 w-3.5" /> {app.linkedin}
                  </a>
                )}
                {app.site && (
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium"
                    style={{
                      background: VIOLET_SOFT,
                      color: VIOLET,
                      border: `1px solid ${VIOLET}30`,
                    }}
                  >
                    <Globe className="h-3.5 w-3.5" /> {app.site}
                  </a>
                )}
                {(app as any).instagram && (
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium"
                    style={{
                      background: 'rgba(193,53,132,0.08)',
                      color: '#C13584',
                      border: '1px solid rgba(193,53,132,0.22)',
                    }}
                  >
                    <Link2 className="h-3.5 w-3.5" /> {(app as any).instagram}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div
          className="flex items-center gap-3 px-6 py-4"
          style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-[13px] font-medium"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-muted)',
            }}
          >
            Close
          </button>
          <div className="flex-1" />
          {app.status !== 'rejected' && (
            <button
              type="button"
              onClick={() => onReject(app.id)}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-[13px] font-semibold"
              style={{ background: RED_SOFT, color: ACCENT, border: `1px solid ${ACCENT}40` }}
            >
              <X className="h-3.5 w-3.5" /> Reject application
            </button>
          )}
          {app.status !== 'accepted' && (
            <button
              type="button"
              onClick={() => onAccept(app.id)}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-[13px] font-semibold"
              style={{ background: GREEN_SOFT, color: GREEN, border: `1px solid ${GREEN}40` }}
            >
              <Check className="h-3.5 w-3.5" /> Accept as creator
            </button>
          )}
        </div>
      </div>
    </>
  )
}

/* ── 3-dot menu ───────────────────────────────────────────────────── */
function RowMenu({
  app,
  onView,
  onAccept,
  onReject,
}: {
  app: Application
  onView: () => void
  onAccept: () => void
  onReject: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center rounded-md"
        style={{
          background: open ? 'var(--hm-bg-card-2)' : 'transparent',
          border: open ? '1px solid var(--hm-border)' : '1px solid transparent',
          color: 'var(--hm-text-muted)',
        }}
      >
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-label="close"
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              background: 'transparent',
              border: 'none',
            }}
          />
          <div
            className="rounded-xl overflow-hidden"
            style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 4px)',
              zIndex: 60,
              width: 188,
              background: 'var(--hm-bg-card-2)',
              border: '1px solid var(--hm-border-strong)',
              boxShadow: '0 16px 40px -8px rgba(0,0,0,0.7)',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onView()
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] text-left"
              style={{ color: 'var(--hm-text)', borderBottom: '1px solid var(--hm-border)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--hm-bg-card)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <ExternalLink className="h-3.5 w-3.5" style={{ color: 'var(--hm-text-muted)' }} />
              View application
            </button>
            {app.status !== 'accepted' && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onAccept()
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] text-left"
                style={{
                  color: GREEN,
                  borderBottom: app.status !== 'rejected' ? '1px solid var(--hm-border)' : 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = GREEN_SOFT)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <Check className="h-3.5 w-3.5" /> Accept
              </button>
            )}
            {app.status !== 'rejected' && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onReject()
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] text-left"
                style={{ color: ACCENT }}
                onMouseEnter={(e) => (e.currentTarget.style.background = RED_SOFT)}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <X className="h-3.5 w-3.5" /> Reject
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

/* ── Main page ────────────────────────────────────────────────────── */
export default function AdminCreatorApplications() {
  const [apps, setApps] = useState<Application[]>(APPS)
  const [filter, setFilter] = useState<FilterTab>('all')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const accept = (id: number) =>
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'accepted' } : a)))
  const reject = (id: number) =>
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'rejected' } : a)))

  const counts = {
    all: apps.length,
    pending: apps.filter((a) => a.status === 'pending').length,
    accepted: apps.filter((a) => a.status === 'accepted').length,
    rejected: apps.filter((a) => a.status === 'rejected').length,
  }

  const visible = apps.filter((a) => {
    const matchFilter = filter === 'all' || a.status === filter
    const matchSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const selectedApp = apps.find((a) => a.id === selectedId)

  const TABS: { id: FilterTab; label: string; color?: string }[] = [
    { id: 'all', label: `All (${counts.all})` },
    { id: 'pending', label: `Pending (${counts.pending})`, color: AMBER },
    { id: 'accepted', label: `Accepted (${counts.accepted})`, color: GREEN },
    { id: 'rejected', label: `Rejected (${counts.rejected})`, color: ACCENT },
  ]

  return (
    <AdminShell activeId="creator-applications">
      {/* Page header */}
      <div className="mb-6">
        <p
          className="hm-mono text-[10.5px] mb-2"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
        >
          USERS
        </p>
        <h1
          className="text-[26px] font-semibold tracking-tight"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
        >
          Creator Applications
        </h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
          Review and action creator programme applications submitted by learners.
        </p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          {
            label: 'Total',
            value: counts.all,
            color: 'var(--hm-text)',
            soft: 'var(--hm-bg-card)',
            Icon: UserCheck,
          },
          { label: 'Pending', value: counts.pending, color: AMBER, soft: AMBER_SOFT, Icon: Clock },
          {
            label: 'Accepted',
            value: counts.accepted,
            color: GREEN,
            soft: GREEN_SOFT,
            Icon: CheckCircle2,
          },
          {
            label: 'Rejected',
            value: counts.rejected,
            color: ACCENT,
            soft: RED_SOFT,
            Icon: XCircle,
          },
        ].map((k) => (
          <div
            key={k.label}
            className="rounded-xl p-4 flex items-center gap-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
              style={{ background: k.soft, color: k.color }}
            >
              <k.Icon className="h-4 w-4" />
            </span>
            <div>
              <p
                className="hm-mono text-[22px] font-bold leading-none"
                style={{ color: 'var(--hm-text)' }}
              >
                {k.value}
              </p>
              <p
                className="hm-mono text-[10px] mt-0.5"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
              >
                {k.label.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        {/* Tabs + search */}
        <div
          className="flex items-center gap-3 px-5 py-3"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          {/* Tabs */}
          <div className="flex items-center gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilter(t.id)}
                className="h-7 px-3 rounded-md text-[12px] font-medium transition-all"
                style={{
                  background:
                    filter === t.id
                      ? t.color
                        ? `${t.color}18`
                        : 'var(--hm-bg-card-2)'
                      : 'transparent',
                  color: filter === t.id ? t.color || 'var(--hm-text)' : 'var(--hm-text-muted)',
                  border:
                    filter === t.id
                      ? `1px solid ${t.color ? t.color + '44' : 'var(--hm-border)'}`
                      : '1px solid transparent',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3"
              style={{ color: 'var(--hm-text-dim)' }}
            />
            <input
              type="text"
              placeholder="Search applicants…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 pl-7 pr-3 rounded-lg text-[12.5px] w-52"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left text-[12.5px]">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--hm-border)' }}>
              {['Applicant', 'Topics', 'Experience', 'Applied', 'Status', ''].map((h) => (
                <th
                  key={h}
                  className="hm-mono px-5 py-2.5 text-[10px] font-semibold"
                  style={{
                    color: 'var(--hm-text-dim)',
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((app, idx) => {
              const st = STATUS_META[app.status]
              return (
                <tr
                  key={app.id}
                  style={{
                    borderTop: idx === 0 ? 'none' : '1px solid var(--hm-border)',
                    color: 'var(--hm-text)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--hm-bg-card-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Applicant */}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{ background: app.avatarBg }}
                      >
                        {app.initials}
                      </div>
                      <div>
                        <p
                          className="font-semibold leading-tight"
                          style={{ color: 'var(--hm-text)' }}
                        >
                          {app.name}
                        </p>
                        <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                          {app.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Topics */}
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap gap-1">
                      {app.topics.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-full px-2 py-0.5 text-[10.5px] font-medium"
                          style={{
                            background: VIOLET_SOFT,
                            color: VIOLET,
                            border: `1px solid ${VIOLET}28`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {app.topics.length > 2 && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10.5px]"
                          style={{
                            background: 'var(--hm-bg-card-2)',
                            color: 'var(--hm-text-dim)',
                            border: '1px solid var(--hm-border)',
                          }}
                        >
                          +{app.topics.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Experience */}
                  <td className="px-5 py-3">
                    <span
                      className="hm-mono text-[11.5px] font-semibold"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {app.experience}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3">
                    <span className="text-[12px]" style={{ color: 'var(--hm-text-muted)' }}>
                      {app.date}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3">
                    <span
                      className="hm-mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                      style={{
                        background: st.soft,
                        color: st.color,
                        border: `1px solid ${st.color}40`,
                      }}
                    >
                      <st.Icon className="h-2.5 w-2.5" />
                      {st.label.toUpperCase()}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3 text-right">
                    <RowMenu
                      app={app}
                      onView={() => setSelectedId(app.id)}
                      onAccept={() => accept(app.id)}
                      onReject={() => reject(app.id)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Sparkles className="h-8 w-8" style={{ color: 'var(--hm-text-dim)' }} />
            <p className="text-[14px]" style={{ color: 'var(--hm-text-muted)' }}>
              No applications match this filter.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedApp && (
        <ApplicationModal
          app={selectedApp}
          onClose={() => setSelectedId(null)}
          onAccept={(id) => {
            accept(id)
            setSelectedId(null)
          }}
          onReject={(id) => {
            reject(id)
            setSelectedId(null)
          }}
        />
      )}
    </AdminShell>
  )
}
