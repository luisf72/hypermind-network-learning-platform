import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, UserCell, type Column, type Tone } from '../_shared/AdminTable'
import { FilterSelect } from '../_shared/FilterSelect'
import { Download, Heart, Sparkles, Hash, Coins, Activity } from 'lucide-react'

const ACCENT = '#F4636E'

/* ── Schemas ──────────────────────────────────────────────────────── */

interface PointsLedgerRow {
  id: string
  user_name: string
  user_email: string
  user_initials: string
  amount: number
  reference_type: string
  reason: string
  created_at: string
}

interface ActivityRow {
  id: string
  user_name: string
  user_email: string
  user_initials: string
  action: string
  entity_type:
    | 'course'
    | 'assessment'
    | 'user'
    | 'subscription'
    | 'post'
    | 'session'
    | 'role'
    | 'permission'
  description: string
  created_at: string
}

type LedgerKey = 'karma' | 'xp' | 'hmn' | 'credits'
type TabKey = LedgerKey | 'activity'

interface PointsTabConfig {
  kind: 'points'
  key: LedgerKey
  name: string
  symbol: string
  description: string
  unit?: string
  totalCount: number
  pageTotal: number
  Icon: any
  rows: PointsLedgerRow[]
}
interface ActivityTabConfig {
  kind: 'activity'
  key: 'activity'
  name: string
  description: string
  totalCount: number
  pageTotal: number
  Icon: any
  rows: ActivityRow[]
}
type TabConfig = PointsTabConfig | ActivityTabConfig

/* ── Data ──────────────────────────────────────────────────────────── */

const KARMA_ROWS: PointsLedgerRow[] = [
  {
    id: 'k-001',
    user_name: 'Sarah Lin',
    user_email: 'sarah.lin@studio.com',
    user_initials: 'SL',
    amount: +25,
    reference_type: 'answer_accepted',
    reason: "Answer accepted on 'How does spacing scale?'",
    created_at: 'Apr 28, 16:42',
  },
  {
    id: 'k-002',
    user_name: 'David Park',
    user_email: 'd.park@labs.io',
    user_initials: 'DP',
    amount: +10,
    reference_type: 'post_upvoted',
    reason: "Post 'My weekly recall routine' upvoted",
    created_at: 'Apr 28, 15:24',
  },
  {
    id: 'k-003',
    user_name: 'Marie Dubois',
    user_email: 'marie@duboi.studio',
    user_initials: 'MD',
    amount: +50,
    reference_type: 'evaluation_done',
    reason: 'Completed peer evaluation #204',
    created_at: 'Apr 28, 14:08',
  },
  {
    id: 'k-004',
    user_name: 'Aiko Tanaka',
    user_email: 'aiko@tnk.co',
    user_initials: 'AT',
    amount: -100,
    reference_type: 'report_validated',
    reason: 'Report validated against community rules',
    created_at: 'Apr 28, 12:50',
  },
  {
    id: 'k-005',
    user_name: 'Carlos Mendoza',
    user_email: 'carlos.m@hypermind.io',
    user_initials: 'CM',
    amount: +20,
    reference_type: 'comment_helpful',
    reason: 'Comment marked as helpful',
    created_at: 'Apr 28, 11:32',
  },
  {
    id: 'k-006',
    user_name: 'Priya Sharma',
    user_email: 'priya@sharma.io',
    user_initials: 'PS',
    amount: +15,
    reference_type: 'post_upvoted',
    reason: "Post 'Calibration tips' upvoted",
    created_at: 'Apr 28, 10:18',
  },
  {
    id: 'k-007',
    user_name: 'Marcus Reed',
    user_email: 'm.reed@hypermind.io',
    user_initials: 'MR',
    amount: +30,
    reference_type: 'answer_accepted',
    reason: "Answer accepted on 'Bayesian intuition'",
    created_at: 'Apr 28, 09:04',
  },
  {
    id: 'k-008',
    user_name: 'Sophia Chen',
    user_email: 'sophia@chen.dev',
    user_initials: 'SC',
    amount: +10,
    reference_type: 'post_upvoted',
    reason: "Post 'Note system after 6 months' upvoted",
    created_at: 'Apr 27, 22:42',
  },
  {
    id: 'k-009',
    user_name: 'Lukas Becker',
    user_email: 'lukas@beckerlab.de',
    user_initials: 'LB',
    amount: -10,
    reference_type: 'post_downvoted',
    reason: 'Post downvoted by community',
    created_at: 'Apr 27, 21:20',
  },
  {
    id: 'k-010',
    user_name: 'Omar Haddad',
    user_email: 'omar@haddad.studio',
    user_initials: 'OH',
    amount: +40,
    reference_type: 'evaluation_done',
    reason: 'Completed peer evaluation #201',
    created_at: 'Apr 27, 18:54',
  },
]

