import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CreatorShell from '../_shared/CreatorShell'
import { FilterSelect } from '../_shared/FilterSelect'
import {
  Plus,
  Search,
  BookOpen,
  GripVertical,
  FileText,
  Video,
  HelpCircle,
  Radio,
  ArrowLeft,
  Save,
  X,
  MoreHorizontal,
  Star,
  Users as UsersIcon,
  TrendingUp,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronRight,
  Trash2,
  Pencil,
  Calendar,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'

/* ──────────────────────────────────────────────────────────────────────
 * CreatorCourses — combined list + detail view for the creator's
 * own courses. Driven entirely by local component state so a row
 * click on the list switches the inner view to the detail screen
 * for that course. Modals handle add/edit for courses, modules and
 * lessons (with type-specific fields per `lesson_type`).
 *
 * Schema basis: courses · course_modules · course_module_lessons
 * with the four per-type lesson tables (lesson_texts, lesson_videos,
 * lesson_quizzes, lesson_live_sessions). Sort_order is surfaced via
 * grip-handle drag affordances on every module + lesson row, plus a
 * mono index column.
 * ──────────────────────────────────────────────────────────────────── */

const ACCENT = '#F4B26C' // creator amber
const ACCENT_DARK = '#1a1208' // text on accent
const ACCENT_SOFT = 'rgba(244,178,108,0.12)'
const ACCENT_BORDER = 'rgba(244,178,108,0.30)'
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

/* ── Status / lesson-type helpers ───────────────────────────────── */
type CourseStatus =
  | 'draft'
  | 'finished'
  | 'assessment'
  | 'calibrated'
  | 'published'
  | 'disabled'
  | 'archived'
type LessonType = 'text' | 'video' | 'quiz' | 'live'

const STATUS_TONE: Record<CourseStatus, Tone> = {
  draft: 'warning',
  finished: 'teal',
  assessment: 'violet',
  calibrated: 'info',
  published: 'success',
  disabled: 'danger',
  archived: 'neutral',
}
const LESSON_TYPE_META: Record<LessonType, { Icon: LucideIcon; tone: Tone; label: string }> = {
  text: { Icon: FileText, tone: 'info', label: 'Text' },
  video: { Icon: Video, tone: 'violet', label: 'Video' },
  quiz: { Icon: HelpCircle, tone: 'warning', label: 'Quiz' },
  live: { Icon: Radio, tone: 'teal', label: 'Live' },
}

/* ──────────────────────────────────────────────────────────────────────
 * DEMO DATA
 * ──────────────────────────────────────────────────────────────────── */

interface CourseRow {
  id: string
  title: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  language: string
  status: CourseStatus
  modules: number
  lessons: number
  enrolled: number
  rating: number | null // null for unpublished/finished
  price_credits: number
  hmn_reward: number
  updated: string
}

const COURSES: CourseRow[] = [
  {
    id: 'wf-01',
    title: 'Watercolor Foundations',
    category: 'Arts & Crafts',
    difficulty: 'beginner',
    language: 'EN',
    status: 'published',
    modules: 6,
    lessons: 24,
    enrolled: 4820,
    rating: 4.9,
    price_credits: 180,
    hmn_reward: 60,
    updated: '2h ago',
  },
  {
    id: 'ag-02',
    title: 'Acoustic Guitar Mastery',
    category: 'Music',
    difficulty: 'intermediate',
    language: 'EN',
    status: 'published',
    modules: 8,
    lessons: 36,
    enrolled: 2110,
    rating: 4.8,
    price_credits: 240,
    hmn_reward: 80,
    updated: '1d ago',
  },
  {
    id: 'st-03',
    title: 'Spanish for Travelers',
    category: 'Languages',
    difficulty: 'beginner',
    language: 'EN',
    status: 'published',
    modules: 5,
    lessons: 20,
    enrolled: 6240,
    rating: 4.7,
    price_credits: 0,
    hmn_reward: 0,
    updated: '3d ago',
  },
  {
    id: 'cb-04',
    title: 'Calligraphy Basics',
    category: 'Arts & Crafts',
    difficulty: 'beginner',
    language: 'EN',
    status: 'draft',
    modules: 3,
    lessons: 9,
    enrolled: 0,
    rating: null,
    price_credits: 0,
    hmn_reward: 0,
    updated: '5d ago',
  },
  {
    id: 'pf-05',
    title: 'Personal Finance 101',
    category: 'Finance',
    difficulty: 'beginner',
    language: 'EN',
    status: 'published',
    modules: 7,
    lessons: 28,
    enrolled: 3940,
    rating: 4.6,
    price_credits: 160,
    hmn_reward: 50,
    updated: '1w ago',
  },
  {
    id: 'wt-06',
    title: 'Wine Tasting Foundations',
    category: 'Lifestyle',
    difficulty: 'beginner',
    language: 'EN',
    status: 'finished',
    modules: 4,
    lessons: 16,
    enrolled: 0,
    rating: null,
    price_credits: 200,
    hmn_reward: 70,
    updated: '1w ago',
  },
  {
    id: 'ys-07',
    title: 'Yoga for Strength',
    category: 'Wellness',
    difficulty: 'intermediate',
    language: 'EN',
    status: 'calibrated',
    modules: 6,
    lessons: 22,
    enrolled: 28,
    rating: 4.9,
    price_credits: 220,
    hmn_reward: 75,
    updated: '2w ago',
  },
  {
    id: 'kn-08',
    title: 'Korean N3 Prep',
    category: 'Languages',
    difficulty: 'intermediate',
    language: 'EN',
    status: 'assessment',
    modules: 9,
    lessons: 41,
    enrolled: 6,
    rating: null,
    price_credits: 280,
    hmn_reward: 95,
    updated: '3w ago',
  },
]

interface LessonRow {
  id: string
  title: string
  lesson_type: LessonType
  is_required: boolean
  duration_seconds: number
  sort_order: number
}
interface ModuleRow {
  id: string
  title: string
  description: string
  is_required: boolean
  sort_order: number
  lessons: LessonRow[]
}

/** Watercolor Foundations — full curriculum across all 4 lesson types. */
const MODULES: ModuleRow[] = [
  {
    id: 'm-01',
    sort_order: 1,
    is_required: true,
    title: 'Setting up your studio',
    description:
      "Pick the right paper, brushes and pigments — and arrange a workspace you'll actually want to sit at.",
    lessons: [
      {
        id: 'l-01',
        sort_order: 1,
        is_required: true,
        lesson_type: 'video',
        title: "Welcome — what we'll paint together",
        duration_seconds: 4 * 60 + 20,
      },
      {
        id: 'l-02',
        sort_order: 2,
        is_required: true,
        lesson_type: 'text',
        title: 'Gear list: what to buy (and skip) on day one',
        duration_seconds: 7 * 60,
      },
      {
        id: 'l-03',
        sort_order: 3,
        is_required: false,
        lesson_type: 'text',
        title: 'Paper deep-dive: cold press, hot press, rough',
        duration_seconds: 9 * 60,
      },
    ],
  },
  {
    id: 'm-02',
    sort_order: 2,
    is_required: true,
    title: 'Understanding watercolor properties',
    description:
      'Why watercolor moves the way it does — pigment, water, paper and how they negotiate.',
    lessons: [
      {
        id: 'l-04',
        sort_order: 1,
        is_required: true,
        lesson_type: 'video',
        title: 'How pigments interact with water',
        duration_seconds: 11 * 60 + 30,
      },
      {
        id: 'l-05',
        sort_order: 2,
        is_required: true,
        lesson_type: 'text',
        title: 'Transparent vs. opaque — staining charts',
        duration_seconds: 6 * 60,
      },
      {
        id: 'l-06',
        sort_order: 3,
        is_required: true,
        lesson_type: 'video',
        title: 'Color mixing demo: a 12-color palette',
        duration_seconds: 14 * 60 + 50,
      },
      {
        id: 'l-07',
        sort_order: 4,
        is_required: true,
        lesson_type: 'quiz',
        title: 'Quick check: pigment properties',
        duration_seconds: 5 * 60,
      },
    ],
  },
  {
    id: 'm-03',
    sort_order: 3,
    is_required: true,
    title: 'Basic washes & techniques',
    description:
      "The four foundational washes — flat, graded, variegated and wet-on-wet — practiced until they're muscle memory.",
    lessons: [
      {
        id: 'l-08',
        sort_order: 1,
        is_required: true,
        lesson_type: 'video',
        title: 'Flat wash — the bedrock skill',
        duration_seconds: 8 * 60,
      },
      {
        id: 'l-09',
        sort_order: 2,
        is_required: true,
        lesson_type: 'video',
        title: 'Graded wash — controlling falloff',
        duration_seconds: 9 * 60 + 40,
      },
      {
        id: 'l-10',
        sort_order: 3,
        is_required: true,
        lesson_type: 'video',
        title: 'Variegated wash — letting colors meet',
        duration_seconds: 10 * 60 + 10,
      },
      {
        id: 'l-11',
        sort_order: 4,
        is_required: false,
        lesson_type: 'text',
        title: 'Practice prompts (12 swatches)',
        duration_seconds: 12 * 60,
      },
      {
        id: 'l-12',
        sort_order: 5,
        is_required: true,
        lesson_type: 'live',
        title: 'Live workshop: wash troubleshooting',
        duration_seconds: 60 * 60,
      },
    ],
  },
  {
    id: 'm-04',
    sort_order: 4,
    is_required: true,
    title: 'Color theory in practice',
    description:
      'Build a usable palette and learn how artists actually pick, mix, and limit color.',
    lessons: [
      {
        id: 'l-13',
        sort_order: 1,
        is_required: true,
        lesson_type: 'video',
        title: 'Color wheel as a tool, not a poster',
        duration_seconds: 9 * 60,
      },
      {
        id: 'l-14',
        sort_order: 2,
        is_required: true,
        lesson_type: 'video',
        title: 'Mixing greys and neutrals',
        duration_seconds: 8 * 60 + 20,
      },
      {
        id: 'l-15',
        sort_order: 3,
        is_required: true,
        lesson_type: 'text',
        title: 'Limited-palette case studies',
        duration_seconds: 10 * 60,
      },
      {
        id: 'l-16',
        sort_order: 4,
        is_required: true,
        lesson_type: 'quiz',
        title: 'Color choice exercises',
        duration_seconds: 6 * 60,
      },
    ],
  },
  {
    id: 'm-05',
    sort_order: 5,
    is_required: true,
    title: 'Subject studies — botanical illustration',
    description: 'Apply everything to a single subject: leaves, petals and a finished study.',
    lessons: [
      {
        id: 'l-17',
        sort_order: 1,
        is_required: true,
        lesson_type: 'video',
        title: 'Painting a single leaf, three ways',
        duration_seconds: 12 * 60 + 30,
      },
      {
        id: 'l-18',
        sort_order: 2,
        is_required: true,
        lesson_type: 'video',
        title: 'Petal shapes and edges',
        duration_seconds: 10 * 60,
      },
      {
        id: 'l-19',
        sort_order: 3,
        is_required: true,
        lesson_type: 'video',
        title: 'Composing a small botanical study',
        duration_seconds: 14 * 60 + 10,
      },
      {
        id: 'l-20',
        sort_order: 4,
        is_required: false,
        lesson_type: 'text',
        title: 'Reference photo pack (40 images)',
        duration_seconds: 5 * 60,
      },
      {
        id: 'l-21',
        sort_order: 5,
        is_required: true,
        lesson_type: 'live',
        title: 'Office hours: subject critique',
        duration_seconds: 45 * 60,
      },
    ],
  },
  {
    id: 'm-06',
    sort_order: 6,
    is_required: true,
    title: 'Final project & assessment',
    description:
      'Submit a finished botanical study and receive personalized feedback before certification.',
    lessons: [
      {
        id: 'l-22',
        sort_order: 1,
        is_required: true,
        lesson_type: 'text',
        title: 'Submission guidelines & rubric',
        duration_seconds: 6 * 60,
      },
      {
        id: 'l-23',
        sort_order: 2,
        is_required: true,
        lesson_type: 'live',
        title: 'Live group critique session',
        duration_seconds: 90 * 60,
      },
      {
        id: 'l-24',
        sort_order: 3,
        is_required: true,
        lesson_type: 'quiz',
        title: 'Final assessment',
        duration_seconds: 30 * 60,
      },
    ],
  },
]

/* ──────────────────────────────────────────────────────────────────────
 * Small inline UI primitives (amber-themed)
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
        className="relative inline-flex shrink-0 items-center w-8 h-4.5 rounded-full transition-colors"
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

/* ──────────────────────────────────────────────────────────────────────
 * Modal shell (amber-accented)
 * ──────────────────────────────────────────────────────────────────── */

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
        {/* Header */}
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto hm-scroll px-5 py-5">{children}</div>

        {/* Footer */}
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
 * Helpers
 * ──────────────────────────────────────────────────────────────────── */

function fmtDuration(seconds: number) {
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

const CATEGORY_OPTIONS = [
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
const LANGUAGE_OPTIONS = [
  { value: 'EN', label: 'English (EN)' },
  { value: 'ES', label: 'Spanish (ES)' },
  { value: 'FR', label: 'French (FR)' },
  { value: 'JA', label: 'Japanese (JA)' },
  { value: 'KO', label: 'Korean (KO)' },
]
const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'finished', label: 'Finished — content complete' },
  { value: 'assessment', label: 'Assessment — in evaluation' },
  { value: 'calibrated', label: 'Calibrated — panel-approved' },
  { value: 'published', label: 'Published — live in catalog' },
  { value: 'disabled', label: 'Disabled — temporarily hidden' },
  { value: 'archived', label: 'Archived — read-only' },
]
const CONSUMPTION_OPTIONS = [
  { value: 'free_learning', label: 'Free learning — any order' },
  { value: 'guided_path', label: 'Guided path — sequential' },
]
const EVALUATION_OPTIONS = [
  { value: 'none', label: 'None — no formal evaluation' },
  { value: 'final_test', label: 'Final test only' },
  { value: 'all_quizzes', label: 'All quizzes must pass' },
  { value: 'selected_quizzes', label: 'Selected quizzes only' },
  { value: 'selected_quizzes_final', label: 'Selected quizzes + final test' },
]
const SESSION_TYPE_OPTIONS = [
  { value: 'workshop', label: 'Workshop (interactive)' },
  { value: 'office_hours', label: 'Office hours' },
  { value: 'critique', label: 'Critique session' },
  { value: 'lecture', label: 'Lecture' },
]
const ASSESSMENT_OPTIONS = [
  { value: 'as-pigments', label: 'Pigment properties — quick check' },
  { value: 'as-color-choice', label: 'Color choice exercises' },
  { value: 'as-final-water', label: 'Watercolor Foundations — final' },
  { value: 'as-color-mixing', label: 'Color mixing assessment' },
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
  onEdit: (row: CourseRow) => void
}) {
  const { t } = useTranslation()
  const [statusF, setStatusF] = useState('')
  const [categoryF, setCategoryF] = useState('')
  const [difficultyF, setDifficultyF] = useState('')
  const [languageF, setLanguageF] = useState('')
  const headers = [
    t('creatorList.colCourse'),
    t('creatorList.colStatus'),
    t('creatorList.colModules'),
    t('creatorList.colLessons'),
    t('creatorList.colEnrolled'),
    t('creatorList.colRating'),
    t('creatorList.colPrice'),
    t('creatorList.colUpdated'),
    '',
  ]
  return (
    <>
      {/* Page header */}
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
            {t('creatorList.coursesTitle')}
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            {t('creatorList.coursesSubtitle')}
          </p>
        </div>
        <PrimaryButton Icon={Plus} onClick={onCreate}>
          {t('creatorList.newCourse')}
        </PrimaryButton>
      </div>

      {/* Toolbar — search + filter pills */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[260px] max-w-[420px]">
          <Search
            className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--hm-text-dim)' }}
          />
          <input
            type="text"
            placeholder={t('creatorList.searchCourses')}
            className="w-full pl-9 pr-3 h-9 rounded-lg text-[12.5px] outline-none"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text)',
            }}
          />
        </div>
        <FilterSelect
          label={t('creatorList.filterStatus')}
          value={statusF}
          onChange={setStatusF}
          options={STATUS_OPTIONS}
        />
        <FilterSelect
          label={t('creatorList.filterCategory')}
          value={categoryF}
          onChange={setCategoryF}
          options={CATEGORY_OPTIONS}
        />
        <FilterSelect
          label={t('creatorList.filterDifficulty')}
          value={difficultyF}
          onChange={setDifficultyF}
          options={DIFFICULTY_OPTIONS}
        />
        <FilterSelect
          label={t('creatorList.filterLanguage')}
          value={languageF}
          onChange={setLanguageF}
          options={LANGUAGE_OPTIONS}
        />
        <span
          className="hm-mono text-[10.5px] ml-auto"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          {t('creatorList.ofTotal', { shown: COURSES.length, total: COURSES.length })}
        </span>
      </div>

      {/* Table */}
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
                    textAlign: i >= 2 && i <= 6 ? 'right' : 'left',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COURSES.map((c, i) => (
              <tr
                key={c.id}
                className="cursor-pointer transition-colors"
                style={{ borderTop: i === 0 ? 'none' : '1px solid var(--hm-border)' }}
                onClick={() => onOpenDetail(c.id)}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--hm-bg-card-2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Course title cell */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                      style={{ background: ACCENT_SOFT, color: ACCENT }}
                    >
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium truncate" style={{ color: 'var(--hm-text)' }}>
                        {c.title}
                      </p>
                      <p className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                        #{c.id.toUpperCase()} · {c.category} · {c.difficulty}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Pill tone={STATUS_TONE[c.status]}>{c.status}</Pill>
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  <Mono>{c.modules}</Mono>
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  <Mono>{c.lessons}</Mono>
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  <Mono>{c.enrolled.toLocaleString()}</Mono>
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  {c.rating != null ? (
                    <span
                      className="hm-mono text-[11px]"
                      style={{ color: ACCENT, letterSpacing: '0.04em' }}
                    >
                      ★ {c.rating.toFixed(1)}
                    </span>
                  ) : (
                    <Mono dim>—</Mono>
                  )}
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  <Mono>
                    {c.price_credits
                      ? t('creatorList.priceCredits', { value: c.price_credits })
                      : t('creatorList.priceFree')}
                  </Mono>
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right' }}>
                  <Mono dim>{c.updated}</Mono>
                </td>
                <td className="px-4 py-3" style={{ textAlign: 'right', width: 40 }}>
                  <button
                    type="button"
                    aria-label={t('creatorTable.courseActions')}
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenDetail(c.id)
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

        {/* Footer / pagination */}
        <div
          className="flex items-center justify-between gap-4 px-4 py-2.5"
          style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <span
            className="hm-mono text-[10px]"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
          >
            {t('creatorList.showing', { shown: COURSES.length, total: COURSES.length })}
          </span>
          <div className="flex items-center gap-1">
            {[1].map((p) => (
              <span
                key={p}
                className="hm-mono inline-flex items-center justify-center w-7 h-7 rounded-md text-[11px] font-semibold"
                style={{
                  background: ACCENT_SOFT,
                  color: ACCENT,
                  border: `1px solid ${ACCENT}55`,
                  boxShadow: `0 0 0 3px ${ACCENT}14`,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * DETAIL VIEW
 * ──────────────────────────────────────────────────────────────────── */

/* ──────────────────────────────────────────────────────────────────────
 * DETAIL VIEW — read-only 2-section layout
 * ──────────────────────────────────────────────────────────────────── */

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p
        className="hm-mono text-[9.5px] mb-0.5"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
      >
        {label.toUpperCase()}
      </p>
      <p
        className={`text-[12.5px] font-medium leading-snug ${mono ? 'hm-mono' : ''}`}
        style={{ color: 'var(--hm-text)' }}
      >
        {value}
      </p>
    </div>
  )
}

function ReadonlyModuleRow({
  module,
  expanded,
  onToggle,
}: {
  module: ModuleRow
  expanded: boolean
  onToggle: () => void
}) {
  const totalSeconds = module.lessons.reduce((a, l) => a + l.duration_seconds, 0)
  return (
    <div style={{ borderTop: '1px solid var(--hm-border)' }}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-3.5 text-left"
        style={{ background: 'transparent' }}
      >
        <span
          className="hm-mono text-[10px] px-1.5 py-0.5 rounded shrink-0"
          style={{
            background: ACCENT_SOFT,
            color: ACCENT,
            border: `1px solid ${ACCENT}33`,
            letterSpacing: '0.06em',
          }}
        >
          M{String(module.sort_order).padStart(2, '0')}
        </span>
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--hm-text-dim)' }} />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--hm-text-dim)' }} />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--hm-text)' }}>
            {module.title}
          </p>
          <p className="text-[11.5px] truncate" style={{ color: 'var(--hm-text-muted)' }}>
            {module.description}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Mono dim>
            {module.lessons.length} lessons · {fmtDuration(totalSeconds)}
          </Mono>
          {module.is_required ? (
            <Pill tone="info">required</Pill>
          ) : (
            <Pill tone="neutral">optional</Pill>
          )}
        </div>
      </button>
      {expanded && (
        <ul style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}>
          {module.lessons.map((l) => {
            const meta = LESSON_TYPE_META[l.lesson_type]
            return (
              <li
                key={l.id}
                className="flex items-center gap-3 px-5 py-2.5"
                style={{ borderBottom: '1px solid var(--hm-border)' }}
              >
                <span
                  className="hm-mono text-[10px] w-6 text-center shrink-0"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.04em' }}
                >
                  {String(l.sort_order).padStart(2, '0')}
                </span>
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                  style={{ background: TONE_BG[meta.tone], color: TONE_FG[meta.tone] }}
                >
                  <meta.Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[12.5px] font-medium truncate"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    {l.title}
                  </p>
                </div>
                <Mono dim>{fmtDuration(l.duration_seconds)}</Mono>
                <Pill tone={meta.tone}>{meta.label.toLowerCase()}</Pill>
                {!l.is_required && <Pill tone="neutral">optional</Pill>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * COURSE create/edit modal
 * ──────────────────────────────────────────────────────────────────── */

function CourseModalView({
  state,
  onClose,
}: {
  state: { mode: 'create' } | { mode: 'edit'; row: CourseRow } | null
  onClose: () => void
}) {
  const { t } = useTranslation()
  const editing = state?.mode === 'edit' ? state.row : null
  return (
    <Modal
      open={state !== null}
      onClose={onClose}
      eyebrow={editing ? `Edit · #${editing.id.toUpperCase()}` : 'New course'}
      title={editing?.title ?? 'Create a new course'}
      subtitle={
        editing
          ? `${editing.category} · ${editing.difficulty} · updated ${editing.updated}`
          : 'Set the basics now — modules and lessons can come next.'
      }
      width={680}
      primary={{ label: editing ? 'Save course' : 'Create course' }}
      destructive={editing ? { label: t('creatorEdit.archiveCourse') } : undefined}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
        <div className="col-span-1 sm:col-span-2">
          <Field label={t('creatorEdit.fieldTitle')} required>
            <TextInput
              defaultValue={editing?.title ?? ''}
              placeholder={t('creatorEdit.titlePlaceholderCourse')}
            />
          </Field>
        </div>
        <Field label={t('creatorEdit.fieldSlug')} hint={t('creatorEdit.fieldSlugHint')}>
          <TextInput
            mono
            defaultValue={editing ? editing.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''}
          />
        </Field>
        <Field label={t('creatorEdit.fieldLanguage')} required>
          <Select defaultValue={editing?.language ?? 'EN'} options={LANGUAGE_OPTIONS} />
        </Field>
        <Field label={t('creatorEdit.fieldCategory')} required>
          <Select defaultValue={editing?.category ?? 'Arts & Crafts'} options={CATEGORY_OPTIONS} />
        </Field>
        <Field label={t('creatorEdit.fieldDifficulty')} required>
          <Select defaultValue={editing?.difficulty ?? 'beginner'} options={DIFFICULTY_OPTIONS} />
        </Field>
        <Field label={t('creatorEdit.fieldPriceCredits')} hint={t('creatorEdit.fieldPriceHint')}>
          <TextInput mono type="number" defaultValue={editing?.price_credits ?? 0} />
        </Field>
        <Field label={t('creatorEdit.fieldHmnReward')}>
          <TextInput mono type="number" defaultValue={editing?.hmn_reward ?? 0} />
        </Field>
        <Field label={t('creatorEdit.fieldStatus')} required>
          <Select defaultValue={editing?.status ?? 'draft'} options={STATUS_OPTIONS} />
        </Field>
        <Field label={t('creatorEdit.fieldConsumptionLogic')} required>
          <Select defaultValue="guided_path" options={CONSUMPTION_OPTIONS} />
        </Field>
        <div className="col-span-1 sm:col-span-2">
          <Field
            label={t('creatorEdit.fieldShortDescription')}
            hint={t('creatorEdit.fieldShortDescriptionHint')}
          >
            <Textarea
              rows={2}
              defaultValue={
                editing ? `An ${editing.difficulty} ${editing.category.toLowerCase()} course.` : ''
              }
              placeholder={t('creatorEdit.descPlaceholder')}
            />
          </Field>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Field
            label={t('creatorEdit.fieldThumbnailUrl')}
            hint={t('creatorEdit.fieldThumbnailHint')}
          >
            <TextInput mono placeholder={t('creatorEdit.thumbnailPlaceholder')} />
          </Field>
        </div>
      </div>
    </Modal>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * Top-level — switches between list and detail
 * ──────────────────────────────────────────────────────────────────── */

export default function CreatorCourses() {
  const navigate = useNavigate()
  const [courseModal, setCourseModal] = useState<
    { mode: 'create' } | { mode: 'edit'; row: CourseRow } | null
  >(null)

  return (
    <CreatorShell activeId="courses">
      <ListView
        onOpenDetail={(id) => navigate(`/creator/courses/${id}`)}
        onCreate={() => setCourseModal({ mode: 'create' })}
        onEdit={(row) => setCourseModal({ mode: 'edit', row })}
      />

      <CourseModalView state={courseModal} onClose={() => setCourseModal(null)} />
    </CreatorShell>
  )
}
