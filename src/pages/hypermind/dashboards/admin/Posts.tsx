import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, UserCell, type Column } from '../_shared/AdminTable'
import AdminModal, { Field, FieldGrid, Select } from '../_shared/AdminModal'
import { FilterSelect } from '../_shared/FilterSelect'
import { Heart, MessageCircle } from 'lucide-react'

/* ── Types ────────────────────────────────────────────────────────── */

type PostStatus = 'visible' | 'hidden' | 'removed'

interface PostRow {
  id: string
  author_name: string
  author_email: string
  author_initials: string
  group_name: string | null
  title: string
  likes_count: number
  comments_count: number
  status: PostStatus
  created_at: string
  edited_at: string | null
}

/* ── Data ─────────────────────────────────────────────────────────── */

const ROWS: PostRow[] = [
  {
    id: 'p-001',
    author_name: 'Sarah Lin',
    author_email: 'sarah.lin@studio.com',
    author_initials: 'SL',
    group_name: 'Cognitive Science Lab',
    title: "Sweller's CLT still under-applied in modern course design",
    likes_count: 124,
    comments_count: 32,
    status: 'visible',
    created_at: 'Apr 28, 16:12',
    edited_at: null,
  },
  {
    id: 'p-002',
    author_name: 'Marie Dubois',
    author_email: 'marie@duboi.studio',
    author_initials: 'MD',
    group_name: 'Spanish Conversation Circle',
    title: 'Practica del subjuntivo — escenarios de viaje',
    likes_count: 87,
    comments_count: 41,
    status: 'visible',
    created_at: 'Apr 28, 14:05',
    edited_at: null,
  },
  {
    id: 'p-003',
    author_name: 'Aiko Tanaka',
    author_email: 'aiko@tnk.co',
    author_initials: 'AT',
    group_name: 'Beginner Photographers',
    title: 'Sunday challenge: negative space as the subject',
    likes_count: 218,
    comments_count: 76,
    status: 'visible',
    created_at: 'Apr 28, 11:44',
    edited_at: 'Apr 28, 12:10',
  },
  {
    id: 'p-004',
    author_name: 'David Park',
    author_email: 'd.park@labs.io',
    author_initials: 'DP',
    group_name: 'DSA Interview Prep',
    title: "Today's problem: LRU cache in O(1) time",
    likes_count: 64,
    comments_count: 28,
    status: 'visible',
    created_at: 'Apr 28, 08:30',
    edited_at: null,
  },
  {
    id: 'p-005',
    author_name: 'Lukas Becker',
    author_email: 'lukas@beckerlab.de',
    author_initials: 'LB',
    group_name: 'Indie Songwriters',
    title: 'Stuck on the bridge — 6/8 ballad harmony help',
    likes_count: 43,
    comments_count: 19,
    status: 'visible',
    created_at: 'Apr 27, 20:18',
    edited_at: null,
  },
  {
    id: 'p-006',
    author_name: 'Carlos Mendoza',
    author_email: 'carlos.m@hypermind.io',
    author_initials: 'CM',
    group_name: 'Personal Finance 101',
    title: 'Tax-loss harvesting checklist for early-career investors',
    likes_count: 102,
    comments_count: 24,
    status: 'visible',
    created_at: 'Apr 27, 17:55',
    edited_at: null,
  },
  {
    id: 'p-007',
    author_name: 'Priya Sharma',
    author_email: 'priya@sharma.io',
    author_initials: 'PS',
    group_name: 'Mindful Productivity',
    title: '90/20 deep-work split vs Pomodoro — two-week results',
    likes_count: 76,
    comments_count: 38,
    status: 'hidden',
    created_at: 'Apr 27, 09:42',
    edited_at: 'Apr 27, 11:04',
  },
  {
    id: 'p-008',
    author_name: 'Sophia Chen',
    author_email: 'sophia@chen.dev',
    author_initials: 'SC',
    group_name: 'Korean N3 Study Group',
    title: '오늘의 어휘: 비록 / 그럼에도 불구하고 / 어쨌든',
    likes_count: 29,
    comments_count: 17,
    status: 'visible',
    created_at: 'Apr 26, 22:10',
    edited_at: null,
  },
  {
    id: 'p-009',
    author_name: 'Omar Haddad',
    author_email: 'omar@haddad.studio',
    author_initials: 'OH',
    group_name: null,
    title: 'Promotional links — DeFi yield aggregator',
    likes_count: 0,
    comments_count: 0,
    status: 'removed',
    created_at: 'Apr 26, 18:34',
    edited_at: null,
  },
  {
    id: 'p-010',
    author_name: 'Marcus Reed',
    author_email: 'm.reed@hypermind.io',
    author_initials: 'MR',
    group_name: 'Watercolour Sundays',
    title: 'Wet-on-wet vs wet-on-dry lemon study — three quick takes',
    likes_count: 64,
    comments_count: 21,
    status: 'visible',
    created_at: 'Apr 25, 16:08',
    edited_at: null,
  },
]

