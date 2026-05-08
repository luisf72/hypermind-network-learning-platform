import { useState } from 'react'
import {
  Bell,
  BookOpen,
  GraduationCap,
  Trophy,
  MessageSquare,
  UserPlus,
  Settings,
  CheckCheck,
  Check,
  ChevronRight,
  Zap,
  Star,
  Clock,
  AlertCircle,
  Gift,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, GREEN, AMBER, BLUE } from './StudentShell'

const ROSE = '#F4636E'
const TEAL = '#5BC8C5'

/* ─── Types ─────────────────────────────────────────────── */
type NotifKind =
  | 'course'
  | 'assessment'
  | 'achievement'
  | 'community'
  | 'friend'
  | 'system'
  | 'enrollment'
  | 'reward'

interface Notif {
  id: string
  kind: NotifKind
  title: string
  body: string
  time: string
  read: boolean
  avatar?: string
  avatarColor?: string
}

/* ─── Initial batch ─────────────────────────────────────── */
const BATCH1: Notif[] = [
  {
    id: 'n01',
    kind: 'community',
    read: false,
    time: '2 min ago',
    title: 'Camila replied to your comment',
    body: '"Yes! That 30-second pre-wet wait is absolutely the key. I also found that Arches 300gsm paper makes a huge difference…"',
    avatar: 'CO',
    avatarColor: AMBER,
  },
  {
    id: 'n02',
    kind: 'assessment',
    read: false,
    time: '18 min ago',
    title: 'Assessment due in 24 hours',
    body: 'Watercolor Foundations — Final Assessment is due tomorrow at 23:59 UTC. You have 2 attempts remaining.',
    avatarColor: AMBER,
  },
  {
    id: 'n03',
    kind: 'achievement',
    read: false,
    time: '1h ago',
    title: 'Achievement unlocked: 🔥 21-Day Streak!',
    body: "You've studied for 21 consecutive days. Keep it going to earn the 30-Day Blazer badge.",
    avatarColor: VIOLET,
  },
  {
    id: 'n04',
    kind: 'course',
    read: false,
    time: '2h ago',
    title: 'New lesson available: Module 4',
    body: '"Advanced Glazing Techniques" has been added to Watercolor Foundations. 28 min · Video + Reading.',
    avatarColor: VIOLET,
  },
  {
    id: 'n05',
    kind: 'friend',
    read: false,
    time: '3h ago',
    title: "Friend request from Liam O'Brien",
    body: "Liam is enrolled in Spanish Travelers and 2 other courses you're taking.",
    avatar: 'LO',
    avatarColor: BLUE,
  },
  {
    id: 'n06',
    kind: 'enrollment',
    read: true,
    time: '5h ago',
    title: 'You enrolled in Personal Finance 101',
    body: 'Course starts automatically. Module 1 is already unlocked — 6 lessons, 42 min.',
    avatarColor: GREEN,
  },
  {
    id: 'n07',
    kind: 'community',
    read: true,
    time: '8h ago',
    title: 'Aisha Rahman liked your post',
    body: 'Your post about compound-interest visualisers received 14 likes from the Finance community.',
    avatar: 'AR',
    avatarColor: BLUE,
  },
  {
    id: 'n08',
    kind: 'system',
    read: true,
    time: '1d ago',
    title: 'Scheduled maintenance — May 5 at 02:00 UTC',
    body: 'HyperMind will be unavailable for approx. 30 min during the maintenance window.',
    avatarColor: ROSE,
  },
  {
    id: 'n09',
    kind: 'reward',
    read: true,
    time: '1d ago',
    title: 'You earned 120 XP',
    body: "Completed 3 lessons in Watercolor Foundations. Lifetime XP: 3,870. You're #8 on the leaderboard.",
    avatarColor: AMBER,
  },
  {
    id: 'n10',
    kind: 'assessment',
    read: true,
    time: '2d ago',
    title: 'Assessment result: 88%',
    body: 'You passed the Color Theory Quiz with 88% (pass ≥ 70%). Certificate generated.',
    avatarColor: GREEN,
  },
]

const BATCH2: Notif[] = [
  {
    id: 'n11',
    kind: 'course',
    read: true,
    time: '2d ago',
    title: 'Live session starting in 30 min',
    body: 'Advanced Glazing Techniques — live session with Sarah Lin begins at 15:00 UTC.',
    avatarColor: VIOLET,
  },
  {
    id: 'n12',
    kind: 'friend',
    read: true,
    time: '3d ago',
    title: 'Sofia Navarro accepted your request',
    body: 'You and Sofia are now connected. Start a conversation or check out her study groups.',
    avatar: 'SN',
    avatarColor: BLUE,
  },
  {
    id: 'n13',
    kind: 'community',
    read: true,
    time: '3d ago',
    title: 'New post in Watercolour Sundays',
    body: 'Camila shared her weekly painting challenge — 6 people have already replied.',
    avatar: 'CO',
    avatarColor: AMBER,
  },
  {
    id: 'n14',
    kind: 'enrollment',
    read: true,
    time: '4d ago',
    title: 'Certificate issued: Color Theory Basics',
    body: 'Your verifiable certificate is ready to download and share on LinkedIn.',
    avatarColor: GREEN,
  },
  {
    id: 'n15',
    kind: 'reward',
    read: true,
    time: '5d ago',
    title: 'Weekly XP bonus: +50 XP',
    body: 'You hit your weekly study goal of 3 hours. Weekly XP totals: 480. Keep the streak alive!',
    avatarColor: AMBER,
  },
]

