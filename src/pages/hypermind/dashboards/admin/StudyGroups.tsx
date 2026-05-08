import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, UserCell, type Column } from '../_shared/AdminTable'
import AdminModal, {
  Field,
  FieldGrid,
  TextInput,
  Textarea,
  Select,
  Toggle,
} from '../_shared/AdminModal'
import { UsersRound, Plus, Globe, Lock as LockIcon } from 'lucide-react'

interface StudyGroupRow {
  id: string
  name: string
  description: string
  type: 'public' | 'private'
  members_count: number
  posts_count: number
  owner_name: string
  owner_email: string
  owner_initials: string
  is_active: boolean
  created_at: string
}

const ROWS: StudyGroupRow[] = [
  {
    id: 'g-001',
    name: 'Cognitive Science Lab',
    description: 'Discussion of working memory, attention and metacognition research.',
    type: 'public',
    members_count: 1284,
    posts_count: 312,
    owner_name: 'Sarah Lin',
    owner_email: 'sarah.lin@studio.com',
    owner_initials: 'SL',
    is_active: true,
    created_at: 'Jan 12, 2026',
  },
  {
    id: 'g-002',
    name: 'Spanish Conversation Circle',
    description: 'Weekly themed conversation prompts and pronunciation practice.',
    type: 'public',
    members_count: 872,
    posts_count: 198,
    owner_name: 'Marie Dubois',
    owner_email: 'marie@duboi.studio',
    owner_initials: 'MD',
    is_active: true,
    created_at: 'Jan 28, 2026',
  },
  {
    id: 'g-003',
    name: 'Beginner Photographers',
    description: 'Critique threads, gear questions and weekly shooting challenges.',
    type: 'public',
    members_count: 654,
    posts_count: 244,
    owner_name: 'Aiko Tanaka',
    owner_email: 'aiko@tnk.co',
    owner_initials: 'AT',
    is_active: true,
    created_at: 'Feb 02, 2026',
  },
  {
    id: 'g-004',
    name: 'DSA Interview Prep',
    description: 'LeetCode-style daily problems with whiteboard discussion threads.',
    type: 'private',
    members_count: 421,
    posts_count: 167,
    owner_name: 'David Park',
    owner_email: 'd.park@labs.io',
    owner_initials: 'DP',
    is_active: true,
    created_at: 'Feb 10, 2026',
  },
  {
    id: 'g-005',
    name: 'Indie Songwriters',
    description: 'Share works-in-progress, lyrics critique and arrangement tips.',
    type: 'public',
    members_count: 338,
    posts_count: 89,
    owner_name: 'Lukas Becker',
    owner_email: 'lukas@beckerlab.de',
    owner_initials: 'LB',
    is_active: true,
    created_at: 'Feb 18, 2026',
  },
  {
    id: 'g-006',
    name: 'Personal Finance 101',
    description: 'Budgeting, index investing and tax basics for early-career learners.',
    type: 'public',
    members_count: 712,
    posts_count: 134,
    owner_name: 'Carlos Mendoza',
    owner_email: 'carlos.m@hypermind.io',
    owner_initials: 'CM',
    is_active: true,
    created_at: 'Feb 24, 2026',
  },
  {
    id: 'g-007',
    name: 'Mindful Productivity',
    description: 'Habit stacking, focus blocks and deep-work experiments.',
    type: 'public',
    members_count: 489,
    posts_count: 102,
    owner_name: 'Priya Sharma',
    owner_email: 'priya@sharma.io',
    owner_initials: 'PS',
    is_active: true,
    created_at: 'Mar 04, 2026',
  },
  {
    id: 'g-008',
    name: 'Korean N3 Study Group',
    description: 'JLPT-N3 vocabulary drills, kanji review and weekly mock tests.',
    type: 'private',
    members_count: 187,
    posts_count: 76,
    owner_name: 'Sophia Chen',
    owner_email: 'sophia@chen.dev',
    owner_initials: 'SC',
    is_active: true,
    created_at: 'Mar 10, 2026',
  },
  {
    id: 'g-009',
    name: 'Web3 & Smart Contracts',
    description: 'Solidity walkthroughs, security audits and tooling discussions.',
    type: 'private',
    members_count: 264,
    posts_count: 58,
    owner_name: 'Omar Haddad',
    owner_email: 'omar@haddad.studio',
    owner_initials: 'OH',
    is_active: false,
    created_at: 'Mar 18, 2026',
  },
  {
    id: 'g-010',
    name: 'Watercolour Sundays',
    description: 'Sunday painting prompts, supply reviews and gentle critique.',
    type: 'public',
    members_count: 301,
    posts_count: 91,
    owner_name: 'Marcus Reed',
    owner_email: 'm.reed@hypermind.io',
    owner_initials: 'MR',
    is_active: true,
    created_at: 'Mar 26, 2026',
  },
]