/* ── Helpers ──────────────────────────────────────────────────────── */

const statusTone = (s: PostStatus) =>
  s === 'visible' ? 'success' : s === 'hidden' ? 'warning' : 'danger'

const STATUS_OPTIONS = [
  { value: 'visible', label: 'Visible — shown in feed' },
  { value: 'hidden', label: 'Hidden — only author can see it' },
  { value: 'removed', label: 'Removed — soft-deleted by moderator' },
]

const GROUP_OPTIONS = Array.from(
  new Set(ROWS.map((r) => r.group_name).filter(Boolean) as string[])
).map((g) => ({ value: g, label: g }))

const STATUS_FILTER_OPTIONS = [
  { value: 'visible', label: 'Visible' },
  { value: 'hidden', label: 'Hidden' },
  { value: 'removed', label: 'Removed' },
]

/* ── Columns ──────────────────────────────────────────────────────── */

const COLUMNS: Column<PostRow>[] = [
  {
    header: 'Author',
    render: (r) => (
      <UserCell name={r.author_name} email={r.author_email} initials={r.author_initials} />
    ),
  },
  {
    header: 'Group',
    render: (r) => (r.group_name ? <Pill tone="violet">{r.group_name}</Pill> : <Mono>—</Mono>),
  },
  {
    header: 'Post title',
    render: (r) => (
      <span
        className="truncate block max-w-[340px] text-[12.5px] font-medium"
        style={{
          color: r.status === 'removed' ? 'var(--hm-text-dim)' : 'var(--hm-text)',
          fontStyle: r.status === 'removed' ? 'italic' : 'normal',
          opacity: r.status === 'hidden' ? 0.55 : 1,
        }}
        title={r.title}
      >
        {r.title}
      </span>
    ),
  },
  {
    header: 'Engagement',
    align: 'right',
    render: (r) => (
      <div
        className="inline-flex items-center gap-3 hm-mono text-[11.5px]"
        style={{ color: 'var(--hm-text-muted)' }}
      >
        <span className="inline-flex items-center gap-1">
          <Heart className="h-3 w-3" style={{ color: '#F4636E' }} />
          {r.likes_count}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle className="h-3 w-3" style={{ color: '#A78BFA' }} />
          {r.comments_count}
        </span>
      </div>
    ),
  },
  {
    header: 'Status',
    render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill>,
  },
  {
    header: 'Created at',
    align: 'right',
    render: (r) => <Mono>{r.created_at}</Mono>,
  },
  {
    header: 'Edited at',
    align: 'right',
    render: (r) => <Mono>{r.edited_at ?? '—'}</Mono>,
  },
]

/* ── Page ─────────────────────────────────────────────────────────── */

export default function Posts() {
  const [modal, setModal] = useState<PostRow | null>(null)
  const [filterGroup, setFilterGroup] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const filtered = ROWS.filter(
    (r) =>
      (filterGroup === '' || r.group_name === filterGroup) &&
      (filterStatus === '' || r.status === filterStatus)
  )

  const filterControls = (
    <>
      <FilterSelect
        label="Group"
        value={filterGroup}
        options={GROUP_OPTIONS}
        onChange={setFilterGroup}
      />
      <FilterSelect
        label="Status"
        value={filterStatus}
        options={STATUS_FILTER_OPTIONS}
        onChange={setFilterStatus}
      />
    </>
  )

  return (
    <AdminShell activeId="posts">
      <AdminTable
        eyebrow="Community"
        title="Posts"
        subtitle="Learner-generated posts across all study groups. Hide or remove rule-breaking content."
        searchPlaceholder="Search by author, title or group…"
        filterControls={filterControls}
        columns={COLUMNS}
        rows={filtered}
        totalCount={6204}
        pageInfo={{ current: 1, total: 521 }}
        onRowAction={(row) => setModal(row)}
      />

      {/* ── Status modal ──────────────────────────────────────────── */}
      <AdminModal
        open={modal !== null}
        onClose={() => setModal(null)}
        mode="edit"
        entityLabel="post"
        entityName={modal?.title}
        subtitle={
          modal
            ? `#${modal.id}${modal.group_name ? ` · ${modal.group_name}` : ''} · by ${modal.author_name} · ${modal.created_at}`
            : ''
        }
        width={440}
        submitLabel="Update status"
      >
        {modal && (
          <FieldGrid cols={1}>
            <Field
              label="Visibility status"
              required
              hint="Hiding a post removes it from the feed but keeps it visible to the author. Removing it soft-deletes the content."
            >
              <Select defaultValue={modal.status} options={STATUS_OPTIONS} />
            </Field>
          </FieldGrid>
        )}
      </AdminModal>
    </AdminShell>
  )
}