const XP_ROWS: PointsLedgerRow[] = [
  {
    id: 'x-001',
    user_name: 'David Park',
    user_email: 'd.park@labs.io',
    user_initials: 'DP',
    amount: +1200,
    reference_type: 'course_completed',
    reason: "Completed 'Cognitive Load Mastery'",
    created_at: 'Apr 28, 16:42',
  },
  {
    id: 'x-002',
    user_name: 'Sophia Chen',
    user_email: 'sophia@chen.dev',
    user_initials: 'SC',
    amount: +480,
    reference_type: 'lesson_completed',
    reason: 'Completed lesson 8 of 12',
    created_at: 'Apr 28, 15:32',
  },
  {
    id: 'x-003',
    user_name: 'Marcus Reed',
    user_email: 'm.reed@hypermind.io',
    user_initials: 'MR',
    amount: +320,
    reference_type: 'assessment_passed',
    reason: "Passed 'Cognitive Load Patterns' (84%)",
    created_at: 'Apr 28, 14:18',
  },
  {
    id: 'x-004',
    user_name: 'Sarah Lin',
    user_email: 'sarah.lin@studio.com',
    user_initials: 'SL',
    amount: +200,
    reference_type: 'streak_bonus',
    reason: '14-day streak bonus',
    created_at: 'Apr 28, 09:00',
  },
  {
    id: 'x-005',
    user_name: 'Marie Dubois',
    user_email: 'marie@duboi.studio',
    user_initials: 'MD',
    amount: +1500,
    reference_type: 'course_completed',
    reason: "Completed 'Critical Thinking Foundations'",
    created_at: 'Apr 28, 08:24',
  },
  {
    id: 'x-006',
    user_name: 'Priya Sharma',
    user_email: 'priya@sharma.io',
    user_initials: 'PS',
    amount: +280,
    reference_type: 'lesson_completed',
    reason: 'Completed lesson 4 of 10',
    created_at: 'Apr 28, 07:12',
  },
  {
    id: 'x-007',
    user_name: 'Carlos Mendoza',
    user_email: 'carlos.m@hypermind.io',
    user_initials: 'CM',
    amount: +600,
    reference_type: 'assessment_passed',
    reason: "Passed 'Bayesian Reasoning' (88%)",
    created_at: 'Apr 27, 23:54',
  },
  {
    id: 'x-008',
    user_name: 'Aiko Tanaka',
    user_email: 'aiko@tnk.co',
    user_initials: 'AT',
    amount: +180,
    reference_type: 'lesson_completed',
    reason: 'Completed lesson 2 of 6',
    created_at: 'Apr 27, 21:42',
  },
  {
    id: 'x-009',
    user_name: 'Lukas Becker',
    user_email: 'lukas@beckerlab.de',
    user_initials: 'LB',
    amount: -120,
    reference_type: 'decay_adjustment',
    reason: '30-day inactivity decay',
    created_at: 'Apr 27, 03:00',
  },
  {
    id: 'x-010',
    user_name: 'Omar Haddad',
    user_email: 'omar@haddad.studio',
    user_initials: 'OH',
    amount: +840,
    reference_type: 'course_completed',
    reason: "Completed 'Note-Taking Systems'",
    created_at: 'Apr 26, 19:18',
  },
]

