import { useState, type ReactNode } from 'react'
import { Save, Key, ShieldCheck, ChevronRight, AlertTriangle, ChevronDown } from 'lucide-react'
import CreatorShell from '../_shared/CreatorShell'

const ACCENT = '#F4B26C'
const ACCENT_DARK = '#1a1208'
const ROSE = '#F4636E'

function Card({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
    >
      <div className="px-5 py-3.5" style={{ borderBottom: '1px solid var(--hm-border)' }}>
        <p
          className="hm-mono text-[9.5px] mb-0.5"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
        >
          {eyebrow.toUpperCase()}
        </p>
        <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-[11.5px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked)
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      aria-pressed={on}
      className="relative inline-flex shrink-0 items-center w-8 rounded-full transition-colors"
      style={{
        background: on ? ACCENT : 'var(--hm-bg-card-2)',
        border: `1px solid ${on ? ACCENT : 'var(--hm-border-strong)'}`,
        height: 18,
      }}
    >
      <span
        className="absolute h-3 w-3 rounded-full transition-all"
        style={{ background: on ? ACCENT_DARK : 'var(--hm-text-dim)', left: on ? 16 : 2 }}
      />
    </button>
  )
}

function Row({ title, hint, control }: { title: string; hint?: string; control: ReactNode }) {
  return (
    <div
      className="flex items-center justify-between gap-4 py-2.5"
      style={{ borderTop: '1px solid var(--hm-border)' }}
    >
      <div className="min-w-0">
        <p className="text-[12.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
          {title}
        </p>
        {hint && (
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
            {hint}
          </p>
        )}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  )
}

function Select({
  defaultValue,
  options,
}: {
  defaultValue: string
  options: { value: string; label: string }[]
}) {
  return (
    <div className="relative">
      <select
        defaultValue={defaultValue}
        className="appearance-none px-3 pr-8 h-8 rounded-md text-[12px] outline-none hm-mono"
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border)',
          color: 'var(--hm-text)',
          letterSpacing: '0.04em',
          minWidth: 180,
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="h-3 w-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--hm-text-dim)' }}
      />
    </div>
  )
}

function LinkRow({
  Icon,
  title,
  hint,
  badge,
  badgeTone = 'neutral',
}: {
  Icon: any
  title: string
  hint?: string
  badge?: string
  badgeTone?: 'success' | 'warning' | 'neutral'
}) {
  const tones = {
    success: { bg: 'rgba(94,230,168,0.12)', fg: '#5EE6A8' },
    warning: { bg: 'rgba(244,178,108,0.14)', fg: ACCENT },
    neutral: { bg: 'rgba(139,146,168,0.14)', fg: '#8B92A8' },
  }
  const t = tones[badgeTone]
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 py-2.5 text-left"
      style={{ borderTop: '1px solid var(--hm-border)' }}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
        style={{ background: 'var(--hm-bg-card-2)', color: 'var(--hm-text-muted)' }}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-medium" style={{ color: 'var(--hm-text)' }}>
          {title}
        </p>
        {hint && (
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
            {hint}
          </p>
        )}
      </div>
      {badge && (
        <span
          className="hm-mono px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0"
          style={{ background: t.bg, color: t.fg, letterSpacing: '0.06em' }}
        >
          {badge.toUpperCase()}
        </span>
      )}
      <ChevronRight className="h-4 w-4 shrink-0" style={{ color: 'var(--hm-text-dim)' }} />
    </button>
  )
}

