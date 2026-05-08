import AdminShell from '../_shared/AdminShell'
import { Pill, type Tone } from '../_shared/AdminTable'
import {
  Field,
  FieldGrid,
  TextInput,
  Textarea,
  Select,
  Toggle,
  ChipsInput,
} from '../_shared/AdminModal'
import {
  ArrowLeft,
  BookOpen,
  X,
  Save,
  Plus,
  GripVertical,
  Video,
  FileText,
  Headphones,
  Clock,
  Users as UsersIcon,
  TrendingUp,
  Star,
  DollarSign,
  Trash2,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react'

const ACCENT = '#F4636E'

/* ── Demo course (matches the row clicked from the Courses list) ──── */

const COURSE = {
  id: '0a1b',
  title: 'Cognitive Load Mastery',
  slug: 'cognitive-load-mastery',
  category: 'Learning Science',
  difficulty: 'intermediate' as 'beginner' | 'intermediate' | 'advanced',
  language: 'EN',
  status: 'published' as
    | 'draft'
    | 'finished'
    | 'assessment'
    | 'calibrated'
    | 'published'
    | 'disabled'
    | 'archived',
  price_credits: 240,
  hmn_reward: 80,
  short_description:
    "Learn how to design study sessions that respect the brain's working-memory limits.",
  long_description:
    "A practical, research-grounded course on cognitive load theory. You'll diagnose intrinsic, extraneous and germane load in your own materials, redesign explanations to reduce wasted cycles, and build assessments that surface real understanding instead of memorisation.",
  tags: ['Learning Science', 'Memory', 'Study Skills', 'Cognitive Load'],
  updated: '2h ago',
  enrollments: 4820,
  completion_rate: 68,
  avg_rating: 4.7,
  revenue_usd: 12480,
}

const STATUS_TONE: Record<string, Tone> = {
  published: 'success',
  calibrated: 'info',
  assessment: 'violet',
  finished: 'teal',
  draft: 'warning',
  disabled: 'danger',
  archived: 'neutral',
}
const DIFFICULTY_TONE: Record<string, Tone> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
}

