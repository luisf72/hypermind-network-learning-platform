import { useState } from 'react'
import AdminShell from '../_shared/AdminShell'
import { Pill, Mono, type Tone } from '../_shared/AdminTable'
import AdminModal, {
  Field,
  FieldGrid,
  TextInput,
  Textarea,
  Select,
  Toggle,
} from '../_shared/AdminModal'
import {
  ArrowLeft,
  Pencil,
  Mail,
  Calendar,
  MapPin,
  ShieldCheck,
  Heart,
  Sparkles,
  Hash,
  Coins,
  Activity,
  Award,
  BookOpen,
  GraduationCap,
  Check,
  Plus,
  Minus,
} from 'lucide-react'

const ACCENT = '#F4636E'

/* ── Demo user (matches the row clicked from the Users list) ────────── */

const USER = {
  id: 'u-002',
  full_name: 'Sarah Lin',
  email: 'sarah.lin@studio.com',
  initials: 'SL',
  role: 'Creator' as 'Admin' | 'Creator' | 'Evaluator' | 'Student',
  status: 'active' as 'active' | 'inactive' | 'suspended',
  joined: 'Apr 02, 2024',
  last_active: '12 minutes ago',
  location: 'Berlin, Germany',
  timezone: 'Europe/Berlin',
  bio: "Independent course creator focused on memory science and effective study habits. Hosts the weekly 'Recall Lab' live session.",
  karma: 8240,
  hmn: 3140,
  credits: 4200,
  xp: 92800,
  streak_days: 14,
  courses_created: 6,
  courses_published: 4,
  assessments_authored: 12,
  reviews_received: 184,
  avg_rating: 4.8,
}

const ROLE_TONE: Record<string, Tone> = {
  Admin: 'danger',
  Creator: 'violet',
  Evaluator: 'amber',
  Student: 'info',
}
const STATUS_TONE: Record<string, Tone> = {
  active: 'success',
  inactive: 'neutral',
  suspended: 'danger',
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
]

/* ── Sub-components ─────────────────────────────────────────────────── */

function StatTile({
  Icon,
  label,
  value,
  tone,
  hint,
}: {
  Icon: any
  label: string
  value: string
  tone: string
  hint?: string
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
      {hint && (
        <p className="text-[10.5px] mt-1.5" style={{ color: 'var(--hm-text-dim)' }}>
          {hint}
        </p>
      )}
    </div>
  )
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="flex items-start gap-3 py-2.5"
      style={{ borderTop: '1px solid var(--hm-border)' }}
    >
      <p
        className="hm-mono text-[10px] shrink-0 pt-0.5"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em', width: 110 }}
      >
        {label.toUpperCase()}
      </p>
      <div className="flex-1 min-w-0 text-[12.5px]" style={{ color: 'var(--hm-text)' }}>
        {children}
      </div>
    </div>
  )
}

