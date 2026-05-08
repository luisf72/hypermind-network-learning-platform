import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useThemeStore } from '@/stores/themeStore'
import {
  Clock,
  ListChecks,
  Award,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Info,
  Zap,
  BarChart3,
  Coins,
  ShieldCheck,
  Play,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, AMBER, BLUE, GREEN } from './StudentShell'

const TEAL = '#5BC8C5'
const ACCENT_DARK = '#1a1208'

const ASSESSMENT = {
  title: 'Watercolor Final Assessment',
  course: 'Watercolor Foundations',
  type: 'Course Final',
  questions: 20,
  duration: 45,
  passingScore: 70,
  attempts: 3,
  attemptsUsed: 1,
  difficulty: 'Intermediate',
  topics: [
    'Washes & Techniques',
    'Color Mixing',
    'Brush Control',
    'Composition',
    'Materials & Setup',
  ],
  lastScore: 62,
  bestScore: 62,
}

const RULES = [
  'You must complete the assessment in a single session — you cannot pause and resume.',
  'Each question may only be answered once. You can flag a question and return before submitting.',
  'The timer runs continuously once started. Time up = auto-submit with current answers.',
  'A minimum score of 70% is required to pass and unlock your certificate.',
  'You have 3 total attempts. Attempt 2 of 3 is available to you right now.',
  'Results and detailed feedback are shown immediately after submission.',
]

const SAMPLE_QS = [
  { type: 'Multiple choice', count: 12 },
  { type: 'True / False', count: 4 },
  { type: 'Short answer', count: 4 },
]

