import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Mono, type Column } from '../_shared/AdminTable'
import AdminModal, { Field, FieldGrid, TextInput, Textarea } from '../_shared/AdminModal'
import { Video, Plus } from 'lucide-react'

interface SessionTypeRow {
  id: string
  name: string
  description: string
  default_duration: string
  sessions: number
  created_at: string
  updated_at: string
}

const ROWS: SessionTypeRow[] = [
  {
    id: 'st-01',
    name: 'Lecture',
    description: 'One-to-many instructor-led broadcast.',
    default_duration: '60m',
    sessions: 1248,
    created_at: 'Jan 04, 2025',
    updated_at: 'Mar 20, 2025',
  },
  {
    id: 'st-02',
    name: 'Webinar',
    description: 'Hybrid live event with Q&A and registration gating.',
    default_duration: '90m',
    sessions: 642,
    created_at: 'Jan 04, 2025',
    updated_at: 'Apr 02, 2025',
  },
  {
    id: 'st-03',
    name: 'Discussion',
    description: 'Small-group facilitated discussion circle.',
    default_duration: '45m',
    sessions: 928,
    created_at: 'Jan 04, 2025',
    updated_at: 'Jan 04, 2025',
  },
  {
    id: 'st-04',
    name: 'Office hours',
    description: 'Drop-in synchronous help session.',
    default_duration: '30m',
    sessions: 514,
    created_at: 'Feb 12, 2025',
    updated_at: 'Feb 12, 2025',
  },
  {
    id: 'st-05',
    name: 'Workshop',
    description: 'Hands-on guided practice with breakout rooms.',
    default_duration: '120m',
    sessions: 236,
    created_at: 'Feb 28, 2025',
    updated_at: 'Apr 18, 2025',
  },
  {
    id: 'st-06',
    name: 'Cohort sync',
    description: 'Recurring sync for active learning cohorts.',
    default_duration: '60m',
    sessions: 392,
    created_at: 'Mar 14, 2025',
    updated_at: 'Mar 30, 2025',
  },
  {
    id: 'st-07',
    name: '1:1 coaching',
    description: 'Private mentor-led learner coaching session.',
    default_duration: '45m',
    sessions: 1820,
    created_at: 'Mar 14, 2025',
    updated_at: 'Apr 22, 2025',
  },
]

const COLUMNS: Column<SessionTypeRow>[] = [
  {
    header: 'Name',
    render: (r) => (
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
          style={{ background: 'var(--hm-violet-soft)', color: 'var(--hm-violet-2)' }}
        >
          <Video className="h-3.5 w-3.5" />
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
  {
    header: 'Default time',
    align: 'right',
    render: (r) => <Mono>{r.default_duration}</Mono>,
  },
  {
    header: 'Sessions',
    align: 'right',
    render: (r) => <Mono>{r.sessions.toLocaleString()}</Mono>,
  },
  {
    header: 'Created',
    align: 'right',
    render: (r) => <Mono>{r.created_at}</Mono>,
  },
  {
    header: 'Updated',
    align: 'right',
    render: (r) => <Mono>{r.updated_at}</Mono>,
  },
]

type ModalState = { mode: 'create' } | { mode: 'edit'; row: SessionTypeRow } | null

export default function SessionTypes() {
  const [modal, setModal] = useState<ModalState>(null)
  const isOpen = modal !== null
  const editing = modal?.mode === 'edit' ? modal.row : null

  return (
    <AdminShell activeId="session-types">
      <AdminTable
        eyebrow="Catalog"
        title="Session types"
        subtitle="Templates that shape live learning sessions."
        primaryAction={{
          label: 'New session type',
          icon: Plus,
          onClick: () => setModal({ mode: 'create' }),
        }}
        searchPlaceholder="Search session types…"
        columns={COLUMNS}
        rows={ROWS}
        totalCount={7}
        onRowAction={(row) => setModal({ mode: 'edit', row })}
      />

      <AdminModal
        open={isOpen}
        onClose={() => setModal(null)}
        mode={modal?.mode ?? 'create'}
        entityLabel="session type"
        entityName={editing?.name}
        subtitle={
          editing
            ? `#${editing.id} · ${editing.sessions.toLocaleString()} sessions`
            : 'Define a template for live learning sessions.'
        }
        width={600}
        destructive={editing ? { label: 'Delete type' } : undefined}
      >
        <FieldGrid cols={2}>
          <Field label="Name" required>
            <TextInput defaultValue={editing?.name ?? ''} placeholder="e.g. Workshop" />
          </Field>
          <Field label="Default time" required hint="e.g. 30m, 60m, 120m">
            <TextInput mono defaultValue={editing?.default_duration ?? ''} placeholder="60m" />
          </Field>
          <Field label="Number of sessions" hint="Read-only — updated automatically.">
            <TextInput
              mono
              defaultValue={editing ? String(editing.sessions) : '0'}
              placeholder="0"
              disabled
            />
          </Field>
          <Field label="Description" span={2}>
            <Textarea
              defaultValue={editing?.description ?? ''}
              placeholder="What learners should expect from this session type."
            />
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
