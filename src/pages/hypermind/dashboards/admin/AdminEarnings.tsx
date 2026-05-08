import { useState, type ReactNode } from 'react'
import AdminShell from '../_shared/AdminShell'
import {
  TrendingUp,
  Wallet,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ChevronDown,
  ChevronRight,
  Coins,
  Award,
  Banknote,
  Send,
  AlertCircle,
  CheckCircle2,
  MoreHorizontal,
  DollarSign,
  Percent,
  Users,
  CreditCard,
} from 'lucide-react'

const ACCENT = '#F4636E'
const ACCENT_SOFT = 'rgba(244,99,110,0.10)'
const VIOLET = '#7C5CF6'
const VIOLET_SOFT = 'rgba(124,92,246,0.14)'
const TEAL = '#5BC8C5'
const TEAL_SOFT = 'rgba(91,200,197,0.12)'
const GREEN = '#5EE6A8'
const RED = '#F4636E'
const AMBER = '#F4B26C'
const AMBER_SOFT = 'rgba(244,178,108,0.12)'
const BLUE = '#60A5FA'

type Tone = 'success' | 'warning' | 'danger' | 'info' | 'violet' | 'teal' | 'neutral' | 'amber'
const TONE_BG: Record<Tone, string> = {
  success: 'rgba(94,230,168,0.12)',
  warning: 'rgba(244,178,108,0.14)',
  danger: 'rgba(244,99,110,0.12)',
  info: 'rgba(96,165,250,0.12)',
  violet: 'rgba(124,92,246,0.14)',
  teal: 'rgba(91,200,197,0.14)',
  neutral: 'rgba(139,146,168,0.14)',
  amber: 'rgba(244,178,108,0.14)',
}
const TONE_FG: Record<Tone, string> = {
  success: GREEN,
  warning: AMBER,
  danger: RED,
  info: BLUE,
  violet: VIOLET,
  teal: TEAL,
  neutral: '#8B92A8',
  amber: AMBER,
}

type TxType =
  | 'subscription'
  | 'credit_purchase'
  | 'platform_fee_hmn'
  | 'platform_fee_credits'
  | 'creator_payout_hmn'
  | 'creator_payout_credits'
  | 'treasury_transfer'
type TxStatus = 'completed' | 'pending' | 'processing' | 'failed'
type Currency = 'USD' | 'HMN' | 'Credits'

interface Tx {
  id: string
  date: string
  type: TxType
  currency: Currency
  description: string
  party: string
  amount: number
  status: TxStatus
}

const KIND_LABEL: Record<TxType, string> = {
  subscription: 'Subscription',
  credit_purchase: 'Credit purchase',
  platform_fee_hmn: 'Platform fee (HMN)',
  platform_fee_credits: 'Platform fee (Credits)',
  creator_payout_hmn: 'Creator payout (HMN)',
  creator_payout_credits: 'Creator payout (Credits)',
  treasury_transfer: 'Treasury transfer',
}
const KIND_TONE: Record<TxType, Tone> = {
  subscription: 'violet',
  credit_purchase: 'info',
  platform_fee_hmn: 'success',
  platform_fee_credits: 'teal',
  creator_payout_hmn: 'warning',
  creator_payout_credits: 'amber',
  treasury_transfer: 'neutral',
}
const STATUS_TONE: Record<TxStatus, Tone> = {
  completed: 'success',
  pending: 'warning',
  processing: 'info',
  failed: 'danger',
}