const BATCH3: Notif[] = [
  {
    id: 'n16',
    kind: 'system',
    read: true,
    time: '6d ago',
    title: 'Profile 100% complete',
    body: 'You filled in all profile fields. Bonus: your profile is now highlighted in study group searches.',
    avatarColor: VIOLET,
  },
  {
    id: 'n17',
    kind: 'assessment',
    read: true,
    time: '6d ago',
    title: 'Reminder: 3 assessments not started',
    body: 'Grammar Fundamentals · Fingerpicking Basics · Budget Planning Quiz — all expire in 14 days.',
    avatarColor: ROSE,
  },
  {
    id: 'n18',
    kind: 'community',
    read: true,
    time: '1w ago',
    title: 'You were mentioned by Daniel Becker',
    body: '"@Jordan — your F-chord tip about rolling the index finger actually worked, thank you!"',
    avatar: 'DB',
    avatarColor: TEAL,
  },
  {
    id: 'n19',
    kind: 'course',
    read: true,
    time: '1w ago',
    title: 'Course updated: Spanish Travelers',
    body: 'Liam added 2 new lessons to Module 3 and updated the pronunciation guide audio files.',
    avatarColor: BLUE,
  },
  {
    id: 'n20',
    kind: 'reward',
    read: true,
    time: '1w ago',
    title: 'Referral bonus: +200 XP',
    body: 'Your referral link was used by a new learner. You earned a one-time 200 XP referral reward.',
    avatarColor: AMBER,
  },
]

/* ─── Config ─────────────────────────────────────────────── */
const KIND_META: Record<NotifKind, { icon: React.FC<any>; color: string; label: string }> = {
  course: { icon: BookOpen, color: VIOLET, label: 'Course' },
  assessment: { icon: GraduationCap, color: AMBER, label: 'Assessment' },
  achievement: { icon: Trophy, color: AMBER, label: 'Achievement' },
  community: { icon: MessageSquare, color: BLUE, label: 'Community' },
  friend: { icon: UserPlus, color: TEAL, label: 'Friend' },
  system: { icon: AlertCircle, color: ROSE, label: 'System' },
  enrollment: { icon: Check, color: GREEN, label: 'Enrollment' },
  reward: { icon: Zap, color: AMBER, label: 'Reward' },
}

const FILTERS = ['All', 'Courses', 'Assessments', 'Community', 'Friends', 'System'] as const
type Filter = (typeof FILTERS)[number]

function matchesFilter(n: Notif, f: Filter): boolean {
  if (f === 'All') return true
  const map: Record<Filter, NotifKind[]> = {
    All: [],
    Courses: ['course', 'enrollment'],
    Assessments: ['assessment'],
    Community: ['community'],
    Friends: ['friend'],
    System: ['system', 'reward', 'achievement'],
  }
  return map[f].includes(n.kind)
}

