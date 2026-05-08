import { useState } from 'react'
import { Search, ChevronDown, Award, Download, Filter } from 'lucide-react'
import CreatorShell from '../_shared/CreatorShell'

const ACCENT = '#F4B26C'
const GREEN = '#5EE6A8'
const VIOLET = '#7C5CF6'
const TEAL = '#5BC8C5'
const BLUE = '#60A5FA'

type CertStatus = 'issued' | 'revoked' | 'expired'

interface CertRow {
  id: string
  serial: string
  studentName: string
  studentEmail: string
  course: string
  courseColor: string
  issuedAt: string
  score: number | null
  status: CertStatus
}

const ROWS: CertRow[] = [
  {
    id: 'c-001',
    serial: 'HMC-2026-00341',
    studentName: 'Jordan Davis',
    studentEmail: 'jordan@example.com',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    issuedAt: 'May 3, 2026',
    score: 91,
    status: 'issued',
  },
  {
    id: 'c-002',
    serial: 'HMC-2026-00338',
    studentName: 'Priya Nair',
    studentEmail: 'priya@example.com',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    issuedAt: 'May 1, 2026',
    score: 88,
    status: 'issued',
  },
  {
    id: 'c-003',
    serial: 'HMC-2026-00327',
    studentName: 'Carlos Mendes',
    studentEmail: 'carlos@example.com',
    course: 'Botanical Illustration Vol. I',
    courseColor: GREEN,
    issuedAt: 'Apr 29, 2026',
    score: 95,
    status: 'issued',
  },
  {
    id: 'c-004',
    serial: 'HMC-2026-00319',
    studentName: 'Aisha Okonkwo',
    studentEmail: 'aisha@example.com',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    issuedAt: 'Apr 27, 2026',
    score: 84,
    status: 'issued',
  },
  {
    id: 'c-005',
    serial: 'HMC-2026-00310',
    studentName: 'Lena Hoffmann',
    studentEmail: 'lena@example.com',
    course: 'Plein-Air Sketching Essentials',
    courseColor: ACCENT,
    issuedAt: 'Apr 25, 2026',
    score: 78,
    status: 'issued',
  },
  {
    id: 'c-006',
    serial: 'HMC-2026-00304',
    studentName: 'Tomás Eriksson',
    studentEmail: 'tomas@example.com',
    course: 'Botanical Illustration Vol. I',
    courseColor: GREEN,
    issuedAt: 'Apr 22, 2026',
    score: 92,
    status: 'issued',
  },
  {
    id: 'c-007',
    serial: 'HMC-2026-00298',
    studentName: 'Mei-Lin Zhao',
    studentEmail: 'meilin@example.com',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    issuedAt: 'Apr 20, 2026',
    score: 87,
    status: 'issued',
  },
  {
    id: 'c-008',
    serial: 'HMC-2026-00291',
    studentName: 'Kwame Asante',
    studentEmail: 'kwame@example.com',
    course: 'Plein-Air Sketching Essentials',
    courseColor: ACCENT,
    issuedAt: 'Apr 18, 2026',
    score: 73,
    status: 'issued',
  },
  {
    id: 'c-009',
    serial: 'HMC-2026-00285',
    studentName: 'Sofía Rivas',
    studentEmail: 'sofia@example.com',
    course: 'Botanical Illustration Vol. I',
    courseColor: GREEN,
    issuedAt: 'Apr 15, 2026',
    score: 96,
    status: 'issued',
  },
  {
    id: 'c-010',
    serial: 'HMC-2026-00279',
    studentName: 'Haruto Yamada',
    studentEmail: 'haruto@example.com',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    issuedAt: 'Apr 13, 2026',
    score: 81,
    status: 'issued',
  },
  {
    id: 'c-011',
    serial: 'HMC-2026-00262',
    studentName: 'Nina Petersen',
    studentEmail: 'nina@example.com',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    issuedAt: 'Apr 8, 2026',
    score: 89,
    status: 'issued',
  },
  {
    id: 'c-012',
    serial: 'HMC-2026-00248',
    studentName: 'Raj Kapoor',
    studentEmail: 'raj@example.com',
    course: 'Botanical Illustration Vol. I',
    courseColor: GREEN,
    issuedAt: 'Apr 4, 2026',
    score: null,
    status: 'revoked',
  },
  {
    id: 'c-013',
    serial: 'HMC-2026-00231',
    studentName: 'Amara Diallo',
    studentEmail: 'amara@example.com',
    course: 'Plein-Air Sketching Essentials',
    courseColor: ACCENT,
    issuedAt: 'Mar 30, 2026',
    score: 71,
    status: 'expired',
  },
  {
    id: 'c-014',
    serial: 'HMC-2026-00219',
    studentName: 'Felix Müller',
    studentEmail: 'felix@example.com',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    issuedAt: 'Mar 26, 2026',
    score: 94,
    status: 'issued',
  },
]

const STATUS_COLOR: Record<CertStatus, { fg: string; bg: string; label: string }> = {
  issued: { fg: GREEN, bg: 'rgba(94,230,168,0.12)', label: 'Issued' },
  revoked: { fg: '#F4636E', bg: 'rgba(244,99,110,0.12)', label: 'Revoked' },
  expired: { fg: 'var(--hm-text-dim)', bg: 'rgba(139,146,168,0.12)', label: 'Expired' },
}

const COURSES = [
  'All courses',
  'Watercolor Foundations',
  'Botanical Illustration Vol. I',
  'Plein-Air Sketching Essentials',
]

