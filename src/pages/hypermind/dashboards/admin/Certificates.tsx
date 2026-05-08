import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import {
  Search,
  Download,
  MoreHorizontal,
  X,
  Award,
  CheckCircle2,
  User,
  BookOpen,
  UserCircle2,
  Hash,
  Calendar,
  ChevronDown,
  ShieldOff,
  ExternalLink,
  Filter,
} from 'lucide-react'

/* ── tokens ── */
const ACCENT = '#F4636E'
const VIOLET = '#A78BFA'
const GREEN = '#5EE6A8'
const AMBER = '#F4B26C'
const BLUE = '#60A5FA'
const TEAL = '#5BC8C5'

type CertStatus = 'valid' | 'revoked' | 'expired'
const STATUS: Record<CertStatus, { label: string; fg: string; bg: string }> = {
  valid: { label: 'Valid', fg: GREEN, bg: 'rgba(94,230,168,0.12)' },
  revoked: { label: 'Revoked', fg: ACCENT, bg: 'rgba(244,99,110,0.12)' },
  expired: { label: 'Expired', fg: '#8B92A8', bg: 'rgba(139,146,168,0.12)' },
}

interface CertRow {
  id: string
  serial: string
  studentName: string
  studentEmail: string
  studentInitials: string
  course: string
  courseColor: string
  creatorName: string
  creatorInitials: string
  issuedAt: string
  score: number | null
  status: CertStatus
  timeLimit: string
  passingScore: number
}

