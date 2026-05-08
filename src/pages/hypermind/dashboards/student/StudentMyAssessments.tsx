import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3,
  Award,
  TrendingUp,
  ChevronRight,
  RotateCcw,
  Eye,
  Zap,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, GREEN, AMBER, BLUE } from './StudentShell'

const TABS = ['All', 'Passed', 'Failed', 'In Progress'] as const
type Tab = (typeof TABS)[number]

interface Assessment {
  id: string
  title: string
  course: string
  score: number | null
  passing: number
  date: string
  duration: number
  questions: number
  status: 'passed' | 'failed' | 'in_progress'
  attempt: number
  maxAttempts: number
  color: string
}

const ASSESSMENTS: Assessment[] = [
  {
    id: 'a1',
    title: 'Python Basics Quiz',
    course: 'Python for Beginners',
    score: 94,
    passing: 70,
    date: 'Nov 28, 2025',
    duration: 25,
    questions: 20,
    status: 'passed',
    attempt: 1,
    maxAttempts: 3,
    color: GREEN,
  },
  {
    id: 'a2',
    title: 'Productivity Final Assessment',
    course: 'Productivity Masterclass',
    score: 88,
    passing: 70,
    date: 'Oct 15, 2025',
    duration: 30,
    questions: 25,
    status: 'passed',
    attempt: 1,
    maxAttempts: 3,
    color: '#A78BFA',
  },
  {
    id: 'a3',
    title: 'Watercolor Final Assessment',
    course: 'Watercolor Foundations',
    score: 62,
    passing: 70,
    date: 'Mar 12, 2026',
    duration: 45,
    questions: 20,
    status: 'failed',
    attempt: 1,
    maxAttempts: 3,
    color: '#F4B26C',
  },
  {
    id: 'a4',
    title: 'Spanish Travel Quiz – Unit 2',
    course: 'Spanish for Travelers',
    score: null,
    passing: 70,
    date: 'Due Mar 20',
    duration: 25,
    questions: 15,
    status: 'in_progress',
    attempt: 0,
    maxAttempts: 3,
    color: VIOLET,
  },
  {
    id: 'a5',
    title: 'Budgeting & Savings Mastery',
    course: 'Personal Finance 101',
    score: null,
    passing: 70,
    date: 'Due Mar 25',
    duration: 40,
    questions: 25,
    status: 'in_progress',
    attempt: 0,
    maxAttempts: 3,
    color: BLUE,
  },
  {
    id: 'a6',
    title: 'Photography Basics Quiz',
    course: 'Basic Photography',
    score: 76,
    passing: 70,
    date: 'Mar 5, 2026',
    duration: 20,
    questions: 12,
    status: 'passed',
    attempt: 2,
    maxAttempts: 3,
    color: '#5BC8C5',
  },
]

const STATUS_META = {
  passed: {
    label: 'Passed',
    tone: { bg: 'rgba(94,230,168,0.12)', border: 'rgba(94,230,168,0.3)', color: GREEN },
  },
  failed: {
    label: 'Failed',
    tone: { bg: 'rgba(244,99,110,0.12)', border: 'rgba(244,99,110,0.3)', color: '#F4636E' },
  },
  in_progress: {
    label: 'Upcoming',
    tone: { bg: 'rgba(124,92,246,0.12)', border: 'rgba(124,92,246,0.3)', color: VIOLET },
  },
}

function ScoreRing({ score, passing, color }: { score: number; passing: number; color: string }) {
  const r = 24
  const c = 2 * Math.PI * r
  const dash = c * (score / 100)
  const passed = score >= passing
  return (
    <div className="relative flex items-center justify-center" style={{ width: 60, height: 60 }}>
      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="30" cy="30" r={r} fill="none" stroke="var(--hm-bg-card-2)" strokeWidth="5" />
        <circle
          cx="30"
          cy="30"
          r={r}
          fill="none"
          stroke={passed ? GREEN : '#F4636E'}
          strokeWidth="5"
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute hm-mono text-[12px] font-bold"
        style={{ color: passed ? GREEN : '#F4636E' }}
      >
        {score}%
      </span>
    </div>
  )
}

