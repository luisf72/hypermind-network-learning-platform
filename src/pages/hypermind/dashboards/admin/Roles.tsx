import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, type Column } from '../_shared/AdminTable'
import AdminModal, { Field, FieldGrid, TextInput, Textarea } from '../_shared/AdminModal'
import { ShieldCheck, GraduationCap, Sparkles, Award, ShieldAlert } from 'lucide-react'

interface RoleRow {
  id: string
  name: 'Admin' | 'Creator' | 'Evaluator' | 'Student'
  description: string
  permissions: number
  users: number
  created_at: string
}

const ROLE_META: Record<RoleRow['name'], { Icon: any; color: string; bg: string }> = {
  Admin: { Icon: ShieldAlert, color: '#F4636E', bg: 'rgba(244,99,110,0.12)' },
  Creator: { Icon: Sparkles, color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
  Evaluator: { Icon: Award, color: '#F4B26C', bg: 'rgba(244,178,108,0.12)' },
  Student: { Icon: GraduationCap, color: '#7BC8C5', bg: 'rgba(123,200,197,0.12)' },
}

const ROWS: RoleRow[] = [
  {
    id: 'r-01',
    name: 'Admin',
    description:
      'Full platform access — user management, billing, catalog, settings and infrastructure controls.',
    permissions: 124,
    users: 8,
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'r-02',
    name: 'Creator',
    description:
      'Designs and publishes courses, modules, lessons and live sessions for enrolled learners.',
    permissions: 42,
    users: 1820,
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'r-03',
    name: 'Evaluator',
    description:
      'Reviews learner submissions, calibrates scoring rubrics and manages assessment quality.',
    permissions: 28,
    users: 342,
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'r-04',
    name: 'Student',
    description:
      'Default learner role granted on signup — enroll in courses, take assessments, earn rewards.',
    permissions: 18,
    users: 26297,
    created_at: 'Jan 04, 2024',
  },
]

const COLUMNS: Column<RoleRow>[] = [
  {
    header: 'Role',
    render: (r) => {
      const m = ROLE_META[r.name]
      return (
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
            style={{ background: m.bg, color: m.color }}
          >
            <m.Icon className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-[13px] truncate" style={{ color: 'var(--hm-text)' }}>
              {r.name}
            </p>
            <p className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
              #{r.id} · system
            </p>
          </div>
        </div>
      )
    },
  },
  {
    header: 'Description',
    render: (r) => (
      <span className="text-[12.5px]" style={{ color: 'var(--hm-text-muted)' }}>
        {r.description}
      </span>
    ),
  },
  {
    header: 'Permissions',
    align: 'right',
    render: (r) => (
      <div className="inline-flex items-center gap-1.5">
        <ShieldCheck className="h-3 w-3" style={{ color: 'var(--hm-text-dim)' }} />
        <Mono>{r.permissions}</Mono>
      </div>
    ),
  },
  {
    header: 'Users',
    align: 'right',
    render: (r) => <Mono>{r.users.toLocaleString()}</Mono>,
  },
  {
    header: 'Created',
    align: 'right',
    render: (r) => <Mono>{r.created_at}</Mono>,
  },
]

type ModalState = { mode: 'edit'; row: RoleRow } | null

export default function Roles() {
  const [modal, setModal] = useState<ModalState>(null)
  const editing = modal?.mode === 'edit' ? modal.row : null

  return (
    <AdminShell activeId="roles">
      <AdminTable
        eyebrow="People & access"
        title="Roles"
        subtitle="The four built-in system roles — each bundles a fixed set of permissions."
        searchPlaceholder="Search roles…"
        columns={COLUMNS}
        rows={ROWS}
        totalCount={4}
        onRowAction={(row) => setModal({ mode: 'edit', row })}
      />

      <AdminModal
        open={modal !== null}
        onClose={() => setModal(null)}
        mode="edit"
        entityLabel="role"
        entityName={editing?.name}
        subtitle={
          editing
            ? `${editing.permissions} permissions · ${editing.users.toLocaleString()} users · system role`
            : undefined
        }
        width={560}
      >
        {editing && (
          <FieldGrid cols={1}>
            <Field label="Role name" hint="System role names cannot be changed.">
              <TextInput defaultValue={editing.name} disabled />
            </Field>
            <Field label="Description">
              <Textarea rows={3} defaultValue={editing.description} />
            </Field>
            <Field
              label="Permissions"
              hint="Manage individual permission toggles from the Permissions screen."
            >
              <div
                className="flex items-center gap-2.5 px-3 h-9 rounded-lg"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                }}
              >
                <ShieldCheck
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: 'var(--hm-text-dim)' }}
                />
                <span className="hm-mono text-[12.5px]" style={{ color: 'var(--hm-text-muted)' }}>
                  {editing.permissions} permissions assigned
                </span>
                <Pill tone="violet" dot={false}>
                  read-only
                </Pill>
              </div>
            </Field>
          </FieldGrid>
        )}
      </AdminModal>
    </AdminShell>
  )
}
