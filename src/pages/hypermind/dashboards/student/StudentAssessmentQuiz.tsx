import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertTriangle,
  CheckCircle2,
  X,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, AMBER, GREEN } from './StudentShell'

const QUESTIONS = [
  {
    id: 1,
    text: 'Which of the following best describes \u2018wet-on-wet\u2019 watercolor technique?',
    options: [
      'Applying dry pigment directly onto dry paper',
      'Painting wet pigment onto pre-wetted paper to create soft, diffused edges',
      'Using a dry brush on damp paper for texture effects',
      'Layering multiple transparent glazes after each layer fully dries',
    ],
    correct: 1,
  },
  {
    id: 2,
    text: 'True or False: Cold-press watercolor paper has a smoother surface than hot-press paper.',
    options: ['True', 'False'],
    correct: 1,
  },
  {
    id: 3,
    text: 'A \u2018graded wash\u2019 in watercolor means:',
    options: [
      'A wash that grades from one hue to a complementary hue',
      'A wash applied in parallel horizontal bands',
      'A wash that transitions gradually from dark to light (or vice versa)',
      'A wash used exclusively for dark shadow areas',
    ],
    correct: 2,
  },
  {
    id: 4,
    text: 'Which pigment property causes some watercolors to settle into paper texture, creating a grainy look?',
    options: ['Granulation', 'Staining', 'Transparency', 'Lifting'],
    correct: 0,
  },
  {
    id: 5,
    text: 'What is the recommended minimum paper weight (gsm) to avoid excessive warping during a wet-on-wet painting?',
    options: ['90 gsm', '150 gsm', '300 gsm', '450 gsm'],
    correct: 2,
  },
]

const TOTAL_QUESTIONS = 20
const TOTAL_SECONDS = 45 * 60

type Status = 'unanswered' | 'answered' | 'flagged' | 'current'
const STATUS_STYLE: Record<Status, { bg: string; border: string; color: string }> = {
  current: { bg: VIOLET, border: VIOLET, color: 'white' },
  answered: { bg: 'rgba(94,230,168,0.15)', border: 'rgba(94,230,168,0.4)', color: GREEN },
  flagged: { bg: 'rgba(244,178,108,0.15)', border: 'rgba(244,178,108,0.4)', color: AMBER },
  unanswered: {
    bg: 'var(--hm-bg-card-2)',
    border: 'var(--hm-border)',
    color: 'var(--hm-text-dim)',
  },
}

const MOCK_STATUSES: Status[] = [
  'answered',
  'answered',
  'answered',
  'current',
  'flagged',
  'answered',
  'answered',
  'unanswered',
  'unanswered',
  'flagged',
  'unanswered',
  'unanswered',
  'unanswered',
  'unanswered',
  'unanswered',
  'unanswered',
  'unanswered',
  'unanswered',
  'unanswered',
  'unanswered',
]