/* ── Enroll / Start card ── */
function AssessmentAccessCard({ id }: { id: string }) {
  const [enrolled, setEnrolled] = useState(false)
  const [payMethod, setPayMethod] = useState<'hmn' | 'credits'>('hmn')

  const HMN_PRICE = 40
  const CREDITS_PRICE = 60
  const HMN_BAL = 2340
  const CREDITS_BAL = 180

  const hmnAfter = HMN_BAL - HMN_PRICE
  const creditsAfter = CREDITS_BAL - CREDITS_PRICE

  if (enrolled)
    return (
      <div
        className="rounded-2xl p-5 sticky top-4"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        {/* access badge */}
        <div
          className="flex items-center justify-center gap-1.5 mb-4 px-3 py-1.5 rounded-xl"
          style={{ background: `${GREEN}12`, border: `1px solid ${GREEN}30` }}
        >
          <ShieldCheck className="h-4 w-4" style={{ color: GREEN }} />
          <span className="text-[12px] font-semibold" style={{ color: GREEN }}>
            Access granted
          </span>
        </div>
        <div
          className="rounded-xl p-4 mb-4 text-center"
          style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
        >
          <div
            className="hm-mono text-[36px] font-bold leading-none"
            style={{ color: 'var(--hm-text)' }}
          >
            45:00
          </div>
          <p className="text-[11px] mt-1" style={{ color: 'var(--hm-text-dim)' }}>
            Total time allowed
          </p>
        </div>
        <div className="flex flex-col gap-1.5 mb-5">
          {[
            { label: 'Questions', val: ASSESSMENT.questions },
            { label: 'Passing score', val: `${ASSESSMENT.passingScore}%` },
            {
              label: 'This attempt',
              val: `${ASSESSMENT.attemptsUsed + 1} / ${ASSESSMENT.attempts}`,
            },
          ].map((d) => (
            <div
              key={d.label}
              className="flex items-center justify-between text-[12.5px] py-1.5"
              style={{ borderBottom: '1px solid var(--hm-border)' }}
            >
              <span style={{ color: 'var(--hm-text-muted)' }}>{d.label}</span>
              <span className="font-semibold hm-mono" style={{ color: 'var(--hm-text)' }}>
                {d.val}
              </span>
            </div>
          ))}
        </div>
        <Link
          to={`/student/assessments/${id}/quiz`}
          className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl text-[14px] font-bold"
          style={{
            background: `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`,
            color: 'white',
            boxShadow: `0 8px 24px -8px ${VIOLET}66`,
            textDecoration: 'none',
          }}
        >
          <Zap className="h-5 w-5" /> Start assessment
        </Link>
        <p className="text-[11px] text-center mt-3" style={{ color: 'var(--hm-text-dim)' }}>
          Timer starts immediately when you click Start
        </p>
        {/* demo toggle */}
        <div
          className="mt-4 pt-3 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--hm-border)' }}
        >
          <span
            className="hm-mono text-[9px]"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
          >
            DEMO
          </span>
          <button
            type="button"
            onClick={() => setEnrolled(false)}
            className="hm-mono text-[9px] px-2 py-0.5 rounded"
            style={{ background: 'var(--hm-bg-card-2)', color: 'var(--hm-text-dim)' }}
          >
            reset
          </button>
        </div>
      </div>
    )

  /* ── not-purchased state ── */
  return (
    <div
      className="rounded-2xl p-5 sticky top-4"
      style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
    >
      <p
        className="hm-mono text-[9.5px] mb-3 text-center"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
      >
        ASSESSMENT ACCESS
      </p>

      {/* payment tiles */}
      <div className="flex flex-col gap-2.5 mb-4">
        {/* HMN tile */}
        <button
          type="button"
          onClick={() => setPayMethod('hmn')}
          className="rounded-xl p-3.5 text-left transition-all"
          style={{
            background: payMethod === 'hmn' ? `${VIOLET}14` : 'var(--hm-bg-card-2)',
            border: `2px solid ${payMethod === 'hmn' ? VIOLET : 'var(--hm-border)'}`,
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center"
                style={{ background: `${VIOLET}20` }}
              >
                <Coins className="h-3.5 w-3.5" style={{ color: VIOLET }} />
              </div>
              <div>
                <p className="text-[12px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  HMN Tokens
                </p>
                <p className="text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                  Your balance: {HMN_BAL.toLocaleString()} HMN
                </p>
              </div>
            </div>
            <span className="hm-mono text-[18px] font-bold leading-none" style={{ color: VIOLET }}>
              {HMN_PRICE}
            </span>
          </div>
          {payMethod === 'hmn' && (
            <div
              className="flex items-center justify-between text-[10.5px] px-1 pt-2"
              style={{ borderTop: `1px solid ${VIOLET}25` }}
            >
              <span style={{ color: 'var(--hm-text-dim)' }}>Balance after</span>
              <span className="hm-mono font-semibold" style={{ color: VIOLET }}>
                {hmnAfter.toLocaleString()} HMN
              </span>
            </div>
          )}
        </button>

        {/* Credits tile */}
        <button
          type="button"
          onClick={() => setPayMethod('credits')}
          className="rounded-xl p-3.5 text-left transition-all"
          style={{
            background: payMethod === 'credits' ? `${TEAL}12` : 'var(--hm-bg-card-2)',
            border: `2px solid ${payMethod === 'credits' ? TEAL : 'var(--hm-border)'}`,
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center"
                style={{ background: `${TEAL}18` }}
              >
                <Award className="h-3.5 w-3.5" style={{ color: TEAL }} />
              </div>
              <div>
                <p className="text-[12px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Credits
                </p>
                <p className="text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                  Your balance: {CREDITS_BAL} credits
                </p>
              </div>
            </div>
            <span className="hm-mono text-[18px] font-bold leading-none" style={{ color: TEAL }}>
              {CREDITS_PRICE}
            </span>
          </div>
          {payMethod === 'credits' && (
            <div
              className="flex items-center justify-between text-[10.5px] px-1 pt-2"
              style={{ borderTop: `1px solid ${TEAL}25` }}
            >
              <span style={{ color: 'var(--hm-text-dim)' }}>Balance after</span>
              <span className="hm-mono font-semibold" style={{ color: TEAL }}>
                {creditsAfter} credits
              </span>
            </div>
          )}
        </button>
      </div>

      {/* quick stats */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {[
          { label: `${ASSESSMENT.questions} Qs`, color: VIOLET },
          { label: `${ASSESSMENT.duration} min`, color: BLUE },
          { label: `${ASSESSMENT.passingScore}% pass`, color: GREEN },
        ].map(({ label, color }) => (
          <span
            key={label}
            className="hm-mono text-[10px] px-2 py-0.5 rounded-md font-semibold"
            style={{ background: `${color}18`, color }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* enroll CTA */}
      <button
        type="button"
        onClick={() => setEnrolled(true)}
        className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-xl text-[13px] font-bold"
        style={{
          background:
            payMethod === 'hmn'
              ? `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`
              : `linear-gradient(135deg, ${TEAL} 0%, #7dd3d1 100%)`,
          color: 'white',
          boxShadow: `0 8px 24px -8px ${payMethod === 'hmn' ? VIOLET : TEAL}66`,
        }}
      >
        <Play className="h-4 w-4" />
        Unlock with {payMethod === 'hmn' ? `${HMN_PRICE} HMN` : `${CREDITS_PRICE} Credits`}
      </button>

      {/* demo toggle */}
      <div
        className="mt-4 pt-3 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--hm-border)' }}
      >
        <span
          className="hm-mono text-[9px]"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
        >
          DEMO
        </span>
        <button
          type="button"
          onClick={() => setEnrolled(true)}
          className="hm-mono text-[9px] px-2 py-0.5 rounded"
          style={{ background: 'var(--hm-bg-card-2)', color: 'var(--hm-text-dim)' }}
        >
          skip to access
        </button>
      </div>
    </div>
  )
}

export default function StudentAssessmentDetail() {
  const isLight = useThemeStore((s) => s.theme === 'light')
  const { id = 'a1' } = useParams<{ id: string }>()
  return (
    <StudentShell activeTab="assessments">
      {/* Breadcrumb */}
      <div
        className="flex items-center gap-1.5 mb-5 text-[12px]"
        style={{ color: 'var(--hm-text-dim)' }}
      >
        <span>Assessments</span>
        <ChevronRight className="h-3 w-3" />
        <span>{ASSESSMENT.course}</span>
        <ChevronRight className="h-3 w-3" />
        <span style={{ color: 'var(--hm-text)' }}>{ASSESSMENT.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Hero card */}
          <div
            className="relative overflow-hidden rounded-2xl px-6 py-7"
            style={{
              background: isLight
                ? 'linear-gradient(135deg, #F2EEFB 0%, #E8E2F7 60%, #DDE6F5 100%)'
                : 'linear-gradient(135deg, #140f28 0%, #1c1535 60%, #0f1120 100%)',
              border: `1px solid ${isLight ? VIOLET + '22' : VIOLET + '30'}`,
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 80% 30%, ${VIOLET}28 0%, transparent 55%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="hm-mono text-[9.5px] px-2 py-0.5 rounded font-semibold"
                  style={{ background: VIOLET_SOFT, color: VIOLET, letterSpacing: '0.08em' }}
                >
                  {ASSESSMENT.type.toUpperCase()}
                </span>
                <span
                  className="hm-mono text-[9.5px] px-2 py-0.5 rounded font-semibold"
                  style={{
                    background: 'rgba(244,178,108,0.14)',
                    color: AMBER,
                    letterSpacing: '0.08em',
                  }}
                >
                  {ASSESSMENT.difficulty.toUpperCase()}
                </span>
              </div>
              <h1
                className="text-[24px] font-bold tracking-tight mb-1"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
              >
                {ASSESSMENT.title}
              </h1>
              <p className="text-[13px] mb-5" style={{ color: 'var(--hm-text-muted)' }}>
                Part of{' '}
                <span className="font-medium" style={{ color: 'var(--hm-text)' }}>
                  {ASSESSMENT.course}
                </span>
              </p>
              {/* Meta chips */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { Icon: ListChecks, val: `${ASSESSMENT.questions} questions`, color: VIOLET },
                  { Icon: Clock, val: `${ASSESSMENT.duration} minutes`, color: BLUE },
                  { Icon: Award, val: `${ASSESSMENT.passingScore}% to pass`, color: GREEN },
                  {
                    Icon: BarChart3,
                    val: `Attempt ${ASSESSMENT.attemptsUsed + 1} of ${ASSESSMENT.attempts}`,
                    color: AMBER,
                  },
                ].map(({ Icon, val, color }) => (
                  <div
                    key={val}
                    className="flex items-center gap-1.5 px-3 h-8 rounded-lg"
                    style={{ background: `${color}14`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                    <span className="text-[12px] font-medium" style={{ color }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Previous attempt */}
          {ASSESSMENT.attemptsUsed > 0 && (
            <div
              className="rounded-2xl p-4 flex items-center gap-4"
              style={{
                background: 'rgba(244,178,108,0.08)',
                border: '1px solid rgba(244,178,108,0.25)',
              }}
            >
              <AlertTriangle className="h-5 w-5 shrink-0" style={{ color: AMBER }} />
              <div className="flex-1">
                <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Previous attempt: <span style={{ color: AMBER }}>{ASSESSMENT.lastScore}%</span> —
                  Not yet passed
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: 'var(--hm-text-muted)' }}>
                  You need {ASSESSMENT.passingScore - ASSESSMENT.lastScore}% more to pass. You have{' '}
                  {ASSESSMENT.attempts - ASSESSMENT.attemptsUsed} attempt(s) remaining.
                </p>
              </div>
            </div>
          )}

          {/* Question breakdown */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="px-5 py-3.5" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Question breakdown
              </h3>
            </div>
            <div className="px-5 py-4 grid grid-cols-3 gap-3">
              {SAMPLE_QS.map((q) => (
                <div
                  key={q.type}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  <p className="hm-mono text-[20px] font-bold" style={{ color: 'var(--hm-text)' }}>
                    {q.count}
                  </p>
                  <p
                    className="hm-mono text-[9.5px] mt-0.5"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                  >
                    {q.type.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Topics covered */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="px-5 py-3.5" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Topics covered
              </h3>
            </div>
            <div className="px-5 py-4 flex flex-wrap gap-2">
              {ASSESSMENT.topics.map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-1.5 px-3 h-7 rounded-lg"
                  style={{ background: VIOLET_SOFT, border: `1px solid ${VIOLET}30` }}
                >
                  <CheckCircle2 className="h-3 w-3" style={{ color: VIOLET }} />
                  <span className="text-[12px]" style={{ color: VIOLET }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div
              className="px-5 py-3.5 flex items-center gap-2"
              style={{ borderBottom: '1px solid var(--hm-border)' }}
            >
              <Info className="h-4 w-4" style={{ color: VIOLET }} />
              <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Rules & guidelines
              </h3>
            </div>
            <div className="px-5 py-4 flex flex-col gap-2.5">
              {RULES.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="hm-mono h-5 w-5 flex items-center justify-center rounded-md shrink-0 text-[10px] font-bold"
                    style={{ background: VIOLET_SOFT, color: VIOLET }}
                  >
                    {i + 1}
                  </span>
                  <p
                    className="text-[12.5px] leading-relaxed"
                    style={{ color: 'var(--hm-text-muted)' }}
                  >
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <AssessmentAccessCard id={id} />

          {/* Related */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                From the same course
              </p>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2">
              {['Unit 2 Knowledge Check', 'Wet-on-Wet Quick Quiz', 'Color Mixing Mid-Quiz'].map(
                (a) => (
                  <button
                    key={a}
                    type="button"
                    className="flex items-center gap-2.5 py-1.5 text-left group"
                  >
                    <ListChecks
                      className="h-4 w-4 shrink-0"
                      style={{ color: 'var(--hm-text-dim)' }}
                    />
                    <span
                      className="text-[12.5px] group-hover:underline"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {a}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </StudentShell>
  )
}
