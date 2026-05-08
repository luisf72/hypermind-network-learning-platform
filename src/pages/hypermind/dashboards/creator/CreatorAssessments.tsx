import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FilterSelect } from '../_shared/FilterSelect'
import CreatorShell from '../_shared/CreatorShell'
import {
  Plus,
  Search,
  GraduationCap,
  GripVertical,
  ListChecks,
  ToggleRight,
  CircleCheck,
  PenLine,
  ArrowLeft,
  Save,
  X,
  MoreHorizontal,
  Star,
  Users as UsersIcon,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronRight,
  Trash2,
  Pencil,
  CheckCircle2,
  Circle,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react'

/* ──────────────────────────────────────────────────────────────────────
 * CreatorAssessments — combined list + detail view for the creator's
 * own assessments. Driven by local state so a row click on the list
 * switches the inner view to the detail screen for that assessment.
 * Modals handle add/edit for assessments and questions (with type-
 * specific fields per `question_type`).
 *
 * Schema basis: assessments · assessment_questions · assessment_options
 * · assessment_evaluators · assessment_submissions
 * · assessment_submission_answers.
 * ──────────────────────────────────────────────────────────────────── */

const ACCENT = '#F4B26C' // creator amber
const ACCENT_DARK = '#1a1208'
const ACCENT_SOFT = 'rgba(244,178,108,0.12)'
const ROSE = '#F4636E'

/* ── Tones ──────────────────────────────────────────────────────── */
type Tone = 'success' | 'warning' | 'danger' | 'info' | 'violet' | 'teal' | 'neutral'
const TONE_BG: Record<Tone, string> = {
  success: 'rgba(94,230,168,0.12)',
  warning: 'rgba(244,178,108,0.14)',
  danger: 'rgba(244,99,110,0.12)',
  info: 'rgba(96,165,250,0.12)',
  violet: 'rgba(167,139,250,0.16)',
  teal: 'rgba(91,200,197,0.14)',
  neutral: 'rgba(139,146,168,0.14)',
}
const TONE_FG: Record<Tone, string> = {
  success: '#5EE6A8',
  warning: '#F4B26C',
  danger: '#F4636E',
  info: '#60A5FA',
  violet: '#A78BFA',
  teal: '#5BC8C5',
  neutral: '#8B92A8',
}

/* ── Status / type helpers ──────────────────────────────────────── */
type AssessmentStatus = 'draft' | 'review' | 'calibrated' | 'published' | 'archived'
type AssessmentType = 'lesson_quiz' | 'course_final' | 'standalone'
type QuestionType = 'mcq' | 'true_false' | 'yes_no' | 'subjective'
type AnswerType = 'single' | 'multiple' | null
type SubmissionStatus = 'in_progress' | 'submitted' | 'evaluated'

const STATUS_TONE: Record<AssessmentStatus, Tone> = {
  draft: 'warning',
  review: 'violet',
  calibrated: 'info',
  published: 'success',
  archived: 'neutral',
}
const TYPE_TONE: Record<AssessmentType, Tone> = {
  lesson_quiz: 'info',
  course_final: 'violet',
  standalone: 'warning',
}
const TYPE_LABEL_KEY: Record<AssessmentType, string> = {
  lesson_quiz: 'studentShell.typeLessonQuiz',
  course_final: 'studentShell.typeCourseFinal',
  standalone: 'studentShell.typeStandalone',
}
const QUESTION_META: Record<QuestionType, { Icon: LucideIcon; tone: Tone; labelKey: string }> = {
  mcq: { Icon: ListChecks, tone: 'violet', labelKey: 'studentShell.qtMcq' },
  true_false: { Icon: ToggleRight, tone: 'info', labelKey: 'studentShell.qtTrueFalse' },
  yes_no: { Icon: CircleCheck, tone: 'teal', labelKey: 'studentShell.qtYesNo' },
  subjective: { Icon: PenLine, tone: 'warning', labelKey: 'studentShell.qtSubjective' },
}
const SUBMISSION_TONE: Record<SubmissionStatus, Tone> = {
  in_progress: 'warning',
  submitted: 'info',
  evaluated: 'success',
}

/* ──────────────────────────────────────────────────────────────────────
 * DEMO DATA
 * ──────────────────────────────────────────────────────────────────── */

interface AssessmentRow {
  id: string
  title: string
  assessment_type: AssessmentType
  skill_category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  status: AssessmentStatus
  questions: number
  passing_score: number // %
  time_limit_seconds: number
  duration_seconds: number // avg time taken
  max_attempts: number
  submissions: number
  pass_rate: number | null // % — null when none
  updated: string
}

const ASSESSMENTS: AssessmentRow[] = [
  {
    id: 'as-01',
    title: 'Watercolor Foundations — Final',
    assessment_type: 'course_final',
    skill_category: 'Arts & Crafts',
    difficulty: 'beginner',
    status: 'published',
    questions: 24,
    passing_score: 70,
    time_limit_seconds: 30 * 60,
    duration_seconds: 18 * 60,
    max_attempts: 3,
    submissions: 1240,
    pass_rate: 78,
    updated: '2h ago',
  },
  {
    id: 'as-02',
    title: 'Pigment properties — quick check',
    assessment_type: 'lesson_quiz',
    skill_category: 'Arts & Crafts',
    difficulty: 'beginner',
    status: 'published',
    questions: 8,
    passing_score: 60,
    time_limit_seconds: 5 * 60,
    duration_seconds: 3 * 60,
    max_attempts: 5,
    submissions: 4820,
    pass_rate: 92,
    updated: '2h ago',
  },
  {
    id: 'as-03',
    title: 'Color choice exercises',
    assessment_type: 'lesson_quiz',
    skill_category: 'Arts & Crafts',
    difficulty: 'intermediate',
    status: 'published',
    questions: 6,
    passing_score: 60,
    time_limit_seconds: 5 * 60,
    duration_seconds: 4 * 60,
    max_attempts: 5,
    submissions: 3140,
    pass_rate: 84,
    updated: '1d ago',
  },
  {
    id: 'as-04',
    title: 'Spanish for Travelers — A1 placement',
    assessment_type: 'standalone',
    skill_category: 'Languages',
    difficulty: 'beginner',
    status: 'published',
    questions: 30,
    passing_score: 65,
    time_limit_seconds: 25 * 60,
    duration_seconds: 14 * 60,
    max_attempts: 2,
    submissions: 6210,
    pass_rate: 71,
    updated: '3d ago',
  },
  {
    id: 'as-05',
    title: 'Acoustic Guitar — chord recognition',
    assessment_type: 'lesson_quiz',
    skill_category: 'Music',
    difficulty: 'intermediate',
    status: 'calibrated',
    questions: 12,
    passing_score: 75,
    time_limit_seconds: 10 * 60,
    duration_seconds: 7 * 60,
    max_attempts: 3,
    submissions: 28,
    pass_rate: null,
    updated: '1w ago',
  },
  {
    id: 'as-06',
    title: 'Personal Finance 101 — Final',
    assessment_type: 'course_final',
    skill_category: 'Finance',
    difficulty: 'beginner',
    status: 'published',
    questions: 20,
    passing_score: 70,
    time_limit_seconds: 25 * 60,
    duration_seconds: 16 * 60,
    max_attempts: 3,
    submissions: 2240,
    pass_rate: 81,
    updated: '1w ago',
  },
  {
    id: 'as-07',
    title: 'Wine Tasting Foundations — Final',
    assessment_type: 'course_final',
    skill_category: 'Lifestyle',
    difficulty: 'beginner',
    status: 'review',
    questions: 18,
    passing_score: 65,
    time_limit_seconds: 20 * 60,
    duration_seconds: 0,
    max_attempts: 3,
    submissions: 0,
    pass_rate: null,
    updated: '2w ago',
  },
  {
    id: 'as-08',
    title: 'Korean N3 Prep — Diagnostic',
    assessment_type: 'standalone',
    skill_category: 'Languages',
    difficulty: 'intermediate',
    status: 'draft',
    questions: 0,
    passing_score: 70,
    time_limit_seconds: 0,
    duration_seconds: 0,
    max_attempts: 3,
    submissions: 0,
    pass_rate: null,
    updated: '3w ago',
  },
]

interface OptionRow {
  id: string
  option_text: string
  is_correct: boolean
}
interface QuestionRow {
  id: string
  sort_order: number
  question_type: QuestionType
  answer_type: AnswerType
  question_text: string
  explanation: string
  marks: number
  options: OptionRow[]
}

/** Watercolor Foundations — Final · 6 representative questions across all types. */
const QUESTIONS: QuestionRow[] = [
  {
    id: 'q-01',
    sort_order: 1,
    question_type: 'mcq',
    answer_type: 'single',
    marks: 2,
    question_text:
      'Which paper texture absorbs the most water and is best suited for loose, wet-on-wet washes?',
    explanation:
      'Rough paper has deep tooth that holds more water and pigment, making it ideal for wet-on-wet techniques where you want pooling and granulation.',
    options: [
      { id: 'o-01a', option_text: 'Hot press', is_correct: false },
      { id: 'o-01b', option_text: 'Cold press', is_correct: false },
      { id: 'o-01c', option_text: 'Rough', is_correct: true },
      { id: 'o-01d', option_text: 'Bristol board', is_correct: false },
    ],
  },
  {
    id: 'q-02',
    sort_order: 2,
    question_type: 'true_false',
    answer_type: null,
    marks: 1,
    question_text: 'Staining pigments can be lifted cleanly off the paper after they have dried.',
    explanation:
      'False — staining pigments bond with paper fibres and leave a residue even after lifting.',
    options: [
      { id: 'o-02a', option_text: 'True', is_correct: false },
      { id: 'o-02b', option_text: 'False', is_correct: true },
    ],
  },
  {
    id: 'q-03',
    sort_order: 3,
    question_type: 'mcq',
    answer_type: 'multiple',
    marks: 3,
    question_text: 'Select all techniques that help control unwanted hard edges in a wet wash.',
    explanation:
      'Tilting the board redirects pooled water; soft-blending with a damp brush feathers edges; reducing paper angle slows runoff.',
    options: [
      { id: 'o-03a', option_text: 'Tilting the board', is_correct: true },
      { id: 'o-03b', option_text: 'Adding more pigment', is_correct: false },
      { id: 'o-03c', option_text: 'Soft-blending with a damp brush', is_correct: true },
      { id: 'o-03d', option_text: 'Drying with a hairdryer', is_correct: false },
      { id: 'o-03e', option_text: 'Reducing the paper angle', is_correct: true },
    ],
  },
  {
    id: 'q-04',
    sort_order: 4,
    question_type: 'yes_no',
    answer_type: null,
    marks: 1,
    question_text: 'Is it generally a good idea to mix more than three pigments in a single wash?',
    explanation:
      'No — mixing four or more pigments tends to mute the result and produces muddy greys.',
    options: [
      { id: 'o-04a', option_text: 'Yes', is_correct: false },
      { id: 'o-04b', option_text: 'No', is_correct: true },
    ],
  },
  {
    id: 'q-05',
    sort_order: 5,
    question_type: 'mcq',
    answer_type: 'single',
    marks: 2,
    question_text: 'What is the main purpose of using a limited palette in a botanical study?',
    explanation:
      'A limited palette unifies the painting and forces you to mix harmonious neutrals from the same parent pigments.',
    options: [
      { id: 'o-05a', option_text: 'To save money on supplies', is_correct: false },
      {
        id: 'o-05b',
        option_text: 'To unify the painting and force harmonious mixes',
        is_correct: true,
      },
      {
        id: 'o-05c',
        option_text: 'Because three colors is the minimum required by the syllabus',
        is_correct: false,
      },
      {
        id: 'o-05d',
        option_text: 'Because student-grade paint comes in sets of three',
        is_correct: false,
      },
    ],
  },
  {
    id: 'q-06',
    sort_order: 6,
    question_type: 'subjective',
    answer_type: null,
    marks: 5,
    question_text:
      "Describe how you would diagnose a botanical study that 'looks muddy' overall — what would you check first, and how would you correct course in the next painting?",
    explanation:
      'Look for: too many pigments per mix, overworking wet areas, insufficient drying between layers, low pigment-to-water ratio, and complementary pairings used as neutrals without intent. Reset by limiting to a 4-color palette, planning value first in a thumbnail, and waiting for layers to fully dry.',
    options: [],
  },
]

interface EvaluatorRow {
  id: string
  name: string
  email: string
  reviewed: number
  added_at: string
}
const EVALUATORS: EvaluatorRow[] = [
  {
    id: 'u-101',
    name: 'Sarah Lin',
    email: 'sarah.lin@hypermind.io',
    reviewed: 320,
    added_at: 'Mar 12, 2026',
  },
  {
    id: 'u-102',
    name: 'Diego Marín',
    email: 'diego.marin@hypermind.io',
    reviewed: 184,
    added_at: 'Mar 28, 2026',
  },
  {
    id: 'u-103',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@hypermind.io',
    reviewed: 42,
    added_at: 'Apr 18, 2026',
  },
]

interface SubmissionRow {
  id: string
  user_name: string
  attempt_number: number
  score: number
  total_marks: number
  status: SubmissionStatus
  submitted_at: string
}
const SUBMISSIONS: SubmissionRow[] = [
  {
    id: 's-01',
    user_name: 'Mei Chen',
    attempt_number: 2,
    score: 13,
    total_marks: 14,
    status: 'evaluated',
    submitted_at: '12 min ago',
  },
  {
    id: 's-02',
    user_name: "Liam O'Brien",
    attempt_number: 1,
    score: 11,
    total_marks: 14,
    status: 'evaluated',
    submitted_at: '48 min ago',
  },
  {
    id: 's-03',
    user_name: 'Aisha Rahman',
    attempt_number: 1,
    score: 0,
    total_marks: 14,
    status: 'submitted',
    submitted_at: '1h ago',
  },
  {
    id: 's-04',
    user_name: 'Daniel Becker',
    attempt_number: 3,
    score: 0,
    total_marks: 14,
    status: 'in_progress',
    submitted_at: '—',
  },
  {
    id: 's-05',
    user_name: 'Camila Ortega',
    attempt_number: 1,
    score: 14,
    total_marks: 14,
    status: 'evaluated',
    submitted_at: '3h ago',
  },
  {
    id: 's-06',
    user_name: 'Tomás Vargas',
    attempt_number: 2,
    score: 9,
    total_marks: 14,
    status: 'evaluated',
    submitted_at: '5h ago',
  },
]

/* ──────────────────────────────────────────────────────────────────────
 * Inline UI primitives (amber-themed) — same vocabulary as CreatorCourses
 * ──────────────────────────────────────────────────────────────────── */

function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className="hm-mono inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold"
      style={{ background: TONE_BG[tone], color: TONE_FG[tone], letterSpacing: '0.06em' }}
    >
      {children}
    </span>
  )
}

