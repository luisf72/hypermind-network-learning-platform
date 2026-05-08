import { useState } from 'react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Coins,
  TrendingUp,
  TrendingDown,
  Search,
  ChevronDown,
} from 'lucide-react'
import StudentShell from './StudentShell'

const GREEN = '#5EE6A8'
const RED = '#F4636E'
const VIOLET = '#7C5CF6'
const AMBER = '#F4B26C'
const BLUE = '#60A5FA'

type Dir = 'in' | 'out'

interface LogEntry {
  id: string
  date: string
  description: string
  category: string
  dir: Dir
  amount: number
  balance: number
}

const ENTRIES: LogEntry[] = [
  {
    id: 'sl-001',
    date: 'Today, 10:22',
    description: 'Credit top-up via subscription',
    category: 'Top-up',
    dir: 'in',
    amount: 50,
    balance: 180,
  },
  {
    id: 'sl-002',
    date: 'Today, 08:15',
    description: 'AI Tutor session — Spanish grammar',
    category: 'AI Tutor',
    dir: 'out',
    amount: 5,
    balance: 130,
  },
  {
    id: 'sl-003',
    date: 'Yesterday, 14:37',
    description: 'Achievement reward — Fast Learner badge',
    category: 'Reward',
    dir: 'in',
    amount: 10,
    balance: 135,
  },
  {
    id: 'sl-004',
    date: 'Yesterday, 11:00',
    description: 'Enrolled in Acoustic Guitar Mastery',
    category: 'Enrollment',
    dir: 'out',
    amount: 30,
    balance: 125,
  },
  {
    id: 'sl-005',
    date: 'May 2, 16:50',
    description: 'Referral reward — Jordan Reyes joined',
    category: 'Referral',
    dir: 'in',
    amount: 20,
    balance: 155,
  },
  {
    id: 'sl-006',
    date: 'May 2, 09:30',
    description: 'Assessment attempt — Spanish B1 Listening',
    category: 'Assessment',
    dir: 'out',
    amount: 10,
    balance: 135,
  },
  {
    id: 'sl-007',
    date: 'May 1, 13:20',
    description: 'Streak bonus — 12-day streak',
    category: 'Reward',
    dir: 'in',
    amount: 5,
    balance: 145,
  },
  {
    id: 'sl-008',
    date: 'Apr 30, 17:05',
    description: 'Certificate minting fee',
    category: 'Certificate',
    dir: 'out',
    amount: 15,
    balance: 140,
  },
  {
    id: 'sl-009',
    date: 'Apr 30, 10:00',
    description: 'Monthly credit top-up',
    category: 'Top-up',
    dir: 'in',
    amount: 50,
    balance: 155,
  },
  {
    id: 'sl-010',
    date: 'Apr 28, 15:44',
    description: 'Enrolled in Personal Finance 101',
    category: 'Enrollment',
    dir: 'out',
    amount: 25,
    balance: 105,
  },
  {
    id: 'sl-011',
    date: 'Apr 27, 12:30',
    description: 'Community karma reward',
    category: 'Reward',
    dir: 'in',
    amount: 5,
    balance: 130,
  },
  {
    id: 'sl-012',
    date: 'Apr 26, 09:10',
    description: 'AI Tutor session — Watercolor techniques',
    category: 'AI Tutor',
    dir: 'out',
    amount: 5,
    balance: 125,
  },
]

const CATEGORY_COLOR: Record<string, string> = {
  'Top-up': GREEN,
  'AI Tutor': VIOLET,
  Reward: AMBER,
  Enrollment: BLUE,
  Referral: GREEN,
  Assessment: '#A78BFA',
  Certificate: AMBER,
}

const FILTERS = ['All', 'Incoming', 'Outgoing'] as const
type Filter = (typeof FILTERS)[number]