export default function StudentAssessmentQuiz() {
  const navigate = useNavigate()
  const { id = 'a1' } = useParams<{ id: string }>()
  const [currentQ, setCurrentQ] = useState(3)
  const [selected, setSelected] = useState<number | null>(null)
  const [flagged, setFlagged] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)

  const q = QUESTIONS[Math.min(currentQ, QUESTIONS.length - 1)]
  const answeredCount = MOCK_STATUSES.filter((s) => s === 'answered').length
  const flaggedCount = MOCK_STATUSES.filter((s) => s === 'flagged').length
  const unansweredCount = TOTAL_QUESTIONS - answeredCount - flaggedCount - 1

  const elapsed = TOTAL_SECONDS - 38 * 60 - 22
  const remaining = TOTAL_SECONDS - elapsed
  const remMins = String(Math.floor(remaining / 60)).padStart(2, '0')
  const remSecs = String(remaining % 60).padStart(2, '0')
  const pct = (elapsed / TOTAL_SECONDS) * 100
  const timerColor = remaining < 5 * 60 ? '#F4636E' : remaining < 15 * 60 ? AMBER : GREEN

  return (
    <StudentShell activeTab="assessments" fullWidth>
      {/* ── Quiz-specific sub-header (timer, question counter, submit) ── */}
      <header
        className="sticky top-14 z-40"
        style={{
          background: 'rgba(10,11,20,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--hm-border)',
        }}
      >
        <div className="flex items-center gap-4 px-5" style={{ height: 52 }}>
          {/* Course + assessment title */}
          <div className="flex-1 min-w-0">
            <p
              className="hm-mono text-[9px] leading-none"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              WATERCOLOR FOUNDATIONS
            </p>
            <p
              className="text-[13px] font-semibold truncate"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
            >
              Final Assessment
            </p>
          </div>

          {/* Question counter */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="flex flex-col items-center">
              <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                Question
              </span>
              <span className="hm-mono text-[15px] font-bold" style={{ color: 'var(--hm-text)' }}>
                {currentQ + 1}
                <span className="text-[12px] font-normal" style={{ color: 'var(--hm-text-dim)' }}>
                  /{TOTAL_QUESTIONS}
                </span>
              </span>
            </div>
            <div className="h-8 w-px" style={{ background: 'var(--hm-border)' }} />
          </div>

          {/* Timer */}
          <div
            className="flex items-center gap-2.5 px-4 h-10 rounded-xl shrink-0"
            style={{ background: `${timerColor}12`, border: `1px solid ${timerColor}40` }}
          >
            <Clock className="h-4 w-4" style={{ color: timerColor }} />
            <div>
              <span
                className="hm-mono text-[18px] font-bold tracking-tighter"
                style={{ color: timerColor }}
              >
                {remMins}:{remSecs}
              </span>
              <span className="hm-mono text-[10px] ml-1" style={{ color: `${timerColor}99` }}>
                / 45:00
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={() => setShowSubmit(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 h-9 rounded-lg text-[12.5px] font-semibold shrink-0"
            style={{ background: VIOLET, color: 'white', boxShadow: `0 4px 12px ${VIOLET}44` }}
          >
            <Send className="h-3.5 w-3.5" /> Submit
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full" style={{ background: 'var(--hm-bg-card-2)' }}>
          <div
            className="h-full transition-all"
            style={{
              width: `${((currentQ + 1) / TOTAL_QUESTIONS) * 100}%`,
              background: `linear-gradient(90deg, ${VIOLET} 0%, #A78BFA 100%)`,
            }}
          />
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 56px - 53px)' }}>
        {/* Question area */}
        <div
          className="flex-1 min-w-0 overflow-y-auto px-6 py-6"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {/* Question header */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <span
                  className="hm-mono text-[10px] px-2 py-0.5 rounded font-semibold"
                  style={{ background: VIOLET_SOFT, color: VIOLET, letterSpacing: '0.08em' }}
                >
                  Q {currentQ + 1}
                </span>
                <span
                  className="hm-mono text-[10px]"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                >
                  MULTIPLE CHOICE
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFlagged((f) => !f)}
                className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-[12px] font-medium"
                style={{
                  background: flagged ? 'rgba(244,178,108,0.14)' : 'var(--hm-bg-card)',
                  border: `1px solid ${flagged ? 'rgba(244,178,108,0.4)' : 'var(--hm-border)'}`,
                  color: flagged ? AMBER : 'var(--hm-text-muted)',
                }}
              >
                <Flag className="h-3.5 w-3.5" />
                {flagged ? 'Flagged' : 'Flag for review'}
              </button>
            </div>

            {/* Question text */}
            <p
              className="text-[17px] font-medium leading-relaxed mb-7"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
            >
              {q.text}
            </p>

            {/* Options */}
            <div className="flex flex-col gap-3 mb-8">
              {q.options.map((opt, i) => {
                const isSelected = selected === i
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelected(i)}
                    className="flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all"
                    style={{
                      background: isSelected ? VIOLET_SOFT : 'var(--hm-bg-card)',
                      border: `2px solid ${isSelected ? VIOLET : 'var(--hm-border)'}`,
                    }}
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full shrink-0 hm-mono text-[12px] font-bold"
                      style={{
                        background: isSelected ? VIOLET : 'var(--hm-bg-card-2)',
                        color: isSelected ? 'white' : 'var(--hm-text-dim)',
                        border: isSelected ? 'none' : '1px solid var(--hm-border)',
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span
                      className="text-[14px] leading-snug"
                      style={{
                        color: isSelected ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                        fontWeight: isSelected ? 500 : 400,
                      }}
                    >
                      {opt}
                    </span>
                    {isSelected && (
                      <CheckCircle2
                        className="h-5 w-5 ml-auto shrink-0"
                        style={{ color: VIOLET }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
                className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl text-[13px] font-medium"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-muted)',
                }}
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <span className="text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
                {TOTAL_QUESTIONS - currentQ - 1} questions remaining
              </span>
              <button
                type="button"
                onClick={() => setCurrentQ((q) => Math.min(TOTAL_QUESTIONS - 1, q + 1))}
                className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl text-[13px] font-semibold"
                style={{ background: VIOLET, color: 'white', boxShadow: `0 4px 12px ${VIOLET}44` }}
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside
          className="w-64 shrink-0 hidden md:flex flex-col"
          style={{ borderLeft: '1px solid var(--hm-border)', background: 'var(--hm-bg-card)' }}
        >
          {/* Timer panel */}
          <div className="px-4 pt-5 pb-4" style={{ borderBottom: '1px solid var(--hm-border)' }}>
            <p
              className="hm-mono text-[9px] text-center mb-3"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              TIME REMAINING
            </p>
            <div className="flex justify-center mb-3">
              <div
                className="relative flex items-center justify-center"
                style={{ width: 100, height: 100 }}
              >
                <svg className="absolute inset-0" width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="var(--hm-bg-card-2)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke={timerColor}
                    strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 44}`}
                    strokeDashoffset={`${2 * Math.PI * 44 * (1 - (1 - pct / 100))}`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="text-center">
                  <p
                    className="hm-mono text-[18px] font-bold leading-none"
                    style={{ color: timerColor }}
                  >
                    {remMins}:{remSecs}
                  </p>
                  <p className="hm-mono text-[9px] mt-1" style={{ color: 'var(--hm-text-dim)' }}>
                    of 45:00
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              {[
                { label: 'Done', val: answeredCount, color: GREEN },
                { label: 'Flagged', val: flaggedCount, color: AMBER },
                { label: 'Left', val: unansweredCount, color: 'var(--hm-text-dim)' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg py-1.5"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  <p className="hm-mono text-[14px] font-bold" style={{ color: s.color }}>
                    {s.val}
                  </p>
                  <p
                    className="hm-mono text-[8.5px]"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                  >
                    {s.label.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Question grid */}
          <div className="flex-1 px-4 pt-4 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            <p
              className="hm-mono text-[9px] mb-3"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
            >
              QUESTION NAVIGATOR
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {MOCK_STATUSES.map((status, i) => {
                const s = i === currentQ ? 'current' : status
                const st = STATUS_STYLE[s]
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentQ(i)}
                    className="h-8 rounded-lg hm-mono text-[11px] font-semibold"
                    style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.color }}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
            <div className="mt-4 flex flex-col gap-1.5">
              {[
                { color: VIOLET, label: 'Current' },
                { color: GREEN, label: 'Answered' },
                { color: AMBER, label: 'Flagged' },
                { color: 'var(--hm-text-dim)', label: 'Not answered' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-sm shrink-0"
                    style={{ background: l.color, opacity: 0.7 }}
                  />
                  <span className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="px-4 py-4" style={{ borderTop: '1px solid var(--hm-border)' }}>
            <button
              type="button"
              onClick={() => setShowSubmit(true)}
              className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl text-[13px] font-bold"
              style={{
                background: `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`,
                color: 'white',
                boxShadow: `0 6px 16px -6px ${VIOLET}66`,
              }}
            >
              <Send className="h-4 w-4" /> Submit assessment
            </button>
            <p className="text-[10.5px] text-center mt-2" style={{ color: 'var(--hm-text-dim)' }}>
              {unansweredCount} question{unansweredCount !== 1 ? 's' : ''} unanswered
            </p>
          </div>
        </aside>
      </div>

      {/* Submit confirmation modal */}
      {showSubmit && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-sm"
            style={{
              background: 'var(--hm-bg-card-2)',
              border: '1px solid var(--hm-border-strong)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: 'rgba(244,178,108,0.14)', color: AMBER }}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
              <button type="button" onClick={() => setShowSubmit(false)}>
                <X className="h-5 w-5" style={{ color: 'var(--hm-text-dim)' }} />
              </button>
            </div>
            <h3 className="text-[16px] font-semibold mb-2" style={{ color: 'var(--hm-text)' }}>
              Submit assessment?
            </h3>
            <p
              className="text-[13px] leading-relaxed mb-5"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              You have{' '}
              <span className="font-semibold" style={{ color: AMBER }}>
                {unansweredCount} unanswered
              </span>{' '}
              and{' '}
              <span className="font-semibold" style={{ color: AMBER }}>
                {flaggedCount} flagged
              </span>{' '}
              questions. Once submitted you cannot change your answers.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowSubmit(false)}
                className="flex-1 h-10 rounded-xl text-[13px] font-medium"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-muted)',
                }}
              >
                Go back
              </button>
              <button
                type="button"
                onClick={() => navigate(`/student/assessments/${id}/result`)}
                className="flex-1 h-10 rounded-xl text-[13px] font-bold"
                style={{ background: VIOLET, color: 'white' }}
              >
                Submit now
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentShell>
  )
}