const HMN_ROWS: PointsLedgerRow[] = [
  {
    id: 'h-001',
    user_name: 'Sarah Lin',
    user_email: 'sarah.lin@studio.com',
    user_initials: 'SL',
    amount: +80,
    reference_type: 'course_published',
    reason: "Published 'Cognitive Load Mastery'",
    created_at: 'Apr 28, 16:42',
  },
  {
    id: 'h-002',
    user_name: 'Carlos Mendoza',
    user_email: 'carlos.m@hypermind.io',
    user_initials: 'CM',
    amount: +60,
    reference_type: 'evaluation_calibrated',
    reason: 'Calibration accepted by panel',
    created_at: 'Apr 28, 14:18',
  },
  {
    id: 'h-003',
    user_name: 'Marie Dubois',
    user_email: 'marie@duboi.studio',
    user_initials: 'MD',
    amount: +40,
    reference_type: 'evaluation_done',
    reason: 'Completed peer evaluation #204',
    created_at: 'Apr 28, 14:08',
  },
  {
    id: 'h-004',
    user_name: 'Priya Sharma',
    user_email: 'priya@sharma.io',
    user_initials: 'PS',
    amount: +50,
    reference_type: 'course_published',
    reason: "Published 'Storytelling for Educators'",
    created_at: 'Apr 28, 10:18',
  },
  {
    id: 'h-005',
    user_name: 'Anya Volkov',
    user_email: 'anya@hypermind.io',
    user_initials: 'AV',
    amount: +120,
    reference_type: 'moderation_action',
    reason: 'Resolved high-priority report',
    created_at: 'Apr 28, 09:42',
  },
  {
    id: 'h-006',
    user_name: 'Sophia Chen',
    user_email: 'sophia@chen.dev',
    user_initials: 'SC',
    amount: +25,
    reference_type: 'session_hosted',
    reason: "Hosted 'Bayesian Q&A' session",
    created_at: 'Apr 27, 22:12',
  },
  {
    id: 'h-007',
    user_name: 'Marcus Reed',
    user_email: 'm.reed@hypermind.io',
    user_initials: 'MR',
    amount: +35,
    reference_type: 'evaluation_done',
    reason: 'Completed peer evaluation #201',
    created_at: 'Apr 27, 21:54',
  },
  {
    id: 'h-008',
    user_name: 'Lukas Becker',
    user_email: 'lukas@beckerlab.de',
    user_initials: 'LB',
    amount: -30,
    reference_type: 'miscalibration',
    reason: 'Calibration drifted from panel consensus',
    created_at: 'Apr 27, 18:24',
  },
  {
    id: 'h-009',
    user_name: 'David Park',
    user_email: 'd.park@labs.io',
    user_initials: 'DP',
    amount: +15,
    reference_type: 'answer_accepted',
    reason: "Answer accepted on 'Bayesian intuition'",
    created_at: 'Apr 27, 14:00',
  },
  {
    id: 'h-010',
    user_name: 'Omar Haddad',
    user_email: 'omar@haddad.studio',
    user_initials: 'OH',
    amount: +45,
    reference_type: 'course_published',
    reason: "Published 'Visual Thinking & Diagrams'",
    created_at: 'Apr 26, 18:42',
  },
]

