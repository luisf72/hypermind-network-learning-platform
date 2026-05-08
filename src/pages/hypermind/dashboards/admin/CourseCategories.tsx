import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, type Column } from '../_shared/AdminTable'
import AdminModal, { Field, FieldGrid, TextInput, Textarea, Toggle } from '../_shared/AdminModal'
import { FolderTree, Plus } from 'lucide-react'

interface CategoryRow {
  id: string
  name: string
  description: string
  courses: number
  is_active: boolean
  created_at: string
}

const ROWS: CategoryRow[] = [
  {
    id: 'ca-01',
    name: 'Learning Science',
    description: 'Cognition, memory, retention frameworks.',
    courses: 1820,
    is_active: true,
    created_at: 'Mar 12, 2024',
  },
  {
    id: 'ca-02',
    name: 'Productivity',
    description: 'Workflows, deep work, time management.',
    courses: 1240,
    is_active: true,
    created_at: 'Mar 12, 2024',
  },
  {
    id: 'ca-03',
    name: 'Memory',
    description: 'Spaced repetition, mnemonics, recall systems.',
    courses: 860,
    is_active: true,
    created_at: 'Apr 02, 2024',
  },
  {
    id: 'ca-04',
    name: 'Communication',
    description: 'Storytelling, writing, public speaking.',
    courses: 720,
    is_active: true,
    created_at: 'Apr 02, 2024',
  },
  {
    id: 'ca-05',
    name: 'Reasoning',
    description: 'Critical thinking, decision making, biases.',
    courses: 540,
    is_active: true,
    created_at: 'May 18, 2024',
  },
  {
    id: 'ca-06',
    name: 'Psychology',
    description: 'Emotional regulation, motivation, identity.',
    courses: 410,
    is_active: true,
    created_at: 'Jun 01, 2024',
  },
  {
    id: 'ca-07',
    name: 'Programming',
    description: 'Languages, paradigms, problem solving.',
    courses: 1980,
    is_active: true,
    created_at: 'Jul 22, 2024',
  },
  {
    id: 'ca-08',
    name: 'Data & ML',
    description: 'Statistics, machine learning, data literacy.',
    courses: 1140,
    is_active: true,
    created_at: 'Aug 10, 2024',
  },
  {
    id: 'ca-09',
    name: 'Design',
    description: 'Visual systems, typography, UX foundations.',
    courses: 630,
    is_active: true,
    created_at: 'Sep 04, 2024',
  },
  {
    id: 'ca-10',
    name: 'Languages',
    description: 'Foreign language acquisition tracks.',
    courses: 920,
    is_active: true,
    created_at: 'Oct 15, 2024',
  },
  {
    id: 'ca-11',
    name: 'Health & Movement',
    description: 'Body literacy, movement, recovery.',
    courses: 340,
    is_active: false,
    created_at: 'Nov 22, 2024',
  },
]

const COLUMNS: Column<CategoryRow>[] = [
  {
    header: 'Name',
    render: (r) => (
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
          style={{ background: 'var(--hm-violet-soft)', color: 'var(--hm-violet-2)' }}
        >
          <FolderTree className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p className="font-medium truncate" style={{ color: 'var(--hm-text)' }}>
            {r.name}
          </p>
          <p className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
            #{r.id}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: 'Description',
    render: (r) => <span style={{ color: 'var(--hm-text-muted)' }}>{r.description}</span>,
  },
  { header: 'Courses', align: 'right', render: (r) => <Mono>{r.courses.toLocaleString()}</Mono> },
  {
    header: 'Active',
    render: (r) =>
      r.is_active ? <Pill tone="success">Active</Pill> : <Pill tone="neutral">Inactive</Pill>,
  },
  { header: 'Created', align: 'right', render: (r) => <Mono>{r.created_at}</Mono> },
]

type ModalState = { mode: 'create' } | { mode: 'edit'; row: CategoryRow } | null

export default function CourseCategories() {
  const [modal, setModal] = useState<ModalState>(null)
  const isOpen = modal !== null
  const editing = modal?.mode === 'edit' ? modal.row : null

  return (
    <AdminShell activeId="course-categories">
      <AdminTable
        eyebrow="Catalog"
        title="Course categories"
        subtitle="Top-level taxonomy for organising the catalog."
        primaryAction={{
          label: 'New category',
          icon: Plus,
          onClick: () => setModal({ mode: 'create' }),
        }}
        searchPlaceholder="Search categories…"
        filters={['Active']}
        columns={COLUMNS}
        rows={ROWS}
        totalCount={42}
        pageInfo={{ current: 1, total: 4 }}
        onRowAction={(row) => setModal({ mode: 'edit', row })}
      />

      <AdminModal
        open={isOpen}
        onClose={() => setModal(null)}
        mode={modal?.mode ?? 'create'}
        entityLabel="category"
        entityName={editing?.name}
        subtitle={
          editing
            ? `#${editing.id} · ${editing.courses.toLocaleString()} courses`
            : 'Add a top-level taxonomy node.'
        }
        destructive={editing ? { label: 'Delete category' } : undefined}
      >
        <FieldGrid cols={2}>
          <Field label="Name" required span={2}>
            <TextInput defaultValue={editing?.name ?? ''} placeholder="e.g. Learning Science" />
          </Field>
          <Field
            label="Description"
            span={2}
            hint="A short blurb shown to learners browsing the catalog."
          >
            <Textarea
              defaultValue={editing?.description ?? ''}
              placeholder="What kinds of courses live here?"
            />
          </Field>
          <Field label="Slug" hint="Used in URLs, lowercase only.">
            <TextInput
              mono
              defaultValue={editing ? editing.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''}
              placeholder="learning-science"
            />
          </Field>
          <Field label="Status">
            <Toggle defaultChecked={editing?.is_active ?? true} label="Visible in catalog" />
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
