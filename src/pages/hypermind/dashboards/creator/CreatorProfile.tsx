import { useState, type ReactNode } from 'react'
import {
  Save,
  Camera,
  Globe,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  MapPin,
  Star,
  Users,
  BookOpen,
  Award,
  Edit3,
  CheckCircle2,
  Sparkles,
  Clock,
  Layers,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import CreatorShell from '../_shared/CreatorShell'

const ACCENT = '#F4B26C'
const ACCENT_SOFT = 'rgba(244,178,108,0.12)'
const ACCENT_DARK = '#1a1208'
const VIOLET = '#7C5CF6'
const VIOLET_SOFT = 'rgba(124,92,246,0.10)'
const GREEN = '#5EE6A8'
const TEAL = '#5BC8C5'

/* ── small helpers ──────────────────────────────────────────── */
function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      <span
        className="hm-mono text-[10px] block mb-1.5"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
      >
        {label.toUpperCase()}
        {required && <span style={{ color: ACCENT, marginLeft: 4 }}>*</span>}
      </span>
      {children}
      {hint && (
        <p className="text-[11px] mt-1.5" style={{ color: 'var(--hm-text-dim)' }}>
          {hint}
        </p>
      )}
    </label>
  )
}

function TextInput({
  defaultValue,
  placeholder,
  mono,
  leadingIcon: LeadingIcon,
}: {
  defaultValue?: string
  placeholder?: string
  mono?: boolean
  leadingIcon?: any
}) {
  return (
    <div className="relative">
      {LeadingIcon && (
        <LeadingIcon
          className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--hm-text-dim)' }}
        />
      )}
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`w-full ${LeadingIcon ? 'pl-9' : 'pl-3'} pr-3 h-9 rounded-lg text-[12.5px] outline-none ${mono ? 'hm-mono' : ''}`}
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border)',
          color: 'var(--hm-text)',
        }}
      />
    </div>
  )
}

function Textarea({ defaultValue, rows = 4 }: { defaultValue?: string; rows?: number }) {
  return (
    <textarea
      defaultValue={defaultValue}
      rows={rows}
      className="w-full px-3 py-2 rounded-lg text-[12.5px] outline-none resize-none"
      style={{
        background: 'var(--hm-bg-card-2)',
        border: '1px solid var(--hm-border)',
        color: 'var(--hm-text)',
        lineHeight: 1.5,
      }}
    />
  )
}

function SectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
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
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function Toggle({ defaultChecked = false, label }: { defaultChecked?: boolean; label: string }) {
  const [on, setOn] = useState(defaultChecked)
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className="flex items-center gap-2.5 text-left"
    >
      <span
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
      </span>
      <span className="text-[12px]" style={{ color: 'var(--hm-text)' }}>
        {label}
      </span>
    </button>
  )
}

const FEATURED_COURSES = [
  {
    title: 'Watercolor Foundations',
    category: 'Arts & Crafts',
    icon: '🎨',
    students: 2140,
    rating: 4.9,
    lessons: 42,
    color: TEAL,
  },
  {
    title: 'Botanical Illustration Vol. I',
    category: 'Arts & Crafts',
    icon: '🌿',
    students: 980,
    rating: 4.8,
    lessons: 28,
    color: GREEN,
  },
  {
    title: 'Plein-Air Sketching Essentials',
    category: 'Arts & Crafts',
    icon: '🏞️',
    students: 620,
    rating: 4.9,
    lessons: 24,
    color: ACCENT,
  },
]

const EXPERTISE = [
  'Watercolor',
  'Botanical Illustration',
  'Plein-Air Sketching',
  'Color Theory',
  'Observational Drawing',
  'Oil Painting',
  'Studio Practice',
]

const CREDENTIALS = [
  { icon: Award, label: 'MFA Fine Arts', sub: 'California College of Arts, 2008' },
  { icon: Sparkles, label: 'Top Creator Badge', sub: 'Awarded Q1 2025' },
  { icon: Users, label: '9 years teaching', sub: 'Online & in-studio instruction' },
  { icon: MapPin, label: 'San Francisco, CA', sub: 'Pacific Time (UTC-08:00)' },
]

