import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  ChevronDown,
  Star,
  Clock,
  Users,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  ShieldCheck,
  Check,
  LayoutGrid,
  List,
  Briefcase,
  Languages,
  Camera,
  Music,
  DollarSign,
  Brush,
  ChefHat,
  Heart,
  Mic,
  Code2,
  GraduationCap,
  Sparkles,
} from 'lucide-react'
import StudentShell, { VIOLET, AMBER } from './StudentShell'

const CATEGORIES = [
  { name: 'All', icon: BookOpen, count: 12480 },
  { name: 'Business', icon: Briefcase, count: 412 },
  { name: 'Languages', icon: Languages, count: 286 },
  { name: 'Photography', icon: Camera, count: 197 },
  { name: 'Music', icon: Music, count: 184 },
  { name: 'Finance', icon: DollarSign, count: 161 },
  { name: 'Arts & Crafts', icon: Brush, count: 148 },
  { name: 'Cooking', icon: ChefHat, count: 127 },
  { name: 'Health', icon: Heart, count: 119 },
  { name: 'Communication', icon: Mic, count: 98 },
  { name: 'Tech & Coding', icon: Code2, count: 342 },
  { name: 'Personal Growth', icon: Sparkles, count: 211 },
  { name: 'Academics', icon: GraduationCap, count: 173 },
]

type Course = {
  id: string
  title: string
  instructor: string
  initials: string
  category: string
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: string
  reviews: string
  duration: string
  students: string
  description: string
  price: string
  badge?: 'Bestseller' | 'New' | 'Trending'
  verified?: boolean
}

const COURSES: Course[] = [
  {
    id: 'c01',
    title: 'Watercolor Foundations',
    instructor: 'Sarah Lin',
    initials: 'SL',
    category: 'Arts & Crafts',
    Icon: Brush,
    level: 'Beginner',
    rating: '4.9',
    reviews: '12.4k',
    duration: '8h 20m',
    students: '24k',
    description: 'Learn light-to-dark layering, wet-on-wet washes, and your first 10 still-lifes.',
    price: '$19',
    badge: 'Bestseller',
    verified: true,
  },
  {
    id: 'c02',
    title: 'Spanish for Travelers (A1→A2)',
    instructor: 'Carlos Mendoza',
    initials: 'CM',
    category: 'Languages',
    Icon: Languages,
    level: 'Beginner',
    rating: '4.8',
    reviews: '18.6k',
    duration: '12h 10m',
    students: '38k',
    description: 'Speak confidently in restaurants, taxis, and markets in 6 weeks.',
    price: 'Free',
    verified: true,
  },
  {
    id: 'c03',
    title: 'Acoustic Guitar Mastery',
    instructor: 'David Park',
    initials: 'DP',
    category: 'Music',
    Icon: Music,
    level: 'Intermediate',
    rating: '4.9',
    reviews: '9.1k',
    duration: '16h 45m',
    students: '11k',
    description: 'Fingerstyle technique, chord transitions, and your first 5 songs end-to-end.',
    price: '$29',
    verified: true,
  },
  {
    id: 'c04',
    title: 'Personal Finance 101',
    instructor: 'Priya Shah',
    initials: 'PS',
    category: 'Finance',
    Icon: DollarSign,
    level: 'Beginner',
    rating: '4.9',
    reviews: '22.3k',
    duration: '6h 30m',
    students: '47k',
    description: 'Budget, save, and invest your first $10k with confidence — no jargon.',
    price: 'Free',
    badge: 'Trending',
    verified: true,
  },
  {
    id: 'c05',
    title: 'Modern React Patterns',
    instructor: 'Sarah Drasner',
    initials: 'SD',
    category: 'Tech & Coding',
    Icon: Code2,
    level: 'Advanced',
    rating: '4.9',
    reviews: '12.4k',
    duration: '14h 20m',
    students: '8k',
    description: 'Master advanced component patterns, performance, and custom hooks in React 19.',
    price: '$39',
    badge: 'Bestseller',
    verified: true,
  },
  {
    id: 'c06',
    title: 'Mindful Photography',
    instructor: 'Maya Chen',
    initials: 'MC',
    category: 'Photography',
    Icon: Camera,
    level: 'Beginner',
    rating: '4.7',
    reviews: '5.2k',
    duration: '5h 40m',
    students: '9k',
    description: 'Composition, light, and seeing the world like a photographer — phone or DSLR.',
    price: '$15',
    verified: true,
  },
  {
    id: 'c07',
    title: 'Italian Pasta from Scratch',
    instructor: 'Marco Rossi',
    initials: 'MR',
    category: 'Cooking',
    Icon: ChefHat,
    level: 'Beginner',
    rating: '4.8',
    reviews: '7.8k',
    duration: '4h 15m',
    students: '14k',
    description: 'Six handmade pastas, three classic sauces, and a pantry that delivers nightly.',
    price: '$19',
    badge: 'New',
    verified: true,
  },
  {
    id: 'c08',
    title: 'Yoga for Strength',
    instructor: 'Aarya Joshi',
    initials: 'AJ',
    category: 'Health',
    Icon: Heart,
    level: 'Intermediate',
    rating: '4.8',
    reviews: '11.0k',
    duration: '10h 00m',
    students: '19k',
    description: 'Daily 20-minute flows that build mobility, core strength, and lasting calm.',
    price: 'Free',
    verified: true,
  },
  {
    id: 'c09',
    title: 'Public Speaking Mastery',
    instructor: 'Jordan Reyes',
    initials: 'JR',
    category: 'Communication',
    Icon: Mic,
    level: 'Intermediate',
    rating: '4.9',
    reviews: '8.4k',
    duration: '7h 30m',
    students: '13k',
    description: 'Structure talks, manage stage anxiety, and deliver memorable openings + closes.',
    price: '$29',
    verified: true,
  },
]

