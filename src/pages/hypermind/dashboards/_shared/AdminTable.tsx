import type { ReactNode } from 'react'
import type React from 'react'
import { Search, Plus, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'

const ACCENT = '#F4636E'
const ACCENT_SOFT = 'rgba(244,99,110,0.10)'

export type Tone =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'violet'
  | 'amber'
  | 'teal'

const TONE_MAP: Record<Tone, { color: string; bg: string }> = {
  success: { color: '#5EE6A8', bg: 'rgba(94,230,168,0.10)' },
  warning: { color: 'var(--hm-amber)', bg: 'var(--hm-amber-soft)' },
  amber: { color: 'var(--hm-amber)', bg: 'var(--hm-amber-soft)' },
  danger: { color: ACCENT, bg: ACCENT_SOFT },
  info: { color: '#7BC8C5', bg: 'rgba(123,200,197,0.10)' },
  teal: { color: '#7BC8C5', bg: 'rgba(123,200,197,0.10)' },
  neutral: { color: 'var(--hm-text-muted)', bg: 'var(--hm-bg-card-2)' },
  violet: { color: 'var(--hm-violet-2)', bg: 'var(--hm-violet-soft)' },
}

export function Pill({
  tone = 'neutral',
  children,
  dot = true,
}: {
  tone?: Tone
  children: ReactNode
  dot?: boolean
}) {
  const t = TONE_MAP[tone]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap"
      style={{ color: t.color, background: t.bg, border: `1px solid ${t.color}1A` }}
    >
      {dot && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full shrink-0"
          style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }}
        />
      )}
      {children}
    </span>
  )
}

export function Mono({ children }: { children: ReactNode }) {
  return (
    <span
      className="hm-mono text-[11.5px]"
      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.04em' }}
    >
      {children}
    </span>
  )
}

export function UserCell({
  name,
  email,
  initials,
  tone = 'violet',
}: {
  name: string
  email?: string
  initials: string
  tone?: Tone
}) {
  const t = TONE_MAP[tone]
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full text-[10.5px] font-semibold shrink-0"
        style={{ background: t.bg, color: t.color, border: `1px solid ${t.color}26` }}
      >
        {initials}
      </span>
      <div className="min-w-0">
        <p className="font-medium truncate text-[12.5px]" style={{ color: 'var(--hm-text)' }}>
          {name}
        </p>
        {email && (
          <p className="text-[11px] truncate" style={{ color: 'var(--hm-text-dim)' }}>
            {email}
          </p>
        )}
      </div>
    </div>
  )
}

export interface Column<T> {
  header: string
  key?: string
  width?: string | number
  align?: 'left' | 'right' | 'center'
  render?: (row: T, idx: number) => ReactNode
  mono?: boolean
}

export interface AdminTableProps<T> {
  eyebrow: string
  title: string
  subtitle?: string
  primaryAction?: { label: string; icon?: any; onClick?: () => void }
  searchPlaceholder?: string
  filters?: string[]
  filterControls?: React.ReactNode
  columns: Column<T>[]
  rows: T[]
  totalCount?: number
  pageInfo?: { current: number; total: number }
  showActionsCol?: boolean
  onRowClick?: (row: T) => void
  onRowAction?: (row: T) => void
}

