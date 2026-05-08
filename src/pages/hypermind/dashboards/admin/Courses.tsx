import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, type Column } from '../_shared/AdminTable'
import AdminModal, {
  Field,
  FieldGrid,
  TextInput,
  Textarea,
  Select,
  Toggle,
  ChipsInput,
} from '../_shared/AdminModal'
import { BookOpen, Plus, ChevronDown, X } from 'lucide-react'

interface CourseRow {
  id: string
  title: string
  category: string
  creator: string
  creatorInitials: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  language: string
  status: 'draft' | 'finished' | 'assessment' | 'calibrated' | 'published' | 'disabled' | 'archived'
  price_credits: number
  hmn_reward: number
  created: string
  updated: string
}

const ROWS: CourseRow[] = [
  {
    id: '0a1b',
    title: 'Cognitive Load Mastery',
    category: 'Learning Science',
    creator: 'Maya Chen',
    creatorInitials: 'MC',
    difficulty: 'intermediate',
    language: 'EN',
    status: 'published',
    price_credits: 240,
    hmn_reward: 80,
    created: 'Jan 12, 2025',
    updated: '2h ago',
  },
  {
    id: '0a1c',
    title: 'Foundations of Active Recall',
    category: 'Learning Science',
    creator: 'Amir Salehi',
    creatorInitials: 'AS',
    difficulty: 'beginner',
    language: 'EN',
    status: 'published',
    price_credits: 120,
    hmn_reward: 40,
    created: 'Feb 3, 2025',
    updated: '1d ago',
  },
  {
    id: '0a1d',
    title: 'Spaced Repetition Engineering',
    category: 'Memory',
    creator: 'Dana Kwon',
    creatorInitials: 'DK',
    difficulty: 'advanced',
    language: 'EN',
    status: 'calibrated',
    price_credits: 380,
    hmn_reward: 120,
    created: 'Feb 18, 2025',
    updated: '3d ago',
  },
  {
    id: '0a1e',
    title: 'Deep Work Habits',
    category: 'Productivity',
    creator: 'Yuki Tanaka',
    creatorInitials: 'YT',
    difficulty: 'intermediate',
    language: 'EN',
    status: 'published',
    price_credits: 180,
    hmn_reward: 60,
    created: 'Mar 1, 2025',
    updated: '5d ago',
  },
  {
    id: '0a1f',
    title: 'Note-Taking Systems',
    category: 'Productivity',
    creator: 'Jordan Reyes',
    creatorInitials: 'JR',
    difficulty: 'beginner',
    language: 'EN',
    status: 'draft',
    price_credits: 0,
    hmn_reward: 0,
    created: 'Mar 14, 2025',
    updated: '6d ago',
  },
  {
    id: '0a20',
    title: 'Metacognition for Engineers',
    category: 'Learning Science',
    creator: 'Priya Sharma',
    creatorInitials: 'PS',
    difficulty: 'advanced',
    language: 'EN',
    status: 'assessment',
    price_credits: 280,
    hmn_reward: 90,
    created: 'Mar 22, 2025',
    updated: '1w ago',
  },
  {
    id: '0a21',
    title: 'Visual Thinking & Diagrams',
    category: 'Communication',
    creator: 'Chen Wei',
    creatorInitials: 'CW',
    difficulty: 'intermediate',
    language: 'EN',
    status: 'published',
    price_credits: 160,
    hmn_reward: 50,
    created: 'Apr 5, 2025',
    updated: '1w ago',
  },
  {
    id: '0a22',
    title: 'Storytelling for Educators',
    category: 'Communication',
    creator: 'Marco Reyes',
    creatorInitials: 'MR',
    difficulty: 'beginner',
    language: 'ES',
    status: 'published',
    price_credits: 140,
    hmn_reward: 45,
    created: 'Apr 11, 2025',
    updated: '2w ago',
  },
  {
    id: '0a23',
    title: 'Critical Thinking Foundations',
    category: 'Reasoning',
    creator: 'Sarah Lin',
    creatorInitials: 'SL',
    difficulty: 'beginner',
    language: 'EN',
    status: 'finished',
    price_credits: 100,
    hmn_reward: 35,
    created: 'Apr 20, 2025',
    updated: '2w ago',
  },
  {
    id: '0a24',
    title: 'Bayesian Intuition',
    category: 'Reasoning',
    creator: 'James Webb',
    creatorInitials: 'JW',
    difficulty: 'advanced',
    language: 'EN',
    status: 'disabled',
    price_credits: 320,
    hmn_reward: 100,
    created: 'May 2, 2025',
    updated: '3w ago',
  },
  {
    id: '0a25',
    title: 'Emotional Regulation',
    category: 'Psychology',
    creator: 'Mia Torres',
    creatorInitials: 'MT',
    difficulty: 'intermediate',
    language: 'FR',
    status: 'archived',
    price_credits: 180,
    hmn_reward: 60,
    created: 'May 9, 2025',
    updated: '1mo ago',
  },
  {
    id: '0a26',
    title: 'Python for Data Analysis',
    category: 'Programming',
    creator: 'Amir Salehi',
    creatorInitials: 'AS',
    difficulty: 'intermediate',
    language: 'EN',
    status: 'published',
    price_credits: 220,
    hmn_reward: 70,
    created: 'May 15, 2025',
    updated: '4d ago',
  },
]

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'finished', label: 'Finished' },
  { value: 'assessment', label: 'Assessment' },
  { value: 'calibrated', label: 'Calibrated' },
  { value: 'published', label: 'Published' },
  { value: 'disabled', label: 'Disabled' },
  { value: 'archived', label: 'Archived' },
]

