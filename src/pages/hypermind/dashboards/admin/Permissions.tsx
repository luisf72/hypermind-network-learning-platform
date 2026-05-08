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
import { Key, Plus } from 'lucide-react'

interface PermissionRow {
  id: string
  name: string
  resource: string
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'publish'
  description: string
  is_active: boolean
}

const ROWS: PermissionRow[] = [
  {
    id: 'p-001',
    name: 'create_course',
    resource: 'course',
    action: 'create',
    description: 'Create a new course in the catalog.',
    is_active: true,
  },
  {
    id: 'p-002',
    name: 'publish_course',
    resource: 'course',
    action: 'publish',
    description: 'Publish a course to the public catalog.',
    is_active: true,
  },
  {
    id: 'p-003',
    name: 'delete_course',
    resource: 'course',
    action: 'delete',
    description: 'Permanently remove a course and all its lessons.',
    is_active: true,
  },
  {
    id: 'p-004',
    name: 'read_assessment',
    resource: 'assessment',
    action: 'read',
    description: 'View any assessment and its learner responses.',
    is_active: true,
  },
  {
    id: 'p-005',
    name: 'approve_assessment',
    resource: 'assessment',
    action: 'approve',
    description: 'Approve an assessment for use in production.',
    is_active: true,
  },
  {
    id: 'p-006',
    name: 'manage_user',
    resource: 'user',
    action: 'update',
    description: 'Edit any user account — profile, status, roles.',
    is_active: true,
  },
  {
    id: 'p-007',
    name: 'suspend_user',
    resource: 'user',
    action: 'update',
    description: 'Suspend or reactivate a user account.',
    is_active: true,
  },
  {
    id: 'p-008',
    name: 'manage_subscription',
    resource: 'subscription',
    action: 'update',
    description: 'Update, cancel or refund any subscription.',
    is_active: true,
  },
  {
    id: 'p-009',
    name: 'view_transactions',
    resource: 'transaction',
    action: 'read',
    description: 'View platform revenue and transaction records.',
    is_active: true,
  },
  {
    id: 'p-010',
    name: 'moderate_post',
    resource: 'post',
    action: 'update',
    description: 'Hide, delete or restore community posts.',
    is_active: true,
  },
  {
    id: 'p-011',
    name: 'manage_faq',
    resource: 'faq',
    action: 'update',
    description: 'Create, edit and reorder FAQ entries.',
    is_active: true,
  },
  {
    id: 'p-012',
    name: 'view_activity_log',
    resource: 'activity_log',
    action: 'read',
    description: 'Read the platform-wide activity and audit log.',
    is_active: true,
  },
  {
    id: 'p-013',
    name: 'issue_refund',
    resource: 'transaction',
    action: 'create',
    description: 'Issue a full or partial refund on any order.',
    is_active: false,
  },
  {
    id: 'p-014',
    name: 'delete_user',
    resource: 'user',
    action: 'delete',
    description: 'Permanently delete a user account and all its data.',
    is_active: false,
  },
  {
    id: 'p-015',
    name: 'export_data',
    resource: 'analytics',
    action: 'read',
    description: 'Export raw analytics and user data to CSV or JSON.',
    is_active: true,
  },
  {
    id: 'p-016',
    name: 'manage_sessions',
    resource: 'session',
    action: 'update',
    description: 'Create, edit and cancel live learning sessions.',
    is_active: true,
  },
]

const ACTION_OPTIONS = [
  { value: 'create', label: 'Create' },
  { value: 'read', label: 'Read' },
  { value: 'update', label: 'Update' },
  { value: 'delete', label: 'Delete' },
  { value: 'approve', label: 'Approve' },
  { value: 'publish', label: 'Publish' },
]

const COLUMNS: Column<PermissionRow>[] = [
  {
    header: 'Permission',
    render: (r) => (
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
          style={{ background: 'var(--hm-violet-soft)', color: 'var(--hm-violet-2)' }}
        >
          <Key className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p
            className="hm-mono text-[12px] font-medium truncate"
            style={{ color: 'var(--hm-text)' }}
          >
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
    header: 'Resource',
    render: (r) => <Mono>{r.resource}</Mono>,
  },
  {
    header: 'Active',
    render: (r) =>
      r.is_active ? <Pill tone="success">Active</Pill> : <Pill tone="neutral">Inactive</Pill>,
  },
  {
    header: 'Description',
    render: (r) => (
      <span className="text-[12.5px]" style={{ color: 'var(--hm-text-muted)' }}>
        {r.description}
      </span>
    ),
  },
]

type ModalState = { mode: 'create' } | { mode: 'edit'; row: PermissionRow } | null

export default function Permissions() {
  const [modal, setModal] = useState<ModalState>(null)
  const isOpen = modal !== null
  const editing = modal?.mode === 'edit' ? modal.row : null

  return (
    <AdminShell activeId="permissions">
      <AdminTable
        eyebrow="People & access"
        title="Permissions"
        subtitle="Atomic capabilities scoped to a resource — assign them to roles from the Roles screen."
        primaryAction={{
          label: 'New permission',
          icon: Plus,
          onClick: () => setModal({ mode: 'create' }),
        }}
        searchPlaceholder="Search by name or resource…"
        columns={COLUMNS}
        rows={ROWS}
        totalCount={124}
        pageInfo={{ current: 1, total: 8 }}
        onRowAction={(row) => setModal({ mode: 'edit', row })}
      />

      <AdminModal
        open={isOpen}
        onClose={() => setModal(null)}
        mode={modal?.mode ?? 'create'}
        entityLabel="permission"
        entityName={editing?.name}
        subtitle={
          editing
            ? `#${editing.id} · ${editing.resource} · ${editing.action}`
            : 'Define an atomic capability scoped to a resource.'
        }
        width={580}
        destructive={editing ? { label: 'Delete permission' } : undefined}
      >
        <FieldGrid cols={2}>
          <Field label="Key" required hint="Snake_case — typically {action}_{resource}." span={2}>
            <TextInput mono defaultValue={editing?.name ?? ''} placeholder="publish_course" />
          </Field>
          <Field label="Resource" required>
            <TextInput mono defaultValue={editing?.resource ?? ''} placeholder="course" />
          </Field>
          <Field label="Action" required>
            <Select defaultValue={editing?.action ?? 'read'} options={ACTION_OPTIONS} />
          </Field>
          <Field label="Description" span={2}>
            <Textarea
              defaultValue={editing?.description ?? ''}
              placeholder="What this permission allows the holder to do."
            />
          </Field>
          <Field label="Active" span={2}>
            <Toggle
              defaultChecked={editing?.is_active ?? true}
              label="Permission is active and can be assigned to roles"
            />
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
