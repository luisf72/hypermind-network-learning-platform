import {
  Home,
  BookOpen,
  Compass,
  Award,
  Calendar,
  MessageCircle,
  Settings2,
  Flame,
  Sparkles,
  Play,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Trophy,
  Brush,
  Music2,
  Languages,
  ChevronRight,
  Star,
} from 'lucide-react'
import { DashboardShell, type DashNavSection } from './_shared/DashboardShell'
import { Header } from '../_shared/Header'
import '../_group.css'

const ACCENT = '#5EE6A8' // emerald — growth/progress
const ACCENT_SOFT = 'rgba(94,230,168,0.12)'

export default function StudentDashboard() {
  const nav: DashNavSection[] = [
    {
      label: 'Learn',
      items: [
        { id: 'home', label: 'Home', Icon: Home, active: true },
        { id: 'learning', label: 'My learning', Icon: BookOpen, count: 5 },
        { id: 'browse', label: 'Browse', Icon: Compass },
        { id: 'calendar', label: 'Calendar', Icon: Calendar, count: 3 },
      ],
    },
    {
      label: 'Achieve',
      items: [
        { id: 'awards', label: 'Achievements', Icon: Award, count: 12 },
        { id: 'community', label: 'Community', Icon: MessageCircle },
        { id: 'settings', label: 'Settings', Icon: Settings2 },
      ],
    },
  ]

  const courses = [
    {
      title: 'Watercolor Foundations',
      cat: 'Arts & Crafts',
      instructor: 'Sarah Lin',
      progress: 70,
      lesson: 'Wet-on-wet washes',
      Icon: Brush,
    },
    {
      title: 'Acoustic Guitar Mastery',
      cat: 'Music',
      instructor: 'David Park',
      progress: 42,
      lesson: 'Barre chord transitions',
      Icon: Music2,
    },
    {
      title: 'Spanish for Travelers',
      cat: 'Languages',
      instructor: 'Carlos Mendoza',
      progress: 88,
      lesson: 'At the restaurant',
      Icon: Languages,
    },
  ]

  const upNext = [
    {
      type: 'Assessment',
      title: 'Watercolor mid-term',
      due: 'Tomorrow · 6:00 PM',
      color: '#F4636E',
    },
    { type: 'Live class', title: 'Q&A with Sarah Lin', due: 'Thu · 7:00 PM', color: ACCENT },
    { type: 'Reading', title: 'Spanish A2 vocab pack', due: 'This week', color: 'var(--hm-amber)' },
  ]

  const recommended = [
    { title: 'Calligraphy fundamentals', cat: 'Arts', rating: 4.9, hours: '8h', Icon: Brush },
    {
      title: 'Italian for Travelers',
      cat: 'Languages',
      rating: 4.8,
      hours: '12h',
      Icon: Languages,
    },
    { title: 'Music theory crash course', cat: 'Music', rating: 4.7, hours: '5h', Icon: Music2 },
  ]

  const badges = [
    { label: 'First lesson', color: ACCENT },
    { label: '7-day streak', color: 'var(--hm-amber)' },
    { label: 'On-chain cert', color: 'var(--hm-violet-2)' },
    { label: 'Polyglot starter', color: '#7BC8C5' },
  ]

  return (
    <>
      <Header active="home" />
      <DashboardShell
        accent={ACCENT}
        accentSoft={ACCENT_SOFT}
        roleLabel="STUDENT"
        sections={nav}
        user={{ name: 'Alex Studio', role: 'Lvl 14 · 2,340 XP', initials: 'AS' }}
        searchPlaceholder="Search courses, lessons, instructors…"
        topbarExtras={
          <>
            <span
              className="hm-mono inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold"
              style={{
                color: 'var(--hm-amber)',
                background: 'var(--hm-amber-soft)',
                border: '1px solid rgba(244,178,108,0.3)',
                letterSpacing: '0.10em',
              }}
            >
              <Flame className="h-3 w-3" />
              12d
            </span>
            <span
              className="hm-mono inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold"
              style={{
                color: 'var(--hm-violet-2)',
                background: 'var(--hm-violet-soft)',
                border: '1px solid var(--hm-border-accent)',
                letterSpacing: '0.10em',
              }}
            >
              <Sparkles className="h-3 w-3" />
              1,840 XP
            </span>
          </>
        }
      >
        {/* Hero — Continue learning */}
        <div
          className="relative overflow-hidden rounded-2xl mb-5"
          style={{
            background: `
            radial-gradient(60% 80% at 100% 50%, rgba(94,230,168,0.18) 0%, transparent 70%),
            radial-gradient(50% 80% at 0% 0%, rgba(139,92,246,0.18) 0%, transparent 65%),
            var(--hm-bg-card)
          `,
            border: '1px solid var(--hm-border)',
            boxShadow: 'var(--hm-shadow-elev)',
          }}
        >
          <div className="flex items-center gap-6 p-6">
            {/* Course thumbnail */}
            <div
              className="relative shrink-0 flex items-center justify-center"
              style={{
                width: 168,
                height: 124,
                borderRadius: 16,
                background: `
                radial-gradient(circle at 30% 30%, rgba(139,92,246,0.4) 0%, transparent 60%),
                var(--hm-bg-card-2)
              `,
                border: '1px solid var(--hm-border-strong)',
              }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: 'var(--hm-grad-primary)', boxShadow: 'var(--hm-glow-violet)' }}
              >
                <Brush className="h-6 w-6 text-white" />
              </span>
              <span
                className="hm-mono absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9.5px]"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.10em',
                }}
              >
                LESSON 14 / 20
              </span>
            </div>
            {/* Text + CTA */}
            <div className="flex-1 min-w-0">
              <p
                className="hm-mono text-[10.5px] mb-2"
                style={{ color: ACCENT, letterSpacing: '0.16em' }}
              >
                CONTINUE LEARNING
              </p>
              <h2
                className="text-[24px] font-semibold tracking-tight"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
              >
                Welcome back,{' '}
                <span
                  className="hm-serif-italic"
                  style={{ color: 'var(--hm-violet-2)', fontWeight: 400 }}
                >
                  Alex.
                </span>
              </h2>
              <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
                Pick up where you left off in{' '}
                <strong style={{ color: 'var(--hm-text)' }}>Watercolor Foundations</strong> — next
                up: <em>Wet-on-wet washes</em>.
              </p>
              {/* Progress bar */}
              <div className="mt-4 max-w-md">
                <div
                  className="flex items-center justify-between text-[11.5px] mb-1.5"
                  style={{ color: 'var(--hm-text-muted)' }}
                >
                  <span>14 of 20 lessons</span>
                  <span style={{ color: ACCENT, fontWeight: 600 }}>70%</span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: 'var(--hm-bg-card-2)' }}
                >
                  <div
                    style={{
                      width: '70%',
                      height: '100%',
                      background: `linear-gradient(90deg, var(--hm-violet-2) 0%, ${ACCENT} 100%)`,
                      boxShadow: `0 0 14px ${ACCENT}50`,
                    }}
                  />
                </div>
              </div>
            </div>
            {/* CTA button */}
            <button
              className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-semibold"
              style={{
                background: 'var(--hm-grad-primary)',
                color: 'white',
                boxShadow: 'var(--hm-shadow-pill)',
              }}
            >
              <Play className="h-4 w-4" />
              Resume
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <StatCard
            label="Streak"
            value="12d"
            sub="Personal best · 21d"
            Icon={Flame}
            color="var(--hm-amber)"
            bg="var(--hm-amber-soft)"
            progress={(12 / 21) * 100}
          />
          <StatCard
            label="Weekly XP"
            value="+1,840"
            sub="Goal: 2,500"
            Icon={Sparkles}
            color="var(--hm-violet-2)"
            bg="var(--hm-violet-soft)"
            progress={(1840 / 2500) * 100}
          />
          <StatCard
            label="Active courses"
            value="5"
            sub="2 finishing this week"
            Icon={BookOpen}
            color={ACCENT}
            bg={ACCENT_SOFT}
            progress={66}
          />
        </div>

        {/* Your courses + Up next */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          {/* Your courses (2 cols) */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Your courses
              </h3>
              <a
                href="#"
                className="hm-mono text-[11px] inline-flex items-center gap-1"
                style={{ color: ACCENT, letterSpacing: '0.12em' }}
              >
                VIEW ALL <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
            <div className="space-y-2.5">
              {courses.map((c) => (
                <div
                  key={c.title}
                  className="flex items-center gap-4 p-3.5 rounded-2xl"
                  style={{
                    background: 'var(--hm-bg-card)',
                    border: '1px solid var(--hm-border)',
                    boxShadow: 'var(--hm-shadow-card)',
                  }}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      border: '1px solid var(--hm-border)',
                      color: 'var(--hm-violet-2)',
                    }}
                  >
                    <c.Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="hm-mono text-[9.5px]"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
                    >
                      {c.cat.toUpperCase()} · {c.instructor.toUpperCase()}
                    </p>
                    <p
                      className="text-[13px] font-semibold mt-0.5 truncate"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {c.title}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div
                        className="flex-1 h-1.5 rounded-full overflow-hidden"
                        style={{ background: 'var(--hm-bg-card-2)' }}
                      >
                        <div
                          style={{
                            width: `${c.progress}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, var(--hm-violet-2) 0%, ${ACCENT} 100%)`,
                          }}
                        />
                      </div>
                      <span
                        className="hm-mono text-[10.5px]"
                        style={{ color: ACCENT, letterSpacing: '0.06em' }}
                      >
                        {c.progress}%
                      </span>
                    </div>
                    <p className="text-[11px] mt-1.5" style={{ color: 'var(--hm-text-muted)' }}>
                      Next: <span style={{ color: 'var(--hm-text)' }}>{c.lesson}</span>
                    </p>
                  </div>
                  <button
                    className="shrink-0 h-9 w-9 rounded-full flex items-center justify-center"
                    style={{
                      background: ACCENT_SOFT,
                      color: ACCENT,
                      border: `1px solid ${ACCENT}30`,
                    }}
                  >
                    <Play className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Up next */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Up next
              </h3>
              <span
                className="hm-mono text-[11px]"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                THIS WEEK
              </span>
            </div>
            <div
              className="rounded-2xl"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                boxShadow: 'var(--hm-shadow-card)',
              }}
            >
              {upNext.map((u, i) => (
                <div
                  key={u.title}
                  className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderTop: i === 0 ? 'none' : '1px solid var(--hm-border)' }}
                >
                  <span
                    style={{
                      width: 6,
                      alignSelf: 'stretch',
                      background: u.color,
                      borderRadius: 999,
                      boxShadow: `0 0 10px ${u.color}`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="hm-mono text-[9.5px]"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
                    >
                      {u.type.toUpperCase()}
                    </p>
                    <p
                      className="text-[12.5px] font-medium mt-0.5 truncate"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {u.title}
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--hm-text-muted)' }}>
                      {u.due}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: 'var(--hm-text-dim)' }}
                  />
                </div>
              ))}
            </div>

            {/* Achievements strip */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Achievements
                </h4>
                <span
                  className="hm-mono text-[10.5px]"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
                >
                  12 / 48
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {badges.map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10.5px] font-medium"
                    style={{
                      color: b.color,
                      background: `${b.color}1a`,
                      border: `1px solid ${b.color}30`,
                    }}
                  >
                    <Trophy className="h-2.5 w-2.5" />
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[15px] font-semibold" style={{ color: 'var(--hm-text)' }}>
              Recommended for you
            </h3>
            <a
              href="#"
              className="hm-mono text-[11px] inline-flex items-center gap-1"
              style={{ color: ACCENT, letterSpacing: '0.12em' }}
            >
              BROWSE ALL <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {recommended.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  boxShadow: 'var(--hm-shadow-card)',
                }}
              >
                <div
                  className="relative h-[88px] flex items-center justify-center"
                  style={{
                    background: `
                    radial-gradient(circle at 30% 30%, ${ACCENT}33 0%, transparent 60%),
                    var(--hm-bg-card-2)
                  `,
                    borderBottom: '1px solid var(--hm-border)',
                  }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: 'var(--hm-bg-card)',
                      border: '1px solid var(--hm-border-strong)',
                      color: ACCENT,
                    }}
                  >
                    <r.Icon className="h-4.5 w-4.5" />
                  </span>
                </div>
                <div className="p-3.5">
                  <p
                    className="hm-mono text-[9.5px]"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
                  >
                    {r.cat.toUpperCase()}
                  </p>
                  <p
                    className="text-[12.5px] font-semibold mt-1 truncate"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    {r.title}
                  </p>
                  <div
                    className="flex items-center justify-between mt-2 text-[11px]"
                    style={{ color: 'var(--hm-text-muted)' }}
                  >
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" style={{ color: ACCENT, fill: ACCENT }} />
                      {r.rating}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {r.hours}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardShell>
    </>
  )
}

function StatCard({
  label,
  value,
  sub,
  Icon,
  color,
  bg,
  progress,
}: {
  label: string
  value: string
  sub: string
  Icon: any
  color: string
  bg: string
  progress: number
}) {
  return (
    <div
      className="p-5 rounded-2xl"
      style={{
        background: 'var(--hm-bg-card)',
        border: '1px solid var(--hm-border)',
        boxShadow: 'var(--hm-shadow-card)',
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
          style={{ background: bg, color }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p
            className="hm-mono text-[10px]"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
          >
            {label.toUpperCase()}
          </p>
          <p
            className="text-[20px] font-semibold leading-tight"
            style={{ color: 'var(--hm-text)' }}
          >
            {value}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <div
          className="h-1 rounded-full overflow-hidden"
          style={{ background: 'var(--hm-bg-card-2)' }}
        >
          <div
            style={{
              width: `${Math.min(progress, 100)}%`,
              height: '100%',
              background: color,
              boxShadow: `0 0 10px ${color}`,
            }}
          />
        </div>
        <p className="text-[11px] mt-1.5" style={{ color: 'var(--hm-text-dim)' }}>
          {sub}
        </p>
      </div>
    </div>
  )
}