const TX: Tx[] = [
  {
    id: 't-01',
    date: 'Apr 28, 2026',
    type: 'subscription',
    currency: 'USD',
    description: 'Studio Monthly — renewal',
    party: 'Sarah Lin',
    amount: 249,
    status: 'completed',
  },
  {
    id: 't-02',
    date: 'Apr 28, 2026',
    type: 'platform_fee_hmn',
    currency: 'HMN',
    description: 'Course unlock: Watercolor Found.',
    party: 'Mei Chen',
    amount: +24,
    status: 'completed',
  },
  {
    id: 't-03',
    date: 'Apr 28, 2026',
    type: 'platform_fee_credits',
    currency: 'Credits',
    description: 'Assessment unlock: Color Theory',
    party: 'Priya Sharma',
    amount: +12,
    status: 'completed',
  },
  {
    id: 't-04',
    date: 'Apr 27, 2026',
    type: 'credit_purchase',
    currency: 'USD',
    description: '500 credits pack',
    party: 'Aisha Rahman',
    amount: 49,
    status: 'completed',
  },
  {
    id: 't-05',
    date: 'Apr 27, 2026',
    type: 'creator_payout_hmn',
    currency: 'HMN',
    description: 'Creator payout to 0x3f…8a2d',
    party: 'Sarah Lin',
    amount: -96,
    status: 'processing',
  },
  {
    id: 't-06',
    date: 'Apr 26, 2026',
    type: 'platform_fee_hmn',
    currency: 'HMN',
    description: 'Course unlock: Personal Finance',
    party: 'Daniel Becker',
    amount: +36,
    status: 'completed',
  },
  {
    id: 't-07',
    date: 'Apr 25, 2026',
    type: 'subscription',
    currency: 'USD',
    description: 'Pro Monthly — new subscriber',
    party: 'Khalid Hassan',
    amount: 99,
    status: 'completed',
  },
  {
    id: 't-08',
    date: 'Apr 24, 2026',
    type: 'creator_payout_credits',
    currency: 'Credits',
    description: 'Creator payout to bank •••• 4290',
    party: 'Priya Sharma',
    amount: -3000,
    status: 'completed',
  },
  {
    id: 't-09',
    date: 'Apr 23, 2026',
    type: 'platform_fee_credits',
    currency: 'Credits',
    description: 'Course unlock: Korean N3 Prep',
    party: 'Khalid Hassan',
    amount: +60,
    status: 'pending',
  },
  {
    id: 't-10',
    date: 'Apr 22, 2026',
    type: 'treasury_transfer',
    currency: 'HMN',
    description: 'Moved 2,000 HMN to treasury',
    party: 'Platform',
    amount: -2000,
    status: 'completed',
  },
  {
    id: 't-11',
    date: 'Apr 21, 2026',
    type: 'credit_purchase',
    currency: 'USD',
    description: '1000 credits pack',
    party: 'Omar Haddad',
    amount: 89,
    status: 'completed',
  },
  {
    id: 't-12',
    date: 'Apr 20, 2026',
    type: 'platform_fee_hmn',
    currency: 'HMN',
    description: 'Assessment unlock: Final Test',
    party: 'Camila Ortega',
    amount: +8,
    status: 'completed',
  },
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

function SectionCard({
  eyebrow,
  title,
  action,
  children,
}: {
  eyebrow: string
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
    >
      <div
        className="px-5 py-3.5 flex items-center justify-between gap-3"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <div>
          <p
            className="hm-mono text-[9.5px] mb-0.5"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
          >
            {eyebrow.toUpperCase()}
          </p>
          <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            {title}
          </h3>
        </div>
        {action}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between text-[12px] py-1.5"
      style={{ borderBottom: '1px solid var(--hm-border)' }}
    >
      <span style={{ color: 'var(--hm-text-dim)' }}>{label}</span>
      <span className="hm-mono font-medium" style={{ color: 'var(--hm-text)' }}>
        {value}
      </span>
    </div>
  )
}

/* ── Treasury Transfer Modal ── */
function TreasuryModal({
  currency,
  onClose,
}: {
  currency: 'HMN' | 'Credits'
  onClose: () => void
}) {
  const isHMN = currency === 'HMN'
  const color = isHMN ? VIOLET : TEAL
  const soft = isHMN ? VIOLET_SOFT : TEAL_SOFT
  const balance = isHMN ? '14,820 HMN' : '38,640 credits'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(0,0,0,0.70)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="w-[420px] rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--hm-bg-card-2) 0%, var(--hm-bg-card) 100%)',
          border: '1px solid var(--hm-border-strong)',
          boxShadow: '0 40px 80px -12px rgba(0,0,0,0.90)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
            style={{ background: soft, boxShadow: `0 0 18px ${color}33` }}
          >
            {isHMN ? (
              <Coins className="h-4 w-4" style={{ color }} />
            ) : (
              <Award className="h-4 w-4" style={{ color }} />
            )}
          </span>
          <div className="flex-1">
            <h3
              className="text-[15px] font-semibold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
            >
              Transfer {currency} to Treasury
            </h3>
            <p className="text-[11.5px]" style={{ color: 'var(--hm-text-dim)' }}>
              Available:{' '}
              <span className="hm-mono font-semibold" style={{ color }}>
                {balance}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="hm-mono text-[11px] px-2 py-1 rounded"
            style={{ background: 'var(--hm-bg-card-2)', color: 'var(--hm-text-dim)' }}
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-3.5">
          {/* Amount */}
          <div>
            <label
              className="hm-mono text-[9.5px] font-bold block mb-1.5"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
            >
              AMOUNT TO TRANSFER
            </label>
            <div className="flex items-center gap-2">
              <div
                className="flex-1 flex items-center gap-2 px-3 h-10 rounded-lg"
                style={{ background: 'var(--hm-bg-card-2)', border: `1px solid ${color}44` }}
              >
                {isHMN ? (
                  <Coins className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                ) : (
                  <Award className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                )}
                <span
                  className="hm-mono text-[14px] font-semibold"
                  style={{ color: 'var(--hm-text)' }}
                >
                  {isHMN ? '14,820' : '38,640'}
                </span>
              </div>
              <button
                type="button"
                className="hm-mono text-[10.5px] px-3 h-10 rounded-lg font-semibold"
                style={{ background: soft, color, border: `1px solid ${color}33` }}
              >
                MAX
              </button>
            </div>
          </div>

          {/* Destination */}
          <div>
            <label
              className="hm-mono text-[9.5px] font-bold block mb-1.5"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
            >
              {isHMN ? 'TREASURY WALLET' : 'COMPANY BANK ACCOUNT'}
            </label>
            <div
              className="flex items-center gap-2 px-3 h-10 rounded-lg"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border-strong)',
              }}
            >
              <span className="hm-mono text-[12px]" style={{ color: 'var(--hm-text-muted)' }}>
                {isHMN ? '0xPLATFORM…treasury' : 'Company •••• 8800'}
              </span>
              <span className="ml-auto">
                <CheckCircle2 className="h-3.5 w-3.5" style={{ color: GREEN }} />
              </span>
            </div>
          </div>

          {/* Notice */}
          <div
            className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl"
            style={{
              background: 'rgba(96,165,250,0.08)',
              border: '1px solid rgba(96,165,250,0.20)',
            }}
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: BLUE }} />
            <p className="text-[11.5px]" style={{ color: 'var(--hm-text-muted)' }}>
              {isHMN
                ? "Transfers HMN to the platform's multi-sig treasury wallet. Gas fees apply. Requires 2-of-3 admin signatures."
                : 'Credits convert at $0.01/credit and wire to the company bank account. 1–3 business days.'}
            </p>
          </div>

          {/* Summary */}
          <div
            className="rounded-xl p-3"
            style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
          >
            {[
              { label: 'Transfer amount', value: isHMN ? '14,820 HMN' : '38,640 credits' },
              { label: 'Network / bank fee', value: isHMN ? '~4 HMN' : 'None' },
              { label: 'Treasury receives', value: isHMN ? '14,816 HMN' : '$386.40 USD' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between text-[12px] py-1.5"
                style={{ borderBottom: '1px solid var(--hm-border)' }}
              >
                <span style={{ color: 'var(--hm-text-dim)' }}>{label}</span>
                <span className="hm-mono font-semibold" style={{ color }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-5 pb-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-10 rounded-xl text-[13px] font-medium"
            style={{
              background: 'var(--hm-bg-card-2)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-muted)',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-xl text-[13px] font-semibold"
            style={{
              background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
              color: isHMN ? 'white' : '#0a1e1e',
              boxShadow: `0 8px 24px -8px ${color}66`,
            }}
          >
            <Send className="h-3.5 w-3.5" />
            Confirm transfer
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main page ── */
export default function AdminEarnings() {
  const [transferModal, setTransferModal] = useState<'HMN' | 'Credits' | null>(null)

  return (
    <AdminShell activeId="earnings">
      {transferModal && (
        <TreasuryModal currency={transferModal} onClose={() => setTransferModal(null)} />
      )}

      {/* ── Page header ── */}
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p
            className="hm-mono text-[10.5px] mb-2"
            style={{ color: ACCENT, letterSpacing: '0.18em' }}
          >
            FINANCE
          </p>
          <h1
            className="text-[26px] font-semibold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            Platform Earnings
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            Platform takes 20% fee on every course & assessment unlock · the remaining 80% goes to
            creators.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
          style={{
            background: 'var(--hm-bg-card)',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text-muted)',
          }}
        >
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      {/* ── Treasury balance cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
        {/* HMN Treasury */}
        <div
          className="relative overflow-hidden rounded-2xl px-5 py-4"
          style={{
            background: 'linear-gradient(135deg, var(--hm-bg-card) 0%, var(--hm-bg-card-2) 100%)',
            border: `1px solid ${VIOLET}33`,
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${VIOLET}22 0%, transparent 60%)`,
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: VIOLET_SOFT, color: VIOLET }}
              >
                <Coins className="h-3.5 w-3.5" />
              </span>
              <p className="hm-mono text-[10px]" style={{ color: VIOLET, letterSpacing: '0.16em' }}>
                HMN TREASURY
              </p>
            </div>
            <p
              className="hm-mono text-[34px] font-semibold leading-none mb-1"
              style={{ color: 'var(--hm-text)' }}
            >
              14,820
              <span className="text-[18px] ml-1.5" style={{ color: 'var(--hm-text-dim)' }}>
                HMN
              </span>
            </p>
            <p className="text-[11.5px] mb-4" style={{ color: 'var(--hm-text-muted)' }}>
              Pending clearance:{' '}
              <span className="hm-mono font-semibold" style={{ color: VIOLET }}>
                1,240 HMN
              </span>{' '}
              · This month:{' '}
              <span className="hm-mono font-semibold" style={{ color: GREEN }}>
                +2,840 HMN
              </span>
            </p>
            <button
              type="button"
              onClick={() => setTransferModal('HMN')}
              className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{
                background: `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`,
                color: 'white',
                boxShadow: `0 8px 20px -8px ${VIOLET}55`,
              }}
            >
              <ArrowUpRight className="h-3.5 w-3.5" /> Transfer to Treasury
            </button>
          </div>
        </div>

        {/* Credits Treasury */}
        <div
          className="relative overflow-hidden rounded-2xl px-5 py-4"
          style={{
            background: 'linear-gradient(135deg, var(--hm-bg-card) 0%, var(--hm-bg-card-2) 100%)',
            border: `1px solid ${TEAL}33`,
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${TEAL}18 0%, transparent 60%)`,
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: TEAL_SOFT, color: TEAL }}
              >
                <Award className="h-3.5 w-3.5" />
              </span>
              <p className="hm-mono text-[10px]" style={{ color: TEAL, letterSpacing: '0.16em' }}>
                CREDITS TREASURY
              </p>
            </div>
            <p
              className="hm-mono text-[34px] font-semibold leading-none mb-1"
              style={{ color: 'var(--hm-text)' }}
            >
              38,640
              <span className="text-[18px] ml-1.5" style={{ color: 'var(--hm-text-dim)' }}>
                CR
              </span>
            </p>
            <p className="text-[11.5px] mb-4" style={{ color: 'var(--hm-text-muted)' }}>
              Pending clearance:{' '}
              <span className="hm-mono font-semibold" style={{ color: TEAL }}>
                4,200 CR
              </span>{' '}
              · This month:{' '}
              <span className="hm-mono font-semibold" style={{ color: GREEN }}>
                +9,120 CR
              </span>
            </p>
            <button
              type="button"
              onClick={() => setTransferModal('Credits')}
              className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{
                background: `linear-gradient(135deg, ${TEAL} 0%, #7dd3d1 100%)`,
                color: '#0a1e1e',
                boxShadow: `0 8px 20px -8px ${TEAL}55`,
              }}
            >
              <Banknote className="h-3.5 w-3.5" /> Transfer to Bank
            </button>
          </div>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          {
            Icon: DollarSign,
            color: GREEN,
            label: 'Revenue this month',
            val: '$12,480',
            sub: 'subscriptions + credit sales',
          },
          {
            Icon: Percent,
            color: VIOLET,
            label: 'Platform fee income',
            val: '↑2,840 HMN',
            sub: 'from course/assessment unlocks',
          },
          {
            Icon: Users,
            color: AMBER,
            label: 'Creator payouts owed',
            val: '$3,840',
            sub: '80% share pending clearance',
          },
          {
            Icon: TrendingUp,
            color: TEAL,
            label: 'Net platform income',
            val: '$8,640',
            sub: 'after creator share deduction',
          },
        ].map(({ Icon, color, label, val, sub }) => (
          <div
            key={label}
            className="rounded-2xl p-4"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                style={{ background: `${color}1f`, color }}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <p
                className="hm-mono text-[9px]"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                {label.toUpperCase()}
              </p>
            </div>
            <p className="hm-mono text-[18px] font-semibold leading-tight" style={{ color }}>
              {val}
            </p>
            <p className="text-[10.5px] mt-1" style={{ color: 'var(--hm-text-dim)' }}>
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* ── Transaction table + sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Table */}
        <div className="col-span-1 lg:col-span-2">
          <SectionCard
            eyebrow="Activity"
            title="Revenue history"
            action={
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="hm-mono inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[10.5px] font-medium"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    color: 'var(--hm-text-muted)',
                    letterSpacing: '0.06em',
                  }}
                >
                  ALL TYPES <ChevronDown className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  className="hm-mono inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[10.5px] font-medium"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    color: 'var(--hm-text-muted)',
                    letterSpacing: '0.06em',
                  }}
                >
                  <Download className="h-3 w-3" /> EXPORT
                </button>
              </div>
            }
          >
            <div className="-mx-5 -my-4 overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr style={{ background: 'var(--hm-bg-card-2)' }}>
                    {['Date', 'Description', 'Party', 'Type', 'Currency', 'Amount', 'Status'].map(
                      (h, i) => (
                        <th
                          key={h}
                          className="hm-mono text-[9.5px] font-semibold px-3.5 py-2.5 whitespace-nowrap"
                          style={{
                            color: 'var(--hm-text-dim)',
                            letterSpacing: '0.10em',
                            textAlign: i >= 5 ? 'right' : 'left',
                          }}
                        >
                          {h.toUpperCase()}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {TX.map((t) => {
                    const isIncoming = t.amount >= 0
                    const ccy = t.currency === 'USD' ? AMBER : t.currency === 'HMN' ? VIOLET : TEAL
                    return (
                      <tr key={t.id} style={{ borderTop: '1px solid var(--hm-border)' }}>
                        <td className="px-3.5 py-2.5 whitespace-nowrap">
                          <span
                            className="hm-mono text-[10.5px]"
                            style={{ color: 'var(--hm-text-dim)' }}
                          >
                            {t.date}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 max-w-[160px]">
                          <p className="text-[12px] truncate" style={{ color: 'var(--hm-text)' }}>
                            {t.description}
                          </p>
                        </td>
                        <td className="px-3.5 py-2.5 max-w-[100px]">
                          <p
                            className="text-[11.5px] truncate"
                            style={{ color: 'var(--hm-text-muted)' }}
                          >
                            {t.party}
                          </p>
                        </td>
                        <td className="px-3.5 py-2.5">
                          <Pill tone={KIND_TONE[t.type]}>{KIND_LABEL[t.type]}</Pill>
                        </td>
                        <td className="px-3.5 py-2.5">
                          <span
                            className="hm-mono text-[10.5px] font-semibold px-2 py-0.5 rounded"
                            style={{ background: `${ccy}14`, color: ccy }}
                          >
                            {t.currency}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 text-right whitespace-nowrap">
                          <span
                            className="hm-mono inline-flex items-center justify-end gap-1 text-[12px] font-semibold"
                            style={{ color: isIncoming ? GREEN : RED }}
                          >
                            {isIncoming ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {t.currency === 'USD' ? '$' : ''}
                            {Math.abs(t.amount).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 text-right">
                          <Pill tone={STATUS_TONE[t.status]}>{t.status}</Pill>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div
                className="flex items-center justify-between gap-4 px-4 py-2.5"
                style={{
                  borderTop: '1px solid var(--hm-border)',
                  background: 'var(--hm-bg-card-2)',
                }}
              >
                <span
                  className="hm-mono text-[10px]"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
                >
                  SHOWING 1–{TX.length} OF 3,840
                </span>
                <button
                  type="button"
                  className="hm-mono inline-flex items-center gap-1 text-[10px] font-semibold"
                  style={{ color: ACCENT, letterSpacing: '0.12em' }}
                >
                  VIEW ALL <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-4">
          {/* Revenue split */}
          <SectionCard eyebrow="Economics" title="Revenue model">
            <div className="flex flex-col gap-1 mb-4">
              <MetaRow label="Platform fee" value="20%" />
              <MetaRow label="Creator share" value="80%" />
              <MetaRow label="Refund window" value="7 days" />
              <MetaRow label="Payout cycle" value="Rolling" />
            </div>
            <div
              className="rounded-xl p-3"
              style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
            >
              <p
                className="hm-mono text-[9px] mb-2.5"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                EXAMPLE — 240 CR COURSE SALE
              </p>
              {[
                { label: 'Student pays', val: '240 CR', color: 'var(--hm-text)' },
                { label: 'Platform keeps', val: '+48 CR', color: GREEN },
                { label: 'Creator receives', val: '192 CR', color: TEAL },
              ].map(({ label, val, color }) => (
                <div
                  key={label}
                  className="flex items-center justify-between text-[11.5px] py-1.5"
                  style={{ borderBottom: '1px solid var(--hm-border)' }}
                >
                  <span style={{ color: 'var(--hm-text-muted)' }}>{label}</span>
                  <span className="hm-mono font-semibold" style={{ color }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Treasury accounts */}
          <SectionCard eyebrow="Treasury" title="Destination accounts">
            {/* HMN wallet */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                style={{ background: VIOLET_SOFT, color: VIOLET }}
              >
                <Coins className="h-4 w-4" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Treasury wallet
                </p>
                <p className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                  0xPLATFORM…treasury · On-chain
                </p>
              </div>
              <Pill tone="success">verified</Pill>
            </div>
            {/* Bank */}
            <div
              className="flex items-center gap-3 pt-3 mb-4"
              style={{ borderTop: '1px solid var(--hm-border)' }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                style={{ background: TEAL_SOFT, color: TEAL }}
              >
                <Banknote className="h-4 w-4" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Company bank
                </p>
                <p className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                  •••• 8800 · Credits→USD
                </p>
              </div>
              <Pill tone="success">verified</Pill>
            </div>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-1.5 h-8 rounded-md text-[11.5px] font-medium"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              Manage accounts <ChevronRight className="h-3 w-3" />
            </button>
          </SectionCard>

          {/* Pending transfers */}
          <SectionCard eyebrow="Pending" title="In-progress transfers">
            <div className="flex items-start gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0 mt-0.5"
                style={{ background: VIOLET_SOFT, color: VIOLET }}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Creator payout — 96 HMN
                </p>
                <p className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                  Sarah Lin · 0x3f…8a2d · Apr 27, 2026
                </p>
                <div className="mt-1.5">
                  <Pill tone="info">processing</Pill>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </AdminShell>
  )
}
