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
import { SlidersHorizontal, Plus } from 'lucide-react'

interface VariableRow {
  id: string
  key: string
  label: string
  type: 'number' | 'boolean' | 'enum' | 'duration'
  default_value: string
  used_in: number
  is_active: boolean
}

const ROWS: VariableRow[] = [
  {
    id: 'v-01',
    key: 'default_passing_score',
    label: 'Default passing score',
    type: 'number',
    default_value: '70%',
    used_in: 412,
    is_active: true,
  },
  {
    id: 'v-02',
    key: 'default_max_attempts',
    label: 'Default max attempts',
    type: 'number',
    default_value: '3',
    used_in: 482,
    is_active: true,
  },
  {
    id: 'v-03',
    key: 'default_time_limit',
    label: 'Default time limit',
    type: 'duration',
    default_value: '20m',
    used_in: 240,
    is_active: true,
  },
  {
    id: 'v-04',
    key: 'shuffle_questions',
    label: 'Shuffle questions',
    type: 'boolean',
    default_value: 'true',
    used_in: 482,
    is_active: true,
  },
  {
    id: 'v-05',
    key: 'show_correct_answers',
    label: 'Show correct answers on review',
    type: 'boolean',
    default_value: 'false',
    used_in: 482,
    is_active: true,
  },
  {
    id: 'v-06',
    key: 'skill_category_options',
    label: 'Skill categories',
    type: 'enum',
    default_value: '12 values',
    used_in: 482,
    is_active: true,
  },
  {
    id: 'v-07',
    key: 'difficulty_levels',
    label: 'Difficulty levels',
    type: 'enum',
    default_value: '3 values',
    used_in: 482,
    is_active: true,
  },
  {
    id: 'v-08',
    key: 'calibration_threshold',
    label: 'Calibration threshold',
    type: 'number',
    default_value: '0.85',
    used_in: 124,
    is_active: true,
  },
  {
    id: 'v-09',
    key: 'min_questions_per_quiz',
    label: 'Min questions per quiz',
    type: 'number',
    default_value: '5',
    used_in: 482,
    is_active: true,
  },
  {
    id: 'v-10',
    key: 'max_questions_per_quiz',
    label: 'Max questions per quiz',
    type: 'number',
    default_value: '40',
    used_in: 482,
    is_active: true,
  },
  {
    id: 'v-11',
    key: 'auto_grade_essays',
    label: 'Auto-grade short essays',
    type: 'boolean',
    default_value: 'false',
    used_in: 68,
    is_active: false,
  },
]

const typeTone = (t: VariableRow['type']) =>
  t === 'number' ? 'info' : t === 'boolean' ? 'violet' : t === 'enum' ? 'amber' : 'teal'

const COLUMNS: Column<VariableRow>[] = [
  {
    header: 'Variable',
    render: (r) => (
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
          style={{ background: 'var(--hm-violet-soft)', color: 'var(--hm-violet-2)' }}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p className="font-medium truncate" style={{ color: 'var(--hm-text)' }}>
            {r.label}
          </p>
          <p className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
            {r.key}
          </p>
        </div>
      </div>
    ),
  },
  { header: 'Type', render: (r) => <Pill tone={typeTone(r.type)}>{r.type}</Pill> },
  { header: 'Default', render: (r) => <Mono>{r.default_value}</Mono> },
  {
    header: 'Used in',
    align: 'right',
    render: (r) => <Mono>{r.used_in.toLocaleString()} quizzes</Mono>,
  },
  {
    header: 'Active',
    render: (r) =>
      r.is_active ? <Pill tone="success">Enabled</Pill> : <Pill tone="neutral">Off</Pill>,
  },
]

type ModalState = { mode: 'create' } | { mode: 'edit'; row: VariableRow } | null

export default function AssessmentVariables() {
  const [modal, setModal] = useState<ModalState>(null)
  const isOpen = modal !== null
  const editing = modal?.mode === 'edit' ? modal.row : null

  return (
    <AdminShell activeId="assessment-variables">
      <AdminTable
        eyebrow="Catalog"
        title="Assessment variables"
        subtitle="Defaults that govern quiz behaviour platform-wide."
        primaryAction={{
          label: 'New variable',
          icon: Plus,
          onClick: () => setModal({ mode: 'create' }),
        }}
        searchPlaceholder="Search variables by key…"
        filters={['Type', 'Status']}
        columns={COLUMNS}
        rows={ROWS}
        totalCount={11}
        onRowAction={(row) => setModal({ mode: 'edit', row })}
      />

      <AdminModal
        open={isOpen}
        onClose={() => setModal(null)}
        mode={modal?.mode ?? 'create'}
        entityLabel="variable"
        entityName={editing?.label}
        subtitle={
          editing
            ? `${editing.key} · used in ${editing.used_in.toLocaleString()} quizzes`
            : 'Define a default that governs quiz behaviour.'
        }
        width={620}
        destructive={editing ? { label: 'Delete variable' } : undefined}
      >
        <FieldGrid cols={2}>
          <Field label="Label" required span={2}>
            <TextInput defaultValue={editing?.label ?? ''} placeholder="Default passing score" />
          </Field>
          <Field label="Key" required hint="Snake_case identifier used in code.">
            <TextInput mono defaultValue={editing?.key ?? ''} placeholder="default_passing_score" />
          </Field>
          <Field label="Type" required>
            <Select
              defaultValue={editing?.type ?? 'number'}
              options={[
                { value: 'number', label: 'Number' },
                { value: 'boolean', label: 'Boolean' },
                { value: 'enum', label: 'Enum' },
                { value: 'duration', label: 'Duration' },
              ]}
            />
          </Field>
          <Field
            label="Default value"
            required
            span={2}
            hint="Stored as a string and parsed by type."
          >
            <TextInput mono defaultValue={editing?.default_value ?? ''} placeholder="70%" />
          </Field>
          <Field label="Description" span={2}>
            <Textarea
              rows={2}
              defaultValue=""
              placeholder="Optional internal note about how this variable is consumed by the platform."
            />
          </Field>
          <Field label="Status">
            <Toggle defaultChecked={editing?.is_active ?? true} label="Enabled" />
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
