import AdminShell from './_shared/AdminShell'

/* ── 11 platform metrics requested by the admin ────────────────────────
   Laid out as 4 + 4 + 3 in a single flat 4-col grid with subtle
   hairline dividers — no per-stat cards, no charts, no sparklines.
─────────────────────────────────────────────────────────────────────── */

type DeltaTone = 'up' | 'down' | 'rating'

interface Stat {
  label: string
  value: string
  delta: string
  tone: DeltaTone
}

const STATS: Stat[] = [
  { label: 'Users', value: '28,491', delta: '+12.4% MoM', tone: 'up' },
  { label: 'Students', value: '26,180', delta: '+12.6% MoM', tone: 'up' },
  { label: 'Creators', value: '1,840', delta: '+8.2% MoM', tone: 'up' },
  { label: 'Revenue', value: '$284,920', delta: '+18.0% MoM', tone: 'up' },
  { label: 'Student enrollments', value: '82,140', delta: '+8.7% MoM', tone: 'up' },
  { label: 'Subscriptions', value: '3,140', delta: '+2.4% MoM', tone: 'up' },
  { label: 'Courses', value: '12,480', delta: '+3.1% MoM', tone: 'up' },
  { label: 'Assessments', value: '482', delta: '+5.0% MoM', tone: 'up' },
  { label: 'Study groups', value: '142', delta: '+12.4% MoM', tone: 'up' },
  { label: 'Posts', value: '6,204', delta: '+14.2% MoM', tone: 'up' },
  { label: 'Reviews', value: '24,816', delta: '★ 4.74 avg', tone: 'rating' },
]

const TONE_COLOR: Record<DeltaTone, string> = {
  up: '#5EE6A8',
  down: '#F4636E',
  rating: '#F4B26C',
}

const COLS = 4
const LAST_INDEX = STATS.length - 1 // 10

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const col = index % COLS
  const isLastInRow = col === COLS - 1 || index === LAST_INDEX
  const inLastRow = index >= STATS.length - (STATS.length % COLS || COLS)

  return (
    <div
      className="px-7 py-7"
      style={{
        borderRight: isLastInRow ? 'none' : '1px solid var(--hm-border)',
        borderBottom: inLastRow ? 'none' : '1px solid var(--hm-border)',
      }}
    >
      <p
        className="hm-mono text-[10px] mb-3"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
      >
        {stat.label.toUpperCase()}
      </p>
      <p
        className="text-[32px] font-semibold leading-none tracking-tight"
        style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
      >
        {stat.value}
      </p>
      <p
        className="hm-mono text-[11px] mt-3"
        style={{ color: TONE_COLOR[stat.tone], letterSpacing: '0.04em' }}
      >
        {stat.delta}
      </p>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AdminShell activeId="overview">
      {/* ── Page header ──────────────────────────────────────────── */}
      <div className="mb-8">
        <p
          className="hm-mono text-[10.5px] mb-2"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
        >
          PLATFORM
        </p>
        <h1
          className="text-[28px] font-semibold tracking-tight"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
        >
          Overview
        </h1>
        <p className="text-[13px] mt-1.5" style={{ color: 'var(--hm-text-muted)' }}>
          A snapshot of HyperMind across audience, commerce and content.
        </p>
      </div>

      {/* ── Stats grid: flat, no cards, hairline dividers ────────── */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{
          borderTop: '1px solid var(--hm-border)',
          borderBottom: '1px solid var(--hm-border)',
        }}
      >
        {STATS.map((stat, i) => (
          <StatCell key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </AdminShell>
  )
}
