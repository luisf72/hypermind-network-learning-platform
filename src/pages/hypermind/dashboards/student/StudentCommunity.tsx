import { useState, type ReactNode } from 'react'
import {
  Heart,
  MessageSquare,
  Share2,
  Plus,
  X,
  Image as ImageIcon,
  Users,
  Lock,
  Globe,
  ChevronDown,
  ChevronUp,
  Send,
  Trophy,
  Zap,
  Star,
  Crown,
  Medal,
  Search,
  MoreHorizontal,
  BookOpen,
  Settings,
  Smile,
  Paperclip,
  Camera,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, GREEN, AMBER, BLUE } from './StudentShell'
import { Header } from '../../_shared/Header'
import { useAuthStore } from '@/stores/authStore'

function PublicCommunityShell({ children }: { children: ReactNode }) {
  return (
    <div className="hm-root" style={{ minHeight: '100vh', background: 'var(--hm-bg)' }}>
      <Header active="community" />
      <main className="mx-auto w-full max-w-[1280px]">{children}</main>
    </div>
  )
}

/* ─── Colours ─────────────────────────────────────────── */
const ROSE = '#F4636E'
const TEAL = '#5BC8C5'

/* ─── Data ─────────────────────────────────────────────── */
const CATS = [
  'General',
  'Watercolor',
  'Spanish',
  'Finance',
  'Guitar',
  'Wine',
  'Korean',
  'UX Design',
  'Python',
]

interface Post {
  id: string
  avatar: string
  name: string
  role: string
  time: string
  category: string
  text: string
  image?: string
  imageColor?: string
  likes: number
  liked: boolean
  comments: Comment[]
  color: string
}
interface Comment {
  id: string
  avatar: string
  name: string
  time: string
  text: string
  likes: number
}

const POSTS: Post[] = [
  {
    id: 'p1',
    avatar: 'CO',
    name: 'Camila Ortega',
    role: 'Watercolor · Lv 14',
    time: '12 min ago',
    category: 'Watercolor',
    color: AMBER,
    text: 'Finally nailed the wet-on-wet technique after three weeks of practice! The trick that clicked for me was pre-wetting the paper with clean water first and waiting 30 seconds before laying pigment. Anyone else have this "aha" moment? Would love to hear what unlocked it for you 🎨',
    image: 'watercolor',
    imageColor: '#F4B26C',
    likes: 41,
    liked: false,
    comments: [
      {
        id: 'c1',
        avatar: 'DB',
        name: 'Daniel B.',
        time: '8m ago',
        text: 'Yes! That 30-second wait is key. I also switched to Arches 300gsm and it made a huge difference.',
        likes: 7,
      },
      {
        id: 'c2',
        avatar: 'ML',
        name: 'Mei Lin',
        time: '5m ago',
        text: 'Same! I kept rushing the pre-wet stage. Once I slowed down everything changed.',
        likes: 4,
      },
    ],
  },
  {
    id: 'p2',
    avatar: 'LO',
    name: "Liam O'Brien",
    role: 'Languages · Lv 9',
    time: '1h ago',
    category: 'Spanish',
    color: VIOLET,
    text: 'Sharing my custom Anki deck for the Spanish Travelers course — 350 cards covering airport vocab, hotel phrases, restaurant ordering and emergency expressions. Each card has audio and example sentence. Link in comments if anyone wants a copy!',
    likes: 89,
    liked: true,
    comments: [
      {
        id: 'c3',
        avatar: 'AR',
        name: 'Aisha R.',
        time: '55m ago',
        text: 'This is incredible, thank you! Do you have a Portuguese version by any chance?',
        likes: 12,
      },
    ],
  },
  {
    id: 'p3',
    avatar: 'AR',
    name: 'Aisha Rahman',
    role: 'Finance · Lv 11',
    time: '3h ago',
    category: 'Finance',
    color: BLUE,
    text: "Built a compound interest visualiser that matches Dana's Module 3 examples exactly. You input principal, rate, frequency and years and it renders a step-by-step table plus a chart. Happy to share the Google Sheet link — drop a 💬 and I'll send it over.",
    image: 'chart',
    imageColor: BLUE,
    likes: 67,
    liked: false,
    comments: [
      {
        id: 'c4',
        avatar: 'JK',
        name: 'Jamie K.',
        time: '2h ago',
        text: "Please share! I've been trying to build something like this.",
        likes: 3,
      },
      {
        id: 'c5',
        avatar: 'CO',
        name: 'Camila O.',
        time: '1h ago',
        text: 'This is so useful. The compound interest module was the one that made me re-think my savings strategy.',
        likes: 9,
      },
    ],
  },
  {
    id: 'p4',
    avatar: 'DB',
    name: 'Daniel Becker',
    role: 'Music · Lv 7',
    time: '1d ago',
    category: 'Guitar',
    color: TEAL,
    text: "Week 3 of the F barre chord grind. My index finger is finally pressing all 6 strings cleanly — rolling it slightly forward (toward the headstock) was the answer everyone recommended and they were right. If you're struggling: 15 min a day, slow BPM, don't skip the warm-up.",
    likes: 132,
    liked: false,
    comments: [
      {
        id: 'c6',
        avatar: 'SN',
        name: 'Sofia N.',
        time: '20h ago',
        text: 'The rolling trick is everything. Also try shifting the chord slightly up toward the nut — less tension there.',
        likes: 21,
      },
    ],
  },
]

interface StudyGroup {
  id: string
  name: string
  category: string
  members: number
  capacity: number
  description: string
  private: boolean
  joined: boolean
  color: string
  activity: number
}

const GROUPS: StudyGroup[] = [
  {
    id: 'g1',
    name: 'Watercolour Sundays',
    category: 'Watercolor',
    members: 24,
    capacity: 30,
    description:
      "Weekly live session every Sunday at 14:00 UTC. We paint together and critique each other's work.",
    private: false,
    joined: true,
    color: AMBER,
    activity: 92,
  },
  {
    id: 'g2',
    name: 'Spanish Conversation Circle',
    category: 'Spanish',
    members: 31,
    capacity: 40,
    description: 'Practise spoken Spanish daily. We post voice notes and short video challenges.',
    private: false,
    joined: true,
    color: VIOLET,
    activity: 78,
  },
  {
    id: 'g3',
    name: 'Personal Finance 101',
    category: 'Finance',
    members: 18,
    capacity: 25,
    description: "Discuss Dana's lessons, share spreadsheets and budget templates.",
    private: false,
    joined: false,
    color: BLUE,
    activity: 54,
  },
  {
    id: 'g4',
    name: 'Guitar Barre Chord Help',
    category: 'Guitar',
    members: 9,
    capacity: 15,
    description:
      'A safe space for beginners struggling with barre chords. No judgement, just tips.',
    private: true,
    joined: false,
    color: TEAL,
    activity: 41,
  },
]