const COLUMNS: Column<StudyGroupRow>[] = [
  {
    header: 'Group',
    render: (r) => (
      <div className="flex items-center gap-2.5 min-w-0" style={{ minWidth: 280 }}>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
          style={{ background: 'var(--hm-violet-soft)', color: 'var(--hm-violet-2)' }}
        >
          <UsersRound className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="font-medium truncate" style={{ color: 'var(--hm-text)' }}>
            {r.name}
          </p>
          <p className="text-[11px] truncate" style={{ color: 'var(--hm-text-dim)' }}>
            {r.description}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: 'Type',
    render: (r) => (
      <Pill tone={r.type === 'public' ? 'info' : 'warning'}>
        <span className="inline-flex items-center gap-1">
          {r.type === 'public' ? <Globe className="h-3 w-3" /> : <LockIcon className="h-3 w-3" />}
          {r.type}
        </span>
      </Pill>
    ),
  },
  {
    header: 'Members',
    align: 'right',
    render: (r) => <Mono>{r.members_count.toLocaleString()}</Mono>,
  },
  { header: 'Posts', align: 'right', render: (r) => <Mono>{r.posts_count.toLocaleString()}</Mono> },
  {
    header: 'Owner',
    render: (r) => (
      <UserCell name={r.owner_name} email={r.owner_email} initials={r.owner_initials} />
    ),
  },
  {
    header: 'Status',
    render: (r) =>
      r.is_active ? <Pill tone="success">Active</Pill> : <Pill tone="neutral">Archived</Pill>,
  },
  { header: 'Created', align: 'right', render: (r) => <Mono>{r.created_at}</Mono> },
]

type ModalState = { mode: 'create' } | { mode: 'edit'; row: StudyGroupRow } | null

const TYPE_OPTIONS = [
  { value: 'public', label: 'Public — anyone can join' },
  { value: 'private', label: 'Private — invite or approval required' },
]

const OWNER_OPTIONS = [
  { value: 'u-001', label: 'Sarah Lin · sarah.lin@studio.com' },
  { value: 'u-002', label: 'Marie Dubois · marie@duboi.studio' },
  { value: 'u-003', label: 'Aiko Tanaka · aiko@tnk.co' },
  { value: 'u-004', label: 'David Park · d.park@labs.io' },
  { value: 'u-005', label: 'Lukas Becker · lukas@beckerlab.de' },
]

export default function StudyGroups() {
  const [modal, setModal] = useState<ModalState>(null)
  const isOpen = modal !== null
  const editing = modal?.mode === 'edit' ? modal.row : null

  return (
    <AdminShell activeId="study-groups">
      <AdminTable
        eyebrow="Community"
        title="Study groups"
        subtitle="Learner-led communities organised around topics, languages and shared goals."
        primaryAction={{
          label: 'New group',
          icon: Plus,
          onClick: () => setModal({ mode: 'create' }),
        }}
        searchPlaceholder="Search groups by name, owner or description…"
        filters={['Type', 'Status', 'Created']}
        columns={COLUMNS}
        rows={ROWS}
        totalCount={142}
        pageInfo={{ current: 1, total: 12 }}
        onRowAction={(row) => setModal({ mode: 'edit', row })}
      />

      <AdminModal
        open={isOpen}
        onClose={() => setModal(null)}
        mode={modal?.mode ?? 'create'}
        entityLabel="study group"
        entityName={editing?.name}
        subtitle={
          editing
            ? `#${editing.id} · ${editing.members_count.toLocaleString()} members · ${editing.posts_count} posts · created ${editing.created_at}`
            : 'Create a community for learners to discuss a topic, language or shared goal.'
        }
        width={680}
        destructive={editing ? { label: 'Archive group' } : undefined}
      >
        <FieldGrid cols={2}>
          <Field label="Group name" required span={2}>
            <TextInput
              defaultValue={editing?.name ?? ''}
              placeholder="e.g. Cognitive Science Lab"
            />
          </Field>
          <Field
            label="Description"
            required
            span={2}
            hint="Shown on the group landing page (≤ 240 chars)."
          >
            <Textarea
              rows={3}
              defaultValue={editing?.description ?? ''}
              placeholder="One short sentence describing what learners can expect from this group."
            />
          </Field>
          <Field label="Visibility" required>
            <Select defaultValue={editing?.type ?? 'public'} options={TYPE_OPTIONS} />
          </Field>
          <Field label="Owner" required>
            <Select defaultValue="u-001" options={OWNER_OPTIONS} />
          </Field>
          <Field
            label="Cover image URL"
            hint="Optional banner image for the group header."
            span={2}
          >
            <TextInput
              mono
              defaultValue=""
              placeholder="https://cdn.hypermind.io/groups/your-image.jpg"
            />
          </Field>
          <Field label="Settings" span={2}>
            <div className="flex flex-col gap-2">
              <Toggle defaultChecked label="Active — visible in community directory" />
              <Toggle defaultChecked={false} label="Require admin approval for new posts" />
              <Toggle defaultChecked label="Allow members to invite other learners" />
              <Toggle defaultChecked={false} label="Lock group to enrolled course learners only" />
            </div>
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