const CREDITS_ROWS: PointsLedgerRow[] = [
  {
    id: 'c-001',
    user_name: 'David Park',
    user_email: 'd.park@labs.io',
    user_initials: 'DP',
    amount: -240,
    reference_type: 'course_unlock',
    reason: "Unlocked 'Cognitive Load Mastery'",
    created_at: 'Apr 28, 16:42',
  },
  {
    id: 'c-002',
    user_name: 'Sarah Lin',
    user_email: 'sarah.lin@studio.com',
    user_initials: 'SL',
    amount: +500,
    reference_type: 'credit_purchase',
    reason: 'Bought 500 credits ($49.00 USD)',
    created_at: 'Apr 28, 15:18',
  },
  {
    id: 'c-003',
    user_name: 'Marcus Reed',
    user_email: 'm.reed@hypermind.io',
    user_initials: 'MR',
    amount: -180,
    reference_type: 'course_unlock',
    reason: "Unlocked 'Deep Work Habits'",
    created_at: 'Apr 28, 14:32',
  },
  {
    id: 'c-004',
    user_name: 'Priya Sharma',
    user_email: 'priya@sharma.io',
    user_initials: 'PS',
    amount: +100,
    reference_type: 'streak_bonus',
    reason: '30-day streak bonus',
    created_at: 'Apr 28, 09:00',
  },
  {
    id: 'c-005',
    user_name: 'Carlos Mendoza',
    user_email: 'carlos.m@hypermind.io',
    user_initials: 'CM',
    amount: -380,
    reference_type: 'course_unlock',
    reason: "Unlocked 'Spaced Repetition Engineering'",
    created_at: 'Apr 28, 08:24',
  },
  {
    id: 'c-006',
    user_name: 'Sophia Chen',
    user_email: 'sophia@chen.dev',
    user_initials: 'SC',
    amount: +250,
    reference_type: 'credit_purchase',
    reason: 'Bought 250 credits ($24.00 USD)',
    created_at: 'Apr 27, 22:18',
  },
  {
    id: 'c-007',
    user_name: 'Aiko Tanaka',
    user_email: 'aiko@tnk.co',
    user_initials: 'AT',
    amount: -50,
    reference_type: 'session_booking',
    reason: 'Booked 1:1 coaching session',
    created_at: 'Apr 27, 18:00',
  },
  {
    id: 'c-008',
    user_name: 'Marie Dubois',
    user_email: 'marie@duboi.studio',
    user_initials: 'MD',
    amount: +300,
    reference_type: 'evaluation_payout',
    reason: 'Evaluation payout for #204',
    created_at: 'Apr 27, 14:48',
  },
  {
    id: 'c-009',
    user_name: 'Lukas Becker',
    user_email: 'lukas@beckerlab.de',
    user_initials: 'LB',
    amount: -120,
    reference_type: 'course_unlock',
    reason: "Unlocked 'Foundations of Active Recall'",
    created_at: 'Apr 27, 09:42',
  },
  {
    id: 'c-010',
    user_name: 'Omar Haddad',
    user_email: 'omar@haddad.studio',
    user_initials: 'OH',
    amount: +1000,
    reference_type: 'credit_purchase',
    reason: 'Bought 1000 credits ($89.00 USD)',
    created_at: 'Apr 26, 21:30',
  },
]

