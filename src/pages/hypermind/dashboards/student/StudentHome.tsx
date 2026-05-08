import {
  BookOpen,
  GraduationCap,
  Flame,
  Sparkles,
  Zap,
  Coins,
  Play,
  ChevronRight,
  Clock,
  Star,
  BarChart2,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, GREEN, AMBER, BLUE } from './StudentShell'

/* ─── Stat card data ────────────────────────────────────────────────── */
const STATS = [
  {
    label: 'Credits',
    value: '340',
    sub: '+20 this week',
    Icon: Coins,
    color: AMBER,
    soft: 'rgba(244,178,108,0.14)',
    glow: 'rgba(244,178,108,0.22)',
  },
  {
    label: 'Karma',
    value: '1,840',
    sub: 'Top 8% of learners',
    Icon: Sparkles,
    color: VIOLET,
    soft: 'rgba(124,92,246,0.14)',
    glow: 'rgba(124,92,246,0.22)',
  },
  {
    label: 'XP Level',
    value: 'Lvl 14',
    sub: '2,340 / 3,000 XP',
    Icon: Zap,
    color: '#5BC8C5',
    soft: 'rgba(91,200,197,0.14)',
    glow: 'rgba(91,200,197,0.22)',
  },
  {
    label: 'Courses',
    value: '7',
    sub: '3 in progress',
    Icon: BookOpen,
    color: BLUE,
    soft: 'rgba(96,165,250,0.14)',
    glow: 'rgba(96,165,250,0.22)',
  },
  {
    label: 'Assessments',
    value: '12',
    sub: '2 due soon',
    Icon: GraduationCap,
    color: GREEN,
    soft: 'rgba(94,230,168,0.14)',
    glow: 'rgba(94,230,168,0.22)',
  },
]

/* ─── Course data ───────────────────────────────────────────────────── */
const MY_COURSES = [
  {
    id: 'c1',
    title: 'Watercolor Foundations',
    instructor: 'Sarah Lin',
    progress: 68,
    lessons: '28/42',
    nextLesson: 'Wet-on-Wet Technique',
    accent: AMBER,
    bg: 'linear-gradient(135deg,#2a1a0a 0%,#1c1310 100%)',
    rating: 4.9,
  },
  {
    id: 'c2',
    title: 'Spanish for Travelers',
    instructor: 'Marco Reyes',
    progress: 34,
    lessons: '10/30',
    nextLesson: 'Airport & Travel Phrases',
    accent: VIOLET,
    bg: 'linear-gradient(135deg,#14102a 0%,#0f0c1e 100%)',
    rating: 4.8,
  },
  {
    id: 'c3',
    title: 'Personal Finance 101',
    instructor: 'Dana Kwon',
    progress: 12,
    lessons: '3/24',
    nextLesson: 'Budgeting Fundamentals',
    accent: BLUE,
    bg: 'linear-gradient(135deg,#0a1020 0%,#080e1c 100%)',
    rating: 4.7,
  },
]

/* ─── Assessment data ───────────────────────────────────────────────── */
const MY_ASSESSMENTS = [
  {
    id: 'a1',
    title: 'Watercolor Final Assessment',
    course: 'Watercolor Foundations',
    questions: 20,
    duration: '45 min',
    score: null,
    daysLeft: 3,
    accent: '#F4636E',
  },
  {
    id: 'a2',
    title: 'Spanish Travel Quiz – Unit 2',
    course: 'Spanish for Travelers',
    questions: 15,
    duration: '25 min',
    score: null,
    daysLeft: 7,
    accent: VIOLET,
  },
  {
    id: 'a3',
    title: 'Budgeting Basics Quiz',
    course: 'Personal Finance 101',
    questions: 10,
    duration: '20 min',
    score: 94,
    daysLeft: null,
    accent: GREEN,
  },
]

/* ─── Course card thumbnail ─────────────────────────────────────────── */
function CourseThumbnail({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 96, background: bg }}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 70% 45%, ${accent}38 0%, transparent 65%)`,
        }}
      />
      {/* Subtle grid dots */}
      <svg className="absolute inset-0 opacity-10" width="100%" height="100%">
        <defs>
          <pattern
            id={`dots-${accent}`}
            x="0"
            y="0"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill={accent} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${accent})`} />
      </svg>
      {/* Decorative circle */}
      <div
        className="absolute"
        style={{
          right: -24,
          top: -24,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `${accent}18`,
          border: `2px solid ${accent}25`,
        }}
      />
      <div
        className="absolute"
        style={{
          right: 12,
          top: 28,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: `${accent}12`,
          border: `1.5px solid ${accent}30`,
        }}
      />
      {/* Resume pill */}
      <div
        className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{
          background: `${accent}22`,
          border: `1px solid ${accent}45`,
          backdropFilter: 'blur(4px)',
        }}
      >
        <Play className="h-2.5 w-2.5 fill-current" style={{ color: accent }} />
        <span
          className="hm-mono text-[9px] font-bold"
          style={{ color: accent, letterSpacing: '0.08em' }}
        >
          RESUME
        </span>
      </div>
    </div>
  )
}