export default function StudentCreditLog() {
  const [filter, setFilter] = useState<Filter>('All')

  const totalIn = ENTRIES.filter((e) => e.dir === 'in').reduce((s, e) => s + e.amount, 0)
  const totalOut = ENTRIES.filter((e) => e.dir === 'out').reduce((s, e) => s + e.amount, 0)
  const balance = ENTRIES[0].balance

  const visible = ENTRIES.filter((e) =>
    filter === 'All' ? true : filter === 'Incoming' ? e.dir === 'in' : e.dir === 'out'
  )

  return (
    <StudentShell activeTab="">
      <div className="mx-auto max-w-[900px] pt-8 pb-2">
        {/* Header */}
        <div className="mb-6">
          <p
            className="hm-mono text-[10.5px] mb-2"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
          >
            WALLET
          </p>
          <h1
            className="text-[26px] font-bold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.025em' }}
          >
            Credit Log
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            All incoming and outgoing credit movements on your account.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            {
              label: 'Current balance',
              value: balance,
              icon: Coins,
              color: VIOLET,
              bg: 'rgba(124,92,246,0.10)',
              border: 'rgba(124,92,246,0.22)',
              prefix: '',
            },
            {
              label: 'Total incoming',
              value: totalIn,
              icon: TrendingUp,
              color: GREEN,
              bg: 'rgba(94,230,168,0.10)',
              border: 'rgba(94,230,168,0.22)',
              prefix: '+',
            },
            {
              label: 'Total outgoing',
              value: totalOut,
              icon: TrendingDown,
              color: RED,
              bg: 'rgba(244,99,110,0.10)',
              border: 'rgba(244,99,110,0.22)',
              prefix: '−',
            },
          ].map(({ label, value, icon: Icon, color, bg, border, prefix }) => (
            <div
              key={label}
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border-strong)',
              }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl shrink-0"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </span>
              <div>
                <p
                  className="hm-mono text-[9.5px] mb-1"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
                >
                  {label.toUpperCase()}
                </p>
                <p
                  className="text-[26px] font-bold leading-none"
                  style={{ color, letterSpacing: '-0.02em' }}
                >
                  {prefix}
                  {value}{' '}
                  <span className="text-[13px] font-medium" style={{ color: 'var(--hm-text-dim)' }}>
                    cr
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border-strong)' }}
        >
          {/* Toolbar */}
          <div
            className="flex items-center justify-between gap-3 px-5 py-3.5 flex-wrap"
            style={{ borderBottom: '1px solid var(--hm-border)' }}
          >
            {/* Filter tabs */}
            <div
              className="flex items-center gap-1 rounded-lg p-1"
              style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
            >
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className="px-3 py-1 rounded-md text-[12px] font-semibold transition-all"
                  style={{
                    background: filter === f ? 'var(--hm-bg-card)' : 'transparent',
                    color: filter === f ? 'var(--hm-text)' : 'var(--hm-text-dim)',
                    border: filter === f ? '1px solid var(--hm-border)' : '1px solid transparent',
                    boxShadow: filter === f ? '0 1px 4px rgba(0,0,0,0.25)' : 'none',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
                  style={{ color: 'var(--hm-text-dim)' }}
                />
                <input
                  type="text"
                  placeholder="Search…"
                  className="pl-9 pr-3 h-8 rounded-lg text-[12.5px] outline-none w-44"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    color: 'var(--hm-text)',
                  }}
                />
              </div>

              {/* Month filter */}
              <div className="relative">
                <select
                  className="pl-3 pr-8 h-8 rounded-lg text-[12.5px] outline-none appearance-none"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    color: 'var(--hm-text)',
                  }}
                >
                  <option>All time</option>
                  <option>May 2026</option>
                  <option>Apr 2026</option>
                </select>
                <ChevronDown
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                  style={{ color: 'var(--hm-text-dim)' }}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr
                style={{
                  background: 'var(--hm-bg-card-2)',
                  borderBottom: '1px solid var(--hm-border)',
                }}
              >
                {['Date', 'Description', 'Category', 'Type', 'Amount', 'Balance'].map((h, i) => (
                  <th
                    key={h}
                    className="hm-mono px-4 py-3 text-[9.5px] font-bold tracking-[0.10em]"
                    style={{ color: 'var(--hm-text-dim)', textAlign: i >= 4 ? 'right' : 'left' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((row, idx) => (
                <tr
                  key={row.id}
                  style={{ borderTop: idx === 0 ? 'none' : '1px solid var(--hm-border)' }}
                >
                  {/* Date */}
                  <td className="px-4 py-3.5">
                    <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                      {row.date}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                        style={{
                          background:
                            row.dir === 'in' ? 'rgba(94,230,168,0.10)' : 'rgba(244,99,110,0.10)',
                          border: `1px solid ${row.dir === 'in' ? 'rgba(94,230,168,0.22)' : 'rgba(244,99,110,0.22)'}`,
                        }}
                      >
                        {row.dir === 'in' ? (
                          <ArrowDownLeft className="h-3.5 w-3.5" style={{ color: GREEN }} />
                        ) : (
                          <ArrowUpRight className="h-3.5 w-3.5" style={{ color: RED }} />
                        )}
                      </span>
                      <span className="text-[13px]" style={{ color: 'var(--hm-text)' }}>
                        {row.description}
                      </span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3.5">
                    <span
                      className="hm-mono inline-flex items-center px-2 py-0.5 rounded text-[9.5px] font-semibold"
                      style={{
                        background: `${CATEGORY_COLOR[row.category] ?? VIOLET}18`,
                        color: CATEGORY_COLOR[row.category] ?? VIOLET,
                      }}
                    >
                      {row.category}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3.5">
                    <span
                      className="hm-mono inline-flex items-center px-2 py-0.5 rounded text-[9.5px] font-bold"
                      style={{
                        background:
                          row.dir === 'in' ? 'rgba(94,230,168,0.10)' : 'rgba(244,99,110,0.10)',
                        color: row.dir === 'in' ? GREEN : RED,
                      }}
                    >
                      {row.dir === 'in' ? 'IN' : 'OUT'}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3.5 text-right">
                    <span
                      className="hm-mono text-[13.5px] font-bold"
                      style={{ color: row.dir === 'in' ? GREEN : RED }}
                    >
                      {row.dir === 'in' ? '+' : '−'}
                      {row.amount}
                    </span>
                  </td>

                  {/* Balance */}
                  <td className="px-4 py-3.5 text-right">
                    <span
                      className="hm-mono text-[13px] font-semibold"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {row.balance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
          >
            <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
              Showing {visible.length} of {ENTRIES.length} entries
            </span>
            <div className="flex items-center gap-1">
              {['←', '1', '2', '3', '→'].map((p, i) => (
                <button
                  key={i}
                  type="button"
                  className="hm-mono flex h-7 min-w-[28px] items-center justify-center rounded-md px-2 text-[11px] transition-colors"
                  style={{
                    background: p === '1' ? 'var(--hm-bg-card)' : 'transparent',
                    color: p === '1' ? 'var(--hm-text)' : 'var(--hm-text-dim)',
                    border: p === '1' ? '1px solid var(--hm-border)' : '1px solid transparent',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StudentShell>
  )
}
