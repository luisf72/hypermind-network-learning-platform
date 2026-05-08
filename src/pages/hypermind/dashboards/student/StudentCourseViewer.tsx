import { useState } from 'react'
import {
  Play,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Video,
  FileText,
  ListChecks,
  Radio,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Volume2,
  Maximize2,
  Settings2,
  SkipForward,
  ChevronDown,
  Clock,
  Users,
  BookOpen,
  Download,
  ExternalLink,
  Send,
  RotateCcw,
  Mic,
  MicOff,
  VideoOff,
  AlertCircle,
  Sparkles,
  MonitorPlay,
  SlidersHorizontal,
  MessageCircle,
  ScreenShare,
  CalendarDays,
  MapPin,
  ShieldCheck,
  Info,
  Lock,
  Award,
  Check,
  X,
  Trophy,
  Shuffle,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, GREEN, AMBER } from './StudentShell'

const GREEN_SOFT = 'rgba(94,230,168,0.12)'
const AMBER_SOFT = 'rgba(244,178,108,0.14)'
const TEAL = '#5BC8C5'
const TEAL_SOFT = 'rgba(91,200,197,0.14)'
const RED = '#F4636E'

/* ── Lesson types ────────────────────────────────────────────────── */
type LessonType = 'video' | 'text' | 'quiz' | 'live'

interface Lesson {
  id: string
  title: string
  type: LessonType
  dur: string
  done: boolean
  current: boolean
}
interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

const TYPE_META: Record<LessonType, { label: string; color: string; soft: string; Icon: any }> = {
  video: { label: 'Video', color: VIOLET, soft: VIOLET_SOFT, Icon: Video },
  text: { label: 'Reading', color: AMBER, soft: AMBER_SOFT, Icon: FileText },
  quiz: { label: 'Quiz', color: TEAL, soft: TEAL_SOFT, Icon: ListChecks },
  live: { label: 'Live Session', color: RED, soft: 'rgba(244,99,110,0.10)', Icon: Radio },
}

const MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Studio Setup & Materials',
    lessons: [
      {
        id: 'l1',
        title: 'Welcome & course overview',
        type: 'video',
        dur: '4:30',
        done: true,
        current: false,
      },
      {
        id: 'l2',
        title: 'Choosing the right paper',
        type: 'video',
        dur: '8:15',
        done: true,
        current: false,
      },
      {
        id: 'l3',
        title: 'Brushes & pigments',
        type: 'video',
        dur: '10:40',
        done: true,
        current: false,
      },
      {
        id: 'l4',
        title: 'Setting up your workspace',
        type: 'video',
        dur: '6:20',
        done: false,
        current: true,
      },
    ],
  },
  {
    id: 'm2',
    title: 'Understanding Water & Pigment',
    lessons: [
      {
        id: 'l5',
        title: 'How water controls flow',
        type: 'video',
        dur: '12:10',
        done: false,
        current: false,
      },
      {
        id: 'l6',
        title: 'Pigment granulation & staining',
        type: 'video',
        dur: '9:45',
        done: false,
        current: false,
      },
      {
        id: 'l7',
        title: 'Lesson recap — reading',
        type: 'text',
        dur: '6 min',
        done: false,
        current: false,
      },
      {
        id: 'l8',
        title: 'Unit 2 knowledge check',
        type: 'quiz',
        dur: '10 min',
        done: false,
        current: false,
      },
    ],
  },
  {
    id: 'm3',
    title: 'The Four Core Washes',
    lessons: [
      {
        id: 'l9',
        title: 'Flat wash technique',
        type: 'video',
        dur: '14:00',
        done: false,
        current: false,
      },
      {
        id: 'l10',
        title: 'Live Q&A with Maya Chen',
        type: 'live',
        dur: '60 min',
        done: false,
        current: false,
      },
      {
        id: 'l11',
        title: 'Variegated & wet-on-wet',
        type: 'video',
        dur: '16:20',
        done: false,
        current: false,
      },
    ],
  },
  {
    id: 'm4',
    title: 'Color Mixing & Theory',
    lessons: [
      {
        id: 'l12',
        title: 'Primary & secondary mixing',
        type: 'video',
        dur: '13:00',
        done: false,
        current: false,
      },
      {
        id: 'l13',
        title: 'Color theory deep-dive',
        type: 'text',
        dur: '8 min',
        done: false,
        current: false,
      },
      {
        id: 'l14',
        title: 'Mixing quiz — test yourself',
        type: 'quiz',
        dur: '12 min',
        done: false,
        current: false,
      },
    ],
  },
  {
    id: 'm5',
    title: 'Botanical Study from Life',
    lessons: [
      {
        id: 'l15',
        title: 'Choosing & observing your subject',
        type: 'video',
        dur: '8:30',
        done: false,
        current: false,
      },
      {
        id: 'l16',
        title: 'Pencil sketch & composition',
        type: 'video',
        dur: '14:00',
        done: false,
        current: false,
      },
      {
        id: 'l17',
        title: 'Live critique session',
        type: 'live',
        dur: '90 min',
        done: false,
        current: false,
      },
    ],
  },
]

const ALL_LESSONS = MODULES.flatMap((m) => m.lessons)

/* ── Final Assessment question bank ─────────────────────────────── */
interface FAQuestion {
  q: string
  options: string[]
  correct: number
  pts: number
}
const FA_QUESTIONS: FAQuestion[] = [
  {
    q: 'What paper weight (gsm) is the minimum recommended for wet-on-wet watercolor?',
    options: ['90 gsm', '200 gsm', '300 gsm', '500 gsm'],
    correct: 2,
    pts: 2,
  },
  {
    q: 'Granulation in watercolor is primarily caused by:',
    options: [
      'Using too much water in the wash',
      'Pigment particles settling unevenly as water evaporates',
      'Overworking the paint on dry paper',
      'Mixing warm and cool pigments together',
    ],
    correct: 1,
    pts: 2,
  },
  {
    q: 'Which technique produces the softest, most diffused edges?',
    options: ['Wet-on-dry', 'Dry-brush', 'Wet-on-wet', 'Impasto'],
    correct: 2,
    pts: 1,
  },
  {
    q: "A 'backrun' (cauliflower bloom) is most likely caused by:",
    options: [
      'Using too much pigment in the wash',
      'Wetter paint touching a drying wash',
      'Working on a rough-textured paper',
      'Applying paint with a fan brush',
    ],
    correct: 1,
    pts: 2,
  },
  {
    q: 'On a standard colour wheel, the complementary of blue-violet is:',
    options: ['Red-orange', 'Yellow-green', 'Orange-yellow', 'Green'],
    correct: 2,
    pts: 1,
  },
  {
    q: "When mixing a 'juicy' (richest) watercolor load, the water-to-pigment ratio is approximately:",
    options: [
      '90% water / 10% pigment',
      '70% water / 30% pigment',
      '30% water / 70% pigment',
      '10% water / 90% pigment',
    ],
    correct: 3,
    pts: 2,
  },
  {
    q: 'In botanical illustration, which quality is most important?',
    options: [
      'Loose expressive brushwork and visible texture',
      'Accurate botanical detail with controlled hard edges',
      'High pigment saturation throughout the painting',
      'Wet-on-wet blooms for a naturalistic appearance',
    ],
    correct: 1,
    pts: 2,
  },
  {
    q: 'The 30–40% value shift rule means:',
    options: [
      'You must dilute pigment by 30–40% more than you think',
      'Finished washes dry 30–40% lighter than they appear wet',
      'Pigment granulates 30–40% more on rough paper',
      'You should apply 30–40% more water per layer',
    ],
    correct: 1,
    pts: 2,
  },
]
const FA_TOTAL_MARKS = FA_QUESTIONS.reduce((s, q) => s + q.pts, 0)
const FA_PASS_MARK = Math.ceil(FA_TOTAL_MARKS * 0.7)

/* ── Demo content per type ───────────────────────────────────────── */

