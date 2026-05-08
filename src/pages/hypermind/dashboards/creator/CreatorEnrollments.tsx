import { useState, type ReactNode } from 'react'
import {
  Search,
  MoreHorizontal,
  UserPlus,
  TrendingUp,
  CheckCircle2,
  Users as UsersIcon,
} from 'lucide-react'
import CreatorShell from '../_shared/CreatorShell'
import { FilterSelect } from '../_shared/FilterSelect'

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

type EnrollStatus = 'active' | 'completed' | 'dropped' | 'refunded'
const STATUS_TONE: Record<EnrollStatus, Tone> = {
  active: 'info',
  completed: 'success',
  dropped: 'neutral',
  refunded: 'danger',
}

interface Row {
  id: string
  name: string
  email: string
  course: string
  enrolled_at: string
  progress: number
  status: EnrollStatus
  last_active: string
}

const ROWS: Row[] = [
  {
    id: 'e-01',
    name: 'Mei Chen',
    email: 'mei.chen@gmail.com',
    course: 'Watercolor Foundations',
    enrolled_at: 'Mar 12, 2026',
    progress: 92,
    status: 'active',
    last_active: '12 min ago',
  },
  {
    id: 'e-02',
    name: "Liam O'Brien",
    email: 'liam.obrien@yahoo.com',
    course: 'Watercolor Foundations',
    enrolled_at: 'Mar 14, 2026',
    progress: 100,
    status: 'completed',
    last_active: '2h ago',
  },
  {
    id: 'e-03',
    name: 'Aisha Rahman',
    email: 'aisha.rahman@outlook.com',
    course: 'Spanish for Travelers',
    enrolled_at: 'Mar 19, 2026',
    progress: 64,
    status: 'active',
    last_active: '1h ago',
  },
  {
    id: 'e-04',
    name: 'Daniel Becker',
    email: 'daniel.becker@gmail.com',
    course: 'Personal Finance 101',
    enrolled_at: 'Mar 22, 2026',
    progress: 18,
    status: 'active',
    last_active: 'yesterday',
  },
  {
    id: 'e-05',
    name: 'Camila Ortega',
    email: 'camila.ortega@gmail.com',
    course: 'Acoustic Guitar Mastery',
    enrolled_at: 'Mar 24, 2026',
    progress: 100,
    status: 'completed',
    last_active: '3d ago',
  },
  {
    id: 'e-06',
    name: 'Tomás Vargas',
    email: 'tomas.vargas@gmail.com',
    course: 'Watercolor Foundations',
    enrolled_at: 'Apr 02, 2026',
    progress: 46,
    status: 'active',
    last_active: '5h ago',
  },
  {
    id: 'e-07',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@gmail.com',
    course: 'Wine Tasting Foundations',
    enrolled_at: 'Apr 05, 2026',
    progress: 8,
    status: 'dropped',
    last_active: '2w ago',
  },
  {
    id: 'e-08',
    name: 'Noah Wright',
    email: 'noah.wright@gmail.com',
    course: 'Spanish for Travelers',
    enrolled_at: 'Apr 09, 2026',
    progress: 72,
    status: 'active',
    last_active: '30 min ago',
  },
  {
    id: 'e-09',
    name: 'Sofia Andersen',
    email: 'sofia.andersen@gmail.com',
    course: 'Personal Finance 101',
    enrolled_at: 'Apr 11, 2026',
    progress: 0,
    status: 'refunded',
    last_active: '—',
  },
  {
    id: 'e-10',
    name: 'Khalid Hassan',
    email: 'khalid.hassan@gmail.com',
    course: 'Korean N3 Prep',
    enrolled_at: 'Apr 18, 2026',
    progress: 34,
    status: 'active',
    last_active: '1h ago',
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

function Stat({
  Icon,
  label,
  value,
  tone,
}: {
  Icon: any
  label: string
  value: string
  tone: string
}) {
  return (
    <div
      className="rounded-xl p-3.5"
      style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
          style={{ background: `${tone}1f`, color: tone }}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p
          className="hm-mono text-[9.5px]"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
        >
          {label.toUpperCase()}
        </p>
      </div>
      <p
        className="hm-mono text-[20px] font-semibold leading-none"
        style={{ color: 'var(--hm-text)' }}
      >
        {value}
      </p>
    </div>
  )
}

const COURSE_FILTER_OPTIONS = [
  { value: 'Watercolor Foundations', label: 'Watercolor Foundations' },
  { value: 'Spanish for Travelers', label: 'Spanish for Travelers' },
  { value: 'Personal Finance 101', label: 'Personal Finance 101' },
  { value: 'Acoustic Guitar Mastery', label: 'Acoustic Guitar Mastery' },
  { value: 'Wine Tasting Foundations', label: 'Wine Tasting Foundations' },
  { value: 'Mindful Home Cooking', label: 'Mindful Home Cooking' },
  { value: 'Modern Photography', label: 'Modern Photography' },
  { value: 'Urban Sketching', label: 'Urban Sketching' },
]
const STATUS_FILTER_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'dropped', label: 'Dropped' },
  { value: 'refunded', label: 'Refunded' },
]
const PROGRESS_OPTIONS = [
  { value: '0', label: '0 – 25%' },
  { value: '25', label: '25 – 50%' },
  { value: '50', label: '50 – 75%' },
  { value: '75', label: '75 – 100%' },
]

