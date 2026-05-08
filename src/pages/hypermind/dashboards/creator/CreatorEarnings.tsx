import { useState, type ReactNode } from 'react'
import {
  Wallet,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Download,
  ChevronDown,
  Coins,
  Award,
  Banknote,
  Send,
  AlertCircle,
  CheckCircle2,
  MoreHorizontal,
} from 'lucide-react'
import CreatorShell from '../_shared/CreatorShell'

const ACCENT = '#F4B26C'
const ACCENT_DARK = '#1a1208'
const ACCENT_SOFT = 'rgba(244,178,108,0.12)'
const VIOLET = '#7C5CF6'
const VIOLET_SOFT = 'rgba(124,92,246,0.12)'
const TEAL = '#5BC8C5'
const TEAL_SOFT = 'rgba(91,200,197,0.12)'
const GREEN = '#5EE6A8'
const RED = '#F4636E'
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
  warning: ACCENT,
  danger: RED,
  info: BLUE,
  violet: VIOLET,
  teal: TEAL,
  neutral: '#8B92A8',
  amber: ACCENT,
}

type TxType =
  | 'course_sale'
  | 'assessment_sale'
  | 'withdrawal_hmn'
  | 'withdrawal_credits'
  | 'bonus'
  | 'refund'
type TxCurrency = 'HMN' | 'Credits'
type TxStatus = 'completed' | 'pending' | 'processing' | 'failed'

interface Tx {
  id: string
  date: string
  type: TxType
  currency: TxCurrency
  description: string
  student: string
  gross: number
  fee: number
  net: number
  status: TxStatus
}

const KIND_TONE: Record<TxType, Tone> = {
  course_sale: 'success',
  assessment_sale: 'teal',
  withdrawal_hmn: 'violet',
  withdrawal_credits: 'amber',
  bonus: 'warning',
  refund: 'danger',
}
const KIND_LABEL: Record<TxType, string> = {
  course_sale: 'Course sale',
  assessment_sale: 'Assessment sale',
  withdrawal_hmn: 'Withdraw HMN',
  withdrawal_credits: 'Withdraw Credits',
  bonus: 'Bonus',
  refund: 'Refund',
}
const STATUS_TONE: Record<TxStatus, Tone> = {
  completed: 'success',
  pending: 'warning',
  processing: 'info',
  failed: 'danger',
}

const PLATFORM_FEE = 0.2 // 20%

