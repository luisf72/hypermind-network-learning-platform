import type { ReactNode } from 'react'
import { Star, MessageSquare, Reply, MoreHorizontal } from 'lucide-react'
import CreatorShell from '../_shared/CreatorShell'

const ACCENT = '#F4B26C'
const ACCENT_SOFT = 'rgba(244,178,108,0.12)'

type Tone = 'success' | 'warning' | 'danger' | 'info' | 'violet' | 'teal' | 'neutral'
const TONE_BG: Record<Tone, string> = {
  success: 'rgba(94,230,168,0.12)',
  warning: 'rgba(244,178,108,0.14)',
  danger: 'rgba(244,99,110,0.12)',
  info: 'rgba(96,165,250,0.12)',
  violet: 'rgba(167,139,250,0.16)',
  teal: 'rgba(91,200,197,0.14)',
  neutral: 'rgba(139,146,168,0.14)',
}
const TONE_FG: Record<Tone, string> = {
  success: '#5EE6A8',
  warning: '#F4B26C',
  danger: '#F4636E',
  info: '#60A5FA',
  violet: '#A78BFA',
  teal: '#5BC8C5',
  neutral: '#8B92A8',
}

interface Review {
  id: string
  name: string
  course: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  when: string
  replied: boolean
}

const REVIEWS: Review[] = [
  {
    id: 'r-01',
    name: 'Mei Chen',
    course: 'Watercolor Foundations',
    rating: 5,
    when: '12 min ago',
    replied: false,
    comment:
      "I've taken three watercolor courses before and this is by far the clearest. The wet-on-wet module finally made it click — Sarah's slow demos and the close-up paper texture shots are everything.",
  },
  {
    id: 'r-02',
    name: "Liam O'Brien",
    course: 'Watercolor Foundations',
    rating: 5,
    when: '2h ago',
    replied: true,
    comment:
      "Loved the botanical study assignment. The feedback on my submission was detailed and kind. The optional 'further reading' links are a nice touch.",
  },
  {
    id: 'r-03',
    name: 'Aisha Rahman',
    course: 'Spanish for Travelers',
    rating: 4,
    when: '1d ago',
    replied: false,
    comment:
      'Excellent pacing for a beginner. Would love a few more pronunciation drills in the airport module — the rest is perfect.',
  },
  {
    id: 'r-04',
    name: 'Daniel Becker',
    course: 'Personal Finance 101',
    rating: 5,
    when: '2d ago',
    replied: true,
    comment: 'Practical, no fluff. The compound interest chapter alone was worth the price.',
  },
  {
    id: 'r-05',
    name: 'Camila Ortega',
    course: 'Acoustic Guitar Mastery',
    rating: 4,
    when: '4d ago',
    replied: false,
    comment:
      'Great course overall. The barre chord lesson is brutal — but in a good way. Could use a printable chord chart download.',
  },
  {
    id: 'r-06',
    name: 'Tomás Vargas',
    course: 'Watercolor Foundations',
    rating: 3,
    when: '1w ago',
    replied: true,
    comment:
      'Good content, but I struggled with the staining vs lifting demo — felt rushed. Otherwise solid.',
  },
]

const DISTRIBUTION = [
  { stars: 5, count: 612, pct: 82 },
  { stars: 4, count: 98, pct: 13 },
  { stars: 3, count: 22, pct: 3 },
  { stars: 2, count: 8, pct: 1 },
  { stars: 1, count: 4, pct: 1 },
]

function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className="hm-mono inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold"
      style={{ background: TONE_BG[tone], color: TONE_FG[tone], letterSpacing: '0.06em' }}
    >
      {children}
    </span>
  )
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          style={{
            width: size,
            height: size,
            color: n <= rating ? ACCENT : 'var(--hm-text-dim)',
            fill: n <= rating ? ACCENT : 'none',
          }}
        />
      ))}
    </span>
  )
}

