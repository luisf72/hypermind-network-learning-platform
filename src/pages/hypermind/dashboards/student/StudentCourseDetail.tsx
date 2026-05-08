import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useThemeStore } from '@/stores/themeStore'
import {
  Star,
  Users,
  Clock,
  BookOpen,
  Play,
  CheckCircle2,
  ChevronDown,
  Award,
  Globe,
  BarChart3,
  Zap,
  Video,
  FileText,
  ListChecks,
  Coins,
  ShieldCheck,
  Radio,
  Infinity,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, AMBER, BLUE, GREEN } from './StudentShell'

const TEAL = '#5BC8C5'

const COURSE = {
  title: 'Watercolor Foundations',
  instructor: 'Sarah Lin',
  instructorBio: 'Painter & watercolor educator with 9 years of teaching. Former architect.',
  rating: 4.9,
  reviews: 744,
  enrolled: 4240,
  duration: '12h 30m',
  totalLessons: 42,
  lastUpdated: 'Mar 2026',
  language: 'English',
  shortDesc:
    'Learn the watercolor washes, color theory and brush control needed to paint confident botanical studies.',
  longDesc:
    "A six-module foundation in watercolor painting. Start by setting up a workable studio, learn how pigment, water and paper actually behave, then drill the four core washes until they're muscle memory. Finish with a full botanical study from life.",
  whatYouLearn: [
    'The four fundamental washes (flat, graded, variegated, wet-on-wet)',
    'Color mixing and pigment behaviour on wet paper',
    'Brush selection and mark-making techniques',
    'Basic botanical illustration and composition',
    'How to set up an efficient, affordable studio space',
    'Critique your own work and identify improvement areas',
  ],
}

const MODULES = [
  {
    id: 'm1',
    title: 'Studio Setup & Materials',
    lessons: [
      {
        id: 'l1',
        title: 'Welcome & course overview',
        type: 'video',
        dur: '4:30',
        free: true,
        done: true,
      },
      {
        id: 'l2',
        title: 'Choosing the right paper',
        type: 'video',
        dur: '8:15',
        free: true,
        done: true,
      },
      {
        id: 'l3',
        title: 'Brushes & pigments',
        type: 'video',
        dur: '10:40',
        free: false,
        done: true,
      },
      {
        id: 'l4',
        title: 'Setting up your workspace',
        type: 'video',
        dur: '6:20',
        free: false,
        done: false,
      },
    ],
  },
  {
    id: 'm2',
    title: 'Understanding Water & Pigment',
    lessons: [
      {
        id: 'l5',
        title: 'How water controls flow',
        type: 'video',
        dur: '12:10',
        free: false,
        done: false,
      },
      {
        id: 'l6',
        title: 'Pigment granulation & staining',
        type: 'video',
        dur: '9:45',
        free: false,
        done: false,
      },
      {
        id: 'l7',
        title: 'Lesson recap — reading',
        type: 'text',
        dur: '5 min',
        free: false,
        done: false,
      },
      {
        id: 'l8',
        title: 'Unit 2 knowledge check',
        type: 'quiz',
        dur: '10 min',
        free: false,
        done: false,
      },
    ],
  },
  {
    id: 'm3',
    title: 'The Four Core Washes',
    lessons: [
      {
        id: 'l9',
        title: 'Flat wash technique',
        type: 'video',
        dur: '14:00',
        free: false,
        done: false,
      },
      {
        id: 'l10',
        title: 'Graded wash technique',
        type: 'video',
        dur: '11:30',
        free: false,
        done: false,
      },
      {
        id: 'l11',
        title: 'Variegated & wet-on-wet',
        type: 'video',
        dur: '16:20',
        free: false,
        done: false,
      },
    ],
  },
  {
    id: 'm4',
    title: 'Color Mixing & Theory',
    lessons: [
      {
        id: 'l12',
        title: 'Primary & secondary mixing',
        type: 'video',
        dur: '13:00',
        free: false,
        done: false,
      },
      {
        id: 'l13',
        title: 'Warm vs cool palettes',
        type: 'video',
        dur: '9:15',
        free: false,
        done: false,
      },
      {
        id: 'l14',
        title: 'Mixing greens (the hard part)',
        type: 'video',
        dur: '11:45',
        free: false,
        done: false,
      },
    ],
  },
]

