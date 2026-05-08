import CreatorShell from './_shared/CreatorShell'

/**
 * Combined Creator + Evaluator dashboard — Overview screen.
 *
 * Same flat, card-less hairline-divider stat grid pattern as the
 * AdminDashboard overview, scaled to a 4 × 3 grid that mixes the
 * two role surfaces:
 *  - Studio metrics (creator side): active courses, lessons,
 *    live sessions, total students.
 *  - Engagement & earnings: new enrollments, MTD earnings, avg
 *    course rating, reviews received.
 *  - Evaluation queue (evaluator side): pending reviews, reviewed
 *    today, avg review time, quality score.
 */

type DeltaTone = 'up' | 'down' | 'rating' | 'neutral'

interface Stat {
  label: string
  value: string
  delta: string
  tone: DeltaTone
}

const STATS: Stat[] = [
  // Row 1 — studio
  { label: 'Active courses', value: '7', delta: '+1 this month', tone: 'up' },
  { label: 'Lessons published', value: '142', delta: '+8 this month', tone: 'up' },
  { label: 'Live sessions', value: '3', delta: 'Next: Thu 6pm', tone: 'neutral' },
  { label: 'Total students', value: '4,240', delta: '+312 MoM', tone: 'up' },

  // Row 2 — engagement & earnings
  { label: 'New enrollments', value: '348', delta: '+24% MoM', tone: 'up' },
  { label: 'Earnings MTD', value: '$4,820', delta: '+18% MoM', tone: 'up' },
  { label: 'Avg course rating', value: '4.9', delta: '★ across 7 courses', tone: 'rating' },
  { label: 'Reviews received', value: '744', delta: '+28 this week', tone: 'up' },

  // Row 3 — evaluator
  { label: 'Pending reviews', value: '12', delta: '3 high priority', tone: 'down' },
  { label: 'Reviewed today', value: '28', delta: '+7 vs target', tone: 'up' },
  { label: 'Avg review time', value: '4m 12s', delta: '−18s vs last wk', tone: 'up' },
  { label: 'Quality score', value: '4.92', delta: '★ peer rated', tone: 'rating' },
]

const TONE_COLOR: Record<DeltaTone, string> = {
  up: '#5EE6A8',
  down: '#F4636E',
  rating: '#F4B26C',
  neutral: '#8B92A8',
}

const COLS = 4
const LAST_INDEX = STATS.length - 1 // 11

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

export default function CreatorDashboard() {
  return (
    <CreatorShell activeId="overview">
      {/* ── Page header ──────────────────────────────────────────── */}
      <div className="mb-8">
        <p
          className="hm-mono text-[10.5px] mb-2"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
        >
          STUDIO
        </p>
        <h1
          className="text-[28px] font-semibold tracking-tight"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
        >
          Overview
        </h1>
        <p className="text-[13px] mt-1.5" style={{ color: 'var(--hm-text-muted)' }}>
          Your studio at a glance — courses, audience, earnings and the assessment queue.
        </p>
      </div>

      {/* ── Stats grid: flat, no cards, hairline dividers ────────── */}
      <div
        className="grid grid-cols-4"
        style={{
          borderTop: '1px solid var(--hm-border)',
          borderBottom: '1px solid var(--hm-border)',
        }}
      >
        {STATS.map((stat, i) => (
          <StatCell key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </CreatorShell>
  )
}