const ACTIVITY_ROWS: ActivityRow[] = [
  {
    id: 'al-001',
    user_name: 'Anya Volkov',
    user_email: 'anya@hypermind.io',
    user_initials: 'AV',
    action: 'course.publish',
    entity_type: 'course',
    description: "Published 'Cognitive Load Mastery'.",
    created_at: 'Apr 28, 16:42',
  },
  {
    id: 'al-002',
    user_name: 'Sarah Lin',
    user_email: 'sarah.lin@studio.com',
    user_initials: 'SL',
    action: 'assessment.create',
    entity_type: 'assessment',
    description: "Created 'Working Memory — v3'.",
    created_at: 'Apr 28, 15:18',
  },
  {
    id: 'al-003',
    user_name: 'Marie Dubois',
    user_email: 'marie@duboi.studio',
    user_initials: 'MD',
    action: 'assessment.approve',
    entity_type: 'assessment',
    description: "Approved 'Attention Switching Drill'.",
    created_at: 'Apr 28, 14:02',
  },
  {
    id: 'al-004',
    user_name: 'Anya Volkov',
    user_email: 'anya@hypermind.io',
    user_initials: 'AV',
    action: 'user.suspend',
    entity_type: 'user',
    description: 'Suspended account aiko@tnk.co.',
    created_at: 'Apr 28, 12:48',
  },
  {
    id: 'al-005',
    user_name: 'Carlos Mendoza',
    user_email: 'carlos.m@hypermind.io',
    user_initials: 'CM',
    action: 'course.update',
    entity_type: 'course',
    description: "Updated pricing on 'Spaced Repetition…'.",
    created_at: 'Apr 28, 11:24',
  },
  {
    id: 'al-006',
    user_name: 'Anya Volkov',
    user_email: 'anya@hypermind.io',
    user_initials: 'AV',
    action: 'role.update',
    entity_type: 'role',
    description: 'Granted moderate_post to Moderator.',
    created_at: 'Apr 28, 10:08',
  },
  {
    id: 'al-007',
    user_name: 'Lukas Becker',
    user_email: 'lukas@beckerlab.de',
    user_initials: 'LB',
    action: 'session.create',
    entity_type: 'session',
    description: "Created live session 'Bayesian Q&A'.",
    created_at: 'Apr 28, 08:54',
  },
  {
    id: 'al-008',
    user_name: 'Priya Sharma',
    user_email: 'priya@sharma.io',
    user_initials: 'PS',
    action: 'subscription.update',
    entity_type: 'subscription',
    description: 'Switched plan from Pro to Studio Monthly.',
    created_at: 'Apr 27, 23:42',
  },
  {
    id: 'al-009',
    user_name: 'Anya Volkov',
    user_email: 'anya@hypermind.io',
    user_initials: 'AV',
    action: 'permission.create',
    entity_type: 'permission',
    description: "Created permission 'export_user_data'.",
    created_at: 'Apr 27, 21:30',
  },
  {
    id: 'al-010',
    user_name: 'Marcus Reed',
    user_email: 'm.reed@hypermind.io',
    user_initials: 'MR',
    action: 'post.delete',
    entity_type: 'post',
    description: 'Deleted reported post #482.',
    created_at: 'Apr 27, 19:12',
  },
]

/* ── Tab configs ──────────────────────────────────────────────────── */

const TABS: Record<TabKey, TabConfig> = {
  karma: {
    kind: 'points',
    key: 'karma',
    name: 'Karma',
    symbol: 'Δ KARMA',
    Icon: Heart,
    description: 'Reputation entries earned from community contribution.',
    totalCount: 94820,
    pageTotal: 2371,
    rows: KARMA_ROWS,
  },
  xp: {
    kind: 'points',
    key: 'xp',
    name: 'XP',
    symbol: 'Δ XP',
    Icon: Sparkles,
    description: 'Experience entries earned from learning progress.',
    totalCount: 284910,
    pageTotal: 7123,
    rows: XP_ROWS,
  },
  hmn: {
    kind: 'points',
    key: 'hmn',
    name: 'HMN',
    symbol: 'Δ HMN',
    Icon: Hash,
    description: 'HMN reward entries from contributing high-quality work.',
    totalCount: 42180,
    pageTotal: 1055,
    rows: HMN_ROWS,
  },
  credits: {
    kind: 'points',
    key: 'credits',
    name: 'Credits',
    symbol: 'Δ CREDITS',
    Icon: Coins,
    description: 'Credit ledger showing purchases, unlocks and bonuses.',
    totalCount: 68420,
    pageTotal: 1711,
    rows: CREDITS_ROWS,
    unit: 'cr',
  },
  activity: {
    kind: 'activity',
    key: 'activity',
    name: 'Activity',
    Icon: Activity,
    description: 'Audit trail of every significant admin and system action.',
    totalCount: 184290,
    pageTotal: 4608,
    rows: ACTIVITY_ROWS,
  },
}