function VideoLesson({ lesson }: { lesson: Lesson }) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Notes' | 'Q&A' | 'Resources'>('Overview')
  const TABS = ['Overview', 'Notes', 'Q&A', 'Resources'] as const
  return (
    <div className="flex flex-col flex-1 overflow-y-auto hm-scroll">
      {/* Player */}
      <div
        className="relative w-full shrink-0"
        style={{ background: '#050710', aspectRatio: '16/9', maxHeight: 400 }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          style={{ background: 'radial-gradient(circle at 50% 40%, #1a1435 0%, #060812 100%)' }}
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: `${VIOLET}44`, transform: 'scale(1.5)' }}
            />
            <button
              type="button"
              className="relative flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: VIOLET, boxShadow: `0 0 40px ${VIOLET}66` }}
            >
              <Play className="h-7 w-7 fill-white text-white ml-1" />
            </button>
          </div>
          <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {lesson.title} — {lesson.dur}
          </p>
        </div>
        {/* Controls */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-10"
          style={{ background: 'linear-gradient(0deg,rgba(0,0,0,0.8) 0%,transparent 100%)' }}
        >
          <div
            className="h-1 rounded-full mb-3 cursor-pointer relative"
            style={{ background: 'rgba(255,255,255,0.18)' }}
          >
            <div className="h-full rounded-full" style={{ width: '32%', background: VIOLET }} />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white"
              style={{
                left: '32%',
                transform: 'translate(-50%,-50%)',
                background: VIOLET,
                boxShadow: `0 0 8px ${VIOLET}`,
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <button type="button">
              <Play className="h-5 w-5 fill-white text-white" />
            </button>
            <button type="button">
              <SkipForward className="h-4 w-4 text-white opacity-70" />
            </button>
            <span className="hm-mono text-[11px] text-white opacity-55">1:58 / {lesson.dur}</span>
            <div className="flex-1" />
            <button type="button">
              <Volume2 className="h-4 w-4 text-white opacity-70" />
            </button>
            <button type="button">
              <Settings2 className="h-4 w-4 text-white opacity-70" />
            </button>
            <button type="button">
              <Maximize2 className="h-4 w-4 text-white opacity-70" />
            </button>
          </div>
        </div>
      </div>

      {/* Below player */}
      <div className="px-6 py-5 flex flex-col gap-5">
        {/* Action strip */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-semibold"
            style={{ background: GREEN_SOFT, border: `1px solid ${GREEN}33`, color: GREEN }}
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Mark complete
          </button>
          {[
            { Icon: ThumbsUp, label: 'Helpful' },
            { Icon: Bookmark, label: 'Save' },
            { Icon: MessageSquare, label: 'Discuss' },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-[12px] font-medium"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid var(--hm-border)' }}>
          <div className="flex items-center gap-0">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTab(t as any)}
                className="px-4 pb-2.5 pt-0.5 text-[13px] font-medium relative"
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
        </div>

        {activeTab === 'Overview' && (
          <div className="flex flex-col gap-4">
            <p
              className="text-[13.5px] leading-relaxed"
              style={{ color: 'var(--hm-text-muted)', lineHeight: 1.7 }}
            >
              In this lesson we arrange the workspace, control natural light, set up a clean
              palette, and establish a consistent studio routine so you spend time painting — not
              hunting for supplies. You'll also learn why having the right setup makes wet-on-wet
              techniques far more controllable.
            </p>
            <div
              className="rounded-xl p-4"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <p
                className="hm-mono text-[9.5px] mb-3"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
              >
                LESSON RESOURCES
              </p>
              {[
                { name: 'Workspace checklist PDF', size: '420 KB' },
                { name: 'Recommended supply list', size: '180 KB' },
                { name: 'Reference photo pack', size: '14.2 MB' },
              ].map((r) => (
                <div
                  key={r.name}
                  className="flex items-center gap-2.5 py-2.5"
                  style={{ borderTop: '1px solid var(--hm-border)' }}
                >
                  <FileText className="h-4 w-4 shrink-0" style={{ color: 'var(--hm-text-dim)' }} />
                  <span className="text-[12.5px] flex-1" style={{ color: 'var(--hm-text)' }}>
                    {r.name}
                  </span>
                  <span className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                    {r.size}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[11.5px] font-medium"
                    style={{ color: VIOLET }}
                  >
                    <Download className="h-3 w-3" /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'Notes' && (
          <div>
            <textarea
              placeholder="Add a note for this lesson…"
              rows={6}
              className="w-full px-4 py-3 rounded-xl text-[13px] outline-none resize-none"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
                lineHeight: 1.6,
              }}
            />
            <button
              type="button"
              className="mt-2 px-4 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{ background: VIOLET, color: 'white' }}
            >
              Save note
            </button>
          </div>
        )}
        {activeTab === 'Q&A' && (
          <div className="flex flex-col gap-3">
            {[
              {
                q: 'Does the brand of paper really matter that much?',
                a: 'Yes — cheap paper warps badly wet-on-wet. 300gsm cold-press minimum.',
                votes: 14,
              },
              {
                q: 'Can I use a plastic palette instead of ceramic?',
                a: "Plastic works, but ceramic cleans more thoroughly and doesn't stain.",
                votes: 7,
              },
              {
                q: 'How bright should the natural light source be?',
                a: 'Soft indirect north light is ideal. Avoid harsh direct sunlight.',
                votes: 5,
              },
            ].map((qa) => (
              <div
                key={qa.q}
                className="rounded-xl p-4"
                style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
              >
                <p className="text-[13px] font-semibold mb-1.5" style={{ color: 'var(--hm-text)' }}>
                  Q: {qa.q}
                </p>
                <p className="text-[12.5px] mb-2.5" style={{ color: 'var(--hm-text-muted)' }}>
                  A: {qa.a}
                </p>
                <div
                  className="flex items-center gap-3 text-[11px]"
                  style={{ color: 'var(--hm-text-dim)' }}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" /> {qa.votes} helpful
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> Reply
                  </button>
                </div>
              </div>
            ))}
            {/* Post a question */}
            <div
              className="rounded-xl p-4 flex gap-3"
              style={{ background: 'var(--hm-bg-card)', border: `1px dashed var(--hm-border)` }}
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                style={{
                  background: `linear-gradient(135deg, ${VIOLET}, #9A78FF)`,
                  color: 'white',
                }}
              >
                JR
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Ask a question about this lesson…"
                  className="w-full h-8 px-3 rounded-lg text-[12.5px]"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    color: 'var(--hm-text)',
                    outline: 'none',
                  }}
                />
              </div>
              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: VIOLET, color: 'white' }}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
        {activeTab === 'Resources' && (
          <div className="flex flex-col gap-3">
            {[
              { name: 'Course slides — Module 1', type: 'PDF', size: '2.4 MB', url: true },
              { name: 'Wet-on-wet reference sheet', type: 'PDF', size: '800 KB', url: true },
              { name: 'Watercolor supply guide', type: 'Link', size: undefined, url: true },
              { name: 'Recommended brushes (Amazon)', type: 'Link', size: undefined, url: true },
            ].map((r) => (
              <div
                key={r.name}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                  style={{
                    background: r.type === 'Link' ? VIOLET_SOFT : AMBER_SOFT,
                    color: r.type === 'Link' ? VIOLET : AMBER,
                  }}
                >
                  {r.type === 'Link' ? (
                    <ExternalLink className="h-3.5 w-3.5" />
                  ) : (
                    <FileText className="h-3.5 w-3.5" />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium" style={{ color: 'var(--hm-text)' }}>
                    {r.name}
                  </p>
                  {r.size && (
                    <p className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                      {r.type} · {r.size}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-[12px] font-semibold shrink-0"
                  style={{ color: VIOLET }}
                >
                  {r.type === 'Link' ? (
                    <>
                      <ExternalLink className="h-3.5 w-3.5" /> Open
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" /> Download
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Slide deck data ─────────────────────────────────────────────── */
const SLIDES = [
  {
    type: 'title',
    tag: 'Unit 2 · Lesson Recap',
    headline: 'Understanding Water & Pigment',
    sub: 'How water-to-pigment ratio governs every mark you make.',
    note: 'Welcome to the lesson recap. Use the arrow keys or buttons below to advance through each slide. Take your time with Slide 3 — the saturation scale is something you should physically test.',
  },
  {
    type: 'bullets',
    tag: 'Key principles',
    headline: 'Why ratio is everything',
    bullets: [
      'Water is not just a medium — it is the primary variable',
      'Ratio governs bloom, granulation, backrun & edge character',
      "Most 'unpredictable' results are uncontrolled ratio problems",
      'Paper absorbency and sizing amplify the effect',
    ],
    note: "Emphasise the word 'primary'. Students often blame pigment brand or brush quality, but 90% of issues trace back to ratio.",
  },
  {
    type: 'concepts',
    tag: 'Terminology',
    headline: 'Four terms you must know',
    concepts: [
      {
        term: 'Wet-on-wet',
        def: 'Wet paint onto wet surface → soft, bloomed edges. Excellent for skies and loose backgrounds.',
      },
      {
        term: 'Wet-on-dry',
        def: 'Wet paint onto dry surface → crisp, hard edges. Use for botanical detail work.',
      },
      {
        term: 'Backrun',
        def: "Wetter paint touching a drying wash creates a 'cauliflower' bloom. Controllable with timing.",
      },
      {
        term: 'Granulation',
        def: 'Certain pigments separate into visible texture as water evaporates. Beautiful for stone and foliage.',
      },
    ],
    note: 'Quiz students on these four terms in the next lesson. They appear again in the Unit 4 quiz.',
  },
  {
    type: 'visual',
    tag: 'Reference',
    headline: 'The five saturation levels',
    sub: 'From pale tint (90% water) to juicy load (10% water).',
    levels: ['Pale', 'Light', 'Mid', 'Rich', 'Juicy'],
    note: 'Encourage students to paint a swatch chart with these five mixes on a single sheet and keep it as a reference. Doing this once builds the muscle memory faster than any amount of watching.',
  },
  {
    type: 'tip',
    tag: 'Pro technique',
    headline: 'Test before you commit',
    tip: 'Always test your mix on a scrap of the same paper before touching your main sheet. Pigment reads 30–40% darker when wet — factor in the drying shift every time.',
    checklist: [
      'Keep a scrap strip clipped beside your main sheet',
      'Test mix, observe the wet puddle colour',
      'Anticipate 30–40% value shift as it dries',
      'Only then apply to your main piece',
    ],
    note: 'This single habit separates beginners from intermediate painters. It sounds tedious but takes only 5–10 seconds per mix.',
  },
  {
    type: 'summary',
    tag: 'Lesson complete',
    headline: "You're ready for the video demo",
    points: [
      'Ratio controls every quality of watercolor — not pigment brand',
      'Wet-on-wet = soft; Wet-on-dry = crisp',
      'Backruns are timing problems, not accidents',
      'Work through the five saturation swatches before the next lesson',
    ],
    note: "Mark this lesson complete and move on to 'How water controls flow' to see these concepts in a live demo.",
  },
]

function TextLesson({ lesson }: { lesson: Lesson }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const [showNotes, setShowNotes] = useState(true)
  const [completed, setCompleted] = useState(false)
  const slide = SLIDES[slideIdx]
  const isLast = slideIdx === SLIDES.length - 1

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* ── Top bar ── */}
      <div
        className="flex items-center gap-3 px-5 py-2.5 shrink-0"
        style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-elev)' }}
      >
        <span
          className="hm-mono text-[10px] font-semibold rounded-full px-2 py-0.5 flex items-center gap-1.5"
          style={{
            background: AMBER_SOFT,
            color: AMBER,
            border: `1px solid ${AMBER}44`,
            letterSpacing: '0.12em',
          }}
        >
          <MonitorPlay className="h-2.5 w-2.5" /> SLIDES
        </span>
        <span
          className="text-[12.5px] font-semibold truncate flex-1"
          style={{ color: 'var(--hm-text)' }}
        >
          {lesson.title}
        </span>
        <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
          {slideIdx + 1} / {SLIDES.length}
        </span>
        <button
          type="button"
          onClick={() => setShowNotes((v) => !v)}
          className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg text-[11.5px] font-medium"
          style={{
            background: showNotes ? AMBER_SOFT : 'var(--hm-bg-card)',
            border: `1px solid ${showNotes ? AMBER + '44' : 'var(--hm-border)'}`,
            color: showNotes ? AMBER : 'var(--hm-text-muted)',
          }}
        >
          <SlidersHorizontal className="h-3 w-3" /> Notes
        </button>
      </div>

      {/* ── Main area: slide + optional notes ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Slide canvas */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* The slide itself */}
          <div className="flex-1 flex items-stretch overflow-hidden px-8 py-6">
            <div
              className="w-full rounded-2xl overflow-hidden flex flex-col relative"
              style={{
                background:
                  slide.type === 'title'
                    ? `linear-gradient(145deg, #100d22 0%, #1a143a 60%, #0e1024 100%)`
                    : 'var(--hm-bg-card)',
                border: `1px solid ${slide.type === 'title' ? AMBER + '44' : 'var(--hm-border)'}`,
                boxShadow: slide.type === 'title' ? `0 0 60px ${AMBER}10` : 'none',
              }}
            >
              {/* Slide top tag */}
              <div
                className="flex items-center justify-between px-7 pt-5 pb-4 shrink-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span
                  className="hm-mono text-[9.5px] font-semibold tracking-widest"
                  style={{ color: AMBER, letterSpacing: '0.16em' }}
                >
                  {slide.tag.toUpperCase()}
                </span>
                <span className="flex gap-1">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlideIdx(i)}
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: i === slideIdx ? 20 : 6,
                        background: i === slideIdx ? AMBER : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  ))}
                </span>
              </div>

              {/* Slide body */}
              <div className="flex-1 flex flex-col justify-center px-10 py-6 overflow-hidden">
                {slide.type === 'title' && (
                  <div className="flex flex-col gap-4 items-start max-w-xl">
                    <div
                      aria-hidden
                      className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${AMBER}, transparent)`,
                        filter: 'blur(60px)',
                        transform: 'translate(30%,-30%)',
                      }}
                    />
                    <h1
                      className="text-[32px] font-bold leading-tight"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.025em' }}
                    >
                      {slide.headline}
                    </h1>
                    <p
                      className="text-[15px] leading-relaxed"
                      style={{ color: 'var(--hm-text-muted)' }}
                    >
                      {(slide as any).sub}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="h-0.5 w-8 rounded-full" style={{ background: AMBER }} />
                      <span
                        className="hm-mono text-[10px]"
                        style={{ color: AMBER, letterSpacing: '0.1em' }}
                      >
                        {SLIDES.length} SLIDES · {lesson.dur} READ
                      </span>
                    </div>
                  </div>
                )}

                {slide.type === 'bullets' && (
                  <div className="flex flex-col gap-5 max-w-lg">
                    <h2
                      className="text-[22px] font-bold"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
                    >
                      {slide.headline}
                    </h2>
                    <ul className="flex flex-col gap-3">
                      {(slide as any).bullets.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 text-[10px] font-bold"
                            style={{ background: AMBER_SOFT, color: AMBER }}
                          >
                            {i + 1}
                          </span>
                          <p
                            className="text-[14px] leading-snug"
                            style={{ color: 'var(--hm-text-muted)' }}
                          >
                            {b}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {slide.type === 'concepts' && (
                  <div className="flex flex-col gap-4 w-full max-w-2xl">
                    <h2
                      className="text-[22px] font-bold mb-1"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
                    >
                      {slide.headline}
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {(slide as any).concepts.map((c: any) => (
                        <div
                          key={c.term}
                          className="rounded-xl p-4"
                          style={{
                            background: 'var(--hm-bg-card-2)',
                            border: `1px solid ${AMBER}28`,
                          }}
                        >
                          <p className="text-[13px] font-bold mb-1.5" style={{ color: AMBER }}>
                            {c.term}
                          </p>
                          <p
                            className="text-[12px] leading-relaxed"
                            style={{ color: 'var(--hm-text-muted)' }}
                          >
                            {c.def}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {slide.type === 'visual' && (
                  <div className="flex flex-col gap-5 max-w-xl">
                    <h2
                      className="text-[22px] font-bold"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
                    >
                      {slide.headline}
                    </h2>
                    <p className="text-[13px]" style={{ color: 'var(--hm-text-muted)' }}>
                      {(slide as any).sub}
                    </p>
                    <div className="flex items-end gap-2">
                      {(slide as any).levels.map((lbl: string, i: number) => (
                        <div key={lbl} className="flex flex-col items-center gap-2 flex-1">
                          <div
                            className="w-full rounded-lg relative overflow-hidden"
                            style={{
                              height: 28 + i * 18,
                              background: `rgba(244,178,108,${0.12 + i * 0.17})`,
                              border: `1px solid ${AMBER}${Math.round(30 + i * 25).toString(16)}`,
                            }}
                          >
                            <div
                              className="absolute inset-0 opacity-20"
                              style={{
                                background: `linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 40%)`,
                              }}
                            />
                          </div>
                          <span
                            className="hm-mono text-[9.5px] font-semibold"
                            style={{ color: i > 2 ? AMBER : 'var(--hm-text-dim)' }}
                          >
                            {lbl}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                        90% water
                      </span>
                      <span
                        className="h-px flex-1 mx-3"
                        style={{ background: 'var(--hm-border)' }}
                      />
                      <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                        10% water
                      </span>
                    </div>
                  </div>
                )}

                {slide.type === 'tip' && (
                  <div className="flex flex-col gap-5 max-w-xl">
                    <div
                      className="rounded-xl px-5 py-4 flex gap-3 items-start"
                      style={{ background: `${VIOLET}0F`, border: `1px solid ${VIOLET}33` }}
                    >
                      <Sparkles className="h-4 w-4 shrink-0 mt-0.5" style={{ color: VIOLET }} />
                      <p
                        className="text-[14px] leading-relaxed"
                        style={{ color: 'var(--hm-text-muted)' }}
                      >
                        {(slide as any).tip}
                      </p>
                    </div>
                    <h2 className="text-[18px] font-bold" style={{ color: 'var(--hm-text)' }}>
                      Do this every time:
                    </h2>
                    <ul className="flex flex-col gap-2.5">
                      {(slide as any).checklist.map((c: string, i: number) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: GREEN }} />
                          <span className="text-[13.5px]" style={{ color: 'var(--hm-text-muted)' }}>
                            {c}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {slide.type === 'summary' && (
                  <div className="flex flex-col gap-5 max-w-xl">
                    <h2
                      className="text-[24px] font-bold"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
                    >
                      {slide.headline}
                    </h2>
                    <div className="flex flex-col gap-2">
                      {(slide as any).points.map((p: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-xl px-4 py-3"
                          style={{ background: GREEN_SOFT, border: `1px solid ${GREEN}33` }}
                        >
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 mt-0.5"
                            style={{ color: GREEN }}
                          />
                          <p className="text-[13px]" style={{ color: 'var(--hm-text)' }}>
                            {p}
                          </p>
                        </div>
                      ))}
                    </div>
                    {completed ? (
                      <div
                        className="flex items-center gap-2 text-[13px] font-semibold"
                        style={{ color: GREEN }}
                      >
                        <CheckCircle2 className="h-4 w-4" /> Lesson marked complete!
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCompleted(true)}
                        className="self-start inline-flex items-center gap-2 h-10 px-6 rounded-xl text-[13px] font-semibold"
                        style={{
                          background: GREEN_SOFT,
                          color: GREEN,
                          border: `1px solid ${GREEN}44`,
                        }}
                      >
                        <CheckCircle2 className="h-4 w-4" /> Mark slides complete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Nav controls + thumbnail strip ── */}
          <div className="shrink-0 px-8 pb-5 flex flex-col gap-3">
            {/* Thumbnail filmstrip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlideIdx(i)}
                  className="shrink-0 rounded-lg overflow-hidden relative"
                  style={{
                    width: 88,
                    height: 52,
                    background:
                      i === slideIdx
                        ? s.type === 'title'
                          ? '#1a143a'
                          : 'var(--hm-bg-card)'
                        : 'var(--hm-bg-card-2)',
                    border: `1.5px solid ${i === slideIdx ? AMBER : 'var(--hm-border)'}`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-1.5">
                    <span
                      className="hm-mono text-[6.5px] font-bold mb-0.5 truncate w-full text-center"
                      style={{
                        color: i === slideIdx ? AMBER : 'var(--hm-text-dim)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {s.tag.toUpperCase()}
                    </span>
                    <span
                      className="text-[7px] font-semibold truncate w-full text-center leading-tight"
                      style={{ color: i === slideIdx ? 'var(--hm-text)' : 'var(--hm-text-muted)' }}
                    >
                      {s.headline}
                    </span>
                  </div>
                  <span
                    className="absolute bottom-1 right-1.5 hm-mono text-[6px]"
                    style={{ color: 'var(--hm-text-dim)' }}
                  >
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={slideIdx === 0}
                onClick={() => setSlideIdx((v) => v - 1)}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[12.5px] font-medium"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: slideIdx > 0 ? 'var(--hm-text-muted)' : 'var(--hm-text-dim)',
                  opacity: slideIdx > 0 ? 1 : 0.4,
                }}
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </button>
              <span
                className="hm-mono text-[11px] flex-1 text-center"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                Slide {slideIdx + 1} of {SLIDES.length}
              </span>
              {isLast ? (
                <button
                  type="button"
                  onClick={() => setCompleted(true)}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[12.5px] font-semibold"
                  style={{ background: GREEN_SOFT, border: `1px solid ${GREEN}44`, color: GREEN }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Complete
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSlideIdx((v) => v + 1)}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[12.5px] font-semibold"
                  style={{
                    background: AMBER,
                    color: '#1a1208',
                    boxShadow: `0 4px 16px ${AMBER}44`,
                  }}
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Speaker notes panel ── */}
        {showNotes && (
          <div
            className="shrink-0 flex flex-col overflow-hidden"
            style={{
              width: 240,
              borderLeft: '1px solid var(--hm-border)',
              background: 'var(--hm-bg-elev)',
            }}
          >
            <div
              className="px-4 py-3 shrink-0"
              style={{ borderBottom: '1px solid var(--hm-border)' }}
            >
              <p
                className="hm-mono text-[9.5px] font-semibold"
                style={{ color: AMBER, letterSpacing: '0.14em' }}
              >
                INSTRUCTOR NOTES
              </p>
            </div>
            <div className="flex-1 overflow-y-auto hm-scroll px-4 py-4">
              <p
                className="text-[12px] leading-relaxed"
                style={{ color: 'var(--hm-text-muted)', lineHeight: 1.7 }}
              >
                {slide.note}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function QuizLesson({ lesson }: { lesson: Lesson }) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const QUESTIONS = [
    {
      q: 'What is the ideal paper weight for wet-on-wet watercolor?',
      options: ['90 gsm', '200 gsm', '300 gsm', '500 gsm'],
      correct: 2,
    },
    {
      q: "A 'backrun' (cauliflower) is caused by:",
      options: [
        'Using too much pigment',
        'Wetter paint touching a drying wash',
        'Working on a rough paper surface',
        'Using a fan brush',
      ],
      correct: 1,
    },
    {
      q: 'Which of these is NOT a watercolor saturation level?',
      options: ['Pale wash', 'Impasto load', 'Mid-tone mix', 'Juicy pigment'],
      correct: 1,
    },
    {
      q: 'What technique produces the crispest, hardest edges?',
      options: ['Wet-on-wet', 'Dry-brush', 'Wet-on-dry', 'Salt texture'],
      correct: 2,
    },
  ]

  const score = submitted ? QUESTIONS.filter((q, i) => answers[i] === q.correct).length : 0

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hm-scroll">
      {/* Header */}
      <div
        className="px-8 py-7 flex items-start gap-5 shrink-0"
        style={{
          background: `linear-gradient(135deg, ${TEAL}0D 0%, transparent 60%)`,
          borderBottom: '1px solid var(--hm-border)',
        }}
      >
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ background: TEAL_SOFT, color: TEAL, boxShadow: `0 4px 16px ${TEAL}33` }}
        >
          <ListChecks className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="hm-mono text-[10px] font-semibold rounded-full px-2 py-0.5"
              style={{
                background: TEAL_SOFT,
                color: TEAL,
                border: `1px solid ${TEAL}44`,
                letterSpacing: '0.14em',
              }}
            >
              QUIZ
            </span>
            <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
              {QUESTIONS.length} questions · {lesson.dur}
            </span>
          </div>
          <h2
            className="text-[20px] font-bold"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            {lesson.title}
          </h2>
          {/* Progress dots */}
          <div className="flex items-center gap-1.5 mt-3">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-8 rounded-full"
                style={{ background: answers[i] !== undefined ? TEAL : 'var(--hm-bg-card-2)' }}
              />
            ))}
            <span className="hm-mono text-[10.5px] ml-2" style={{ color: 'var(--hm-text-dim)' }}>
              {Object.keys(answers).length}/{QUESTIONS.length} answered
            </span>
          </div>
        </div>
        {submitted && (
          <div
            className="flex flex-col items-center px-4 py-2 rounded-xl"
            style={{
              background: score >= 3 ? GREEN_SOFT : 'rgba(244,99,110,0.10)',
              border: `1px solid ${score >= 3 ? GREEN : RED}44`,
            }}
          >
            <span
              className="hm-mono text-[28px] font-bold"
              style={{ color: score >= 3 ? GREEN : RED }}
            >
              {score}/{QUESTIONS.length}
            </span>
            <span className="text-[10.5px]" style={{ color: score >= 3 ? GREEN : RED }}>
              {score >= 3 ? 'Passed!' : 'Try again'}
            </span>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="px-8 py-6 flex flex-col gap-5 max-w-[720px]">
        {QUESTIONS.map((q, qi) => (
          <div
            key={qi}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--hm-bg-card)',
              border: `1px solid ${submitted ? (answers[qi] === q.correct ? `${GREEN}55` : `${RED}55`) : 'var(--hm-border)'}`,
            }}
          >
            <div
              className="px-5 py-4 flex items-start gap-3"
              style={{ borderBottom: '1px solid var(--hm-border)' }}
            >
              <span
                className="hm-mono flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold mt-0.5"
                style={{ background: TEAL_SOFT, color: TEAL }}
              >
                {qi + 1}
              </span>
              <p
                className="text-[14px] font-semibold"
                style={{ color: 'var(--hm-text)', lineHeight: 1.5 }}
              >
                {q.q}
              </p>
              {submitted && (
                <span className="ml-auto shrink-0">
                  {answers[qi] === q.correct ? (
                    <Check className="h-5 w-5" style={{ color: GREEN }} />
                  ) : (
                    <X className="h-5 w-5" style={{ color: RED }} />
                  )}
                </span>
              )}
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi
                const isCorrect = oi === q.correct
                let bg = 'var(--hm-bg-card-2)'
                let border = 'var(--hm-border)'
                let color = 'var(--hm-text-muted)'
                if (submitted) {
                  if (isCorrect) {
                    bg = GREEN_SOFT
                    border = `${GREEN}55`
                    color = GREEN
                  } else if (selected && !isCorrect) {
                    bg = 'rgba(244,99,110,0.10)'
                    border = `${RED}55`
                    color = RED
                  }
                } else if (selected) {
                  bg = TEAL_SOFT
                  border = `${TEAL}55`
                  color = TEAL
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => !submitted && setAnswers((a) => ({ ...a, [qi]: oi }))}
                    className="text-left rounded-xl px-4 py-3 text-[13px] font-medium transition-all"
                    style={{ background: bg, border: `1px solid ${border}`, color }}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Actions */}
        <div className="flex items-center gap-3 pb-6">
          {!submitted ? (
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < QUESTIONS.length}
              className="h-10 px-6 rounded-xl text-[13px] font-semibold transition-all"
              style={{
                background:
                  Object.keys(answers).length < QUESTIONS.length ? 'var(--hm-bg-card)' : TEAL,
                color:
                  Object.keys(answers).length < QUESTIONS.length ? 'var(--hm-text-dim)' : '#0D1117',
                border: `1px solid ${Object.keys(answers).length < QUESTIONS.length ? 'var(--hm-border)' : 'transparent'}`,
                cursor: Object.keys(answers).length < QUESTIONS.length ? 'not-allowed' : 'pointer',
              }}
            >
              Submit answers
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setAnswers({})
                  setSubmitted(false)
                }}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-xl text-[13px] font-semibold"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-muted)',
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" /> Retry quiz
              </button>
              {score >= 3 && (
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 h-10 px-5 rounded-xl text-[13px] font-semibold"
                  style={{ background: GREEN_SOFT, color: GREEN, border: `1px solid ${GREEN}44` }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Mark complete & continue
                </button>
              )}
            </>
          )}
          {Object.keys(answers).length < QUESTIONS.length && !submitted && (
            <p className="text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
              Answer all {QUESTIONS.length} questions to submit
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Live session data (mirrors CreatorCourseEdit LivePanel fields) ── */
const LIVE_SESSION = {
  title: 'Live workshop: wash troubleshooting',
  description:
    'Work through common wet-on-wet issues live with Sarah — bring your palette, two stretched sheets and your questions.',
  sessionType: 'Workshop (interactive)',
  roomName: 'watercolor-wash-workshop',
  maxParticipants: 40,
  date: 'Friday, 8 May 2026',
  time: '18:00',
  timezone: 'Europe/Berlin (CET)',
  minAttendanceMins: 30,
  preInstructions:
    'Bring 2 pre-stretched 9×12 sheets, your palette and a water jar. Have your Unit 3 wash sheet ready to share.',
  postInstructions:
    "Upload your wash sheet to the studio thread for next week's critique. Recording will be available within 24 h.",
  agenda: [
    { time: '0:00', item: 'Welcome & room check', dur: '5 min' },
    { time: '0:05', item: 'Troubleshooting backruns — live demo', dur: '15 min' },
    { time: '0:20', item: 'Student washes on screen — group feedback', dur: '20 min' },
    { time: '0:40', item: 'Q&A — open floor', dur: '15 min' },
    { time: '0:55', item: 'Wrap-up & next steps', dur: '5 min' },
  ],
  features: {
    waitingLobby: true,
    chat: true,
    screenShare: true,
    recording: false,
  },
  attending: 34,
  host: { initials: 'SL', name: 'Sarah Lin', role: 'Instructor' },
}

function LiveLesson({ lesson }: { lesson: Lesson }) {
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const S = LIVE_SESSION

  return (
    <div className="flex flex-col flex-1 overflow-y-auto hm-scroll">
      {/* ── Header ── */}
      <div
        className="px-8 py-6 flex items-start gap-5 shrink-0"
        style={{
          background: `linear-gradient(135deg, ${RED}0C 0%, transparent 60%)`,
          borderBottom: '1px solid var(--hm-border)',
        }}
      >
        <span
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: 'rgba(244,99,110,0.10)',
            color: RED,
            boxShadow: `0 4px 16px ${RED}33`,
          }}
        >
          <Radio className="h-6 w-6" />
          <span
            className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full"
            style={{ background: RED }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className="hm-mono text-[10px] font-semibold rounded-full px-2 py-0.5 flex items-center gap-1"
              style={{
                background: 'rgba(244,99,110,0.10)',
                color: RED,
                border: `1px solid ${RED}44`,
                letterSpacing: '0.14em',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: RED }}
              />
              LIVE SESSION
            </span>
            <span
              className="hm-mono text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--hm-text-muted)',
                border: '1px solid var(--hm-border)',
              }}
            >
              {S.sessionType}
            </span>
            <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
              {lesson.dur}
            </span>
          </div>
          <h2
            className="text-[20px] font-bold mb-1"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            {S.title}
          </h2>
          <p
            className="text-[12.5px] leading-relaxed mb-3"
            style={{ color: 'var(--hm-text-muted)', maxWidth: 560 }}
          >
            {S.description}
          </p>
          {/* Date / room row */}
          <div
            className="flex items-center gap-4 flex-wrap text-[12px]"
            style={{ color: 'var(--hm-text-dim)' }}
          >
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" style={{ color: RED }} />
              {S.date} · {S.time} {S.timezone}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" style={{ color: 'var(--hm-text-dim)' }} />
              <span className="hm-mono">{S.roomName}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" style={{ color: 'var(--hm-text-dim)' }} />
              max {S.maxParticipants} participants
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" style={{ color: 'var(--hm-text-dim)' }} />
              min {S.minAttendanceMins} min for completion
            </span>
          </div>
        </div>

        {/* Host chip */}
        <div
          className="shrink-0 flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full hm-mono text-[10px] font-bold"
            style={{ background: `linear-gradient(135deg, ${AMBER}66, ${AMBER}33)`, color: AMBER }}
          >
            {S.host.initials}
          </span>
          <div className="leading-tight">
            <p className="text-[12px] font-semibold" style={{ color: 'var(--hm-text)' }}>
              {S.host.name}
            </p>
            <p className="text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
              {S.host.role}
            </p>
          </div>
        </div>
      </div>

      {/* ── Body: 5-col grid ── */}
      <div className="px-8 py-5 grid grid-cols-5 gap-5 max-w-[960px]">
        {/* LEFT 3 cols — countdown + agenda + pre-session instructions */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Countdown */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'var(--hm-bg-card)', border: `1px solid ${RED}33` }}
          >
            <p
              className="hm-mono text-[9.5px] mb-3 font-semibold"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
            >
              SESSION STARTS IN
            </p>
            <div className="flex items-end gap-4 mb-3">
              {[
                { v: '02', l: 'DAYS' },
                { v: '14', l: 'HRS' },
                { v: '37', l: 'MIN' },
                { v: '08', l: 'SEC' },
              ].map((t) => (
                <div key={t.l} className="flex flex-col items-center">
                  <div
                    className="rounded-xl px-3 py-2 mb-1"
                    style={{ background: 'rgba(244,99,110,0.08)', border: `1px solid ${RED}33` }}
                  >
                    <span
                      className="hm-mono text-[28px] font-bold leading-none block"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.04em' }}
                    >
                      {t.v}
                    </span>
                  </div>
                  <span
                    className="hm-mono text-[9px]"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
                  >
                    {t.l}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="hm-mono text-[11px] flex items-center gap-1.5"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              <CalendarDays className="h-3.5 w-3.5" style={{ color: RED }} />
              {S.date} · {S.time} · {S.timezone}
            </p>
          </div>

          {/* Agenda */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <p
                className="hm-mono text-[9.5px] font-semibold"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
              >
                SESSION AGENDA
              </p>
            </div>
            <div>
              {S.agenda.map((a, i) => (
                <div
                  key={a.time}
                  className="flex items-center gap-4 px-5 py-2.5"
                  style={{ borderTop: i > 0 ? '1px solid var(--hm-border)' : 'none' }}
                >
                  <span
                    className="hm-mono text-[10px] shrink-0 w-8 font-medium"
                    style={{ color: RED }}
                  >
                    {a.time}
                  </span>
                  <p className="text-[12.5px] flex-1" style={{ color: 'var(--hm-text)' }}>
                    {a.item}
                  </p>
                  <span
                    className="hm-mono text-[10px] shrink-0"
                    style={{ color: 'var(--hm-text-dim)' }}
                  >
                    {a.dur}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-session instructions */}
          <div
            className="rounded-2xl px-5 py-4 flex gap-3 items-start"
            style={{ background: `${AMBER}0A`, border: `1px solid ${AMBER}33` }}
          >
            <Info className="h-4 w-4 shrink-0 mt-0.5" style={{ color: AMBER }} />
            <div>
              <p
                className="hm-mono text-[9.5px] font-semibold mb-1"
                style={{ color: AMBER, letterSpacing: '0.14em' }}
              >
                BEFORE THE SESSION
              </p>
              <p
                className="text-[12.5px] leading-relaxed"
                style={{ color: 'var(--hm-text-muted)' }}
              >
                {S.preInstructions}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT 2 cols — device check + features + attendees + CTA */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Device check */}
          <div
            className="rounded-2xl p-4 flex flex-col gap-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9.5px] font-semibold"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
            >
              DEVICE CHECK
            </p>
            <div
              className="w-full aspect-video rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{ background: '#0D0F1D' }}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-[13px] font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${VIOLET}, #9A78FF)`,
                    color: 'white',
                  }}
                >
                  JR
                </div>
                <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Camera {camOn ? 'on' : 'off'}
                </span>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMicOn((v) => !v)}
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ background: micOn ? 'rgba(255,255,255,0.15)' : RED, color: 'white' }}
                >
                  {micOn ? <Mic className="h-3.5 w-3.5" /> : <MicOff className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setCamOn((v) => !v)}
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ background: camOn ? 'rgba(255,255,255,0.15)' : RED, color: 'white' }}
                >
                  {camOn ? <Video className="h-3.5 w-3.5" /> : <VideoOff className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
            <div
              className="flex items-center gap-4 text-[11px]"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: micOn ? GREEN : RED }}
                />
                Mic {micOn ? 'on' : 'off'}
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: camOn ? GREEN : RED }}
                />
                Camera {camOn ? 'on' : 'off'}
              </div>
            </div>
          </div>

          {/* Session features (from creator toggles) */}
          <div
            className="rounded-2xl px-4 py-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9.5px] font-semibold mb-3"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
            >
              SESSION FEATURES
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { Icon: ShieldCheck, label: 'Waiting lobby', on: S.features.waitingLobby },
                { Icon: MessageCircle, label: 'Live chat', on: S.features.chat },
                { Icon: ScreenShare, label: 'Screen share', on: S.features.screenShare },
                { Icon: Lock, label: 'Recording', on: S.features.recording },
              ].map(({ Icon, label, on }) => (
                <div key={label} className="flex items-center gap-1.5 text-[11.5px]">
                  <Icon
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: on ? GREEN : 'var(--hm-text-dim)' }}
                  />
                  <span style={{ color: on ? 'var(--hm-text-muted)' : 'var(--hm-text-dim)' }}>
                    {label}
                  </span>
                  {!on && (
                    <span
                      className="hm-mono text-[9px] ml-auto"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      off
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Attendees */}
          <div
            className="rounded-2xl p-4"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <p
                className="hm-mono text-[9.5px] font-semibold"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.16em' }}
              >
                ATTENDING
              </p>
              <span
                className="hm-mono text-[11px] font-semibold"
                style={{ color: 'var(--hm-text-muted)' }}
              >
                <Users className="inline h-3 w-3 mr-0.5" />
                {S.attending} / {S.maxParticipants}
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-1">
              {[
                'linear-gradient(135deg,#8b5cf6,#6d28d9)',
                'linear-gradient(135deg,#f4b26c,#d97706)',
                'linear-gradient(135deg,#34d399,#047857)',
                'linear-gradient(135deg,#f472b6,#be185d)',
                'linear-gradient(135deg,#60a5fa,#1d4ed8)',
                'linear-gradient(135deg,#5bc8c5,#0e7490)',
                'linear-gradient(135deg,#fbbf24,#92400e)',
                'linear-gradient(135deg,#c4b5fd,#7c3aed)',
              ].map((bg, i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full border-2 flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: bg, borderColor: 'var(--hm-bg-card)' }}
                >
                  {['PS', 'MD', 'LW', 'AO', 'TH', 'EV', 'KA', 'MT'][i]}
                </div>
              ))}
              <div
                className="h-7 w-7 rounded-full border-2 flex items-center justify-center text-[8.5px] font-bold"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  borderColor: 'var(--hm-bg-card)',
                  color: 'var(--hm-text-dim)',
                }}
              >
                +{S.attending - 8}
              </div>
            </div>
          </div>

          {/* Join CTA */}
          <button
            type="button"
            className="w-full h-11 rounded-xl text-[13.5px] font-semibold flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${RED}, #FF6B6B)`,
              color: 'white',
              boxShadow: `0 8px 24px -8px ${RED}66`,
            }}
          >
            <Radio className="h-4 w-4" /> Join live session
          </button>

          {/* Add reminder */}
          <button
            type="button"
            className="w-full h-9 rounded-xl text-[12px] font-medium flex items-center justify-center gap-2"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-muted)',
            }}
          >
            <AlertCircle className="h-3.5 w-3.5" /> Add to calendar
          </button>

          {/* Post-session note */}
          <div
            className="rounded-xl px-4 py-3 flex gap-2.5 items-start"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--hm-border)' }}
          >
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: 'var(--hm-text-dim)' }} />
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--hm-text-dim)' }}>
              <span className="font-semibold" style={{ color: 'var(--hm-text-muted)' }}>
                After:{' '}
              </span>
              {S.postInstructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Final Assessment View (student-facing) ──────────────────────── */
function FinalAssessmentView() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [activeQ, setActiveQ] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const answered = Object.keys(answers).length
  const q = FA_QUESTIONS[activeQ]

  /* earned marks on submission */
  const earned = submitted
    ? FA_QUESTIONS.reduce((s, fq, i) => s + (answers[i] === fq.correct ? fq.pts : 0), 0)
    : 0
  const passed = earned >= FA_PASS_MARK

  /* pick answer, auto-advance */
  function pick(qi: number, oi: number) {
    if (submitted) return
    setAnswers((a) => ({ ...a, [qi]: oi }))
    if (qi < FA_QUESTIONS.length - 1) setTimeout(() => setActiveQ(qi + 1), 340)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* ── Assessment header ── */}
      <div
        className="shrink-0 px-6 py-4 flex items-center gap-4"
        style={{
          borderBottom: '1px solid var(--hm-border)',
          background: `linear-gradient(135deg, ${VIOLET}0D 0%, var(--hm-bg-elev) 60%)`,
        }}
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: VIOLET_SOFT, boxShadow: `0 4px 16px ${VIOLET}33`, color: VIOLET }}
        >
          <Award className="h-5 w-5" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="hm-mono text-[10px] font-semibold rounded-full px-2 py-0.5"
              style={{
                background: VIOLET_SOFT,
                color: VIOLET,
                border: `1px solid ${VIOLET}40`,
                letterSpacing: '0.14em',
              }}
            >
              FINAL ASSESSMENT
            </span>
            <span
              className="hm-mono text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(139,146,168,0.15)',
                color: 'var(--hm-text-dim)',
                letterSpacing: '0.1em',
              }}
            >
              OPTIONAL
            </span>
          </div>
          <h2
            className="text-[17px] font-bold truncate"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.016em' }}
          >
            Watercolor Foundations — Final Assessment
          </h2>
        </div>

        {/* Timer + attempt */}
        {!submitted && (
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <Clock className="h-3.5 w-3.5" style={{ color: VIOLET }} />
              <span
                className="hm-mono text-[13px] font-semibold"
                style={{ color: 'var(--hm-text)' }}
              >
                1:27:42
              </span>
            </div>
            <div className="text-right">
              <p
                className="hm-mono text-[10px] font-semibold"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
              >
                ATTEMPT
              </p>
              <p className="hm-mono text-[13px] font-bold" style={{ color: 'var(--hm-text)' }}>
                1 / 2
              </p>
            </div>
          </div>
        )}

        {/* Score result */}
        {submitted && (
          <div className="flex items-center gap-4 shrink-0">
            <div
              className="flex flex-col items-center px-5 py-2 rounded-xl"
              style={{
                background: passed ? GREEN_SOFT : 'rgba(244,99,110,0.10)',
                border: `1px solid ${passed ? GREEN : RED}44`,
              }}
            >
              <span
                className="hm-mono text-[28px] font-bold leading-none"
                style={{ color: passed ? GREEN : RED }}
              >
                {earned}/{FA_TOTAL_MARKS}
              </span>
              <span
                className="hm-mono text-[10px] font-semibold mt-0.5"
                style={{ color: passed ? GREEN : RED, letterSpacing: '0.1em' }}
              >
                {passed ? 'PASSED' : 'TRY AGAIN'}
              </span>
            </div>
            {passed && (
              <div className="flex flex-col items-center gap-1">
                <Trophy className="h-8 w-8" style={{ color: AMBER }} />
                <span
                  className="hm-mono text-[9px]"
                  style={{ color: AMBER, letterSpacing: '0.1em' }}
                >
                  CERTIFICATE
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Body: two-col layout ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT — Question navigator + info card */}
        <div
          className="shrink-0 flex flex-col gap-4 p-4 overflow-y-auto hm-scroll"
          style={{
            width: 184,
            borderRight: '1px solid var(--hm-border)',
            background: 'var(--hm-bg-elev)',
          }}
        >
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="hm-mono text-[9.5px]"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
              >
                PROGRESS
              </span>
              <span className="hm-mono text-[10px] font-bold" style={{ color: VIOLET }}>
                {answered}/{FA_QUESTIONS.length}
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: 'var(--hm-bg-card-2)' }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(answered / FA_QUESTIONS.length) * 100}%`,
                  background: `linear-gradient(90deg, ${VIOLET}, #A78BFA)`,
                }}
              />
            </div>
          </div>

          {/* Question number grid */}
          <div>
            <p
              className="hm-mono text-[9.5px] mb-2"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
            >
              QUESTIONS
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {FA_QUESTIONS.map((fq, i) => {
                const isAns = answers[i] !== undefined
                const isCur = i === activeQ
                const isCorr = submitted && answers[i] === fq.correct
                const isWrng = submitted && answers[i] !== undefined && answers[i] !== fq.correct
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveQ(i)}
                    className="hm-mono flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold transition-all"
                    style={{
                      background: isCorr
                        ? GREEN_SOFT
                        : isWrng
                          ? 'rgba(244,99,110,0.12)'
                          : isCur
                            ? VIOLET_SOFT
                            : isAns
                              ? `${VIOLET}18`
                              : 'var(--hm-bg-card)',
                      border: `1.5px solid ${isCorr ? GREEN + '66' : isWrng ? RED + '66' : isCur ? VIOLET : isAns ? VIOLET + '44' : 'var(--hm-border)'}`,
                      color: isCorr
                        ? GREEN
                        : isWrng
                          ? RED
                          : isCur
                            ? VIOLET
                            : isAns
                              ? VIOLET
                              : 'var(--hm-text-dim)',
                      boxShadow: isCur ? `0 0 0 2px ${VIOLET}30` : 'none',
                    }}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Assessment info */}
          <div
            className="rounded-xl p-3 flex flex-col gap-2.5"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9.5px] font-semibold"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              ASSESSMENT INFO
            </p>
            {[
              { label: 'Time limit', val: '90 min' },
              { label: 'Passing score', val: `${FA_PASS_MARK}/${FA_TOTAL_MARKS} pts` },
              { label: 'Attempts', val: 'Max 2' },
              { label: 'Questions', val: `${FA_QUESTIONS.length} MCQ` },
            ].map((row) => (
              <div key={row.label}>
                <p className="text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
                  {row.label}
                </p>
                <p
                  className="hm-mono text-[11px] font-semibold"
                  style={{ color: 'var(--hm-text-muted)' }}
                >
                  {row.val}
                </p>
              </div>
            ))}
          </div>

          {/* Optional badge */}
          <div
            className="rounded-xl px-3 py-2.5 flex items-start gap-2"
            style={{ background: VIOLET_SOFT, border: `1px solid ${VIOLET}30` }}
          >
            <Award className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: VIOLET }} />
            <p className="text-[10.5px] leading-snug" style={{ color: VIOLET }}>
              This assessment is <strong>optional</strong> — complete it to earn your course
              certificate.
            </p>
          </div>
        </div>

        {/* RIGHT — Active question + options */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto hm-scroll px-6 py-5">
            {/* Question card */}
            <div
              className="rounded-2xl overflow-hidden mb-4"
              style={{
                background: submitted
                  ? answers[activeQ] === q.correct
                    ? `${GREEN}0A`
                    : 'rgba(244,99,110,0.06)'
                  : `linear-gradient(135deg, var(--hm-bg-card-2) 0%, ${VIOLET}06 100%)`,
                border: submitted
                  ? `1.5px solid ${answers[activeQ] === q.correct ? GREEN + '44' : RED + '44'}`
                  : `1.5px solid ${answers[activeQ] !== undefined ? VIOLET + '55' : 'var(--hm-border)'}`,
              }}
            >
              {/* Question header */}
              <div
                className="px-5 py-4 flex items-start gap-3"
                style={{ borderBottom: '1px solid var(--hm-border)' }}
              >
                <span
                  className="hm-mono flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
                  style={{
                    background: VIOLET_SOFT,
                    color: VIOLET,
                    border: `1px solid ${VIOLET}40`,
                  }}
                >
                  {activeQ + 1}
                </span>
                <div className="flex-1">
                  <p
                    className="text-[15px] font-semibold leading-relaxed"
                    style={{ color: 'var(--hm-text)' }}
                  >
                    {q.q}
                  </p>
                </div>
                <span
                  className="hm-mono text-[10px] shrink-0 px-2 py-1 rounded-lg"
                  style={{
                    background: 'var(--hm-bg-card)',
                    color: 'var(--hm-text-dim)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  {q.pts} pt{q.pts > 1 ? 's' : ''}
                </span>
                {submitted &&
                  (answers[activeQ] === q.correct ? (
                    <Check className="h-5 w-5 shrink-0" style={{ color: GREEN }} />
                  ) : (
                    <X className="h-5 w-5 shrink-0" style={{ color: RED }} />
                  ))}
              </div>

              {/* Options */}
              <div className="p-4 grid grid-cols-2 gap-2.5">
                {q.options.map((opt, oi) => {
                  const selected = answers[activeQ] === oi
                  const isCorrect = oi === q.correct
                  let bg = 'var(--hm-bg-card-2)'
                  let border = 'var(--hm-border)'
                  let color = 'var(--hm-text-muted)'
                  if (submitted) {
                    if (isCorrect) {
                      bg = GREEN_SOFT
                      border = `${GREEN}55`
                      color = GREEN
                    } else if (selected && !isCorrect) {
                      bg = 'rgba(244,99,110,0.10)'
                      border = `${RED}55`
                      color = RED
                    }
                  } else if (selected) {
                    bg = VIOLET_SOFT
                    border = `${VIOLET}55`
                    color = VIOLET
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => pick(activeQ, oi)}
                      className="text-left rounded-xl px-4 py-3.5 text-[13px] font-medium transition-all flex items-center gap-2.5"
                      style={{ background: bg, border: `1.5px solid ${border}`, color }}
                    >
                      <span
                        className="hm-mono flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{
                          background:
                            selected || (submitted && isCorrect)
                              ? 'currentColor'
                              : 'rgba(139,146,168,0.15)',
                          color:
                            selected || (submitted && isCorrect)
                              ? 'var(--hm-bg)'
                              : 'var(--hm-text-dim)',
                        }}
                      >
                        {['A', 'B', 'C', 'D'][oi]}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Nav between questions */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                disabled={activeQ === 0}
                onClick={() => setActiveQ((v) => v - 1)}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[12.5px] font-medium"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: activeQ === 0 ? 'var(--hm-text-dim)' : 'var(--hm-text-muted)',
                  opacity: activeQ === 0 ? 0.45 : 1,
                }}
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </button>
              <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                {activeQ + 1} / {FA_QUESTIONS.length}
              </span>
              <button
                type="button"
                disabled={activeQ === FA_QUESTIONS.length - 1}
                onClick={() => setActiveQ((v) => v + 1)}
                className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[12.5px] font-medium"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color:
                    activeQ === FA_QUESTIONS.length - 1
                      ? 'var(--hm-text-dim)'
                      : 'var(--hm-text-muted)',
                  opacity: activeQ === FA_QUESTIONS.length - 1 ? 0.45 : 1,
                }}
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom action bar */}
          <div
            className="shrink-0 flex items-center gap-3 px-6 py-3"
            style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-elev)' }}
          >
            <span className="text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
              {answered < FA_QUESTIONS.length
                ? `${FA_QUESTIONS.length - answered} question${FA_QUESTIONS.length - answered === 1 ? '' : 's'} remaining`
                : 'All questions answered — ready to submit'}
            </span>
            <div className="flex-1" />
            {submitted ? (
              <button
                type="button"
                onClick={() => {
                  setAnswers({})
                  setSubmitted(false)
                  setActiveQ(0)
                }}
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-[13px] font-semibold"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-muted)',
                }}
              >
                <RotateCcw className="h-4 w-4" /> Retake
              </button>
            ) : (
              <button
                type="button"
                onClick={() => answered > 0 && setSubmitted(true)}
                className="inline-flex items-center gap-2 h-10 px-6 rounded-xl text-[13px] font-semibold transition-all"
                style={{
                  background:
                    answered === FA_QUESTIONS.length
                      ? `linear-gradient(135deg, ${VIOLET}, #9A78FF)`
                      : 'var(--hm-bg-card-2)',
                  border: `1.5px solid ${answered === FA_QUESTIONS.length ? 'transparent' : 'var(--hm-border)'}`,
                  color: answered === FA_QUESTIONS.length ? 'white' : 'var(--hm-text-dim)',
                  boxShadow: answered === FA_QUESTIONS.length ? `0 6px 20px ${VIOLET}44` : 'none',
                  opacity: answered === 0 ? 0.5 : 1,
                  cursor: answered === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                <Award className="h-4 w-4" /> Submit Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Lesson renderer ─────────────────────────────────────────────── */
function LessonContent({ lesson }: { lesson: Lesson }) {
  switch (lesson.type) {
    case 'video':
      return <VideoLesson lesson={lesson} />
    case 'text':
      return <TextLesson lesson={lesson} />
    case 'quiz':
      return <QuizLesson lesson={lesson} />
    case 'live':
      return <LiveLesson lesson={lesson} />
  }
}

/* ── Main component ──────────────────────────────────────────────── */
export default function StudentCourseViewer() {
  const qp = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const [currentId, setCurrentId] = useState(qp.get('lesson') || 'fa')
  const [openMods, setOpenMods] = useState(['m1', 'm2', 'm3'])

  const isFinalAssessment = currentId === 'fa'
  const currentLesson = !isFinalAssessment ? ALL_LESSONS.find((l) => l.id === currentId) : undefined
  const currentIndex = currentLesson ? ALL_LESSONS.indexOf(currentLesson) : -1
  const prevLesson = currentIndex > 0 ? ALL_LESSONS[currentIndex - 1] : undefined
  const nextLesson =
    currentIndex >= 0 && currentIndex < ALL_LESSONS.length - 1
      ? ALL_LESSONS[currentIndex + 1]
      : undefined

  const totalLessons = ALL_LESSONS.length
  const doneLessons = ALL_LESSONS.filter((l) => l.done).length
  const progress = Math.round((doneLessons / totalLessons) * 100)

  function toggleMod(id: string) {
    setOpenMods((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }

  return (
    <StudentShell activeTab="courses" fullWidth>
      {/* ── Full-height split pane (below StudentShell header h-14=56px) ── */}
      <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
        {/* ═══════════════════════════════════════════════════════════
            LEFT PANEL — Course outline
        ════════════════════════════════════════════════════════════ */}
        <aside
          className="flex flex-col shrink-0 overflow-hidden"
          style={{
            width: 300,
            borderRight: '1px solid var(--hm-border)',
            background: 'var(--hm-bg-elev)',
          }}
        >
          {/* Course info + progress */}
          <div
            className="px-4 py-4 shrink-0"
            style={{ borderBottom: '1px solid var(--hm-border)' }}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 mb-3 text-[12px] font-medium"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              All courses
            </button>
            <h3
              className="text-[14px] font-bold leading-tight mb-3"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.014em' }}
            >
              Watercolor Foundations: Botanical Studies
            </h3>
            <div
              className="h-1.5 rounded-full overflow-hidden mb-1.5"
              style={{ background: 'var(--hm-bg-card-2)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${VIOLET}, #A78BFA)`,
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                {doneLessons}/{totalLessons} lessons
              </span>
              <span className="hm-mono text-[11px] font-bold" style={{ color: VIOLET }}>
                {progress}%
              </span>
            </div>
          </div>

          {/* Module accordion */}
          <nav className="flex-1 overflow-y-auto hm-scroll">
            {MODULES.map((mod) => {
              const isOpen = openMods.includes(mod.id)
              const modDone = mod.lessons.filter((l) => l.done).length
              const allDone = modDone === mod.lessons.length
              return (
                <div key={mod.id} style={{ borderBottom: '1px solid var(--hm-border)' }}>
                  {/* Module header */}
                  <button
                    type="button"
                    onClick={() => toggleMod(mod.id)}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-left"
                    style={{ background: isOpen ? 'rgba(124,92,246,0.04)' : 'transparent' }}
                  >
                    <ChevronDown
                      className="h-3.5 w-3.5 shrink-0 transition-transform"
                      style={{
                        color: 'var(--hm-text-dim)',
                        transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[12px] font-semibold leading-tight"
                        style={{ color: allDone ? 'var(--hm-text-muted)' : 'var(--hm-text)' }}
                      >
                        {mod.title}
                      </p>
                      <p
                        className="hm-mono text-[10px] mt-0.5"
                        style={{ color: allDone ? GREEN : 'var(--hm-text-dim)' }}
                      >
                        {modDone}/{mod.lessons.length}
                        {allDone ? ' · ✓ complete' : ' lessons'}
                      </p>
                    </div>
                  </button>

                  {/* Lessons */}
                  {isOpen &&
                    mod.lessons.map((l) => {
                      const LIcon = TYPE_META[l.type].Icon
                      const lc = TYPE_META[l.type].color
                      const isCur = l.id === currentId
                      return (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => setCurrentId(l.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                          style={{
                            background: isCur
                              ? `linear-gradient(90deg, ${VIOLET}18 0%, transparent 100%)`
                              : l.done
                                ? 'rgba(94,230,168,0.02)'
                                : 'transparent',
                            borderLeft: isCur ? `3px solid ${VIOLET}` : '3px solid transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!isCur) e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                          }}
                          onMouseLeave={(e) => {
                            if (!isCur)
                              e.currentTarget.style.background = l.done
                                ? 'rgba(94,230,168,0.02)'
                                : 'transparent'
                          }}
                        >
                          {/* Icon */}
                          <span
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                            style={{
                              background: l.done
                                ? GREEN_SOFT
                                : isCur
                                  ? VIOLET_SOFT
                                  : 'var(--hm-bg-card)',
                              color: l.done ? GREEN : isCur ? VIOLET : 'var(--hm-text-dim)',
                            }}
                          >
                            {l.done ? (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : (
                              <LIcon className="h-3.5 w-3.5" />
                            )}
                          </span>
                          {/* Title + meta */}
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-[12px] leading-snug truncate"
                              style={{
                                color: isCur
                                  ? VIOLET
                                  : l.done
                                    ? 'var(--hm-text-dim)'
                                    : 'var(--hm-text)',
                                fontWeight: isCur ? 600 : 400,
                              }}
                            >
                              {l.title}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span
                                className="hm-mono text-[9.5px]"
                                style={{ color: lc, opacity: 0.85 }}
                              >
                                {TYPE_META[l.type].label}
                              </span>
                              <span
                                className="h-2.5 w-px"
                                style={{ background: 'var(--hm-border)' }}
                              />
                              <span
                                className="hm-mono text-[9.5px]"
                                style={{ color: 'var(--hm-text-dim)' }}
                              >
                                {l.dur}
                              </span>
                            </div>
                          </div>
                          {isCur && (
                            <span
                              className="h-5 w-5 shrink-0 flex items-center justify-center rounded-full"
                              style={{ background: VIOLET }}
                            >
                              <Play className="h-2.5 w-2.5 fill-white text-white ml-0.5" />
                            </span>
                          )}
                        </button>
                      )
                    })}
                </div>
              )
            })}

            {/* ── Final Assessment entry ── */}
            <div style={{ borderTop: '2px solid var(--hm-border)', marginTop: 2 }}>
              <button
                type="button"
                onClick={() => setCurrentId('fa')}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors relative"
                style={{
                  background: isFinalAssessment
                    ? `linear-gradient(90deg, ${VIOLET}1A 0%, transparent 100%)`
                    : `linear-gradient(135deg, ${VIOLET}06 0%, transparent 80%)`,
                  borderLeft: `3px solid ${isFinalAssessment ? VIOLET : VIOLET + '30'}`,
                }}
              >
                {/* Award icon */}
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: isFinalAssessment ? VIOLET_SOFT : `${VIOLET}14`,
                    color: VIOLET,
                    border: `1px solid ${isFinalAssessment ? VIOLET + '55' : VIOLET + '28'}`,
                    boxShadow: isFinalAssessment ? `0 4px 12px ${VIOLET}33` : 'none',
                  }}
                >
                  <Award className="h-4 w-4" />
                </span>
                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-semibold" style={{ color: VIOLET }}>
                    Final Assessment
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="hm-mono text-[9.5px]"
                      style={{ color: VIOLET, opacity: 0.75, letterSpacing: '0.08em' }}
                    >
                      8 questions · 90 min
                    </span>
                    <span className="h-2.5 w-px" style={{ background: `${VIOLET}44` }} />
                    <span
                      className="hm-mono text-[9px] px-1.5 rounded"
                      style={{ background: `${VIOLET}14`, color: VIOLET, letterSpacing: '0.06em' }}
                    >
                      OPTIONAL
                    </span>
                  </div>
                </div>
                {/* Glow dot if active */}
                {isFinalAssessment && (
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: VIOLET, boxShadow: `0 0 8px ${VIOLET}` }}
                  />
                )}
              </button>
            </div>
          </nav>
        </aside>

        {/* ═══════════════════════════════════════════════════════════
            RIGHT PANEL — Lesson content  OR  Final Assessment
        ════════════════════════════════════════════════════════════ */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {/* ── Final Assessment view (no top bar — FA has its own header) ── */}
          {isFinalAssessment && <FinalAssessmentView />}

          {/* ── Normal lesson view ── */}
          {!isFinalAssessment && currentLesson && (
            <>
              {/* Lesson top bar */}
              <div
                className="flex items-center gap-3 px-6 shrink-0"
                style={{
                  height: 48,
                  borderBottom: '1px solid var(--hm-border)',
                  background: 'var(--hm-bg-elev)',
                }}
              >
                {(() => {
                  const tm = TYPE_META[currentLesson.type]
                  return (
                    <>
                      <span
                        className="hm-mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                        style={{
                          background: tm.soft,
                          color: tm.color,
                          border: `1px solid ${tm.color}40`,
                        }}
                      >
                        <tm.Icon className="h-2.5 w-2.5" />
                        {tm.label.toUpperCase()}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[13px] font-semibold truncate"
                          style={{ color: 'var(--hm-text)' }}
                        >
                          {currentLesson.title}
                        </p>
                      </div>
                    </>
                  )
                })()}

                {/* Prev / Next */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    disabled={!prevLesson}
                    onClick={() => prevLesson && setCurrentId(prevLesson.id)}
                    className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-medium"
                    style={{
                      background: 'var(--hm-bg-card)',
                      border: '1px solid var(--hm-border)',
                      color: prevLesson ? 'var(--hm-text-muted)' : 'var(--hm-text-dim)',
                      opacity: prevLesson ? 1 : 0.45,
                    }}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Previous
                  </button>
                  <button
                    type="button"
                    disabled={!nextLesson}
                    onClick={() => nextLesson && setCurrentId(nextLesson.id)}
                    className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-[12px] font-semibold"
                    style={{
                      background: nextLesson ? VIOLET : 'var(--hm-bg-card)',
                      border: `1px solid ${nextLesson ? 'transparent' : 'var(--hm-border)'}`,
                      color: nextLesson ? 'white' : 'var(--hm-text-dim)',
                      opacity: nextLesson ? 1 : 0.45,
                      boxShadow: nextLesson ? `0 4px 12px ${VIOLET}44` : 'none',
                    }}
                  >
                    Next <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic lesson content */}
              <LessonContent key={currentId} lesson={currentLesson} />
            </>
          )}
        </div>
      </div>
    </StudentShell>
  )
}
