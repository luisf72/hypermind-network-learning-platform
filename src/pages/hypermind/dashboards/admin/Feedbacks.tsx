import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, UserCell, type Column } from '../_shared/AdminTable'
import AdminModal, { Field, FieldGrid, Select } from '../_shared/AdminModal'
import { Download } from 'lucide-react'

type FeedbackStatus = 'new' | 'in_review' | 'responded' | 'closed'

interface FeedbackRow {
  id: string
  user_name: string
  user_email: string
  user_initials: string
  type: 'bug' | 'idea' | 'praise' | 'complaint' | 'question'
  subject: string
  status: FeedbackStatus
  created_at: string
}

const ROWS: FeedbackRow[] = [
  {
    id: 'fb-001',
    user_name: 'Sarah Lin',
    user_email: 'sarah.lin@studio.com',
    user_initials: 'SL',
    type: 'idea',
    subject: 'Could quizzes show a confidence slider before submit?',
    status: 'new',
    created_at: '2h ago',
  },
  {
    id: 'fb-002',
    user_name: 'David Park',
    user_email: 'd.park@labs.io',
    user_initials: 'DP',
    type: 'bug',
    subject: 'Video lesson freezes around 04:12 on Cognitive Load.',
    status: 'in_review',
    created_at: '5h ago',
  },
  {
    id: 'fb-003',
    user_name: 'Marie Dubois',
    user_email: 'marie@duboi.studio',
    user_initials: 'MD',
    type: 'praise',
    subject: 'The new evaluator dashboard is a huge improvement.',
    status: 'responded',
    created_at: '1d ago',
  },
  {
    id: 'fb-004',
    user_name: 'Aiko Tanaka',
    user_email: 'aiko@tnk.co',
    user_initials: 'AT',
    type: 'complaint',
    subject: 'Account suspension was unclear about the reason.',
    status: 'responded',
    created_at: '1d ago',
  },
  {
    id: 'fb-005',
    user_name: 'Carlos Mendoza',
    user_email: 'carlos.m@hypermind.io',
    user_initials: 'CM',
    type: 'question',
    subject: 'How do I bulk-import questions into a new assessment?',
    status: 'responded',
    created_at: '2d ago',
  },
  {
    id: 'fb-006',
    user_name: 'Priya Sharma',
    user_email: 'priya@sharma.io',
    user_initials: 'PS',
    type: 'idea',
    subject: 'A weekly digest email summarising my XP would be great.',
    status: 'new',
    created_at: '2d ago',
  },
  {
    id: 'fb-007',
    user_name: 'Lukas Becker',
    user_email: 'lukas@beckerlab.de',
    user_initials: 'LB',
    type: 'bug',
    subject: 'Markdown rendering broken in long-form lesson texts.',
    status: 'in_review',
    created_at: '3d ago',
  },
  {
    id: 'fb-008',
    user_name: 'Marcus Reed',
    user_email: 'm.reed@hypermind.io',
    user_initials: 'MR',
    type: 'praise',
    subject: 'Spaced repetition course content is exceptional.',
    status: 'closed',
    created_at: '4d ago',
  },
  {
    id: 'fb-009',
    user_name: 'Sophia Chen',
    user_email: 'sophia@chen.dev',
    user_initials: 'SC',
    type: 'question',
    subject: 'Is there an API for extracting my activity log?',
    status: 'new',
    created_at: '4d ago',
  },
  {
    id: 'fb-010',
    user_name: 'Omar Haddad',
    user_email: 'omar@haddad.studio',
    user_initials: 'OH',
    type: 'complaint',
    subject: 'Email notifications arriving with significant delay.',
    status: 'in_review',
    created_at: '5d ago',
  },
]

const STATUS_OPTIONS: { value: FeedbackStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'in_review', label: 'In review' },
  { value: 'responded', label: 'Responded' },
  { value: 'closed', label: 'Closed' },
]

const typeTone = (t: FeedbackRow['type']) =>
  t === 'bug'
    ? 'danger'
    : t === 'idea'
      ? 'violet'
      : t === 'praise'
        ? 'success'
        : t === 'complaint'
          ? 'warning'
          : 'info'

const statusTone = (s: FeedbackStatus) =>
  s === 'new' ? 'danger' : s === 'in_review' ? 'warning' : s === 'responded' ? 'info' : 'neutral'

const COLUMNS: Column<FeedbackRow>[] = [
  {
    header: 'User',
    render: (r) => <UserCell name={r.user_name} email={r.user_email} initials={r.user_initials} />,
  },
  {
    header: 'Type',
    render: (r) => <Pill tone={typeTone(r.type)}>{r.type}</Pill>,
  },
  {
    header: 'Subject',
    render: (r) => (
      <span
        className="truncate block max-w-[400px]"
        style={{ color: 'var(--hm-text)' }}
        title={r.subject}
      >
        {r.subject}
      </span>
    ),
  },
  {
    header: 'Status',
    render: (r) => <Pill tone={statusTone(r.status)}>{r.status.replace('_', ' ')}</Pill>,
  },
  {
    header: 'Created',
    align: 'right',
    render: (r) => <Mono>{r.created_at}</Mono>,
  },
]

export default function Feedbacks() {
  const [modal, setModal] = useState<FeedbackRow | null>(null)

  return (
    <AdminShell activeId="feedbacks">
      <AdminTable
        eyebrow="Engagement"
        title="Feedbacks"
        subtitle="Bug reports, ideas, complaints and praise from learners."
        primaryAction={{ label: 'Export CSV', icon: Download }}
        searchPlaceholder="Search feedbacks…"
        columns={COLUMNS}
        rows={ROWS}
        totalCount={847}
        pageInfo={{ current: 1, total: 22 }}
        onRowAction={(row) => setModal(row)}
      />

      {/* Status-only modal */}
      <AdminModal
        open={modal !== null}
        onClose={() => setModal(null)}
        mode="edit"
        entityLabel="feedback"
        entityName={modal?.subject}
        subtitle={
          modal ? `#${modal.id} · ${modal.type} · submitted ${modal.created_at}` : undefined
        }
        width={420}
        submitLabel="Update status"
      >
        {modal && (
          <FieldGrid cols={1}>
            <Field label="Status" required hint="Updating the status notifies the submitter.">
              <Select defaultValue={modal.status} options={STATUS_OPTIONS} />
            </Field>
          </FieldGrid>
        )}
      </AdminModal>
    </AdminShell>
  )
}