export default function CreatorReviews() {
  return (
    <CreatorShell activeId="reviews">
      <div className="mb-5">
        <p
          className="hm-mono text-[10.5px] mb-2"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
        >
          STUDIO
        </p>
        <h1
          className="text-[26px] font-semibold tracking-tight"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
        >
          Reviews
        </h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
          What learners are saying about your courses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {/* Avg rating card */}
        <div
          className="rounded-2xl p-5 flex flex-col items-start gap-2"
          style={{
            background: 'linear-gradient(135deg, var(--hm-bg-card) 0%, var(--hm-bg-card-2) 100%)',
            border: '1px solid var(--hm-border)',
          }}
        >
          <p
            className="hm-mono text-[10px]"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
          >
            AVERAGE RATING
          </p>
          <div className="flex items-end gap-2">
            <p
              className="hm-mono text-[36px] font-semibold leading-none"
              style={{ color: 'var(--hm-text)' }}
            >
              4.9
            </p>
            <span className="hm-mono text-[12px] mb-1" style={{ color: 'var(--hm-text-dim)' }}>
              / 5.0
            </span>
          </div>
          <Stars rating={5} size={18} />
          <p className="text-[11.5px]" style={{ color: 'var(--hm-text-muted)' }}>
            across{' '}
            <span className="hm-mono" style={{ color: 'var(--hm-text)' }}>
              744
            </span>{' '}
            reviews from 7 courses
          </p>
        </div>

        {/* Distribution */}
        <div
          className="col-span-2 rounded-2xl px-5 py-4"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          <p
            className="hm-mono text-[10px] mb-3"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
          >
            STAR DISTRIBUTION
          </p>
          <div className="flex flex-col gap-1.5">
            {DISTRIBUTION.map((d) => (
              <div key={d.stars} className="flex items-center gap-3">
                <span
                  className="hm-mono text-[11px] w-10 shrink-0 inline-flex items-center gap-1"
                  style={{ color: 'var(--hm-text-muted)' }}
                >
                  {d.stars} <Star className="h-3 w-3" style={{ color: ACCENT, fill: ACCENT }} />
                </span>
                <div
                  className="h-1.5 flex-1 rounded-full overflow-hidden"
                  style={{ background: 'var(--hm-bg-card-2)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${d.pct}%`,
                      background: `linear-gradient(90deg, ${ACCENT} 0%, ${TONE_FG.violet} 100%)`,
                    }}
                  />
                </div>
                <span
                  className="hm-mono text-[11px] w-12 text-right shrink-0"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.04em' }}
                >
                  {d.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {['All', '5 ★', '4 ★', '3 ★ and below', 'Awaiting reply'].map((label, i) => (
          <button
            key={label}
            type="button"
            className="hm-mono inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-[10.5px] font-medium"
            style={{
              background: i === 0 ? ACCENT_SOFT : 'var(--hm-bg-card)',
              border: `1px solid ${i === 0 ? ACCENT + '55' : 'var(--hm-border)'}`,
              color: i === 0 ? ACCENT : 'var(--hm-text-muted)',
              letterSpacing: '0.06em',
            }}
          >
            {label.toUpperCase()}
          </button>
        ))}
        <span
          className="hm-mono text-[10.5px] ml-auto"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          {REVIEWS.length} REVIEWS
        </span>
      </div>

      {/* Review cards */}
      <div className="flex flex-col gap-3">
        {REVIEWS.map((rv) => (
          <div
            key={rv.id}
            className="rounded-2xl px-5 py-4"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full shrink-0 hm-mono text-[12px] font-semibold"
                style={{
                  background: `linear-gradient(180deg, ${TONE_FG.violet} 0%, ${TONE_FG.violet}cc 100%)`,
                  color: 'white',
                }}
              >
                {rv.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                    {rv.name}
                  </p>
                  <Stars rating={rv.rating} />
                  <span
                    className="hm-mono text-[10.5px]"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                  >
                    {rv.when.toUpperCase()}
                  </span>
                  {rv.replied && <Pill tone="success">replied</Pill>}
                </div>
                <p
                  className="hm-mono text-[10.5px] mt-0.5"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                >
                  ON · {rv.course.toUpperCase()}
                </p>
                <p
                  className="text-[12.5px] mt-2.5 leading-relaxed"
                  style={{ color: 'var(--hm-text-muted)' }}
                >
                  {rv.comment}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[11.5px] font-medium"
                    style={{
                      background: rv.replied ? 'transparent' : ACCENT_SOFT,
                      border: `1px solid ${rv.replied ? 'var(--hm-border)' : ACCENT + '55'}`,
                      color: rv.replied ? 'var(--hm-text-muted)' : ACCENT,
                    }}
                  >
                    <Reply className="h-3 w-3" />
                    {rv.replied ? 'View reply' : 'Reply'}
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[11.5px] font-medium"
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--hm-border)',
                      color: 'var(--hm-text-muted)',
                    }}
                  >
                    <MessageSquare className="h-3 w-3" />
                    Message learner
                  </button>
                </div>
              </div>
              <button
                type="button"
                aria-label="Review actions"
                className="flex h-7 w-7 items-center justify-center rounded-md shrink-0"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </CreatorShell>
  )
}