const LEVELS = [
  { name: 'Beginner', count: 5412 },
  { name: 'Intermediate', count: 4318 },
  { name: 'Advanced', count: 2750 },
] as const
const DURATIONS = ['Under 3 hours', '3 – 10 hours', '10 – 25 hours', '25+ hours']
const RATINGS = [
  { value: 4.5, label: '4.5 & up' },
  { value: 4.0, label: '4.0 & up' },
  { value: 3.5, label: '3.5 & up' },
]

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="hm-mono text-[10px] mb-3"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
      >
        {label}
      </h3>
      {children}
    </div>
  )
}

function CheckRow({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean
  onChange: () => void
  label: string
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center justify-between gap-2 px-1 py-1 text-left rounded w-full"
    >
      <span className="flex items-center gap-2.5">
        <span
          className="w-4 h-4 rounded shrink-0 flex items-center justify-center transition-colors"
          style={{
            background: checked ? 'var(--hm-violet-2)' : 'var(--hm-bg-card-2)',
            border: `1px solid ${checked ? 'var(--hm-violet-2)' : 'var(--hm-border)'}`,
          }}
        >
          {checked && <Check className="w-3 h-3" style={{ color: '#fff' }} strokeWidth={3} />}
        </span>
        <span
          className="text-[12.5px]"
          style={{ color: checked ? 'var(--hm-text)' : 'var(--hm-text-muted)' }}
        >
          {label}
        </span>
      </span>
      <span className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
        {count.toLocaleString()}
      </span>
    </button>
  )
}

