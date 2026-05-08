import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import CreatorShell from '../_shared/CreatorShell'
import {
  ArrowLeft,
  Save,
  Eye,
  GripVertical,
  Plus,
  Trash2,
  MoreHorizontal,
  CheckCircle2,
  GraduationCap,
  ListChecks,
  ToggleRight,
  CircleCheck,
  PenLine,
  ChevronDown,
  Copy,
  ArrowUp,
  ArrowDown,
  X,
  Settings2,
  BookOpen,
  Clock,
  Hash,
  AlertCircle,
  BarChart2,
  Users as UsersIcon,
  Timer,
  Star,
  type LucideIcon,
} from 'lucide-react'

/* ── tokens ── */
const ACCENT = '#F4B26C'
const ACCENT_DARK = '#1a1208'
const ACCENT_SOFT = 'rgba(244,178,108,0.12)'
const ACCENT_BD = 'rgba(244,178,108,0.28)'
const VIOLET = '#A78BFA'
const GREEN = '#5EE6A8'
const BLUE = '#60A5FA'
const TEAL = '#5BC8C5'
const ROSE = '#F4636E'

type Tone = 'success' | 'warning' | 'danger' | 'info' | 'violet' | 'teal' | 'neutral'
const TBG: Record<Tone, string> = {
  success: 'rgba(94,230,168,0.12)',
  warning: 'rgba(244,178,108,0.14)',
  danger: 'rgba(244,99,110,0.12)',
  info: 'rgba(96,165,250,0.12)',
  violet: 'rgba(167,139,250,0.16)',
  teal: 'rgba(91,200,197,0.14)',
  neutral: 'rgba(139,146,168,0.14)',
}
const TFG: Record<Tone, string> = {
  success: GREEN,
  warning: ACCENT,
  danger: ROSE,
  info: BLUE,
  violet: VIOLET,
  teal: TEAL,
  neutral: '#8B92A8',
}

type QuestionType = 'mcq' | 'true_false' | 'yes_no' | 'subjective'
const QMETA: Record<QuestionType, { Icon: LucideIcon; tone: Tone; labelKey: string }> = {
  mcq: { Icon: ListChecks, tone: 'info', labelKey: 'studentShell.qtMcq' },
  true_false: { Icon: ToggleRight, tone: 'teal', labelKey: 'studentShell.qtTrueFalse' },
  yes_no: { Icon: CircleCheck, tone: 'success', labelKey: 'studentShell.qtYesNo' },
  subjective: { Icon: PenLine, tone: 'violet', labelKey: 'studentShell.qtSubjective' },
}

/* ── data ── */
interface Opt {
  id: string
  text: string
  correct: boolean
}
interface Question {
  id: string
  sort: number
  type: QuestionType
  prompt: string
  marks: number
  answerType: 'single' | 'multiple' | 'open'
  explanation: string
  options: Opt[]
}

const INIT_QUESTIONS: Question[] = [
  {
    id: 'q-01',
    sort: 1,
    type: 'mcq',
    marks: 8,
    answerType: 'single',
    prompt: 'Which pigment is classified as transparent and will not lift once fully dried?',
    explanation:
      'Phthalo Blue (PB15) is highly staining and bonds permanently to paper fibres — unlike Ultramarine or Cerulean it cannot be lifted even when rewet.',
    options: [
      { id: 'o-01a', text: 'Ultramarine Blue', correct: false },
      { id: 'o-01b', text: 'Phthalo Blue (PB15)', correct: true },
      { id: 'o-01c', text: 'Cerulean Blue', correct: false },
      { id: 'o-01d', text: 'Manganese Blue', correct: false },
    ],
  },
  {
    id: 'q-02',
    sort: 2,
    type: 'true_false',
    marks: 5,
    answerType: 'single',
    prompt:
      'Wet-on-wet technique requires the paper to be completely dry before each layer of paint is applied.',
    explanation:
      'False. Wet-on-wet deliberately applies paint to a wet or damp surface, creating soft diffused edges. Applying to dry paper is wet-on-dry.',
    options: [
      { id: 'o-02a', text: 'True', correct: false },
      { id: 'o-02b', text: 'False', correct: true },
    ],
  },
  {
    id: 'q-03',
    sort: 3,
    type: 'mcq',
    marks: 8,
    answerType: 'single',
    prompt: 'What is the primary difference between cold press and hot press watercolor paper?',
    explanation:
      "Cold press has a textured 'Not' surface that creates natural granulation. Hot press is smooth — better for detail work but less forgiving for washes.",
    options: [
      { id: 'o-03a', text: 'Cold press is thicker and more absorbent', correct: false },
      {
        id: 'o-03b',
        text: 'Cold press has a textured surface; hot press is smooth',
        correct: true,
      },
      { id: 'o-03c', text: 'Hot press holds more water and dries slower', correct: false },
      { id: 'o-03d', text: 'Cold press is only suitable for gouache', correct: false },
    ],
  },
  {
    id: 'q-04',
    sort: 4,
    type: 'yes_no',
    marks: 5,
    answerType: 'single',
    prompt:
      'Can you fully lift a staining pigment (e.g. Phthalo Green) after it has dried for 24 hours?',
    explanation:
      'No. Staining pigments penetrate paper fibres permanently. They can be lightened by gentle scrubbing but never fully lifted.',
    options: [
      { id: 'o-04a', text: 'Yes', correct: false },
      { id: 'o-04b', text: 'No', correct: true },
    ],
  },
  {
    id: 'q-05',
    sort: 5,
    type: 'mcq',
    marks: 7,
    answerType: 'multiple',
    prompt:
      'Which two conditions produce the most vibrant secondary color when mixing transparent primaries? (Select all that apply.)',
    explanation:
      'Both pigments must be transparent so light passes through both layers, and mixing should be done wet-into-wet so they fuse optically.',
    options: [
      { id: 'o-05a', text: 'Both pigments are transparent', correct: true },
      { id: 'o-05b', text: 'Mixing is done wet-into-wet on the palette', correct: true },
      { id: 'o-05c', text: 'A white base coat is applied first', correct: false },
      { id: 'o-05d', text: 'The paper is pre-stretched to 300 gsm', correct: false },
    ],
  },
  {
    id: 'q-06',
    sort: 6,
    type: 'subjective',
    marks: 8,
    answerType: 'open',
    prompt:
      'Describe, step by step, how you would paint a smooth flat wash across a full sheet of cold press paper. Include brush selection, paper angle, and how you manage the bead of paint.',
    explanation:
      "Mix a generous pool of color first, tilt the board 10–15°, load a round or wash brush, stroke left-to-right picking up the bead each pass, don't go back over drying edges, blot the bead at the bottom with a dry brush.",
    options: [],
  },
]

