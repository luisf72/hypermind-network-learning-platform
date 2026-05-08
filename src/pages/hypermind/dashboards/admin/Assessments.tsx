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
} from '../_shared/AdminModal'
import { GraduationCap, Plus, ChevronDown, X } from 'lucide-react'

/* ── Types ─────────────────────────────────────────────────────────── */

interface AssessmentRow {
  id: string
  title: string
  type: 'lesson_quiz' | 'course_final' | 'standalone'
  evaluator: string
  evaluator_initials: string
  passing_score: number
  status: 'draft' | 'review' | 'published' | 'archived'
  price_credits: number | null
  hmn_reward: number | null
  created: string
  updated: string
}

/* ── Data ──────────────────────────────────────────────────────────── */

const ROWS: AssessmentRow[] = [
  {
    id: 'as-01',
    title: 'Active Recall — Final',
    type: 'course_final',
    evaluator: 'Maya Chen',
    evaluator_initials: 'MC',
    passing_score: 70,
    status: 'published',
    price_credits: 120,
    hmn_reward: 40,
    created: 'Jan 8, 2025',
    updated: '2h ago',
  },
  {
    id: 'as-02',
    title: 'Working Memory Quiz',
    type: 'lesson_quiz',
    evaluator: 'Amir Salehi',
    evaluator_initials: 'AS',
    passing_score: 60,
    status: 'published',
    price_credits: null,
    hmn_reward: null,
    created: 'Jan 14, 2025',
    updated: '1d ago',
  },
  {
    id: 'as-03',
    title: 'Spacing Effect Diagnostic',
    type: 'standalone',
    evaluator: 'Dana Kwon',
    evaluator_initials: 'DK',
    passing_score: 80,
    status: 'published',
    price_credits: 200,
    hmn_reward: 70,
    created: 'Feb 3, 2025',
    updated: '3d ago',
  },
  {
    id: 'as-04',
    title: 'Cognitive Load Patterns',
    type: 'lesson_quiz',
    evaluator: 'Yuki Tanaka',
    evaluator_initials: 'YT',
    passing_score: 65,
    status: 'published',
    price_credits: null,
    hmn_reward: null,
    created: 'Feb 18, 2025',
    updated: '5d ago',
  },
  {
    id: 'as-05',
    title: 'Attention Switching Drill',
    type: 'standalone',
    evaluator: 'Jordan Reyes',
    evaluator_initials: 'JR',
    passing_score: 70,
    status: 'review',
    price_credits: 160,
    hmn_reward: 55,
    created: 'Mar 1, 2025',
    updated: '6d ago',
  },
  {
    id: 'as-06',
    title: 'Bayesian Reasoning',
    type: 'course_final',
    evaluator: 'Priya Sharma',
    evaluator_initials: 'PS',
    passing_score: 75,
    status: 'published',
    price_credits: 240,
    hmn_reward: 80,
    created: 'Mar 9, 2025',
    updated: '1w ago',
  },
  {
    id: 'as-07',
    title: 'Critical Reading',
    type: 'lesson_quiz',
    evaluator: 'Chen Wei',
    evaluator_initials: 'CW',
    passing_score: 60,
    status: 'draft',
    price_credits: null,
    hmn_reward: null,
    created: 'Mar 22, 2025',
    updated: '1w ago',
  },
  {
    id: 'as-08',
    title: 'Storytelling Structure',
    type: 'lesson_quiz',
    evaluator: 'Marco Reyes',
    evaluator_initials: 'MR',
    passing_score: 65,
    status: 'published',
    price_credits: 100,
    hmn_reward: 35,
    created: 'Apr 5, 2025',
    updated: '2w ago',
  },
  {
    id: 'as-09',
    title: 'Decision Heuristics',
    type: 'standalone',
    evaluator: 'Sarah Lin',
    evaluator_initials: 'SL',
    passing_score: 80,
    status: 'published',
    price_credits: 180,
    hmn_reward: 60,
    created: 'Apr 14, 2025',
    updated: '2w ago',
  },
  {
    id: 'as-10',
    title: 'Note-Taking Diagnostic',
    type: 'standalone',
    evaluator: 'James Webb',
    evaluator_initials: 'JW',
    passing_score: 55,
    status: 'archived',
    price_credits: null,
    hmn_reward: null,
    created: 'Apr 28, 2025',
    updated: '3w ago',
  },
  {
    id: 'as-11',
    title: 'Emotional Awareness Check',
    type: 'course_final',
    evaluator: 'Mia Torres',
    evaluator_initials: 'MT',
    passing_score: 72,
    status: 'published',
    price_credits: 140,
    hmn_reward: 45,
    created: 'May 2, 2025',
    updated: '4d ago',
  },
  {
    id: 'as-12',
    title: 'Python Data Fluency Quiz',
    type: 'lesson_quiz',
    evaluator: 'Amir Salehi',
    evaluator_initials: 'AS',
    passing_score: 68,
    status: 'review',
    price_credits: null,
    hmn_reward: null,
    created: 'May 10, 2025',
    updated: '1d ago',
  },
]