export default function CreatorSettings() {
  return (
    <CreatorShell activeId="settings">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p
            className="hm-mono text-[10.5px] mb-2"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
          >
            ACCOUNT
          </p>
          <h1
            className="text-[26px] font-semibold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            Settings
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            Notifications, privacy and creator defaults.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
          style={{
            background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}d9 100%)`,
            color: ACCENT_DARK,
            boxShadow: `0 8px 24px -8px ${ACCENT}66`,
          }}
        >
          <Save className="h-3.5 w-3.5" /> Save changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          eyebrow="Communication"
          title="Email notifications"
          subtitle="What lands in your inbox."
        >
          <Row
            title="New enrollment in any course"
            hint="A learner just enrolled."
            control={<Toggle defaultChecked />}
          />
          <Row
            title="New review on any course"
            hint="Someone left a rating + comment."
            control={<Toggle defaultChecked />}
          />
          <Row
            title="New question or comment"
            hint="Replies to your lessons or posts."
            control={<Toggle defaultChecked />}
          />
          <Row
            title="Pending evaluator queue"
            hint="A subjective answer needs grading."
            control={<Toggle defaultChecked />}
          />
          <Row
            title="Weekly studio digest"
            hint="A Monday-morning summary."
            control={<Toggle defaultChecked={false} />}
          />
          <Row title="Product updates from HyperMind" control={<Toggle defaultChecked={false} />} />
        </Card>

        <Card eyebrow="Visibility" title="Privacy" subtitle="What learners and the public can see.">
          <Row title="Show full name on courses" control={<Toggle defaultChecked />} />
          <Row title="Show learner count on profile" control={<Toggle defaultChecked />} />
          <Row title="Show total earnings publicly" control={<Toggle defaultChecked={false} />} />
          <Row title="Allow indexing by search engines" control={<Toggle defaultChecked />} />
          <Row title="Show online status" control={<Toggle defaultChecked={false} />} />
        </Card>

        <Card
          eyebrow="Workspace"
          title="Creator defaults"
          subtitle="Pre-fill new courses and lessons with these."
        >
          <Row
            title="Default lesson type"
            hint="When you click 'Add lesson'."
            control={
              <Select
                defaultValue="video"
                options={[
                  { value: 'text', label: 'Text' },
                  { value: 'video', label: 'Video' },
                  { value: 'quiz', label: 'Quiz' },
                  { value: 'live', label: 'Live session' },
                ]}
              />
            }
          />
          <Row
            title="Default course visibility"
            hint="Status applied to new drafts."
            control={
              <Select
                defaultValue="draft"
                options={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'review', label: 'In review' },
                  { value: 'published', label: 'Published' },
                ]}
              />
            }
          />
          <Row
            title="Default course language"
            control={
              <Select
                defaultValue="en"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'ko', label: 'Korean' },
                  { value: 'ja', label: 'Japanese' },
                ]}
              />
            }
          />
          <Row
            title="Default lesson duration estimate"
            hint="Used when no video is uploaded yet."
            control={
              <Select
                defaultValue="10m"
                options={[
                  { value: '5m', label: '5 min' },
                  { value: '10m', label: '10 min' },
                  { value: '20m', label: '20 min' },
                  { value: '30m', label: '30 min' },
                ]}
              />
            }
          />
        </Card>

        <Card
          eyebrow="Security"
          title="Account & access"
          subtitle="Sign-in, devices and sensitive actions."
        >
          <LinkRow Icon={Key} title="Change password" hint="Last changed Mar 2, 2026" />
          <LinkRow
            Icon={ShieldCheck}
            title="Two-factor authentication"
            hint="Extra step at sign-in."
            badge="ON"
            badgeTone="success"
          />
          <LinkRow
            Icon={ShieldCheck}
            title="Active sessions"
            hint="3 devices currently signed in."
            badge="3"
            badgeTone="warning"
          />
          <LinkRow
            Icon={AlertTriangle}
            title="Delete account"
            hint="Permanently remove all your courses and data."
            badge="DANGER"
            badgeTone="warning"
          />

          <div
            className="mt-4 px-3 py-2.5 rounded-lg flex items-start gap-2"
            style={{
              background: 'rgba(244,99,110,0.08)',
              border: '1px solid rgba(244,99,110,0.25)',
            }}
          >
            <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: ROSE }} />
            <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--hm-text-muted)' }}>
              Deleting your account is permanent. Active enrollments will be transferred to
              HyperMind for refunds.
            </p>
          </div>
        </Card>
      </div>
    </CreatorShell>
  )
}
