import { useState } from 'react'
import {
  Search,
  Send,
  Check,
  X,
  UserMinus,
  UserPlus,
  Phone,
  Video,
  MoreHorizontal,
  Smile,
  Paperclip,
  ChevronLeft,
  Circle,
  ImageIcon,
  Mic,
  Clock,
  BookOpen,
  CheckCheck,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, GREEN, AMBER, BLUE } from './StudentShell'

const ROSE = '#F4636E'
const TEAL = '#5BC8C5'

/* ─── Friend Request data ───────────────────────────────── */
interface FriendReq {
  id: string
  avatar: string
  name: string
  role: string
  color: string
  mutual: string
  time: string
  status?: 'pending'
}
const RECEIVED_REQS: FriendReq[] = [
  {
    id: 'fr1',
    avatar: 'LO',
    name: "Liam O'Brien",
    role: 'Languages · Lv 9',
    color: BLUE,
    mutual: 'Spanish Travelers + 2 others',
    time: '3h ago',
  },
  {
    id: 'fr2',
    avatar: 'DB',
    name: 'Daniel Becker',
    role: 'Music · Lv 7',
    color: TEAL,
    mutual: 'Guitar Foundations',
    time: '1d ago',
  },
  {
    id: 'fr3',
    avatar: 'PK',
    name: 'Priya Kumar',
    role: 'Finance · Lv 4',
    color: GREEN,
    mutual: 'Personal Finance 101',
    time: '2d ago',
  },
]
const SENT_REQS: FriendReq[] = [
  {
    id: 'fs1',
    avatar: 'JK',
    name: 'Jamie Kowalski',
    role: 'UX Design · Lv 6',
    color: VIOLET,
    mutual: 'Community member',
    time: '6h ago',
    status: 'pending',
  },
  {
    id: 'fs2',
    avatar: 'TH',
    name: 'Tom Hale',
    role: 'Tech · Lv 5',
    color: BLUE,
    mutual: 'Python Essentials',
    time: '3d ago',
    status: 'pending',
  },
]

/* ─── Chat data ─────────────────────────────────────────── */
interface ChatThread {
  id: string
  avatar: string
  name: string
  color: string
  online: boolean
  lastMsg: string
  lastTime: string
  unread: number
  course?: string
}
const THREADS: ChatThread[] = [
  {
    id: 't1',
    avatar: 'CO',
    name: 'Camila Ortega',
    color: AMBER,
    online: true,
    lastMsg: 'Yes! That 30-second wait is the key 🎨',
    lastTime: '12m',
    unread: 2,
    course: 'Watercolor Foundations',
  },
  {
    id: 't2',
    avatar: 'AR',
    name: 'Aisha Rahman',
    color: BLUE,
    online: true,
    lastMsg: "I'll send the Google Sheet link shortly",
    lastTime: '1h',
    unread: 0,
    course: 'Personal Finance 101',
  },
  {
    id: 't3',
    avatar: 'SN',
    name: 'Sofia Navarro',
    color: VIOLET,
    online: false,
    lastMsg: 'Thanks for the F-chord tip, it clicked!',
    lastTime: '3h',
    unread: 0,
    course: 'Guitar Foundations',
  },
  {
    id: 't4',
    avatar: 'ML',
    name: 'Mei Lin',
    color: AMBER,
    online: true,
    lastMsg: "Are you joining Sunday's painting session?",
    lastTime: '1d',
    unread: 1,
    course: 'Watercolor Foundations',
  },
  {
    id: 't5',
    avatar: 'JD',
    name: 'Jordan Davis',
    color: VIOLET,
    online: true,
    lastMsg: 'You: Looking forward to it 🔥',
    lastTime: '2d',
    unread: 0,
  },
]

/* ─── Messages per conversation ────────────────────────── */
type MsgKind = 'text' | 'image'
interface Msg {
  id: string
  from: 'me' | 'them'
  text: string
  time: string
  read?: boolean
  kind?: MsgKind
}