function Mono({ children, dim }: { children: ReactNode; dim?: boolean }) {
  return (
    <span
      className="hm-mono text-[11px]"
      style={{
        color: dim ? 'var(--hm-text-dim)' : 'var(--hm-text-muted)',
        letterSpacing: '0.04em',
      }}
    >
      {children}
    </span>
  )
}

function PrimaryButton({
  children,
  Icon,
  onClick,
  type = 'button',
}: {
  children: ReactNode
  Icon?: LucideIcon
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
      style={{
        background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}d9 100%)`,
        color: ACCENT_DARK,
        boxShadow: `0 8px 24px -8px ${ACCENT}66`,
      }}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </button>
  )
}

function GhostButton({
  children,
  Icon,
  onClick,
  danger,
}: {
  children: ReactNode
  Icon?: LucideIcon
  onClick?: () => void
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg text-[12.5px] font-medium"
      style={{
        background: danger ? 'rgba(244,99,110,0.10)' : 'var(--hm-bg-card-2)',
        border: `1px solid ${danger ? 'rgba(244,99,110,0.30)' : 'var(--hm-border)'}`,
        color: danger ? ROSE : 'var(--hm-text-muted)',
      }}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </button>
  )
}

function SectionCard({
  eyebrow,
  title,
  action,
  children,
  padding = 'px-5 py-4',
}: {
  eyebrow?: string
  title: string
  action?: ReactNode
  children: ReactNode
  padding?: string
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
    >
      <div
        className="flex items-center justify-between gap-3 px-5 py-3.5"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <div className="min-w-0">
          {eyebrow && (
            <p
              className="hm-mono text-[9.5px] mb-0.5"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              {eyebrow.toUpperCase()}
            </p>
          )}
          <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            {title}
          </h3>
        </div>
        {action}
      </div>
      <div className={padding}>{children}</div>
    </div>
  )
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      <span
        className="hm-mono text-[10px] block mb-1.5"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
      >
        {label.toUpperCase()}
        {required && <span style={{ color: ACCENT, marginLeft: 4 }}>*</span>}
      </span>
      {children}
      {hint && (
        <p className="text-[11px] mt-1.5" style={{ color: 'var(--hm-text-dim)' }}>
          {hint}
        </p>
      )}
    </label>
  )
}

function TextInput({
  defaultValue,
  placeholder,
  mono,
  type = 'text',
}: {
  defaultValue?: string | number
  placeholder?: string
  mono?: boolean
  type?: string
}) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={`w-full px-3 h-9 rounded-lg text-[12.5px] outline-none ${mono ? 'hm-mono' : ''}`}
      style={{
        background: 'var(--hm-bg-card-2)',
        border: '1px solid var(--hm-border)',
        color: 'var(--hm-text)',
      }}
    />
  )
}

function Textarea({
  defaultValue,
  placeholder,
  rows = 3,
}: {
  defaultValue?: string
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      defaultValue={defaultValue}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 rounded-lg text-[12.5px] outline-none resize-none"
      style={{
        background: 'var(--hm-bg-card-2)',
        border: '1px solid var(--hm-border)',
        color: 'var(--hm-text)',
        lineHeight: 1.5,
      }}
    />
  )
}

function Select({
  defaultValue,
  options,
}: {
  defaultValue?: string
  options: { value: string; label: string }[]
}) {
  return (
    <div className="relative">
      <select
        defaultValue={defaultValue}
        className="w-full appearance-none px-3 pr-9 h-9 rounded-lg text-[12.5px] outline-none"
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border)',
          color: 'var(--hm-text)',
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="h-3.5 w-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--hm-text-dim)' }}
      />
    </div>
  )
}

function Toggle({ defaultChecked = false, label }: { defaultChecked?: boolean; label: string }) {
  const [on, setOn] = useState(defaultChecked)
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className="flex items-center gap-2.5 text-left"
    >
      <span
        className="relative inline-flex shrink-0 items-center w-8 rounded-full transition-colors"
        style={{
          background: on ? ACCENT : 'var(--hm-bg-card-2)',
          border: `1px solid ${on ? ACCENT : 'var(--hm-border-strong)'}`,
          height: 18,
        }}
      >
        <span
          className="absolute h-3 w-3 rounded-full transition-all"
          style={{
            background: on ? ACCENT_DARK : 'var(--hm-text-dim)',
            left: on ? 16 : 2,
          }}
        />
      </span>
      <span className="text-[12px]" style={{ color: 'var(--hm-text)' }}>
        {label}
      </span>
    </button>
  )
}

/* ── Modal shell ─────────────────────────────────────────────────── */

interface ModalProps {
  open: boolean
  onClose: () => void
  eyebrow: string
  title: string
  subtitle?: string
  width?: number
  destructive?: { label: string; onClick?: () => void }
  primary: { label: string; Icon?: LucideIcon; onClick?: () => void }
  children: ReactNode
}
function Modal({
  open,
  onClose,
  eyebrow,
  title,
  subtitle,
  width = 600,
  destructive,
  primary,
  children,
}: ModalProps) {
  const { t } = useTranslation()
  if (!open) return null
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'rgba(8,10,18,0.72)', backdropFilter: 'blur(6px)', zIndex: 200 }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl overflow-hidden flex flex-col"
        style={{
          width,
          maxWidth: '92vw',
          maxHeight: '90vh',
          background: 'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
          border: '1px solid var(--hm-border-strong)',
          boxShadow: `0 30px 80px -10px rgba(0,0,0,0.65), 0 0 0 1px ${ACCENT}14`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-start gap-3 px-5 py-4 shrink-0"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          <div className="min-w-0 flex-1">
            <p
              className="hm-mono text-[10px] mb-1"
              style={{ color: ACCENT, letterSpacing: '0.18em' }}
            >
              {eyebrow.toUpperCase()}
            </p>
            <h3
              className="text-[16px] font-semibold tracking-tight"
              style={{ color: 'var(--hm-text)' }}
            >
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11.5px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('creatorEdit.close')}
            className="flex h-7 w-7 items-center justify-center rounded-md shrink-0"
            style={{
              color: 'var(--hm-text-dim)',
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
            }}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto hm-scroll px-5 py-5">{children}</div>

        <div
          className="flex items-center justify-between gap-3 px-5 py-3.5 shrink-0"
          style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card)' }}
        >
          <div>
            {destructive && (
              <GhostButton Icon={Trash2} danger onClick={destructive.onClick}>
                {destructive.label}
              </GhostButton>
            )}
          </div>
          <div className="flex items-center gap-2">
            <GhostButton onClick={onClose}>{t('creatorEdit.cancel')}</GhostButton>
            <PrimaryButton Icon={primary.Icon ?? Save} onClick={primary.onClick}>
              {primary.label}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * Helpers / option lists
 * ──────────────────────────────────────────────────────────────────── */

function fmtDuration(seconds: number) {
  if (!seconds) return '—'
  if (seconds >= 3600) {
    const h = Math.floor(seconds / 3600)
    const m = Math.round((seconds % 3600) / 60)
    return `${h}h ${m}m`
  }
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return s ? `${m}m ${s}s` : `${m}m`
  }
  return `${seconds}s`
}

const TYPE_OPTIONS = [
  { value: 'lesson_quiz', label: 'Lesson quiz — embedded in a lesson' },
  { value: 'course_final', label: 'Course final — end-of-course exam' },
  { value: 'standalone', label: 'Standalone — separate from any course' },
]
const SKILL_OPTIONS = [
  { value: 'Arts & Crafts', label: 'Arts & Crafts' },
  { value: 'Music', label: 'Music' },
  { value: 'Languages', label: 'Languages' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Wellness', label: 'Wellness' },
]
const DIFFICULTY_OPTIONS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]
const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'Review — under evaluator panel' },
  { value: 'calibrated', label: 'Calibrated — panel-approved' },
  { value: 'published', label: 'Published — live for learners' },
  { value: 'archived', label: 'Archived — read-only' },
]
const QUESTION_TYPE_OPTIONS: { value: QuestionType; label: string }[] = [
  { value: 'mcq', label: 'Multiple choice' },
  { value: 'true_false', label: 'True / False' },
  { value: 'yes_no', label: 'Yes / No' },
  { value: 'subjective', label: 'Subjective' },
]
const ANSWER_TYPE_OPTIONS = [
  { value: 'single', label: 'Single — one correct option' },
  { value: 'multiple', label: 'Multiple — one or more correct options' },
]

/* ──────────────────────────────────────────────────────────────────────
 * LIST VIEW
 * ──────────────────────────────────────────────────────────────────── */

function ListView({
  onOpenDetail,
  onCreate,
  onEdit,
}: {
  onOpenDetail: (id: string) => void
  onCreate: () => void
  onEdit: (row: AssessmentRow) => void
}) {
  const { t } = useTranslation()
  const [typeF, setTypeF] = useState('')
  const [statusF, setStatusF] = useState('')
  const [skillF, setSkillF] = useState('')
  const [difficultyF, setDifficultyF] = useState('')
  const headers = [
    t('creatorList.colAssessment'),
    t('creatorList.colType'),
    t('creatorList.colStatus'),
    t('creatorList.colQuestions'),
    t('creatorList.colPassMark'),
    t('creatorList.colSubmissions'),
    t('creatorList.colPassRate'),
    t('creatorList.colUpdated'),
    '',
  ]
  return (
    <>
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p
            className="hm-mono text-[10.5px] mb-2"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
          >
            {t('creatorList.studio')}
          </p>
          <h1
            className="text-[26px] font-semibold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            {t('creatorList.assessmentsTitle')}
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            {t('creatorList.assessmentsSubtitle')}
          </p>
        </div>
        <PrimaryButton Icon={Plus} onClick={onCreate}>
          {t('creatorList.newAssessment')}
        </PrimaryButton>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[260px] max-w-[420px]">
          <Search
            className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--hm-text-dim)' }}
          />
          <input
            type="text"
            placeholder={t('creatorList.searchAssessments')}
            className="w-full pl-9 pr-3 h-9 rounded-lg text-[12.5px] outline-none"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text)',
            }}
          />
        </div>
        <FilterSelect
          label={t('creatorList.filterType')}
          value={typeF}
          onChange={setTypeF}
          options={TYPE_OPTIONS}
        />
        <FilterSelect
          label={t('creatorList.filterStatus')}
          value={statusF}
          onChange={setStatusF}
          options={STATUS_OPTIONS}
        />
        <FilterSelect
          label={t('creatorList.filterSkill')}
          value={skillF}
          onChange={setSkillF}
          options={SKILL_OPTIONS}
        />
        <FilterSelect
          label={t('creatorList.filterDifficulty')}
          value={difficultyF}
          onChange={setDifficultyF}
          options={DIFFICULTY_OPTIONS}
        />
        <span
          className="hm-mono text-[10.5px] ml-auto"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          {t('creatorList.ofTotal', { shown: ASSESSMENTS.length, total: ASSESSMENTS.length })}
        </span>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        <table className="w-full text-left text-[12.5px]" style={{ color: 'var(--hm-text)' }}>
          <thead>
            <tr style={{ background: 'var(--hm-bg-card-2)' }}>
              {headers.map((h, i) => (
                <th
                  key={h + i}
                  className="hm-mono text-[10px] font-semibold px-4 py-2.5"
                  style={{
                    color: 'var(--hm-text-dim)',
                    letterSpacing: '0.12em',
                    borderBottom: '1px solid var(--hm-border)',
                    textAlign: i >= 3 && i <= 6 ? 'right' : 'left',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ASSESSMENTS.map((a, i) => (
              <tr
                key={a.id}
                className="cursor-pointer transition-colors"
                style={{ borderTop: i === 0 ? 'none' : '1px solid var(--hm-border)' }}
                onClick={() => onOpenDetail(a.id)}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--hm-bg-card-2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                      style={{ background: ACCENT_SOFT, color: ACCENT }}
                    >
                      <GraduationCap className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium truncate" style={{ color: 'var(--hm-text)' }}>
                        {a.title}
                      </p>
                      <p className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                        #{a.id.toUpperCase()} · {a.skill_category} · {a.difficulty}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Pill tone={TYPE_TONE[a.assessment_type]}>
                    {t(TYPE_LABEL_KEY[a.assessment_type])}
                  </Pill>
                </td>
                <td className="px-4 py-3">
                  <Pill tone={STATUS_TONE[a.status]}>{a.status}</Pill>
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  {a.questions ? <Mono>{a.questions}</Mono> : <Mono dim>0</Mono>}
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  <Mono>{a.passing_score}%</Mono>
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  <Mono>{a.submissions.toLocaleString()}</Mono>
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  {a.pass_rate != null ? (
                    <span
                      className="hm-mono text-[11px]"
                      style={{
                        color:
                          a.pass_rate >= 75
                            ? TONE_FG.success
                            : a.pass_rate >= 60
                              ? TONE_FG.warning
                              : TONE_FG.danger,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {a.pass_rate}%
                    </span>
                  ) : (
                    <Mono dim>—</Mono>
                  )}
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  <Mono dim>{a.updated}</Mono>
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right', width: 40 }}>
                  <button
                    type="button"
                    aria-label={t('creatorTable.assessmentActions')}
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenDetail(a.id)
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-md ml-auto"
                    style={{ color: 'var(--hm-text-dim)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--hm-bg-elev)'
                      e.currentTarget.style.color = 'var(--hm-text)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = 'var(--hm-text-dim)'
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="flex items-center justify-between gap-4 px-4 py-2.5"
          style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <span
            className="hm-mono text-[10px]"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
          >
            {t('creatorList.showing', { shown: ASSESSMENTS.length, total: ASSESSMENTS.length })}
          </span>
          <div className="flex items-center gap-1">
            <span
              className="hm-mono inline-flex items-center justify-center w-7 h-7 rounded-md text-[11px] font-semibold"
              style={{
                background: ACCENT_SOFT,
                color: ACCENT,
                border: `1px solid ${ACCENT}55`,
                boxShadow: `0 0 0 3px ${ACCENT}14`,
              }}
            >
              1
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * DETAIL VIEW
 * ──────────────────────────────────────────────────────────────────── */

function StatTile({
  Icon,
  label,
  value,
  tone,
  hint,
}: {
  Icon: LucideIcon
  label: string
  value: string
  tone: string
  hint?: string
}) {
  return (
    <div
      className="rounded-xl p-3.5"
      style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
          style={{ background: `${tone}1f`, color: tone }}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p
          className="hm-mono text-[9.5px]"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
        >
          {label.toUpperCase()}
        </p>
      </div>
      <p
        className="hm-mono text-[20px] font-semibold leading-none"
        style={{ color: 'var(--hm-text)' }}
      >
        {value}
      </p>
      {hint && (
        <p className="text-[10.5px] mt-1.5" style={{ color: 'var(--hm-text-dim)' }}>
          {hint}
        </p>
      )}
    </div>
  )
}

function QuestionBlock({
  question,
  expanded,
  onToggle,
  onEdit,
}: {
  question: QuestionRow
  expanded: boolean
  onToggle: () => void
  onEdit: () => void
}) {
  const { t } = useTranslation()
  const meta = QUESTION_META[question.question_type]
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
    >
      <div className="flex items-center gap-3 px-3.5 py-3">
        <GripVertical
          className="h-4 w-4 shrink-0 cursor-grab"
          style={{ color: 'var(--hm-text-dim)' }}
          aria-label={t('creatorEdit.dragReorder')}
        />
        <span
          className="hm-mono text-[10px] shrink-0 w-8 text-center px-1 py-0.5 rounded"
          style={{
            color: ACCENT,
            background: ACCENT_SOFT,
            border: `1px solid ${ACCENT}33`,
            letterSpacing: '0.06em',
          }}
        >
          Q{String(question.sort_order).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-label={expanded ? 'Collapse question' : 'Expand question'}
          className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
          style={{ color: 'var(--hm-text-dim)' }}
        >
          {expanded ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
        </button>
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
          style={{ background: TONE_BG[meta.tone], color: TONE_FG[meta.tone] }}
        >
          <meta.Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-medium truncate" style={{ color: 'var(--hm-text)' }}>
            {question.question_text}
          </p>
          <p
            className="hm-mono text-[10px]"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
          >
            {t(meta.labelKey).toUpperCase()}
            {question.answer_type && ` · ${question.answer_type.toUpperCase()}`}
            {` · ${question.marks} pts`}
          </p>
        </div>
        <Pill tone={meta.tone}>{t(meta.labelKey).toLowerCase()}</Pill>
        <button
          type="button"
          onClick={onEdit}
          aria-label={t('creatorEdit.editQuestion')}
          className="flex h-7 w-7 items-center justify-center rounded-md shrink-0"
          style={{ color: 'var(--hm-text-dim)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--hm-bg-elev)'
            e.currentTarget.style.color = 'var(--hm-text)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--hm-text-dim)'
          }}
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>

      {expanded && (
        <div className="px-3.5 pb-3.5" style={{ borderTop: '1px solid var(--hm-border)' }}>
          {question.options.length > 0 ? (
            <ul className="flex flex-col gap-1.5 mt-3">
              {question.options.map((o, i) => (
                <li
                  key={o.id}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                  style={{
                    background: o.is_correct ? 'rgba(94,230,168,0.08)' : 'var(--hm-bg-card)',
                    border: `1px solid ${o.is_correct ? 'rgba(94,230,168,0.30)' : 'var(--hm-border)'}`,
                  }}
                >
                  <span
                    className="hm-mono text-[10px] shrink-0 w-5 text-center"
                    style={{ color: 'var(--hm-text-dim)' }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {o.is_correct ? (
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: TONE_FG.success }}
                    />
                  ) : (
                    <Circle
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: 'var(--hm-text-dim)' }}
                    />
                  )}
                  <span
                    className="text-[12px] flex-1"
                    style={{
                      color: o.is_correct ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                      fontWeight: o.is_correct ? 500 : 400,
                    }}
                  >
                    {o.option_text}
                  </span>
                  {o.is_correct && <Pill tone="success">correct</Pill>}
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="mt-3 rounded-lg px-3 py-3 text-[12px]"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              <span
                className="hm-mono text-[9.5px] mr-2"
                style={{ color: TONE_FG.warning, letterSpacing: '0.12em' }}
              >
                SUBJECTIVE
              </span>
              Free-text response — graded manually by an evaluator.
            </div>
          )}
          {question.explanation && (
            <div
              className="mt-3 rounded-lg px-3 py-2.5 text-[11.5px] leading-relaxed"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px dashed var(--hm-border-strong)',
                color: 'var(--hm-text-muted)',
              }}
            >
              <p
                className="hm-mono text-[9.5px] mb-1"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
              >
                EXPLANATION
              </p>
              {question.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

type QuestionModalState = { mode: 'create' } | { mode: 'edit'; question: QuestionRow }

/* ──────────────────────────────────────────────────────────────────────
 * QUESTION modal — type-aware fields
 * ──────────────────────────────────────────────────────────────────── */

function QuestionModalView({
  state,
  onClose,
}: {
  state: QuestionModalState | null
  onClose: () => void
}) {
  const { t } = useTranslation()
  const editing = state?.mode === 'edit' ? state.question : null
  const initialType: QuestionType = editing?.question_type ?? 'mcq'
  const [type, setType] = useState<QuestionType>(initialType)

  const showOptions = type === 'mcq' || type === 'true_false' || type === 'yes_no'
  const fixedTrueFalse =
    type === 'true_false'
      ? [t('studentShell.optTrue'), t('studentShell.optFalse')]
      : type === 'yes_no'
        ? [t('studentShell.optYes'), t('studentShell.optNo')]
        : null

  return (
    <Modal
      open={state !== null}
      onClose={onClose}
      eyebrow={
        state?.mode === 'edit'
          ? t('studentShell.qmEyebrowEdit', {
              n: String(editing?.sort_order ?? 0).padStart(2, '0'),
            })
          : t('studentShell.qmEyebrowNew')
      }
      title={editing?.question_text ?? t('studentShell.qmTitleNew')}
      subtitle={
        editing
          ? t('studentShell.qmSubtitleEditTpl', {
              id: editing.id,
              type: t(QUESTION_META[editing.question_type].labelKey),
              marks: editing.marks,
            })
          : t('studentShell.qmSubtitleNew')
      }
      width={680}
      primary={{
        label:
          state?.mode === 'edit'
            ? t('studentShell.qmPrimarySave')
            : t('studentShell.qmPrimaryCreate'),
      }}
      destructive={
        state?.mode === 'edit' ? { label: t('studentShell.qmDestructiveDelete') } : undefined
      }
    >
      <div className="flex flex-col gap-4">
        {/* Type picker */}
        <Field label={t('creatorEdit.fieldQuestionType')} required>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {QUESTION_TYPE_OPTIONS.map(({ value: qt }) => {
              const meta = QUESTION_META[qt]
              const active = type === qt
              return (
                <button
                  key={qt}
                  type="button"
                  onClick={() => setType(qt)}
                  className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg transition-colors"
                  style={{
                    background: active ? TONE_BG[meta.tone] : 'var(--hm-bg-card-2)',
                    border: `1px solid ${active ? TONE_FG[meta.tone] + '60' : 'var(--hm-border)'}`,
                    color: active ? TONE_FG[meta.tone] : 'var(--hm-text-muted)',
                  }}
                >
                  <meta.Icon className="h-4 w-4" />
                  <span
                    className="hm-mono text-[10px] font-semibold text-center"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {t(meta.labelKey).toUpperCase()}
                  </span>
                </button>
              )
            })}
          </div>
        </Field>

        {/* Common fields */}
        <Field label={t('creatorEdit.fieldQuestionText')} required>
          <Textarea
            rows={3}
            defaultValue={editing?.question_text ?? ''}
            placeholder={t('creatorEdit.promptPlaceholder')}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label={t('creatorEdit.fieldSortOrder')}>
            <TextInput
              mono
              type="number"
              defaultValue={editing?.sort_order ?? QUESTIONS.length + 1}
            />
          </Field>
          <Field label={t('creatorEdit.fieldMarks')}>
            <TextInput mono type="number" defaultValue={editing?.marks ?? 1} />
          </Field>
          {type === 'mcq' ? (
            <Field label={t('creatorEdit.fieldAnswerType')} required>
              <Select
                defaultValue={editing?.answer_type ?? 'single'}
                options={ANSWER_TYPE_OPTIONS}
              />
            </Field>
          ) : (
            <Field
              label={t('creatorEdit.fieldAnswerType')}
              hint={t('creatorEdit.fieldAnswerTypeLocked')}
            >
              <TextInput mono defaultValue="single" />
            </Field>
          )}
        </div>

        {/* Type-specific fields */}
        <div
          className="rounded-xl px-4 py-4"
          style={{
            background: TONE_BG[QUESTION_META[type].tone],
            border: `1px solid ${TONE_FG[QUESTION_META[type].tone]}33`,
          }}
        >
          <p
            className="hm-mono text-[10px] mb-3"
            style={{ color: TONE_FG[QUESTION_META[type].tone], letterSpacing: '0.14em' }}
          >
            {t(QUESTION_META[type].labelKey).toUpperCase()} · {t('creatorEdit.typeSpecificFields')}
          </p>

          {showOptions && (
            <div className="flex flex-col gap-2">
              <p
                className="hm-mono text-[10px] mb-1"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                {fixedTrueFalse ? 'OPTIONS · LOCKED' : 'OPTIONS · MARK CORRECT ANSWER(S)'}
              </p>
              {(fixedTrueFalse
                ? fixedTrueFalse.map((t, i) => ({
                    id: `fixed-${i}`,
                    option_text: t,
                    is_correct: i === 1,
                  }))
                : editing?.options.length
                  ? editing.options
                  : [
                      { id: 'new-1', option_text: '', is_correct: true },
                      { id: 'new-2', option_text: '', is_correct: false },
                      { id: 'new-3', option_text: '', is_correct: false },
                      { id: 'new-4', option_text: '', is_correct: false },
                    ]
              ).map((o, i) => (
                <div
                  key={o.id}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg"
                  style={{
                    background: 'var(--hm-bg-card)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  <span
                    className="hm-mono text-[10px] shrink-0 w-5 text-center"
                    style={{ color: 'var(--hm-text-dim)' }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <button
                    type="button"
                    aria-label={o.is_correct ? 'Mark incorrect' : 'Mark correct'}
                    className="flex h-6 w-6 items-center justify-center shrink-0 rounded-md"
                    disabled={!!fixedTrueFalse}
                    style={{
                      color: o.is_correct ? TONE_FG.success : 'var(--hm-text-dim)',
                      cursor: fixedTrueFalse ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {o.is_correct ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </button>
                  <input
                    type="text"
                    defaultValue={o.option_text}
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    disabled={!!fixedTrueFalse}
                    className="flex-1 bg-transparent outline-none text-[12.5px]"
                    style={{ color: 'var(--hm-text)' }}
                  />
                  {!fixedTrueFalse && (
                    <button
                      type="button"
                      aria-label={t('creatorEdit.removeOption')}
                      className="flex h-6 w-6 items-center justify-center shrink-0 rounded-md"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
              {!fixedTrueFalse && (
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 mt-1 text-[11.5px] font-medium hover:opacity-80 self-start"
                  style={{ color: ACCENT }}
                >
                  <Plus className="h-3.5 w-3.5" /> {t('creatorEdit.addOption')}
                </button>
              )}
            </div>
          )}

          {type === 'subjective' && (
            <div className="flex flex-col gap-3">
              <Field
                label={t('creatorEdit.fieldGradingRubric')}
                hint={t('creatorEdit.fieldGradingRubricHint')}
              >
                <Textarea
                  rows={4}
                  placeholder={`Look for: clear identification of the issue, a plausible cause, and a concrete corrective step.`}
                />
              </Field>
              <div
                className="flex items-center gap-2 text-[11.5px]"
                style={{ color: 'var(--hm-text-muted)' }}
              >
                <AlertCircle className="h-3.5 w-3.5" style={{ color: TONE_FG.warning }} />
                Subjective questions are graded manually by an evaluator from the panel.
              </div>
            </div>
          )}
        </div>

        <Field
          label={t('creatorEdit.fieldExplanation')}
          hint={t('creatorEdit.fieldExplanationHint')}
        >
          <Textarea
            rows={3}
            defaultValue={editing?.explanation ?? ''}
            placeholder={t('creatorEdit.explanationPlaceholder')}
          />
        </Field>
      </div>
    </Modal>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * ASSESSMENT create/edit modal
 * ──────────────────────────────────────────────────────────────────── */

function AssessmentModalView({
  state,
  onClose,
}: {
  state: { mode: 'create' } | { mode: 'edit'; row: AssessmentRow } | null
  onClose: () => void
}) {
  const { t } = useTranslation()
  const editing = state?.mode === 'edit' ? state.row : null
  return (
    <Modal
      open={state !== null}
      onClose={onClose}
      eyebrow={editing ? `Edit · #${editing.id.toUpperCase()}` : 'New assessment'}
      title={editing?.title ?? 'Create a new assessment'}
      subtitle={
        editing
          ? `${t(TYPE_LABEL_KEY[editing.assessment_type])} · ${editing.skill_category} · ${editing.difficulty}`
          : 'Set the basics now — you can add questions next.'
      }
      width={680}
      primary={{ label: editing ? 'Save assessment' : 'Create assessment' }}
      destructive={editing ? { label: t('creatorEdit.archiveAssessment') } : undefined}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
        <div className="col-span-1 sm:col-span-2">
          <Field label={t('creatorEdit.fieldTitle')} required>
            <TextInput
              defaultValue={editing?.title ?? ''}
              placeholder={t('creatorEdit.titlePlaceholderAssessment')}
            />
          </Field>
        </div>
        <Field label={t('creatorEdit.fieldType')} required>
          <Select defaultValue={editing?.assessment_type ?? 'lesson_quiz'} options={TYPE_OPTIONS} />
        </Field>
        <Field label={t('creatorEdit.fieldSkillCategory')} required>
          <Select
            defaultValue={editing?.skill_category ?? 'Arts & Crafts'}
            options={SKILL_OPTIONS}
          />
        </Field>
        <Field label={t('creatorEdit.fieldDifficulty')} required>
          <Select defaultValue={editing?.difficulty ?? 'beginner'} options={DIFFICULTY_OPTIONS} />
        </Field>
        <Field label={t('creatorEdit.fieldStatus')} required>
          <Select defaultValue={editing?.status ?? 'draft'} options={STATUS_OPTIONS} />
        </Field>
        <Field label={t('creatorEdit.fieldPassingScorePct')} required>
          <TextInput mono type="number" defaultValue={editing?.passing_score ?? 70} />
        </Field>
        <Field label={t('creatorEdit.fieldMaxAttempts')} required>
          <TextInput mono type="number" defaultValue={editing?.max_attempts ?? 3} />
        </Field>
        <Field label={t('creatorEdit.fieldTimeLimit')} hint={t('creatorEdit.fieldPriceHint')}>
          <TextInput mono type="number" defaultValue={editing?.time_limit_seconds ?? 600} />
        </Field>
        <Field label={t('creatorEdit.fieldDurationMin')}>
          <TextInput mono type="number" defaultValue={editing?.duration_seconds ?? 480} />
        </Field>
        <div className="col-span-1 sm:col-span-2">
          <Field
            label={t('creatorEdit.fieldDescription')}
            hint={t('creatorEdit.fieldDescriptionHintAssessment')}
          >
            <Textarea rows={3} defaultValue="" placeholder={t('creatorEdit.summaryPlaceholder')} />
          </Field>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Field label={t('creatorEdit.fieldThumbnailUrl')}>
            <TextInput mono placeholder={t('creatorEdit.thumbnailPlaceholder')} />
          </Field>
        </div>
        <div className="col-span-1 sm:col-span-2 flex flex-wrap gap-x-5 gap-y-2 pt-1">
          <Toggle defaultChecked label={t('creatorEdit.fieldShowCorrectAnswers')} />
          <Toggle defaultChecked label={t('creatorEdit.toggleShuffleQuestions')} />
          <Toggle defaultChecked={false} label={t('creatorEdit.toggleShuffleOptions')} />
        </div>
      </div>
    </Modal>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * Top-level — switches between list and detail
 * ──────────────────────────────────────────────────────────────────── */

export default function CreatorAssessments() {
  const navigate = useNavigate()
  const [assessmentModal, setAssessmentModal] = useState<
    { mode: 'create' } | { mode: 'edit'; row: AssessmentRow } | null
  >(null)

  return (
    <CreatorShell activeId="assessments">
      <ListView
        onOpenDetail={(id) => navigate(`/creator/assessments/${id}`)}
        onCreate={() => setAssessmentModal({ mode: 'create' })}
        onEdit={(row) => setAssessmentModal({ mode: 'edit', row })}
      />

      <AssessmentModalView state={assessmentModal} onClose={() => setAssessmentModal(null)} />
    </CreatorShell>
  )
}
