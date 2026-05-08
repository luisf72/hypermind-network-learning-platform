import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, type Column } from '../_shared/AdminTable'
import AdminModal, { Field, FieldGrid, Select } from '../_shared/AdminModal'
import { Lock, Plus } from 'lucide-react'

interface RolePermRow {
  id: string
  role: 'Admin' | 'Creator' | 'Evaluator' | 'Student'
  permission: string
  resource: string
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'publish'
  created_at: string
}

const ROLE_TONE: Record<RolePermRow['role'], { color: string; bg: string }> = {
  Admin: { color: '#F4636E', bg: 'rgba(244,99,110,0.12)' },
  Creator: { color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
  Evaluator: { color: '#F4B26C', bg: 'rgba(244,178,108,0.12)' },
  Student: { color: '#7BC8C5', bg: 'rgba(123,200,197,0.12)' },
}

const actionTone = (a: RolePermRow['action']) =>
  a === 'create'
    ? 'success'
    : a === 'read'
      ? 'info'
      : a === 'update'
        ? 'amber'
        : a === 'delete'
          ? 'danger'
          : a === 'approve'
            ? 'violet'
            : 'teal'

const ROWS: RolePermRow[] = [
  {
    id: 'rp-001',
    role: 'Admin',
    permission: 'create_course',
    resource: 'course',
    action: 'create',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-002',
    role: 'Admin',
    permission: 'publish_course',
    resource: 'course',
    action: 'publish',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-003',
    role: 'Admin',
    permission: 'delete_course',
    resource: 'course',
    action: 'delete',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-004',
    role: 'Admin',
    permission: 'manage_user',
    resource: 'user',
    action: 'update',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-005',
    role: 'Admin',
    permission: 'suspend_user',
    resource: 'user',
    action: 'update',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-006',
    role: 'Admin',
    permission: 'manage_subscription',
    resource: 'subscription',
    action: 'update',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-007',
    role: 'Admin',
    permission: 'view_transactions',
    resource: 'transaction',
    action: 'read',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-008',
    role: 'Admin',
    permission: 'view_activity_log',
    resource: 'activity_log',
    action: 'read',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-009',
    role: 'Creator',
    permission: 'create_course',
    resource: 'course',
    action: 'create',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-010',
    role: 'Creator',
    permission: 'publish_course',
    resource: 'course',
    action: 'publish',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-011',
    role: 'Creator',
    permission: 'manage_sessions',
    resource: 'session',
    action: 'update',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-012',
    role: 'Evaluator',
    permission: 'read_assessment',
    resource: 'assessment',
    action: 'read',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-013',
    role: 'Evaluator',
    permission: 'approve_assessment',
    resource: 'assessment',
    action: 'approve',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-014',
    role: 'Student',
    permission: 'read_assessment',
    resource: 'assessment',
    action: 'read',
    created_at: 'Jan 04, 2024',
  },
  {
    id: 'rp-015',
    role: 'Student',
    permission: 'view_transactions',
    resource: 'transaction',
    action: 'read',
    created_at: 'Mar 10, 2024',
  },
]

const COLUMNS: Column<RolePermRow>[] = [
  {
    header: 'Role',
    render: (r) => {
      const t = ROLE_TONE[r.role]
      return (
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
            style={{ background: t.bg, color: t.color }}
          >
            <Lock className="h-3.5 w-3.5" />
          </span>
          <span className="font-medium text-[12.5px]" style={{ color: 'var(--hm-text)' }}>
            {r.role}
          </span>
        </div>
      )
    },
  },
  {
    header: 'Permission',
    render: (r) => <Mono>{r.permission}</Mono>,
  },
  {
    header: 'Resource',
    render: (r) => (
      <span className="text-[12.5px]" style={{ color: 'var(--hm-text-muted)' }}>
        {r.resource}
      </span>
    ),
  },
  {
    header: 'Action',
    render: (r) => <Pill tone={actionTone(r.action)}>{r.action}</Pill>,
  },
  {
    header: 'Created',
    align: 'right',
    render: (r) => <Mono>{r.created_at}</Mono>,
  },
]

const ROLE_OPTIONS = (['Admin', 'Creator', 'Evaluator', 'Student'] as const).map((v) => ({
  value: v,
  label: v,
}))

const PERMISSION_OPTIONS = [
  'create_course',
  'publish_course',
  'delete_course',
  'read_assessment',
  'approve_assessment',
  'manage_user',
  'suspend_user',
  'delete_user',
  'manage_subscription',
  'view_transactions',
  'manage_sessions',
  'moderate_post',
  'manage_faq',
  'view_activity_log',
  'export_data',
  'issue_refund',
].map((v) => ({ value: v, label: v }))

type ModalState = { mode: 'create' } | { mode: 'edit'; row: RolePermRow } | null

export default function RolePermission() {
  const [modal, setModal] = useState<ModalState>(null)
  const editing = modal?.mode === 'edit' ? modal.row : null

  return (
    <AdminShell activeId="role-permission">
      <AdminTable
        eyebrow="People & access"
        title="Role permissions"
        subtitle="Mapping between roles and the permissions they grant."
        primaryAction={{
          label: 'Grant permission',
          icon: Plus,
          onClick: () => setModal({ mode: 'create' }),
        }}
        searchPlaceholder="Search by role or permission…"
        columns={COLUMNS}
        rows={ROWS}
        totalCount={326}
        pageInfo={{ current: 1, total: 22 }}
        onRowAction={(row) => setModal({ mode: 'edit', row })}
      />

      <AdminModal
        open={modal !== null}
        onClose={() => setModal(null)}
        mode={modal?.mode ?? 'create'}
        entityLabel="grant"
        entityName={editing ? `${editing.role} → ${editing.permission}` : undefined}
        subtitle={
          editing
            ? `Created ${editing.created_at}`
            : 'Grant a permission to a role. Takes effect immediately for all assigned users.'
        }
        width={480}
        submitLabel={modal?.mode === 'create' ? 'Grant permission' : 'Save changes'}
        destructive={editing ? { label: 'Revoke grant' } : undefined}
      >
        <FieldGrid cols={1}>
          <Field label="Role" required>
            <Select defaultValue={editing?.role ?? 'Creator'} options={ROLE_OPTIONS} />
          </Field>
          <Field label="Permission" required>
            <Select
              defaultValue={editing?.permission ?? 'create_course'}
              options={PERMISSION_OPTIONS}
            />
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
