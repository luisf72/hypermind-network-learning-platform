import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import CreatorShell from '../_shared/CreatorShell'
import {
  ArrowLeft,
  Save,
  X,
  BookOpen,
  FileText,
  Video,
  HelpCircle,
  Radio,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  MoreHorizontal,
  Pencil,
  Bold,
  Italic,
  Underline,
  List,
  Link2,
  AlignLeft,
  Type,
  Hash,
  CheckCircle2,
  Circle,
  Image as ImageIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Layers,
  Info,
  Tag,
  Globe,
  Upload,
  DollarSign,
  Wand2,
  Sparkles,
  Lightbulb,
  ChevronUp,
  Award,
  Clock,
  Shuffle,
  type LucideIcon,
} from 'lucide-react'

type Mode = 'details' | 'curriculum'

/* ──────────────────────────────────────────────────────────────────────
 * CreatorCourseEdit — comprehensive 3-panel studio editor reachable
 * from the "Studio Editor" link on the Course Detail page.
 *
 * Layout (within CreatorShell, negative-margined to bleed full height):
 *   TopBar (44px) | LeftTree (240px) + ContextBanner + CenterPanel
 *
 * Center panel switches on selection:
 *   "info"   → CourseInfoPanel (4-tab form)
 *   "module" → ModulePanel (module form + lesson list)
 *   "text"   → SlideStudio (PPT-like slide editor, strip + canvas + notes)
 *   "quiz"   → QuestionStudio (PPT-like, question list + question editor)
 *   "video"  → VideoPanel (form)
 *   "live"   → LivePanel (multi-field form)
 * ──────────────────────────────────────────────────────────────────── */

const ACCENT = '#F4B26C'
const ACCENT_DARK = '#1a1208'
const ACCENT_SOFT = 'rgba(244,178,108,0.12)'
const ACCENT_BD = 'rgba(244,178,108,0.30)'
const ROSE = '#F4636E'

type Tone = 'success' | 'warning' | 'danger' | 'info' | 'violet' | 'teal' | 'neutral'
type LessonType = 'text' | 'video' | 'quiz' | 'live'
type QType = 'mcq' | 'true_false' | 'yes_no' | 'subjective'

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
const LMETA: Record<LessonType, { Icon: LucideIcon; tone: Tone; label: string }> = {
  text: { Icon: FileText, tone: 'info', label: 'Text' },
  video: { Icon: Video, tone: 'violet', label: 'Video' },
  quiz: { Icon: HelpCircle, tone: 'warning', label: 'Quiz' },
  live: { Icon: Radio, tone: 'teal', label: 'Live' },
}
const QTONE: Record<QType, Tone> = {
  mcq: 'info',
  true_false: 'teal',
  yes_no: 'success',
  subjective: 'violet',
}
const QLABEL: Record<QType, string> = {
  mcq: 'MCQ',
  true_false: 'TRUE / FALSE',
  yes_no: 'YES / NO',
  subjective: 'SUBJECTIVE',
}

/* ── Tree data ── */
type TLesson = { id: string; num: number; type: LessonType; title: string }
type TModule = { id: string; num: number; title: string; required: boolean; lessons: TLesson[] }

const TREE: TModule[] = [
  {
    id: 'm-01',
    num: 1,
    title: 'Setting up your studio',
    required: true,
    lessons: [
      { id: 'l-01', num: 1, type: 'video', title: "Welcome — what we'll paint together" },
      { id: 'l-02', num: 2, type: 'text', title: 'Gear list: what to buy (and skip)' },
      { id: 'l-03', num: 3, type: 'text', title: 'Paper deep-dive: cold vs hot press' },
    ],
  },
  {
    id: 'm-02',
    num: 2,
    title: 'Watercolor properties',
    required: true,
    lessons: [
      { id: 'l-04', num: 1, type: 'video', title: 'How pigments interact with water' },
      { id: 'l-05', num: 2, type: 'text', title: 'Transparent vs. opaque — staining charts' },
      { id: 'l-06', num: 3, type: 'video', title: 'Color mixing demo: 12-color palette' },
      { id: 'l-07', num: 4, type: 'quiz', title: 'Quick check: pigment properties' },
    ],
  },
  {
    id: 'm-03',
    num: 3,
    title: 'Basic washes & techniques',
    required: true,
    lessons: [
      { id: 'l-08', num: 1, type: 'video', title: 'Flat wash — the bedrock skill' },
      { id: 'l-09', num: 2, type: 'video', title: 'Graded wash — controlling falloff' },
      { id: 'l-10', num: 3, type: 'video', title: 'Variegated wash — letting colors meet' },
      { id: 'l-11', num: 4, type: 'text', title: 'Practice prompts (12 swatches)' },
      { id: 'l-12', num: 5, type: 'live', title: 'Live workshop: wash troubleshooting' },
    ],
  },
  {
    id: 'm-04',
    num: 4,
    title: 'Color theory in practice',
    required: true,
    lessons: [
      { id: 'l-13', num: 1, type: 'video', title: 'Color wheel as a tool, not a poster' },
      { id: 'l-14', num: 2, type: 'video', title: 'Mixing greys and neutrals' },
      { id: 'l-15', num: 3, type: 'text', title: 'Limited-palette case studies' },
      { id: 'l-16', num: 4, type: 'quiz', title: 'Color choice exercises' },
    ],
  },
  {
    id: 'm-05',
    num: 5,
    title: 'Botanical illustration',
    required: true,
    lessons: [
      { id: 'l-17', num: 1, type: 'video', title: 'Painting a single leaf, three ways' },
      { id: 'l-18', num: 2, type: 'video', title: 'Petal shapes and edges' },
      { id: 'l-19', num: 3, type: 'video', title: 'Composing a botanical study' },
      { id: 'l-20', num: 4, type: 'text', title: 'Reference photo pack (40 images)' },
      { id: 'l-21', num: 5, type: 'live', title: 'Office hours: subject critique' },
    ],
  },
  {
    id: 'm-06',
    num: 6,
    title: 'Final project & assessment',
    required: true,
    lessons: [
      { id: 'l-22', num: 1, type: 'text', title: 'Submission guidelines & rubric' },
      { id: 'l-23', num: 2, type: 'live', title: 'Live group critique session' },
      { id: 'l-24', num: 3, type: 'quiz', title: 'Final assessment' },
    ],
  },
]

/* ── Slide data ── */
const SLIDES = [
  {
    id: 's-01',
    title: 'Pigment vs. dye',
    body: "Pigments are ground mineral or synthetic particles suspended in a binder. Dyes are dissolved colorants. In watercolor, you're working almost exclusively with pigments — and their particle size changes how they behave on paper.",
    notes: 'Mention the difference with ink (dye-based) for contrast.',
  },
  {
    id: 's-02',
    title: 'Granulation',
    body: "Granulating pigments have large, heavy particles that settle into the hills and valleys of paper tooth as the wash dries, creating texture that can't be replicated digitally.",
    notes: 'Bring out granulating swatches on cold-press vs hot-press.',
  },
  {
    id: 's-03',
    title: 'Staining pigments',
    body: "Staining pigments bond permanently with paper fibres on first contact. They're nearly impossible to lift — which makes them risky for beginners, but powerful once you know their strength.",
    notes: 'Demo: attempt to lift Phthalo Blue vs. Cerulean. Stark contrast.',
  },
  {
    id: 's-04',
    title: 'Transparency scale',
    body: 'Every pigment falls somewhere on the transparency spectrum: Transparent · Semi-transparent · Semi-opaque · Opaque. This determines how you layer colors and whether glazing will be effective.',
    notes: 'Show the transparency swatch test: stroke of each color over a dry black ink line.',
  },
  {
    id: 's-05',
    title: 'Lifting ability',
    body: "Lifting means removing pigment after it's dried. Granulating pigments can often be re-wet and lifted. Staining pigments resist this. Knowing your palette's lifting profile lets you correct mistakes.",
    notes: '',
  },
  {
    id: 's-06',
    title: 'Quick reference chart',
    body: 'A 12-color palette mapped across four properties:\n• Transparency (T / ST / SO / O)\n• Staining (★ high stain)\n• Granulation (G = granulates)\n• Lightfastness (A–D, ASTM)',
    notes: 'Print this chart — students can tape it to their palette lid.',
  },
]

/* ── Question data ── */
const QUESTIONS: {
  id: string
  num: number
  type: QType
  marks: number
  text: string
  options: string[]
  correct: number
}[] = [
  {
    id: 'q-01',
    num: 1,
    type: 'mcq',
    marks: 1,
    text: 'What property determines whether a watercolor pigment can be removed from paper after drying?',
    options: ['Granulation', 'Staining ability', 'Transparency level', 'Lightfastness rating'],
    correct: 1,
  },
  {
    id: 'q-02',
    num: 2,
    type: 'true_false',
    marks: 1,
    text: 'All watercolor pigments are equally transparent when diluted with sufficient water.',
    options: ['True', 'False'],
    correct: 1,
  },
  {
    id: 'q-03',
    num: 3,
    type: 'mcq',
    marks: 1,
    text: 'Which of the following is a strongly staining pigment that bonds permanently with paper fibres on first contact?',
    options: [
      'Phthalo Blue (PB15:3)',
      'Yellow Ochre (PY43)',
      'Burnt Sienna (PR101)',
      'Raw Umber (PBr7)',
    ],
    correct: 0,
  },
  {
    id: 'q-04',
    num: 4,
    type: 'yes_no',
    marks: 1,
    text: 'Is it possible to mix a convincing neutral grey using only two complementary colors?',
    options: ['Yes', 'No'],
    correct: 0,
  },
  {
    id: 'q-05',
    num: 5,
    type: 'mcq',
    marks: 1,
    text: 'Granulation occurs because:',
    options: [
      'Heavy pigment particles settle into paper texture as the wash dries',
      'Paper absorbs too much water and warps',
      'The binder separates from pigment at high dilution',
      'Cold-press paper has a coating that repels pigment',
    ],
    correct: 0,
  },
  {
    id: 'q-06',
    num: 6,
    type: 'subjective',
    marks: 3,
    text: 'Describe the difference between a transparent and a semi-opaque watercolor pigment. Give one real-world example of each.',
    options: [],
    correct: -1,
  },
  {
    id: 'q-07',
    num: 7,
    type: 'true_false',
    marks: 1,
    text: 'Quinacridone Rose (PV19) is a granulating pigment.',
    options: ['True', 'False'],
    correct: 1,
  },
  {
    id: 'q-08',
    num: 8,
    type: 'mcq',
    marks: 1,
    text: 'Lightfastness in a watercolor pigment measures:',
    options: [
      'Resistance to fading under UV/light exposure',
      'The ability to be re-wet and lifted from paper',
      'Drying time relative to water content',
      'Pigment concentration in the tube',
    ],
    correct: 0,
  },
]

/* ──────────────────────────────────────────────────────────────────────
 * Selection state
 * ──────────────────────────────────────────────────────────────────── */
type Sel =
  | { kind: 'info' }
  | { kind: 'module'; mId: string; mNum: number; title: string }
  | { kind: 'lesson'; lId: string; type: LessonType; title: string; mId: string }
  | { kind: 'final_assessment' }