export default function StudentHome() {
  return (
    <StudentShell activeTab={null}>
      {/* ══════════════════════ WELCOME BANNER ══════════════════════ */}
      <div
        className="relative overflow-hidden rounded-2xl mb-6"
        style={{
          background: 'linear-gradient(135deg, #13103a 0%, #1d1650 45%, #0d0f2a 100%)',
          border: `1px solid ${VIOLET}40`,
          minHeight: 140,
        }}
      >
        {/* Atmosphere */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 80% 50%, ${VIOLET}32 0%, transparent 60%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 10% 90%, rgba(96,165,250,0.14) 0%, transparent 50%)',
            }}
          />
          {/* Decorative stars */}
          {[
            { cx: 820, cy: 30, r: 1.5, o: 0.6 },
            { cx: 940, cy: 70, r: 1, o: 0.4 },
            { cx: 1060, cy: 25, r: 2, o: 0.5 },
            { cx: 1120, cy: 100, r: 1.2, o: 0.35 },
            { cx: 760, cy: 110, r: 1, o: 0.3 },
            { cx: 1000, cy: 120, r: 1.5, o: 0.4 },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: s.cx,
                top: s.cy,
                width: s.r * 2,
                height: s.r * 2,
                background: 'white',
                opacity: s.o,
              }}
            />
          ))}
        </div>

        <div className="relative flex items-center gap-6 px-7 py-7">
          {/* Avatar bubble */}
          <div
            className="shrink-0 flex items-center justify-center rounded-2xl text-[22px] font-bold"
            style={{
              width: 64,
              height: 64,
              background: `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`,
              color: 'white',
              boxShadow: `0 0 32px ${VIOLET}55, 0 0 0 3px ${VIOLET}30`,
              fontFamily: 'var(--hm-font-display)',
            }}
          >
            JR
          </div>

          {/* Greeting */}
          <div className="flex-1 min-w-0">
            <p
              className="hm-mono text-[9px] mb-1.5 tracking-[0.22em]"
              style={{ color: `${VIOLET}cc` }}
            >
              WELCOME BACK
            </p>
            <h1
              className="text-[28px] font-bold mb-1"
              style={{
                color: 'white',
                letterSpacing: '-0.028em',
                lineHeight: 1.15,
                fontFamily: 'var(--hm-font-display)',
              }}
            >
              Good morning, Jordan 👋
            </h1>
            <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.52)' }}>
              You've studied{' '}
              <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>4.2 hours</span>{' '}
              this week. Keep that streak alive!
            </p>
          </div>

          {/* Streak + level badges */}
          <div className="shrink-0 flex flex-col items-end gap-2.5">
            <div
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{ background: `${AMBER}20`, border: `1px solid ${AMBER}45` }}
            >
              <Flame className="h-3.5 w-3.5" style={{ color: AMBER }} />
              <span className="text-[12.5px] font-bold" style={{ color: AMBER }}>
                12-day streak
              </span>
            </div>
            <div
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
            >
              <Zap className="h-3.5 w-3.5" style={{ color: '#5BC8C5' }} />
              <span className="text-[12.5px] font-bold" style={{ color: 'rgba(255,255,255,0.78)' }}>
                Level 14
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════ STAT CARDS ══════════════════════ */}
      <div className="grid grid-cols-5 gap-3 mb-7">
        {STATS.map(({ label, value, sub, Icon, color, soft, glow }) => (
          <div
            key={label}
            className="relative rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            {/* Top color bar */}
            <div
              className="h-[3px]"
              style={{ background: `linear-gradient(90deg, ${color} 0%, ${color}44 100%)` }}
            />
            <div className="px-4 pt-3.5 pb-4">
              {/* Icon */}
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl mb-3"
                style={{ background: soft, boxShadow: `0 0 18px ${glow}` }}
              >
                <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" style={{ color }} />
              </div>
              <p
                className="hm-mono text-[24px] font-bold leading-none mb-1"
                style={{ color: 'var(--hm-text)' }}
              >
                {value}
              </p>
              <p className="text-[10px] font-medium mt-1" style={{ color }}>
                {label}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════ MY COURSES ══════════════════════ */}
      <section className="mb-7">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2
              className="text-[16px] font-bold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.016em' }}
            >
              My Courses
            </h2>
            <p className="text-[11.5px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
              Pick up where you left off
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[12px] font-semibold px-3 py-1.5 rounded-lg"
            style={{ color: VIOLET, background: VIOLET_SOFT, border: `1px solid ${VIOLET}30` }}
          >
            View all <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {MY_COURSES.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <CourseThumbnail bg={c.bg} accent={c.accent} />

              <div className="p-4">
                {/* Title + rating */}
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <h3
                    className="text-[13px] font-semibold leading-snug flex-1 min-w-0"
                    style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
                  >
                    {c.title}
                  </h3>
                  <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
                    <Star className="h-3 w-3" style={{ color: AMBER, fill: AMBER }} />
                    <span className="hm-mono text-[10px] font-semibold" style={{ color: AMBER }}>
                      {c.rating}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] mb-3.5" style={{ color: 'var(--hm-text-dim)' }}>
                  {c.instructor}
                </p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="flex items-center gap-1 text-[10.5px]"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      <BookOpen className="h-3 w-3" /> {c.lessons} lessons
                    </span>
                    <span className="hm-mono text-[11px] font-bold" style={{ color: c.accent }}>
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
                        background: `linear-gradient(90deg, ${c.accent} 0%, ${VIOLET} 140%)`,
                      }}
                    />
                  </div>
                </div>

                {/* Next lesson */}
                <div
                  className="flex items-center gap-1.5 pt-3"
                  style={{ borderTop: '1px solid var(--hm-border)' }}
                >
                  <Play className="h-3 w-3 shrink-0" style={{ color: c.accent }} />
                  <span
                    className="text-[10.5px] truncate"
                    style={{ color: 'var(--hm-text-muted)' }}
                  >
                    Next: {c.nextLesson}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ MY ASSESSMENTS ══════════════════════ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2
              className="text-[16px] font-bold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.016em' }}
            >
              My Assessments
            </h2>
            <p className="text-[11.5px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
              Track your progress and upcoming tests
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[12px] font-semibold px-3 py-1.5 rounded-lg"
            style={{ color: VIOLET, background: VIOLET_SOFT, border: `1px solid ${VIOLET}30` }}
          >
            View all <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {MY_ASSESSMENTS.map((a) => {
            const isDue = a.daysLeft !== null
            const isUrgent = isDue && a.daysLeft! <= 3
            const isDone = a.score !== null
            const badgeColor = isDone ? GREEN : isUrgent ? '#F4636E' : AMBER

            return (
              <div
                key={a.id}
                className="rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
              >
                {/* Top accent bar */}
                <div
                  className="h-[3px]"
                  style={{
                    background: `linear-gradient(90deg, ${a.accent} 0%, ${a.accent}44 100%)`,
                  }}
                />

                <div className="p-4">
                  {/* Badge + icon row */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-xl"
                      style={{ background: `${a.accent}18` }}
                    >
                      <GraduationCap className="h-4 w-4" style={{ color: a.accent }} />
                    </div>
                    {isDone ? (
                      <span
                        className="hm-mono text-[9.5px] font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: `${GREEN}20`,
                          color: GREEN,
                          border: `1px solid ${GREEN}40`,
                          letterSpacing: '0.06em',
                        }}
                      >
                        ✓ {a.score}%
                      </span>
                    ) : (
                      <span
                        className="hm-mono text-[9.5px] font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: `${badgeColor}18`,
                          color: badgeColor,
                          border: `1px solid ${badgeColor}40`,
                          letterSpacing: '0.06em',
                        }}
                      >
                        {isUrgent ? `⚡ ${a.daysLeft}d left` : `${a.daysLeft}d left`}
                      </span>
                    )}
                  </div>

                  {/* Title + course */}
                  <h3
                    className="text-[13px] font-semibold mb-0.5 leading-snug"
                    style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
                  >
                    {a.title}
                  </h3>
                  <p className="text-[11px] mb-4" style={{ color: 'var(--hm-text-dim)' }}>
                    {a.course}
                  </p>

                  {/* Meta row */}
                  <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: '1px solid var(--hm-border)' }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex items-center gap-1 text-[10.5px]"
                        style={{ color: 'var(--hm-text-dim)' }}
                      >
                        <BarChart2 className="h-3 w-3" /> {a.questions} Qs
                      </span>
                      <span
                        className="flex items-center gap-1 text-[10.5px]"
                        style={{ color: 'var(--hm-text-dim)' }}
                      >
                        <Clock className="h-3 w-3" /> {a.duration}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="hm-mono text-[10.5px] font-bold px-3 py-1 rounded-lg"
                      style={{
                        background: isDone ? `${GREEN}18` : `${a.accent}18`,
                        color: isDone ? GREEN : a.accent,
                        border: `1px solid ${isDone ? GREEN : a.accent}35`,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {isDone ? 'Review' : 'Start →'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </StudentShell>
  )
}