const CONVERSATIONS: Record<string, Msg[]> = {
  t1: [
    {
      id: 'm1',
      from: 'them',
      time: '10:05 AM',
      text: 'Hey Jordan! I saw your comment on the wet-on-wet post 👋',
    },
    {
      id: 'm2',
      from: 'me',
      time: '10:07 AM',
      text: "Hi Camila! Yes, I've been struggling with that technique for weeks.",
      read: true,
    },
    {
      id: 'm3',
      from: 'them',
      time: '10:08 AM',
      text: 'The biggest thing that helped me was pre-wetting the paper with clean water first. Not too wet though — press a dry hand against it and it should feel just slightly cool.',
    },
    {
      id: 'm4',
      from: 'them',
      time: '10:09 AM',
      text: "Also try Arches 300gsm if you haven't already. It holds moisture so much better than student-grade paper.",
    },
    {
      id: 'm5',
      from: 'me',
      time: '10:12 AM',
      text: "Oh wow, I've only been using cheap paper from the art store. That might be the whole problem 😅",
      read: true,
    },
    {
      id: 'm6',
      from: 'them',
      time: '10:13 AM',
      text: 'Probably! Cheap paper warps immediately and kills the wet-on-wet effect. The investment in good paper is worth it.',
    },
    {
      id: 'm7',
      from: 'me',
      time: '10:15 AM',
      text: 'Thanks so much! Going to grab some Arches this weekend and try again.',
      read: true,
    },
    {
      id: 'm8',
      from: 'them',
      time: '10:16 AM',
      text: 'Let me know how it goes! And join our Watercolour Sundays group — we do a live critique every Sunday at 14:00 UTC, it really accelerates improvement.',
    },
    { id: 'm9', from: 'them', time: '10:18 AM', text: 'Yes! That 30-second wait is the key 🎨' },
    {
      id: 'm10',
      from: 'them',
      time: '10:18 AM',
      text: 'Also — have you tried the wet brush technique in Module 3? Sarah covers it really well there.',
    },
  ],
  t2: [
    {
      id: 'm1',
      from: 'me',
      time: '9:00 AM',
      text: 'Hi Aisha! Loved your compound interest visualiser post in the community.',
      read: true,
    },
    {
      id: 'm2',
      from: 'them',
      time: '9:04 AM',
      text: "Thank you Jordan! It took me a while to build but Dana's Module 3 examples made it click.",
    },
    {
      id: 'm3',
      from: 'me',
      time: '9:05 AM',
      text: "Would you be able to share the Google Sheet? I'm trying to build something similar for my own budgeting.",
      read: true,
    },
    {
      id: 'm4',
      from: 'them',
      time: '9:07 AM',
      text: "Of course! I'll clean it up a bit first and send you the link. Give me about an hour.",
    },
    { id: 'm5', from: 'me', time: '9:08 AM', text: 'No rush at all, thank you! 🙏', read: true },
    { id: 'm6', from: 'them', time: '10:02 AM', text: "I'll send the Google Sheet link shortly" },
  ],
  t3: [
    {
      id: 'm1',
      from: 'them',
      time: 'Yesterday',
      text: 'Hey! I saw your post about the F barre chord. Did rolling the finger toward the headstock actually work for you?',
    },
    {
      id: 'm2',
      from: 'me',
      time: 'Yesterday',
      text: 'Honestly it took a few sessions but yes! The tip about rolling slightly forward is real.',
      read: true,
    },
    {
      id: 'm3',
      from: 'them',
      time: 'Yesterday',
      text: "I've been stuck on F for 2 months 😭 which fret position do you usually practice at?",
    },
    {
      id: 'm4',
      from: 'me',
      time: 'Yesterday',
      text: 'I started at fret 3 (G chord shape) and worked down. Way less tension. Then once it felt clean I moved to fret 1.',
      read: true,
    },
    {
      id: 'm5',
      from: 'them',
      time: 'Yesterday',
      text: "Oh that's smart! Starting lower on the neck with less tension. I'll try that today.",
    },
    { id: 'm6', from: 'them', time: '2h ago', text: 'Thanks for the F-chord tip, it clicked!' },
  ],
  t4: [
    {
      id: 'm1',
      from: 'them',
      time: '1d ago',
      text: 'Hi Jordan! Are you in the Watercolour Sundays group? We paint together every Sunday at 14:00 UTC.',
    },
    {
      id: 'm2',
      from: 'me',
      time: '1d ago',
      text: "Hi Mei! Yes I just joined last week. It's been great so far!",
      read: true,
    },
    {
      id: 'm3',
      from: 'them',
      time: '1d ago',
      text: "Amazing! This Sunday we're doing a wet-on-wet florals challenge. Very beginner-friendly.",
    },
    { id: 'm4', from: 'them', time: '45m ago', text: "Are you joining Sunday's painting session?" },
  ],
  t5: [{ id: 'm1', from: 'me', time: '2d ago', text: 'Looking forward to it 🔥', read: true }],
}