const ASSESSMENT = {
  title: 'Watercolor Foundations — Final',
  id: 'as-01',
  status: 'published',
  difficulty: 'beginner',
  linked_course: 'Watercolor Foundations',
  skill: 'Arts & Crafts',
  passing_score: 70,
  time_limit_min: 30,
  max_attempts: 3,
  description:
    'A 6-question final assessment covering pigment theory, wash techniques, paper selection and color mixing. Required to earn the Watercolor Foundations certificate.',
  pre_instructions:
    'Read each question carefully. You have 30 minutes and 3 attempts. Your highest score counts. Show all reasoning for subjective questions.',
  submissions: 3840,
  pass_rate: 81,
  avg_score: 78,
  avg_time_sec: 22 * 60 + 14,
}

/* ── shared primitives ── */
function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full hm-mono text-[9.5px] font-bold tracking-[0.08em]"
      style={{ background: TBG[tone], color: TFG[tone], border: `1px solid ${TFG[tone]}22` }}
    >
      {children}
    </span>
  )
}

function TI({
  label,
  value,
  type = 'text',
  wide,
}: {
  label: string
  value?: string | number
  type?: string
  wide?: boolean
}) {
  return (
    <label className={wide ? 'col-span-2' : ''}>
      <p
        className="hm-mono text-[9.5px] mb-1.5 font-bold"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
      >
        {label.toUpperCase()}
      </p>
      <input
        type={type}
        defaultValue={value}
        className="w-full px-3 h-9 rounded-lg text-[12.5px] outline-none"
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border)',
          color: 'var(--hm-text)',
        }}
      />
    </label>
  )
}

function TA({ label, value, rows = 3 }: { label: string; value?: string; rows?: number }) {
  return (
    <label className="col-span-2">
      <p
        className="hm-mono text-[9.5px] mb-1.5 font-bold"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
      >
        {label.toUpperCase()}
      </p>
      <textarea
        defaultValue={value}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg text-[12.5px] outline-none resize-none"
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border)',
          color: 'var(--hm-text)',
          lineHeight: 1.6,
        }}
      />
    </label>
  )
}

function Sel({ label, value, options }: { label: string; value?: string; options: string[] }) {
  return (
    <label>
      <p
        className="hm-mono text-[9.5px] mb-1.5 font-bold"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
      >
        {label.toUpperCase()}
      </p>
      <div className="relative">
        <select
          defaultValue={value}
          className="w-full appearance-none px-3 pr-8 h-9 rounded-lg text-[12.5px] outline-none"
          style={{
            background: 'var(--hm-bg-card-2)',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text)',
          }}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
          style={{ color: 'var(--hm-text-dim)' }}
        />
      </div>
    </label>
  )
}

/* ══════════════════════════════════════════════════════════════════
 * DETAILS PANEL
 * ══════════════════════════════════════════════════════════════════ */