export default function StudentMyAssessments() {
  const [tab, setTab] = useState<Tab>('All')
  const navigate = useNavigate()

  const filtered = ASSESSMENTS.filter((a) => {
    if (tab === 'All') return true
    if (tab === 'Passed') return a.status === 'passed'
    if (tab === 'Failed') return a.status === 'failed'
    if (tab === 'In Progress') return a.status === 'in_progress'
    return true
  })

  const passed = ASSESSMENTS.filter((a) => a.status === 'passed').length
  const failed = ASSESSMENTS.filter((a) => a.status === 'failed').length
  const avgScore = Math.round(
    ASSESSMENTS.filter((a) => a.score !== null).reduce((s, a) => s + (a.score ?? 0), 0) /
      ASSESSMENTS.filter((a) => a.score !== null).length
  )

  return (
    <StudentShell>
      <div className="mb-6">
        <p className="hm-mono text-[10px] mb-2" style={{ color: VIOLET, letterSpacing: '0.2em' }}>
          RESULTS
        </p>
        <h1
          className="text-[26px] font-bold tracking-tight"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
        >
          My Assessments
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: 'Total taken',
            val: ASSESSMENTS.filter((a) => a.score !== null).length,
            color: VIOLET,
          },
          { label: 'Passed', val: passed, color: GREEN },
          { label: 'Failed', val: failed, color: '#F4636E' },
          { label: 'Avg score', val: `${avgScore}%`, color: AMBER },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl px-5 py-4"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[22px] font-bold leading-none mb-1"
              style={{ color: 'var(--hm-text)' }}
            >
              {s.val}
            </p>
            <p className="text-[11.5px]" style={{ color: 'var(--hm-text-muted)' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Performance bar chart placeholder */}
      <div
        className="rounded-2xl px-5 py-4 mb-6"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p
              className="hm-mono text-[9px] mb-0.5"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              PERFORMANCE
            </p>
            <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
              Score history
            </p>
          </div>
          <span
            className="hm-mono text-[10.5px] px-2 py-0.5 rounded"
            style={{ background: VIOLET_SOFT, color: VIOLET, letterSpacing: '0.06em' }}
          >
            ALL TIME
          </span>
        </div>
        <div className="flex items-end gap-3 h-24">
          {[94, 88, 62, 76].map((score, i) => {
            const color = score >= 70 ? GREEN : '#F4636E'
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="hm-mono text-[10px] font-bold" style={{ color }}>
                  {score}%
                </span>
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: `${(score / 100) * 72}px`,
                    background: `${color}55`,
                    border: `1px solid ${color}44`,
                  }}
                />
              </div>
            )
          })}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
              —
            </span>
            <div
              className="w-full rounded-t-md"
              style={{
                height: 24,
                background: 'rgba(255,255,255,0.04)',
                border: '1px dashed var(--hm-border)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex items-center gap-1 mb-5"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="px-4 pb-3 pt-1 text-[13px] font-medium relative"
            style={{ color: tab === t ? VIOLET : 'var(--hm-text-muted)' }}
          >
            {t}
            {tab === t && (
              <span
                className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                style={{ background: VIOLET }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Assessment cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((a) => {
          const sm = STATUS_META[a.status]
          return (
            <Link
              key={a.id}
              to={`/student/assessments/${a.id}`}
              className="rounded-2xl px-5 py-4 block"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div className="flex items-center gap-4 flex-wrap">
                {/* Score ring or upcoming */}
                <div className="shrink-0">
                  {a.score !== null ? (
                    <ScoreRing score={a.score} passing={a.passing} color={a.color} />
                  ) : (
                    <div
                      className="flex h-[60px] w-[60px] items-center justify-center rounded-full"
                      style={{ background: VIOLET_SOFT, border: `2px dashed ${VIOLET}44` }}
                    >
                      <Zap className="h-5 w-5" style={{ color: VIOLET }} />
                    </div>
                  )}
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-0.5 flex-wrap">
                    <h3
                      className="text-[14px] font-semibold"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
                    >
                      {a.title}
                    </h3>
                    <span
                      className="hm-mono text-[9px] px-1.5 py-0.5 rounded font-semibold"
                      style={{
                        background: sm.tone.bg,
                        border: `1px solid ${sm.tone.border}`,
                        color: sm.tone.color,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {sm.label.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[12px] mb-2" style={{ color: 'var(--hm-text-dim)' }}>
                    {a.course}
                  </p>
                  <div
                    className="flex items-center gap-4 flex-wrap text-[11.5px]"
                    style={{ color: 'var(--hm-text-dim)' }}
                  >
                    <span>{a.date}</span>
                    <span>
                      {a.questions} questions · {a.duration} min
                    </span>
                    {a.score !== null && (
                      <span>
                        Attempt {a.attempt}/{a.maxAttempts}
                      </span>
                    )}
                    {a.score !== null && a.score >= a.passing && (
                      <span className="flex items-center gap-1" style={{ color: GREEN }}>
                        <CheckCircle2 className="h-3.5 w-3.5" /> Passed
                      </span>
                    )}
                    {a.score !== null && a.score < a.passing && (
                      <span className="flex items-center gap-1" style={{ color: '#F4636E' }}>
                        <XCircle className="h-3.5 w-3.5" /> {a.passing - a.score}% short
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {a.status === 'failed' && a.attempt < a.maxAttempts && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/student/assessments/${a.id}/quiz`)
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-semibold"
                      style={{
                        background: VIOLET,
                        color: 'white',
                        boxShadow: `0 4px 12px ${VIOLET}44`,
                        border: 'none',
                      }}
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Retake
                    </button>
                  )}
                  {a.status === 'in_progress' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/student/assessments/${a.id}/quiz`)
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-semibold"
                      style={{
                        background: VIOLET,
                        color: 'white',
                        boxShadow: `0 4px 12px ${VIOLET}44`,
                        border: 'none',
                      }}
                    >
                      <Zap className="h-3.5 w-3.5" /> Start
                    </button>
                  )}
                  {a.status === 'passed' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/student/assessments/${a.id}/result`)
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-medium"
                      style={{
                        background: 'var(--hm-bg-card-2)',
                        border: '1px solid var(--hm-border)',
                        color: 'var(--hm-text-muted)',
                      }}
                    >
                      <Eye className="h-3.5 w-3.5" /> Review
                    </button>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </StudentShell>
  )
}