interface LeaderUser {
  rank: number
  avatar: string
  name: string
  xp: number
  level: number
  color: string
  streak?: number
}

const LEADERS: LeaderUser[] = [
  { rank: 1, avatar: 'CO', name: 'Camila Ortega', xp: 12840, level: 14, color: AMBER, streak: 22 },
  { rank: 2, avatar: 'AR', name: 'Aisha Rahman', xp: 10920, level: 11, color: BLUE, streak: 18 },
  { rank: 3, avatar: 'DB', name: 'Daniel Becker', xp: 9340, level: 7, color: TEAL, streak: 12 },
  { rank: 4, avatar: 'LO', name: "Liam O'Brien", xp: 7480, level: 9, color: VIOLET, streak: 9 },
  { rank: 5, avatar: 'ML', name: 'Mei Lin', xp: 6210, level: 8, color: AMBER },
  { rank: 6, avatar: 'SN', name: 'Sofia Navarro', xp: 5680, level: 7, color: BLUE },
  { rank: 7, avatar: 'JK', name: 'Jamie Kowalski', xp: 4320, level: 6, color: VIOLET },
  { rank: 8, avatar: 'JD', name: 'Jordan Davis', xp: 3870, level: 5, color: VIOLET, streak: 12 },
  { rank: 9, avatar: 'TH', name: 'Tom Hale', xp: 3120, level: 5, color: TEAL },
  { rank: 10, avatar: 'PK', name: 'Priya Kumar', xp: 2740, level: 4, color: GREEN },
]

const MAX_XP = LEADERS[0].xp
const RANK_ICON: Record<number, ReactNode> = {
  1: <Crown className="h-3.5 w-3.5" style={{ color: '#F4D35E' }} />,
  2: <Medal className="h-3.5 w-3.5" style={{ color: '#C0C0C0' }} />,
  3: <Medal className="h-3.5 w-3.5" style={{ color: '#CD7F32' }} />,
}

/* ─── Image Placeholders ────────────────────────────────── */