export default function CreatorEnrollments() {
  const [courseF, setCourseF] = useState('')
  const [statusF, setStatusF] = useState('')
  const [progressF, setProgressF] = useState('')
  return (
    <CreatorShell activeId="enrollments">
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
          Enrollments
        </h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
          Every learner across your courses, with live progress and engagement.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Stat Icon={UsersIcon} tone="#A78BFA" label="Total enrolled" value="4,240" />
        <Stat Icon={TrendingUp} tone="#5BC8C5" label="Active learners" value="3,612" />
        <Stat Icon={CheckCircle2} tone="#5EE6A8" label="Completed" value="528" />
        <Stat Icon={UserPlus} tone={ACCENT} label="Avg progress" value="64%" />
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[260px] max-w-[420px]">
          <Search
            className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--hm-text-dim)' }}
          />
          <input
            type="text"
            placeholder="Search learners by name or email…"
            className="w-full pl-9 pr-3 h-9 rounded-lg text-[12.5px] outline-none"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text)',
            }}
          />
        </div>
        <FilterSelect
          label="Course"
          value={courseF}
          onChange={setCourseF}
          options={COURSE_FILTER_OPTIONS}
        />
        <FilterSelect
          label="Status"
          value={statusF}
          onChange={setStatusF}
          options={STATUS_FILTER_OPTIONS}
        />
        <FilterSelect
          label="Progress"
          value={progressF}
          onChange={setProgressF}
          options={PROGRESS_OPTIONS}
        />
        <span
          className="hm-mono text-[10.5px] ml-auto"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
        >
          {ROWS.length} OF {ROWS.length}
        </span>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px]" style={{ color: 'var(--hm-text)' }}>
            <thead>
              <tr style={{ background: 'var(--hm-bg-card-2)' }}>
                {['Learner', 'Course', 'Enrolled', 'Progress', 'Status', 'Last active', ''].map(
                  (h, i) => (
                    <th
                      key={h + i}
                      className="hm-mono text-[10px] font-semibold px-4 py-2.5"
                      style={{
                        color: 'var(--hm-text-dim)',
                        letterSpacing: '0.12em',
                        borderBottom: '1px solid var(--hm-border)',
                      }}
                    >
                      {h.toUpperCase()}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr
                  key={r.id}
                  style={{ borderTop: i === 0 ? 'none' : '1px solid var(--hm-border)' }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full shrink-0 hm-mono text-[10px] font-semibold"
                        style={{
                          background: `linear-gradient(180deg, ${TONE_FG.violet} 0%, ${TONE_FG.violet}cc 100%)`,
                          color: 'white',
                        }}
                      >
                        {r.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium truncate" style={{ color: 'var(--hm-text)' }}>
                          {r.name}
                        </p>
                        <p
                          className="hm-mono text-[10px] truncate"
                          style={{ color: 'var(--hm-text-dim)' }}
                        >
                          {r.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px]" style={{ color: 'var(--hm-text-muted)' }}>
                      {r.course}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="hm-mono text-[11px]"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.04em' }}
                    >
                      {r.enrolled_at}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ minWidth: 180 }}>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-1.5 flex-1 rounded-full overflow-hidden"
                        style={{ background: 'var(--hm-bg-card-2)' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${r.progress}%`,
                            background:
                              r.progress === 100
                                ? `linear-gradient(90deg, ${TONE_FG.success} 0%, ${TONE_FG.teal} 100%)`
                                : `linear-gradient(90deg, ${ACCENT} 0%, ${TONE_FG.violet} 100%)`,
                          }}
                        />
                      </div>
                      <span
                        className="hm-mono text-[11px] shrink-0 w-10 text-right"
                        style={{ color: 'var(--hm-text)', letterSpacing: '0.04em' }}
                      >
                        {r.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Pill tone={STATUS_TONE[r.status]}>{r.status}</Pill>
                  </td>
                  <td className="px-4 py-3">
                    <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                      {r.last_active}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ textAlign: 'right', width: 40 }}>
                    <button
                      type="button"
                      aria-label="Enrollment actions"
                      className="flex h-7 w-7 items-center justify-center rounded-md ml-auto"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="flex items-center justify-between gap-4 px-4 py-2.5"
          style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <span
            className="hm-mono text-[10px]"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
          >
            SHOWING 1–{ROWS.length} OF {ROWS.length}
          </span>
          <span
            className="hm-mono inline-flex items-center justify-center w-7 h-7 rounded-md text-[11px] font-semibold"
            style={{
              background: ACCENT_SOFT,
              color: ACCENT,
              border: `1px solid ${ACCENT}55`,
              boxShadow: `0 0 0 3px ${ACCENT}14`,
            }}
          >
            1
          </span>
        </div>
      </div>
    </CreatorShell>
  )
}