const REVIEWS = [
  {
    name: "Liam O'Brien",
    rating: 5,
    time: '2h ago',
    comment: "Best watercolor course I've found online. The close-up brush shots are incredible.",
  },
  {
    name: 'Aisha Rahman',
    rating: 4,
    time: '1d ago',
    comment:
      'Excellent pacing. Would love a few more pronunciation drills — oh wait, wrong course. 😄 Genuinely fantastic though.',
  },
  {
    name: 'Daniel Becker',
    rating: 5,
    time: '3d ago',
    comment: "Sarah's explanations of pigment behaviour finally made color mixing click for me.",
  },
]

const LESSON_ICON: Record<string, any> = { video: Video, text: FileText, quiz: ListChecks }

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5"
          style={{ color: AMBER, fill: i <= n ? AMBER : 'none' }}
        />
      ))}
    </span>
  )
}

/* ── Enrollment CTA card ── */
function EnrollCard({
  id,
  enrolled,
  onToggle,
  onEnroll,
  progress,
  totalDone,
  totalLessons,
}: {
  id: string
  enrolled: boolean
  onToggle: () => void
  onEnroll: () => void
  progress: number
  totalDone: number
  totalLessons: number
}) {
  const HMN_PRICE = 80
  const CRED_PRICE = 120
  const HMN_BAL = 2340
  const CRED_BAL = 180
  const hmnAfter = HMN_BAL - HMN_PRICE
  const credAfter = CRED_BAL - CRED_PRICE

  if (enrolled) {
    return (
      <div
        className="rounded-2xl p-5"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border-strong)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
            Your progress
          </span>
          <span className="hm-mono text-[13px] font-bold" style={{ color: VIOLET }}>
            {progress}%
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden mb-1.5"
          style={{ background: 'var(--hm-bg-card-2)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${VIOLET} 0%, #A78BFA 100%)`,
            }}
          />
        </div>
        <p className="text-[11px] mb-4" style={{ color: 'var(--hm-text-dim)' }}>
          {totalDone} of {totalLessons} lessons completed
        </p>
        <Link
          to={`/student/courses/${id}/learn`}
          className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl text-[14px] font-bold mb-2"
          style={{
            background: `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`,
            color: 'white',
            boxShadow: `0 8px 24px -8px ${VIOLET}66`,
            textDecoration: 'none',
          }}
        >
          <Play className="h-4 w-4 fill-white" /> Continue learning
        </Link>
        <Link
          to="/student/certificates"
          className="w-full inline-flex items-center justify-center gap-2 h-9 rounded-lg text-[13px] font-medium mb-3"
          style={{
            background: 'var(--hm-bg-card-2)',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text-muted)',
            textDecoration: 'none',
          }}
        >
          View certificate
        </Link>
        {/* demo toggle */}
        <button
          type="button"
          onClick={onToggle}
          className="w-full text-[11px] text-center"
          style={{ color: 'var(--hm-text-dim)' }}
        >
          ← Demo: view enrolment screen
        </button>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--hm-bg-card)', border: `1px solid ${VIOLET}30` }}
    >
      {/* Pricing header */}
      <div className="px-5 pt-4 pb-3" style={{ borderBottom: '1px solid var(--hm-border)' }}>
        <p
          className="hm-mono text-[9.5px] mb-2 font-bold"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          COURSE PRICE
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div
            className="rounded-xl px-3 py-2.5 text-center"
            style={{
              background: 'rgba(244,178,108,0.08)',
              border: '1px solid rgba(244,178,108,0.22)',
            }}
          >
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <Zap className="h-3.5 w-3.5" style={{ color: AMBER }} />
              <span
                className="hm-mono text-[20px] font-extrabold leading-none"
                style={{ color: AMBER }}
              >
                {HMN_PRICE}
              </span>
            </div>
            <p
              className="hm-mono text-[9px] font-bold tracking-wider"
              style={{ color: 'rgba(244,178,108,0.7)' }}
            >
              HMN TOKENS
            </p>
          </div>
          <div
            className="rounded-xl px-3 py-2.5 text-center"
            style={{
              background: 'rgba(91,200,197,0.08)',
              border: '1px solid rgba(91,200,197,0.22)',
            }}
          >
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <Coins className="h-3.5 w-3.5" style={{ color: TEAL }} />
              <span
                className="hm-mono text-[20px] font-extrabold leading-none"
                style={{ color: TEAL }}
              >
                {CRED_PRICE}
              </span>
            </div>
            <p
              className="hm-mono text-[9px] font-bold tracking-wider"
              style={{ color: 'rgba(91,200,197,0.7)' }}
            >
              CREDITS
            </p>
          </div>
        </div>
      </div>

      {/* Enroll buttons */}
      <div className="px-5 py-4 flex flex-col gap-3">
        {/* HMN button */}
        <button
          type="button"
          onClick={onEnroll}
          className="w-full flex items-center justify-between gap-2 h-12 px-4 rounded-xl text-[13.5px] font-bold"
          style={{
            background: `linear-gradient(135deg, ${AMBER}dd 0%, ${AMBER} 100%)`,
            color: '#1a1208',
            boxShadow: `0 8px 24px -8px ${AMBER}88`,
          }}
        >
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Enroll with HMN Tokens
          </span>
          <span className="hm-mono text-[12px] font-extrabold opacity-80">{HMN_PRICE} HMN</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px" style={{ background: 'var(--hm-border)' }} />
          <span
            className="hm-mono text-[10px] font-semibold"
            style={{ color: 'var(--hm-text-dim)' }}
          >
            OR
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--hm-border)' }} />
        </div>

        {/* Credits button */}
        <button
          type="button"
          onClick={onEnroll}
          className="w-full flex items-center justify-between gap-2 h-12 px-4 rounded-xl text-[13.5px] font-bold"
          style={{
            background: 'rgba(91,200,197,0.10)',
            color: TEAL,
            border: `1.5px solid ${TEAL}55`,
          }}
        >
          <span className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Enroll with Credits
          </span>
          <span className="hm-mono text-[12px] font-extrabold opacity-80">
            {CRED_PRICE} credits
          </span>
        </button>

        {/* Balance row */}
        <div
          className="rounded-xl px-3.5 py-2.5 flex flex-col gap-1.5"
          style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
        >
          <p
            className="hm-mono text-[9px] font-bold mb-0.5"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
          >
            YOUR BALANCE AFTER ENROLMENT
          </p>
          <div className="flex items-center justify-between">
            <span
              className="flex items-center gap-1.5 text-[12px]"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              <Zap className="h-3 w-3" style={{ color: AMBER }} /> HMN Tokens
            </span>
            <span className="hm-mono text-[12px] font-bold" style={{ color: AMBER }}>
              {HMN_BAL.toLocaleString()} → {hmnAfter.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span
              className="flex items-center gap-1.5 text-[12px]"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              <Coins className="h-3 w-3" style={{ color: TEAL }} /> Credits
            </span>
            <span className="hm-mono text-[12px] font-bold" style={{ color: TEAL }}>
              {CRED_BAL} → {credAfter}
            </span>
          </div>
        </div>

        {/* Free preview */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-1.5 h-9 rounded-lg text-[12.5px] font-medium"
          style={{
            background: 'transparent',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text-muted)',
          }}
        >
          <Play className="h-3.5 w-3.5 fill-current" style={{ color: GREEN }} />
          Preview 2 free lessons
        </button>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3 w-3" style={{ color: 'var(--hm-text-dim)' }} />
          <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
            Lifetime access · Certificate on completion
          </p>
        </div>
      </div>

      {/* demo toggle */}
      <div className="px-5 pb-3 -mt-1">
        <button
          type="button"
          onClick={onToggle}
          className="w-full text-[11px] text-center"
          style={{ color: 'var(--hm-text-dim)' }}
        >
          Demo: view enrolled screen →
        </button>
      </div>
    </div>
  )
}