function WatercolorPlaceholder({ color }: { color: string }) {
  return (
    <div
      className="h-36 relative overflow-hidden flex items-end justify-start"
      style={{
        background: `linear-gradient(135deg, ${color}10 0%, ${VIOLET}08 55%, ${color}06 100%)`,
      }}
    >
      {/* Abstract paint blobs */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 210"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="blur1">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="blur2">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <circle cx="110" cy="75" r="70" fill={color} fillOpacity="0.22" filter="url(#blur1)" />
        <circle cx="230" cy="130" r="90" fill={color} fillOpacity="0.13" filter="url(#blur1)" />
        <circle cx="360" cy="60" r="55" fill={VIOLET} fillOpacity="0.18" filter="url(#blur1)" />
        <circle cx="460" cy="150" r="80" fill={color} fillOpacity="0.10" filter="url(#blur1)" />
        <circle cx="520" cy="50" r="40" fill={VIOLET} fillOpacity="0.14" filter="url(#blur1)" />
        <ellipse
          cx="180"
          cy="95"
          rx="110"
          ry="30"
          fill={color}
          fillOpacity="0.25"
          filter="url(#blur2)"
          transform="rotate(-12 180 95)"
        />
        <ellipse
          cx="400"
          cy="120"
          rx="85"
          ry="22"
          fill={VIOLET}
          fillOpacity="0.18"
          filter="url(#blur2)"
          transform="rotate(8 400 120)"
        />
        <ellipse
          cx="290"
          cy="160"
          rx="70"
          ry="18"
          fill={color}
          fillOpacity="0.20"
          filter="url(#blur2)"
          transform="rotate(-5 290 160)"
        />
        {/* Fine detail strokes */}
        <path
          d="M80 90 Q160 60 240 95 Q300 120 380 85 Q440 60 510 90"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          strokeOpacity="0.35"
        />
        <path
          d="M60 140 Q150 115 250 145 Q340 168 440 138 Q500 118 560 148"
          stroke={VIOLET}
          strokeWidth="1.5"
          fill="none"
          strokeOpacity="0.25"
        />
      </svg>
      {/* Label overlay */}
      <div className="relative z-10 px-4 pb-4">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-sm"
          style={{ background: `${color}20`, border: `1px solid ${color}35` }}
        >
          <span className="text-[11px] font-medium" style={{ color }}>
            Wet-on-wet demo · Arches 300gsm
          </span>
        </span>
      </div>
    </div>
  )
}

function ChartPlaceholder({ color }: { color: string }) {
  const data = [
    { label: 'Y1', v: 1050 },
    { label: 'Y2', v: 1102 },
    { label: 'Y3', v: 1158 },
    { label: 'Y5', v: 1276 },
    { label: 'Y8', v: 1477 },
    { label: 'Y10', v: 1629 },
    { label: 'Y15', v: 2079 },
    { label: 'Y20', v: 2653 },
    { label: 'Y25', v: 3386 },
  ]
  const max = 3386
  return (
    <div
      className="h-36 flex flex-col px-5 pt-3 pb-2 gap-1.5"
      style={{ background: `linear-gradient(180deg, ${color}0e 0%, transparent 100%)` }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11.5px] font-semibold" style={{ color }}>
          Compound Interest · $1,000 @ 5% monthly
        </p>
        <span
          className="hm-mono text-[10px] px-2 py-0.5 rounded"
          style={{ background: `${color}18`, color, letterSpacing: '0.06em' }}
        >
          GOOGLE SHEET
        </span>
      </div>
      <div className="flex-1 flex items-end gap-1.5 pb-4">
        {data.map((d, i) => {
          const pct = (d.v / max) * 100
          return (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5">
              {i === data.length - 1 && (
                <span className="hm-mono text-[8px] font-bold" style={{ color }}>
                  ${(d.v / 1000).toFixed(1)}k
                </span>
              )}
              <div
                className="w-full relative rounded-t-sm overflow-hidden"
                style={{ height: `${Math.max(pct * 0.85, 6)}%` }}
              >
                <div
                  className="absolute inset-0 rounded-t-sm"
                  style={{
                    background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
                    opacity: 0.3 + (i / data.length) * 0.7,
                  }}
                />
              </div>
              <span className="hm-mono text-[8px]" style={{ color: 'var(--hm-text-dim)' }}>
                {d.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Sub-components ────────────────────────────────────── */

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3)
    return (
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full shrink-0"
        style={{
          background:
            rank === 1
              ? 'rgba(244,211,94,0.15)'
              : rank === 2
                ? 'rgba(192,192,192,0.15)'
                : 'rgba(205,127,50,0.15)',
        }}
      >
        {RANK_ICON[rank]}
      </span>
    )
  return (
    <span
      className="hm-mono text-[11px] font-bold w-6 text-center shrink-0"
      style={{ color: 'var(--hm-text-dim)' }}
    >
      #{rank}
    </span>
  )
}

/* tiny avatar colour pool for social-proof stack */
const STACK_COLORS = [AMBER, BLUE, GREEN, TEAL, VIOLET]

/* ─── Comments Modal ────────────────────────────────────── */
function CommentsModal({
  post,
  onClose,
  onLike,
}: {
  post: Post
  onClose: () => void
  onLike: (id: string) => void
}) {
  const [commentText, setCommentText] = useState('')
  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="w-full max-w-[560px] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border-strong)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
          maxHeight: '80vh',
        }}
      >
        {/* Modal header */}
        <div
          className="flex items-center gap-3 px-5 py-3.5 shrink-0"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          {/* Post mini-preview */}
          <div className="relative shrink-0">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full hm-mono text-[10px] font-bold"
              style={{
                background: `${post.color}22`,
                color: post.color,
                border: `1.5px solid ${post.color}45`,
              }}
            >
              {post.avatar}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[13px] font-bold leading-tight truncate"
              style={{ color: 'var(--hm-text)' }}
            >
              {post.name}
            </p>
            <p className="text-[11px] truncate" style={{ color: 'var(--hm-text-dim)' }}>
              {post.text.slice(0, 70)}…
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-dim)',
            }}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-4 px-5 py-2.5 shrink-0"
          style={{
            borderBottom: '1px solid var(--hm-border)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <button
            type="button"
            onClick={() => onLike(post.id)}
            className="flex items-center gap-1.5 text-[12.5px] font-semibold"
            style={{ color: post.liked ? ROSE : 'var(--hm-text-dim)' }}
          >
            <Heart
              className="h-3.5 w-3.5"
              style={{ fill: post.liked ? ROSE : 'none', strokeWidth: 2 }}
            />
            {post.likes} {post.liked ? '(liked)' : 'likes'}
          </button>
          <span
            className="flex items-center gap-1.5 text-[12.5px]"
            style={{ color: 'var(--hm-text-dim)' }}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Comment list */}
        <div
          className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-0.5"
          style={{ scrollbarWidth: 'thin' }}
        >
          {post.comments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <MessageSquare
                className="h-8 w-8 opacity-20"
                style={{ color: 'var(--hm-text-dim)' }}
              />
              <p className="text-[13px]" style={{ color: 'var(--hm-text-dim)' }}>
                No comments yet — be the first!
              </p>
            </div>
          )}
          {post.comments.map((c, i) => (
            <div
              key={c.id}
              className="flex items-start gap-3 py-3 relative"
              style={{
                borderBottom: i < post.comments.length - 1 ? '1px solid var(--hm-border)' : 'none',
              }}
            >
              {/* Thread line */}
              {i < post.comments.length - 1 && (
                <div
                  className="absolute left-4 top-11 bottom-0 w-px"
                  style={{ background: `${VIOLET}18` }}
                />
              )}
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full shrink-0 hm-mono text-[9.5px] font-bold z-10"
                style={{ background: VIOLET_SOFT, color: VIOLET, border: `1px solid ${VIOLET}28` }}
              >
                {c.avatar}
              </span>
              <div className="flex-1 min-w-0">
                <div
                  className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 mb-1.5 inline-block"
                  style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[12.5px] font-bold"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
                    >
                      {c.name}
                    </span>
                    <span className="hm-mono text-[9.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                      {c.time}
                    </span>
                  </div>
                  <p
                    className="text-[12.5px] leading-relaxed"
                    style={{ color: 'var(--hm-text-muted)' }}
                  >
                    {c.text}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 ml-1 text-[11px] font-medium"
                  style={{ color: 'var(--hm-text-dim)' }}
                >
                  <Heart className="h-3 w-3" /> {c.likes} · Reply
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Compose */}
        <div
          className="flex items-center gap-3 px-5 py-3.5 shrink-0"
          style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full shrink-0 hm-mono text-[9.5px] font-bold"
            style={{ background: `${VIOLET}22`, color: VIOLET, border: `1px solid ${VIOLET}35` }}
          >
            JD
          </span>
          <div className="flex-1 relative">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment…"
              className="w-full pl-4 pr-10 h-9 rounded-xl text-[12.5px] outline-none"
              style={{
                background: 'var(--hm-bg-card)',
                border: `1px solid ${commentText ? VIOLET + '55' : 'var(--hm-border)'}`,
                color: 'var(--hm-text)',
              }}
            />
            {commentText && (
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-lg"
                style={{ background: VIOLET }}
              >
                <Send className="h-3 w-3" style={{ color: '#fff' }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Post Card (compact) ───────────────────────────────── */
function PostCard({
  post,
  onLike,
  onOpenComments,
}: {
  post: Post
  onLike: (id: string) => void
  onOpenComments: (id: string) => void
}) {
  const isTrending = post.likes >= 80
  const lvNum = post.role.match(/Lv (\d+)/)?.[1] ?? ''
  const likerInitials = ['CO', 'ML', 'AR', 'DB', 'SN'].slice(
    0,
    Math.min(3, Math.ceil(post.likes / 30))
  )

  return (
    <article
      className="rounded-xl overflow-hidden"
      style={{
        background: 'var(--hm-bg-card)',
        border: '1px solid var(--hm-border)',
        boxShadow: `inset 3px 0 0 ${post.color}, 0 1px 8px rgba(0,0,0,0.14)`,
      }}
    >
      {/* Trending strip */}
      {isTrending && (
        <div
          className="flex items-center gap-2 px-4 py-1.5"
          style={{
            background: `linear-gradient(90deg, ${post.color}18 0%, transparent 65%)`,
            borderBottom: `1px solid ${post.color}1e`,
          }}
        >
          <Zap className="h-2.5 w-2.5 shrink-0" style={{ color: post.color }} />
          <span
            className="hm-mono text-[9px] font-bold tracking-widest"
            style={{ color: post.color }}
          >
            TRENDING IN {post.category.toUpperCase()}
          </span>
          <span className="ml-auto hm-mono text-[9px]" style={{ color: post.color, opacity: 0.65 }}>
            {post.likes} likes
          </span>
        </div>
      )}

      {/* Author header */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <div className="relative shrink-0">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full hm-mono text-[11px] font-bold"
            style={{
              background: `${post.color}1e`,
              color: post.color,
              border: `1.5px solid ${post.color}48`,
              boxShadow: `0 0 0 2.5px ${post.color}10`,
            }}
          >
            {post.avatar}
          </span>
          {lvNum && (
            <span
              className="absolute -bottom-1 -right-1 flex h-[15px] min-w-[15px] px-0.5 items-center justify-center rounded-full hm-mono text-[7px] font-bold leading-none"
              style={{
                background: post.color,
                color: '#fff',
                border: '1.5px solid var(--hm-bg-card)',
              }}
            >
              {lvNum}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="text-[13px] font-bold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
            >
              {post.name}
            </span>
            <span
              className="hm-mono text-[9px] px-1.5 py-[2px] rounded-full font-semibold"
              style={{
                background: `${post.color}16`,
                color: post.color,
                border: `1px solid ${post.color}30`,
                letterSpacing: '0.05em',
              }}
            >
              {post.category.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
              {post.role.replace(/ · Lv \d+/, '')}
            </span>
            <span className="h-2.5 w-px shrink-0" style={{ background: 'var(--hm-border)' }} />
            <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
              {post.time}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
          style={{ color: 'var(--hm-text-dim)' }}
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Body */}
      <p className="px-4 pb-3 text-[13px] leading-[1.65]" style={{ color: 'var(--hm-text-muted)' }}>
        {post.text}
      </p>

      {/* Media */}
      {post.image && (
        <div
          className="mx-4 mb-3 rounded-xl overflow-hidden"
          style={{ border: `1px solid ${post.imageColor}25` }}
        >
          {post.image === 'watercolor' && <WatercolorPlaceholder color={post.imageColor!} />}
          {post.image === 'chart' && <ChartPlaceholder color={post.imageColor!} />}
        </div>
      )}

      {/* Action bar */}
      <div
        className="flex items-center px-3 py-1.5"
        style={{ borderTop: '1px solid var(--hm-border)' }}
      >
        {/* Like */}
        <button
          type="button"
          onClick={() => onLike(post.id)}
          className="flex items-center gap-1.5 px-3 h-7 rounded-lg text-[12px] font-semibold"
          style={{
            background: post.liked ? `${ROSE}12` : 'transparent',
            color: post.liked ? ROSE : 'var(--hm-text-dim)',
            border: post.liked ? `1px solid ${ROSE}25` : '1px solid transparent',
          }}
        >
          <Heart
            className="h-3.5 w-3.5"
            style={{ fill: post.liked ? ROSE : 'none', strokeWidth: 2 }}
          />
          <span>{post.liked ? post.likes : post.likes}</span>
        </button>

        {/* Comment */}
        <button
          type="button"
          onClick={() => onOpenComments(post.id)}
          className="flex items-center gap-1.5 px-3 h-7 rounded-lg text-[12px] font-semibold"
          style={{ color: 'var(--hm-text-dim)' }}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>{post.comments.length}</span>
        </button>

        {/* Social proof */}
        {post.likes > 0 && (
          <div className="flex items-center gap-1.5 ml-1">
            <div className="flex -space-x-1">
              {likerInitials.map((av, i) => (
                <span
                  key={i}
                  className="flex h-4 w-4 items-center justify-center rounded-full hm-mono text-[6.5px] font-bold"
                  style={{
                    background: STACK_COLORS[i],
                    color: '#fff',
                    border: '1.5px solid var(--hm-bg-card)',
                  }}
                >
                  {av}
                </span>
              ))}
            </div>
            <span className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
              {post.liked
                ? 'You + others'
                : `${likerInitials.length > 1 ? `${likerInitials.length} people` : ''}`}
            </span>
          </div>
        )}

        <div className="flex-1" />

        {/* Share */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-2.5 h-7 rounded-lg text-[12px] font-medium"
          style={{ color: 'var(--hm-text-dim)' }}
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  )
}

function StudyGroupCard({ g }: { g: StudyGroup }) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2.5"
      style={{ background: 'var(--hm-bg-card-2)', border: `1px solid var(--hm-border)` }}
    >
      <div className="flex items-start gap-2">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
          style={{ background: `${g.color}18`, color: g.color }}
        >
          <Users className="h-4.5 w-4.5" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p
              className="text-[13px] font-semibold leading-snug"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
            >
              {g.name}
            </p>
            {g.private && (
              <span
                className="hm-mono text-[8px] px-1.5 py-0.5 rounded inline-flex items-center gap-1"
                style={{
                  background: 'rgba(244,178,108,0.14)',
                  color: AMBER,
                  letterSpacing: '0.06em',
                }}
              >
                <Lock className="h-2.5 w-2.5" /> PRIVATE
              </span>
            )}
          </div>
          <p
            className="hm-mono text-[9.5px] mt-0.5"
            style={{ color: g.color, letterSpacing: '0.06em' }}
          >
            {g.category.toUpperCase()}
          </p>
        </div>
      </div>
      <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--hm-text-dim)' }}>
        {g.description}
      </p>
      {/* Members + activity */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1 text-[11px]"
          style={{ color: 'var(--hm-text-dim)' }}
        >
          <Users className="h-3 w-3" /> {g.members}/{g.capacity}
        </div>
        <div
          className="flex-1 h-1 rounded-full overflow-hidden"
          style={{ background: 'var(--hm-bg-card)' }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${(g.members / g.capacity) * 100}%`, background: `${g.color}66` }}
          />
        </div>
        <span className="hm-mono text-[9.5px] font-semibold" style={{ color: g.color }}>
          {g.activity}% active
        </span>
      </div>
      <div className="flex gap-2 mt-0.5">
        {g.joined ? (
          <>
            <button
              type="button"
              className="flex-1 h-7 rounded-lg text-[11.5px] font-semibold"
              style={{
                background: `${g.color}18`,
                color: g.color,
                border: `1px solid ${g.color}30`,
              }}
            >
              Open group
            </button>
            <button
              type="button"
              className="h-7 w-7 flex items-center justify-center rounded-lg"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-dim)',
              }}
            >
              <Settings className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="flex-1 h-7 rounded-lg text-[11.5px] font-semibold"
            style={{ background: VIOLET, color: 'white', boxShadow: `0 4px 12px ${VIOLET}33` }}
          >
            {g.private ? 'Request to join' : 'Join group'}
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── New Post Modal ─────────────────────────────────────── */
function NewPostModal({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('')
  const [cat, setCat] = useState('General')
  const [hasImg, setHasImg] = useState(false)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 px-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="w-full max-w-[580px] rounded-2xl overflow-hidden"
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border-strong)',
          boxShadow: `0 24px 80px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          <div>
            <p
              className="hm-mono text-[9.5px]"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              COMMUNITY
            </p>
            <h3
              className="text-[15px] font-semibold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
            >
              New post
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-dim)',
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-4">
          {/* Author row */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full hm-mono text-[13px] font-semibold shrink-0"
              style={{ background: `${VIOLET}22`, color: VIOLET }}
            >
              JD
            </span>
            <div>
              <p className="text-[13.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Jordan Davis
              </p>
              <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                Posting to Community
              </p>
            </div>
          </div>

          {/* Text area */}
          <textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share something with the community — a tip, question, resource or win… 💡"
            className="w-full px-4 py-3 rounded-xl text-[13.5px] outline-none resize-none mb-4"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text)',
              lineHeight: 1.65,
            }}
          />

          {/* Image attach area */}
          {hasImg ? (
            <div
              className="relative mb-4 h-32 rounded-xl flex flex-col items-center justify-center"
              style={{ background: 'var(--hm-bg-card)', border: `1.5px dashed ${VIOLET}50` }}
            >
              <Camera className="h-7 w-7 mb-2" style={{ color: VIOLET }} />
              <p className="text-[12px] font-medium" style={{ color: VIOLET }}>
                Click to attach image
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                PNG, JPG or GIF up to 10 MB
              </p>
              <button
                type="button"
                onClick={() => setHasImg(false)}
                className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full"
                style={{ background: 'var(--hm-bg-card-2)', color: 'var(--hm-text-dim)' }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : null}

          {/* Category chips */}
          <div className="mb-4">
            <p
              className="hm-mono text-[9.5px] mb-2"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
            >
              CATEGORY
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className="hm-mono px-2.5 h-7 rounded-lg text-[10px] font-semibold"
                  style={{
                    background: cat === c ? VIOLET_SOFT : 'var(--hm-bg-card)',
                    border: `1px solid ${cat === c ? VIOLET + '44' : 'var(--hm-border)'}`,
                    color: cat === c ? VIOLET : 'var(--hm-text-dim)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-2 px-5 py-3.5"
          style={{ borderTop: '1px solid var(--hm-border)' }}
        >
          <button
            type="button"
            onClick={() => setHasImg((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: hasImg ? VIOLET_SOFT : 'var(--hm-bg-card)',
              border: `1px solid ${hasImg ? VIOLET + '44' : 'var(--hm-border)'}`,
              color: hasImg ? VIOLET : 'var(--hm-text-dim)',
            }}
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-dim)',
            }}
          >
            <Smile className="h-4 w-4" />
          </button>
          <div className="flex-1" />
          <span
            className="hm-mono text-[11px]"
            style={{ color: text.length > 400 ? ROSE : 'var(--hm-text-dim)' }}
          >
            {text.length}/500
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-9 rounded-xl text-[13px] font-medium"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-muted)',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 h-9 rounded-xl text-[13px] font-semibold"
            style={{
              background: text.trim()
                ? `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`
                : 'var(--hm-bg-card)',
              color: text.trim() ? 'white' : 'var(--hm-text-dim)',
              boxShadow: text.trim() ? `0 6px 20px ${VIOLET}44` : 'none',
            }}
          >
            <Send className="h-4 w-4" /> Post
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Create Study Group Modal ───────────────────────────── */
function CreateGroupModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [cat, setCat] = useState('General')
  const [priv, setPriv] = useState(false)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 px-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="w-full max-w-[520px] rounded-2xl overflow-hidden"
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border-strong)',
          boxShadow: `0 24px 80px rgba(0,0,0,0.5)`,
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          <div>
            <p
              className="hm-mono text-[9.5px]"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              COMMUNITY
            </p>
            <h3
              className="text-[15px] font-semibold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
            >
              Create study group
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-dim)',
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5 flex flex-col gap-4">
          {/* Group name */}
          <div>
            <label
              className="hm-mono block text-[9.5px] mb-1.5"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
            >
              GROUP NAME *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Watercolour Beginners"
              className="w-full px-3 h-9 rounded-lg text-[13px] outline-none"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label
              className="hm-mono block text-[9.5px] mb-1.5"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
            >
              DESCRIPTION
            </label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What will your group discuss or do together?"
              className="w-full px-3 py-2.5 rounded-lg text-[13px] outline-none resize-none"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label
              className="hm-mono block text-[9.5px] mb-1.5"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
            >
              CATEGORY
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className="hm-mono px-2.5 h-7 rounded-lg text-[10px] font-semibold"
                  style={{
                    background: cat === c ? VIOLET_SOFT : 'var(--hm-bg-card)',
                    border: `1px solid ${cat === c ? VIOLET + '44' : 'var(--hm-border)'}`,
                    color: cat === c ? VIOLET : 'var(--hm-text-dim)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Private toggle */}
          <div
            className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="flex items-center gap-2.5">
              {priv ? (
                <Lock className="h-4 w-4" style={{ color: AMBER }} />
              ) : (
                <Globe className="h-4 w-4" style={{ color: GREEN }} />
              )}
              <div>
                <p className="text-[13px] font-medium" style={{ color: 'var(--hm-text)' }}>
                  {priv ? 'Private group' : 'Public group'}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                  {priv ? 'Members must request to join' : 'Anyone can find and join'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPriv((v) => !v)}
              className="relative h-6 w-11 rounded-full transition-colors shrink-0"
              style={{ background: priv ? AMBER : GREEN, border: 'none' }}
            >
              <span
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all"
                style={{
                  left: priv ? 'calc(100% - 22px)' : '2px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                }}
              />
            </button>
          </div>
        </div>

        <div
          className="flex items-center justify-end gap-3 px-5 py-3.5"
          style={{ borderTop: '1px solid var(--hm-border)' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-9 rounded-xl text-[13px] font-medium"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-muted)',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 h-9 rounded-xl text-[13px] font-semibold"
            style={{
              background: `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`,
              color: 'white',
              boxShadow: `0 6px 20px ${VIOLET}44`,
            }}
          >
            <Users className="h-4 w-4" /> Create group
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────── */
export default function StudentCommunity() {
  const [posts, setPosts] = useState<Post[]>(POSTS)
  const [commentPostId, setCommentPostId] = useState<string | null>(null)
  const [showPost, setShowPost] = useState(false)
  const [showGroup, setShowGroup] = useState(false)
  const [section, setSection] = useState<'feed' | 'leaderboard' | 'groups'>('feed')
  const [feedFilter, setFeedFilter] = useState<'popular' | 'recent' | 'following'>('popular')
  const [catFilter, setCatFilter] = useState('All')
  const [lbTab, setLbTab] = useState<'xp' | 'streak'>('xp')

  function toggleLike(id: string) {
    setPosts((ps) =>
      ps.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    )
  }

  const commentPost = posts.find((p) => p.id === commentPostId) ?? null

  /* ── Section tab definitions ── */
  const SECTIONS = [
    {
      id: 'feed' as const,
      Icon: MessageSquare,
      label: 'Feed',
      sub: '128 posts today',
      color: VIOLET,
      soft: VIOLET_SOFT,
    },
    {
      id: 'leaderboard' as const,
      Icon: Trophy,
      label: 'Leaderboard',
      sub: 'Your rank: #8',
      color: AMBER,
      soft: 'rgba(244,178,108,0.14)',
    },
    {
      id: 'groups' as const,
      Icon: Users,
      label: 'Study Groups',
      sub: '4 groups · 2 joined',
      color: BLUE,
      soft: 'rgba(91,155,213,0.12)',
    },
  ]

  const user = useAuthStore((s) => s.user)
  const Wrapper = user
    ? ({ children }: { children: ReactNode }) => (
        <StudentShell activeTab="community" fullWidth>
          {children}
        </StudentShell>
      )
    : PublicCommunityShell

  return (
    <Wrapper>
      {/* ════════════════════════════════════════════════
          PAGE HEADER
      ════════════════════════════════════════════════ */}
      <div
        className="px-4 sm:px-8 pt-5 sm:pt-6 pb-4 sm:pb-5 flex items-center justify-between gap-3 flex-wrap"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <div>
          <p className="hm-mono text-[10px] mb-1" style={{ color: VIOLET, letterSpacing: '0.2em' }}>
            FORUM
          </p>
          <h1
            className="text-[22px] font-bold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            Community
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {section === 'groups' && (
            <button
              type="button"
              onClick={() => setShowGroup(true)}
              className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl text-[12.5px] font-semibold"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              <Plus className="h-4 w-4" /> New group
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowPost(true)}
            className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl text-[13px] font-semibold"
            style={{
              background: `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`,
              color: 'white',
              boxShadow: `0 6px 20px ${VIOLET}44`,
            }}
          >
            <Plus className="h-4 w-4" /> New post
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          SECTION SWITCHER — compact pill tabs
      ════════════════════════════════════════════════ */}
      <div className="px-4 sm:px-8 pt-4 pb-0">
        <div
          className="inline-flex items-center gap-1 p-1 rounded-xl overflow-x-auto"
          style={{
            background: 'var(--hm-bg-card)',
            border: '1px solid var(--hm-border)',
            scrollbarWidth: 'none',
          }}
        >
          {SECTIONS.map((s) => {
            const active = section === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSection(s.id)}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 h-9 rounded-lg text-[12.5px] font-semibold whitespace-nowrap transition-all shrink-0"
                style={{
                  background: active ? s.soft : 'transparent',
                  color: active ? s.color : 'var(--hm-text-muted)',
                  border: active ? `1px solid ${s.color}44` : '1px solid transparent',
                  boxShadow: active ? `0 2px 10px ${s.color}22` : 'none',
                }}
              >
                <s.Icon className="h-3.5 w-3.5" />
                <span>{s.label}</span>
                <span
                  className="hm-mono text-[9.5px] hidden sm:inline px-1.5 py-0.5 rounded"
                  style={{
                    background: active ? `${s.color}1f` : 'var(--hm-bg-card-2)',
                    color: active ? s.color : 'var(--hm-text-dim)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {s.sub}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          SECTION CONTENT
      ════════════════════════════════════════════════ */}
      <div>
        {/* ────────────────────────────────────────────
            FEED — responsive 2-col (main + sidebar)
        ──────────────────────────────────────────── */}
        {section === 'feed' && (
          <div
            className="px-4 sm:px-8 py-5 grid gap-5 lg:gap-6"
            style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}
          >
            <div className="grid gap-5 lg:gap-6" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
              <div className="grid gap-5 lg:gap-6 lg:[grid-template-columns:3fr_1fr]">
                {/* ── Main column (≈75%) ── */}
                <div className="flex flex-col gap-4 min-w-0 w-full">
                  {/* Sub-controls row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div
                      className="flex items-center gap-1 rounded-xl p-1"
                      style={{
                        background: 'var(--hm-bg-card)',
                        border: '1px solid var(--hm-border)',
                      }}
                    >
                      {(['popular', 'recent', 'following'] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFeedFilter(t)}
                          className="px-3 h-7 rounded-lg text-[12px] font-medium capitalize transition-all"
                          style={{
                            background: feedFilter === t ? VIOLET : 'transparent',
                            color: feedFilter === t ? 'white' : 'var(--hm-text-muted)',
                            boxShadow: feedFilter === t ? `0 2px 8px ${VIOLET}44` : 'none',
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    <div className="flex-1 min-w-[8px]" />

                    <div className="relative">
                      <Search
                        className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: 'var(--hm-text-dim)' }}
                      />
                      <input
                        type="text"
                        placeholder="Search posts…"
                        className="pl-9 pr-3 h-8 rounded-xl text-[12px] outline-none w-36 sm:w-44"
                        style={{
                          background: 'var(--hm-bg-card)',
                          border: '1px solid var(--hm-border)',
                          color: 'var(--hm-text)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Category chips */}
                  <div
                    className="flex gap-1.5 overflow-x-auto pb-0.5"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {['All', ...CATS].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCatFilter(c)}
                        className="hm-mono px-3 h-7 rounded-full text-[9.5px] font-semibold shrink-0 transition-all"
                        style={{
                          background: catFilter === c ? VIOLET_SOFT : 'var(--hm-bg-card)',
                          border: `1px solid ${catFilter === c ? VIOLET + '44' : 'var(--hm-border)'}`,
                          color: catFilter === c ? VIOLET : 'var(--hm-text-dim)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {c.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Posts */}
                  <div className="flex flex-col gap-3">
                    {posts
                      .filter((p) => catFilter === 'All' || p.category === catFilter)
                      .map((p) => (
                        <PostCard
                          key={p.id}
                          post={p}
                          onLike={toggleLike}
                          onOpenComments={(id) => setCommentPostId(id)}
                        />
                      ))}
                  </div>
                </div>

                {/* ── Sidebar (hidden on small screens) ── */}
                <aside className="hidden lg:flex flex-col gap-4 min-w-0">
                  {/* Mini leaderboard */}
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background: 'var(--hm-bg-card)',
                      border: '1px solid var(--hm-border)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p
                        className="hm-mono text-[9.5px] font-bold"
                        style={{ color: AMBER, letterSpacing: '0.18em' }}
                      >
                        TOP THIS WEEK
                      </p>
                      <button
                        type="button"
                        onClick={() => setSection('leaderboard')}
                        className="text-[11px] font-semibold"
                        style={{ color: VIOLET, background: 'transparent', border: 'none' }}
                      >
                        View all →
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {LEADERS.slice(0, 5).map((u) => (
                        <div key={u.rank} className="flex items-center gap-2.5">
                          <span
                            className="hm-mono text-[10.5px] font-bold w-4 text-center"
                            style={{ color: u.rank <= 3 ? AMBER : 'var(--hm-text-dim)' }}
                          >
                            {u.rank}
                          </span>
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-full hm-mono text-[9px] font-bold shrink-0"
                            style={{
                              background: `${u.color}22`,
                              color: u.color,
                              border: `1px solid ${u.color}40`,
                            }}
                          >
                            {u.avatar}
                          </span>
                          <span
                            className="flex-1 min-w-0 text-[12px] font-medium truncate"
                            style={{ color: 'var(--hm-text)' }}
                          >
                            {u.name}
                          </span>
                          <span
                            className="hm-mono text-[10.5px] font-bold"
                            style={{ color: u.color }}
                          >
                            {(u.xp / 1000).toFixed(1)}k
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested groups */}
                  <div
                    className="rounded-2xl p-4"
                    style={{
                      background: 'var(--hm-bg-card)',
                      border: '1px solid var(--hm-border)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p
                        className="hm-mono text-[9.5px] font-bold"
                        style={{ color: BLUE, letterSpacing: '0.18em' }}
                      >
                        JOIN A GROUP
                      </p>
                      <button
                        type="button"
                        onClick={() => setSection('groups')}
                        className="text-[11px] font-semibold"
                        style={{ color: VIOLET, background: 'transparent', border: 'none' }}
                      >
                        Browse →
                      </button>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {GROUPS.slice(0, 3).map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setSection('groups')}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-colors"
                          style={{
                            background: 'var(--hm-bg-card-2)',
                            border: '1px solid var(--hm-border)',
                          }}
                        >
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                            style={{
                              background: `${g.color}22`,
                              color: g.color,
                              border: `1px solid ${g.color}40`,
                            }}
                          >
                            <Users className="h-3.5 w-3.5" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-[12.5px] font-semibold truncate"
                              style={{ color: 'var(--hm-text)' }}
                            >
                              {g.name}
                            </p>
                            <p
                              className="hm-mono text-[9.5px] mt-0.5"
                              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.04em' }}
                            >
                              {g.members} members · {g.activity}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Community pulse stat */}
                  <div
                    className="rounded-2xl p-4 relative overflow-hidden"
                    style={{ background: VIOLET_SOFT, border: `1px solid ${VIOLET}33` }}
                  >
                    <div
                      aria-hidden
                      className="absolute -top-8 -right-8 h-24 w-24 rounded-full pointer-events-none"
                      style={{ background: VIOLET, opacity: 0.2, filter: 'blur(28px)' }}
                    />
                    <p
                      className="hm-mono text-[9.5px] font-bold mb-2"
                      style={{ color: VIOLET, letterSpacing: '0.18em' }}
                    >
                      COMMUNITY PULSE
                    </p>
                    <div className="grid grid-cols-2 gap-3 relative">
                      <div>
                        <p
                          className="hm-mono text-[18px] font-extrabold leading-none"
                          style={{ color: 'var(--hm-text)' }}
                        >
                          128
                        </p>
                        <p className="text-[10.5px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
                          posts today
                        </p>
                      </div>
                      <div>
                        <p
                          className="hm-mono text-[18px] font-extrabold leading-none"
                          style={{ color: 'var(--hm-text)' }}
                        >
                          1.2k
                        </p>
                        <p className="text-[10.5px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
                          active learners
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────
            LEADERBOARD
        ──────────────────────────────────────────── */}
        {section === 'leaderboard' && (
          <div className="px-4 sm:px-8 py-5 sm:py-6 flex flex-col gap-5 sm:gap-6 max-w-[820px] mx-auto">
            {/* XP / Streak toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="hm-mono text-[9.5px] mb-0.5"
                  style={{ color: AMBER, letterSpacing: '0.18em' }}
                >
                  WEEKLY RANKINGS
                </p>
                <h2
                  className="text-[18px] font-bold"
                  style={{ color: 'var(--hm-text)', letterSpacing: '-0.018em' }}
                >
                  {lbTab === 'xp' ? 'Top Earners by XP' : 'Top Streaks this week'}
                </h2>
              </div>
              <div
                className="flex items-center gap-1 rounded-xl p-1"
                style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
              >
                {(['xp', 'streak'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setLbTab(t)}
                    className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-semibold transition-all"
                    style={{
                      background:
                        lbTab === t ? `linear-gradient(135deg, ${AMBER}, #F4D35E)` : 'transparent',
                      color: lbTab === t ? '#1a1208' : 'var(--hm-text-muted)',
                      boxShadow: lbTab === t ? `0 4px 12px ${AMBER}44` : 'none',
                    }}
                  >
                    {t === 'xp' ? (
                      <>
                        <Zap className="h-3.5 w-3.5" /> XP
                      </>
                    ) : (
                      <>🔥 Streak</>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Podium — top 3 */}
            <div className="grid grid-cols-3 gap-3 items-end">
              {/* 2nd */}
              {[LEADERS[1], LEADERS[0], LEADERS[2]].map((u, pos) => {
                const isFirst = pos === 1
                const rankNum = isFirst ? 1 : pos === 0 ? 2 : 3
                const podiumH = isFirst ? 100 : pos === 0 ? 72 : 56
                return (
                  <div key={u.rank} className="flex flex-col items-center gap-3">
                    {/* Avatar + name */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative">
                        <span
                          className="flex items-center justify-center rounded-full hm-mono font-bold"
                          style={{
                            width: isFirst ? 60 : 48,
                            height: isFirst ? 60 : 48,
                            fontSize: isFirst ? 16 : 13,
                            background: `${u.color}22`,
                            color: u.color,
                            border: `2px solid ${u.color}55`,
                            boxShadow: isFirst
                              ? `0 0 0 4px ${u.color}18, 0 8px 24px ${u.color}33`
                              : `0 0 0 3px ${u.color}14`,
                          }}
                        >
                          {u.avatar}
                        </span>
                        <span
                          className="absolute -top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px]"
                          style={{
                            background:
                              rankNum === 1
                                ? 'rgba(244,211,94,0.2)'
                                : rankNum === 2
                                  ? 'rgba(192,192,192,0.2)'
                                  : 'rgba(205,127,50,0.2)',
                          }}
                        >
                          {RANK_ICON[rankNum]}
                        </span>
                      </div>
                      <div className="text-center">
                        <p
                          className="text-[13px] font-semibold"
                          style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
                        >
                          {u.name}
                        </p>
                        <p
                          className="hm-mono text-[11px] font-bold mt-0.5"
                          style={{ color: u.color }}
                        >
                          {lbTab === 'xp'
                            ? `${(u.xp / 1000).toFixed(1)}k XP`
                            : u.streak
                              ? `${u.streak} 🔥`
                              : '—'}
                        </p>
                      </div>
                    </div>
                    {/* Podium bar */}
                    <div
                      className="w-full rounded-t-xl flex items-center justify-center"
                      style={{
                        height: podiumH,
                        background: `linear-gradient(180deg, ${u.color}30, ${u.color}12)`,
                        border: `1px solid ${u.color}33`,
                        borderBottom: 'none',
                      }}
                    >
                      <span
                        className="hm-mono text-[20px] font-black"
                        style={{ color: `${u.color}55` }}
                      >
                        #{rankNum}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* My rank highlight */}
            <div
              className="rounded-2xl px-5 py-3.5 flex items-center gap-4"
              style={{ background: VIOLET_SOFT, border: `1.5px solid ${VIOLET}44` }}
            >
              <span className="hm-mono text-[13px] font-black" style={{ color: VIOLET }}>
                #8
              </span>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full hm-mono text-[10px] font-bold shrink-0"
                style={{ background: `${VIOLET}28`, color: VIOLET }}
              >
                JD
              </span>
              <span className="flex-1 text-[13.5px] font-semibold" style={{ color: VIOLET }}>
                You — Jordan Davis
              </span>
              <span className="hm-mono text-[13px] font-bold" style={{ color: VIOLET }}>
                {lbTab === 'xp' ? '3,870 XP' : '12 🔥'}
              </span>
              <span
                className="hm-mono text-[10px] px-2.5 py-1 rounded-lg"
                style={{ background: `${VIOLET}22`, color: VIOLET }}
              >
                Lv 5
              </span>
            </div>

            {/* Full ranked list (4-10) */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              {LEADERS.slice(3).map((u, i) => {
                const isMe = u.rank === 8
                return (
                  <div
                    key={u.rank}
                    className="flex items-center gap-4 px-5 py-3"
                    style={{
                      borderTop: i > 0 ? '1px solid var(--hm-border)' : 'none',
                      background: isMe ? VIOLET_SOFT : 'transparent',
                    }}
                  >
                    <RankBadge rank={u.rank} />
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full hm-mono text-[10px] font-bold shrink-0"
                      style={{
                        background: `${u.color}20`,
                        color: u.color,
                        border: `1.5px solid ${u.color}40`,
                      }}
                    >
                      {u.avatar}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[13px] font-medium"
                        style={{
                          color: isMe ? VIOLET : 'var(--hm-text)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {u.name}
                        {isMe ? ' (you)' : ''}
                      </p>
                      {lbTab === 'xp' && (
                        <div
                          className="mt-1 h-1 rounded-full overflow-hidden"
                          style={{ background: 'var(--hm-bg-card-2)' }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(u.xp / MAX_XP) * 100}%`,
                              background: `${u.color}77`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <span
                      className="hm-mono text-[12px] font-bold shrink-0"
                      style={{ color: isMe ? VIOLET : 'var(--hm-text-muted)' }}
                    >
                      {lbTab === 'xp'
                        ? `${(u.xp / 1000).toFixed(1)}k XP`
                        : u.streak
                          ? `${u.streak} 🔥`
                          : '—'}
                    </span>
                    <span
                      className="hm-mono text-[10px] px-2 py-0.5 rounded-lg shrink-0"
                      style={{ background: 'var(--hm-bg-card-2)', color: 'var(--hm-text-dim)' }}
                    >
                      Lv {u.level}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────
            STUDY GROUPS
        ──────────────────────────────────────────── */}
        {section === 'groups' && (
          <div className="px-4 sm:px-8 py-5 sm:py-6 flex flex-col gap-5 max-w-[820px] mx-auto">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="hm-mono text-[9.5px] mb-0.5"
                  style={{ color: BLUE, letterSpacing: '0.18em' }}
                >
                  YOUR GROUPS
                </p>
                <h2
                  className="text-[18px] font-bold"
                  style={{ color: 'var(--hm-text)', letterSpacing: '-0.018em' }}
                >
                  Study Groups
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowGroup(true)}
                className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl text-[12.5px] font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${BLUE}, #60A5FA)`,
                  color: 'white',
                  boxShadow: `0 6px 20px ${BLUE}44`,
                }}
              >
                <Plus className="h-4 w-4" /> Create group
              </button>
            </div>

            {/* Joined groups banner */}
            <div
              className="rounded-2xl px-5 py-4 flex items-center gap-5"
              style={{
                background: `linear-gradient(135deg, ${BLUE}10, ${VIOLET}08)`,
                border: `1px solid ${BLUE}28`,
              }}
            >
              <div className="flex -space-x-2">
                {GROUPS.filter((g) => g.joined).map((g) => (
                  <span
                    key={g.id}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-[11px] font-bold"
                    style={{
                      background: `${g.color}22`,
                      color: g.color,
                      border: `2px solid var(--hm-bg-elev)`,
                    }}
                  >
                    <Users className="h-4 w-4" />
                  </span>
                ))}
              </div>
              <div>
                <p className="text-[13.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  You're in {GROUPS.filter((g) => g.joined).length} groups
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                  {GROUPS.filter((g) => g.joined)
                    .map((g) => g.name)
                    .join(' · ')}
                </p>
              </div>
            </div>

            {/* 2-column grid */}
            <div className="grid grid-cols-2 gap-4">
              {GROUPS.map((g) => (
                <StudyGroupCard key={g.id} g={g} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {commentPost && (
        <CommentsModal
          post={commentPost}
          onClose={() => setCommentPostId(null)}
          onLike={toggleLike}
        />
      )}
      {showPost && <NewPostModal onClose={() => setShowPost(false)} />}
      {showGroup && <CreateGroupModal onClose={() => setShowGroup(false)} />}
    </Wrapper>
  )
}
