import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Play,
  MoreVertical,
  Star,
  TrendingUp,
  Award,
  ChevronRight,
  Filter,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, GREEN, AMBER, BLUE } from './StudentShell'

const TABS = ['All', 'In Progress', 'Completed', 'Archived'] as const
type Tab = (typeof TABS)[number]

const COURSES = [
  {
    id: 'c1',
    title: 'Watercolor Foundations',
    instructor: 'Sarah Lin',
    progress: 68,
    lessons: 42,
    done: 28,
    duration: '12h 30m',
    lastLesson: 'Setting up your workspace',
    color: '#F4B26C',
    status: 'in_progress',
    rating: null,
    enrolled: 'Jan 2026',
  },
  {
    id: 'c2',
    title: 'Spanish for Travelers',
    instructor: 'Marco Reyes',
    progress: 34,
    lessons: 30,
    done: 10,
    duration: '9h 15m',
    lastLesson: 'Airport & Travel Phrases',
    color: VIOLET,
    status: 'in_progress',
    rating: null,
    enrolled: 'Feb 2026',
  },
  {
    id: 'c3',
    title: 'Personal Finance 101',
    instructor: 'Dana Kwon',
    progress: 12,
    lessons: 24,
    done: 3,
    duration: '7h 45m',
    lastLesson: 'Budgeting Fundamentals',
    color: BLUE,
    status: 'in_progress',
    rating: null,
    enrolled: 'Mar 2026',
  },
  {
    id: 'c4',
    title: 'Python for Beginners',
    instructor: 'Amir Salehi',
    progress: 100,
    lessons: 40,
    done: 40,
    duration: '16h',
    lastLesson: 'Completed',
    color: GREEN,
    status: 'completed',
    rating: 5,
    enrolled: 'Nov 2025',
  },
  {
    id: 'c5',
    title: 'Productivity Masterclass',
    instructor: 'Yuki Tanaka',
    progress: 100,
    lessons: 22,
    done: 22,
    duration: '8h',
    lastLesson: 'Completed',
    color: '#A78BFA',
    status: 'completed',
    rating: 4,
    enrolled: 'Oct 2025',
  },
  {
    id: 'c6',
    title: 'Basic Photography',
    instructor: 'Chen Wei',
    progress: 52,
    lessons: 18,
    done: 9,
    duration: '6h 20m',
    lastLesson: 'Aperture & Depth of Field',
    color: '#5BC8C5',
    status: 'in_progress',
    rating: null,
    enrolled: 'Mar 2026',
  },
]

function StatPill({ label, val, color }: { label: string; val: string | number; color: string }) {
  return (
    <div
      className="rounded-2xl px-5 py-4 flex flex-col gap-1.5"
      style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
    >
      <p className="hm-mono text-[22px] font-bold leading-none" style={{ color: 'var(--hm-text)' }}>
        {val}
      </p>
      <p className="text-[11.5px]" style={{ color: 'var(--hm-text-muted)' }}>
        {label}
      </p>
    </div>
  )
}