function DetailsPanel({ questions }: { questions: Question[] }) {
  const { t } = useTranslation()
  const total = questions.reduce((a, q) => a + q.marks, 0)
  function fmtTime(s: number) {
    const m = Math.floor(s / 60)
    return m < 60 ? `${m}m` : `${Math.floor(m / 60)}h ${m % 60}m`
  }

  return (
    <div className="flex-1 overflow-y-auto px-7 py-5">
      {/* ── Assessment overview banner (folded in from prior list-detail screen) ── */}
      <div
        className="hm-card hm-fade-in relative overflow-hidden rounded-2xl mb-5"
        style={{
          background: 'linear-gradient(135deg, var(--hm-bg-card) 0%, var(--hm-bg-card-2) 100%)',
          border: '1px solid var(--hm-border-strong)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${ACCENT}22 0%, transparent 55%), radial-gradient(circle at 0% 100%, rgba(167,139,250,0.16) 0%, transparent 60%)`,
          }}
        />
        <div className="relative flex items-start gap-5 px-6 py-5">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-2xl shrink-0"
            style={{
              background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}cc 100%)`,
              color: '#1a1208',
              boxShadow: `0 12px 30px -10px ${ACCENT}66`,
            }}
          >
            <GraduationCap className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p
              className="hm-mono text-[10px] mb-1"
              style={{ color: ACCENT, letterSpacing: '0.18em' }}
            >
              {t('creatorEdit.assessmentEyebrow')} · #{ASSESSMENT.id.toUpperCase()}
            </p>
            <h2
              className="text-[20px] font-semibold tracking-tight mb-1.5 truncate"
              style={{ color: 'var(--hm-text)', fontFamily: 'var(--hm-font-display)' }}
            >
              {ASSESSMENT.title}
            </h2>
            <div
              className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[12px]"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              <span>{ASSESSMENT.skill}</span>
              <span style={{ color: 'var(--hm-text-dim)' }}>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {t('creatorEdit.questionsStats', {
                  questions: questions.length,
                  points: total,
                  minutes: ASSESSMENT.time_limit_min,
                })}
              </span>
              <span style={{ color: 'var(--hm-text-dim)' }}>·</span>
              <span>
                {t('creatorEdit.linkedTo')}{' '}
                <span style={{ color: 'var(--hm-text)' }}>{ASSESSMENT.linked_course}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <Pill tone="success">{ASSESSMENT.status}</Pill>
              <Pill tone="success">{ASSESSMENT.difficulty}</Pill>
              <span
                className="hm-mono text-[10px] ml-1"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
              >
                {t('creatorEdit.passAttempts', {
                  score: ASSESSMENT.passing_score,
                  attempts: ASSESSMENT.max_attempts,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          {
            Icon: UsersIcon,
            val: ASSESSMENT.submissions.toLocaleString(),
            labelKey: 'studentShell.statSubmissions',
            color: VIOLET,
          },
          {
            Icon: BarChart2,
            val: `${ASSESSMENT.pass_rate}%`,
            labelKey: 'studentShell.statPassRate',
            color: GREEN,
          },
          {
            Icon: Star,
            val: `${ASSESSMENT.avg_score}%`,
            labelKey: 'studentShell.statAvgScore',
            color: ACCENT,
          },
          {
            Icon: Timer,
            val: fmtTime(ASSESSMENT.avg_time_sec),
            labelKey: 'studentShell.statAvgTime',
            color: TEAL,
          },
        ].map(({ Icon, val, labelKey, color }) => (
          <div
            key={labelKey}
            className="rounded-xl px-4 py-3"
            style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className="h-3 w-3" style={{ color }} />
              <span
                className="hm-mono text-[8.5px]"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
              >
                {t(labelKey).toUpperCase()}
              </span>
            </div>
            <p
              className="hm-mono text-[18px] font-bold leading-none"
              style={{ color: 'var(--hm-text)' }}
            >
              {val}
            </p>
          </div>
        ))}
      </div>

      {/* Basic info */}
      <div
        className="rounded-2xl overflow-hidden mb-4"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <Settings2 className="h-3.5 w-3.5" style={{ color: ACCENT }} />
          <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            {t('creatorEdit.sectionBasicInfo')}
          </p>
        </div>
        <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-3.5">
          <TI label={t('creatorEdit.fieldAssessmentTitle')} value={ASSESSMENT.title} wide />
          <TA label={t('creatorEdit.fieldDescription')} value={ASSESSMENT.description} />
          <Sel
            label={t('creatorEdit.fieldStatus')}
            value="Published"
            options={['Draft', 'In review', 'Calibrated', 'Published', 'Archived']}
          />
          <Sel
            label={t('creatorEdit.fieldDifficulty')}
            value="Beginner"
            options={['Beginner', 'Intermediate', 'Advanced']}
          />
          <TI label={t('creatorEdit.fieldLinkedCourse')} value={ASSESSMENT.linked_course} />
          <TI label={t('creatorEdit.fieldSkillCategory')} value={ASSESSMENT.skill} />
        </div>
      </div>

      {/* Rules */}
      <div
        className="rounded-2xl overflow-hidden mb-4"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <Clock className="h-3.5 w-3.5" style={{ color: TEAL }} />
          <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            {t('creatorEdit.sectionRulesLimits')}
          </p>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
              {t('creatorEdit.totalMarksLabel')}
            </span>
            <span className="hm-mono text-[13px] font-bold" style={{ color: ACCENT }}>
              {total} {t('creatorEdit.pointsSuffix')}
            </span>
          </div>
        </div>
        <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-3.5">
          <TI
            label={t('creatorEdit.fieldTimeLimit')}
            value={ASSESSMENT.time_limit_min}
            type="number"
          />
          <TI
            label={t('creatorEdit.fieldPassingScore')}
            value={ASSESSMENT.passing_score}
            type="number"
          />
          <TI
            label={t('creatorEdit.fieldMaxAttempts')}
            value={ASSESSMENT.max_attempts}
            type="number"
          />
          <Sel
            label={t('creatorEdit.fieldAnswerVisibility')}
            value="After all attempts"
            options={['Immediately', 'After passing', 'After all attempts', 'Never']}
          />
        </div>
      </div>

      {/* Pre-instructions */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <AlertCircle className="h-3.5 w-3.5" style={{ color: BLUE }} />
          <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            {t('creatorEdit.sectionPreInstructions')}
          </p>
        </div>
        <div className="px-5 py-4 grid grid-cols-2 gap-x-6">
          <TA
            label={t('creatorEdit.sectionShownToStudents')}
            value={ASSESSMENT.pre_instructions}
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
 * LEFT STRIP — quiz question list (PowerPoint thumbnail panel)
 * ══════════════════════════════════════════════════════════════════ */
function LeftStrip({
  questions,
  selectedId,
  onSelect,
  onAdd,
  onMove,
  onDuplicate,
  onDelete,
}: {
  questions: Question[]
  selectedId: string
  onSelect: (id: string) => void
  onAdd: () => void
  onMove: (id: string, dir: 'up' | 'down') => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  return (
    <div
      className="flex flex-col h-full overflow-hidden shrink-0"
      style={{ width: 220, background: 'var(--hm-bg)', borderRight: '1px solid var(--hm-border)' }}
    >
      {/* Strip header */}
      <div
        className="flex items-center justify-between px-3 py-2.5 shrink-0"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <span
          className="hm-mono text-[9.5px] font-bold"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          {t('creatorEdit.questionsCount', { count: questions.length })}
        </span>
        <button
          type="button"
          onClick={onAdd}
          className="flex h-6 w-6 items-center justify-center rounded-md"
          style={{ background: ACCENT_SOFT, color: ACCENT }}
          title={t('creatorEdit.addQuestion')}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto py-1.5 px-2 flex flex-col gap-1">
        {questions.map((q, idx) => {
          const meta = QMETA[q.type]
          const selected = q.id === selectedId
          return (
            <div key={q.id} className="relative group">
              <button
                type="button"
                onClick={() => {
                  onSelect(q.id)
                  setMenuOpen(null)
                }}
                className="w-full flex items-start gap-2 px-2.5 py-2.5 rounded-xl text-left transition-all"
                style={{
                  background: selected ? ACCENT_SOFT : 'transparent',
                  border: `1.5px solid ${selected ? ACCENT_BD : 'transparent'}`,
                }}
              >
                {/* Drag handle */}
                <GripVertical
                  className="h-3.5 w-3.5 mt-0.5 shrink-0 opacity-40"
                  style={{ color: 'var(--hm-text-dim)' }}
                />

                {/* Number + type icon */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span
                    className="hm-mono text-[9px] font-bold"
                    style={{ color: selected ? ACCENT : 'var(--hm-text-dim)' }}
                  >
                    Q{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded"
                    style={{ background: TBG[meta.tone], color: TFG[meta.tone] }}
                  >
                    <meta.Icon className="h-3 w-3" />
                  </span>
                </div>

                {/* Prompt preview */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[11.5px] font-medium leading-snug line-clamp-2"
                    style={{ color: selected ? 'var(--hm-text)' : 'var(--hm-text-muted)' }}
                  >
                    {q.prompt}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="hm-mono text-[9px]" style={{ color: TFG[meta.tone] }}>
                      {t(meta.labelKey).split(' ')[0].toUpperCase()}
                    </span>
                    <span style={{ color: 'var(--hm-text-dim)' }}>·</span>
                    <span className="hm-mono text-[9px]" style={{ color: 'var(--hm-text-dim)' }}>
                      {q.marks}pts
                    </span>
                  </div>
                </div>
              </button>

              {/* 3-dot context menu trigger */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen(menuOpen === q.id ? null : q.id)
                }}
                className="absolute top-2 right-1 flex h-5 w-5 items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'var(--hm-bg-card-2)', color: 'var(--hm-text-dim)' }}
              >
                <MoreHorizontal className="h-3 w-3" />
              </button>

              {/* Context menu */}
              {menuOpen === q.id && (
                <div
                  className="absolute right-0 top-7 z-50 rounded-xl overflow-hidden shadow-xl min-w-[148px]"
                  style={{
                    background: 'var(--hm-bg-card)',
                    border: '1px solid var(--hm-border-strong)',
                  }}
                >
                  {[
                    {
                      Icon: ArrowUp,
                      label: t('studentShell.menuMoveUp'),
                      fn: () => {
                        onMove(q.id, 'up')
                        setMenuOpen(null)
                      },
                    },
                    {
                      Icon: ArrowDown,
                      label: t('studentShell.menuMoveDown'),
                      fn: () => {
                        onMove(q.id, 'down')
                        setMenuOpen(null)
                      },
                    },
                    {
                      Icon: Copy,
                      label: t('studentShell.menuDuplicate'),
                      fn: () => {
                        onDuplicate(q.id)
                        setMenuOpen(null)
                      },
                    },
                  ].map(({ Icon, label, fn }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={fn}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px]"
                      style={{ color: 'var(--hm-text-muted)' }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = 'var(--hm-bg-card-2)')
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </button>
                  ))}
                  <div style={{ borderTop: '1px solid var(--hm-border)' }}>
                    <button
                      type="button"
                      onClick={() => {
                        onDelete(q.id)
                        setMenuOpen(null)
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px]"
                      style={{ color: ROSE }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = 'rgba(244,99,110,0.08)')
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add question footer */}
      <div className="shrink-0 px-3 py-2.5" style={{ borderTop: '1px solid var(--hm-border)' }}>
        <button
          type="button"
          onClick={onAdd}
          className="w-full flex items-center justify-center gap-1.5 h-8 rounded-lg text-[12px] font-semibold transition-all"
          style={{ background: ACCENT_SOFT, color: ACCENT, border: `1px dashed ${ACCENT_BD}` }}
          onMouseEnter={(e) => (e.currentTarget.style.background = `rgba(244,178,108,0.20)`)}
          onMouseLeave={(e) => (e.currentTarget.style.background = ACCENT_SOFT)}
        >
          <Plus className="h-3.5 w-3.5" /> Add question
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
 * RIGHT PANEL — question editor
 * ══════════════════════════════════════════════════════════════════ */
function QuestionEditor({
  question,
  index,
  total,
  onUpdate,
}: {
  question: Question
  index: number
  total: number
  onUpdate: (id: string, patch: Partial<Question>) => void
}) {
  const { t } = useTranslation()
  const meta = QMETA[question.type]
  const isSubjective = question.type === 'subjective'
  const isTFYN = question.type === 'true_false' || question.type === 'yes_no'

  function setType(qt: QuestionType) {
    let options: Opt[] = question.options
    let answerType = question.answerType
    if (qt === 'true_false') {
      options = [
        { id: 'o-a', text: 'True', correct: false },
        { id: 'o-b', text: 'False', correct: true },
      ]
      answerType = 'single'
    } else if (qt === 'yes_no') {
      options = [
        { id: 'o-a', text: 'Yes', correct: false },
        { id: 'o-b', text: 'No', correct: true },
      ]
      answerType = 'single'
    } else if (qt === 'subjective') {
      options = []
      answerType = 'open'
    } else if (options.length < 2)
      options = [
        { id: 'o-a', text: '', correct: true },
        { id: 'o-b', text: '', correct: false },
        { id: 'o-c', text: '', correct: false },
        { id: 'o-d', text: '', correct: false },
      ]
    onUpdate(question.id, { type: qt, options, answerType })
  }

  function toggleCorrect(optId: string) {
    const opts = question.options.map((o) => ({
      ...o,
      correct:
        question.answerType === 'multiple'
          ? o.id === optId
            ? !o.correct
            : o.correct
          : o.id === optId,
    }))
    onUpdate(question.id, { options: opts })
  }

  function addOption() {
    if (question.options.length >= 6) return
    const id = `o-${Date.now()}`
    onUpdate(question.id, { options: [...question.options, { id, text: '', correct: false }] })
  }

  function removeOption(optId: string) {
    onUpdate(question.id, { options: question.options.filter((o) => o.id !== optId) })
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5">
      {/* Question header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="hm-mono text-[11px] font-bold" style={{ color: 'var(--hm-text-dim)' }}>
            Q{String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ color: 'var(--hm-border-strong)' }}>·</span>
          <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
            {t('creatorEdit.qIndexOfTotal', { index: index + 1, total })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
            {t('creatorEdit.sectionMarks')}
          </span>
          <input
            type="number"
            defaultValue={question.marks}
            min={1}
            max={100}
            className="w-16 px-2 h-7 rounded-lg text-[13px] font-bold text-center outline-none hm-mono"
            style={{
              background: 'var(--hm-bg-card-2)',
              border: `1px solid ${ACCENT_BD}`,
              color: ACCENT,
            }}
          />
        </div>
      </div>

      {/* Type selector */}
      <div className="mb-4">
        <p
          className="hm-mono text-[9.5px] mb-2 font-bold"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          {t('creatorEdit.sectionQuestionType')}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(QMETA) as QuestionType[]).map((qt) => {
            const m = QMETA[qt]
            const active = question.type === qt
            return (
              <button
                key={qt}
                type="button"
                onClick={() => setType(qt)}
                className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all"
                style={{
                  background: active ? TBG[m.tone] : 'var(--hm-bg-card-2)',
                  border: `1.5px solid ${active ? TFG[m.tone] + '55' : 'var(--hm-border)'}`,
                  color: active ? TFG[m.tone] : 'var(--hm-text-dim)',
                }}
              >
                <m.Icon className="h-4 w-4" />
                <span
                  className="hm-mono text-[9px] font-bold text-center leading-tight"
                  style={{ letterSpacing: '0.06em' }}
                >
                  {t(m.labelKey)
                    .split(' ')
                    .map((w, i) => (
                      <span key={i} className="block">
                        {w.toUpperCase()}
                      </span>
                    ))}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Prompt */}
      <div className="mb-4">
        <p
          className="hm-mono text-[9.5px] mb-1.5 font-bold"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          {t('creatorEdit.sectionQuestionPrompt')}
        </p>
        <textarea
          defaultValue={question.prompt}
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl text-[13px] outline-none resize-none"
          style={{
            background: 'var(--hm-bg-card-2)',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text)',
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* Answer type toggle (MCQ only) */}
      {question.type === 'mcq' && (
        <div className="mb-4">
          <p
            className="hm-mono text-[9.5px] mb-1.5 font-bold"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
          >
            {t('creatorEdit.sectionAnswerSelection')}
          </p>
          <div className="flex items-center gap-2">
            {(['single', 'multiple'] as const).map((at) => (
              <button
                key={at}
                type="button"
                onClick={() => onUpdate(question.id, { answerType: at })}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                style={{
                  background: question.answerType === at ? ACCENT_SOFT : 'var(--hm-bg-card-2)',
                  border: `1px solid ${question.answerType === at ? ACCENT_BD : 'var(--hm-border)'}`,
                  color: question.answerType === at ? ACCENT : 'var(--hm-text-dim)',
                }}
              >
                {question.answerType === at ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <span
                    className="h-3.5 w-3.5 rounded-full border shrink-0"
                    style={{ borderColor: 'var(--hm-border-strong)' }}
                  />
                )}
                {at === 'single' ? t('creatorEdit.optionSingle') : t('creatorEdit.optionMultiple')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Options editor */}
      {!isSubjective && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p
              className="hm-mono text-[9.5px] font-bold"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
            >
              {t('creatorEdit.sectionOptions')}
              {isTFYN && (
                <span
                  className="ml-2 text-[8.5px] normal-case font-normal"
                  style={{ color: 'var(--hm-text-dim)' }}
                >
                  {t('creatorEdit.fixedForType')}
                </span>
              )}
            </p>
            {!isTFYN && question.options.length < 6 && (
              <button
                type="button"
                onClick={addOption}
                className="inline-flex items-center gap-1 text-[11px] font-semibold"
                style={{ color: ACCENT }}
              >
                <Plus className="h-3 w-3" /> {t('creatorEdit.addOption')}
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {question.options.map((opt, oi) => {
              const letter = String.fromCharCode(65 + oi)
              return (
                <div
                  key={opt.id}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 group"
                  style={{
                    background: opt.correct ? 'rgba(94,230,168,0.07)' : 'var(--hm-bg-card-2)',
                    border: `1.5px solid ${opt.correct ? 'rgba(94,230,168,0.30)' : 'var(--hm-border)'}`,
                  }}
                >
                  {/* Drag handle */}
                  {!isTFYN && (
                    <GripVertical
                      className="h-3.5 w-3.5 shrink-0 opacity-30"
                      style={{ color: 'var(--hm-text-dim)' }}
                    />
                  )}

                  {/* Letter badge */}
                  <span
                    className="hm-mono text-[10px] font-bold shrink-0 h-5 w-5 flex items-center justify-center rounded"
                    style={{
                      background: opt.correct ? 'rgba(94,230,168,0.15)' : TBG[meta.tone],
                      color: opt.correct ? GREEN : TFG[meta.tone],
                    }}
                  >
                    {letter}
                  </span>

                  {/* Text input */}
                  {isTFYN ? (
                    <span
                      className="flex-1 text-[13px] font-medium"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {opt.text}
                    </span>
                  ) : (
                    <input
                      type="text"
                      defaultValue={opt.text}
                      placeholder={t('creatorEdit.optionPlaceholder', { letter })}
                      className="flex-1 bg-transparent outline-none text-[12.5px]"
                      style={{ color: 'var(--hm-text)' }}
                    />
                  )}

                  {/* Correct toggle */}
                  <button
                    type="button"
                    onClick={() => toggleCorrect(opt.id)}
                    className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold hm-mono transition-all"
                    style={{
                      background: opt.correct ? 'rgba(94,230,168,0.15)' : 'var(--hm-bg-card)',
                      color: opt.correct ? GREEN : 'var(--hm-text-dim)',
                      border: `1px solid ${opt.correct ? 'rgba(94,230,168,0.35)' : 'var(--hm-border)'}`,
                    }}
                  >
                    {opt.correct ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <span
                        className="h-3 w-3 rounded-full border"
                        style={{ borderColor: 'var(--hm-border-strong)' }}
                      />
                    )}
                    {opt.correct ? t('creatorEdit.correct') : t('creatorEdit.mark')}
                  </button>

                  {/* Delete button — hidden for T/F, Y/N */}
                  {!isTFYN && question.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(opt.id)}
                      className="flex h-6 w-6 items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      style={{ color: ROSE }}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Subjective notice */}
      {isSubjective && (
        <div
          className="flex items-start gap-3 rounded-xl px-4 py-3.5 mb-4"
          style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT_BD}` }}
        >
          <PenLine className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
          <div>
            <p
              className="hm-mono text-[9.5px] mb-0.5"
              style={{ color: ACCENT, letterSpacing: '0.10em' }}
            >
              {t('creatorEdit.openSubjectiveNotice')}
            </p>
            <p className="text-[12px]" style={{ color: 'var(--hm-text-muted)' }}>
              {t('creatorEdit.openSubjectiveBody')}
            </p>
          </div>
        </div>
      )}

      {/* Explanation / rubric */}
      <div className="mb-4">
        <p
          className="hm-mono text-[9.5px] mb-1.5 font-bold"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          {isSubjective
            ? t('creatorEdit.sectionModelAnswer')
            : t('creatorEdit.sectionExplanationAfter')}
        </p>
        <textarea
          defaultValue={question.explanation}
          rows={isSubjective ? 5 : 3}
          className="w-full px-3 py-2.5 rounded-xl text-[12.5px] outline-none resize-none"
          style={{
            background: 'var(--hm-bg-card-2)',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text)',
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* Per-question settings */}
      <div
        className="rounded-xl px-4 py-3"
        style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
      >
        <p
          className="hm-mono text-[9.5px] mb-3 font-bold"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          {t('creatorEdit.sectionQuestionSettings')}
        </p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-3">
          <label>
            <p
              className="hm-mono text-[9px] mb-1"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
            >
              {t('creatorEdit.settingMarkValue')}
            </p>
            <input
              type="number"
              defaultValue={question.marks}
              min={1}
              className="w-full px-2.5 h-8 rounded-lg text-[12.5px] outline-none hm-mono"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
              }}
            />
          </label>
          <label>
            <p
              className="hm-mono text-[9px] mb-1"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
            >
              {t('creatorEdit.settingShuffle')}
            </p>
            <div className="relative">
              <select
                className="w-full appearance-none px-2.5 pr-8 h-8 rounded-lg text-[12.5px] outline-none"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                }}
              >
                <option>{t('creatorEdit.shuffleYes')}</option>
                <option>{t('creatorEdit.shuffleNo')}</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                style={{ color: 'var(--hm-text-dim)' }}
              />
            </div>
          </label>
          <label>
            <p
              className="hm-mono text-[9px] mb-1"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
            >
              {t('creatorEdit.settingPartial')}
            </p>
            <div className="relative">
              <select
                className="w-full appearance-none px-2.5 pr-8 h-8 rounded-lg text-[12.5px] outline-none"
                defaultValue={question.answerType === 'multiple' ? 'Proportional' : 'Off'}
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                }}
              >
                <option>{t('creatorEdit.scoringOff')}</option>
                <option>{t('creatorEdit.scoringProportional')}</option>
                <option>{t('creatorEdit.scoringAllOrNothing')}</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                style={{ color: 'var(--hm-text-dim)' }}
              />
            </div>
          </label>
          <label>
            <p
              className="hm-mono text-[9px] mb-1"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
            >
              {t('creatorEdit.settingRequired')}
            </p>
            <div className="relative">
              <select
                className="w-full appearance-none px-2.5 pr-8 h-8 rounded-lg text-[12.5px] outline-none"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                }}
              >
                <option>{t('creatorEdit.requiredYes')}</option>
                <option>{t('creatorEdit.requiredNo')}</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                style={{ color: 'var(--hm-text-dim)' }}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
 * MAIN EXPORT
 * ══════════════════════════════════════════════════════════════════ */