/* ─── Sub-components ──────────────────────────────────────── */
function FriendReqCard({
  req,
  mode,
  onApprove,
  onReject,
  onWithdraw,
}: {
  req: FriendReq
  mode: 'received' | 'sent'
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  onWithdraw?: (id: string) => void
}) {
  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
      style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full shrink-0 hm-mono text-[11px] font-semibold"
        style={{ background: `${req.color}20`, color: req.color }}
      >
        {req.avatar}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className="text-[12.5px] font-semibold truncate"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
        >
          {req.name}
        </p>
        <p className="text-[10.5px] truncate" style={{ color: 'var(--hm-text-dim)' }}>
          {req.mutual}
        </p>
      </div>
      {mode === 'received' ? (
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onApprove?.(req.id)}
            className="flex items-center gap-1 px-2.5 h-7 rounded-lg text-[11px] font-semibold"
            style={{ background: `${GREEN}18`, color: GREEN, border: `1px solid ${GREEN}35` }}
          >
            <Check className="h-3 w-3" /> Accept
          </button>
          <button
            type="button"
            onClick={() => onReject?.(req.id)}
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ background: `${ROSE}14`, color: ROSE, border: `1px solid ${ROSE}30` }}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onWithdraw?.(req.id)}
          className="flex items-center gap-1 px-2.5 h-7 rounded-lg text-[11px] font-semibold shrink-0"
          style={{
            background: 'var(--hm-bg-card)',
            color: 'var(--hm-text-dim)',
            border: '1px solid var(--hm-border)',
          }}
        >
          <UserMinus className="h-3 w-3" /> Withdraw
        </button>
      )}
    </div>
  )
}