function SectionCard({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow?: string
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
    >
      <div
        className="flex items-center justify-between gap-3 px-5 py-3.5"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <div className="min-w-0">
          {eyebrow && (
            <p
              className="hm-mono text-[9.5px] mb-0.5"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              {eyebrow.toUpperCase()}
            </p>
          )}
          <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            {title}
          </h3>
        </div>
        {action}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

const ACTIVITY_TIMELINE = [
  {
    icon: BookOpen,
    tone: '#A78BFA',
    label: 'course.publish',
    detail: "Published 'Cognitive Load Mastery'.",
    when: 'Apr 28, 16:42',
  },
  {
    icon: GraduationCap,
    tone: '#A78BFA',
    label: 'assessment.create',
    detail: "Created 'Working Memory — v3'.",
    when: 'Apr 28, 15:18',
  },
  {
    icon: Award,
    tone: '#5EE6A8',
    label: 'evaluation_calibrated',
    detail: 'Calibration accepted by panel.',
    when: 'Apr 28, 14:18',
  },
  {
    icon: Sparkles,
    tone: '#F4B26C',
    label: 'xp.award',
    detail: '+200 XP — 14-day streak bonus.',
    when: 'Apr 28, 09:00',
  },
  {
    icon: Coins,
    tone: '#5BC8C5',
    label: 'credit.purchase',
    detail: 'Bought 500 credits ($49.00 USD).',
    when: 'Apr 28, 15:18',
  },
]

const ENROLLED_COURSES = [
  { title: 'Cognitive Load Mastery', progress: 92, lessons: '11 / 12 lessons' },
  { title: 'Foundations of Active Recall', progress: 100, lessons: '8 / 8 lessons' },
  { title: 'Spaced Repetition Engineering', progress: 44, lessons: '6 / 14 lessons' },
]

/* ── Page ───────────────────────────────────────────────────────────── */

/* ── Edit-modal sub-components: role multi-select + credit adjuster ── */

const ASSIGNABLE_ROLES = [
  {
    id: 'Student',
    Icon: GraduationCap,
    color: '#5EE6A8',
    desc: 'Can enroll, learn and take assessments',
  },
  {
    id: 'Creator',
    Icon: Sparkles,
    color: '#A78BFA',
    desc: 'Can publish courses and host live sessions',
  },
  { id: 'Evaluator', Icon: Award, color: '#F4B26C', desc: 'Can review submissions and grade work' },
] as const

function RoleMultiSelect({ defaultValues }: { defaultValues: string[] }) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(defaultValues))
  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        if (next.size <= 1) return prev // enforce min 1
        next.delete(id)
      } else {
        if (next.size >= 3) return prev // max 3 (already enforced by list length)
        next.add(id)
      }
      return next
    })
  }
  return (
    <div>
      <div className="grid grid-cols-3 gap-2.5">
        {ASSIGNABLE_ROLES.map((r) => {
          const on = selected.has(r.id)
          const isLast = on && selected.size === 1
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => toggle(r.id)}
              disabled={isLast}
              className="text-left rounded-xl p-3 transition-all"
              style={{
                background: on ? `${r.color}14` : 'var(--hm-bg-card-2)',
                border: on ? `1px solid ${r.color}80` : '1px solid var(--hm-border)',
                boxShadow: on
                  ? `inset 0 0 0 1px ${r.color}33, 0 6px 18px -10px ${r.color}99`
                  : 'none',
                cursor: isLast ? 'not-allowed' : 'pointer',
                opacity: isLast ? 0.92 : 1,
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
                  style={{ background: `${r.color}24`, color: r.color }}
                >
                  <r.Icon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[12.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  {r.id}
                </span>
                <span
                  className="ml-auto h-4 w-4 rounded-full inline-flex items-center justify-center shrink-0"
                  style={{
                    background: on ? r.color : 'transparent',
                    border: on ? 'none' : '1.5px solid var(--hm-border-strong)',
                  }}
                >
                  {on && (
                    <Check className="h-2.5 w-2.5" strokeWidth={3} style={{ color: 'white' }} />
                  )}
                </span>
              </div>
              <p className="text-[10.5px] leading-snug" style={{ color: 'var(--hm-text-dim)' }}>
                {r.desc}
              </p>
            </button>
          )
        })}
      </div>
      <p className="text-[10.5px] mt-2" style={{ color: 'var(--hm-text-dim)' }}>
        <span className="hm-mono" style={{ color: 'var(--hm-text-muted)' }}>
          {selected.size}
        </span>{' '}
        of 3 selected · at least 1 role required, max 3
      </p>
    </div>
  )
}