const TAB_ORDER: TabKey[] = ['karma', 'xp', 'hmn', 'credits', 'activity']

const DATE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Last 7 days' },
  { value: 'month', label: 'Last 30 days' },
  { value: 'quarter', label: 'Last 90 days' },
]

const entityTone = (e: ActivityRow['entity_type']): Tone =>
  e === 'user' || e === 'role' || e === 'permission'
    ? 'danger'
    : e === 'course' || e === 'assessment'
      ? 'violet'
      : e === 'subscription'
        ? 'amber'
        : e === 'post'
          ? 'info'
          : 'teal'

/* ── Page ──────────────────────────────────────────────────────────── */

export default function Ledgers() {
  const [active, setActive] = useState<TabKey>('karma')
  const [filterType, setFilterType] = useState('')
  const [filterDate, setFilterDate] = useState('')

  const cfg = TABS[active]

  /* Reset type filter when switching tabs */
  function switchTab(key: TabKey) {
    setActive(key)
    setFilterType('')
  }

  /* ── Columns ──────────────────────────────────────────────────── */

  const pointsColumns = (c: PointsTabConfig): Column<PointsLedgerRow>[] => [
    {
      header: 'User',
      render: (r) => (
        <UserCell name={r.user_name} email={r.user_email} initials={r.user_initials} />
      ),
    },
    {
      header: 'Points',
      align: 'right',
      render: (r) => (
        <span
          className="hm-mono text-[12px] font-semibold"
          style={{ color: r.amount >= 0 ? '#5EE6A8' : '#F4636E' }}
        >
          {r.amount >= 0 ? '+' : ''}
          {r.amount.toLocaleString()}
          {c.unit ? ` ${c.unit}` : ''}
        </span>
      ),
    },
    {
      header: 'Source',
      render: (r) => (
        <Pill tone="violet" dot={false}>
          {r.reference_type}
        </Pill>
      ),
    },
    {
      header: 'Reason',
      render: (r) => (
        <span className="truncate block max-w-[360px]" style={{ color: 'var(--hm-text)' }}>
          {r.reason}
        </span>
      ),
    },
    {
      header: 'Created at',
      align: 'right',
      render: (r) => <Mono>{r.created_at}</Mono>,
    },
  ]

  const activityColumns: Column<ActivityRow>[] = [
    {
      header: 'User',
      render: (r) => (
        <UserCell name={r.user_name} email={r.user_email} initials={r.user_initials} />
      ),
    },
    {
      header: 'Action',
      render: (r) => <Mono>{r.action}</Mono>,
    },
    {
      header: 'Entity',
      render: (r) => (
        <Pill tone={entityTone(r.entity_type)} dot={false}>
          {r.entity_type}
        </Pill>
      ),
    },
    {
      header: 'Description',
      render: (r) => (
        <span className="truncate block max-w-[360px]" style={{ color: 'var(--hm-text)' }}>
          {r.description}
        </span>
      ),
    },
    {
      header: 'Created at',
      align: 'right',
      render: (r) => <Mono>{r.created_at}</Mono>,
    },
  ]

  /* ── Filter options (derived from current tab data) ────────────── */

  const logTypeOptions =
    cfg.kind === 'points'
      ? Array.from(new Set((cfg as PointsTabConfig).rows.map((r) => r.reference_type))).map(
          (v) => ({ value: v, label: v })
        )
      : Array.from(new Set((cfg as ActivityTabConfig).rows.map((r) => r.entity_type))).map((v) => ({
          value: v,
          label: v,
        }))

  /* ── Filtered rows ─────────────────────────────────────────────── */

  const pointsRows =
    cfg.kind === 'points'
      ? (cfg as PointsTabConfig).rows.filter((r) =>
          filterType ? r.reference_type === filterType : true
        )
      : []

  const activityRows =
    cfg.kind === 'activity'
      ? (cfg as ActivityTabConfig).rows.filter((r) =>
          filterType ? r.entity_type === filterType : true
        )
      : []

  /* ── Filter controls (shared across all tabs) ──────────────────── */

  const filterControls = (
    <>
      <FilterSelect
        label="Log type"
        value={filterType}
        options={logTypeOptions}
        onChange={setFilterType}
      />
      <FilterSelect
        label="Date"
        value={filterDate}
        options={DATE_OPTIONS}
        onChange={setFilterDate}
      />
    </>
  )

  const isActivity = cfg.kind === 'activity'

  return (
    <AdminShell activeId="ledgers">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="mb-5">
        <p
          className="hm-mono text-[10px] mb-1.5"
          style={{ color: ACCENT, letterSpacing: '0.18em' }}
        >
          ACTIVITY &amp; LEDGERS
        </p>
        <h1
          className="text-[26px] font-semibold tracking-tight mb-1"
          style={{ color: 'var(--hm-text)', fontFamily: 'var(--hm-font-display)' }}
        >
          Ledgers
        </h1>
        <p className="text-[13px]" style={{ color: 'var(--hm-text-dim)' }}>
          Reputation, experience, HMN, credit and activity entries — every system log in one screen.
        </p>
      </div>

      {/* ── Segmented tabs ──────────────────────────────────────── */}
      <div
        className="inline-flex items-center gap-0.5 p-1 rounded-xl mb-5"
        style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
      >
        {TAB_ORDER.map((key) => {
          const t = TABS[key]
          const isActive = key === active
          return (
            <button
              key={key}
              type="button"
              onClick={() => switchTab(key)}
              className="flex items-center gap-2 h-9 rounded-lg text-[12.5px] font-medium transition-colors"
              style={{
                paddingLeft: 14,
                paddingRight: 14,
                background: isActive
                  ? `linear-gradient(180deg,${ACCENT} 0%,${ACCENT}d9 100%)`
                  : 'transparent',
                color: isActive ? 'white' : 'var(--hm-text-muted)',
                boxShadow: isActive ? '0 6px 18px -8px rgba(244,99,110,0.65)' : 'none',
              }}
            >
              <t.Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{t.name}</span>
              <span
                className="hm-mono text-[10px]"
                style={{
                  color: isActive ? 'rgba(255,255,255,0.85)' : 'var(--hm-text-dim)',
                  letterSpacing: '0.06em',
                }}
              >
                {t.totalCount.toLocaleString()}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Active table ────────────────────────────────────────── */}
      {isActivity ? (
        <AdminTable
          eyebrow={`Activity & ledgers · ${cfg.name}`}
          title="Activity logs"
          subtitle={cfg.description}
          primaryAction={{ label: 'Export CSV', icon: Download }}
          searchPlaceholder="Search by actor, action or entity…"
          filterControls={filterControls}
          columns={activityColumns}
          rows={activityRows}
          totalCount={cfg.totalCount}
          pageInfo={{ current: 1, total: cfg.pageTotal }}
          showActionsCol={false}
        />
      ) : (
        <AdminTable
          eyebrow={`Activity & ledgers · ${cfg.name}`}
          title={`${cfg.name} logs`}
          subtitle={cfg.description}
          primaryAction={{ label: 'Export CSV', icon: Download }}
          searchPlaceholder={`Search ${cfg.name.toLowerCase()} entries…`}
          filterControls={filterControls}
          columns={pointsColumns(cfg as PointsTabConfig)}
          rows={pointsRows}
          totalCount={cfg.totalCount}
          pageInfo={{ current: 1, total: cfg.pageTotal }}
          showActionsCol={false}
        />
      )}
    </AdminShell>
  )
}