export default function StudentCourseDetail() {
  const isLight = useThemeStore((s) => s.theme === 'light')
  const { id = 'c1' } = useParams<{ id: string }>()
  const [tab, setTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview')
  const [openMods, setOpenMods] = useState<string[]>(['m1', 'm2'])
  const [enrolled, setEnrolled] = useState(false)
  const navigate = useNavigate()

  function toggleMod(id: string) {
    setOpenMods((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }

  const totalDone = MODULES.flatMap((m) => m.lessons).filter((l) => l.done).length
  const totalLessons = MODULES.flatMap((m) => m.lessons).length
  const progress = Math.round((totalDone / totalLessons) * 100)

  return (
    <StudentShell activeTab="courses">
      {/* ══════════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden rounded-2xl mb-6"
        style={{
          background: isLight
            ? `linear-gradient(135deg, #F2EEFB 0%, #E8E2F7 55%, #DDE6F5 100%)`
            : 'linear-gradient(135deg, #140f28 0%, #1a1235 55%, #0f1120 100%)',
          border: `1px solid ${isLight ? VIOLET + '22' : VIOLET + '30'}`,
        }}
      >
        {/* Ambient glows */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              `radial-gradient(ellipse 55% 60% at 85% 15%, ${VIOLET}26 0%, transparent 65%)`,
              `radial-gradient(ellipse 40% 50% at 5%  85%, rgba(244,178,108,0.14) 0%, transparent 60%)`,
              `radial-gradient(ellipse 30% 40% at 50% 100%, rgba(91,200,197,0.08) 0%, transparent 60%)`,
            ].join(', '),
          }}
        />

        <div className="relative flex gap-7 px-7 pt-7 pb-7 items-stretch">
          {/* ── Left column ─────────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {/* Category + level */}
            <div className="flex items-center gap-2">
              <span
                className="hm-mono text-[9.5px] px-2 py-0.5 rounded font-semibold"
                style={{
                  background: 'rgba(244,178,108,0.18)',
                  color: AMBER,
                  letterSpacing: '0.08em',
                }}
              >
                ARTS & CRAFTS
              </span>
              <span
                className="hm-mono text-[9.5px] px-2 py-0.5 rounded font-semibold"
                style={{ background: VIOLET_SOFT, color: VIOLET, letterSpacing: '0.08em' }}
              >
                BEGINNER
              </span>
              <span
                className="hm-mono text-[9.5px] px-2 py-0.5 rounded font-semibold flex items-center gap-1"
                style={{
                  background: 'rgba(244,99,110,0.10)',
                  color: '#F4636E',
                  letterSpacing: '0.08em',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#F4636E' }} />
                BESTSELLER
              </span>
            </div>

            {/* Title + description */}
            <div>
              <h1
                className="text-[27px] font-bold tracking-tight mb-2"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.022em', lineHeight: 1.2 }}
              >
                {COURSE.title}
              </h1>
              <p
                className="text-[13.5px] leading-relaxed"
                style={{ color: 'var(--hm-text-muted)', maxWidth: 500 }}
              >
                {COURSE.longDesc}
              </p>
            </div>

            {/* Instructor + rating row */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span
                  className="h-8 w-8 rounded-full flex items-center justify-center hm-mono text-[10px] font-semibold shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${AMBER}66, ${AMBER}33)`,
                    color: AMBER,
                    border: `1.5px solid ${AMBER}44`,
                  }}
                >
                  SL
                </span>
                <div className="leading-tight">
                  <p className="text-[12px]" style={{ color: 'var(--hm-text-muted)' }}>
                    Instructor
                  </p>
                  <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                    {COURSE.instructor}
                  </p>
                </div>
              </div>
              <div className="h-6 w-px" style={{ background: 'var(--hm-border)' }} />
              <div className="flex items-center gap-1.5">
                <Stars n={5} />
                <span className="hm-mono text-[14px] font-bold" style={{ color: AMBER }}>
                  {COURSE.rating}
                </span>
                <span className="text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
                  ({COURSE.reviews.toLocaleString()} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" style={{ color: 'var(--hm-text-dim)' }} />
                <span
                  className="text-[12.5px] font-medium"
                  style={{ color: 'var(--hm-text-muted)' }}
                >
                  {COURSE.enrolled.toLocaleString()} enrolled
                </span>
              </div>
            </div>

            {/* ── Course preview thumbnail ── */}
            <div className="flex gap-4 items-stretch">
              {/* Thumbnail card */}
              <div
                className="relative rounded-xl overflow-hidden flex-1"
                style={{
                  background: isLight
                    ? 'linear-gradient(145deg, #FFFFFF 0%, #F4F0FB 100%)'
                    : 'linear-gradient(145deg, #0c0920 0%, #131030 100%)',
                  border: `1px solid ${isLight ? VIOLET + '22' : VIOLET + '33'}`,
                  minHeight: 110,
                }}
              >
                {/* Decorative paint blobs */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: [
                      `radial-gradient(ellipse 50% 60% at 20% 50%, ${AMBER}28 0%, transparent 65%)`,
                      `radial-gradient(ellipse 45% 55% at 75% 40%, ${VIOLET}30 0%, transparent 60%)`,
                      `radial-gradient(ellipse 35% 45% at 50% 85%, rgba(91,200,197,0.18) 0%, transparent 55%)`,
                    ].join(', '),
                  }}
                />
                {/* Botanical leaf shapes (pure CSS) */}
                <svg
                  aria-hidden
                  viewBox="0 0 320 110"
                  className="absolute inset-0 w-full h-full opacity-20"
                  style={{ pointerEvents: 'none' }}
                >
                  <ellipse
                    cx="60"
                    cy="75"
                    rx="28"
                    ry="14"
                    fill={GREEN}
                    transform="rotate(-30 60 75)"
                    opacity="0.7"
                  />
                  <ellipse
                    cx="100"
                    cy="45"
                    rx="22"
                    ry="10"
                    fill={GREEN}
                    transform="rotate(15 100 45)"
                    opacity="0.5"
                  />
                  <ellipse
                    cx="240"
                    cy="60"
                    rx="32"
                    ry="13"
                    fill={GREEN}
                    transform="rotate(-20 240 60)"
                    opacity="0.6"
                  />
                  <ellipse
                    cx="280"
                    cy="35"
                    rx="20"
                    ry="9"
                    fill={GREEN}
                    transform="rotate(25 280 35)"
                    opacity="0.4"
                  />
                  <ellipse
                    cx="160"
                    cy="85"
                    rx="18"
                    ry="8"
                    fill={AMBER}
                    transform="rotate(-10 160 85)"
                    opacity="0.5"
                  />
                  <circle cx="55" cy="30" r="14" fill={AMBER} opacity="0.35" />
                  <circle cx="195" cy="25" r="10" fill={VIOLET} opacity="0.45" />
                  <circle cx="290" cy="80" r="12" fill={TEAL} opacity="0.4" />
                </svg>
                {/* Play button overlay */}
                <button
                  type="button"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"
                      style={{ background: VIOLET, transform: 'scale(1.4)' }}
                    />
                    <span
                      className="relative flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ background: VIOLET, boxShadow: `0 0 24px ${VIOLET}66` }}
                    >
                      <Play className="h-5 w-5 fill-white text-white ml-0.5" />
                    </span>
                  </div>
                  <span
                    className="text-[11.5px] font-semibold"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    Preview course · 4:30
                  </span>
                </button>
              </div>

              {/* Social proof column */}
              <div className="flex flex-col gap-2.5 justify-center" style={{ minWidth: 168 }}>
                {/* Learner avatar stack */}
                <div
                  className="rounded-xl px-3.5 py-3"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-center mb-2">
                    {[
                      'linear-gradient(135deg,#8b5cf6,#6d28d9)',
                      'linear-gradient(135deg,#f4b26c,#d97706)',
                      'linear-gradient(135deg,#34d399,#047857)',
                      'linear-gradient(135deg,#f472b6,#be185d)',
                      'linear-gradient(135deg,#60a5fa,#1d4ed8)',
                    ].map((bg, i) => (
                      <span
                        key={i}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold text-white border-2"
                        style={{
                          background: bg,
                          borderColor: '#140f28',
                          marginLeft: i === 0 ? 0 : -8,
                        }}
                      >
                        {['PS', 'MD', 'LW', 'AO', 'TH'][i]}
                      </span>
                    ))}
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[8.5px] font-bold border-2"
                      style={{
                        background: 'rgba(124,92,246,0.2)',
                        borderColor: '#140f28',
                        color: VIOLET,
                        marginLeft: -8,
                      }}
                    >
                      +4k
                    </span>
                  </div>
                  <p className="text-[11.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
                    4,240 learners enrolled
                  </p>
                  <p className="text-[10.5px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                    Joined in the last 30 days
                  </p>
                </div>

                {/* Rating bar */}
                <div
                  className="rounded-xl px-3.5 py-2.5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Stars n={5} />
                    <span className="hm-mono text-[13px] font-bold" style={{ color: AMBER }}>
                      {COURSE.rating}
                    </span>
                  </div>
                  {[
                    ['5★', '87%'],
                    ['4★', '11%'],
                    ['3★', '2%'],
                  ].map(([label, pct]) => (
                    <div key={label} className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className="hm-mono text-[9.5px] w-5 shrink-0"
                        style={{ color: 'var(--hm-text-dim)' }}
                      >
                        {label}
                      </span>
                      <div
                        className="flex-1 h-1 rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.1)' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: pct, background: AMBER }}
                        />
                      </div>
                      <span
                        className="hm-mono text-[9px] w-6 text-right shrink-0"
                        style={{ color: 'var(--hm-text-dim)' }}
                      >
                        {pct}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Includes strip ── */}
            <div
              className="flex items-center gap-0 rounded-xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              {[
                { Icon: Video, label: '38 videos', color: VIOLET },
                { Icon: FileText, label: '4 readings', color: AMBER },
                { Icon: ListChecks, label: '3 quizzes', color: TEAL },
                { Icon: Radio, label: '2 live sessions', color: '#F4636E' },
                { Icon: Award, label: 'Certificate', color: GREEN },
                { Icon: Infinity, label: 'Lifetime access', color: 'var(--hm-text-muted)' },
              ].map(({ Icon, label, color }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-2.5 flex-1"
                  style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                  <span
                    className="text-[11px] font-medium whitespace-nowrap"
                    style={{ color: 'var(--hm-text-muted)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: EnrollCard ─────────────────────── */}
          <div className="shrink-0 w-[300px]">
            <EnrollCard
              id={id}
              enrolled={enrolled}
              onToggle={() => setEnrolled((v) => !v)}
              onEnroll={() => {
                setEnrolled(true)
                navigate(`/student/courses/${id}/learn`)
              }}
              progress={progress}
              totalDone={totalDone}
              totalLessons={totalLessons}
            />
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        className="flex items-center gap-1 mb-6"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        {(['overview', 'curriculum', 'reviews'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="px-4 pb-3 pt-1 text-[13.5px] font-medium capitalize relative"
            style={{ color: tab === t ? VIOLET : 'var(--hm-text-muted)' }}
          >
            {t}
            {tab === t && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: VIOLET }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {tab === 'overview' && (
            <div className="flex flex-col gap-5">
              {/* What you'll learn */}
              <div
                className="rounded-2xl p-5"
                style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
              >
                <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--hm-text)' }}>
                  What you'll learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COURSE.whatYouLearn.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: GREEN }} />
                      <span
                        className="text-[12.5px] leading-snug"
                        style={{ color: 'var(--hm-text-muted)' }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* About instructor */}
              <div
                className="rounded-2xl p-5"
                style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
              >
                <h2 className="text-[15px] font-semibold mb-4" style={{ color: 'var(--hm-text)' }}>
                  Your instructor
                </h2>
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full shrink-0 hm-mono text-[18px] font-semibold"
                    style={{ background: `${AMBER}28`, color: AMBER }}
                  >
                    SL
                  </span>
                  <div>
                    <p
                      className="text-[14px] font-semibold mb-0.5"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {COURSE.instructor}
                    </p>
                    <p className="text-[12px] mb-2" style={{ color: VIOLET }}>
                      Verified Creator · 4,240 learners · 7 courses
                    </p>
                    <p
                      className="text-[12.5px] leading-relaxed"
                      style={{ color: 'var(--hm-text-muted)' }}
                    >
                      {COURSE.instructorBio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'curriculum' && (
            <div className="flex flex-col gap-2">
              {MODULES.map((mod) => {
                const open = openMods.includes(mod.id)
                const doneLessons = mod.lessons.filter((l) => l.done).length
                return (
                  <div
                    key={mod.id}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: 'var(--hm-bg-card)',
                      border: '1px solid var(--hm-border)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleMod(mod.id)}
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-left"
                      style={{ borderBottom: open ? '1px solid var(--hm-border)' : 'none' }}
                    >
                      <ChevronDown
                        className="h-4 w-4 shrink-0 transition-transform"
                        style={{
                          color: 'var(--hm-text-dim)',
                          transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[13.5px] font-semibold"
                          style={{ color: 'var(--hm-text)' }}
                        >
                          {mod.title}
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                          {doneLessons}/{mod.lessons.length} completed
                        </p>
                      </div>
                      <span
                        className="hm-mono text-[10px] font-semibold shrink-0"
                        style={{
                          color: doneLessons === mod.lessons.length ? GREEN : 'var(--hm-text-dim)',
                        }}
                      >
                        {mod.lessons.length} lessons
                      </span>
                    </button>
                    {open && (
                      <div>
                        {mod.lessons.map((l, i) => {
                          const Icon = LESSON_ICON[l.type] || Video
                          return (
                            <div
                              key={l.id}
                              className="flex items-center gap-3 px-5 py-2.5 cursor-pointer group"
                              style={{
                                borderTop: i > 0 ? '1px solid var(--hm-border)' : 'none',
                                background: l.done ? 'rgba(94,230,168,0.03)' : 'transparent',
                              }}
                            >
                              <span
                                className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                                style={{
                                  background: l.done
                                    ? 'rgba(94,230,168,0.12)'
                                    : 'var(--hm-bg-card-2)',
                                  color: l.done ? GREEN : 'var(--hm-text-dim)',
                                }}
                              >
                                {l.done ? (
                                  <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                  <Icon className="h-3.5 w-3.5" />
                                )}
                              </span>
                              <span
                                className="flex-1 text-[12.5px] truncate"
                                style={{
                                  color: l.done ? 'var(--hm-text-muted)' : 'var(--hm-text)',
                                }}
                              >
                                {l.title}
                              </span>
                              {l.free && (
                                <span
                                  className="hm-mono text-[9px] px-1.5 py-0.5 rounded shrink-0"
                                  style={{
                                    background: 'rgba(94,230,168,0.12)',
                                    color: GREEN,
                                    letterSpacing: '0.06em',
                                  }}
                                >
                                  FREE
                                </span>
                              )}
                              <span
                                className="hm-mono text-[11px] shrink-0"
                                style={{ color: 'var(--hm-text-dim)' }}
                              >
                                {l.dur}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {tab === 'reviews' && (
            <div className="flex flex-col gap-3">
              {REVIEWS.map((r) => (
                <div
                  key={r.name}
                  className="rounded-2xl px-5 py-4"
                  style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full shrink-0 hm-mono text-[10px] font-semibold"
                      style={{ background: VIOLET_SOFT, color: VIOLET }}
                    >
                      {r.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[13px] font-semibold"
                          style={{ color: 'var(--hm-text)' }}
                        >
                          {r.name}
                        </span>
                        <Stars n={r.rating} />
                        <span className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                          {r.time}
                        </span>
                      </div>
                      <p
                        className="text-[12.5px] leading-relaxed"
                        style={{ color: 'var(--hm-text-muted)' }}
                      >
                        {r.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Course details
              </p>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2.5">
              {[
                { label: 'Duration', value: COURSE.duration },
                { label: 'Lessons', value: `${COURSE.totalLessons} lessons` },
                { label: 'Language', value: COURSE.language },
                { label: 'Updated', value: COURSE.lastUpdated },
                { label: 'Certificate', value: 'On completion' },
              ].map((d) => (
                <div key={d.label} className="flex items-center justify-between text-[12.5px]">
                  <span style={{ color: 'var(--hm-text-dim)' }}>{d.label}</span>
                  <span className="font-medium" style={{ color: 'var(--hm-text)' }}>
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Tags */}
          <div
            className="rounded-2xl px-4 py-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p className="text-[12px] font-semibold mb-2.5" style={{ color: 'var(--hm-text)' }}>
              Topics
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Watercolor',
                'Painting',
                'Art',
                'Botanical',
                'Color Theory',
                'Brush Techniques',
              ].map((t) => (
                <span
                  key={t}
                  className="hm-mono px-2 py-0.5 rounded text-[9.5px] font-medium"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    color: 'var(--hm-text-muted)',
                    border: '1px solid var(--hm-border)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StudentShell>
  )
}