/* ── Tone helpers ──────────────────────────────────────────────────── */

const typeTone = (t: AssessmentRow['type']) =>
  t === 'course_final' ? 'violet' : t === 'standalone' ? 'info' : ('teal' as any)

const statusTone = (s: AssessmentRow['status']) =>
  s === 'published'
    ? 'success'
    : s === 'review'
      ? 'warning'
      : s === 'draft'
        ? 'neutral'
        : ('danger' as any)

/* ── Filter select ─────────────────────────────────────────────────── */

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
        className="appearance-none pl-3 pr-7 h-8 rounded-lg text-[12px] outline-none cursor-pointer"
        style={{
          background: active ? 'var(--hm-violet-soft)' : 'var(--hm-bg-card-2)',
          border: `1px solid ${active ? 'var(--hm-violet-2)' : 'var(--hm-border)'}`,
          color: active ? 'var(--hm-violet-2)' : 'var(--hm-text-muted)',
          paddingRight: active ? 44 : 28,
        }}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="h-3 w-3 pointer-events-none absolute"
        style={{
          right: active ? 24 : 8,
          color: active ? 'var(--hm-violet-2)' : 'var(--hm-text-dim)',
        }}
      />
      {active && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-1.5 flex h-4 w-4 items-center justify-center rounded"
          style={{ background: 'var(--hm-violet-2)', color: 'white' }}
        >
          <X className="h-2.5 w-2.5" />
        </button>
      )}
    </div>
  )
}

/* ── Columns ───────────────────────────────────────────────────────── */