const TX: Tx[] = [
  {
    id: 'tx-01',
    date: 'Apr 28, 2026',
    type: 'course_sale',
    currency: 'HMN',
    description: 'Watercolor Foundations',
    student: 'Mei Chen',
    gross: 120,
    fee: 24,
    net: 96,
    status: 'completed',
  },
  {
    id: 'tx-02',
    date: 'Apr 28, 2026',
    type: 'assessment_sale',
    currency: 'Credits',
    description: 'Color Theory Assessment',
    student: 'Priya Sharma',
    gross: 60,
    fee: 12,
    net: 48,
    status: 'completed',
  },
  {
    id: 'tx-03',
    date: 'Apr 27, 2026',
    type: 'course_sale',
    currency: 'Credits',
    description: 'Spanish for Travelers',
    student: 'Aisha Rahman',
    gross: 240,
    fee: 48,
    net: 192,
    status: 'completed',
  },
  {
    id: 'tx-04',
    date: 'Apr 26, 2026',
    type: 'withdrawal_hmn',
    currency: 'HMN',
    description: 'Withdrawal to 0x3f…8a2d',
    student: '—',
    gross: 800,
    fee: 0,
    net: 800,
    status: 'processing',
  },
  {
    id: 'tx-05',
    date: 'Apr 25, 2026',
    type: 'course_sale',
    currency: 'HMN',
    description: 'Personal Finance 101',
    student: 'Daniel Becker',
    gross: 180,
    fee: 36,
    net: 144,
    status: 'completed',
  },
  {
    id: 'tx-06',
    date: 'Apr 24, 2026',
    type: 'bonus',
    currency: 'HMN',
    description: '5★ review milestone — 700 reviews',
    student: '—',
    gross: 50,
    fee: 0,
    net: 50,
    status: 'completed',
  },
  {
    id: 'tx-07',
    date: 'Apr 23, 2026',
    type: 'assessment_sale',
    currency: 'HMN',
    description: 'Watercolor Final Assessment',
    student: 'Yuki Tanaka',
    gross: 40,
    fee: 8,
    net: 32,
    status: 'completed',
  },
  {
    id: 'tx-08',
    date: 'Apr 22, 2026',
    type: 'withdrawal_credits',
    currency: 'Credits',
    description: 'Withdrawal to bank •••• 4290',
    student: '—',
    gross: 3000,
    fee: 0,
    net: 3000,
    status: 'completed',
  },
  {
    id: 'tx-09',
    date: 'Apr 21, 2026',
    type: 'course_sale',
    currency: 'Credits',
    description: 'Korean N3 Prep',
    student: 'Khalid Hassan',
    gross: 300,
    fee: 60,
    net: 240,
    status: 'pending',
  },
  {
    id: 'tx-10',
    date: 'Apr 20, 2026',
    type: 'refund',
    currency: 'Credits',
    description: 'Acoustic Guitar — refund',
    student: 'Camila Ortega',
    gross: -200,
    fee: 0,
    net: -200,
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between text-[12px] py-1"
      style={{ borderBottom: '1px solid var(--hm-border)' }}
    >
      <span style={{ color: 'var(--hm-text-dim)' }}>{label}</span>
      <span className="hm-mono font-medium" style={{ color: 'var(--hm-text)' }}>
        {value}
      </span>
    </div>
  )
}