/* ─── Notification row ──────────────────────────────────── */
function NotifRow({ n, onRead }: { n: Notif; onRead: (id: string) => void }) {
  const meta = KIND_META[n.kind]
  const Icon = meta.icon

  return (
    <div
      className="flex items-start gap-4 px-5 py-4 group transition-colors"
      style={{
        background: n.read ? 'transparent' : `${meta.color}08`,
        borderBottom: '1px solid var(--hm-border)',
        cursor: 'default',
      }}
    >
      {/* Unread dot */}
      <div className="flex flex-col items-center pt-1.5 w-2.5 shrink-0">
        {!n.read && (
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: VIOLET, boxShadow: `0 0 6px ${VIOLET}66` }}
          />
        )}
      </div>

      {/* Icon or avatar */}
      {n.avatar ? (
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full shrink-0 hm-mono text-[11px] font-semibold"
          style={{ background: `${n.avatarColor}20`, color: n.avatarColor }}
        >
          {n.avatar}
        </span>
      ) : (
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
          style={{ background: `${meta.color}18`, color: meta.color }}
        >
          <Icon className="h-5 w-5" />
        </span>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p
              className="text-[13.5px] font-semibold leading-snug"
              style={{
                color: n.read ? 'var(--hm-text-muted)' : 'var(--hm-text)',
                letterSpacing: '-0.01em',
              }}
            >
              {n.title}
            </p>
            <p
              className="text-[12.5px] leading-relaxed mt-1"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              {n.body}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="hm-mono text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
              {n.time}
            </span>
            {!n.read && (
              <button
                type="button"
                onClick={() => onRead(n.id)}
                className="hm-mono text-[9px] px-2 h-5 rounded flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: VIOLET_SOFT,
                  color: VIOLET,
                  border: `1px solid ${VIOLET}30`,
                  letterSpacing: '0.06em',
                }}
              >
                <Check className="h-2.5 w-2.5" /> MARK READ
              </button>
            )}
          </div>
        </div>
        {/* Kind chip */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <span
            className="hm-mono text-[9px] px-2 py-0.5 rounded"
            style={{ background: `${meta.color}14`, color: meta.color, letterSpacing: '0.08em' }}
          >
            {meta.label.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────── */
export default function StudentNotifications() {
  const [allNotifs, setAllNotifs] = useState<Notif[]>(BATCH1)
  const [filter, setFilter] = useState<Filter>('All')
  const [loading, setLoading] = useState(false)
  const [batches, setBatches] = useState(1)

  const unreadCount = allNotifs.filter((n) => !n.read).length

  function markRead(id: string) {
    setAllNotifs((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }
  function markAllRead() {
    setAllNotifs((ns) => ns.map((n) => ({ ...n, read: true })))
  }
  function loadMore() {
    setLoading(true)
    setTimeout(() => {
      const next = batches === 1 ? BATCH2 : BATCH3
      setAllNotifs((prev) => [...prev, ...next])
      setBatches((b) => b + 1)
      setLoading(false)
    }, 800)
  }

  const visible = allNotifs.filter((n) => matchesFilter(n, filter))
  const hasMore = batches < 3

  return (
    <StudentShell activeTab={null}>
      {/* Header */}
      <div
        className="px-6 pt-6 pb-4 flex items-start justify-between gap-4"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <div>
          <p className="hm-mono text-[10px] mb-1" style={{ color: VIOLET, letterSpacing: '0.2em' }}>
            ACTIVITY
          </p>
          <div className="flex items-center gap-3">
            <h1
              className="text-[22px] font-bold tracking-tight"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
            >
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span
                className="hm-mono text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: `${ROSE}18`, color: ROSE, letterSpacing: '0.08em' }}
              >
                {unreadCount} UNREAD
              </span>
            )}
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl text-[12.5px] font-semibold"
            style={{ background: VIOLET_SOFT, color: VIOLET, border: `1px solid ${VIOLET}35` }}
          >
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </button>
        )}
        {unreadCount === 0 && (
          <div
            className="inline-flex items-center gap-1.5 px-3 h-8 rounded-xl text-[11.5px] font-medium"
            style={{
              background: 'var(--hm-bg-card)',
              border: '1px solid var(--hm-border)',
              color: GREEN,
            }}
          >
            <CheckCheck className="h-3.5 w-3.5" /> All caught up
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 py-5">
        {/* Filter chips */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="px-3.5 h-8 rounded-lg text-[12.5px] font-medium"
              style={{
                background: filter === f ? VIOLET_SOFT : 'var(--hm-bg-card)',
                border: `1px solid ${filter === f ? VIOLET + '40' : 'var(--hm-border)'}`,
                color: filter === f ? VIOLET : 'var(--hm-text-muted)',
              }}
            >
              {f}
            </button>
          ))}
          <span className="hm-mono text-[10.5px] ml-auto" style={{ color: 'var(--hm-text-dim)' }}>
            {visible.length} notification{visible.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Notification list */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Bell className="h-10 w-10 mb-3 opacity-30" style={{ color: 'var(--hm-text-dim)' }} />
              <p className="text-[14px] font-medium" style={{ color: 'var(--hm-text-dim)' }}>
                No notifications here
              </p>
            </div>
          ) : (
            visible.map((n) => <NotifRow key={n.id} n={n} onRead={markRead} />)
          )}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 h-10 rounded-xl text-[13px] font-semibold transition-all"
              style={{
                background: loading ? 'var(--hm-bg-card)' : VIOLET_SOFT,
                border: `1px solid ${VIOLET}35`,
                color: loading ? 'var(--hm-text-dim)' : VIOLET,
                cursor: loading ? 'default' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <span
                    className="h-4 w-4 rounded-full border-2 animate-spin"
                    style={{ borderColor: `${VIOLET}33`, borderTopColor: VIOLET }}
                  />
                  Loading…
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4" />
                  Load more notifications
                  <span
                    className="hm-mono text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: `${VIOLET}20`, letterSpacing: '0.05em' }}
                  >
                    +{batches === 1 ? 5 : batches === 2 ? 5 : 0}
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {!hasMore && allNotifs.length > 0 && (
          <p
            className="text-center hm-mono text-[10.5px] mt-6 pb-4"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
          >
            — YOU'VE SEEN ALL {allNotifs.length} NOTIFICATIONS —
          </p>
        )}
      </div>
    </StudentShell>
  )
}