const CATEGORY_OPTIONS = [
  { value: 'Learning Science', label: 'Learning Science' },
  { value: 'Productivity', label: 'Productivity' },
  { value: 'Memory', label: 'Memory' },
  { value: 'Communication', label: 'Communication' },
  { value: 'Reasoning', label: 'Reasoning' },
  { value: 'Psychology', label: 'Psychology' },
  { value: 'Programming', label: 'Programming' },
  { value: 'Data & ML', label: 'Data & ML' },
  { value: 'Design', label: 'Design' },
]

const LANGUAGE_OPTIONS = [
  { value: 'EN', label: '🇬🇧  English' },
  { value: 'ES', label: '🇪🇸  Spanish — Español' },
  { value: 'FR', label: '🇫🇷  French — Français' },
  { value: 'DE', label: '🇩🇪  German — Deutsch' },
  { value: 'PT', label: '🇧🇷  Portuguese — Português' },
  { value: 'ZH', label: '🇨🇳  Chinese — 中文' },
  { value: 'JA', label: '🇯🇵  Japanese — 日本語' },
  { value: 'KO', label: '🇰🇷  Korean — 한국어' },
  { value: 'AR', label: '🇸🇦  Arabic — العربية' },
  { value: 'HI', label: '🇮🇳  Hindi — हिन्दी' },
  { value: 'IT', label: '🇮🇹  Italian — Italiano' },
  { value: 'RU', label: '🇷🇺  Russian — Русский' },
  { value: 'TR', label: '🇹🇷  Turkish — Türkçe' },
  { value: 'NL', label: '🇳🇱  Dutch — Nederlands' },
  { value: 'PL', label: '🇵🇱  Polish — Polski' },
]

const DIFFICULTY_OPTIONS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

const MODAL_STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'finished', label: 'Finished — content complete' },
  { value: 'assessment', label: 'Assessment — in evaluation' },
  { value: 'calibrated', label: 'Calibrated — panel-approved' },
  { value: 'published', label: 'Published — live in catalog' },
  { value: 'disabled', label: 'Disabled — temporarily hidden' },
  { value: 'archived', label: 'Archived — read-only' },
]

const statusTone = (s: CourseRow['status']) =>
  s === 'published'
    ? 'success'
    : s === 'calibrated'
      ? 'info'
      : s === 'assessment'
        ? 'violet'
        : s === 'finished'
          ? 'teal'
          : s === 'draft'
            ? 'warning'
            : s === 'disabled'
              ? 'danger'
              : 'neutral'