const ROWS: CertRow[] = [
  {
    id: 'c-001',
    serial: 'HMC-2026-00341',
    studentName: 'Jordan Davis',
    studentEmail: 'jordan@example.com',
    studentInitials: 'JD',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    creatorName: 'Sarah Lin',
    creatorInitials: 'SL',
    issuedAt: 'May 3, 2026',
    score: 91,
    status: 'valid',
    timeLimit: '30 min',
    passingScore: 70,
  },
  {
    id: 'c-002',
    serial: 'HMC-2026-00338',
    studentName: 'Priya Nair',
    studentEmail: 'priya@example.com',
    studentInitials: 'PN',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    creatorName: 'Sarah Lin',
    creatorInitials: 'SL',
    issuedAt: 'May 1, 2026',
    score: 88,
    status: 'valid',
    timeLimit: '30 min',
    passingScore: 70,
  },
  {
    id: 'c-003',
    serial: 'HMC-2026-00327',
    studentName: 'Carlos Mendes',
    studentEmail: 'carlos@example.com',
    studentInitials: 'CM',
    course: 'Botanical Illustration Vol. I',
    courseColor: GREEN,
    creatorName: 'Elena Voss',
    creatorInitials: 'EV',
    issuedAt: 'Apr 29, 2026',
    score: 95,
    status: 'valid',
    timeLimit: '40 min',
    passingScore: 75,
  },
  {
    id: 'c-004',
    serial: 'HMC-2026-00319',
    studentName: 'Aisha Okonkwo',
    studentEmail: 'aisha@example.com',
    studentInitials: 'AO',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    creatorName: 'Sarah Lin',
    creatorInitials: 'SL',
    issuedAt: 'Apr 27, 2026',
    score: 84,
    status: 'valid',
    timeLimit: '30 min',
    passingScore: 70,
  },
  {
    id: 'c-005',
    serial: 'HMC-2026-00310',
    studentName: 'Lena Hoffmann',
    studentEmail: 'lena@example.com',
    studentInitials: 'LH',
    course: 'Plein-Air Sketching Essentials',
    courseColor: AMBER,
    creatorName: 'Tomás Reyes',
    creatorInitials: 'TR',
    issuedAt: 'Apr 25, 2026',
    score: 78,
    status: 'valid',
    timeLimit: '25 min',
    passingScore: 65,
  },
  {
    id: 'c-006',
    serial: 'HMC-2026-00304',
    studentName: 'Tomás Eriksson',
    studentEmail: 'tomas@example.com',
    studentInitials: 'TE',
    course: 'Botanical Illustration Vol. I',
    courseColor: GREEN,
    creatorName: 'Elena Voss',
    creatorInitials: 'EV',
    issuedAt: 'Apr 22, 2026',
    score: 92,
    status: 'valid',
    timeLimit: '40 min',
    passingScore: 75,
  },
  {
    id: 'c-007',
    serial: 'HMC-2026-00298',
    studentName: 'Mei-Lin Zhao',
    studentEmail: 'meilin@example.com',
    studentInitials: 'MZ',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    creatorName: 'Sarah Lin',
    creatorInitials: 'SL',
    issuedAt: 'Apr 20, 2026',
    score: 87,
    status: 'valid',
    timeLimit: '30 min',
    passingScore: 70,
  },
  {
    id: 'c-008',
    serial: 'HMC-2026-00291',
    studentName: 'Kwame Asante',
    studentEmail: 'kwame@example.com',
    studentInitials: 'KA',
    course: 'Plein-Air Sketching Essentials',
    courseColor: AMBER,
    creatorName: 'Tomás Reyes',
    creatorInitials: 'TR',
    issuedAt: 'Apr 18, 2026',
    score: 73,
    status: 'valid',
    timeLimit: '25 min',
    passingScore: 65,
  },
  {
    id: 'c-009',
    serial: 'HMC-2026-00285',
    studentName: 'Sofía Rivas',
    studentEmail: 'sofia@example.com',
    studentInitials: 'SR',
    course: 'Botanical Illustration Vol. I',
    courseColor: GREEN,
    creatorName: 'Elena Voss',
    creatorInitials: 'EV',
    issuedAt: 'Apr 15, 2026',
    score: 96,
    status: 'valid',
    timeLimit: '40 min',
    passingScore: 75,
  },
  {
    id: 'c-010',
    serial: 'HMC-2026-00279',
    studentName: 'Haruto Yamada',
    studentEmail: 'haruto@example.com',
    studentInitials: 'HY',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    creatorName: 'Sarah Lin',
    creatorInitials: 'SL',
    issuedAt: 'Apr 13, 2026',
    score: 81,
    status: 'valid',
    timeLimit: '30 min',
    passingScore: 70,
  },
  {
    id: 'c-011',
    serial: 'HMC-2026-00262',
    studentName: 'Nina Petersen',
    studentEmail: 'nina@example.com',
    studentInitials: 'NP',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    creatorName: 'Sarah Lin',
    creatorInitials: 'SL',
    issuedAt: 'Apr 8, 2026',
    score: 89,
    status: 'valid',
    timeLimit: '30 min',
    passingScore: 70,
  },
  {
    id: 'c-012',
    serial: 'HMC-2026-00248',
    studentName: 'Raj Kapoor',
    studentEmail: 'raj@example.com',
    studentInitials: 'RK',
    course: 'Botanical Illustration Vol. I',
    courseColor: GREEN,
    creatorName: 'Elena Voss',
    creatorInitials: 'EV',
    issuedAt: 'Apr 4, 2026',
    score: null,
    status: 'revoked',
    timeLimit: '40 min',
    passingScore: 75,
  },
  {
    id: 'c-013',
    serial: 'HMC-2026-00231',
    studentName: 'Amara Diallo',
    studentEmail: 'amara@example.com',
    studentInitials: 'AD',
    course: 'Plein-Air Sketching Essentials',
    courseColor: AMBER,
    creatorName: 'Tomás Reyes',
    creatorInitials: 'TR',
    issuedAt: 'Mar 30, 2026',
    score: 71,
    status: 'expired',
    timeLimit: '25 min',
    passingScore: 65,
  },
  {
    id: 'c-014',
    serial: 'HMC-2026-00219',
    studentName: 'Felix Müller',
    studentEmail: 'felix@example.com',
    studentInitials: 'FM',
    course: 'Watercolor Foundations',
    courseColor: TEAL,
    creatorName: 'Sarah Lin',
    creatorInitials: 'SL',
    issuedAt: 'Mar 26, 2026',
    score: 94,
    status: 'valid',
    timeLimit: '30 min',
    passingScore: 70,
  },
  {
    id: 'c-015',
    serial: 'HMC-2026-00207',
    studentName: 'Yuki Tanaka',
    studentEmail: 'yuki@example.com',
    studentInitials: 'YT',
    course: 'Botanical Illustration Vol. I',
    courseColor: GREEN,
    creatorName: 'Elena Voss',
    creatorInitials: 'EV',
    issuedAt: 'Mar 22, 2026',
    score: 90,
    status: 'valid',
    timeLimit: '40 min',
    passingScore: 75,
  },
]

const COURSES = [
  'All courses',
  'Watercolor Foundations',
  'Botanical Illustration Vol. I',
  'Plein-Air Sketching Essentials',
]