function ThreadRow({
  t,
  active,
  onClick,
}: {
  t: ChatThread
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-3 w-full text-left rounded-xl transition-all"
      style={{
        background: active ? VIOLET_SOFT : 'transparent',
        border: active ? `1px solid ${VIOLET}35` : '1px solid transparent',
      }}
    >
      <div className="relative shrink-0">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full hm-mono text-[11px] font-semibold"
          style={{ background: `${t.color}22`, color: t.color }}
        >
          {t.avatar}
        </span>
        {t.online && (
          <span
            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2"
            style={{ background: GREEN, borderColor: 'var(--hm-bg-card)' }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <p
            className="text-[13px] font-semibold truncate"
            style={{ color: active ? VIOLET : 'var(--hm-text)', letterSpacing: '-0.01em' }}
          >
            {t.name}
          </p>
          <span className="hm-mono text-[10px] shrink-0" style={{ color: 'var(--hm-text-dim)' }}>
            {t.lastTime}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-[11.5px] truncate" style={{ color: 'var(--hm-text-dim)' }}>
            {t.lastMsg}
          </p>
          {t.unread > 0 && (
            <span
              className="hm-mono text-[9.5px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center shrink-0"
              style={{ background: VIOLET, color: 'white' }}
            >
              {t.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

function MsgBubble({ msg, them }: { msg: Msg; them: ChatThread }) {
  const isMe = msg.from === 'me'
  return (
    <div className={`flex items-end gap-2.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isMe && (
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full shrink-0 hm-mono text-[9px] font-semibold mb-0.5"
          style={{ background: `${them.color}22`, color: them.color }}
        >
          {them.avatar}
        </span>
      )}
      <div className="max-w-[72%]">
        <div
          className="px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed"
          style={
            isMe
              ? {
                  background: VIOLET,
                  color: 'white',
                  borderRadius: '18px 18px 4px 18px',
                  boxShadow: `0 4px 12px ${VIOLET}33`,
                }
              : {
                  background: 'var(--hm-bg-card-2)',
                  color: 'var(--hm-text)',
                  border: '1px solid var(--hm-border)',
                  borderRadius: '18px 18px 18px 4px',
                }
          }
        >
          {msg.text}
        </div>
        <div className={`flex items-center gap-1 mt-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
            {msg.time}
          </span>
          {isMe && msg.read && <CheckCheck className="h-3 w-3" style={{ color: `${VIOLET}80` }} />}
          {isMe && !msg.read && (
            <Check className="h-3 w-3" style={{ color: 'var(--hm-text-dim)' }} />
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────── */
export default function StudentInbox() {
  const [receivedReqs, setReceivedReqs] = useState(RECEIVED_REQS)
  const [sentReqs, setSentReqs] = useState(SENT_REQS)
  const [reqTab, setReqTab] = useState<'received' | 'sent'>('received')
  const [activeThread, setActiveThread] = useState<string>('t1')
  const [inputText, setInputText] = useState('')
  const [showReqs, setShowReqs] = useState(true)

  const thread = THREADS.find((t) => t.id === activeThread)!
  const msgs = CONVERSATIONS[activeThread] ?? []

  function approveReq(id: string) {
    setReceivedReqs((rs) => rs.filter((r) => r.id !== id))
  }
  function rejectReq(id: string) {
    setReceivedReqs((rs) => rs.filter((r) => r.id !== id))
  }
  function withdrawReq(id: string) {
    setSentReqs((rs) => rs.filter((r) => r.id !== id))
  }

  const totalReqs = receivedReqs.length + sentReqs.length

  return (
    <StudentShell activeTab={null} fullWidth>
      <div className="flex" style={{ height: 'calc(100vh - 56px)' }}>
        {/* ──── Left panel ──── */}
        <aside
          className="w-[300px] shrink-0 hidden md:flex flex-col border-r"
          style={{ borderColor: 'var(--hm-border)', background: 'var(--hm-bg-card)' }}
        >
          {/* Panel header */}
          <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid var(--hm-border)' }}>
            <div className="flex items-center justify-between mb-3">
              <h2
                className="text-[15px] font-bold"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
              >
                Inbox
              </h2>
              <span
                className="hm-mono text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: `${VIOLET}18`, color: VIOLET, letterSpacing: '0.06em' }}
              >
                {receivedReqs.length + 1} new
              </span>
            </div>
            {/* Search */}
            <div className="relative">
              <Search
                className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--hm-text-dim)' }}
              />
              <input
                type="text"
                placeholder="Search conversations…"
                className="w-full pl-9 pr-3 h-8 rounded-lg text-[12px] outline-none"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                }}
              />
            </div>
          </div>

          {/* Friend Requests section */}
          {totalReqs > 0 && (
            <div style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <button
                type="button"
                onClick={() => setShowReqs((v) => !v)}
                className="flex items-center justify-between w-full px-4 py-2.5"
                style={{ background: 'transparent' }}
              >
                <div className="flex items-center gap-2">
                  <UserPlus className="h-3.5 w-3.5" style={{ color: TEAL }} />
                  <span
                    className="hm-mono text-[9.5px] font-semibold"
                    style={{ color: TEAL, letterSpacing: '0.1em' }}
                  >
                    FRIEND REQUESTS
                  </span>
                  {receivedReqs.length > 0 && (
                    <span
                      className="hm-mono text-[9px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center"
                      style={{ background: TEAL, color: 'white' }}
                    >
                      {receivedReqs.length}
                    </span>
                  )}
                </div>
                <ChevronLeft
                  className={`h-3.5 w-3.5 transition-transform ${showReqs ? '-rotate-90' : 'rotate-0'}`}
                  style={{ color: 'var(--hm-text-dim)' }}
                />
              </button>

              {showReqs && (
                <div className="px-3 pb-3">
                  {/* Tabs */}
                  <div className="flex gap-1 mb-2.5">
                    {(['received', 'sent'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setReqTab(t)}
                        className="flex-1 h-7 rounded-lg text-[11px] font-semibold capitalize"
                        style={{
                          background: reqTab === t ? VIOLET_SOFT : 'var(--hm-bg-card-2)',
                          border: `1px solid ${reqTab === t ? VIOLET + '40' : 'var(--hm-border)'}`,
                          color: reqTab === t ? VIOLET : 'var(--hm-text-muted)',
                        }}
                      >
                        {t}
                        <span className="ml-1 hm-mono text-[9px]">
                          ({t === 'received' ? receivedReqs.length : sentReqs.length})
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    {reqTab === 'received' ? (
                      receivedReqs.length > 0 ? (
                        receivedReqs.map((r) => (
                          <FriendReqCard
                            key={r.id}
                            req={r}
                            mode="received"
                            onApprove={approveReq}
                            onReject={rejectReq}
                          />
                        ))
                      ) : (
                        <p
                          className="text-center text-[11.5px] py-3"
                          style={{ color: 'var(--hm-text-dim)' }}
                        >
                          No pending requests
                        </p>
                      )
                    ) : sentReqs.length > 0 ? (
                      sentReqs.map((r) => (
                        <FriendReqCard key={r.id} req={r} mode="sent" onWithdraw={withdrawReq} />
                      ))
                    ) : (
                      <p
                        className="text-center text-[11.5px] py-3"
                        style={{ color: 'var(--hm-text-dim)' }}
                      >
                        No sent requests
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Thread list */}
          <div className="flex-1 overflow-y-auto px-2 py-2" style={{ scrollbarWidth: 'thin' }}>
            <p
              className="hm-mono text-[9.5px] px-2 pb-1.5 pt-1"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
            >
              MESSAGES
            </p>
            {THREADS.map((t) => (
              <ThreadRow
                key={t.id}
                t={t}
                active={activeThread === t.id}
                onClick={() => setActiveThread(t.id)}
              />
            ))}
          </div>
        </aside>

        {/* ──── Chat area ──── */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Chat header */}
          <div
            className="flex items-center gap-3 px-5 py-3.5 shrink-0"
            style={{ borderBottom: '1px solid var(--hm-border)', background: 'var(--hm-bg-card)' }}
          >
            <div className="relative shrink-0">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full hm-mono text-[11px] font-semibold"
                style={{ background: `${thread.color}22`, color: thread.color }}
              >
                {thread.avatar}
              </span>
              {thread.online && (
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2"
                  style={{ background: GREEN, borderColor: 'var(--hm-bg-card)' }}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-[14px] font-semibold"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
              >
                {thread.name}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="text-[11.5px]"
                  style={{ color: thread.online ? GREEN : 'var(--hm-text-dim)' }}
                >
                  {thread.online ? '● Online' : '○ Offline'}
                </span>
                {thread.course && (
                  <>
                    <span style={{ color: 'var(--hm-border)' }}>·</span>
                    <span
                      className="flex items-center gap-1 text-[11px]"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      <BookOpen className="h-3 w-3" /> {thread.course}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-dim)',
                }}
              >
                <Phone className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-dim)',
                }}
              >
                <Video className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-dim)',
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4"
            style={{ scrollbarWidth: 'thin' }}
          >
            {msgs.map((msg, i) => {
              const showDate = i === 0 || msgs[i - 1].time !== msg.time
              return (
                <div key={msg.id}>
                  {showDate && i === 0 && (
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-px" style={{ background: 'var(--hm-border)' }} />
                      <span
                        className="hm-mono text-[10px] px-3"
                        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                      >
                        TODAY
                      </span>
                      <div className="flex-1 h-px" style={{ background: 'var(--hm-border)' }} />
                    </div>
                  )}
                  <MsgBubble msg={msg} them={thread} />
                </div>
              )
            })}
            {/* Typing indicator */}
            {thread.online && activeThread === 't1' && (
              <div className="flex items-end gap-2.5">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full shrink-0 hm-mono text-[9px] font-semibold"
                  style={{ background: `${thread.color}22`, color: thread.color }}
                >
                  {thread.avatar}
                </span>
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    borderRadius: '18px 18px 18px 4px',
                  }}
                >
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full animate-bounce"
                        style={{ background: 'var(--hm-text-dim)', animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div
            className="px-4 py-3 shrink-0"
            style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card)' }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-2xl"
              style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
            >
              <button type="button" style={{ color: 'var(--hm-text-dim)' }}>
                <Smile className="h-5 w-5" />
              </button>
              <button type="button" style={{ color: 'var(--hm-text-dim)' }}>
                <Paperclip className="h-5 w-5" />
              </button>
              <button type="button" style={{ color: 'var(--hm-text-dim)' }}>
                <ImageIcon className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${thread.name.split(' ')[0]}…`}
                className="flex-1 bg-transparent outline-none text-[13.5px] mx-1"
                style={{ color: 'var(--hm-text)' }}
              />
              {inputText.trim() ? (
                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`,
                    boxShadow: `0 4px 12px ${VIOLET}44`,
                  }}
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              ) : (
                <button type="button" style={{ color: 'var(--hm-text-dim)' }} className="shrink-0">
                  <Mic className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </StudentShell>
  )
}