export default function CreatorProfile() {
  const [editMode, setEditMode] = useState(false)

  return (
    <CreatorShell activeId="profile">
      {/* ── Page header bar ── */}
      <div className="flex items-center justify-between gap-4 mb-6">
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
            Profile
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            How you appear to learners on HyperMind.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEditMode((e) => !e)}
            className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold transition-all"
            style={{
              background: editMode ? ACCENT_SOFT : 'var(--hm-bg-card)',
              color: editMode ? ACCENT : 'var(--hm-text-muted)',
              border: `1px solid ${editMode ? ACCENT + '44' : 'var(--hm-border)'}`,
            }}
          >
            <Edit3 className="h-3.5 w-3.5" />
            {editMode ? 'Editing…' : 'Edit profile'}
          </button>
          {editMode && (
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
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
           PUBLIC PROFILE PREVIEW
      ════════════════════════════════════════ */}

      {/* ── Cover + avatar hero ── */}
      <div
        className="relative rounded-2xl overflow-hidden mb-0"
        style={{ border: '1px solid var(--hm-border-strong)' }}
      >
        {/* Cover banner */}
        <div
          className="relative h-44 overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #0e0f25 0%, #15103a 35%, #0f1a2e 65%, #0c1320 100%)',
          }}
        >
          {/* Decorative SVG art */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 176"
            preserveAspectRatio="xMidYMid slice"
            style={{ opacity: 0.7 }}
          >
            {/* Large blobs */}
            <circle cx="980" cy="40" r="130" fill={ACCENT} fillOpacity="0.22" />
            <circle cx="820" cy="130" r="90" fill={TEAL} fillOpacity="0.16" />
            <circle cx="120" cy="140" r="100" fill={VIOLET} fillOpacity="0.18" />
            <circle cx="280" cy="30" r="70" fill={GREEN} fillOpacity="0.10" />
            <circle cx="540" cy="90" r="60" fill={ACCENT} fillOpacity="0.09" />
            {/* Painterly strokes */}
            <ellipse
              cx="700"
              cy="60"
              rx="200"
              ry="18"
              fill={ACCENT}
              fillOpacity="0.07"
              transform="rotate(-8 700 60)"
            />
            <ellipse
              cx="400"
              cy="130"
              rx="160"
              ry="14"
              fill={VIOLET}
              fillOpacity="0.10"
              transform="rotate(5 400 130)"
            />
            {/* Fine grid lines */}
            {[
              0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960,
              1020, 1080, 1140, 1200,
            ].map((x) => (
              <line
                key={x}
                x1={x}
                y1={0}
                x2={x}
                y2={176}
                stroke="white"
                strokeOpacity="0.025"
                strokeWidth="0.5"
              />
            ))}
            {[0, 44, 88, 132, 176].map((y) => (
              <line
                key={y}
                x1={0}
                y1={y}
                x2={1200}
                y2={y}
                stroke="white"
                strokeOpacity="0.025"
                strokeWidth="0.5"
              />
            ))}
          </svg>
          {/* Subtle radial vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 100% at 50% 0%, transparent 40%, rgba(0,0,0,0.45) 100%)',
            }}
          />
          {/* Cover edit button */}
          {editMode && (
            <button
              type="button"
              className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-medium"
              style={{
                background: 'rgba(0,0,0,0.55)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Camera className="h-3.5 w-3.5" />
              Change cover
            </button>
          )}
        </div>

        {/* Avatar + info row */}
        <div style={{ background: 'var(--hm-bg-card)', borderTop: '1px solid var(--hm-border)' }}>
          <div className="relative px-6 pb-5">
            {/* Avatar — overlaps cover */}
            <div className="absolute -top-12 left-6">
              <div className="relative">
                <span
                  className="flex h-24 w-24 items-center justify-center rounded-2xl hm-mono text-[28px] font-bold"
                  style={{
                    background: `linear-gradient(145deg, ${ACCENT} 0%, #e8922e 100%)`,
                    color: ACCENT_DARK,
                    boxShadow: `0 0 0 3px var(--hm-bg-card), 0 0 0 4px ${ACCENT}55, 0 16px 40px -10px ${ACCENT}77`,
                  }}
                >
                  SL
                </span>
                {editMode && (
                  <button
                    type="button"
                    aria-label="Change avatar"
                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl"
                    style={{
                      background: 'var(--hm-bg-elev)',
                      border: `2px solid var(--hm-bg-card)`,
                      color: 'var(--hm-text-muted)',
                    }}
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                )}
                {/* Verified badge */}
                <div
                  className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full"
                  style={{
                    background: GREEN,
                    boxShadow: `0 0 10px ${GREEN}88`,
                    border: '2px solid var(--hm-bg-card)',
                  }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: '#0a1a0e' }} />
                </div>
              </div>
            </div>

            {/* Text info — pushed down past avatar */}
            <div className="pt-16">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap mb-1">
                    <h2
                      className="text-[24px] font-bold tracking-tight"
                      style={{ color: 'var(--hm-text)', letterSpacing: '-0.025em' }}
                    >
                      Sarah Lin
                    </h2>
                    <span
                      className="hm-mono px-2 py-0.5 rounded text-[9px] font-bold"
                      style={{
                        background: ACCENT_SOFT,
                        color: ACCENT,
                        border: `1px solid ${ACCENT}40`,
                        letterSpacing: '0.12em',
                      }}
                    >
                      CREATOR
                    </span>
                    <span
                      className="hm-mono px-2 py-0.5 rounded text-[9px] font-bold"
                      style={{
                        background: 'rgba(91,200,197,0.12)',
                        color: TEAL,
                        border: `1px solid ${TEAL}40`,
                        letterSpacing: '0.12em',
                      }}
                    >
                      EVALUATOR
                    </span>
                  </div>
                  <p className="text-[14px] mb-2" style={{ color: 'var(--hm-text-muted)' }}>
                    Watercolor educator & illustrator · MFA Fine Arts
                  </p>
                  <div
                    className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[12px]"
                    style={{ color: 'var(--hm-text-dim)' }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="h-3 w-3" />
                      sarah@hypermind.io
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      San Francisco, CA
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Globe className="h-3 w-3" />
                      sarahlin.studio
                    </span>
                  </div>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-2 mt-1">
                  {[
                    {
                      Icon: Twitter,
                      label: 'Twitter',
                      color: '#1da1f2',
                      bg: 'rgba(29,161,242,0.10)',
                    },
                    { Icon: Youtube, label: 'YouTube', color: '#ff0000', bg: 'rgba(255,0,0,0.10)' },
                    {
                      Icon: Instagram,
                      label: 'Instagram',
                      color: '#e1306c',
                      bg: 'rgba(225,48,108,0.10)',
                    },
                    { Icon: Globe, label: 'Website', color: VIOLET, bg: VIOLET_SOFT },
                  ].map(({ Icon, label, color, bg }) => (
                    <a
                      key={label}
                      href="#"
                      title={label}
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-all"
                      style={{ background: bg, border: `1px solid ${color}30`, color }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-4" style={{ borderTop: '1px solid var(--hm-border)' }}>
            {[
              { Icon: BookOpen, value: '7', label: 'Courses', color: ACCENT },
              { Icon: Users, value: '4,240', label: 'Learners', color: VIOLET },
              { Icon: Star, value: '4.9', label: 'Avg rating', color: ACCENT },
              { Icon: Award, value: '9 yrs', label: 'Teaching', color: GREEN },
            ].map(({ Icon, value, label, color }, i) => (
              <div
                key={label}
                className="flex items-center gap-3 px-5 py-3.5"
                style={{ borderRight: i < 3 ? '1px solid var(--hm-border)' : 'none' }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                >
                  <Icon className="h-4 w-4" style={{ color }} />
                </span>
                <div>
                  <p
                    className="text-[18px] font-bold leading-none mb-0.5"
                    style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
                  >
                    {value}
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* LEFT col (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* About / Bio */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <h3
              className="text-[15px] font-bold mb-3"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
            >
              About
            </h3>
            {editMode ? (
              <Textarea
                rows={5}
                defaultValue="Painter, watercolor educator and former architect. I've been teaching for nine years and run a small studio in the Mission. My courses focus on slow, observational watercolor — botanical studies, plein-air sketching and the four basic washes."
              />
            ) : (
              <p
                className="text-[13.5px] leading-relaxed mb-4"
                style={{ color: 'var(--hm-text-muted)' }}
              >
                Painter, watercolor educator and former architect. I've been teaching for nine years
                and run a small studio in the Mission District, San Francisco. My courses focus on
                slow, observational watercolor — botanical studies, plein-air sketching and the four
                basic wash techniques.
                <br />
                <br />I believe anyone can learn to paint with patience and the right foundation.
                Whether you're picking up a brush for the first time or looking to refine your
                technique, my structured curriculum will take you from hesitant mark-making to
                confident compositions.
              </p>
            )}
            {!editMode && (
              <>
                <p
                  className="hm-mono text-[9.5px] mb-2.5 font-bold tracking-[0.12em]"
                  style={{ color: 'var(--hm-text-dim)' }}
                >
                  AREAS OF EXPERTISE
                </p>
                <div className="flex flex-wrap gap-2">
                  {EXPERTISE.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-[12px] font-medium"
                      style={{
                        background: ACCENT_SOFT,
                        color: ACCENT,
                        border: `1px solid ${ACCENT}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Featured courses */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: '1px solid var(--hm-border)' }}
            >
              <div>
                <p
                  className="hm-mono text-[9.5px] mb-0.5"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.14em' }}
                >
                  TEACHING
                </p>
                <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Featured courses
                </h3>
              </div>
              <a
                href="#"
                className="flex items-center gap-1 text-[12px] font-medium transition-colors"
                style={{ color: VIOLET }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                View all 7 <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-3 divide-x" style={{ borderColor: 'var(--hm-border)' }}>
              {FEATURED_COURSES.map((c, i) => (
                <div
                  key={c.title}
                  className="p-4"
                  style={{ borderLeft: i > 0 ? '1px solid var(--hm-border)' : 'none' }}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-20 rounded-xl mb-3 flex items-center justify-center overflow-hidden relative"
                    style={{
                      background: `linear-gradient(135deg, ${c.color}18, ${VIOLET}12)`,
                      border: `1px solid ${c.color}22`,
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 160 80">
                      <circle cx="130" cy="15" r="40" fill={c.color} fillOpacity="0.4" />
                      <circle cx="20" cy="65" r="28" fill={VIOLET} fillOpacity="0.3" />
                    </svg>
                    <span className="relative text-2xl">{c.icon}</span>
                  </div>
                  <p
                    className="text-[12.5px] font-semibold mb-1 leading-snug"
                    style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
                  >
                    {c.title}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="hm-mono text-[9px]" style={{ color: c.color }}>
                      ★ {c.rating}
                    </span>
                    <span className="hm-mono text-[9px]" style={{ color: 'var(--hm-text-dim)' }}>
                      ·
                    </span>
                    <span className="hm-mono text-[9px]" style={{ color: 'var(--hm-text-dim)' }}>
                      {c.students.toLocaleString()} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="hm-mono text-[9px]" style={{ color: 'var(--hm-text-dim)' }}>
                      <Layers className="inline h-2.5 w-2.5 mr-1" />
                      {c.lessons} lessons
                    </span>
                    <a href="#" className="text-[11px] font-semibold" style={{ color: VIOLET }}>
                      View →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit form — only in edit mode */}
          {editMode && (
            <>
              <SectionCard eyebrow="Identity" title="Basic info">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                  <Field label="Full name" required>
                    <TextInput defaultValue="Sarah Lin" />
                  </Field>
                  <Field label="Display name" hint="Shown on courses and reviews.">
                    <TextInput defaultValue="Sarah Lin" />
                  </Field>
                  <Field label="Email" required>
                    <TextInput mono defaultValue="sarah@hypermind.io" />
                  </Field>
                  <Field label="Location">
                    <TextInput defaultValue="San Francisco, CA" />
                  </Field>
                  <Field label="Timezone">
                    <TextInput mono defaultValue="America/Los_Angeles (UTC-08:00)" />
                  </Field>
                  <Field label="Language">
                    <TextInput defaultValue="English" />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard eyebrow="Web presence" title="Social links">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                  <Field label="Website">
                    <TextInput leadingIcon={Globe} defaultValue="sarahlin.studio" />
                  </Field>
                  <Field label="X / Twitter">
                    <TextInput leadingIcon={Twitter} defaultValue="@sarahlin" />
                  </Field>
                  <Field label="YouTube">
                    <TextInput leadingIcon={Youtube} defaultValue="@sarahlinwatercolor" />
                  </Field>
                  <Field label="Instagram">
                    <TextInput leadingIcon={Instagram} defaultValue="@sarah.paints" />
                  </Field>
                </div>
              </SectionCard>
            </>
          )}
        </div>

        {/* RIGHT col (1/3) */}
        <div className="flex flex-col gap-4">
          {/* Credentials */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <h3 className="text-[14px] font-semibold mb-3.5" style={{ color: 'var(--hm-text)' }}>
              Credentials
            </h3>
            <div className="flex flex-col gap-3">
              {CREDENTIALS.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0 mt-0.5"
                    style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT}30` }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  </span>
                  <div>
                    <p
                      className="text-[12.5px] font-semibold leading-tight"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {label}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <h3 className="text-[14px] font-semibold mb-3" style={{ color: 'var(--hm-text)' }}>
              Teaching languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {['English', 'Mandarin'].map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-medium"
                  style={{
                    background: VIOLET_SOFT,
                    color: VIOLET,
                    border: `1px solid ${VIOLET}25`,
                  }}
                >
                  <Globe className="h-3 w-3" />
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Verification */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <h3 className="text-[14px] font-semibold mb-3" style={{ color: 'var(--hm-text)' }}>
              Trust & verification
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Email verified', status: 'VERIFIED', color: GREEN },
                { label: 'Identity verified', status: 'VERIFIED', color: GREEN },
                { label: 'Payout method', status: 'CONFIGURED', color: ACCENT },
                { label: 'Phone verified', status: 'PENDING', color: 'var(--hm-text-dim)' },
              ].map(({ label, status, color }) => (
                <div key={label} className="flex items-center justify-between text-[12px]">
                  <span style={{ color: 'var(--hm-text-muted)' }}>{label}</span>
                  <span
                    className="hm-mono text-[9.5px] font-semibold"
                    style={{ color, letterSpacing: '0.06em' }}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visibility */}
          {editMode && (
            <SectionCard eyebrow="Visibility" title="Public profile">
              <div className="flex flex-col gap-2.5">
                <Toggle defaultChecked label="Show profile to visitors" />
                <Toggle defaultChecked label="Allow learner messages" />
                <Toggle defaultChecked={false} label="Show earnings publicly" />
                <Toggle defaultChecked label="List in creator directory" />
              </div>
            </SectionCard>
          )}

          {/* Public profile link */}
          <a
            href="#"
            className="flex items-center justify-center gap-2 rounded-xl py-3 text-[12.5px] font-semibold transition-all"
            style={{
              background: VIOLET_SOFT,
              color: VIOLET,
              border: `1px solid ${VIOLET}30`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${VIOLET}18`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = VIOLET_SOFT
            }}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View public profile
          </a>
        </div>
      </div>
    </CreatorShell>
  )
}