const difficultyTone = (d: CourseRow['difficulty']) =>
  d === 'beginner' ? 'success' : d === 'intermediate' ? 'warning' : 'danger'

/* ── Filter select ─────────────────────────────────────────── */
function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  const active = value !== ''
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none h-8 pl-2.5 pr-7 rounded-lg text-[11.5px] font-medium outline-none cursor-pointer"
        style={{
          background: active ? 'rgba(124,92,246,0.12)' : 'var(--hm-bg-card-2)',
          border: `1px solid ${active ? 'rgba(124,92,246,0.45)' : 'var(--hm-border)'}`,
          color: active ? 'var(--hm-violet-2)' : 'var(--hm-text-muted)',
        }}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{ background: 'var(--hm-bg-card)', color: 'var(--hm-text)' }}
          >
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-1.5 h-3 w-3"
        style={{ color: active ? 'var(--hm-violet-2)' : 'var(--hm-text-dim)' }}
      />
      {active && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full flex items-center justify-center"
          style={{ background: 'var(--hm-violet-2)', color: '#fff' }}
          aria-label={`Clear ${label} filter`}
        >
          <X className="h-2 w-2" />
        </button>
      )}
    </div>
  )
}

/* ── Columns ───────────────────────────────────────────────── */
const COLUMNS: Column<CourseRow>[] = [
  {
    header: 'Title',
    render: (r) => (
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
          style={{ background: 'var(--hm-violet-soft)', color: 'var(--hm-violet-2)' }}
        >
          <BookOpen className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p className="font-medium truncate" style={{ color: 'var(--hm-text)', maxWidth: 190 }}>
            {r.title}
          </p>
          <p className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
            #{r.id}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: 'Category',
    render: (r) => (
      <span className="text-[12px]" style={{ color: 'var(--hm-text-muted)' }}>
        {r.category}
      </span>
    ),
  },
  {
    header: 'Creator',
    render: (r) => (
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full text-[9.5px] font-semibold shrink-0"
          style={{
            background: 'var(--hm-violet-soft)',
            color: 'var(--hm-violet-2)',
            border: '1px solid rgba(124,92,246,0.25)',
          }}
        >
          {r.creatorInitials}
        </span>
        <span
          className="text-[12px] truncate"
          style={{ color: 'var(--hm-text-muted)', maxWidth: 100 }}
        >
          {r.creator}
        </span>
      </div>
    ),
  },
  { header: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
  { header: 'Lang', render: (r) => <Mono>{r.language}</Mono> },
  {
    header: 'Price',
    align: 'right',
    render: (r) =>
      r.price_credits ? (
        <span className="inline-flex items-center gap-1 hm-mono text-[11px] whitespace-nowrap">
          <span style={{ color: 'var(--hm-text)' }}>{r.price_credits} cr</span>
          <span style={{ color: 'var(--hm-text-dim)', fontSize: 9, letterSpacing: '0.08em' }}>
            OR
          </span>
          <span style={{ color: 'var(--hm-amber)' }}>{r.hmn_reward} HMN</span>
        </span>
      ) : (
        <Mono>—</Mono>
      ),
  },
  { header: 'Created', align: 'right', render: (r) => <Mono>{r.created}</Mono> },
  { header: 'Updated', align: 'right', render: (r) => <Mono>{r.updated}</Mono> },
]

type ModalState = { mode: 'create' } | { mode: 'edit'; row: CourseRow } | null

export default function Courses() {
  const [modal, setModal] = useState<ModalState>(null)
  const [filterStatus, setFilterStatus] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterLanguage, setFilterLanguage] = useState('')

  const filtered = ROWS.filter(
    (r) =>
      (filterStatus === '' || r.status === filterStatus) &&
      (filterCategory === '' || r.category === filterCategory) &&
      (filterLanguage === '' || r.language === filterLanguage)
  )

  const isOpen = modal !== null
  const editing = modal?.mode === 'edit' ? modal.row : null

  const filterControls = (
    <>
      <FilterSelect
        label="Status"
        value={filterStatus}
        options={STATUS_OPTIONS}
        onChange={setFilterStatus}
      />
      <FilterSelect
        label="Category"
        value={filterCategory}
        options={CATEGORY_OPTIONS}
        onChange={setFilterCategory}
      />
      <FilterSelect
        label="Language"
        value={filterLanguage}
        options={LANGUAGE_OPTIONS}
        onChange={setFilterLanguage}
      />
    </>
  )

  return (
    <AdminShell activeId="courses">
      <AdminTable
        eyebrow="Catalog"
        title="Courses"
        subtitle="Manage course content, pricing and lifecycle status."
        primaryAction={{
          label: 'New course',
          icon: Plus,
          onClick: () => setModal({ mode: 'create' }),
        }}
        searchPlaceholder="Search by title, category or creator…"
        filterControls={filterControls}
        columns={COLUMNS}
        rows={filtered}
        totalCount={12480}
        pageInfo={{ current: 1, total: 312 }}
        onRowAction={(row) => setModal({ mode: 'edit', row })}
      />

      <AdminModal
        open={isOpen}
        onClose={() => setModal(null)}
        mode={modal?.mode ?? 'create'}
        entityLabel="course"
        entityName={editing?.title}
        subtitle={
          editing
            ? `#${editing.id} · ${editing.category} · ${editing.difficulty} · updated ${editing.updated}`
            : 'Create a new course in the catalog.'
        }
        width={680}
        destructive={editing ? { label: 'Archive course' } : undefined}
      >
        <FieldGrid cols={2}>
          <Field label="Title" required span={2}>
            <TextInput
              defaultValue={editing?.title ?? ''}
              placeholder="e.g. Cognitive Load Mastery"
            />
          </Field>
          <Field
            label="Course language"
            required
            span={2}
            hint="Primary language this course is taught in."
          >
            <Select defaultValue={editing?.language ?? 'EN'} options={LANGUAGE_OPTIONS} />
          </Field>
          <Field label="Slug" hint="Used in URLs, lowercase only.">
            <TextInput
              mono
              defaultValue={editing ? editing.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''}
              placeholder="cognitive-load-mastery"
            />
          </Field>
          <Field label="Category" required>
            <Select
              defaultValue={editing?.category ?? 'Learning Science'}
              options={CATEGORY_OPTIONS}
            />
          </Field>
          <Field label="Difficulty" required>
            <Select defaultValue={editing?.difficulty ?? 'beginner'} options={DIFFICULTY_OPTIONS} />
          </Field>
          <Field label="Price (credits)" hint="0 = free for all learners.">
            <TextInput
              mono
              type="number"
              defaultValue={editing?.price_credits ?? 0}
              placeholder="0"
            />
          </Field>
          <Field label="HMN reward" hint="Granted to creator on completion.">
            <TextInput mono type="number" defaultValue={editing?.hmn_reward ?? 0} placeholder="0" />
          </Field>
          <Field label="Status" required span={2}>
            <Select defaultValue={editing?.status ?? 'draft'} options={MODAL_STATUS_OPTIONS} />
          </Field>
          <Field label="Short description" span={2} hint="Shown on the catalog card.">
            <Textarea
              rows={3}
              placeholder="One or two sentences explaining what learners will gain…"
              defaultValue={
                editing
                  ? `An ${editing.difficulty} course on ${editing.category.toLowerCase()} fundamentals.`
                  : ''
              }
            />
          </Field>
          <Field label="Tags" span={2} hint="Help learners discover related courses.">
            <ChipsInput
              defaultValues={editing ? [editing.category, editing.difficulty] : []}
              placeholder="Add tag…"
            />
          </Field>
          <Field label="Visibility" span={2}>
            <Toggle
              defaultChecked={editing ? editing.status === 'published' : false}
              label="Publish to catalog when saved"
            />
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