/* ──────────────────────────────────────────────────────────────────────
 * UI Primitives
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
function PrimaryBtn({
  children,
  Icon,
  onClick,
}: {
  children: ReactNode
  Icon?: LucideIcon
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-semibold"
      style={{
        background: `linear-gradient(180deg,${ACCENT} 0%,${ACCENT}d9 100%)`,
        color: ACCENT_DARK,
        boxShadow: `0 6px 18px -6px ${ACCENT}66`,
      }}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </button>
  )
}
function GhostBtn({
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
      className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-[12px] font-medium"
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
function TbBtn({
  Icon,
  title,
  active,
  onClick,
}: {
  Icon: LucideIcon
  title: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded transition-colors"
      style={{
        background: active ? ACCENT_SOFT : 'transparent',
        color: active ? ACCENT : 'var(--hm-text-muted)',
        border: active ? `1px solid ${ACCENT_BD}` : '1px solid transparent',
      }}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  )
}
function FI({
  label,
  children,
  hint,
  required,
}: {
  label: string
  children: ReactNode
  hint?: string
  required?: boolean
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
        <p className="text-[11px] mt-1" style={{ color: 'var(--hm-text-dim)' }}>
          {hint}
        </p>
      )}
    </label>
  )
}
function TI({
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
function TA({
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
function SelInput({
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
        className="w-full appearance-none px-3 pr-8 h-9 rounded-lg text-[12.5px] outline-none"
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
        className="h-3 w-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--hm-text-dim)' }}
      />
    </div>
  )
}
function Tog({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked)
  return (
    <button type="button" onClick={() => setOn(!on)} className="flex items-center gap-2.5">
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
          style={{ background: on ? ACCENT_DARK : 'var(--hm-text-dim)', left: on ? 16 : 2 }}
        />
      </span>
      <span className="text-[12px]" style={{ color: 'var(--hm-text)' }}>
        {label}
      </span>
    </button>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * AI Generate Course Modal
 * ──────────────────────────────────────────────────────────────────── */
const VIOLET = '#7C5CF6'
const VIOLET_SOFT = 'rgba(124,92,246,0.14)'
const VIOLET_BD = 'rgba(124,92,246,0.35)'

const CHIP_KEYS = [
  'aiChip1',
  'aiChip2',
  'aiChip3',
  'aiChip4',
  'aiChip5',
  'aiChip6',
  'aiChip7',
  'aiChip8',
] as const
const EXAMPLE_KEYS = [
  { labelKey: 'aiExLabel1', promptKey: 'aiExPrompt1' },
  { labelKey: 'aiExLabel2', promptKey: 'aiExPrompt2' },
  { labelKey: 'aiExLabel3', promptKey: 'aiExPrompt3' },
] as const
const TIP_KEYS = [
  { icon: '🎯', labelKey: 'aiTipPurpose', hintKey: 'aiTipPurposeHint' },
  { icon: '👤', labelKey: 'aiTipAudience', hintKey: 'aiTipAudienceHint' },
  { icon: '📦', labelKey: 'aiTipModules', hintKey: 'aiTipModulesHint' },
  { icon: '📝', labelKey: 'aiTipLessons', hintKey: 'aiTipLessonsHint' },
  { icon: '✅', labelKey: 'aiTipAssessment', hintKey: 'aiTipAssessmentHint' },
  { icon: '⏱️', labelKey: 'aiTipDuration', hintKey: 'aiTipDurationHint' },
] as const

function AIGenerateModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const [prompt, setPrompt] = useState('')
  const [showTips, setShowTips] = useState(true)
  const [activeExample, setActiveExample] = useState<number | null>(null)

  function applyExample(idx: number) {
    setActiveExample(idx)
    setPrompt(t(`creatorEdit.${EXAMPLE_KEYS[idx].promptKey}`))
  }

  function appendChip(chip: string) {
    setPrompt((p) => (p ? `${p.trimEnd()}, ${chip}` : chip))
  }

  const charCount = prompt.length
  const LIMIT = 1200

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="flex flex-col w-full max-w-[780px] rounded-2xl overflow-hidden"
        style={{
          maxHeight: 'calc(100vh - 48px)',
          background: 'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
          border: '1px solid var(--hm-border-strong)',
          boxShadow: '0 48px 96px -12px rgba(0,0,0,0.90), 0 0 0 1px rgba(124,92,246,0.12)',
        }}
      >
        {/* ── Header ── */}
        <div
          className="shrink-0 flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          {/* Icon */}
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
            style={{
              background: `linear-gradient(135deg, ${VIOLET_SOFT} 0%, rgba(167,139,250,0.22) 100%)`,
              border: `1px solid ${VIOLET_BD}`,
              boxShadow: `0 0 24px ${VIOLET}33`,
            }}
          >
            <Wand2 className="h-4.5 w-4.5" style={{ color: VIOLET }} />
          </span>

          <div className="flex-1 min-w-0">
            <h2
              className="text-[16px] font-semibold tracking-tight"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.015em' }}
            >
              {t('creatorEdit.aiModalTitle')}
            </h2>
            <p className="text-[12px] mt-0.5" style={{ color: 'var(--hm-text-muted)' }}>
              {t('creatorEdit.aiModalSubtitle')}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
            style={{
              background: 'var(--hm-bg-card-2)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-muted)',
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto hm-scroll px-5 py-4 flex flex-col gap-4">
          {/* ── Example prompts ── */}
          <div>
            <p
              className="hm-mono text-[9.5px] font-bold mb-2"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              {t('creatorEdit.aiExamplesLabel')}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {EXAMPLE_KEYS.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyExample(i)}
                  className="text-left rounded-xl p-3 transition-all"
                  style={{
                    background:
                      activeExample === i
                        ? `linear-gradient(135deg, ${VIOLET_SOFT} 0%, rgba(167,139,250,0.10) 100%)`
                        : 'var(--hm-bg-card-2)',
                    border: `1px solid ${activeExample === i ? VIOLET_BD : 'var(--hm-border)'}`,
                    boxShadow: activeExample === i ? `0 0 0 1px ${VIOLET}22` : 'none',
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles
                      className="h-3 w-3 shrink-0"
                      style={{ color: activeExample === i ? VIOLET : 'var(--hm-text-dim)' }}
                    />
                    <span
                      className="text-[11.5px] font-semibold"
                      style={{ color: activeExample === i ? VIOLET : 'var(--hm-text)' }}
                    >
                      {t(`creatorEdit.${ex.labelKey}`)}
                    </span>
                  </div>
                  <p
                    className="text-[10.5px] leading-relaxed line-clamp-2"
                    style={{ color: 'var(--hm-text-muted)' }}
                  >
                    {t(`creatorEdit.${ex.promptKey}`)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* ── Prompt textarea ── */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p
                className="hm-mono text-[9.5px] font-bold"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
              >
                {t('creatorEdit.aiYourPrompt')}
              </p>
              <span
                className="hm-mono text-[9.5px]"
                style={{ color: charCount > LIMIT * 0.9 ? ROSE : 'var(--hm-text-dim)' }}
              >
                {charCount} / {LIMIT}
              </span>
            </div>

            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                border: `1px solid ${prompt ? VIOLET_BD : 'var(--hm-border-strong)'}`,
                background: 'var(--hm-bg-card-2)',
                boxShadow: prompt ? `0 0 0 3px ${VIOLET}14` : 'none',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
            >
              {/* Subtle glow overlay when focused */}
              <div
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  background: prompt
                    ? `radial-gradient(circle at 0% 0%, ${VIOLET}0f 0%, transparent 50%)`
                    : 'transparent',
                }}
              />
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={7}
                placeholder={t('creatorEdit.aiPromptPlaceholder')}
                className="relative w-full px-4 py-3 text-[13px] outline-none resize-none bg-transparent"
                style={{
                  color: 'var(--hm-text)',
                  lineHeight: 1.65,
                  zIndex: 1,
                }}
                maxLength={LIMIT}
              />
            </div>
          </div>

          {/* ── Quick-add chips ── */}
          <div>
            <p
              className="hm-mono text-[9.5px] font-bold mb-2"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              {t('creatorEdit.aiQuickAdd')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CHIP_KEYS.map((chipKey) => {
                const chip = t(`creatorEdit.${chipKey}`)
                return (
                  <button
                    key={chipKey}
                    type="button"
                    onClick={() => appendChip(chip)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      border: '1px solid var(--hm-border)',
                      color: 'var(--hm-text-muted)',
                    }}
                  >
                    <Plus className="h-2.5 w-2.5" />
                    {chip}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Prompt tips collapsible ── */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
          >
            <button
              type="button"
              onClick={() => setShowTips((v) => !v)}
              className="w-full flex items-center gap-2 px-4 py-2.5"
            >
              <Lightbulb className="h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} />
              <span
                className="text-[12px] font-medium flex-1 text-left"
                style={{ color: 'var(--hm-text)' }}
              >
                {t('creatorEdit.aiTipsLabel')}
              </span>
              {showTips ? (
                <ChevronUp
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: 'var(--hm-text-dim)' }}
                />
              ) : (
                <ChevronDown
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: 'var(--hm-text-dim)' }}
                />
              )}
            </button>

            {showTips && (
              <div
                className="grid grid-cols-3 gap-px"
                style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-border)' }}
              >
                {TIP_KEYS.map(({ icon, labelKey, hintKey }) => (
                  <div
                    key={labelKey}
                    className="flex items-start gap-2.5 px-4 py-3"
                    style={{ background: 'var(--hm-bg-card)' }}
                  >
                    <span className="text-[15px] shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <p className="text-[12px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                        {t(`creatorEdit.${labelKey}`)}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--hm-text-muted)' }}>
                        {t(`creatorEdit.${hintKey}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="shrink-0 flex items-center justify-between gap-3 px-5 py-3.5"
          style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <p className="text-[11.5px]" style={{ color: 'var(--hm-text-dim)' }}>
            {t('creatorEdit.aiFooterDisclaimer')}
          </p>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg text-[12.5px] font-medium"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              {t('creatorEdit.aiCancel')}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 h-9 rounded-lg text-[12.5px] font-semibold transition-all"
              style={{
                background: prompt
                  ? `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`
                  : 'var(--hm-bg-card-2)',
                color: prompt ? 'white' : 'var(--hm-text-dim)',
                border: `1px solid ${prompt ? 'transparent' : 'var(--hm-border)'}`,
                boxShadow: prompt ? `0 8px 24px -8px ${VIOLET}66` : 'none',
                cursor: prompt ? 'pointer' : 'not-allowed',
              }}
            >
              <Wand2 className="h-3.5 w-3.5" />
              {t('creatorEdit.aiGenerate')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * Top bar  (now carries the Details / Curriculum mode toggle)
 * ──────────────────────────────────────────────────────────────────── */
function TopBar({
  onBack,
  mode,
  setMode,
  onAI,
}: {
  onBack: () => void
  mode: Mode
  setMode: (m: Mode) => void
  onAI: () => void
}) {
  const { t } = useTranslation()
  return (
    <div
      className="shrink-0 flex items-center gap-3 px-4 py-2.5"
      style={{
        borderBottom: '1px solid var(--hm-border)',
        background: 'var(--hm-bg-card)',
        zIndex: 10,
      }}
    >
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border)',
          color: 'var(--hm-text-muted)',
        }}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
      </button>

      {/* Breadcrumb */}
      <div className="min-w-0 mr-1">
        <p
          className="hm-mono text-[9px]"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
        >
          {t('creatorEdit.breadcrumbCourses')}
        </p>
        <p
          className="text-[13px] font-semibold tracking-tight leading-tight"
          style={{ color: 'var(--hm-text)' }}
        >
          {t('creatorEdit.editCourseTitle')}
        </p>
      </div>

      {/* Mode toggle — centred */}
      <div
        className="flex items-center gap-1 rounded-lg p-0.5 mx-auto"
        style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
      >
        {(
          [
            { id: 'details', label: t('creatorEdit.tabDetails'), Icon: Info },
            { id: 'curriculum', label: t('creatorEdit.tabCurriculum'), Icon: Layers },
          ] as { id: Mode; label: string; Icon: LucideIcon }[]
        ).map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className="inline-flex items-center gap-1.5 px-3 h-7 rounded-md text-[12px] font-semibold transition-all"
            style={{
              background: mode === id ? 'var(--hm-bg-card)' : 'transparent',
              color:
                mode === id ? (id === 'details' ? ACCENT : 'var(--hm-text)') : 'var(--hm-text-dim)',
              border: mode === id ? '1px solid var(--hm-border)' : '1px solid transparent',
              boxShadow: mode === id ? '0 1px 4px rgba(0,0,0,0.25)' : 'none',
            }}
          >
            <Icon className="h-3 w-3" />
            {label}
          </button>
        ))}
      </div>

      {/* Right actions */}
      {/* AI Generate button */}
      <button
        type="button"
        onClick={onAI}
        className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-semibold transition-all"
        style={{
          background: `linear-gradient(135deg, ${VIOLET_SOFT} 0%, rgba(167,139,250,0.18) 100%)`,
          border: `1px solid ${VIOLET_BD}`,
          color: '#A78BFA',
          boxShadow: `0 4px 14px -6px ${VIOLET}44`,
        }}
      >
        <Wand2 className="h-3.5 w-3.5" />
        {t('creatorEdit.btnGenerateAi')}
      </button>

      <Pill tone="success">{t('creatorEdit.published')}</Pill>
      <div className="w-px h-5" style={{ background: 'var(--hm-border)' }} />
      <GhostBtn Icon={X}>{t('creatorEdit.btnDiscard')}</GhostBtn>
      <PrimaryBtn Icon={Save}>{t('creatorEdit.btnSave')}</PrimaryBtn>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * Details Panel — compact all-in-one course info editor
 * ──────────────────────────────────────────────────────────────────── */
function DetailsPanel() {
  const { t } = useTranslation()
  const [pricing, setPricing] = useState<'free' | 'paid'>('paid')

  return (
    <div
      className="flex-1 overflow-y-auto hm-scroll px-6 py-5"
      style={{ background: 'var(--hm-bg-base)' }}
    >
      {/* ── Course overview banner (folded in from prior list-detail screen) ── */}
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
            <BookOpen className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p
              className="hm-mono text-[10px] mb-1"
              style={{ color: ACCENT, letterSpacing: '0.18em' }}
            >
              {t('creatorEdit.courseEyebrow')} · #WF-01
            </p>
            <h2
              className="text-[20px] font-semibold tracking-tight mb-1.5 truncate"
              style={{ color: 'var(--hm-text)', fontFamily: 'var(--hm-font-display)' }}
            >
              Watercolor Foundations
            </h2>
            <div
              className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[12px]"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              <span>Arts &amp; Crafts</span>
              <span style={{ color: 'var(--hm-text-dim)' }}>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />{' '}
                {t('creatorEdit.lessonsDuration', { lessons: 42, duration: '18h 24m' })}
              </span>
              <span style={{ color: 'var(--hm-text-dim)' }}>·</span>
              <span>{t('creatorEdit.enrolled', { value: '2,140' })}</span>
              <span style={{ color: 'var(--hm-text-dim)' }}>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" /> {t('creatorEdit.rating', { value: '4.9' })}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <Pill tone="success">{t('creatorEdit.published')}</Pill>
              <Pill tone="success">{t('creatorEdit.beginner')}</Pill>
              <span
                className="hm-mono text-[10px] ml-1"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
              >
                {t('creatorEdit.creditsReward', { credits: 240, reward: 50, date: 'Mar 18' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact 2-col grid */}
      <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 288px' }}>
        {/* ── LEFT: text fields ── */}
        <div className="flex flex-col gap-4">
          {/* Title + subtitle */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9.5px] font-bold tracking-[0.12em]"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              {t('creatorEdit.sectionIdentity')}
            </p>
            <FI label={t('creatorEdit.fieldCourseTitle')} required>
              <TI defaultValue="Watercolor Foundations: From First Wash to Confident Composition" />
            </FI>
            <FI label={t('creatorEdit.fieldSubtitle')} hint={t('creatorEdit.fieldSubtitleHint')}>
              <TI defaultValue="Master observation, color, and the four fundamental washes in 42 hands-on lessons." />
            </FI>
          </div>

          {/* Description */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9.5px] font-bold tracking-[0.12em]"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              {t('creatorEdit.sectionDescription')}
            </p>
            <FI
              label={t('creatorEdit.fieldCourseDescription')}
              hint={t('creatorEdit.fieldCourseDescriptionHint')}
            >
              <TA
                rows={5}
                defaultValue="This course is the most thorough introduction to watercolor painting on HyperMind. You will learn how to set up a minimal studio, understand how pigments behave on paper, and master the four foundational wash techniques — flat, graded, variegated, and wet-on-wet — before moving into botanical illustration and the final project."
              />
            </FI>
          </div>

          {/* Meta row: category + level + language */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9.5px] font-bold tracking-[0.12em]"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              {t('creatorEdit.sectionClassification')}
            </p>
            <div className="grid grid-cols-3 gap-3">
              <FI label={t('creatorEdit.fieldCategory')}>
                <SelInput
                  defaultValue="arts"
                  options={[
                    { value: 'arts', label: 'Arts & Crafts' },
                    { value: 'music', label: 'Music' },
                    { value: 'tech', label: 'Technology' },
                    { value: 'biz', label: 'Business' },
                    { value: 'science', label: 'Science' },
                  ]}
                />
              </FI>
              <FI label={t('creatorEdit.fieldLevel')}>
                <SelInput
                  defaultValue="beginner"
                  options={[
                    { value: 'beginner', label: 'Beginner' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'advanced', label: 'Advanced' },
                    { value: 'all', label: 'All levels' },
                  ]}
                />
              </FI>
              <FI label={t('creatorEdit.fieldLanguage')}>
                <SelInput
                  defaultValue="en"
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'zh', label: 'Mandarin' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                  ]}
                />
              </FI>
            </div>
            <FI label={t('creatorEdit.fieldTags')} hint={t('creatorEdit.fieldTagsHint')}>
              <div className="relative">
                <Tag
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
                  style={{ color: 'var(--hm-text-dim)' }}
                />
                <input
                  type="text"
                  defaultValue="watercolor, painting, botanical, plein-air, color theory, beginner, studio"
                  className="w-full pl-9 pr-3 h-9 rounded-lg text-[12.5px] outline-none"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    color: 'var(--hm-text)',
                  }}
                />
              </div>
            </FI>
          </div>

          {/* Settings toggles */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9.5px] font-bold tracking-[0.12em]"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              {t('creatorEdit.sectionSettings')}
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              <Tog defaultChecked label={t('creatorEdit.togCertificate')} />
              <Tog defaultChecked label={t('creatorEdit.togPubliclyListed')} />
              <Tog defaultChecked label={t('creatorEdit.togAllowReviews')} />
              <Tog defaultChecked={false} label={t('creatorEdit.togRequireApproval')} />
              <Tog defaultChecked label={t('creatorEdit.togForumEnabled')} />
              <Tog defaultChecked={false} label={t('creatorEdit.togDripContent')} />
            </div>
          </div>
        </div>

        {/* ── RIGHT: thumbnail + pricing ── */}
        <div className="flex flex-col gap-4">
          {/* Thumbnail */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9.5px] font-bold tracking-[0.12em]"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              {t('creatorEdit.sectionCoverImage')}
            </p>
            {/* Thumbnail preview */}
            <div
              className="relative h-36 rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(244,178,108,0.16) 0%, rgba(124,92,246,0.12) 100%)',
                border: '2px dashed var(--hm-border-strong)',
              }}
            >
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 288 144"
                preserveAspectRatio="xMidYMid slice"
              >
                <circle cx="240" cy="20" r="70" fill="#F4B26C" fillOpacity="0.25" />
                <circle cx="40" cy="120" r="50" fill="#7C5CF6" fillOpacity="0.18" />
              </svg>
              <div className="relative flex flex-col items-center gap-1.5 text-center">
                <Upload className="h-5 w-5" style={{ color: 'var(--hm-text-dim)' }} />
                <p className="text-[11.5px] font-medium" style={{ color: 'var(--hm-text-muted)' }}>
                  {t('creatorEdit.clickUpload')}
                </p>
                <p className="hm-mono text-[9px]" style={{ color: 'var(--hm-text-dim)' }}>
                  {t('creatorEdit.thumbFormat')}
                </p>
              </div>
            </div>
            <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
              {t('creatorEdit.thumbHint')}
            </p>
          </div>

          {/* Pricing */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9.5px] font-bold tracking-[0.12em]"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              {t('creatorEdit.sectionPricing')}
            </p>
            {/* Free / Paid toggle */}
            <div
              className="flex rounded-lg overflow-hidden"
              style={{ border: '1px solid var(--hm-border)' }}
            >
              {(['free', 'paid'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPricing(p)}
                  className="flex-1 py-1.5 text-[12px] font-semibold capitalize transition-all"
                  style={{
                    background:
                      pricing === p
                        ? p === 'free'
                          ? 'rgba(94,230,168,0.14)'
                          : ACCENT_SOFT
                        : 'var(--hm-bg-card-2)',
                    color:
                      pricing === p ? (p === 'free' ? '#5EE6A8' : ACCENT) : 'var(--hm-text-dim)',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            {pricing === 'paid' && (
              <div className="flex flex-col gap-2.5">
                <FI label={t('creatorEdit.fieldPriceCredits')}>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
                      style={{ color: 'var(--hm-text-dim)' }}
                    />
                    <input
                      type="number"
                      defaultValue={30}
                      className="w-full pl-9 pr-3 h-9 rounded-lg text-[12.5px] outline-none hm-mono"
                      style={{
                        background: 'var(--hm-bg-card-2)',
                        border: '1px solid var(--hm-border)',
                        color: 'var(--hm-text)',
                      }}
                    />
                  </div>
                </FI>
                <FI
                  label={t('creatorEdit.fieldDiscountedPrice')}
                  hint={t('creatorEdit.fieldDiscountedPriceHint')}
                >
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
                      style={{ color: 'var(--hm-text-dim)' }}
                    />
                    <input
                      type="number"
                      placeholder={t('creatorEdit.discountedPlaceholder')}
                      className="w-full pl-9 pr-3 h-9 rounded-lg text-[12.5px] outline-none hm-mono"
                      style={{
                        background: 'var(--hm-bg-card-2)',
                        border: '1px solid var(--hm-border)',
                        color: 'var(--hm-text)',
                      }}
                    />
                  </div>
                </FI>
              </div>
            )}
            {pricing === 'free' && (
              <p className="text-[11.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                {t('creatorEdit.pricingFreeNotice')}
              </p>
            )}
          </div>

          {/* Preview URL */}
          <div
            className="rounded-xl p-4 flex flex-col gap-2"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9.5px] font-bold tracking-[0.12em]"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              {t('creatorEdit.sectionPreviewUrl')}
            </p>
            <div className="relative">
              <Globe
                className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
                style={{ color: 'var(--hm-text-dim)' }}
              />
              <input
                type="text"
                defaultValue="hypermind.io/c/watercolor-foundations"
                className="w-full pl-9 pr-3 h-9 rounded-lg text-[11.5px] outline-none hm-mono"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * Left tree
 * ──────────────────────────────────────────────────────────────────── */
function LeftTree({
  sel,
  setSel,
  expanded,
  setExpanded,
  collapsed,
  onToggleCollapse,
}: {
  sel: Sel
  setSel: (s: Sel) => void
  expanded: Set<string>
  setExpanded: React.Dispatch<React.SetStateAction<Set<string>>>
  collapsed: boolean
  onToggleCollapse: () => void
}) {
  const { t } = useTranslation()
  const toggleExp = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  const infoSel = sel.kind === 'info'

  /* ── Collapsed icon-rail ── */
  if (collapsed) {
    return (
      <div
        className="shrink-0 flex flex-col overflow-hidden"
        style={{
          width: 44,
          borderRight: '1px solid var(--hm-border)',
          background: 'var(--hm-bg-elev)',
          height: '100%',
        }}
      >
        {/* Expand button */}
        <div
          style={{
            height: 44,
            borderBottom: '1px solid var(--hm-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={onToggleCollapse}
            title={t('creatorEdit.expandTree')}
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT_BD}`, color: ACCENT }}
          >
            <PanelLeftOpen className="h-3.5 w-3.5" />
          </button>
        </div>
        {/* Module icon strip */}
        <div className="flex-1 overflow-y-auto hm-scroll py-2 flex flex-col items-center gap-1">
          {/* Course info icon */}
          <button
            type="button"
            onClick={() => setSel({ kind: 'info' })}
            title={t('creatorEdit.courseInfoTitle')}
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{
              background: infoSel ? ACCENT_SOFT : 'var(--hm-bg-card)',
              border: `1px solid ${infoSel ? ACCENT_BD : 'var(--hm-border)'}`,
              color: infoSel ? ACCENT : 'var(--hm-text-dim)',
            }}
          >
            <BookOpen className="h-3.5 w-3.5" />
          </button>
          <div style={{ height: 1, width: 28, background: 'var(--hm-border)', margin: '2px 0' }} />
          {TREE.map((mod) => {
            const modSel = sel.kind === 'module' && sel.mId === mod.id
            const lessonSel = sel.kind === 'lesson' && sel.mId === mod.id
            const isActive = modSel || lessonSel
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() =>
                  setSel({ kind: 'module', mId: mod.id, mNum: mod.num, title: mod.title })
                }
                title={`M${String(mod.num).padStart(2, '0')} — ${mod.title}`}
                className="hm-mono flex h-7 w-7 items-center justify-center rounded-lg text-[9px] font-semibold"
                style={{
                  background: isActive ? ACCENT_SOFT : 'var(--hm-bg-card)',
                  border: `1px solid ${isActive ? ACCENT_BD : 'var(--hm-border)'}`,
                  color: isActive ? ACCENT : 'var(--hm-text-dim)',
                  letterSpacing: '0.04em',
                }}
              >
                {mod.num}
              </button>
            )
          })}
          <div style={{ height: 1, width: 28, background: 'var(--hm-border)', margin: '4px 0' }} />
          <button
            type="button"
            onClick={() => setSel({ kind: 'final_assessment' })}
            title={t('creatorEdit.finalAssessmentTitle')}
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{
              background: sel.kind === 'final_assessment' ? VIOLET_SOFT : 'var(--hm-bg-card)',
              border: `1px solid ${sel.kind === 'final_assessment' ? VIOLET_BD : 'var(--hm-border)'}`,
              color: sel.kind === 'final_assessment' ? VIOLET : 'var(--hm-text-dim)',
            }}
          >
            <Award className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="shrink-0 flex flex-col overflow-hidden"
      style={{
        width: 240,
        borderRight: '1px solid var(--hm-border)',
        background: 'var(--hm-bg-elev)',
        height: '100%',
      }}
    >
      {/* Collapse toggle header */}
      <div
        className="shrink-0 flex items-center justify-between px-3 py-2"
        style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card)' }}
      >
        <span
          className="hm-mono text-[9px] font-semibold"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
        >
          MODULE TREE
        </span>
        <button
          type="button"
          onClick={onToggleCollapse}
          title={t('creatorEdit.collapseTree')}
          className="flex h-6 w-6 items-center justify-center rounded"
          style={{
            background: 'var(--hm-bg-card-2)',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text-dim)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = ACCENT
            e.currentTarget.style.borderColor = ACCENT_BD
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--hm-text-dim)'
            e.currentTarget.style.borderColor = 'var(--hm-border)'
          }}
        >
          <PanelLeftClose className="h-3 w-3" />
        </button>
      </div>

      {/* Curriculum label */}
      <div className="px-3.5 pt-3 pb-1.5 shrink-0 flex items-center justify-between">
        <span
          className="hm-mono text-[9.5px] font-semibold"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
        >
          {t('creatorEdit.curriculum')}
        </span>
        <button
          type="button"
          title={t('creatorEdit.addModule')}
          className="flex h-5 w-5 items-center justify-center rounded"
          style={{
            color: 'var(--hm-text-dim)',
            background: 'var(--hm-bg-card)',
            border: '1px solid var(--hm-border)',
          }}
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      {/* Module + lesson tree */}
      <div className="flex-1 overflow-y-auto hm-scroll pb-3">
        {TREE.map((mod) => {
          const isExp = expanded.has(mod.id)
          const modSel = sel.kind === 'module' && sel.mId === mod.id
          return (
            <div key={mod.id}>
              {/* Module header row */}
              <div
                className="flex items-center gap-1 px-2 py-0.5 group relative"
                style={{ background: modSel ? ACCENT_SOFT : 'transparent' }}
              >
                {modSel && (
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      bottom: 4,
                      width: 3,
                      background: ACCENT,
                      borderRadius: 2,
                    }}
                  />
                )}
                <GripVertical
                  className="h-3 w-3 shrink-0 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--hm-text-dim)' }}
                />
                <button
                  type="button"
                  onClick={() => toggleExp(mod.id)}
                  className="flex h-5 w-5 items-center justify-center rounded shrink-0"
                  style={{ color: 'var(--hm-text-dim)' }}
                >
                  {isExp ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSel({ kind: 'module', mId: mod.id, mNum: mod.num, title: mod.title })
                  }
                  className="flex items-center gap-1.5 flex-1 min-w-0 py-1.5 text-left"
                >
                  <span
                    className="hm-mono text-[9px] shrink-0 px-1 rounded"
                    style={{
                      background: ACCENT_SOFT,
                      color: ACCENT,
                      border: `1px solid ${ACCENT}33`,
                      letterSpacing: '0.04em',
                    }}
                  >
                    M{String(mod.num).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[11.5px] font-medium truncate"
                    style={{ color: modSel ? ACCENT : 'var(--hm-text)' }}
                  >
                    {mod.title}
                  </span>
                </button>
                <button
                  type="button"
                  className="h-5 w-5 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  style={{ color: 'var(--hm-text-dim)' }}
                >
                  <MoreHorizontal className="h-3 w-3" />
                </button>
              </div>

              {/* Lesson rows */}
              {isExp && (
                <div>
                  {mod.lessons.map((les) => {
                    const meta = LMETA[les.type]
                    const lSel = sel.kind === 'lesson' && sel.lId === les.id
                    return (
                      <div
                        key={les.id}
                        className="flex items-center gap-1.5 pl-9 pr-2 py-1 group relative cursor-pointer"
                        style={{ background: lSel ? ACCENT_SOFT : 'transparent' }}
                        onClick={() =>
                          setSel({
                            kind: 'lesson',
                            lId: les.id,
                            type: les.type,
                            title: les.title,
                            mId: mod.id,
                          })
                        }
                      >
                        {lSel && (
                          <span
                            aria-hidden
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: 3,
                              bottom: 3,
                              width: 3,
                              background: ACCENT,
                              borderRadius: 2,
                              boxShadow: `0 0 6px ${ACCENT}`,
                            }}
                          />
                        )}
                        <GripVertical
                          className="h-3 w-3 shrink-0 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--hm-text-dim)' }}
                        />
                        <span
                          className="hm-mono text-[9px] w-5 text-center shrink-0"
                          style={{ color: lSel ? ACCENT : 'var(--hm-text-dim)' }}
                        >
                          {String(les.num).padStart(2, '0')}
                        </span>
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded shrink-0"
                          style={{ background: TONE_BG[meta.tone], color: TONE_FG[meta.tone] }}
                        >
                          <meta.Icon className="h-3 w-3" />
                        </span>
                        <span
                          className="text-[11px] truncate flex-1"
                          style={{ color: lSel ? ACCENT : 'var(--hm-text-muted)' }}
                        >
                          {les.title}
                        </span>
                      </div>
                    )
                  })}
                  {/* Add lesson */}
                  <button
                    type="button"
                    className="flex items-center gap-1.5 pl-9 pr-2 py-1.5 w-full text-[10.5px] font-medium"
                    style={{ color: 'var(--hm-text-dim)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = ACCENT
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--hm-text-dim)'
                    }}
                  >
                    <Plus className="h-3 w-3" /> Add lesson
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {/* ── Final Assessment row ── */}
        <div
          style={{
            borderTop: '1px solid var(--hm-border)',
            marginTop: 6,
            paddingTop: 6,
            paddingBottom: 4,
          }}
        >
          <div className="px-3.5 pb-1 flex items-center justify-between">
            <span
              className="hm-mono text-[9px] font-semibold"
              style={{ color: VIOLET, letterSpacing: '0.16em' }}
            >
              FINAL ASSESSMENT
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSel({ kind: 'final_assessment' })}
            className="flex items-center gap-2 w-full px-3.5 py-1.5 relative group"
            style={{ background: sel.kind === 'final_assessment' ? VIOLET_SOFT : 'transparent' }}
          >
            {sel.kind === 'final_assessment' && (
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 3,
                  bottom: 3,
                  width: 3,
                  background: VIOLET,
                  borderRadius: 2,
                }}
              />
            )}
            <span
              className="flex h-5 w-5 items-center justify-center rounded shrink-0"
              style={{
                background: sel.kind === 'final_assessment' ? `${VIOLET}22` : 'var(--hm-bg-card-2)',
                color: sel.kind === 'final_assessment' ? VIOLET : 'var(--hm-text-dim)',
                border: `1px solid ${sel.kind === 'final_assessment' ? VIOLET + '40' : 'var(--hm-border)'}`,
              }}
            >
              <Award className="h-3 w-3" />
            </span>
            <span
              className="text-[11.5px] font-medium flex-1 truncate text-left"
              style={{ color: sel.kind === 'final_assessment' ? VIOLET : 'var(--hm-text)' }}
            >
              Final Assessment
            </span>
            <span
              className="hm-mono text-[8.5px] px-1.5 py-0.5 rounded shrink-0"
              style={{
                background: 'rgba(139,146,168,0.16)',
                color: 'var(--hm-text-dim)',
                letterSpacing: '0.06em',
              }}
            >
              OPTIONAL
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * Context banner (below top bar, above center panel)
 * ──────────────────────────────────────────────────────────────────── */