export default function AdminTable<T extends Record<string, any>>(props: AdminTableProps<T>) {
  const {
    eyebrow,
    title,
    subtitle,
    primaryAction,
    searchPlaceholder = 'Search…',
    filters = [],
    filterControls,
    columns,
    rows,
    totalCount,
    pageInfo,
    showActionsCol = true,
    onRowClick,
    onRowAction,
  } = props

  const PrimaryIcon = primaryAction?.icon ?? Plus

  return (
    <>
      {/* Page header */}
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <p
            className="hm-mono text-[10.5px] mb-2"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
          >
            {eyebrow.toUpperCase()}
          </p>
          <h1
            className="text-[26px] font-semibold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
              {subtitle}
            </p>
          )}
        </div>
        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onClick}
            className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold transition-transform active:scale-[0.98]"
            style={{
              background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}d9 100%)`,
              color: 'white',
              boxShadow: `0 8px 24px -8px ${ACCENT}66`,
              cursor: primaryAction.onClick ? 'pointer' : 'default',
            }}
          >
            <PrimaryIcon className="h-3.5 w-3.5" />
            {primaryAction.label}
          </button>
        )}
      </div>

      {/* Table card */}
      <div
        className="hm-card rounded-2xl overflow-hidden"
        style={{
          background: 'var(--hm-bg-card)',
          border: '1px solid var(--hm-border)',
          boxShadow: 'var(--hm-shadow-card)',
        }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-3.5 flex-wrap"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="flex items-center gap-2 rounded-lg px-3 h-8"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                width: 280,
                maxWidth: '100%',
              }}
            >
              <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--hm-text-dim)' }} />
              <input
                placeholder={searchPlaceholder}
                className="flex-1 bg-transparent outline-none text-[12px]"
                style={{ color: 'var(--hm-text)' }}
              />
            </div>
            {filterControls
              ? filterControls
              : filters.map((f) => (
                  <button
                    key={f}
                    className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-lg text-[11.5px]"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      border: '1px solid var(--hm-border)',
                      color: 'var(--hm-text-muted)',
                    }}
                  >
                    <Filter className="h-3 w-3" />
                    {f}
                  </button>
                ))}
          </div>
          {totalCount !== undefined && (
            <span
              className="hm-mono text-[10.5px]"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
            >
              {totalCount.toLocaleString()} TOTAL
            </span>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto hm-scroll">
          <table className="w-full text-[12.5px]" style={{ minWidth: 720 }}>
            <thead>
              <tr style={{ background: 'var(--hm-bg-card-2)' }}>
                {columns.map((c, ci) => (
                  <th
                    key={ci}
                    className="hm-mono px-5 py-2.5 text-[10px] font-medium"
                    style={{
                      textAlign: c.align ?? 'left',
                      color: 'var(--hm-text-dim)',
                      letterSpacing: '0.14em',
                      width: c.width,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c.header.toUpperCase()}
                  </th>
                ))}
                {showActionsCol && (
                  <th
                    className="hm-mono px-5 py-2.5 text-[10px] font-medium"
                    style={{
                      textAlign: 'right',
                      color: 'var(--hm-text-dim)',
                      letterSpacing: '0.14em',
                      width: 56,
                    }}
                  />
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => {
                const clickable = !!onRowClick
                return (
                  <tr
                    key={ri}
                    onClick={clickable ? () => onRowClick!(row) : undefined}
                    className={clickable ? 'hm-admin-row-clickable' : undefined}
                    style={{
                      borderTop: '1px solid var(--hm-border)',
                      cursor: clickable ? 'pointer' : undefined,
                    }}
                  >
                    {columns.map((c, ci) => {
                      const raw = c.key ? row[c.key] : undefined
                      const content = c.render ? c.render(row, ri) : (raw ?? '—')
                      return (
                        <td
                          key={ci}
                          className={`px-5 py-3 align-middle ${c.mono ? 'hm-mono text-[11.5px]' : ''}`}
                          style={{
                            textAlign: c.align ?? 'left',
                            color: c.mono ? 'var(--hm-text-dim)' : 'var(--hm-text)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {content}
                        </td>
                      )
                    })}
                    {showActionsCol && (
                      <td className="px-5 py-3 align-middle" style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            // Don't trigger row click when using the row actions menu
                            e.stopPropagation()
                            if (onRowAction) onRowAction(row)
                          }}
                          className="h-7 w-7 rounded-md inline-flex items-center justify-center transition-all hover:bg-[var(--hm-violet-soft)]"
                          style={{
                            background: 'var(--hm-bg-card-2)',
                            border: '1px solid var(--hm-border)',
                            color: 'var(--hm-text-muted)',
                            cursor: onRowAction ? 'pointer' : 'default',
                          }}
                          aria-label="Row actions"
                        >
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer — always visible when rows exist */}
        {rows.length > 0 && (
          <Pagination
            current={pageInfo?.current ?? 1}
            total={pageInfo?.total ?? 1}
            shownStart={1}
            shownEnd={rows.length}
            totalCount={totalCount ?? rows.length}
          />
        )}
      </div>
    </>
  )
}

function Pagination({
  current,
  total,
  shownStart,
  shownEnd,
  totalCount,
}: {
  current: number
  total: number
  shownStart: number
  shownEnd: number
  totalCount: number
}) {
  const pages = buildPageList(current, total)
  const isFirst = current <= 1
  const isLast = current >= total

  return (
    <div
      className="flex items-center justify-between gap-3 px-5 py-3 flex-wrap"
      style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
    >
      <span
        className="hm-mono text-[10.5px]"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
      >
        SHOWING {shownStart.toLocaleString()}–{shownEnd.toLocaleString()} OF{' '}
        {totalCount.toLocaleString()}
      </span>
      <div className="flex items-center gap-1">
        <PageBtn ariaLabel="Previous page" disabled={isFirst}>
          <ChevronLeft className="h-3.5 w-3.5" />
        </PageBtn>
        {pages.map((p, i) =>
          p === '…' ? (
            <span
              key={`ell-${i}`}
              className="hm-mono px-1.5 text-[10.5px]"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              …
            </span>
          ) : (
            <PageBtn key={p} ariaLabel={`Page ${p}`} active={p === current}>
              <span className="hm-mono text-[11px]">{p}</span>
            </PageBtn>
          )
        )}
        <PageBtn ariaLabel="Next page" disabled={isLast}>
          <ChevronRight className="h-3.5 w-3.5" />
        </PageBtn>
      </div>
    </div>
  )
}

function PageBtn({
  children,
  ariaLabel,
  active = false,
  disabled = false,
}: {
  children: ReactNode
  ariaLabel: string
  active?: boolean
  disabled?: boolean
}) {
  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      className="h-7 min-w-[28px] px-1.5 rounded-md inline-flex items-center justify-center transition-colors"
      style={{
        background: active ? ACCENT_SOFT : 'var(--hm-bg-card)',
        border: `1px solid ${active ? `${ACCENT}55` : 'var(--hm-border)'}`,
        color: active ? ACCENT : 'var(--hm-text-muted)',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: active ? `0 0 0 3px ${ACCENT}14` : 'none',
      }}
    >
      {children}
    </button>
  )
}

/** Build a compact page list like [1, 2, 3, "…", 312] */
function buildPageList(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '…')[] = []
  pages.push(1)
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push('…')
  for (let p = start; p <= end; p++) pages.push(p)
  if (end < total - 1) pages.push('…')
  pages.push(total)
  return pages
}