function CreditAdjuster({ current }: { current: number }) {
  const [mode, setMode] = useState<'add' | 'remove'>('add')
  const [amount, setAmount] = useState<number>(0)
  const presets = [100, 500, 1000, 5000]
  const delta = mode === 'add' ? amount : -amount
  const newBalance = Math.max(0, current + delta)
  const tone = mode === 'add' ? '#5EE6A8' : ACCENT
  const willNotChange = amount === 0

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
    >
      {/* Balance header */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-3"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
            style={{ background: `${ACCENT}1f`, color: ACCENT }}
          >
            <Coins className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p
              className="hm-mono text-[9.5px]"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
            >
              CURRENT BALANCE
            </p>
            <p
              className="hm-mono text-[16px] font-semibold leading-tight"
              style={{ color: 'var(--hm-text)' }}
            >
              {current.toLocaleString()}{' '}
              <span className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                cr
              </span>
            </p>
          </div>
        </div>

        <div className="text-right">
          <p
            className="hm-mono text-[9.5px]"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
          >
            NEW BALANCE
          </p>
          <p
            className="hm-mono text-[16px] font-semibold leading-tight"
            style={{ color: willNotChange ? 'var(--hm-text)' : tone }}
          >
            {willNotChange ? (
              current.toLocaleString()
            ) : (
              <>
                {newBalance.toLocaleString()}{' '}
                <span className="text-[10.5px]" style={{ color: tone }}>
                  ({delta > 0 ? '+' : '−'}
                  {Math.abs(delta).toLocaleString()})
                </span>
              </>
            )}{' '}
            <span className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
              cr
            </span>
          </p>
        </div>
      </div>

      {/* Mode + amount + presets + reason */}
      <div className="p-4 space-y-3">
        <div className="flex items-stretch gap-2">
          {/* Add / Remove segmented */}
          <div
            className="inline-flex rounded-lg overflow-hidden shrink-0"
            style={{ border: '1px solid var(--hm-border)' }}
          >
            <button
              type="button"
              onClick={() => setMode('add')}
              className="inline-flex items-center gap-1.5 px-3 h-9 text-[12px] font-medium transition-colors"
              style={{
                background: mode === 'add' ? 'rgba(94,230,168,0.14)' : 'transparent',
                color: mode === 'add' ? '#5EE6A8' : 'var(--hm-text-muted)',
              }}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} /> Add
            </button>
            <button
              type="button"
              onClick={() => setMode('remove')}
              className="inline-flex items-center gap-1.5 px-3 h-9 text-[12px] font-medium transition-colors"
              style={{
                background: mode === 'remove' ? `${ACCENT}1f` : 'transparent',
                color: mode === 'remove' ? ACCENT : 'var(--hm-text-muted)',
                borderLeft: '1px solid var(--hm-border)',
              }}
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={2.5} /> Remove
            </button>
          </div>

          {/* Amount input */}
          <div className="relative flex-1 min-w-0">
            <input
              type="number"
              min={0}
              value={amount === 0 ? '' : amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
              placeholder="0"
              className="w-full h-9 pl-3 pr-12 rounded-lg outline-none hm-mono text-[13px]"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
              }}
            />
            <span
              className="hm-mono text-[10.5px] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
            >
              CR
            </span>
          </div>
        </div>

        {/* Quick chips */}
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setAmount(p)}
              className="hm-mono text-[11px] px-2.5 h-7 rounded-md transition-colors"
              style={{
                background: amount === p ? `${tone}14` : 'var(--hm-bg-card)',
                border: `1px solid ${amount === p ? `${tone}66` : 'var(--hm-border)'}`,
                color: amount === p ? tone : 'var(--hm-text-muted)',
              }}
            >
              {mode === 'add' ? '+' : '−'}
              {p.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Reason / note */}
        <input
          type="text"
          placeholder="Reason / note (e.g. Q2 creator bonus, refund for #tx-0184)…"
          className="w-full h-9 px-3 rounded-lg outline-none text-[12.5px]"
          style={{
            background: 'var(--hm-bg-card)',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text)',
          }}
        />
        <p className="text-[10.5px]" style={{ color: 'var(--hm-text-dim)' }}>
          Logged to the user's <span style={{ color: 'var(--hm-text-muted)' }}>credit ledger</span>{' '}
          on save.
        </p>
      </div>
    </div>
  )
}