type Mode = 'details' | 'quiz'

export default function CreatorAssessmentDetail() {
  const { t } = useTranslation()
  const [mode, setMode] = useState<Mode>('quiz')
  const [questions, setQuestions] = useState<Question[]>(INIT_QUESTIONS)
  const [selectedId, setSelectedId] = useState<string>('q-01')

  const totalMarks = questions.reduce((a, q) => a + q.marks, 0)
  const selectedIdx = questions.findIndex((q) => q.id === selectedId)
  const selectedQ = questions[selectedIdx]

  /* mutation helpers */
  function addQuestion() {
    const id = `q-${Date.now()}`
    const newQ: Question = {
      id,
      sort: questions.length + 1,
      type: 'mcq',
      marks: 5,
      answerType: 'single',
      prompt: 'New question…',
      explanation: '',
      options: [
        { id: `${id}-a`, text: '', correct: true },
        { id: `${id}-b`, text: '', correct: false },
        { id: `${id}-c`, text: '', correct: false },
        { id: `${id}-d`, text: '', correct: false },
      ],
    }
    setQuestions((prev) => [...prev, newQ])
    setSelectedId(id)
  }

  function updateQuestion(id: string, patch: Partial<Question>) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)))
  }

  function moveQuestion(id: string, dir: 'up' | 'down') {
    setQuestions((prev) => {
      const idx = prev.findIndex((q) => q.id === id)
      if (dir === 'up' && idx === 0) return prev
      if (dir === 'down' && idx === prev.length - 1) return prev
      const next = [...prev]
      const swap = dir === 'up' ? idx - 1 : idx + 1
      ;[next[idx], next[swap]] = [next[swap], next[idx]]
      return next
    })
  }

  function duplicateQuestion(id: string) {
    const src = questions.find((q) => q.id === id)
    if (!src) return
    const newId = `q-${Date.now()}`
    const dup: Question = {
      ...src,
      id: newId,
      sort: questions.length + 1,
      options: src.options.map((o) => ({ ...o, id: `${newId}-${o.id}` })),
      prompt: src.prompt + ' (copy)',
    }
    const idx = questions.findIndex((q) => q.id === id)
    setQuestions((prev) => [...prev.slice(0, idx + 1), dup, ...prev.slice(idx + 1)])
    setSelectedId(newId)
  }

  function deleteQuestion(id: string) {
    if (questions.length <= 1) return
    const idx = questions.findIndex((q) => q.id === id)
    const next = questions.filter((q) => q.id !== id)
    setQuestions(next)
    setSelectedId(next[Math.max(0, idx - 1)].id)
  }

  return (
    <CreatorShell activeId="assessments">
      {/* ── negative-margin bleed so panels fill full height ── */}
      <div className="-mx-8 -my-6 flex flex-col" style={{ height: 'calc(100vh - 57px)' }}>
        {/* ── Top bar ── */}
        <div
          className="flex items-center gap-3 px-5 shrink-0 h-11"
          style={{
            background: 'var(--hm-bg-card)',
            borderBottom: '1px solid var(--hm-border-strong)',
          }}
        >
          <button
            type="button"
            className="inline-flex items-center gap-1.5 hm-mono text-[10px] hover:opacity-80 shrink-0"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {t('creatorEdit.breadcrumbAssessments')}
          </button>
          <span style={{ color: 'var(--hm-border-strong)' }}>/</span>

          {/* Title */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <GraduationCap className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            <span
              className="text-[13px] font-semibold truncate"
              style={{ color: 'var(--hm-text)' }}
            >
              {ASSESSMENT.title}
            </span>
            <Pill tone="success">{t('creatorEdit.published')}</Pill>
            <Pill tone="warning">{t('creatorEdit.beginner')}</Pill>
          </div>

          {/* Mode toggle */}
          <div
            className="flex items-center rounded-lg p-0.5 shrink-0"
            style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
          >
            {(['details', 'quiz'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className="flex items-center gap-1.5 px-3 h-7 rounded-md text-[12px] font-semibold transition-all"
                style={{
                  background: mode === m ? ACCENT_SOFT : 'transparent',
                  color: mode === m ? ACCENT : 'var(--hm-text-dim)',
                  border: `1px solid ${mode === m ? ACCENT_BD : 'transparent'}`,
                }}
              >
                {m === 'details' ? (
                  <Settings2 className="h-3.5 w-3.5" />
                ) : (
                  <BookOpen className="h-3.5 w-3.5" />
                )}
                {m === 'details' ? t('creatorEdit.tabDetails') : t('creatorEdit.tabQuiz')}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            {mode === 'quiz' && (
              <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                {t('creatorEdit.statsShort', { questions: questions.length, points: totalMarks })}
              </span>
            )}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-[12px] font-semibold"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              <Eye className="h-3.5 w-3.5" /> {t('creatorEdit.btnPreview')}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-bold"
              style={{
                background: `linear-gradient(135deg,${ACCENT} 0%,#e8955a 100%)`,
                color: ACCENT_DARK,
                boxShadow: `0 4px 14px -4px ${ACCENT}55`,
              }}
            >
              <Save className="h-3.5 w-3.5" /> {t('creatorEdit.btnSaveChanges')}
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        {mode === 'details' ? (
          /* Details mode — full-width scrollable form */
          <div className="flex-1 overflow-hidden flex">
            <DetailsPanel questions={questions} />
          </div>
        ) : (
          /* Quiz mode — left strip + right editor */
          <div className="flex-1 overflow-hidden flex">
            <LeftStrip
              questions={questions}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onAdd={addQuestion}
              onMove={moveQuestion}
              onDuplicate={duplicateQuestion}
              onDelete={deleteQuestion}
            />
            {/* Right panel */}
            <div
              className="flex-1 overflow-hidden flex flex-col"
              style={{ background: 'var(--hm-bg)' }}
            >
              {/* Right header */}
              <div
                className="flex items-center gap-3 px-6 py-3 shrink-0"
                style={{
                  borderBottom: '1px solid var(--hm-border)',
                  background: 'var(--hm-bg-card)',
                }}
              >
                {selectedQ &&
                  (() => {
                    const m = QMETA[selectedQ.type]
                    return (
                      <>
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                          style={{ background: TBG[m.tone], color: TFG[m.tone] }}
                        >
                          <m.Icon className="h-4 w-4" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-[13px] font-semibold truncate"
                            style={{ color: 'var(--hm-text)' }}
                          >
                            {t('creatorEdit.questionLabel')} {selectedIdx + 1}
                          </p>
                          <p
                            className="hm-mono text-[9.5px] mt-0.5"
                            style={{ color: TFG[m.tone], letterSpacing: '0.08em' }}
                          >
                            {t(m.labelKey).toUpperCase()}
                            {selectedQ.answerType === 'multiple' &&
                              ` · ${t('creatorEdit.multiSelect')}`}
                            {selectedQ.answerType === 'open' &&
                              ` · ${t('creatorEdit.gradedManually')}`}
                          </p>
                        </div>
                        {/* Quick nav */}
                        <button
                          type="button"
                          disabled={selectedIdx === 0}
                          onClick={() => setSelectedId(questions[selectedIdx - 1].id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg disabled:opacity-30"
                          style={{ background: 'var(--hm-bg-card-2)', color: 'var(--hm-text-dim)' }}
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={selectedIdx === questions.length - 1}
                          onClick={() => setSelectedId(questions[selectedIdx + 1].id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg disabled:opacity-30"
                          style={{ background: 'var(--hm-bg-card-2)', color: 'var(--hm-text-dim)' }}
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteQuestion(selectedQ.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg"
                          style={{ background: 'rgba(244,99,110,0.10)', color: ROSE }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )
                  })()}
              </div>
              {/* Editor scroll area */}
              {selectedQ && (
                <QuestionEditor
                  key={selectedQ.id}
                  question={selectedQ}
                  index={selectedIdx}
                  total={questions.length}
                  onUpdate={updateQuestion}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </CreatorShell>
  )
}