const COLUMNS: Column<AssessmentRow>[] = [
  {
    header: 'Assessment',
    render: (r) => (
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
          style={{ background: 'var(--hm-violet-soft)', color: 'var(--hm-violet-2)' }}
        >
          <GraduationCap className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p className="font-medium truncate" style={{ color: 'var(--hm-text)', maxWidth: 240 }}>
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
    header: 'Type',
    render: (r) => (
      <Pill tone={typeTone(r.type)}>
        {r.type === 'lesson_quiz'
          ? 'lesson quiz'
          : r.type === 'course_final'
            ? 'course final'
            : 'standalone'}
      </Pill>
    ),
  },
  {
    header: 'Evaluator',
    render: (r) => (
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full text-[9.5px] font-semibold shrink-0"
          style={{ background: 'linear-gradient(180deg,#A78BFA 0%,#8B5CF6 100%)', color: 'white' }}
        >
          {r.evaluator_initials}
        </span>
        <span className="truncate text-[12.5px]" style={{ color: 'var(--hm-text-muted)' }}>
          {r.evaluator}
        </span>
      </div>
    ),
  },
  {
    header: 'Pass',
    align: 'right',
    render: (r) => <Mono>{r.passing_score}%</Mono>,
  },
  {
    header: 'Status',
    render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill>,
  },
  {
    header: 'Price',
    align: 'right',
    render: (r) =>
      r.price_credits != null ? (
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
  {
    header: 'Created',
    align: 'right',
    render: (r) => <Mono>{r.created}</Mono>,
  },
  {
    header: 'Updated',
    align: 'right',
    render: (r) => <Mono>{r.updated}</Mono>,
  },
]

/* ── Filter / modal options ────────────────────────────────────────── */

const TYPE_OPTIONS = [
  { value: 'lesson_quiz', label: 'Lesson quiz' },
  { value: 'course_final', label: 'Course final' },
  { value: 'standalone', label: 'Standalone' },
]

const STATUS_OPTIONS_FILTER = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In review' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

const EVALUATOR_OPTIONS = [
  { value: 'Maya Chen', label: 'Maya Chen' },
  { value: 'Amir Salehi', label: 'Amir Salehi' },
  { value: 'Dana Kwon', label: 'Dana Kwon' },
  { value: 'Yuki Tanaka', label: 'Yuki Tanaka' },
  { value: 'Jordan Reyes', label: 'Jordan Reyes' },
  { value: 'Priya Sharma', label: 'Priya Sharma' },
  { value: 'Chen Wei', label: 'Chen Wei' },
  { value: 'Marco Reyes', label: 'Marco Reyes' },
  { value: 'Sarah Lin', label: 'Sarah Lin' },
  { value: 'James Webb', label: 'James Webb' },
  { value: 'Mia Torres', label: 'Mia Torres' },
]

const SKILL_OPTIONS = [
  { value: 'Memory', label: 'Memory' },
  { value: 'Cognition', label: 'Cognition' },
  { value: 'Attention', label: 'Attention' },
  { value: 'Reasoning', label: 'Reasoning' },
  { value: 'Communication', label: 'Communication' },
  { value: 'Productivity', label: 'Productivity' },
]

const MODAL_STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In review' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

const DIFFICULTY_OPTIONS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

/* ── Modal state ───────────────────────────────────────────────────── */

type ModalState = { mode: 'create' } | { mode: 'edit'; row: AssessmentRow } | null

/* ── Page ──────────────────────────────────────────────────────────── */

export default function Assessments() {
  const [modal, setModal] = useState<ModalState>(null)
  const [filterType, setFilterType] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterEvaluator, setFilterEvaluator] = useState('')

  const filtered = ROWS.filter(
    (r) =>
      (filterType === '' || r.type === filterType) &&
      (filterStatus === '' || r.status === filterStatus) &&
      (filterEvaluator === '' || r.evaluator === filterEvaluator)
  )

  const isOpen = modal !== null
  const editing = modal?.mode === 'edit' ? modal.row : null

  const filterControls = (
    <>
      <FilterSelect
        label="Type"
        value={filterType}
        options={TYPE_OPTIONS}
        onChange={setFilterType}
      />
      <FilterSelect
        label="Status"
        value={filterStatus}
        options={STATUS_OPTIONS_FILTER}
        onChange={setFilterStatus}
      />
      <FilterSelect
        label="Evaluator"
        value={filterEvaluator}
        options={EVALUATOR_OPTIONS}
        onChange={setFilterEvaluator}
      />
    </>
  )

  return (
    <AdminShell activeId="assessments">
      <AdminTable
        eyebrow="Catalog"
        title="Assessments"
        subtitle="Quizzes, course finals and standalone diagnostics."
        primaryAction={{
          label: 'New assessment',
          icon: Plus,
          onClick: () => setModal({ mode: 'create' }),
        }}
        searchPlaceholder="Search by title or evaluator…"
        filterControls={filterControls}
        columns={COLUMNS}
        rows={filtered}
        totalCount={482}
        pageInfo={{ current: 1, total: 49 }}
        onRowAction={(row) => setModal({ mode: 'edit', row })}
      />

      <AdminModal
        open={isOpen}
        onClose={() => setModal(null)}
        mode={modal?.mode ?? 'create'}
        entityLabel="assessment"
        entityName={editing?.title}
        subtitle={
          editing
            ? `#${editing.id} · ${editing.type.replace('_', ' ')} · updated ${editing.updated}`
            : 'Build a quiz, course final or standalone diagnostic.'
        }
        width={680}
        destructive={editing ? { label: 'Archive assessment' } : undefined}
      >
        <FieldGrid cols={2}>
          <Field label="Title" required span={2}>
            <TextInput defaultValue={editing?.title ?? ''} placeholder="e.g. Working Memory Quiz" />
          </Field>
          <Field label="Type" required>
            <Select defaultValue={editing?.type ?? 'lesson_quiz'} options={TYPE_OPTIONS} />
          </Field>
          <Field label="Evaluator" required>
            <Select defaultValue={editing?.evaluator ?? 'Maya Chen'} options={EVALUATOR_OPTIONS} />
          </Field>
          <Field label="Skill category" required>
            <Select defaultValue={'Memory'} options={SKILL_OPTIONS} />
          </Field>
          <Field label="Difficulty" required>
            <Select defaultValue={'beginner'} options={DIFFICULTY_OPTIONS} />
          </Field>
          <Field label="Passing score (%)" required hint="Minimum percentage to pass.">
            <TextInput
              mono
              type="number"
              defaultValue={editing?.passing_score ?? 70}
              placeholder="70"
            />
          </Field>
          <Field label="Status" required>
            <Select defaultValue={editing?.status ?? 'draft'} options={MODAL_STATUS_OPTIONS} />
          </Field>
          <Field label="Price (credits)" hint="0 = free to attempt.">
            <TextInput
              mono
              type="number"
              defaultValue={editing?.price_credits ?? 0}
              placeholder="0"
            />
          </Field>
          <Field label="HMN reward" hint="Tokens earned on passing.">
            <TextInput mono type="number" defaultValue={editing?.hmn_reward ?? 0} placeholder="0" />
          </Field>
          <Field label="Time limit (minutes)" required hint="Total time for the attempt.">
            <TextInput mono type="number" defaultValue={30} placeholder="30" />
          </Field>
          <Field label="Max attempts" required hint="0 = unlimited retries.">
            <TextInput mono type="number" defaultValue={3} placeholder="3" />
          </Field>
          <Field label="Instructions" span={2} hint="Shown to the learner before they start.">
            <Textarea
              rows={3}
              placeholder="Read carefully. You have one chance to review answers before submitting…"
              defaultValue={
                editing
                  ? `Answer all questions carefully. Pass at ${editing.passing_score}% or above.`
                  : ''
              }
            />
          </Field>
          <Field label="Behaviour" span={2}>
            <div className="flex flex-col gap-2">
              <Toggle defaultChecked label="Shuffle question order on each attempt" />
              <Toggle defaultChecked={false} label="Show correct answer after submission" />
              <Toggle defaultChecked label="Allow review of past attempts" />
            </div>
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