export default function UserDetail() {
  const u = USER
  const [editOpen, setEditOpen] = useState(false)

  return (
    <AdminShell activeId="users">
      {/* ── Breadcrumb / back link ─────────────────────────────── */}
      <div className="mb-4">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-[12px] hover:opacity-80"
          style={{ color: 'var(--hm-text-muted)' }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="hm-mono" style={{ letterSpacing: '0.08em' }}>
            USERS
          </span>
          <span style={{ color: 'var(--hm-text-dim)' }}>/</span>
          <span style={{ color: 'var(--hm-text-dim)' }}>#{u.id}</span>
        </a>
      </div>

      {/* ── Header card ────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl mb-5"
        style={{
          background: 'linear-gradient(135deg, var(--hm-bg-card) 0%, var(--hm-bg-card-2) 100%)',
          border: '1px solid var(--hm-border-strong)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 100% 0%, ${ACCENT}26 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(167,139,250,0.18) 0%, transparent 60%)`,
          }}
        />
        <div className="relative flex items-start flex-wrap gap-5 px-6 py-5">
          {/* Avatar */}
          <span
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-[20px] font-semibold shrink-0"
            style={{
              background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}cc 100%)`,
              color: 'white',
              boxShadow: `0 12px 30px -10px ${ACCENT}66`,
            }}
          >
            {u.initials}
          </span>

          {/* Identity */}
          <div className="min-w-0 flex-1">
            <p
              className="hm-mono text-[10px] mb-1"
              style={{ color: ACCENT, letterSpacing: '0.18em' }}
            >
              USER #{u.id.toUpperCase()}
            </p>
            <h1
              className="text-[24px] font-semibold tracking-tight mb-1.5 truncate"
              style={{ color: 'var(--hm-text)', fontFamily: 'var(--hm-font-display)' }}
            >
              {u.full_name}
            </h1>
            <div
              className="flex items-center flex-wrap gap-x-4 gap-y-1.5 text-[12px]"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {u.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Joined {u.joined}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {u.location}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <Pill tone={ROLE_TONE[u.role]}>{u.role}</Pill>
              <Pill tone={STATUS_TONE[u.status]}>{u.status}</Pill>
              <span
                className="inline-flex items-center gap-1.5 h-[22px] px-2 rounded-md text-[10.5px] font-medium"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-muted)',
                }}
              >
                <ShieldCheck className="h-3 w-3" />
                Verified
              </span>
              <span
                className="hm-mono text-[10px] ml-1"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
              >
                Active {u.last_active}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-medium"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              Send message
            </button>
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{
                background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}d9 100%)`,
                color: 'white',
                boxShadow: `0 8px 24px -8px ${ACCENT}66`,
              }}
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit user
            </button>
          </div>
        </div>
      </div>

      {/* ── Stat tiles ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
        <StatTile
          Icon={Heart}
          tone="#F4636E"
          label="Karma"
          value={u.karma.toLocaleString()}
          hint="Reputation balance"
        />
        <StatTile
          Icon={Sparkles}
          tone="#F4B26C"
          label="XP"
          value={u.xp.toLocaleString()}
          hint={`${u.streak_days}-day streak`}
        />
        <StatTile
          Icon={Hash}
          tone="#A78BFA"
          label="HMN"
          value={u.hmn.toLocaleString()}
          hint="Earned from contributions"
        />
        <StatTile
          Icon={Coins}
          tone="#5BC8C5"
          label="Credits"
          value={`${u.credits.toLocaleString()} cr`}
          hint="Spendable balance"
        />
      </div>

      {/* ── 2-column body ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left — Profile + Account */}
        <div className="flex flex-col gap-4">
          <SectionCard eyebrow="Profile" title="About">
            <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--hm-text-muted)' }}>
              {u.bio}
            </p>
            <div className="mt-3">
              <InfoRow label="Timezone">
                <Mono>{u.timezone}</Mono>
              </InfoRow>
              <InfoRow label="Language">
                <Mono>EN · ES</Mono>
              </InfoRow>
              <InfoRow label="Two-factor">
                <span className="inline-flex items-center gap-1.5">
                  <Pill tone="success">Enabled</Pill>
                  <span style={{ color: 'var(--hm-text-dim)' }}>via authenticator app</span>
                </span>
              </InfoRow>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Contribution" title="As a creator">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p
                  className="hm-mono text-[9.5px] mb-1"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
                >
                  COURSES
                </p>
                <p
                  className="hm-mono text-[16px] font-semibold"
                  style={{ color: 'var(--hm-text)' }}
                >
                  {u.courses_created}
                  <span className="text-[11px] ml-1.5" style={{ color: 'var(--hm-text-dim)' }}>
                    / {u.courses_published} published
                  </span>
                </p>
              </div>
              <div>
                <p
                  className="hm-mono text-[9.5px] mb-1"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
                >
                  ASSESSMENTS
                </p>
                <p
                  className="hm-mono text-[16px] font-semibold"
                  style={{ color: 'var(--hm-text)' }}
                >
                  {u.assessments_authored}
                </p>
              </div>
              <div>
                <p
                  className="hm-mono text-[9.5px] mb-1"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
                >
                  REVIEWS
                </p>
                <p
                  className="hm-mono text-[16px] font-semibold"
                  style={{ color: 'var(--hm-text)' }}
                >
                  {u.reviews_received}
                </p>
              </div>
              <div>
                <p
                  className="hm-mono text-[9.5px] mb-1"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
                >
                  AVG RATING
                </p>
                <p className="hm-mono text-[16px] font-semibold" style={{ color: '#F4B26C' }}>
                  {u.avg_rating.toFixed(1)} ★
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right — Activity + Enrollments */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <SectionCard
            eyebrow="Activity"
            title="Recent activity"
            action={
              <a
                href="#"
                className="hm-mono text-[10.5px]"
                style={{ color: ACCENT, letterSpacing: '0.08em' }}
              >
                VIEW ALL →
              </a>
            }
          >
            <ul className="flex flex-col">
              {ACTIVITY_TIMELINE.map((row, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 py-2.5"
                  style={{ borderTop: i === 0 ? 'none' : '1px solid var(--hm-border)' }}
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0 mt-0.5"
                    style={{ background: `${row.tone}1f`, color: row.tone }}
                  >
                    <row.icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Mono>{row.label}</Mono>
                      <span
                        className="hm-mono text-[10px] ml-auto shrink-0"
                        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                      >
                        {row.when}
                      </span>
                    </div>
                    <p className="text-[12.5px] truncate" style={{ color: 'var(--hm-text)' }}>
                      {row.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard
            eyebrow="Learning"
            title="Enrolled courses"
            action={
              <span
                className="hm-mono text-[10.5px]"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
              >
                {ENROLLED_COURSES.length} ACTIVE
              </span>
            }
          >
            <div className="flex flex-col gap-3">
              {ENROLLED_COURSES.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0"
                    style={{ background: 'var(--hm-violet-soft)', color: 'var(--hm-violet-2)' }}
                  >
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p
                        className="text-[12.5px] font-medium truncate"
                        style={{ color: 'var(--hm-text)' }}
                      >
                        {c.title}
                      </p>
                      <Mono>{c.progress}%</Mono>
                    </div>
                    <div
                      className="relative h-1.5 rounded-full overflow-hidden"
                      style={{ background: 'var(--hm-bg-card-2)' }}
                    >
                      <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          width: `${c.progress}%`,
                          background: `linear-gradient(90deg, ${ACCENT} 0%, #A78BFA 100%)`,
                        }}
                      />
                    </div>
                    <p className="text-[10.5px] mt-1" style={{ color: 'var(--hm-text-dim)' }}>
                      {c.lessons}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* ── Edit modal ─────────────────────────────────────────── */}
      <AdminModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        mode="edit"
        entityLabel="user"
        entityName={u.full_name}
        subtitle={`#${u.id} · ${u.email} · joined ${u.joined}`}
        width={680}
        destructive={{ label: 'Suspend account' }}
      >
        <FieldGrid cols={2}>
          <Field label="Full name" required>
            <TextInput defaultValue={u.full_name} />
          </Field>
          <Field label="Email" required>
            <TextInput defaultValue={u.email} type="email" />
          </Field>
          <Field label="Status" required>
            <Select defaultValue={u.status} options={STATUS_OPTIONS} />
          </Field>
          <Field label="Location">
            <TextInput defaultValue={u.location} />
          </Field>
          <Field label="Timezone">
            <TextInput mono defaultValue={u.timezone} />
          </Field>
          <Field label="Bio" span={2}>
            <Textarea rows={3} defaultValue={u.bio} />
          </Field>
          <Field
            label="Roles"
            required
            span={2}
            hint="A user can hold one to three roles. Admin is granted separately by the platform owner."
          >
            <RoleMultiSelect defaultValues={['Creator', 'Student']} />
          </Field>
          <Field
            label="Credits"
            span={2}
            hint="Manually credit or debit the user's spendable balance."
          >
            <CreditAdjuster current={u.credits} />
          </Field>
          <Field label="Permissions" span={2}>
            <div className="flex flex-col gap-2">
              <Toggle defaultChecked label="Can publish courses" />
              <Toggle defaultChecked label="Can host live sessions" />
              <Toggle defaultChecked={false} label="Can moderate community posts" />
              <Toggle defaultChecked={false} label="Can issue refunds" />
            </div>
          </Field>
          <Field label="Account" span={2} hint="Lifecycle controls reset on save.">
            <Toggle defaultChecked label="Two-factor authentication required" />
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
