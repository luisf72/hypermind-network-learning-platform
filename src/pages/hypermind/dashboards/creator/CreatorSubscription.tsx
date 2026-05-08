import { useState } from 'react'
import {
  CreditCard,
  Zap,
  Coins,
  Sparkles,
  Check,
  ArrowUpRight,
  Download,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'
import CreatorShell from '../_shared/CreatorShell'

const ACCENT = '#F4B26C'
const ACCENT_SOFT = 'rgba(244,178,108,0.14)'
const VIOLET = '#7C5CF6'
const VIOLET_SOFT = 'rgba(124,92,246,0.12)'
const GREEN = '#5EE6A8'
const TEAL = '#5BC8C5'
const TEAL_SOFT = 'rgba(91,200,197,0.14)'
const RED = '#F4636E'

/* ── Creator plans ───────────────────────────────────────────────── */
type PlanId = 'basic' | 'pro' | 'studio'
interface Plan {
  id: PlanId
  name: string
  tagline: string
  priceMonthly: number
  priceYearly: number
  color: string
  soft: string
  highlight?: boolean
  current?: boolean
  features: string[]
  cta: string
}
const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic Creator',
    tagline: 'Start publishing for free',
    priceMonthly: 0,
    priceYearly: 0,
    color: '#6B7280',
    soft: 'rgba(107,114,128,0.12)',
    features: [
      'Up to 3 published courses',
      'Basic learner analytics',
      'Standard review queue',
      'Creator profile page',
      'HMN earnings on enrollments',
    ],
    cta: 'Downgrade',
  },
  {
    id: 'pro',
    name: 'Pro Creator',
    tagline: 'For active publishers',
    priceMonthly: 19,
    priceYearly: 15,
    color: VIOLET,
    soft: VIOLET_SOFT,
    features: [
      'Up to 20 published courses',
      'Enhanced analytics & cohort view',
      'Priority review queue',
      'Revenue dashboard',
      'Evaluator scheduling access',
      'Karma boosts ×1.5',
    ],
    cta: 'Downgrade',
  },
  {
    id: 'studio',
    name: 'Studio',
    tagline: 'For professional creators',
    priceMonthly: 39,
    priceYearly: 32,
    color: ACCENT,
    soft: ACCENT_SOFT,
    highlight: true,
    current: true,
    features: [
      'Unlimited course creation & publishing',
      'Evaluator panel access & scheduling',
      'Revenue sharing & payout dashboard',
      'Advanced analytics & learner insights',
      'Priority review queue',
      'White-label certificate branding',
      'Studio AI tools (Synthia)',
      'Karma boosts ×2.0',
    ],
    cta: 'Current plan',
  },
]

/* ── HMN / Credit packs ───────────────────────────────────────────── */
const HMN_PACKS = [
  { hmn: 500, price: 5.0 },
  { hmn: 1000, price: 9.0, badge: 'save 10%' },
  { hmn: 5000, price: 40.0, badge: 'save 20%' },
  { hmn: 10000, price: 70.0, badge: 'save 30%' },
]
const CREDIT_PACKS = [
  { cr: 100, price: 1.0 },
  { cr: 500, price: 4.5, badge: 'save 10%' },
  { cr: 1000, price: 8.0, badge: 'save 20%' },
  { cr: 5000, price: 35.0, badge: 'save 30%' },
]

/* ── Karma level ladder ──────────────────────────────────────────── */
const KARMA_LEVELS = [
  { name: 'Newcomer', min: 0, max: 99, color: '#6B7280', soft: 'rgba(107,114,128,0.14)' },
  { name: 'Apprentice', min: 100, max: 499, color: '#10B981', soft: 'rgba(16,185,129,0.14)' },
  { name: 'Contributor', min: 500, max: 1999, color: '#60A5FA', soft: 'rgba(96,165,250,0.14)' },
  { name: 'Expert', min: 2000, max: 4999, color: '#7C5CF6', soft: 'rgba(124,92,246,0.14)' },
  { name: 'Master', min: 5000, max: 9999, color: '#F4B26C', soft: 'rgba(244,178,108,0.14)' },
  { name: 'Legend', min: 10000, max: Infinity, color: '#FBBF24', soft: 'rgba(251,191,36,0.14)' },
]