const CATEGORY_OPTIONS = [
  { value: 'Learning Science', label: 'Learning Science' },
  { value: 'Productivity', label: 'Productivity' },
  { value: 'Memory', label: 'Memory' },
  { value: 'Communication', label: 'Communication' },
  { value: 'Reasoning', label: 'Reasoning' },
  { value: 'Psychology', label: 'Psychology' },
]
const CREATOR_OPTIONS = [
  { value: 'maya-chen', label: 'Maya Chen' },
  { value: 'amir-salehi', label: 'Amir Salehi' },
  { value: 'dana-kwon', label: 'Dana Kwon' },
  { value: 'yuki-tanaka', label: 'Yuki Tanaka' },
  { value: 'jordan-reyes', label: 'Jordan Reyes' },
  { value: 'priya-sharma', label: 'Priya Sharma' },
  { value: 'chen-wei', label: 'Chen Wei' },
  { value: 'marco-reyes', label: 'Marco Reyes' },
  { value: 'sarah-lin', label: 'Sarah Lin' },
  { value: 'james-webb', label: 'James Webb' },
  { value: 'mia-torres', label: 'Mia Torres' },
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
  { value: 'DE', label: 'German (DE)' },
  { value: 'JA', label: 'Japanese (JA)' },
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

interface Lesson {
  order: number
  title: string
  type: 'video' | 'reading' | 'audio'
  duration_min: number
  status: 'draft' | 'published'
}
const LESSONS: Lesson[] = [
  {
    order: 1,
    title: 'Why working memory is the bottleneck',
    type: 'video',
    duration_min: 12,
    status: 'published',
  },
  {
    order: 2,
    title: 'Intrinsic vs. extraneous load',
    type: 'reading',
    duration_min: 8,
    status: 'published',
  },
  {
    order: 3,
    title: 'Diagnosing load in your own materials',
    type: 'video',
    duration_min: 18,
    status: 'published',
  },
  {
    order: 4,
    title: 'Worked example: redesigning an explanation',
    type: 'video',
    duration_min: 22,
    status: 'published',
  },
  {
    order: 5,
    title: 'Audio essay: germane load and schema-building',
    type: 'audio',
    duration_min: 14,
    status: 'published',
  },
  {
    order: 6,
    title: 'Assessment patterns that surface understanding',
    type: 'reading',
    duration_min: 10,
    status: 'draft',
  },
]

const lessonTypeIcon = (t: Lesson['type']) =>
  t === 'video' ? Video : t === 'audio' ? Headphones : FileText
const lessonTypeTone = (t: Lesson['type']): Tone =>
  t === 'video' ? 'violet' : t === 'audio' ? 'teal' : 'info'

/* ── Sub-components (mirror UserDetail's pattern) ──────────────────── */

function StatTile({
  Icon,
  label,
  value,
  tone,
  hint,
}: {
  Icon: any
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

function SectionCard({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow?: string
  title: string
  children: React.ReactNode
  action?: React.ReactNode
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
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function CourseDetail() {
  const c = COURSE

  return (
    <AdminShell activeId="courses">
      {/* ── Breadcrumb / back link ─────────────────────────────── */}
      <div className="mb-4">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-[12px] hover:opacity-80"
          style={{ color: 'var(--hm-text-muted)' }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="hm-mono" style={{ letterSpacing: '0.08em' }}>
            COURSES
          </span>
          <span style={{ color: 'var(--hm-text-dim)' }}>/</span>
          <span style={{ color: 'var(--hm-text-dim)' }}>#{c.id}</span>
        </a>
      </div>

      {/* ── Header card ────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl mb-5"
        style={{
          background: 'linear-gradient(135deg, var(--hm-bg-card) 0%, var(--hm-bg-card-2) 100%)',
          border: '1px solid var(--hm-border-strong)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${ACCENT}26 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(167,139,250,0.18) 0%, transparent 60%)`,
          }}
        />
        <div className="relative flex items-start flex-wrap gap-5 px-6 py-5">
          {/* Course icon */}
          <span
            className="flex h-16 w-16 items-center justify-center rounded-2xl shrink-0"
            style={{
              background: 'linear-gradient(180deg, #A78BFA 0%, #8B5CF6 100%)',
              color: 'white',
              boxShadow: '0 12px 30px -10px rgba(139,92,246,0.5)',
            }}
          >
            <BookOpen className="h-7 w-7" />
          </span>

          {/* Identity */}
          <div className="min-w-0 flex-1">
            <p
              className="hm-mono text-[10px] mb-1"
              style={{ color: ACCENT, letterSpacing: '0.18em' }}
            >
              EDIT COURSE · #{c.id.toUpperCase()}
            </p>
            <h1
              className="text-[24px] font-semibold tracking-tight mb-1.5 truncate"
              style={{ color: 'var(--hm-text)', fontFamily: 'var(--hm-font-display)' }}
            >
              {c.title}
            </h1>
            <div
              className="flex items-center flex-wrap gap-x-4 gap-y-1.5 text-[12px]"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="hm-mono"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                >
                  /{c.slug}
                </span>
              </span>
              <span>·</span>
              <span>{c.category}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {LESSONS.length} lessons · {LESSONS.reduce((a, l) => a + l.duration_min, 0)} min
              </span>
              <span>·</span>
              <span>updated {c.updated}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <Pill tone={STATUS_TONE[c.status]}>{c.status}</Pill>
              <Pill tone={DIFFICULTY_TONE[c.difficulty]}>{c.difficulty}</Pill>
              <Pill tone="info">{c.language}</Pill>
              <span
                className="hm-mono text-[10px] ml-1"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
              >
                {c.price_credits} cr · +{c.hmn_reward} HMN
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-medium"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              <X className="h-3.5 w-3.5" />
              Discard changes
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{
                background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}d9 100%)`,
                color: 'white',
                boxShadow: `0 8px 24px -8px ${ACCENT}66`,
              }}
            >
              <Save className="h-3.5 w-3.5" />
              Save course
            </button>
          </div>
        </div>
      </div>

      {/* ── Stat tiles ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        <StatTile
          Icon={UsersIcon}
          tone="#A78BFA"
          label="Enrollments"
          value={c.enrollments.toLocaleString()}
          hint="active learners"
        />
        <StatTile
          Icon={TrendingUp}
          tone="#5EE6A8"
          label="Completion rate"
          value={`${c.completion_rate}%`}
          hint="of enrolled learners"
        />
        <StatTile
          Icon={Star}
          tone="#F4B26C"
          label="Avg rating"
          value={c.avg_rating.toFixed(1)}
          hint={`from ${((c.enrollments * 0.18) | 0).toLocaleString()} reviews`}
        />
        <StatTile
          Icon={DollarSign}
          tone="#5BC8C5"
          label="Revenue"
          value={`$${c.revenue_usd.toLocaleString()}`}
          hint="lifetime, USD"
        />
      </div>

      {/* ── 2-column body (main left · sidebar right) ──────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left (main) — Basic info + Description + Curriculum */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <SectionCard eyebrow="Profile" title="Basic info">
            <FieldGrid cols={2}>
              <Field label="Title" required span={2}>
                <TextInput defaultValue={c.title} placeholder="e.g. Cognitive Load Mastery" />
              </Field>
              <Field label="Slug" hint="Used in URLs, lowercase only." span={2}>
                <TextInput mono defaultValue={c.slug} placeholder="cognitive-load-mastery" />
              </Field>
              <Field label="Category" required>
                <Select defaultValue={c.category} options={CATEGORY_OPTIONS} />
              </Field>
              <Field label="Difficulty" required>
                <Select defaultValue={c.difficulty} options={DIFFICULTY_OPTIONS} />
              </Field>
              <Field label="Language" required>
                <Select defaultValue={c.language} options={LANGUAGE_OPTIONS} />
              </Field>
              <Field label="Estimated duration" hint="Auto-calculated from lessons.">
                <TextInput
                  mono
                  defaultValue={`${LESSONS.reduce((a, l) => a + l.duration_min, 0)} min`}
                />
              </Field>
            </FieldGrid>
          </SectionCard>

          <SectionCard eyebrow="Marketing" title="Description">
            <FieldGrid cols={1}>
              <Field label="Short description" hint="Shown on the catalog card (≤ 140 chars).">
                <Textarea rows={2} defaultValue={c.short_description} />
              </Field>
              <Field
                label="Full description"
                hint="Shown on the course landing page. Markdown supported."
              >
                <Textarea rows={5} defaultValue={c.long_description} />
              </Field>
              <Field label="Tags" hint="Help learners discover related courses.">
                <ChipsInput defaultValues={c.tags} placeholder="Add tag…" />
              </Field>
            </FieldGrid>
          </SectionCard>

          <SectionCard
            eyebrow="Content"
            title="Curriculum"
            action={
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[11.5px] font-medium"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-muted)',
                }}
              >
                <Plus className="h-3 w-3" />
                Add lesson
              </button>
            }
          >
            <ul className="flex flex-col">
              {LESSONS.map((l, i) => {
                const Icon = lessonTypeIcon(l.type)
                return (
                  <li
                    key={l.order}
                    className="flex items-center gap-3 py-2.5"
                    style={{ borderTop: i === 0 ? 'none' : '1px solid var(--hm-border)' }}
                  >
                    <GripVertical
                      className="h-3.5 w-3.5 shrink-0 cursor-grab"
                      style={{ color: 'var(--hm-text-dim)' }}
                    />
                    <span
                      className="hm-mono text-[10.5px] shrink-0 w-6 text-center"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      {String(l.order).padStart(2, '0')}
                    </span>
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                      style={{
                        background:
                          lessonTypeTone(l.type) === 'violet'
                            ? 'var(--hm-violet-soft)'
                            : `${lessonTypeTone(l.type) === 'teal' ? 'rgba(91,200,197,0.12)' : 'rgba(96,165,250,0.12)'}`,
                        color:
                          lessonTypeTone(l.type) === 'violet'
                            ? 'var(--hm-violet-2)'
                            : lessonTypeTone(l.type) === 'teal'
                              ? '#5BC8C5'
                              : '#60A5FA',
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[12.5px] font-medium truncate"
                        style={{ color: 'var(--hm-text)' }}
                      >
                        {l.title}
                      </p>
                      <p
                        className="hm-mono text-[10px]"
                        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                      >
                        {l.type.toUpperCase()} · {l.duration_min} MIN
                      </p>
                    </div>
                    <Pill tone={l.status === 'published' ? 'success' : 'warning'}>{l.status}</Pill>
                    <button
                      type="button"
                      aria-label="Lesson actions"
                      className="flex h-7 w-7 items-center justify-center rounded-md shrink-0"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </SectionCard>
        </div>

        {/* Right (sidebar) — Ownership + Pricing + Lifecycle + Danger zone */}
        <div className="col-span-1 flex flex-col gap-4">
          <SectionCard eyebrow="Ownership" title="Creator">
            <FieldGrid cols={1}>
              <Field
                label="Assigned creator"
                hint="Reassigning notifies the new creator by email."
                required
              >
                <Select defaultValue="maya-chen" options={CREATOR_OPTIONS} />
              </Field>
              <div
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
                style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold shrink-0"
                  style={{
                    background: 'linear-gradient(180deg,#A78BFA 0%,#8B5CF6 100%)',
                    color: 'white',
                  }}
                >
                  MC
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                    Maya Chen
                  </p>
                  <p
                    className="hm-mono text-[9.5px]"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                  >
                    42 courses · 4.8 ★ avg
                  </p>
                </div>
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded shrink-0"
                  style={{ color: 'var(--hm-text-dim)' }}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </FieldGrid>
          </SectionCard>

          <SectionCard eyebrow="Monetisation" title="Pricing & access">
            <FieldGrid cols={1}>
              <Field label="Price (credits)" hint="0 = free for all learners.">
                <TextInput mono type="number" defaultValue={c.price_credits} placeholder="0" />
              </Field>
              <Field label="HMN reward" hint="Granted to creator on completion.">
                <TextInput mono type="number" defaultValue={c.hmn_reward} placeholder="0" />
              </Field>
              <Field label="Access">
                <div className="flex flex-col gap-2">
                  <Toggle defaultChecked label="Sell to non-students individually" />
                  <Toggle defaultChecked label="Include in subscription bundle" />
                  <Toggle defaultChecked={false} label="Free preview for first lesson" />
                </div>
              </Field>
            </FieldGrid>
          </SectionCard>

          <SectionCard eyebrow="Lifecycle" title="Status & visibility">
            <FieldGrid cols={1}>
              <Field label="Status" required>
                <Select defaultValue={c.status} options={STATUS_OPTIONS} />
              </Field>
              <Field label="Visibility">
                <div className="flex flex-col gap-2">
                  <Toggle defaultChecked label="Visible in public catalog" />
                  <Toggle defaultChecked={false} label="Featured on homepage" />
                  <Toggle defaultChecked label="Indexable by search engines" />
                </div>
              </Field>
            </FieldGrid>
          </SectionCard>

          <SectionCard eyebrow="Danger zone" title="Course removal">
            <p className="text-[12px] mb-3" style={{ color: 'var(--hm-text-muted)' }}>
              Archiving moves the course out of the public catalog and stops new enrollments.
              Existing learners keep access.
            </p>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 w-full px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{
                background: 'rgba(244,99,110,0.10)',
                border: '1px solid rgba(244,99,110,0.30)',
                color: ACCENT,
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Archive course
            </button>
          </SectionCard>
        </div>
      </div>
    </AdminShell>
  )
}