function ContextBanner({ sel }: { sel: Sel }) {
  const { t } = useTranslation()
  if (sel.kind === 'final_assessment')
    return (
      <div
        className="shrink-0 flex items-center gap-2 px-5 py-2.5"
        style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card)' }}
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded"
          style={{ background: VIOLET_SOFT, color: VIOLET, border: `1px solid ${VIOLET_BD}` }}
        >
          <Award className="h-3.5 w-3.5" />
        </span>
        <span
          className="hm-mono text-[11px] font-semibold"
          style={{ color: VIOLET, letterSpacing: '0.1em' }}
        >
          {t('creatorEdit.sectionFinalAssessment')}
        </span>
        <span style={{ color: 'var(--hm-text-dim)' }}>·</span>
        <span className="text-[12px]" style={{ color: 'var(--hm-text-muted)' }}>
          Watercolor Foundations
        </span>
        <Pill tone="neutral">optional</Pill>
      </div>
    )
  if (sel.kind === 'info')
    return (
      <div
        className="shrink-0 flex items-center gap-2 px-5 py-2.5"
        style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card)' }}
      >
        <BookOpen className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
        <span
          className="hm-mono text-[11px] font-semibold"
          style={{ color: ACCENT, letterSpacing: '0.1em' }}
        >
          {t('creatorEdit.sectionCourseMetadata')}
        </span>
        <span style={{ color: 'var(--hm-text-dim)' }}>·</span>
        <span className="text-[12px]" style={{ color: 'var(--hm-text-muted)' }}>
          Watercolor Foundations
        </span>
      </div>
    )
  if (sel.kind === 'module')
    return (
      <div
        className="shrink-0 flex items-center gap-2 px-5 py-2.5"
        style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card)' }}
      >
        <span
          className="hm-mono text-[10px] px-1.5 rounded"
          style={{ background: ACCENT_SOFT, color: ACCENT, border: `1px solid ${ACCENT}33` }}
        >
          M{String(sel.mNum).padStart(2, '0')}
        </span>
        <span className="text-[12px] font-medium truncate" style={{ color: 'var(--hm-text)' }}>
          {sel.title}
        </span>
        <Pill tone="warning">module</Pill>
      </div>
    )
  const meta = LMETA[sel.type]
  return (
    <div
      className="shrink-0 flex items-center gap-2 px-5 py-2.5"
      style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card)' }}
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded"
        style={{ background: TONE_BG[meta.tone], color: TONE_FG[meta.tone] }}
      >
        <meta.Icon className="h-3.5 w-3.5" />
      </span>
      <span
        className="hm-mono text-[10px] font-semibold"
        style={{ color: TONE_FG[meta.tone], letterSpacing: '0.12em' }}
      >
        {meta.label.toUpperCase()} LESSON
      </span>
      <span style={{ color: 'var(--hm-text-dim)' }}>·</span>
      <span className="text-[12px] font-medium truncate flex-1" style={{ color: 'var(--hm-text)' }}>
        {sel.title}
      </span>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * SLIDE STUDIO — text lesson (PPT-like)
 * ──────────────────────────────────────────────────────────────────── */