function CourseCard({ course, mode }: { course: Course; mode: 'grid' | 'list' }) {
  const Icon = course.Icon
  const isList = mode === 'list'
  return (
    <Link
      to={`/student/courses/${course.id}`}
      className={`hm-card hm-card-hover group flex ${isList ? 'flex-row' : 'flex-col'} overflow-hidden cursor-pointer`}
      style={{ textDecoration: 'none' }}
    >
      {/* Cover */}
      <div
        className={`relative ${isList ? 'h-auto w-48 shrink-0' : 'h-36 w-full'} overflow-hidden`}
        style={{
          background:
            'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.04) 100%)',
          borderBottom: isList ? 'none' : '1px solid var(--hm-border)',
          borderRight: isList ? '1px solid var(--hm-border)' : 'none',
        }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(167,139,250,0.18) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-1 z-10">
          <span
            className="hm-mono inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wide"
            style={{
              background: 'rgba(11,12,30,0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: 'var(--hm-text)',
              border: '1px solid var(--hm-border-strong)',
              letterSpacing: '0.08em',
            }}
          >
            <Icon className="w-2.5 h-2.5" style={{ color: 'var(--hm-violet-2)' }} />
            {course.category}
          </span>
          {course.badge && (
            <span
              className="hm-mono px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wide"
              style={{
                background: 'var(--hm-amber-soft)',
                color: 'var(--hm-amber)',
                border: '1px solid rgba(244,178,108,0.28)',
                letterSpacing: '0.08em',
              }}
            >
              {course.badge}
            </span>
          )}
        </div>
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-2xl"
            style={{
              background: 'var(--hm-violet-soft)',
              border: '1px solid var(--hm-border-accent)',
              boxShadow: '0 8px 28px -8px rgba(139,92,246,0.40)',
            }}
          >
            <Icon className="w-6 h-6" style={{ color: 'var(--hm-violet-2)' }} />
          </div>
        </div>
        {/* Level badge bottom-right */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <span
            className="hm-mono inline-flex px-1.5 py-0.5 rounded-full text-[9px] font-semibold"
            style={{
              background: 'rgba(11,12,30,0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              color: 'var(--hm-text-muted)',
              border: '1px solid var(--hm-border-strong)',
            }}
          >
            {course.level}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="text-[13.5px] font-semibold leading-snug"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.012em' }}
          >
            {course.title}
          </h3>
          {course.verified && (
            <ShieldCheck
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
              style={{ color: 'var(--hm-violet-2)', opacity: 0.7 }}
            />
          )}
        </div>
        <p className="text-[11.5px] mb-2" style={{ color: 'var(--hm-text-dim)' }}>
          {course.instructor}
        </p>
        <p
          className="text-[12px] mb-3 flex-1 line-clamp-2"
          style={{ color: 'var(--hm-text-muted)', lineHeight: 1.5 }}
        >
          {course.description}
        </p>

        {/* Rating + stats */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="w-3 h-3"
                style={{
                  color:
                    s <= Math.floor(Number(course.rating))
                      ? 'var(--hm-amber)'
                      : 'var(--hm-border-strong)',
                  fill: s <= Math.floor(Number(course.rating)) ? 'var(--hm-amber)' : 'transparent',
                }}
              />
            ))}
          </div>
          <span className="hm-mono text-[11px] font-bold" style={{ color: 'var(--hm-text)' }}>
            {course.rating}
          </span>
          <span className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
            ({course.reviews})
          </span>
          <span style={{ color: 'var(--hm-border-strong)' }}>·</span>
          <Users className="w-3 h-3" style={{ color: 'var(--hm-text-dim)' }} />
          <span className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
            {course.students}
          </span>
          <span style={{ color: 'var(--hm-border-strong)' }}>·</span>
          <Clock className="w-3 h-3" style={{ color: 'var(--hm-text-dim)' }} />
          <span className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
            {course.duration}
          </span>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid var(--hm-border)' }}
        >
          <span
            className="hm-mono text-[16px] font-bold"
            style={{ color: course.price === 'Free' ? 'var(--hm-violet-2)' : 'var(--hm-text)' }}
          >
            {course.price}
          </span>
          <span className="hm-btn-primary h-8 px-4 text-[12px] gap-1.5 cursor-pointer">Enroll</span>
        </div>
      </div>
    </Link>
  )
}