export default function StudentMyCourses() {
  const [activeTab, setActiveTab] = useState<Tab>('All')

  const filtered = COURSES.filter((c) => {
    if (activeTab === 'All') return true
    if (activeTab === 'In Progress') return c.status === 'in_progress'
    if (activeTab === 'Completed') return c.status === 'completed'
    return false
  })

  const inProgress = COURSES.filter((c) => c.status === 'in_progress').length
  const completed = COURSES.filter((c) => c.status === 'completed').length
  const hoursTotal = '84.5'

  return (
    <StudentShell>
      <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="hm-mono text-[10px] mb-2" style={{ color: VIOLET, letterSpacing: '0.2em' }}>
            LEARNING
          </p>
          <h1
            className="text-[26px] font-bold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            My Courses
          </h1>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color: VIOLET }}
        >
          Browse more courses <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatPill label="Total enrolled" val={COURSES.length} color={VIOLET} />
        <StatPill label="In progress" val={inProgress} color={AMBER} />
        <StatPill label="Completed" val={completed} color={GREEN} />
        <StatPill label="Hours learned" val={hoursTotal + 'h'} color={BLUE} />
      </div>

      {/* Tabs */}
      <div
        className="flex items-center gap-1 mb-5"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveTab(t)}
            className="px-4 pb-3 pt-1 text-[13px] font-medium relative"
            style={{ color: activeTab === t ? VIOLET : 'var(--hm-text-muted)' }}
          >
            {t}
            {activeTab === t && (
              <span
                className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                style={{ background: VIOLET }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Course list */}
      <div className="flex flex-col gap-3">
        {filtered.map((c) => (
          <Link
            key={c.id}
            to={`/student/courses/${c.id}`}
            className="rounded-2xl overflow-hidden cursor-pointer group block"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div className="flex items-stretch gap-0">
              {/* Thumbnail strip */}
              <div
                className="w-2 shrink-0"
                style={{ background: `linear-gradient(180deg, ${c.color} 0%, ${VIOLET} 100%)` }}
              />

              {/* Main content */}
              <div className="flex-1 min-w-0 px-5 py-4">
                <div className="flex items-start gap-4">
                  {/* Thumbnail icon */}
                  <div
                    className="h-14 w-14 rounded-xl flex items-center justify-center shrink-0 hidden sm:flex"
                    style={{ background: `${c.color}18` }}
                  >
                    <BookOpen className="h-6 w-6" style={{ color: c.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3
                          className="text-[14.5px] font-semibold truncate"
                          style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
                        >
                          {c.title}
                        </h3>
                        <p className="text-[12px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                          {c.instructor}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {c.status === 'completed' && (
                          <span
                            className="hm-mono text-[9px] px-2 py-0.5 rounded-full font-semibold inline-flex items-center gap-1"
                            style={{
                              background: 'rgba(94,230,168,0.14)',
                              color: GREEN,
                              letterSpacing: '0.08em',
                            }}
                          >
                            <CheckCircle2 className="h-3 w-3" /> DONE
                          </span>
                        )}
                        {c.status === 'completed' && c.rating && (
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className="h-3 w-3"
                                style={{ color: AMBER, fill: i <= c.rating! ? AMBER : 'none' }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11.5px]" style={{ color: 'var(--hm-text-muted)' }}>
                          {c.done}/{c.lessons} lessons
                        </span>
                        <span
                          className="hm-mono text-[11.5px] font-semibold"
                          style={{ color: c.progress === 100 ? GREEN : c.color }}
                        >
                          {c.progress}%
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: 'var(--hm-bg-card-2)' }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${c.progress}%`,
                            background:
                              c.progress === 100
                                ? `linear-gradient(90deg, ${GREEN} 0%, #A7F3D0 100%)`
                                : `linear-gradient(90deg, ${c.color} 0%, ${VIOLET} 100%)`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <span
                        className="flex items-center gap-1 text-[11.5px]"
                        style={{ color: 'var(--hm-text-dim)' }}
                      >
                        <Clock className="h-3.5 w-3.5" /> {c.duration}
                      </span>
                      <span className="text-[11.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                        Enrolled {c.enrolled}
                      </span>
                      {c.status === 'in_progress' && (
                        <span
                          className="text-[11.5px] truncate"
                          style={{ color: 'var(--hm-text-muted)' }}
                        >
                          Next: <span style={{ color: 'var(--hm-text)' }}>{c.lastLesson}</span>
                        </span>
                      )}
                      {c.status === 'in_progress' && (
                        <Link
                          to={`/student/courses/${c.id}/learn`}
                          className="ml-auto inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-semibold shrink-0"
                          style={{
                            background: VIOLET,
                            color: 'white',
                            boxShadow: `0 4px 12px ${VIOLET}44`,
                            textDecoration: 'none',
                          }}
                        >
                          <Play className="h-3.5 w-3.5 fill-white" /> Continue
                        </Link>
                      )}
                      {c.status === 'completed' && (
                        <Link
                          to="/student/certificates"
                          className="ml-auto inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-medium shrink-0"
                          style={{
                            background: 'var(--hm-bg-card-2)',
                            border: '1px solid var(--hm-border)',
                            color: 'var(--hm-text-muted)',
                            textDecoration: 'none',
                          }}
                        >
                          <Award className="h-3.5 w-3.5" /> Certificate
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </StudentShell>
  )
}
