import { useState } from 'react'
import StudentShell from './StudentShell'
import {
  Bug,
  Lightbulb,
  ThumbsUp,
  AlertCircle,
  HelpCircle,
  Send,
  Paperclip,
  ChevronDown,
  Clock,
} from 'lucide-react'

const TYPES = [
  {
    id: 'bug',
    label: 'Bug report',
    Icon: Bug,
    color: '#F4636E',
    bg: 'rgba(244,99,110,0.10)',
    border: 'rgba(244,99,110,0.25)',
    desc: "Something isn't working as expected",
  },
  {
    id: 'idea',
    label: 'Idea',
    Icon: Lightbulb,
    color: '#7C5CF6',
    bg: 'rgba(124,92,246,0.10)',
    border: 'rgba(124,92,246,0.25)',
    desc: 'Suggest a feature or improvement',
  },
  {
    id: 'praise',
    label: 'Praise',
    Icon: ThumbsUp,
    color: '#5EE6A8',
    bg: 'rgba(94,230,168,0.10)',
    border: 'rgba(94,230,168,0.25)',
    desc: 'Share what you love about HyperMind',
  },
  {
    id: 'complaint',
    label: 'Complaint',
    Icon: AlertCircle,
    color: '#F4B26C',
    bg: 'rgba(244,178,108,0.10)',
    border: 'rgba(244,178,108,0.25)',
    desc: 'Tell us about a frustrating experience',
  },
  {
    id: 'question',
    label: 'Question',
    Icon: HelpCircle,
    color: '#60A5FA',
    bg: 'rgba(96,165,250,0.10)',
    border: 'rgba(96,165,250,0.25)',
    desc: 'Ask something or request clarification',
  },
] as const

type FeedbackType = (typeof TYPES)[number]['id']

const STATUS_TONE: Record<string, { bg: string; color: string; label: string }> = {
  new: { bg: 'rgba(244,99,110,0.12)', color: '#F4636E', label: 'New' },
  in_review: { bg: 'rgba(244,178,108,0.12)', color: '#F4B26C', label: 'In review' },
  responded: { bg: 'rgba(96,165,250,0.12)', color: '#60A5FA', label: 'Responded' },
  closed: { bg: 'rgba(120,120,150,0.12)', color: '#9CA3AF', label: 'Closed' },
}

const TYPE_TONE: Record<string, { bg: string; color: string }> = {
  bug: { bg: 'rgba(244,99,110,0.12)', color: '#F4636E' },
  idea: { bg: 'rgba(124,92,246,0.12)', color: '#7C5CF6' },
  praise: { bg: 'rgba(94,230,168,0.12)', color: '#5EE6A8' },
  complaint: { bg: 'rgba(244,178,108,0.12)', color: '#F4B26C' },
  question: { bg: 'rgba(96,165,250,0.12)', color: '#60A5FA' },
}

const PAST_FEEDBACK = [
  {
    id: 'fb-011',
    type: 'idea',
    subject: 'Could quizzes show a confidence slider before submit?',
    status: 'in_review',
    date: '3d ago',
  },
  {
    id: 'fb-012',
    type: 'bug',
    subject: 'Video freezes at 04:12 on Cognitive Load lesson.',
    status: 'responded',
    date: '1wk ago',
  },
  {
    id: 'fb-013',
    type: 'question',
    subject: 'How do I export my certificate as a PDF?',
    status: 'closed',
    date: '2wk ago',
  },
]

const COURSES = [
  'None (general feedback)',
  'Watercolor Foundations',
  'Spanish for Travelers',
  'Personal Finance 101',
  'Acoustic Guitar Mastery',
]

