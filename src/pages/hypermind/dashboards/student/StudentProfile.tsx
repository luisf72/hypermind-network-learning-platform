import { useState } from 'react'
import {
  Camera,
  Save,
  BookOpen,
  Award,
  Clock,
  Star,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Bell,
  Shield,
  ChevronRight,
  CheckCircle2,
  Edit3,
  Lock,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, GREEN, AMBER, BLUE } from './StudentShell'

const TABS = ['Profile', 'Preferences', 'Notifications', 'Security'] as const
type Tab = (typeof TABS)[number]

const LANGUAGES = ['English', 'Spanish', 'Mandarin', 'French', 'German', 'Japanese']
const TOPICS = [
  'Arts & Crafts',
  'Languages',
  'Finance',
  'Music',
  'Lifestyle',
  'Design',
  'Technology',
  'Photography',
  'Cooking',
]

export default function StudentProfile() {
  const [tab, setTab] = useState<Tab>('Profile')
  const [editMode, setEdit] = useState(false)

  return (
    <StudentShell>
      {/* Header */}
      <div className="mb-7">
        <p className="hm-mono text-[10px] mb-2" style={{ color: VIOLET, letterSpacing: '0.2em' }}>
          ACCOUNT
        </p>
        <h1
          className="text-[26px] font-bold tracking-tight"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
        >
          My Profile
        </h1>
      </div>

      {/* Profile hero card */}
      <div
        className="relative overflow-hidden rounded-2xl mb-6 px-6 py-6"
        style={{
          background: 'linear-gradient(135deg, #140f28 0%, #1c1535 60%, #0f1120 100%)',
          border: `1px solid ${VIOLET}30`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 85% 20%, ${VIOLET}22 0%, transparent 55%)`,
          }}
        />
        <div className="relative flex items-center gap-5 flex-wrap">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="h-20 w-20 rounded-2xl flex items-center justify-center hm-mono text-[28px] font-bold"
              style={{
                background: `linear-gradient(135deg, ${VIOLET} 0%, #A78BFA 100%)`,
                color: 'white',
                boxShadow: `0 8px 24px ${VIOLET}44`,
              }}
            >
              JD
            </div>
            <button
              type="button"
              className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full"
              style={{
                background: 'var(--hm-bg-card)',
                border: `2px solid ${VIOLET}`,
                color: VIOLET,
              }}
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2
              className="text-[20px] font-bold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
            >
              Jordan Davis
            </h2>
            <p className="text-[13px] mb-1" style={{ color: 'var(--hm-text-muted)' }}>
              jordan.davis@example.com
            </p>
            <p
              className="hm-mono text-[10px]"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
            >
              Member since January 2025
            </p>
          </div>
          {/* Stats */}
          <div className="flex items-center gap-4 shrink-0 flex-wrap">
            {[
              { label: 'Courses', val: '7', color: VIOLET },
              { label: 'Completed', val: '2', color: GREEN },
              { label: 'Assessments', val: '6', color: BLUE },
              { label: 'Avg score', val: '87%', color: AMBER },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="hm-mono text-[18px] font-bold" style={{ color: 'var(--hm-text)' }}>
                  {s.val}
                </p>
                <p
                  className="hm-mono text-[9px]"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
                >
                  {s.label.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex items-center gap-1 mb-6"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="px-4 pb-3 pt-1 text-[13px] font-medium relative"
            style={{ color: tab === t ? VIOLET : 'var(--hm-text-muted)' }}
          >
            {t}
            {tab === t && (
              <span
                className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                style={{ background: VIOLET }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Profile tab ── */}
      {tab === 'Profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Basic info */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <div
                className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: '1px solid var(--hm-border)' }}
              >
                <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Basic information
                </h3>
                <button
                  type="button"
                  onClick={() => setEdit((e) => !e)}
                  className="inline-flex items-center gap-1.5 px-3 h-7 rounded-lg text-[11.5px] font-medium"
                  style={{
                    background: editMode ? VIOLET : 'var(--hm-bg-card-2)',
                    border: `1px solid ${editMode ? VIOLET + '44' : 'var(--hm-border)'}`,
                    color: editMode ? 'white' : 'var(--hm-text-muted)',
                  }}
                >
                  <Edit3 className="h-3 w-3" /> {editMode ? 'Cancel' : 'Edit'}
                </button>
              </div>
              <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Display name', val: 'Jordan Davis', placeholder: 'Your display name' },
                  { label: 'Username', val: '@jordan.davis', placeholder: '@username' },
                  {
                    label: 'Email address',
                    val: 'jordan@example.com',
                    placeholder: 'Email address',
                  },
                  { label: 'Location', val: 'San Francisco, CA', placeholder: 'City, Country' },
                ].map((f) => (
                  <div key={f.label}>
                    <label
                      className="hm-mono block text-[9.5px] mb-1.5"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
                    >
                      {f.label.toUpperCase()}
                    </label>
                    <input
                      type="text"
                      defaultValue={f.val}
                      placeholder={f.placeholder}
                      disabled={!editMode}
                      className="w-full px-3 h-9 rounded-lg text-[12.5px] outline-none"
                      style={{
                        background: editMode ? 'var(--hm-bg-card-2)' : 'transparent',
                        border: editMode ? '1px solid var(--hm-border)' : '1px solid transparent',
                        color: 'var(--hm-text)',
                        cursor: editMode ? 'text' : 'default',
                      }}
                    />
                  </div>
                ))}
                <div className="col-span-1 sm:col-span-2">
                  <label
                    className="hm-mono block text-[9.5px] mb-1.5"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
                  >
                    BIO
                  </label>
                  <textarea
                    rows={3}
                    disabled={!editMode}
                    defaultValue="Lifelong learner exploring watercolor, language, and finance. Currently on a 12-day streak!"
                    className="w-full px-3 py-2.5 rounded-lg text-[12.5px] outline-none resize-none"
                    style={{
                      background: editMode ? 'var(--hm-bg-card-2)' : 'transparent',
                      border: editMode ? '1px solid var(--hm-border)' : '1px solid transparent',
                      color: 'var(--hm-text)',
                      lineHeight: 1.6,
                      cursor: editMode ? 'text' : 'default',
                    }}
                  />
                </div>
              </div>
              {editMode && (
                <div
                  className="px-5 py-3.5 flex justify-end gap-2"
                  style={{ borderTop: '1px solid var(--hm-border)' }}
                >
                  <button
                    type="button"
                    onClick={() => setEdit(false)}
                    className="px-4 h-9 rounded-lg text-[12.5px] font-medium"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      border: '1px solid var(--hm-border)',
                      color: 'var(--hm-text-muted)',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg text-[12.5px] font-semibold"
                    style={{ background: VIOLET, color: 'white' }}
                  >
                    <Save className="h-3.5 w-3.5" /> Save changes
                  </button>
                </div>
              )}
            </div>

            {/* Social links */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <div className="px-5 py-3.5" style={{ borderBottom: '1px solid var(--hm-border)' }}>
                <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Social links
                </h3>
              </div>
              <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { Icon: Globe, label: 'Website', placeholder: 'https://yoursite.com', val: '' },
                  {
                    Icon: Twitter,
                    label: 'Twitter',
                    placeholder: '@handle',
                    val: '@jordan_learns',
                  },
                  {
                    Icon: Linkedin,
                    label: 'LinkedIn',
                    placeholder: 'linkedin.com/in/handle',
                    val: 'linkedin.com/in/jordandavis',
                  },
                  { Icon: Github, label: 'GitHub', placeholder: 'github.com/handle', val: '' },
                ].map((s) => (
                  <div key={s.label}>
                    <label
                      className="hm-mono block text-[9.5px] mb-1.5"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
                    >
                      {s.label.toUpperCase()}
                    </label>
                    <div className="relative">
                      <s.Icon
                        className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: 'var(--hm-text-dim)' }}
                      />
                      <input
                        type="text"
                        defaultValue={s.val}
                        placeholder={s.placeholder}
                        className="w-full pl-9 pr-3 h-9 rounded-lg text-[12.5px] outline-none"
                        style={{
                          background: 'var(--hm-bg-card-2)',
                          border: '1px solid var(--hm-border)',
                          color: 'var(--hm-text)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Achievements */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <div className="px-4 py-3.5" style={{ borderBottom: '1px solid var(--hm-border)' }}>
                <h3 className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Achievements
                </h3>
              </div>
              <div className="px-4 py-3 flex flex-col gap-2.5">
                {[
                  { icon: '🔥', label: '12-Day Streak', color: AMBER },
                  { icon: '📚', label: '2 Courses Done', color: GREEN },
                  { icon: '⭐', label: 'First 5★ Grade', color: '#F4D35E' },
                  { icon: '🚀', label: 'Fast Learner', color: VIOLET },
                ].map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center gap-3 py-1.5"
                    style={{ borderBottom: '1px solid var(--hm-border)' }}
                  >
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-[12.5px]" style={{ color: 'var(--hm-text)' }}>
                      {a.label}
                    </span>
                    <CheckCircle2 className="h-4 w-4 ml-auto shrink-0" style={{ color: a.color }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <div className="px-4 py-3.5" style={{ borderBottom: '1px solid var(--hm-border)' }}>
                <h3 className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Certificates
                </h3>
              </div>
              <div className="px-4 py-3 flex flex-col gap-2">
                {['Python for Beginners', 'Productivity Masterclass'].map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-2.5 py-1.5"
                    style={{ borderBottom: '1px solid var(--hm-border)' }}
                  >
                    <Award className="h-4 w-4 shrink-0" style={{ color: AMBER }} />
                    <span
                      className="text-[12px] flex-1 leading-snug"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {c}
                    </span>
                    <button
                      type="button"
                      className="text-[11px] font-medium"
                      style={{ color: VIOLET }}
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Preferences tab ── */}
      {tab === 'Preferences' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Language */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="px-5 py-3.5" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Interface language
              </h3>
            </div>
            <div className="px-5 py-4 grid grid-cols-2 gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  type="button"
                  className="flex items-center justify-between px-3 h-9 rounded-lg text-[12.5px]"
                  style={{
                    background: l === 'English' ? VIOLET_SOFT : 'var(--hm-bg-card-2)',
                    border: `1px solid ${l === 'English' ? VIOLET + '44' : 'var(--hm-border)'}`,
                    color: l === 'English' ? VIOLET : 'var(--hm-text-muted)',
                  }}
                >
                  {l}
                  {l === 'English' && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
          {/* Interests */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="px-5 py-3.5" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Learning interests
              </h3>
              <p className="text-[11.5px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                Used to personalise course recommendations
              </p>
            </div>
            <div className="px-5 py-4 flex flex-wrap gap-2">
              {TOPICS.map((t) => {
                const active = ['Arts & Crafts', 'Languages', 'Finance', 'Photography'].includes(t)
                return (
                  <button
                    key={t}
                    type="button"
                    className="hm-mono px-3 h-8 rounded-lg text-[10.5px] font-semibold"
                    style={{
                      background: active ? VIOLET_SOFT : 'var(--hm-bg-card-2)',
                      border: `1px solid ${active ? VIOLET + '44' : 'var(--hm-border)'}`,
                      color: active ? VIOLET : 'var(--hm-text-muted)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {t.toUpperCase()}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Notifications tab ── */}
      {tab === 'Notifications' && (
        <div className="max-w-2xl flex flex-col gap-4">
          {[
            {
              label: 'New lesson available',
              sub: 'Notify me when a new lesson is published in an enrolled course',
              on: true,
            },
            {
              label: 'Assessment reminders',
              sub: 'Remind me 1 day before an assessment is due',
              on: true,
            },
            {
              label: 'Community replies',
              sub: 'Notify me when someone replies to my posts',
              on: true,
            },
            {
              label: 'Weekly progress report',
              sub: 'Send a weekly summary of my learning activity',
              on: false,
            },
            {
              label: 'Promotional & recommended',
              sub: 'New courses and platform announcements',
              on: false,
            },
          ].map((n) => (
            <div
              key={n.label}
              className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <div>
                <p className="text-[13.5px] font-medium mb-0.5" style={{ color: 'var(--hm-text)' }}>
                  {n.label}
                </p>
                <p className="text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
                  {n.sub}
                </p>
              </div>
              <button
                type="button"
                className="relative h-6 w-11 rounded-full shrink-0 transition-colors"
                style={{
                  background: n.on ? VIOLET : 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                }}
              >
                <span
                  className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all"
                  style={{
                    left: n.on ? 'calc(100% - 22px)' : '2px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Security tab ── */}
      {tab === 'Security' && (
        <div className="max-w-2xl flex flex-col gap-4">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <div className="px-5 py-3.5" style={{ borderBottom: '1px solid var(--hm-border)' }}>
              <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                Change password
              </h3>
            </div>
            <div className="px-5 py-5 flex flex-col gap-4">
              {['Current password', 'New password', 'Confirm new password'].map((f) => (
                <div key={f}>
                  <label
                    className="hm-mono block text-[9.5px] mb-1.5"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
                  >
                    {f.toUpperCase()}
                  </label>
                  <div className="relative">
                    <Lock
                      className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: 'var(--hm-text-dim)' }}
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 h-9 rounded-lg text-[12.5px] outline-none"
                      style={{
                        background: 'var(--hm-bg-card-2)',
                        border: '1px solid var(--hm-border)',
                        color: 'var(--hm-text)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div
              className="px-5 py-3.5 flex justify-end"
              style={{ borderTop: '1px solid var(--hm-border)' }}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg text-[12.5px] font-semibold"
                style={{ background: VIOLET, color: 'white' }}
              >
                <Save className="h-3.5 w-3.5" /> Update password
              </button>
            </div>
          </div>
          <div
            className="rounded-2xl px-5 py-4 flex items-center gap-4"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <Shield className="h-5 w-5 shrink-0" style={{ color: GREEN }} />
            <div className="flex-1">
              <p className="text-[13.5px] font-medium mb-0.5" style={{ color: 'var(--hm-text)' }}>
                Two-factor authentication
              </p>
              <p className="text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
                Add an extra layer of security to your account
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 h-8 rounded-lg text-[12px] font-medium shrink-0"
              style={{
                background: 'rgba(94,230,168,0.12)',
                border: '1px solid rgba(94,230,168,0.3)',
                color: GREEN,
              }}
            >
              Enable
            </button>
          </div>
        </div>
      )}
    </StudentShell>
  )
}