function SlideStudio() {
  const { t } = useTranslation()
  const [activeSlide, setActiveSlide] = useState(2)
  const [fmts, setFmts] = useState<string[]>([])
  const toggleFmt = (f: string) =>
    setFmts((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))
  const slide = SLIDES[activeSlide]

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Formatting toolbar */}
      <div
        className="shrink-0 flex items-center gap-0.5 px-4 py-2 flex-wrap"
        style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
      >
        <TbBtn
          Icon={Bold}
          title={t('creatorEdit.tbBold')}
          active={fmts.includes('bold')}
          onClick={() => toggleFmt('bold')}
        />
        <TbBtn
          Icon={Italic}
          title={t('creatorEdit.tbItalic')}
          active={fmts.includes('italic')}
          onClick={() => toggleFmt('italic')}
        />
        <TbBtn
          Icon={Underline}
          title={t('creatorEdit.tbUnderline')}
          active={fmts.includes('underline')}
          onClick={() => toggleFmt('underline')}
        />
        <span className="w-px h-5 mx-1.5 shrink-0" style={{ background: 'var(--hm-border)' }} />
        <TbBtn
          Icon={Type}
          title={t('creatorEdit.tbHeading1')}
          active={fmts.includes('h1')}
          onClick={() => toggleFmt('h1')}
        />
        <TbBtn
          Icon={Hash}
          title={t('creatorEdit.tbHeading2')}
          active={fmts.includes('h2')}
          onClick={() => toggleFmt('h2')}
        />
        <TbBtn
          Icon={AlignLeft}
          title={t('creatorEdit.tbBody')}
          active={fmts.includes('body')}
          onClick={() => toggleFmt('body')}
        />
        <span className="w-px h-5 mx-1.5 shrink-0" style={{ background: 'var(--hm-border)' }} />
        <TbBtn
          Icon={List}
          title={t('creatorEdit.tbBullets')}
          active={fmts.includes('list')}
          onClick={() => toggleFmt('list')}
        />
        <TbBtn Icon={Link2} title={t('creatorEdit.tbLink')} />
        <TbBtn Icon={ImageIcon} title={t('creatorEdit.tbImage')} />
        <div className="flex-1" />
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded text-[11px] font-medium"
          style={{ background: ACCENT_SOFT, color: ACCENT, border: `1px solid ${ACCENT_BD}` }}
        >
          <Plus className="h-3 w-3" /> Slide
        </button>
        <div className="w-px h-5 mx-1.5" style={{ background: 'var(--hm-border)' }} />
        <TbBtn Icon={MoreHorizontal} title={t('creatorEdit.tbSlideOptions')} />
      </div>

      {/* Body: strip + canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide thumbnail strip */}
        <div
          className="shrink-0 flex flex-col gap-2 overflow-y-auto py-3 px-2 hm-scroll"
          style={{
            width: 132,
            borderRight: '1px solid var(--hm-border)',
            background: 'var(--hm-bg-elev)',
          }}
        >
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSlide(i)}
              className="flex flex-col gap-1 rounded-lg overflow-hidden shrink-0 text-left w-full transition-all"
              style={{
                border: `2px solid ${i === activeSlide ? ACCENT : 'var(--hm-border)'}`,
                boxShadow:
                  i === activeSlide ? `0 0 0 1px ${ACCENT}44, 0 4px 12px -4px ${ACCENT}33` : 'none',
                background: 'var(--hm-bg-card)',
              }}
            >
              <div
                className="w-full px-2 pt-2 pb-1"
                style={{
                  background:
                    i === activeSlide
                      ? `linear-gradient(135deg,var(--hm-bg-card-2) 0%,rgba(244,178,108,0.06) 100%)`
                      : 'var(--hm-bg-card)',
                }}
              >
                <p
                  className="text-[7.5px] font-semibold leading-tight truncate"
                  style={{ color: i === activeSlide ? 'var(--hm-text)' : 'var(--hm-text-muted)' }}
                >
                  {s.title}
                </p>
                <p
                  className="text-[6px] leading-tight mt-0.5"
                  style={{
                    color: 'var(--hm-text-dim)',
                    display: '-webkit-box' as any,
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as any,
                    overflow: 'hidden',
                  }}
                >
                  {s.body}
                </p>
              </div>
              <div className="flex items-center justify-between px-2 pb-1.5">
                <span
                  className="hm-mono text-[8px]"
                  style={{ color: i === activeSlide ? ACCENT : 'var(--hm-text-dim)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {i === activeSlide && (
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                )}
              </div>
            </button>
          ))}
          {/* Add slide button */}
          <button
            type="button"
            className="flex items-center justify-center h-10 rounded-lg border-dashed shrink-0 transition-colors"
            style={{ border: `1.5px dashed var(--hm-border)`, color: 'var(--hm-text-dim)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ACCENT
              e.currentTarget.style.color = ACCENT
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--hm-border)'
              e.currentTarget.style.color = 'var(--hm-text-dim)'
            }}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Slide canvas + notes */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Slide status bar */}
          <div
            className="shrink-0 flex items-center justify-between px-5 py-2"
            style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card)' }}
          >
            <span
              className="hm-mono text-[10px]"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
            >
              SLIDE {activeSlide + 1} OF {SLIDES.length}
            </span>
            <div className="flex items-center gap-1">
              <TbBtn Icon={Pencil} title={t('creatorEdit.tbEditLayout')} />
              <TbBtn Icon={Trash2} title={t('creatorEdit.tbDeleteSlide')} />
            </div>
          </div>

          {/* Slide canvas */}
          <div className="flex-1 overflow-hidden flex items-stretch px-5 py-4">
            <div
              className="flex-1 rounded-2xl overflow-hidden flex flex-col relative"
              style={{
                background:
                  'linear-gradient(135deg,var(--hm-bg-card-2) 0%,rgba(244,178,108,0.04) 100%)',
                border: `1px solid ${ACCENT}44`,
                boxShadow: `0 0 0 1px ${ACCENT}22, inset 0 1px 0 rgba(255,255,255,0.04)`,
              }}
            >
              {/* Dot-grid background */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle,rgba(244,178,108,0.08) 1px,transparent 1px)`,
                  backgroundSize: '28px 28px',
                }}
              />
              <div className="relative flex-1 flex flex-col justify-center px-10 py-8 gap-4">
                <div>
                  <p
                    className="hm-mono text-[9.5px] mb-2"
                    style={{ color: ACCENT, letterSpacing: '0.16em' }}
                  >
                    SLIDE {String(activeSlide + 1).padStart(2, '0')} · TITLE
                  </p>
                  <h2
                    className="text-[26px] font-semibold tracking-tight"
                    style={{ color: 'var(--hm-text)', fontFamily: 'var(--hm-font-display)' }}
                  >
                    {slide.title}
                  </h2>
                </div>
                <p
                  className="text-[14px] leading-relaxed flex-1"
                  style={{ color: 'var(--hm-text-muted)', whiteSpace: 'pre-line' }}
                >
                  {slide.body}
                </p>
                <div aria-hidden className="absolute bottom-5 right-6">
                  <span
                    className="hm-mono text-[10px]"
                    style={{ color: 'var(--hm-text-dim)', opacity: 0.4 }}
                  >
                    {activeSlide + 1} / {SLIDES.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Speaker notes */}
          <div className="shrink-0 px-5 pb-4">
            <p
              className="hm-mono text-[9.5px] mb-2"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              SPEAKER NOTES
            </p>
            <textarea
              key={activeSlide}
              defaultValue={slide.notes}
              placeholder={t('creatorEdit.notesPlaceholder')}
              rows={2}
              className="w-full px-3 py-2 rounded-lg text-[12px] outline-none resize-none"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
                lineHeight: 1.5,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * QUESTION STUDIO — quiz lesson (PPT-like)
 * ──────────────────────────────────────────────────────────────────── */
function QuestionStudio() {
  const { t } = useTranslation()
  const [activeQ, setActiveQ] = useState(2)
  const q = QUESTIONS[activeQ]

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div
        className="shrink-0 flex items-center gap-2 px-4 py-2 flex-wrap"
        style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
      >
        <span
          className="hm-mono text-[9.5px] shrink-0"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          {t('creatorEdit.sectionType')}
        </span>
        {(Object.keys(QLABEL) as QType[]).map((qt) => (
          <button
            key={qt}
            type="button"
            className="hm-mono px-2.5 h-7 rounded text-[9.5px] font-semibold shrink-0 transition-colors"
            style={{
              background: q.type === qt ? TONE_BG[QTONE[qt]] : 'var(--hm-bg-card)',
              color: q.type === qt ? TONE_FG[QTONE[qt]] : 'var(--hm-text-dim)',
              border: `1px solid ${q.type === qt ? TONE_FG[QTONE[qt]] + '44' : 'var(--hm-border)'}`,
              letterSpacing: '0.08em',
            }}
          >
            {QLABEL[qt]}
          </button>
        ))}
        <div className="flex-1" />
        <span
          className="hm-mono text-[9.5px]"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
        >
          {t('creatorEdit.sectionMarks')}
        </span>
        <input
          type="number"
          defaultValue={q.marks}
          className="hm-mono w-12 px-2 h-7 rounded text-[11px] text-center outline-none"
          style={{
            background: 'var(--hm-bg-card)',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text)',
          }}
        />
        <div className="w-px h-5" style={{ background: 'var(--hm-border)' }} />
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded text-[11px] font-medium"
          style={{ background: ACCENT_SOFT, color: ACCENT, border: `1px solid ${ACCENT_BD}` }}
        >
          <Plus className="h-3 w-3" /> Question
        </button>
        <TbBtn Icon={Trash2} title={t('creatorEdit.deleteQuestion')} />
      </div>

      {/* Body: question list + editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Question list */}
        <div
          className="shrink-0 flex flex-col overflow-y-auto hm-scroll py-2"
          style={{
            width: 228,
            borderRight: '1px solid var(--hm-border)',
            background: 'var(--hm-bg-elev)',
          }}
        >
          {QUESTIONS.map((qq, i) => {
            const tone = QTONE[qq.type]
            const isA = i === activeQ
            return (
              <button
                key={qq.id}
                type="button"
                onClick={() => setActiveQ(i)}
                className="flex items-start gap-2.5 px-3 py-2.5 text-left relative w-full transition-colors"
                style={{
                  background: isA ? ACCENT_SOFT : 'transparent',
                  borderBottom: '1px solid var(--hm-border)',
                }}
              >
                {isA && (
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 6,
                      bottom: 6,
                      width: 3,
                      background: ACCENT,
                      borderRadius: 2,
                    }}
                  />
                )}
                <span
                  className="hm-mono text-[9px] shrink-0 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full"
                  style={{
                    background: isA ? ACCENT_SOFT : 'var(--hm-bg-card)',
                    color: isA ? ACCENT : 'var(--hm-text-dim)',
                    border: `1px solid ${isA ? ACCENT_BD : 'var(--hm-border)'}`,
                  }}
                >
                  {qq.num}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="hm-mono text-[8.5px] mb-0.5"
                    style={{ color: TONE_FG[tone], letterSpacing: '0.08em' }}
                  >
                    {QLABEL[qq.type]}
                  </p>
                  <p
                    className="text-[11px] leading-snug"
                    style={{
                      color: isA ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                      display: '-webkit-box' as any,
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical' as any,
                      overflow: 'hidden',
                    }}
                  >
                    {qq.text}
                  </p>
                </div>
                <span
                  className="hm-mono text-[9px] shrink-0 mt-0.5"
                  style={{ color: 'var(--hm-text-dim)' }}
                >
                  {qq.marks}pt
                </span>
              </button>
            )
          })}
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2.5 w-full text-[11px]"
            style={{ color: 'var(--hm-text-dim)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ACCENT
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--hm-text-dim)'
            }}
          >
            <Plus className="h-3.5 w-3.5" /> Add question
          </button>
        </div>

        {/* Question editor */}
        <div className="flex-1 overflow-y-auto hm-scroll p-5 flex flex-col gap-4">
          {/* Question text */}
          <div>
            <p
              className="hm-mono text-[9.5px] mb-2 flex items-center gap-2"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
            >
              QUESTION {q.num} <Pill tone={QTONE[q.type]}>{QLABEL[q.type]}</Pill>
            </p>
            <textarea
              key={activeQ}
              defaultValue={q.text}
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-[14px] font-medium outline-none resize-none"
              style={{
                background: 'linear-gradient(135deg,var(--hm-bg-card) 0%,var(--hm-bg-card-2) 100%)',
                border: `1.5px solid ${ACCENT}44`,
                color: 'var(--hm-text)',
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Options */}
          {q.type !== 'subjective' && (
            <div>
              <p
                className="hm-mono text-[9.5px] mb-2.5"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                OPTIONS {q.type === 'mcq' ? '— SINGLE CORRECT' : '— SELECT CORRECT'}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => {
                  const isC = oi === q.correct
                  return (
                    <div key={oi} className="flex items-center gap-3 group">
                      <button
                        type="button"
                        title={t('creatorEdit.setAsCorrect')}
                        className="flex h-6 w-6 items-center justify-center rounded-full shrink-0 transition-colors"
                        style={{
                          background: isC ? 'rgba(94,230,168,0.15)' : 'var(--hm-bg-card-2)',
                          border: `1.5px solid ${isC ? '#5EE6A8' : 'var(--hm-border)'}`,
                          color: isC ? '#5EE6A8' : 'var(--hm-text-dim)',
                        }}
                      >
                        {isC ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </button>
                      <span
                        className="hm-mono text-[11px] w-4 shrink-0"
                        style={{ color: 'var(--hm-text-dim)' }}
                      >
                        {String.fromCharCode(65 + oi)}.
                      </span>
                      <input
                        defaultValue={opt}
                        className="flex-1 px-3 h-9 rounded-lg text-[12.5px] outline-none"
                        style={{
                          background: isC ? 'rgba(94,230,168,0.08)' : 'var(--hm-bg-card-2)',
                          border: `1px solid ${isC ? '#5EE6A822' : 'var(--hm-border)'}`,
                          color: 'var(--hm-text)',
                        }}
                      />
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: ROSE }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )
                })}
                <button
                  type="button"
                  className="flex items-center gap-2 text-[11.5px] font-medium mt-1"
                  style={{ color: 'var(--hm-text-dim)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = ACCENT
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--hm-text-dim)'
                  }}
                >
                  <Plus className="h-3.5 w-3.5" /> Add option
                </button>
              </div>
            </div>
          )}

          {/* Subjective rubric */}
          {q.type === 'subjective' && (
            <FI
              label={t('creatorEdit.fieldExpectedAnswer')}
              hint={t('creatorEdit.fieldExpectedAnswerHint')}
            >
              <TA rows={4} placeholder={t('creatorEdit.rubricPlaceholder')} />
            </FI>
          )}

          {/* Meta row */}
          <div className="grid grid-cols-2 gap-3">
            <FI
              label={t('creatorEdit.fieldExplanation2')}
              hint={t('creatorEdit.fieldExplanationHint2')}
            >
              <TA
                rows={2}
                defaultValue={
                  q.type !== 'subjective' ? 'Refer to slide 3 — Staining pigments.' : ''
                }
                placeholder={t('creatorEdit.optionalExplPlaceholder')}
              />
            </FI>
            <div className="flex flex-col gap-3">
              <FI label={t('creatorEdit.fieldMarks')}>
                <TI defaultValue={q.marks} mono type="number" />
              </FI>
              <div className="flex flex-col gap-2 pt-1">
                <Tog label={t('creatorEdit.toggleShuffleOptions')} defaultChecked />
                <Tog label={t('creatorEdit.togRequiredForPassing')} defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * VIDEO LESSON PANEL
 * ──────────────────────────────────────────────────────────────────── */
function VideoPanel() {
  const { t } = useTranslation()
  return (
    <div className="flex-1 overflow-y-auto hm-scroll p-5">
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        <div className="col-span-2">
          <FI label={t('creatorEdit.fieldVideoTitle')} required>
            <TI defaultValue={t('creatorEdit.fieldVideoTitleDefault')} />
          </FI>
        </div>
        <div className="col-span-2">
          <FI
            label={t('creatorEdit.fieldCompanionInstructions')}
            hint={t('creatorEdit.fieldCompanionInstructionsHint')}
          >
            <TA rows={3} placeholder={t('creatorEdit.companionPlaceholder')} />
          </FI>
        </div>
        <FI label={t('creatorEdit.fieldSortOrder')}>
          <TI defaultValue={1} mono type="number" />
        </FI>
        <FI label={t('creatorEdit.fieldDurationSeconds')}>
          <TI defaultValue={690} mono type="number" />
        </FI>
        <div className="col-span-2">
          <FI
            label={t('creatorEdit.fieldVideoUrl')}
            required
            hint={t('creatorEdit.fieldVideoUrlHint')}
          >
            <TI mono defaultValue="https://cdn.hypermind.io/lessons/pigments-water.mp4" />
          </FI>
        </div>
        <div className="col-span-2">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: TONE_BG.violet, border: `1px solid ${TONE_FG.violet}33` }}
          >
            <span
              className="hm-mono text-[10px] font-semibold"
              style={{ color: TONE_FG.violet, letterSpacing: '0.1em' }}
            >
              HM CDN · HOSTED
            </span>
            <span className="text-[11px]" style={{ color: 'var(--hm-text-muted)' }}>
              Direct MP4 · 128.4 MB · 720p
            </span>
            <div className="flex-1" />
            <button
              type="button"
              className="text-[11px] font-medium"
              style={{ color: TONE_FG.violet }}
            >
              Replace ↑
            </button>
          </div>
        </div>
        <FI
          label={t('creatorEdit.fieldVideoThumbnailUrl')}
          hint={t('creatorEdit.fieldVideoThumbnailHint')}
        >
          <TI mono defaultValue="https://cdn.hypermind.io/lessons/pigments-water-thumb.jpg" />
        </FI>
        <div className="flex flex-col gap-3 pt-5">
          <Tog label={t('creatorEdit.togRequiredForCompletion')} defaultChecked />
          <Tog label={t('creatorEdit.togAutoplayNext')} />
          <Tog label={t('creatorEdit.togAllowDownload')} />
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * LIVE LESSON PANEL
 * ──────────────────────────────────────────────────────────────────── */
function LivePanel() {
  const { t } = useTranslation()
  return (
    <div className="flex-1 overflow-y-auto hm-scroll p-5">
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        <div className="col-span-2">
          <FI label={t('creatorEdit.fieldTitle')} required>
            <TI defaultValue="Live workshop: wash troubleshooting" />
          </FI>
        </div>
        <div className="col-span-2">
          <FI label={t('creatorEdit.fieldDescription')}>
            <TA rows={2} placeholder={t('creatorEdit.sessionDescPlaceholder')} />
          </FI>
        </div>
        <FI label={t('creatorEdit.fieldSessionType')} required>
          <SelInput
            defaultValue="workshop"
            options={[
              { value: 'workshop', label: 'Workshop (interactive)' },
              { value: 'office_hours', label: 'Office hours' },
              { value: 'critique', label: 'Critique session' },
              { value: 'lecture', label: 'Lecture' },
            ]}
          />
        </FI>
        <FI label={t('creatorEdit.fieldRoomName')} hint={t('creatorEdit.fieldRoomNameHint')}>
          <TI mono defaultValue="watercolor-wash-workshop" />
        </FI>
        <FI label={t('creatorEdit.fieldPassword')} hint={t('creatorEdit.fieldPasswordHint')}>
          <TI mono placeholder="••••••" />
        </FI>
        <FI label={t('creatorEdit.fieldMaxParticipants')}>
          <TI mono defaultValue={40} type="number" />
        </FI>
        <FI label={t('creatorEdit.fieldDateScheduled')} required>
          <TI defaultValue="2026-05-08" />
        </FI>
        <FI label={t('creatorEdit.fieldTime')}>
          <TI mono defaultValue="18:00" />
        </FI>
        <FI label={t('creatorEdit.fieldTimezone')}>
          <SelInput
            defaultValue="Europe/Berlin"
            options={[
              { value: 'Europe/Berlin', label: 'Europe/Berlin (CET)' },
              { value: 'America/New_York', label: 'America/New_York (ET)' },
              { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' },
              { value: 'UTC', label: 'UTC' },
            ]}
          />
        </FI>
        <FI
          label={t('creatorEdit.fieldMinAttendance')}
          hint={t('creatorEdit.fieldMinAttendanceHint')}
        >
          <TI mono defaultValue={1800} type="number" />
        </FI>
        <div className="col-span-2">
          <FI label={t('creatorEdit.fieldPreSession')} hint={t('creatorEdit.fieldPreSessionHint')}>
            <TA rows={2} placeholder={t('creatorEdit.bringPlaceholder')} />
          </FI>
        </div>
        <div className="col-span-2">
          <FI
            label={t('creatorEdit.fieldPostSession')}
            hint={t('creatorEdit.fieldPostSessionHint')}
          >
            <TA rows={2} placeholder={t('creatorEdit.uploadPlaceholder')} />
          </FI>
        </div>
        <FI label={t('creatorEdit.fieldRecordingUrl')} hint={t('creatorEdit.fieldRecordingHint')}>
          <TI mono placeholder={t('creatorEdit.recordingAvailable')} />
        </FI>
        <div className="flex flex-col gap-3 pt-4">
          <Tog label={t('creatorEdit.togWaitingLobby')} defaultChecked />
          <Tog label={t('creatorEdit.togEnableChat')} defaultChecked />
          <Tog label={t('creatorEdit.togEnableScreenShare')} defaultChecked />
          <Tog label={t('creatorEdit.togEnableRecording')} />
        </div>
        <FI label={t('creatorEdit.fieldSortOrder')}>
          <TI defaultValue={5} mono type="number" />
        </FI>
        <div className="col-span-2 flex items-center gap-6">
          <Tog label={t('creatorEdit.togRequiredForCompletion')} defaultChecked />
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * COURSE INFO PANEL (tabbed)
 * ──────────────────────────────────────────────────────────────────── */
const INFO_TABS = ['Basic', 'Description', 'Pricing', 'Settings'] as const
type InfoTab = (typeof INFO_TABS)[number]

function CourseInfoPanel() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<InfoTab>('Basic')
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div
        className="shrink-0 flex items-end gap-0.5 px-5 pt-4"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        {INFO_TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="px-4 py-2 text-[12.5px] font-medium rounded-t-lg"
            style={{
              background: tab === t ? 'var(--hm-bg-card)' : 'transparent',
              borderBottom: `2px solid ${tab === t ? ACCENT : 'transparent'}`,
              color: tab === t ? ACCENT : 'var(--hm-text-muted)',
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto hm-scroll p-5">
        {tab === 'Basic' && (
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            <div className="col-span-2">
              <FI label={t('creatorEdit.fieldTitle')} required>
                <TI defaultValue="Watercolor Foundations" />
              </FI>
            </div>
            <FI label={t('creatorEdit.fieldSlug')} hint={t('creatorEdit.fieldSlugCourseHint')}>
              <TI mono defaultValue="watercolor-foundations" />
            </FI>
            <FI label={t('creatorEdit.fieldLanguage')} required>
              <SelInput
                defaultValue="EN"
                options={[
                  { value: 'EN', label: 'English (EN)' },
                  { value: 'ES', label: 'Spanish (ES)' },
                  { value: 'FR', label: 'French (FR)' },
                  { value: 'JA', label: 'Japanese (JA)' },
                ]}
              />
            </FI>
            <FI label={t('creatorEdit.fieldCategory')} required>
              <SelInput
                defaultValue="Arts & Crafts"
                options={[
                  { value: 'Arts & Crafts', label: 'Arts & Crafts' },
                  { value: 'Music', label: 'Music' },
                  { value: 'Languages', label: 'Languages' },
                  { value: 'Finance', label: 'Finance' },
                  { value: 'Wellness', label: 'Wellness' },
                ]}
              />
            </FI>
            <FI label={t('creatorEdit.fieldDifficulty')} required>
              <SelInput
                defaultValue="beginner"
                options={[
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' },
                ]}
              />
            </FI>
            <FI
              label={t('creatorEdit.fieldEstimatedDuration')}
              hint={t('creatorEdit.fieldEstimatedDurationHint')}
            >
              <TI mono defaultValue="12h 30m" />
            </FI>
            <FI
              label={t('creatorEdit.fieldSkillCategory')}
              hint={t('creatorEdit.fieldSkillCategoryHint')}
            >
              <TI defaultValue="Visual Arts" />
            </FI>
          </div>
        )}
        {tab === 'Description' && (
          <div className="flex flex-col gap-4 max-w-2xl">
            <FI
              label={t('creatorEdit.fieldShortDescription2')}
              hint={t('creatorEdit.fieldShortDescriptionHint2')}
            >
              <TA
                rows={3}
                defaultValue="Learn the watercolor washes, color theory and brush control needed to paint confident botanical studies."
              />
            </FI>
            <FI
              label={t('creatorEdit.fieldFullDescription')}
              hint={t('creatorEdit.fieldFullDescriptionHint')}
            >
              <TA
                rows={6}
                defaultValue="A six-module foundation in watercolor painting. Start by setting up a workable studio, learn how pigment, water and paper actually behave, then drill the four core washes until they're muscle memory. The course closes with a botanical study you'll critique live and submit for personalized feedback."
              />
            </FI>
            <FI
              label={t('creatorEdit.fieldThumbnailUrl')}
              hint={t('creatorEdit.fieldThumbnailHint')}
            >
              <TI
                mono
                defaultValue="https://cdn.hypermind.io/courses/watercolor-foundations/cover.jpg"
              />
            </FI>
            <div
              className="rounded-xl flex items-center justify-center"
              style={{
                height: 120,
                width: 213,
                background: `linear-gradient(135deg,${ACCENT}44 0%,rgba(167,139,250,0.3) 100%)`,
                border: '1px solid var(--hm-border)',
              }}
            >
              <BookOpen className="h-8 w-8" style={{ color: ACCENT, opacity: 0.6 }} />
            </div>
          </div>
        )}
        {tab === 'Pricing' && (
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            <FI
              label={t('creatorEdit.fieldPriceCredits')}
              hint={t('creatorEdit.fieldCoursePriceHint')}
            >
              <TI mono defaultValue={180} type="number" />
            </FI>
            <FI label={t('creatorEdit.fieldHmnReward')} hint={t('creatorEdit.fieldHmnRewardHint')}>
              <TI mono defaultValue={60} type="number" />
            </FI>
            <FI label={t('creatorEdit.fieldKarmaReward')}>
              <TI mono defaultValue={20} type="number" />
            </FI>
            <FI label={t('creatorEdit.fieldXpReward')}>
              <TI mono defaultValue={400} type="number" />
            </FI>
            <div className="col-span-2 flex flex-col gap-2.5 pt-2">
              <Tog label={t('creatorEdit.togFreeTier')} defaultChecked={false} />
              <Tog label={t('creatorEdit.togAllowGifting')} defaultChecked />
            </div>
          </div>
        )}
        {tab === 'Settings' && (
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            <FI label={t('creatorEdit.fieldStatus')} required>
              <SelInput
                defaultValue="published"
                options={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'finished', label: 'Finished' },
                  { value: 'assessment', label: 'Assessment' },
                  { value: 'calibrated', label: 'Calibrated' },
                  { value: 'published', label: 'Published' },
                  { value: 'disabled', label: 'Disabled' },
                  { value: 'archived', label: 'Archived' },
                ]}
              />
            </FI>
            <FI label={t('creatorEdit.fieldConsumptionLogic')} required>
              <SelInput
                defaultValue="guided_path"
                options={[
                  { value: 'free_learning', label: 'Free learning — any order' },
                  { value: 'guided_path', label: 'Guided path — sequential' },
                ]}
              />
            </FI>
            <FI label={t('creatorEdit.fieldEvaluationRule')} required>
              <SelInput
                defaultValue="selected_quizzes_final"
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'final_test', label: 'Final test only' },
                  { value: 'all_quizzes', label: 'All quizzes must pass' },
                  { value: 'selected_quizzes_final', label: 'Selected quizzes + final test' },
                ]}
              />
            </FI>
            <FI label={t('creatorEdit.fieldPassingScoreRange')}>
              <TI mono defaultValue={70} type="number" />
            </FI>
            <FI label={t('creatorEdit.fieldFinalAssessment2')}>
              <SelInput
                defaultValue="as-final-water"
                options={[
                  { value: 'as-final-water', label: 'Watercolor Foundations — final' },
                  { value: 'as-pigments', label: 'Pigment properties — quick check' },
                  { value: 'as-color-choice', label: 'Color choice exercises' },
                ]}
              />
            </FI>
            <div className="col-span-2 flex flex-col gap-2.5 pt-2">
              <Tog label={t('creatorEdit.togVisiblePublic')} defaultChecked />
              <Tog label={t('creatorEdit.togFeaturedHomepage')} defaultChecked={false} />
              <Tog label={t('creatorEdit.togCompletionCert')} defaultChecked />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * FINAL ASSESSMENT PANEL
 * Two sub-tabs: Settings | Questions (reuses QuestionStudio layout)
 * ──────────────────────────────────────────────────────────────────── */
function FinalAssessmentPanel() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'settings' | 'questions'>('settings')
  const [activeQ, setActiveQ] = useState(0)
  const q = QUESTIONS[activeQ]

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Sub-tab bar */}
      <div
        className="shrink-0 flex items-center gap-1 px-5 py-2"
        style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
      >
        <div
          className="flex items-center gap-1 rounded-xl p-1 mr-3"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          {[
            { id: 'settings' as const, label: 'Settings', Icon: Layers },
            { id: 'questions' as const, label: 'Questions', Icon: HelpCircle },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="inline-flex items-center gap-1.5 px-3 h-7 rounded-lg text-[11.5px] font-semibold transition-all"
              style={{
                background: tab === t.id ? VIOLET_SOFT : 'transparent',
                color: tab === t.id ? VIOLET : 'var(--hm-text-muted)',
                border: `1px solid ${tab === t.id ? VIOLET_BD : 'transparent'}`,
              }}
            >
              <t.Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Quick stats */}
        <span
          className="hm-mono text-[10px] px-2 h-6 rounded flex items-center gap-1.5 shrink-0"
          style={{ background: 'rgba(139,146,168,0.12)', color: 'var(--hm-text-dim)' }}
        >
          <HelpCircle className="h-3 w-3" /> {QUESTIONS.length} questions
        </span>
        <span
          className="hm-mono text-[10px] px-2 h-6 rounded flex items-center gap-1.5 shrink-0"
          style={{ background: 'rgba(139,146,168,0.12)', color: 'var(--hm-text-dim)' }}
        >
          <Award className="h-3 w-3" />
          {QUESTIONS.reduce((s, q) => s + q.marks, 0)} marks
        </span>
        <div className="flex-1" />
        <span
          className="hm-mono text-[8.5px] px-2 py-1 rounded"
          style={{
            background: VIOLET_SOFT,
            color: VIOLET,
            border: `1px solid ${VIOLET_BD}`,
            letterSpacing: '0.08em',
          }}
        >
          OPTIONAL
        </span>
      </div>

      {/* ── Settings tab ── */}
      {tab === 'settings' && (
        <div className="flex-1 overflow-y-auto hm-scroll p-5">
          <div className="grid grid-cols-2 gap-5 max-w-2xl">
            {/* Title */}
            <div className="col-span-2">
              <FI label={t('creatorEdit.fieldTitle')} required>
                <TI defaultValue="Watercolor Foundations — Final Assessment" />
              </FI>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <FI
                label={t('creatorEdit.fieldDescription')}
                hint={t('creatorEdit.fieldDescriptionCurriculumHint')}
              >
                <TA
                  rows={2}
                  defaultValue="A comprehensive evaluation spanning all 6 modules — pigment properties, wash techniques, color theory, botanical illustration and the final project. Completing this assessment is optional but earns a completion certificate."
                />
              </FI>
            </div>

            {/* Time & attempts */}
            <FI
              label={t('creatorEdit.fieldTimeLimitMin')}
              hint={t('creatorEdit.fieldTimeLimitHint')}
            >
              <div className="relative">
                <Clock
                  className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--hm-text-dim)' }}
                />
                <input
                  type="number"
                  defaultValue={90}
                  className="hm-mono w-full pl-8 pr-3 h-9 rounded-lg text-[12.5px] outline-none"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    color: 'var(--hm-text)',
                  }}
                />
              </div>
            </FI>
            <FI
              label={t('creatorEdit.fieldMaxAttempts')}
              hint={t('creatorEdit.fieldMaxAttemptsHint')}
            >
              <TI mono defaultValue={2} type="number" />
            </FI>

            {/* Passing score & question pool */}
            <FI
              label={t('creatorEdit.fieldPassingScorePct')}
              hint={t('creatorEdit.fieldPassingScoreCertHint')}
            >
              <TI mono defaultValue={70} type="number" />
            </FI>
            <FI
              label={t('creatorEdit.fieldQuestionsToShow')}
              hint={t('creatorEdit.fieldQuestionsToShowHint')}
            >
              <SelInput
                defaultValue="all"
                options={[
                  { value: 'all', label: 'All questions' },
                  { value: '6', label: '6 random questions' },
                  { value: '8', label: '8 random questions' },
                  { value: '10', label: '10 random questions' },
                ]}
              />
            </FI>

            {/* Behaviour divider */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px" style={{ background: 'var(--hm-border)' }} />
                <span
                  className="hm-mono text-[9.5px] shrink-0"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
                >
                  {t('creatorEdit.sectionBehaviour')}
                </span>
                <div className="flex-1 h-px" style={{ background: 'var(--hm-border)' }} />
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                <div className="flex items-center gap-2.5">
                  <Shuffle
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: 'var(--hm-text-dim)' }}
                  />
                  <Tog label={t('creatorEdit.togRandomizeQuestionOrder')} defaultChecked />
                </div>
                <div className="flex items-center gap-2.5">
                  <Shuffle
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: 'var(--hm-text-dim)' }}
                  />
                  <Tog label={t('creatorEdit.togRandomizeAnswerChoices')} defaultChecked />
                </div>
                <Tog label={t('creatorEdit.togShowScore')} defaultChecked />
                <Tog label={t('creatorEdit.togShowCorrectAfterPass')} defaultChecked />
                <Tog label={t('creatorEdit.togAllowQuestionReview')} defaultChecked />
                <Tog label={t('creatorEdit.togPreventCopying')} defaultChecked={false} />
              </div>
            </div>

            {/* Optional toggle — prominent */}
            <div className="col-span-2 mt-1">
              <div
                className="flex items-start gap-4 px-4 py-4 rounded-xl"
                style={{ background: VIOLET_SOFT, border: `1.5px solid ${VIOLET_BD}` }}
              >
                <Award className="h-5 w-5 shrink-0 mt-0.5" style={{ color: VIOLET }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold" style={{ color: VIOLET }}>
                    {t('creatorEdit.markOptional')}
                  </p>
                  <p className="text-[11.5px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                    When enabled, students can complete the course without sitting this assessment.
                    The assessment still appears in the curriculum and earns bonus XP on completion.
                  </p>
                </div>
                <Tog label="" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Questions tab — same layout as QuestionStudio ── */}
      {tab === 'questions' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Toolbar */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div
              className="shrink-0 flex items-center gap-2 px-4 py-2 flex-wrap"
              style={{
                borderBottom: '1px solid var(--hm-border)',
                background: 'var(--hm-bg-card-2)',
              }}
            >
              <span
                className="hm-mono text-[9.5px] shrink-0"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                {t('creatorEdit.sectionType')}
              </span>
              {(Object.keys(QLABEL) as QType[]).map((qt) => (
                <button
                  key={qt}
                  type="button"
                  className="hm-mono px-2.5 h-7 rounded text-[9.5px] font-semibold shrink-0"
                  style={{
                    background: q.type === qt ? TONE_BG[QTONE[qt]] : 'var(--hm-bg-card)',
                    color: q.type === qt ? TONE_FG[QTONE[qt]] : 'var(--hm-text-dim)',
                    border: `1px solid ${q.type === qt ? TONE_FG[QTONE[qt]] + '44' : 'var(--hm-border)'}`,
                    letterSpacing: '0.08em',
                  }}
                >
                  {QLABEL[qt]}
                </button>
              ))}
              <div className="flex-1" />
              <span
                className="hm-mono text-[9.5px]"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
              >
                {t('creatorEdit.sectionMarks')}
              </span>
              <input
                type="number"
                defaultValue={q.marks}
                className="hm-mono w-12 px-2 h-7 rounded text-[11px] text-center outline-none"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                }}
              />
              <div className="w-px h-5" style={{ background: 'var(--hm-border)' }} />
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded text-[11px] font-medium"
                style={{ background: VIOLET_SOFT, color: VIOLET, border: `1px solid ${VIOLET_BD}` }}
              >
                <Plus className="h-3 w-3" /> Question
              </button>
              <TbBtn Icon={Trash2} title={t('creatorEdit.deleteQuestion')} />
            </div>

            {/* Question list + editor */}
            <div className="flex-1 flex overflow-hidden">
              {/* List */}
              <div
                className="shrink-0 flex flex-col overflow-y-auto hm-scroll py-2"
                style={{
                  width: 228,
                  borderRight: '1px solid var(--hm-border)',
                  background: 'var(--hm-bg-elev)',
                }}
              >
                {QUESTIONS.map((qq, i) => {
                  const tone = QTONE[qq.type]
                  const isA = i === activeQ
                  return (
                    <button
                      key={qq.id}
                      type="button"
                      onClick={() => setActiveQ(i)}
                      className="flex items-start gap-2.5 px-3 py-2.5 text-left relative w-full"
                      style={{
                        background: isA ? VIOLET_SOFT : 'transparent',
                        borderBottom: '1px solid var(--hm-border)',
                      }}
                    >
                      {isA && (
                        <span
                          aria-hidden
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 6,
                            bottom: 6,
                            width: 3,
                            background: VIOLET,
                            borderRadius: 2,
                          }}
                        />
                      )}
                      <span
                        className="hm-mono text-[9px] shrink-0 mt-0.5 h-5 w-5 flex items-center justify-center rounded-full"
                        style={{
                          background: isA ? VIOLET_SOFT : 'var(--hm-bg-card)',
                          color: isA ? VIOLET : 'var(--hm-text-dim)',
                          border: `1px solid ${isA ? VIOLET_BD : 'var(--hm-border)'}`,
                        }}
                      >
                        {qq.num}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className="hm-mono text-[8.5px] mb-0.5"
                          style={{ color: TONE_FG[tone], letterSpacing: '0.08em' }}
                        >
                          {QLABEL[qq.type]}
                        </p>
                        <p
                          className="text-[11px] leading-snug"
                          style={{
                            color: isA ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                            display: '-webkit-box' as any,
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical' as any,
                            overflow: 'hidden',
                          }}
                        >
                          {qq.text}
                        </p>
                      </div>
                      <span
                        className="hm-mono text-[9px] shrink-0 mt-0.5"
                        style={{ color: 'var(--hm-text-dim)' }}
                      >
                        {qq.marks}pt
                      </span>
                    </button>
                  )
                })}
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2.5 w-full text-[11px]"
                  style={{ color: VIOLET }}
                >
                  <Plus className="h-3.5 w-3.5" /> Add question
                </button>
              </div>

              {/* Editor canvas */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Question prompt */}
                <div className="flex-1 flex flex-col px-6 py-5 gap-4 overflow-y-auto hm-scroll">
                  <div>
                    <p
                      className="hm-mono text-[9.5px] mb-2"
                      style={{ color: VIOLET, letterSpacing: '0.16em' }}
                    >
                      QUESTION {String(q.num).padStart(2, '0')} · {QLABEL[q.type]}
                    </p>
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{
                        background:
                          'linear-gradient(135deg,var(--hm-bg-card-2) 0%, rgba(124,92,246,0.05) 100%)',
                        border: `1px solid ${VIOLET}33`,
                        boxShadow: `0 0 0 1px ${VIOLET}14, inset 0 1px 0 rgba(255,255,255,0.03)`,
                      }}
                    >
                      <div
                        aria-hidden
                        className="absolute pointer-events-none"
                        style={{
                          inset: 0,
                          backgroundImage: `radial-gradient(circle,rgba(124,92,246,0.06) 1px,transparent 1px)`,
                          backgroundSize: '28px 28px',
                          borderRadius: 'inherit',
                        }}
                      />
                      <div className="relative px-7 py-6">
                        <p
                          className="text-[16px] font-medium leading-snug"
                          style={{ color: 'var(--hm-text)' }}
                        >
                          {q.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Choices */}
                  {q.options.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <p
                        className="hm-mono text-[9.5px]"
                        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
                      >
                        {t('creatorEdit.answerOptions')}
                      </p>
                      {q.options.map((opt, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                          style={{
                            background:
                              i === q.correct
                                ? `${TONE_FG[QTONE[q.type]]}10`
                                : 'var(--hm-bg-card-2)',
                            border: `1px solid ${i === q.correct ? TONE_FG[QTONE[q.type]] + '44' : 'var(--hm-border)'}`,
                          }}
                        >
                          {i === q.correct ? (
                            <CheckCircle2
                              className="h-4 w-4 shrink-0"
                              style={{ color: TONE_FG[QTONE[q.type]] }}
                            />
                          ) : (
                            <Circle
                              className="h-4 w-4 shrink-0"
                              style={{ color: 'var(--hm-text-dim)' }}
                            />
                          )}
                          <span className="text-[13px] flex-1" style={{ color: 'var(--hm-text)' }}>
                            {opt}
                          </span>
                          {i === q.correct && (
                            <span
                              className="hm-mono text-[9px] px-1.5 py-0.5 rounded"
                              style={{
                                background: `${TONE_FG[QTONE[q.type]]}18`,
                                color: TONE_FG[QTONE[q.type]],
                              }}
                            >
                              CORRECT
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subjective answer area */}
                  {q.type === 'subjective' && (
                    <div>
                      <p
                        className="hm-mono text-[9.5px] mb-2"
                        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
                      >
                        {t('creatorEdit.modelAnswerRubric')}
                      </p>
                      <TA rows={3} placeholder={t('creatorEdit.rubricPlaceholder2')} />
                    </div>
                  )}
                </div>

                {/* Bottom marks bar */}
                <div
                  className="shrink-0 flex items-center gap-3 px-6 py-3"
                  style={{
                    borderTop: '1px solid var(--hm-border)',
                    background: 'var(--hm-bg-card-2)',
                  }}
                >
                  <span
                    className="hm-mono text-[10px]"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
                  >
                    Q{q.num} of {QUESTIONS.length}
                  </span>
                  <div className="flex-1" />
                  <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                    {t('creatorEdit.fieldMarks')}
                  </span>
                  <input
                    type="number"
                    defaultValue={q.marks}
                    className="hm-mono w-12 px-2 h-7 rounded text-[11px] text-center outline-none"
                    style={{
                      background: 'var(--hm-bg-card)',
                      border: `1px solid ${VIOLET_BD}`,
                      color: VIOLET,
                    }}
                  />
                  <PrimaryBtn>{t('creatorEdit.saveQuestion')}</PrimaryBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * MODULE EDIT PANEL
 * ──────────────────────────────────────────────────────────────────── */
function ModulePanel({ mId, title }: { mId: string; title: string }) {
  const { t } = useTranslation()
  const mod = TREE.find((m) => m.id === mId)!
  return (
    <div className="flex-1 overflow-y-auto hm-scroll p-5">
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        <div className="col-span-2">
          <FI label={t('creatorEdit.fieldModuleTitle')} required>
            <TI defaultValue={title} />
          </FI>
        </div>
        <div className="col-span-2">
          <FI
            label={t('creatorEdit.fieldModuleDescription')}
            hint={t('creatorEdit.fieldModuleDescriptionHint')}
          >
            <TA
              rows={3}
              defaultValue="Pick the right paper, brushes and pigments — and arrange a workspace you'll actually want to sit at."
            />
          </FI>
        </div>
        <FI label={t('creatorEdit.fieldSortOrder')} hint={t('creatorEdit.fieldSortOrderHint')}>
          <TI mono defaultValue={mod.num} type="number" />
        </FI>
        <div className="flex flex-col gap-2.5 pt-5">
          <Tog label={t('creatorEdit.togRequiredForCompletion')} defaultChecked={mod.required} />
          <Tog label={t('creatorEdit.togLockUntilPrev')} defaultChecked />
        </div>

        {/* Lessons list */}
        <div className="col-span-2 mt-2">
          <div className="flex items-center justify-between mb-3">
            <p
              className="hm-mono text-[10px] font-semibold"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              LESSONS IN THIS MODULE
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[11px] font-medium"
              style={{ color: ACCENT }}
            >
              <Plus className="h-3 w-3" /> Add lesson
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {mod.lessons.map((l) => {
              const meta = LMETA[l.type]
              return (
                <div
                  key={l.id}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl group"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  <GripVertical
                    className="h-4 w-4 shrink-0 cursor-grab"
                    style={{ color: 'var(--hm-text-dim)' }}
                  />
                  <span
                    className="hm-mono text-[10px] w-6 text-center shrink-0"
                    style={{ color: 'var(--hm-text-dim)' }}
                  >
                    {String(l.num).padStart(2, '0')}
                  </span>
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                    style={{ background: TONE_BG[meta.tone], color: TONE_FG[meta.tone] }}
                  >
                    <meta.Icon className="h-3.5 w-3.5" />
                  </span>
                  <p
                    className="text-[12.5px] font-medium flex-1 truncate"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    {l.title}
                  </p>
                  <Pill tone={meta.tone}>{meta.label.toLowerCase()}</Pill>
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ color: 'var(--hm-text-dim)' }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ color: ROSE }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Danger */}
        <div className="col-span-2 pt-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
            style={{
              background: 'rgba(244,99,110,0.10)',
              border: '1px solid rgba(244,99,110,0.30)',
              color: ROSE,
            }}
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete this module
          </button>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
 * Main export
 * ──────────────────────────────────────────────────────────────────── */
export default function CreatorCourseEdit() {
  const [mode, setMode] = useState<Mode>('curriculum')
  const [sel, setSel] = useState<Sel>({ kind: 'final_assessment' })
  const [expanded, setExpanded] = useState(new Set(['m-01']))
  const [treeCollapsed, setTreeCollapsed] = useState(false)
  const [aiModalOpen, setAiModalOpen] = useState(false)

  return (
    <CreatorShell activeId="courses">
      {aiModalOpen && <AIGenerateModal onClose={() => setAiModalOpen(false)} />}
      <div
        style={{
          margin: '-26px -28px -40px',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
        }}
      >
        <TopBar onBack={() => {}} mode={mode} setMode={setMode} onAI={() => setAiModalOpen(true)} />

        {/* ── Details mode: full-width compact form ── */}
        {mode === 'details' && <DetailsPanel />}

        {/* ── Curriculum mode: tree + lesson editor ── */}
        {mode === 'curriculum' && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <LeftTree
              sel={sel}
              setSel={setSel}
              expanded={expanded}
              setExpanded={setExpanded}
              collapsed={treeCollapsed}
              onToggleCollapse={() => setTreeCollapsed((v) => !v)}
            />
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <ContextBanner sel={sel} />
              {sel.kind === 'module' && <ModulePanel mId={sel.mId} title={sel.title} />}
              {sel.kind === 'lesson' && sel.type === 'text' && <SlideStudio />}
              {sel.kind === 'lesson' && sel.type === 'quiz' && <QuestionStudio />}
              {sel.kind === 'lesson' && sel.type === 'video' && <VideoPanel />}
              {sel.kind === 'lesson' && sel.type === 'live' && <LivePanel />}
              {sel.kind === 'final_assessment' && <FinalAssessmentPanel />}
            </div>
          </div>
        )}
      </div>
    </CreatorShell>
  )
}