export default function StudentCourses() {
  const [activeCat, setActiveCat] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [price, setPrice] = useState<'all' | 'free' | 'paid'>('all')
  const [selectedLevels, setSelectedLevels] = useState(new Set(['Beginner']))
  const [selectedDurs, setSelectedDurs] = useState(new Set(['3 – 10 hours']))
  const [activeRating, setActiveRating] = useState(4.5)

  const toggleSet = (set: Set<string>, val: string, fn: (s: Set<string>) => void) => {
    const next = new Set(set)
    if (next.has(val)) next.delete(val)
    else next.add(val)
    fn(next)
  }

  return (
    <StudentShell activeTab="courses">
      {/* ── Hero ── */}
      <section className="relative pb-10 pt-2">
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full blur-[120px] opacity-35 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.30) 0%, transparent 65%)',
          }}
        />
        <div className="relative text-center max-w-2xl mx-auto">
          <span className="hm-eyebrow mb-3" style={{ justifyContent: 'center' }}>
            <BookOpen className="w-3 h-3" /> All courses
          </span>
          <h1
            className="mt-3 text-[38px] font-semibold mb-3"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.032em', lineHeight: 1.05 }}
          >
            Browse <span className="hm-grad-text">12,480 courses</span>{' '}
            <span
              className="hm-serif-italic"
              style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
            >
              worth learning.
            </span>
          </h1>
          <p
            className="text-[14.5px] max-w-lg mx-auto mb-7"
            style={{ color: 'var(--hm-text-muted)', lineHeight: 1.55 }}
          >
            Twelve disciplines, hand-picked instructors, and a verifiable certificate every time you
            finish.
          </p>
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'var(--hm-text-dim)' }}
            />
            <input
              type="text"
              placeholder="Search courses, instructors, topics…"
              className="w-full h-11 pl-11 pr-28 rounded-full text-[13.5px] outline-none transition-colors"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border-strong)',
                color: 'var(--hm-text)',
                boxShadow: '0 6px 20px -8px rgba(0,0,0,0.4)',
              }}
            />
            <button
              type="button"
              className="hm-btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-4 text-[12px]"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ── Category pills ── */}
      <section className="mb-9">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.name
            const Icon = cat.icon
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setActiveCat(cat.name)}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors"
                style={{
                  background: isActive ? 'var(--hm-violet-soft)' : 'var(--hm-bg-card)',
                  color: isActive ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                  border: `1px solid ${isActive ? 'var(--hm-border-accent)' : 'var(--hm-border)'}`,
                }}
              >
                <Icon
                  className="w-3 h-3"
                  style={{ color: isActive ? 'var(--hm-violet-2)' : 'var(--hm-text-dim)' }}
                />
                {cat.name}
                <span className="hm-mono text-[9.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                  {cat.count.toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Filters + grid ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Sidebar */}
        <aside className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          <FilterGroup label="LEVEL">
            <div className="flex flex-col gap-1.5">
              {LEVELS.map((l) => (
                <CheckRow
                  key={l.name}
                  checked={selectedLevels.has(l.name)}
                  onChange={() => toggleSet(selectedLevels, l.name, setSelectedLevels)}
                  label={l.name}
                  count={l.count}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="DURATION">
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'Under 3 hours', count: 1240 },
                { label: '3 – 10 hours', count: 6812 },
                { label: '10 – 25 hours', count: 3510 },
                { label: '25+ hours', count: 918 },
              ].map((d) => (
                <CheckRow
                  key={d.label}
                  checked={selectedDurs.has(d.label)}
                  onChange={() => toggleSet(selectedDurs, d.label, setSelectedDurs)}
                  label={d.label}
                  count={d.count}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="PRICE">
            <div className="grid grid-cols-3 gap-1.5">
              {(['all', 'free', 'paid'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrice(p)}
                  className="h-8 text-[11.5px] font-medium rounded-md capitalize transition-colors"
                  style={{
                    background: price === p ? 'var(--hm-violet-soft)' : 'var(--hm-bg-card)',
                    color: price === p ? 'var(--hm-text)' : 'var(--hm-text-muted)',
                    border: `1px solid ${price === p ? 'var(--hm-border-accent)' : 'var(--hm-border)'}`,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="RATING">
            <div className="flex flex-col gap-1.5">
              {RATINGS.map((r) => {
                const active = activeRating === r.value
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setActiveRating(r.value)}
                    className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-left transition-colors"
                    style={{
                      background: active ? 'var(--hm-violet-soft)' : 'transparent',
                      border: `1px solid ${active ? 'var(--hm-border-accent)' : 'transparent'}`,
                    }}
                  >
                    <span className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="w-3 h-3"
                          style={{
                            color:
                              s <= Math.floor(r.value)
                                ? 'var(--hm-amber)'
                                : 'var(--hm-border-strong)',
                            fill: s <= Math.floor(r.value) ? 'var(--hm-amber)' : 'transparent',
                          }}
                        />
                      ))}
                      <span
                        className="hm-mono text-[10.5px] ml-1"
                        style={{ color: 'var(--hm-text)' }}
                      >
                        {r.label}
                      </span>
                    </span>
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center"
                      style={{
                        background: active ? 'var(--hm-violet-2)' : 'transparent',
                        border: `1px solid ${active ? 'var(--hm-violet-2)' : 'var(--hm-border-strong)'}`,
                      }}
                    >
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#fff' }} />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </FilterGroup>

          {/* Cert notice */}
          <div className="hm-card p-4 flex gap-3">
            <ShieldCheck
              className="w-4 h-4 shrink-0 mt-0.5"
              style={{ color: 'var(--hm-violet-2)' }}
            />
            <div>
              <p
                className="text-[12px] font-semibold mb-1"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
              >
                Every course is verifiable
              </p>
              <p className="text-[11px]" style={{ color: 'var(--hm-text-muted)', lineHeight: 1.5 }}>
                Pass the assessment, mint a tamper-proof certificate anyone can confirm in one
                click.
              </p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="col-span-1 lg:col-span-9 flex flex-col gap-5">
          {/* Sort/view bar */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 pb-4"
            style={{ borderBottom: '1px solid var(--hm-border)' }}
          >
            <p className="hm-mono text-[12px]" style={{ color: 'var(--hm-text-muted)' }}>
              <span style={{ color: 'var(--hm-text)' }}>1–9</span> of{' '}
              <span style={{ color: 'var(--hm-text)' }}>12,480</span> courses
              {activeCat !== 'All' && (
                <>
                  {' '}
                  · <span style={{ color: 'var(--hm-violet-2)' }}>{activeCat}</span>
                </>
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-[12px] font-medium transition-colors"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                }}
              >
                <span style={{ color: 'var(--hm-text-dim)' }}>Sort:</span> Most enrolled
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>
              <div
                className="flex items-center gap-0.5 p-0.5 rounded-md"
                style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
              >
                {(
                  [
                    ['grid', LayoutGrid],
                    ['list', List],
                  ] as const
                ).map(([mode, Icon]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode as 'grid' | 'list')}
                    className="flex h-7 w-7 items-center justify-center rounded transition-colors"
                    style={{
                      background: viewMode === mode ? 'var(--hm-violet-soft)' : 'transparent',
                      color: viewMode === mode ? 'var(--hm-violet-2)' : 'var(--hm-text-dim)',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div
            className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}
          >
            {COURSES.map((c) => (
              <CourseCard key={c.id} course={c} mode={viewMode} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-dim)',
              }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <div
              className="flex items-center gap-0.5 p-1 rounded-full"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  className="h-7 w-7 rounded-full hm-mono text-[11.5px] font-semibold flex items-center justify-center transition-colors"
                  style={{
                    background: n === 1 ? 'var(--hm-violet-2)' : 'transparent',
                    color: n === 1 ? '#fff' : 'var(--hm-text-muted)',
                  }}
                >
                  {n}
                </button>
              ))}
              <span
                className="hm-mono text-[11.5px] px-1.5"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                ···
              </span>
              <button
                type="button"
                className="h-7 w-7 rounded-full hm-mono text-[11.5px] flex items-center justify-center"
                style={{ color: 'var(--hm-text-muted)' }}
              >
                139
              </button>
            </div>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border-accent)',
                color: 'var(--hm-text)',
              }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </StudentShell>
  )
}