export default function CreatorCertificates() {
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('All courses')
  const [statusFilter, setStatusFilter] = useState<'all' | CertStatus>('all')

  const visible = ROWS.filter((r) => {
    const matchSearch =
      !search ||
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.serial.toLowerCase().includes(search.toLowerCase()) ||
      r.studentEmail.toLowerCase().includes(search.toLowerCase())
    const matchCourse = courseFilter === 'All courses' || r.course === courseFilter
    const matchStatus = statusFilter === 'all' || r.status === statusFilter
    return matchSearch && matchCourse && matchStatus
  })

  const counts = {
    all: ROWS.length,
    issued: ROWS.filter((r) => r.status === 'issued').length,
    revoked: ROWS.filter((r) => r.status === 'revoked').length,
    expired: ROWS.filter((r) => r.status === 'expired').length,
  }

  return (
    <CreatorShell activeId="certificates">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <p
            className="hm-mono text-[10.5px] mb-2"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
          >
            TEACHING
          </p>
          <h1
            className="text-[26px] font-semibold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            Certificates
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            All certificates issued to learners who completed your courses.
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

      {/* Stat pills */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        {(
          [
            { key: 'all', label: 'All', color: VIOLET },
            { key: 'issued', label: 'Issued', color: GREEN },
            { key: 'revoked', label: 'Revoked', color: '#F4636E' },
            { key: 'expired', label: 'Expired', color: 'var(--hm-text-dim)' },
          ] as { key: 'all' | CertStatus; label: string; color: string }[]
        ).map(({ key, label, color }) => (
          <button
            key={key}
            type="button"
            onClick={() => setStatusFilter(key)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all"
            style={{
              background: statusFilter === key ? `${color}18` : 'var(--hm-bg-card)',
              color: statusFilter === key ? color : 'var(--hm-text-dim)',
              border: `1px solid ${statusFilter === key ? `${color}40` : 'var(--hm-border)'}`,
            }}
          >
            <Award className="h-3 w-3" />
            {label}
            <span
              className="hm-mono text-[10px] px-1.5 py-0.5 rounded-md"
              style={{
                background: statusFilter === key ? `${color}22` : 'var(--hm-bg-card-2)',
                color,
              }}
            >
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Table card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border-strong)' }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center gap-3 px-5 py-3.5 flex-wrap"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          {/* Search */}
          <div className="relative flex-1 min-w-0 max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
              style={{ color: 'var(--hm-text-dim)' }}
            />
            <input
              type="text"
              placeholder="Search student or serial…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 h-8 rounded-lg text-[12.5px] outline-none"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
              }}
            />
          </div>

          {/* Course filter */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
              style={{ color: 'var(--hm-text-dim)' }}
            />
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="pl-9 pr-8 h-8 rounded-lg text-[12.5px] outline-none appearance-none"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
              }}
            >
              {COURSES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
              style={{ color: 'var(--hm-text-dim)' }}
            />
          </div>

          <span className="ml-auto hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
            {visible.length} of {ROWS.length} certificates
          </span>
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
              {[
                { label: 'Serial', align: 'left' },
                { label: 'Student', align: 'left' },
                { label: 'Course', align: 'left' },
                { label: 'Issued', align: 'left' },
                { label: 'Score', align: 'right' },
                { label: 'Status', align: 'left' },
              ].map(({ label, align }) => (
                <th
                  key={label}
                  className="hm-mono px-4 py-3 text-[9.5px] font-bold tracking-[0.10em]"
                  style={{ color: 'var(--hm-text-dim)', textAlign: align as any }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, idx) => {
              const st = STATUS_COLOR[row.status]
              return (
                <tr
                  key={row.id}
                  style={{ borderTop: idx === 0 ? 'none' : '1px solid var(--hm-border)' }}
                >
                  {/* Serial */}
                  <td className="px-4 py-3.5">
                    <span className="hm-mono text-[11.5px] font-semibold" style={{ color: ACCENT }}>
                      {row.serial}
                    </span>
                  </td>

                  {/* Student */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full hm-mono text-[10px] font-bold shrink-0"
                        style={{
                          background: `${VIOLET}20`,
                          color: VIOLET,
                          border: `1px solid ${VIOLET}30`,
                        }}
                      >
                        {row.studentName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </span>
                      <div>
                        <p
                          className="text-[13px] font-medium leading-tight"
                          style={{ color: 'var(--hm-text)' }}
                        >
                          {row.studentName}
                        </p>
                        <p
                          className="hm-mono text-[10px] mt-0.5"
                          style={{ color: 'var(--hm-text-dim)' }}
                        >
                          {row.studentEmail}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="px-4 py-3.5">
                    <span
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-medium"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ background: row.courseColor }}
                      />
                      {row.course}
                    </span>
                  </td>

                  {/* Issued */}
                  <td className="px-4 py-3.5">
                    <span className="hm-mono text-[11.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                      {row.issuedAt}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="px-4 py-3.5 text-right">
                    {row.score !== null ? (
                      <span
                        className="hm-mono text-[13px] font-bold"
                        style={{ color: row.score >= 90 ? GREEN : row.score >= 75 ? ACCENT : BLUE }}
                      >
                        {row.score}%
                      </span>
                    ) : (
                      <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                        —
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span
                      className="hm-mono inline-flex items-center px-2 py-0.5 rounded text-[9.5px] font-bold tracking-[0.06em]"
                      style={{ background: st.bg, color: st.fg }}
                    >
                      {st.label.toUpperCase()}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
            Showing {visible.length} of {ROWS.length} results
          </span>
          <div className="flex items-center gap-1">
            {['←', '1', '2', '3', '→'].map((p, i) => (
              <button
                key={i}
                type="button"
                className="hm-mono flex h-7 min-w-[28px] items-center justify-center rounded-md px-2 text-[11px]"
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
    </CreatorShell>
  )
}