const USER_KARMA = 3640
const USER_TOKENS = 4280
const USER_CREDITS = 320
const currentLevelIdx = KARMA_LEVELS.findIndex((l) => USER_KARMA >= l.min && USER_KARMA <= l.max)
const currentLevel = KARMA_LEVELS[currentLevelIdx]
const nextLevel = KARMA_LEVELS[currentLevelIdx + 1]
const progressInLevel = nextLevel
  ? ((USER_KARMA - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
  : 100

const INVOICES = [
  { id: 'INV-2026-006', date: 'May 4, 2026', plan: 'Studio Annual', amount: '$380.00' },
  { id: 'INV-2025-022', date: 'Mar 12, 2026', plan: 'Studio Annual', amount: '$380.00' },
  { id: 'INV-2025-014', date: 'Mar 12, 2025', plan: 'Studio Annual', amount: '$380.00' },
  { id: 'INV-2024-031', date: 'Mar 12, 2024', plan: 'Studio Monthly', amount: '$39.00' },
  { id: 'INV-2024-019', date: 'Feb 12, 2024', plan: 'Studio Monthly', amount: '$39.00' },
]

const PLAN_FEATURES = [
  'Unlimited course creation & publishing',
  'Evaluator panel access & scheduling',
  'Revenue sharing & payout dashboard',
  'Advanced analytics & learner insights',
  'Priority review queue',
  'White-label certificate branding',
  'Studio AI tools (Synthia)',
  'Karma boosts ×2.0 on answered questions',
]

export default function CreatorSubscription() {
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')
  const [selectedHmn, setSelectedHmn] = useState(1)
  const [selectedCredit, setSelectedCredit] = useState(1)

  return (
    <CreatorShell activeId="subscription">
      {/* Page header */}
      <div className="mb-6">
        <p
          className="hm-mono text-[10.5px] mb-2"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
        >
          ACCOUNT
        </p>
        <h1
          className="text-[26px] font-semibold tracking-tight"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
        >
          Subscription &amp; Wallet
        </h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
          Manage your Studio plan, tokens, credits and karma standing.
        </p>
      </div>

      {/* ── Current plan card ── */}
      <div
        className="relative overflow-hidden rounded-2xl mb-5 p-6"
        style={{
          background: 'linear-gradient(135deg,#1c1408 0%,#241a0e 55%,#120f08 100%)',
          border: `1px solid ${ACCENT}30`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 90% 10%,${ACCENT}28 0%,transparent 55%)`,
          }}
        />
        <div className="relative flex flex-wrap items-start gap-6">
          <div className="flex-1 min-w-[220px]">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="hm-mono rounded px-2 py-0.5 text-[10px] font-bold"
                style={{
                  background: ACCENT_SOFT,
                  color: ACCENT,
                  border: `1px solid ${ACCENT}40`,
                  letterSpacing: '0.14em',
                }}
              >
                STUDIO
              </span>
              <span
                className="hm-mono rounded px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  background: 'rgba(94,230,168,0.12)',
                  color: GREEN,
                  border: `1px solid ${GREEN}40`,
                  letterSpacing: '0.1em',
                }}
              >
                ACTIVE
              </span>
            </div>
            <p
              className="text-[22px] font-bold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
            >
              Studio Annual
            </p>
            <p className="hm-mono text-[12px] mt-1" style={{ color: 'var(--hm-text-dim)' }}>
              $380.00 / year · renews <span style={{ color: 'var(--hm-text)' }}>Mar 12, 2027</span>
            </p>
          </div>
          <div className="flex-1 min-w-[220px]">
            <ul className="grid grid-cols-1 gap-1.5">
              {PLAN_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-[12px]"
                  style={{ color: 'var(--hm-text-muted)' }}
                >
                  <Check className="h-3 w-3 shrink-0" style={{ color: GREEN }} /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2 shrink-0 min-w-[140px]">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[12.5px] font-semibold"
              style={{ background: ACCENT, color: '#0f0f0f' }}
            >
              <ArrowUpRight className="h-3.5 w-3.5" /> Change plan
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[12.5px] font-medium"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              <CreditCard className="h-3.5 w-3.5" /> Update payment
            </button>
            {!confirmCancel ? (
              <button
                type="button"
                onClick={() => setConfirmCancel(true)}
                className="text-[11.5px] text-center"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                Cancel subscription
              </button>
            ) : (
              <div
                className="rounded-lg px-3 py-2.5"
                style={{
                  background: 'rgba(244,99,110,0.08)',
                  border: '1px solid rgba(244,99,110,0.22)',
                }}
              >
                <p className="text-[11px] mb-2 text-center" style={{ color: RED }}>
                  Cancel at end of billing period?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmCancel(false)}
                    className="flex-1 rounded px-2 py-1 text-[11px] font-semibold"
                    style={{ background: 'var(--hm-bg-card)', color: 'var(--hm-text-muted)' }}
                  >
                    Keep plan
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded px-2 py-1 text-[11px] font-semibold"
                    style={{ background: 'rgba(244,99,110,0.16)', color: RED }}
                  >
                    Yes, cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Available plans ── */}
      <div
        className="rounded-2xl overflow-hidden mb-5"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        <div
          className="flex items-center justify-between gap-4 px-5 py-3.5"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          <h2 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            All creator plans
          </h2>
          <div
            className="flex items-center rounded-full p-0.5"
            style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
          >
            {(['monthly', 'yearly'] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBilling(b)}
                className="h-7 px-4 rounded-full text-[11.5px] font-medium transition-all"
                style={{
                  background: billing === b ? ACCENT_SOFT : 'transparent',
                  color: billing === b ? ACCENT : 'var(--hm-text-muted)',
                  border: billing === b ? `1px solid ${ACCENT}44` : '1px solid transparent',
                }}
              >
                {b === 'monthly' ? 'Monthly' : 'Yearly'}
                {b === 'yearly' && (
                  <span
                    className="hm-mono ml-1.5 text-[9px] font-semibold"
                    style={{ color: GREEN }}
                  >
                    −20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3">
          {PLANS.map((p, idx) => {
            const price = billing === 'monthly' ? p.priceMonthly : p.priceYearly
            return (
              <div
                key={p.id}
                className="p-5 relative flex flex-col gap-4"
                style={{
                  background: p.current ? `${p.color}08` : 'transparent',
                  borderRight: idx < PLANS.length - 1 ? '1px solid var(--hm-border)' : 'none',
                }}
              >
                {p.highlight && (
                  <span
                    className="hm-mono absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[9px] font-bold"
                    style={{ background: p.color, color: '#0a0a0a', letterSpacing: '0.10em' }}
                  >
                    YOUR PLAN
                  </span>
                )}
                {p.current && (
                  <span
                    className="hm-mono absolute top-3 right-3 rounded px-1.5 py-0.5 text-[9px] font-bold"
                    style={{
                      background: `${p.color}22`,
                      color: p.color,
                      border: `1px solid ${p.color}44`,
                    }}
                  >
                    CURRENT
                  </span>
                )}
                <div>
                  <p
                    className="text-[16px] font-semibold mb-0.5"
                    style={{ color: p.current ? p.color : 'var(--hm-text)' }}
                  >
                    {p.name}
                  </p>
                  <p className="text-[11.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                    {p.tagline}
                  </p>
                </div>
                <div>
                  {price === 0 ? (
                    <p
                      className="hm-mono text-[28px] font-bold leading-none"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      Free
                    </p>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span
                        className="hm-mono text-[28px] font-bold leading-none"
                        style={{ color: p.current ? p.color : 'var(--hm-text)' }}
                      >
                        ${price}
                      </span>
                      <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                        /mo{billing === 'yearly' ? ', billed yearly' : ''}
                      </span>
                    </div>
                  )}
                  {price > 0 && billing === 'yearly' && (
                    <p
                      className="hm-mono text-[10px] mt-0.5"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      ${price * 12}/yr · save 20%
                    </p>
                  )}
                </div>
                <ul className="flex flex-col gap-1.5 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-[11.5px]"
                      style={{ color: 'var(--hm-text-muted)' }}
                    >
                      <Check
                        className="h-3 w-3 shrink-0 mt-0.5"
                        style={{ color: p.current ? p.color : GREEN }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="w-full h-8 rounded-lg text-[12px] font-semibold"
                  style={
                    p.current
                      ? {
                          background: `${p.color}18`,
                          color: p.color,
                          border: `1px solid ${p.color}44`,
                          cursor: 'default',
                        }
                      : p.id === 'basic'
                        ? {
                            background: 'var(--hm-bg-card-2)',
                            border: '1px solid var(--hm-border)',
                            color: 'var(--hm-text-muted)',
                          }
                        : {
                            background: `linear-gradient(135deg,${p.color},${p.color}cc)`,
                            color: 'var(--hm-bg)',
                          }
                  }
                >
                  {p.cta}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Wallet row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {/* HMN */}
        <div
          className="rounded-xl p-4 flex flex-col gap-3"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
              style={{ background: ACCENT_SOFT, color: ACCENT }}
            >
              <Zap className="h-4 w-4" />
            </span>
            <span
              className="hm-mono text-[10px] font-semibold"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
            >
              HMN TOKENS
            </span>
          </div>
          <div>
            <p
              className="hm-mono text-[26px] font-bold leading-none"
              style={{ color: 'var(--hm-text)' }}
            >
              {USER_TOKENS.toLocaleString()}
            </p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
              Use to unlock premium features &amp; boosts
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[12px] font-semibold self-start"
            style={{ color: ACCENT }}
          >
            Top up tokens <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>

        {/* Credits */}
        <div
          className="rounded-xl p-4 flex flex-col gap-3"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
              style={{ background: VIOLET_SOFT, color: VIOLET }}
            >
              <Coins className="h-4 w-4" />
            </span>
            <span
              className="hm-mono text-[10px] font-semibold"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
            >
              CREDITS
            </span>
          </div>
          <div>
            <p
              className="hm-mono text-[26px] font-bold leading-none"
              style={{ color: 'var(--hm-text)' }}
            >
              {USER_CREDITS}
            </p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
              Spend on course materials &amp; certifications
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[12px] font-semibold self-start"
            style={{ color: VIOLET }}
          >
            Buy credits <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>

        {/* Karma */}
        <div
          className="rounded-xl p-4 flex flex-col gap-3"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
              style={{ background: TEAL_SOFT, color: TEAL }}
            >
              <Sparkles className="h-4 w-4" />
            </span>
            <span
              className="hm-mono text-[10px] font-semibold"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
            >
              KARMA
            </span>
            <span
              className="ml-auto hm-mono rounded px-1.5 py-0.5 text-[9.5px] font-bold"
              style={{
                background: currentLevel.soft,
                color: currentLevel.color,
                border: `1px solid ${currentLevel.color}40`,
              }}
            >
              {currentLevel.name.toUpperCase()}
            </span>
          </div>
          <div>
            <p
              className="hm-mono text-[26px] font-bold leading-none"
              style={{ color: 'var(--hm-text)' }}
            >
              {USER_KARMA.toLocaleString()}
            </p>
            {nextLevel && (
              <p className="text-[12px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
                {(nextLevel.min - USER_KARMA).toLocaleString()} to{' '}
                <span style={{ color: nextLevel.color }}>{nextLevel.name}</span>
              </p>
            )}
          </div>
          {nextLevel && (
            <div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: 'var(--hm-bg-card-2)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progressInLevel}%`,
                    background: `linear-gradient(90deg,${currentLevel.color},${nextLevel.color})`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="hm-mono text-[9.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                  {currentLevel.min.toLocaleString()}
                </span>
                <span className="hm-mono text-[9.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                  {nextLevel.min.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Buy HMN / Credits with Stripe ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Buy HMN */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--hm-bg-card)', border: `1px solid ${ACCENT}30` }}
        >
          <div
            className="flex items-center gap-3 px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--hm-border)' }}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
              style={{ background: ACCENT_SOFT, color: ACCENT }}
            >
              <Zap className="h-3.5 w-3.5" />
            </span>
            <div className="flex-1">
              <h3 className="text-[13.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Buy HMN Tokens
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                Purchase HMN directly with your card via Stripe
              </p>
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="flex flex-col gap-1.5 mb-4">
              {HMN_PACKS.map((pack, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedHmn(i)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full transition-all"
                  style={{
                    background: selectedHmn === i ? ACCENT_SOFT : 'var(--hm-bg-card-2)',
                    border: `1px solid ${selectedHmn === i ? `${ACCENT}55` : 'var(--hm-border)'}`,
                  }}
                >
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full shrink-0"
                    style={{
                      background: selectedHmn === i ? ACCENT : 'var(--hm-bg-card)',
                      border: `2px solid ${selectedHmn === i ? ACCENT : 'var(--hm-border)'}`,
                    }}
                  >
                    {selectedHmn === i && (
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: 'var(--hm-bg)' }}
                      />
                    )}
                  </span>
                  <span
                    className="hm-mono text-[13px] font-semibold flex-1"
                    style={{ color: selectedHmn === i ? ACCENT : 'var(--hm-text)' }}
                  >
                    {pack.hmn.toLocaleString()} HMN
                  </span>
                  {pack.badge && (
                    <span
                      className="hm-mono text-[9px] px-1.5 py-0.5 rounded"
                      style={{
                        background: 'rgba(94,230,168,0.12)',
                        color: GREEN,
                        border: `1px solid ${GREEN}30`,
                      }}
                    >
                      {pack.badge}
                    </span>
                  )}
                  <span
                    className="hm-mono text-[13px] font-bold"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    ${pack.price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl text-[13px] font-semibold"
              style={{
                background: 'linear-gradient(135deg,#635BFF 0%,#7C73FF 100%)',
                color: 'white',
                boxShadow: '0 8px 20px -8px rgba(99,91,255,0.55)',
              }}
            >
              <CreditCard className="h-4 w-4" />
              Pay ${HMN_PACKS[selectedHmn].price.toFixed(2)} with Stripe
            </button>
          </div>
        </div>

        {/* Buy Credits */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--hm-bg-card)', border: `1px solid ${VIOLET}30` }}
        >
          <div
            className="flex items-center gap-3 px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--hm-border)' }}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
              style={{ background: VIOLET_SOFT, color: VIOLET }}
            >
              <Coins className="h-3.5 w-3.5" />
            </span>
            <div className="flex-1">
              <h3 className="text-[13.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Buy Credits
              </h3>
              <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                Purchase credits directly with your card via Stripe
              </p>
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="flex flex-col gap-1.5 mb-4">
              {CREDIT_PACKS.map((pack, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedCredit(i)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full transition-all"
                  style={{
                    background: selectedCredit === i ? VIOLET_SOFT : 'var(--hm-bg-card-2)',
                    border: `1px solid ${selectedCredit === i ? `${VIOLET}55` : 'var(--hm-border)'}`,
                  }}
                >
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full shrink-0"
                    style={{
                      background: selectedCredit === i ? VIOLET : 'var(--hm-bg-card)',
                      border: `2px solid ${selectedCredit === i ? VIOLET : 'var(--hm-border)'}`,
                    }}
                  >
                    {selectedCredit === i && (
                      <span className="h-2 w-2 rounded-full" style={{ background: 'white' }} />
                    )}
                  </span>
                  <span
                    className="hm-mono text-[13px] font-semibold flex-1"
                    style={{ color: selectedCredit === i ? VIOLET : 'var(--hm-text)' }}
                  >
                    {pack.cr.toLocaleString()} Credits
                  </span>
                  {pack.badge && (
                    <span
                      className="hm-mono text-[9px] px-1.5 py-0.5 rounded"
                      style={{
                        background: 'rgba(94,230,168,0.12)',
                        color: GREEN,
                        border: `1px solid ${GREEN}30`,
                      }}
                    >
                      {pack.badge}
                    </span>
                  )}
                  <span
                    className="hm-mono text-[13px] font-bold"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    ${pack.price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-xl text-[13px] font-semibold"
              style={{
                background: 'linear-gradient(135deg,#635BFF 0%,#7C73FF 100%)',
                color: 'white',
                boxShadow: '0 8px 20px -8px rgba(99,91,255,0.55)',
              }}
            >
              <CreditCard className="h-4 w-4" />
              Pay ${CREDIT_PACKS[selectedCredit].price.toFixed(2)} with Stripe
            </button>
          </div>
        </div>
      </div>

      {/* ── Karma Level Ladder ── */}
      <div
        className="rounded-2xl p-5 mb-5"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-4 w-4" style={{ color: ACCENT }} />
          <h2 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            Karma Levels
          </h2>
          <span className="hm-mono text-[10.5px] ml-1" style={{ color: 'var(--hm-text-dim)' }}>
            · earn karma by answering questions, peer reviews &amp; published content
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {KARMA_LEVELS.map((lvl, i) => {
            const isActive = i === currentLevelIdx
            const isPast = i < currentLevelIdx
            return (
              <div
                key={lvl.name}
                className="rounded-xl p-3 flex flex-col gap-2 relative overflow-hidden"
                style={{
                  background: isActive ? lvl.soft : 'var(--hm-bg-card-2)',
                  border: `1px solid ${isActive ? lvl.color + '60' : 'var(--hm-border)'}`,
                  opacity: isPast ? 0.55 : 1,
                }}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full"
                    style={{ background: lvl.color, boxShadow: `0 0 6px ${lvl.color}` }}
                  />
                )}
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    background: isActive ? lvl.color + '28' : 'var(--hm-bg-card)',
                    border: `1px solid ${lvl.color}40`,
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" style={{ color: lvl.color }} />
                </div>
                <div>
                  <p
                    className="text-[12.5px] font-semibold"
                    style={{ color: isActive ? lvl.color : 'var(--hm-text)' }}
                  >
                    {lvl.name}
                  </p>
                  <p className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                    {lvl.max === Infinity
                      ? `${lvl.min.toLocaleString()}+`
                      : `${lvl.min.toLocaleString()}–${lvl.max.toLocaleString()}`}
                  </p>
                </div>
                {isActive && (
                  <span className="hm-mono text-[9.5px] font-semibold" style={{ color: lvl.color }}>
                    ← You are here
                  </span>
                )}
                {isPast && (
                  <span className="hm-mono text-[9.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                    Completed ✓
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Billing history ── */}
      <div
        className="rounded-2xl overflow-hidden mb-2"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        <div
          className="flex items-center gap-3 px-5 py-3.5"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          <RefreshCw className="h-3.5 w-3.5" style={{ color: ACCENT }} />
          <h2 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            Billing History
          </h2>
        </div>
        <table className="w-full text-left text-[12.5px]">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--hm-border)' }}>
              {['Date', 'Invoice', 'Plan', 'Amount', 'Status', ''].map((h) => (
                <th
                  key={h}
                  className="hm-mono px-5 py-2.5 text-[10px] font-semibold"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv, idx) => (
              <tr
                key={inv.id}
                style={{
                  borderTop: idx === 0 ? 'none' : '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                }}
              >
                <td className="px-5 py-3" style={{ color: 'var(--hm-text-muted)' }}>
                  {inv.date}
                </td>
                <td
                  className="px-5 py-3 hm-mono text-[11.5px]"
                  style={{ color: 'var(--hm-text-dim)' }}
                >
                  {inv.id}
                </td>
                <td className="px-5 py-3">{inv.plan}</td>
                <td className="px-5 py-3 hm-mono font-semibold">{inv.amount}</td>
                <td className="px-5 py-3">
                  <span
                    className="hm-mono rounded px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      background: 'rgba(94,230,168,0.12)',
                      color: GREEN,
                      border: `1px solid ${GREEN}40`,
                    }}
                  >
                    PAID
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    type="button"
                    title="Download invoice"
                    className="flex h-7 w-7 items-center justify-center rounded-md ml-auto"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      border: '1px solid var(--hm-border)',
                      color: 'var(--hm-text-dim)',
                    }}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CreatorShell>
  )
}