/* ── detail modal ── */
function CertDetailModal({ cert, onClose }: { cert: CertRow; onClose: () => void }) {
  const st = STATUS[cert.status]
  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
        <div
          className="rounded-2xl overflow-hidden pointer-events-auto w-full max-w-[520px]"
          style={{
            background: 'var(--hm-bg-card)',
            border: '1px solid var(--hm-border-strong)',
            boxShadow: '0 32px 80px -16px rgba(0,0,0,0.7)',
          }}
        >
          {/* Modal header */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{
              borderBottom: '1px solid var(--hm-border)',
              background: 'var(--hm-bg-card-2)',
            }}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
              style={{
                background: 'rgba(94,230,168,0.12)',
                border: '1px solid rgba(94,230,168,0.25)',
              }}
            >
              <Award className="h-5 w-5" style={{ color: GREEN }} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Certificate Detail
              </p>
              <p className="hm-mono text-[10.5px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                {cert.serial}
              </p>
            </div>
            <span
              className="hm-mono text-[9.5px] px-2 py-0.5 rounded-full font-bold"
              style={{ background: st.bg, color: st.fg, border: `1px solid ${st.fg}30` }}
            >
              {st.label.toUpperCase()}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg ml-1"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-dim)',
              }}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Certificate preview strip */}
          <div
            className="mx-5 mt-5 rounded-xl px-5 py-4 flex items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, #140f28 0%, #1c1535 60%, #0f1120 100%)',
              border: `1px solid ${VIOLET}30`,
            }}
          >
            <div
              aria-hidden
              className="h-14 w-14 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: `linear-gradient(135deg, ${AMBER}33 0%, ${VIOLET}28 100%)`,
                border: '1px solid var(--hm-border)',
              }}
            >
              <Award className="h-7 w-7" style={{ color: AMBER }} />
            </div>
            <div>
              <p
                className="hm-mono text-[9.5px] mb-1"
                style={{ color: AMBER, letterSpacing: '0.14em' }}
              >
                CERTIFICATE OF COMPLETION
              </p>
              <p
                className="text-[14px] font-bold"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
              >
                {cert.course}
              </p>
              <p className="text-[12px] mt-0.5" style={{ color: 'var(--hm-text-muted)' }}>
                Awarded to <strong style={{ color: 'var(--hm-text)' }}>{cert.studentName}</strong>
              </p>
            </div>
          </div>

          {/* Info grid */}
          <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-4">
            {[
              {
                Icon: User,
                label: 'Student',
                value: cert.studentName,
                sub: cert.studentEmail,
                color: VIOLET,
              },
              {
                Icon: BookOpen,
                label: 'Course',
                value: cert.course,
                sub: null,
                color: cert.courseColor,
              },
              {
                Icon: UserCircle2,
                label: 'Creator',
                value: cert.creatorName,
                sub: null,
                color: AMBER,
              },
              {
                Icon: Hash,
                label: 'Certificate ID',
                value: cert.serial,
                sub: null,
                color: BLUE,
                mono: true,
              },
              { Icon: Calendar, label: 'Issued', value: cert.issuedAt, sub: null, color: TEAL },
              {
                Icon: Award,
                label: 'Score',
                value: cert.score !== null ? `${cert.score}%` : '—',
                sub: `Passing: ${cert.passingScore}%`,
                color: cert.score !== null && cert.score >= 90 ? GREEN : AMBER,
              },
            ].map(({ Icon, label, value, sub, color, mono }) => (
              <div key={label} className="flex items-start gap-2.5">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg mt-0.5 shrink-0"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color }} />
                </span>
                <div>
                  <p
                    className="hm-mono text-[9px] mb-0.5"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
                  >
                    {label.toUpperCase()}
                  </p>
                  <p
                    className={`text-[12.5px] font-semibold ${mono ? 'hm-mono' : ''}`}
                    style={{ color: 'var(--hm-text)' }}
                  >
                    {value}
                  </p>
                  {sub && (
                    <p
                      className="hm-mono text-[10px] mt-0.5"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      {sub}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer actions */}
          <div
            className="flex items-center justify-between gap-3 px-5 py-3.5"
            style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-[12px] font-semibold"
              style={{
                background: 'rgba(244,99,110,0.10)',
                color: ACCENT,
                border: `1px solid ${ACCENT}30`,
              }}
            >
              <ShieldOff className="h-3.5 w-3.5" />
              {cert.status === 'revoked' ? 'Restore certificate' : 'Revoke certificate'}
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-[12px] font-semibold"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-muted)',
                }}
              >
                <ExternalLink className="h-3.5 w-3.5" /> Open certificate
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-bold"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #e8444e 100%)`,
                  color: 'white',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ── main ── */
export default function Certificates() {
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('All courses')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [detailCert, setDetailCert] = useState<CertRow | null>(null)

  const visible = ROWS.filter((r) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      r.studentName.toLowerCase().includes(q) ||
      r.serial.toLowerCase().includes(q) ||
      r.creatorName.toLowerCase().includes(q) ||
      r.course.toLowerCase().includes(q)
    const matchCourse = courseFilter === 'All courses' || r.course === courseFilter
    return matchSearch && matchCourse
  })

  return (
    <AdminShell activeId="certificates">
      {/* page header */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <p
            className="hm-mono text-[10.5px] mb-2"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
          >
            PLATFORM
          </p>
          <h1
            className="text-[26px] font-semibold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            Certificates
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            All certificates issued across every course on the platform.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold shrink-0"
          style={{
            background: 'var(--hm-bg-card)',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text-muted)',
          }}
        >
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      {/* Table card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border-strong)' }}
      >
        {/* toolbar */}
        <div
          className="flex items-center gap-3 px-5 py-3.5 flex-wrap"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          <div className="relative flex-1 min-w-0 max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
              style={{ color: 'var(--hm-text-dim)' }}
            />
            <input
              type="text"
              placeholder="Search student, creator, serial…"
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
            {visible.length} of {ROWS.length}
          </span>
        </div>

        {/* table */}
        <table className="w-full border-collapse">
          <thead>
            <tr
              style={{
                background: 'var(--hm-bg-card-2)',
                borderBottom: '1px solid var(--hm-border)',
              }}
            >
              {['User', 'Course', 'Creator', 'Certificate ID', 'Created at', 'Status', ''].map(
                (h, i) => (
                  <th
                    key={i}
                    className="hm-mono px-4 py-3 text-[9.5px] font-bold tracking-[0.10em]"
                    style={{
                      color: 'var(--hm-text-dim)',
                      textAlign: h === '' || h === 'Status' ? 'center' : 'left',
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, idx) => {
              const st = STATUS[row.status]
              return (
                <tr
                  key={row.id}
                  style={{ borderTop: idx === 0 ? 'none' : '1px solid var(--hm-border)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(255,255,255,0.015)')
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* User */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full hm-mono text-[9.5px] font-bold shrink-0"
                        style={{
                          background: `${VIOLET}20`,
                          color: VIOLET,
                          border: `1px solid ${VIOLET}30`,
                        }}
                      >
                        {row.studentInitials}
                      </span>
                      <div>
                        <p
                          className="text-[12.5px] font-medium leading-tight"
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
                  <td className="px-4 py-3">
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

                  {/* Creator */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full hm-mono text-[9px] font-bold shrink-0"
                        style={{
                          background: `${AMBER}20`,
                          color: AMBER,
                          border: `1px solid ${AMBER}30`,
                        }}
                      >
                        {row.creatorInitials}
                      </span>
                      <span className="text-[12.5px]" style={{ color: 'var(--hm-text-muted)' }}>
                        {row.creatorName}
                      </span>
                    </div>
                  </td>

                  {/* Certificate ID */}
                  <td className="px-4 py-3">
                    <span className="hm-mono text-[11.5px] font-semibold" style={{ color: AMBER }}>
                      {row.serial}
                    </span>
                  </td>

                  {/* Created at */}
                  <td className="px-4 py-3">
                    <span className="hm-mono text-[11.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                      {row.issuedAt}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className="hm-mono inline-flex items-center px-2 py-0.5 rounded text-[9.5px] font-bold tracking-[0.06em]"
                      style={{ background: st.bg, color: st.fg }}
                    >
                      {st.label.toUpperCase()}
                    </span>
                  </td>

                  {/* 3-dot */}
                  <td className="px-3 py-3 text-center relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setMenuOpen(menuOpen === row.id ? null : row.id)
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg mx-auto"
                      style={{
                        background: menuOpen === row.id ? 'var(--hm-bg-card-2)' : 'transparent',
                        color: 'var(--hm-text-dim)',
                        border: `1px solid ${menuOpen === row.id ? 'var(--hm-border)' : 'transparent'}`,
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {menuOpen === row.id && (
                      <>
                        <button
                          type="button"
                          className="fixed inset-0 z-10 cursor-default"
                          style={{ background: 'transparent', border: 'none' }}
                          onClick={() => setMenuOpen(null)}
                        />
                        <div
                          className="absolute right-3 z-20 rounded-xl overflow-hidden shadow-xl"
                          style={{
                            top: '100%',
                            minWidth: 160,
                            background: 'var(--hm-bg-card)',
                            border: '1px solid var(--hm-border-strong)',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setDetailCert(row)
                              setMenuOpen(null)
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] text-left"
                            style={{ color: 'var(--hm-text)' }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = 'var(--hm-bg-card-2)')
                            }
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            <Award className="h-3.5 w-3.5" style={{ color: GREEN }} />
                            View details
                          </button>
                          <div style={{ borderTop: '1px solid var(--hm-border)' }}>
                            <button
                              type="button"
                              onClick={() => setMenuOpen(null)}
                              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[12px] text-left"
                              style={{ color: ACCENT }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = 'rgba(244,99,110,0.08)')
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background = 'transparent')
                              }
                            >
                              <ShieldOff className="h-3.5 w-3.5" />
                              {row.status === 'revoked' ? 'Restore' : 'Revoke'}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* footer */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
            Showing {visible.length} of {ROWS.length} certificates
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

      {/* Detail modal */}
      {detailCert && <CertDetailModal cert={detailCert} onClose={() => setDetailCert(null)} />}
    </AdminShell>
  )
}