export default function StudentFeedback() {
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null)

  return (
    <StudentShell activeTab="">
      <div className="mx-auto max-w-[820px] pt-8 pb-2">
        {/* ── Page header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
              style={{ background: 'var(--hm-grad-primary)', boxShadow: 'var(--hm-glow-violet)' }}
            >
              <Send className="h-4 w-4 text-white" />
            </span>
            <div>
              <h1
                className="text-[22px] font-bold leading-tight"
                style={{ color: 'var(--hm-text)', letterSpacing: '-0.03em' }}
              >
                Send feedback
              </h1>
              <p className="text-[13px]" style={{ color: 'var(--hm-text-muted)' }}>
                Help us make HyperMind better — your input shapes every release.
              </p>
            </div>
          </div>
        </div>

        {/* ── Form card ── */}
        <div
          className="rounded-2xl p-7"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border-strong)' }}
        >
          {/* Type selector */}
          <div className="mb-6">
            <label
              className="hm-mono text-[10px] font-bold tracking-[0.12em] mb-3 block"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              FEEDBACK TYPE <span style={{ color: '#F4636E' }}>*</span>
            </label>
            <div className="grid grid-cols-5 gap-2.5">
              {TYPES.map((t) => {
                const active = selectedType === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className="flex flex-col items-center gap-2 rounded-xl p-3.5 text-center transition-all"
                    style={{
                      background: active ? t.bg : 'var(--hm-bg-card-2)',
                      border: active ? `1.5px solid ${t.border}` : '1.5px solid var(--hm-border)',
                      boxShadow: active ? `0 0 0 3px ${t.bg}` : 'none',
                    }}
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: t.bg, border: `1px solid ${t.border}` }}
                    >
                      <t.Icon className="h-4 w-4" style={{ color: t.color }} />
                    </span>
                    <span
                      className="text-[12px] font-semibold leading-tight"
                      style={{ color: active ? t.color : 'var(--hm-text)' }}
                    >
                      {t.label}
                    </span>
                    <span
                      className="text-[10.5px] leading-tight hidden sm:block"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      {t.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Subject */}
          <div className="mb-5">
            <label
              className="hm-mono text-[10px] font-bold tracking-[0.12em] mb-2 block"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              SUBJECT <span style={{ color: '#F4636E' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Summarise your feedback in one line…"
              className="w-full rounded-xl px-4 py-3 text-[14px] transition-colors outline-none"
              defaultValue=""
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border-strong)',
                color: 'var(--hm-text)',
              }}
            />
          </div>

          {/* Message */}
          <div className="mb-5">
            <label
              className="hm-mono text-[10px] font-bold tracking-[0.12em] mb-2 block"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              DETAILS
            </label>
            <textarea
              placeholder="Describe the issue, idea, or experience in as much detail as you like…"
              rows={5}
              className="w-full rounded-xl px-4 py-3 text-[14px] transition-colors outline-none resize-none"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border-strong)',
                color: 'var(--hm-text)',
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* Related course + attachment row */}
          <div className="mb-7 grid grid-cols-2 gap-4">
            {/* Related course */}
            <div>
              <label
                className="hm-mono text-[10px] font-bold tracking-[0.12em] mb-2 block"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                RELATED COURSE{' '}
                <span style={{ color: 'var(--hm-text-dim)', fontWeight: 400 }}>(optional)</span>
              </label>
              <div className="relative">
                <select
                  className="w-full rounded-xl px-4 py-3 text-[13.5px] outline-none appearance-none"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border-strong)',
                    color: 'var(--hm-text)',
                  }}
                >
                  {COURSES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                  style={{ color: 'var(--hm-text-dim)' }}
                />
              </div>
            </div>

            {/* Attachment */}
            <div>
              <label
                className="hm-mono text-[10px] font-bold tracking-[0.12em] mb-2 block"
                style={{ color: 'var(--hm-text-dim)' }}
              >
                ATTACHMENT{' '}
                <span style={{ color: 'var(--hm-text-dim)', fontWeight: 400 }}>(optional)</span>
              </label>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13.5px] font-medium transition-all"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px dashed var(--hm-border-strong)',
                  color: 'var(--hm-text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--hm-violet-soft)'
                  e.currentTarget.style.borderColor = 'var(--hm-border-accent)'
                  e.currentTarget.style.color = 'var(--hm-violet-2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--hm-bg-card-2)'
                  e.currentTarget.style.borderColor = 'var(--hm-border-strong)'
                  e.currentTarget.style.color = 'var(--hm-text-muted)'
                }}
              >
                <Paperclip className="h-4 w-4" />
                Click to attach a screenshot
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <p className="text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
              We read every submission. Our team typically responds within 48 hours.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-[13.5px] font-semibold transition-all"
              style={{
                background: 'var(--hm-grad-primary)',
                color: '#fff',
                boxShadow: 'var(--hm-glow-violet)',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Send className="h-3.5 w-3.5" />
              Submit feedback
            </button>
          </div>
        </div>

        {/* ── Past submissions ── */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-[15px] font-bold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
            >
              Your past submissions
            </h2>
            <span className="hm-mono text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
              3 items
            </span>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--hm-border-strong)' }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    borderBottom: '1px solid var(--hm-border)',
                  }}
                >
                  {['Type', 'Subject', 'Status', 'Submitted'].map((h, i) => (
                    <th
                      key={h}
                      className="hm-mono px-4 py-3 text-left text-[10px] font-bold tracking-[0.10em]"
                      style={{
                        color: 'var(--hm-text-dim)',
                        textAlign: i === 3 ? 'right' : 'left',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PAST_FEEDBACK.map((row, idx) => {
                  const typeTone = TYPE_TONE[row.type]
                  const statusTone = STATUS_TONE[row.status]
                  return (
                    <tr
                      key={row.id}
                      style={{
                        borderTop: idx === 0 ? 'none' : '1px solid var(--hm-border)',
                        background: 'var(--hm-bg-card)',
                      }}
                    >
                      <td className="px-4 py-3.5">
                        <span
                          className="hm-mono inline-flex items-center rounded px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide"
                          style={{ background: typeTone.bg, color: typeTone.color }}
                        >
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-[13px]" style={{ color: 'var(--hm-text)' }}>
                          {row.subject}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className="hm-mono inline-flex items-center rounded px-2 py-0.5 text-[10.5px] font-semibold"
                          style={{ background: statusTone.bg, color: statusTone.color }}
                        >
                          {statusTone.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span
                          className="hm-mono inline-flex items-center gap-1.5 text-[11px]"
                          style={{ color: 'var(--hm-text-dim)' }}
                        >
                          <Clock className="h-3 w-3" />
                          {row.date}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StudentShell>
  )
}