/* ── Withdraw modal ── */
function WithdrawModal({ currency, onClose }: { currency: TxCurrency; onClose: () => void }) {
  const isHMN = currency === 'HMN'
  const color = isHMN ? VIOLET : TEAL
  const soft = isHMN ? VIOLET_SOFT : TEAL_SOFT
  const balance = isHMN ? '3,840 HMN' : '12,480 credits'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(0,0,0,0.65)',
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
              Withdraw {currency}
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
              AMOUNT TO WITHDRAW
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
                  {isHMN ? '3,840' : '12,480'}
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
              {isHMN ? 'WALLET ADDRESS' : 'WITHDRAWAL METHOD'}
            </label>
            <div
              className="flex items-center gap-2 px-3 h-10 rounded-lg"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border-strong)',
              }}
            >
              <span className="hm-mono text-[12px]" style={{ color: 'var(--hm-text-muted)' }}>
                {isHMN ? '0x3f…8a2d' : 'Bank •••• 4290'}
              </span>
              <span className="ml-auto">
                <CheckCircle2 className="h-3.5 w-3.5" style={{ color: GREEN }} />
              </span>
            </div>
          </div>

          {/* Fee notice */}
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
                ? 'HMN transfers to your on-chain wallet. Gas fees may apply. Processing time: instant.'
                : 'Credits convert at $0.01/credit and are sent via bank transfer. 1–3 business days.'}
            </p>
          </div>

          {/* Summary row */}
          <div
            className="rounded-xl p-3"
            style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
          >
            {[
              { label: 'You withdraw', value: isHMN ? '3,840 HMN' : '12,480 credits' },
              { label: 'Network fee', value: isHMN ? '~2 HMN' : 'None' },
              { label: 'You receive', value: isHMN ? '3,838 HMN' : '$124.80 USD' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between text-[12px] py-1"
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
            Confirm withdrawal
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CreatorEarnings() {
  const [withdrawModal, setWithdrawModal] = useState<TxCurrency | null>(null)

  const hmnTxs = TX.filter((t) => t.currency === 'HMN')
  const creditTxs = TX.filter((t) => t.currency === 'Credits')

  const hmnEarned = hmnTxs
    .filter((t) => t.net > 0 && t.type !== 'withdrawal_hmn')
    .reduce((s, t) => s + t.net, 0)
  const crEarned = creditTxs
    .filter((t) => t.net > 0 && t.type !== 'withdrawal_credits')
    .reduce((s, t) => s + t.net, 0)

  return (
    <CreatorShell activeId="earnings">
      {withdrawModal && (
        <WithdrawModal currency={withdrawModal} onClose={() => setWithdrawModal(null)} />
      )}

      {/* ── Header ── */}
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
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
            Earnings
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            Students pay with HMN tokens or Credits · platform takes 20% · you receive 80%.
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

      {/* ── Dual-currency balance cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
        {/* HMN Balance */}
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
              background: `radial-gradient(circle at 100% 0%, ${VIOLET}2a 0%, transparent 60%)`,
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
                HMN BALANCE
              </p>
            </div>
            <p
              className="hm-mono text-[34px] font-semibold leading-none mb-1"
              style={{ color: 'var(--hm-text)' }}
            >
              3,840
              <span className="text-[18px] ml-1.5" style={{ color: 'var(--hm-text-dim)' }}>
                HMN
              </span>
            </p>
            <p className="text-[11.5px] mb-4" style={{ color: 'var(--hm-text-muted)' }}>
              Pending clearance:{' '}
              <span className="hm-mono font-semibold" style={{ color: VIOLET }}>
                580 HMN
              </span>{' '}
              · This month:{' '}
              <span className="hm-mono font-semibold" style={{ color: GREEN }}>
                +{hmnEarned} HMN
              </span>
            </p>
            <button
              type="button"
              onClick={() => setWithdrawModal('HMN')}
              className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{
                background: `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`,
                color: 'white',
                boxShadow: `0 8px 20px -8px ${VIOLET}55`,
              }}
            >
              <ArrowUpRight className="h-3.5 w-3.5" /> Withdraw HMN
            </button>
          </div>
        </div>

        {/* Credits Balance */}
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
              background: `radial-gradient(circle at 100% 0%, ${TEAL}22 0%, transparent 60%)`,
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
                CREDITS BALANCE
              </p>
            </div>
            <p
              className="hm-mono text-[34px] font-semibold leading-none mb-1"
              style={{ color: 'var(--hm-text)' }}
            >
              12,480
              <span className="text-[18px] ml-1.5" style={{ color: 'var(--hm-text-dim)' }}>
                CR
              </span>
            </p>
            <p className="text-[11.5px] mb-4" style={{ color: 'var(--hm-text-muted)' }}>
              Pending clearance:{' '}
              <span className="hm-mono font-semibold" style={{ color: TEAL }}>
                1,200 CR
              </span>{' '}
              · This month:{' '}
              <span className="hm-mono font-semibold" style={{ color: GREEN }}>
                +{crEarned} CR
              </span>
            </p>
            <button
              type="button"
              onClick={() => setWithdrawModal('Credits')}
              className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{
                background: `linear-gradient(135deg, ${TEAL} 0%, #7dd3d1 100%)`,
                color: '#0a1e1e',
                boxShadow: `0 8px 20px -8px ${TEAL}55`,
              }}
            >
              <Banknote className="h-3.5 w-3.5" /> Withdraw Credits
            </button>
          </div>
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          {
            Icon: Clock,
            color: ACCENT,
            label: 'Pending clearance',
            hmn: '580 HMN',
            cr: '1,200 CR',
          },
          {
            Icon: TrendingUp,
            color: GREEN,
            label: 'This month',
            hmn: `+${hmnEarned} HMN`,
            cr: `+${crEarned} CR`,
          },
          {
            Icon: Wallet,
            color: VIOLET,
            label: 'Lifetime earned',
            hmn: '28,400 HMN',
            cr: '94,200 CR',
          },
        ].map(({ Icon, color, label, hmn, cr }) => (
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
                className="hm-mono text-[9.5px]"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                {label.toUpperCase()}
              </p>
            </div>
            <div className="flex items-end gap-3">
              <div>
                <p
                  className="hm-mono text-[13px] font-semibold leading-tight"
                  style={{ color: VIOLET }}
                >
                  {hmn}
                </p>
                <p className="hm-mono text-[11px] mt-0.5" style={{ color: TEAL }}>
                  {cr}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Transactions + Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Transaction table */}
        <div className="col-span-1 lg:col-span-2">
          <SectionCard
            eyebrow="Activity"
            title="Recent transactions"
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
                    {[
                      'Date',
                      'Description',
                      'Type',
                      'Currency',
                      'Gross',
                      'Platform fee',
                      'You receive',
                      'Status',
                    ].map((h, i) => (
                      <th
                        key={h}
                        className="hm-mono text-[9.5px] font-semibold px-3.5 py-2.5 whitespace-nowrap"
                        style={{
                          color: 'var(--hm-text-dim)',
                          letterSpacing: '0.10em',
                          textAlign: i >= 4 ? 'right' : 'left',
                        }}
                      >
                        {h.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TX.map((t, i) => {
                    const isCredit = t.net >= 0
                    const ccy = t.currency === 'HMN' ? VIOLET : TEAL
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
                          {t.student !== '—' && (
                            <p
                              className="text-[10.5px] truncate"
                              style={{ color: 'var(--hm-text-dim)' }}
                            >
                              {t.student}
                            </p>
                          )}
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
                            className="hm-mono text-[11.5px]"
                            style={{ color: 'var(--hm-text-muted)' }}
                          >
                            {Math.abs(t.gross).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 text-right whitespace-nowrap">
                          {t.fee > 0 ? (
                            <span className="hm-mono text-[11.5px]" style={{ color: RED }}>
                              −{t.fee}
                            </span>
                          ) : (
                            <span
                              className="hm-mono text-[11px]"
                              style={{ color: 'var(--hm-text-dim)' }}
                            >
                              —
                            </span>
                          )}
                        </td>
                        <td className="px-3.5 py-2.5 text-right whitespace-nowrap">
                          <span
                            className="hm-mono inline-flex items-center gap-1 text-[12px] font-semibold"
                            style={{ color: isCredit ? GREEN : RED }}
                          >
                            {isCredit ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {Math.abs(t.net).toLocaleString()}
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
                  SHOWING 1–{TX.length} OF 248
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
          <SectionCard eyebrow="Economics" title="Revenue split">
            <div className="flex flex-col gap-1 mb-4">
              <Row label="Creator share" value="80%" />
              <Row label="Platform fee" value="20%" />
              <Row label="Refund window" value="7 days" />
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
                { label: 'Platform fee', val: '− 48 CR', color: RED },
                { label: 'You receive', val: '192 CR', color: GREEN },
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

          {/* Withdrawal methods */}
          <SectionCard eyebrow="Payouts" title="Withdrawal methods">
            {/* HMN */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                style={{ background: VIOLET_SOFT, color: VIOLET }}
              >
                <Coins className="h-4 w-4" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  HMN Token
                </p>
                <p className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                  0x3f…8a2d · On-chain
                </p>
              </div>
              <Pill tone="success">verified</Pill>
            </div>
            {/* Credits */}
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
                  Bank transfer
                </p>
                <p className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                  •••• 4290 · Credits→USD
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
              Manage methods <ChevronRight className="h-3 w-3" />
            </button>
          </SectionCard>

          {/* Pending withdrawals */}
          <SectionCard eyebrow="Pending" title="In-progress withdrawals">
            <div className="flex items-start gap-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0 mt-0.5"
                style={{ background: VIOLET_SOFT, color: VIOLET }}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  800 HMN withdrawal
                </p>
                <p className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                  0x3f…8a2d · Apr 26, 2026
                </p>
                <div className="mt-1.5">
                  <Pill tone="info">processing</Pill>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </CreatorShell>
  )
}
