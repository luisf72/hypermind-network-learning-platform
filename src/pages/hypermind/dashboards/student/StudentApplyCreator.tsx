import { useState } from 'react'
import {
  Palette,
  Check,
  BookOpen,
  Award,
  Coins,
  Zap,
  Youtube,
  Linkedin,
  Globe,
  Link2,
  X,
  Upload,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, GREEN, AMBER } from './StudentShell'

const TEAL = '#5BC8C5'

const ALL_TOPICS = [
  'Music',
  'Guitar',
  'Piano',
  'Singing',
  'Drums',
  'Finance',
  'Investing',
  'Personal Finance',
  'Accounting',
  'Tech & Coding',
  'Python',
  'JavaScript',
  'Machine Learning',
  'Web Development',
  'Languages',
  'Spanish',
  'French',
  'Japanese',
  'Mandarin',
  'Photography',
  'Lightroom',
  'Filmmaking',
  'Video Editing',
  'Cooking',
  'Baking',
  'Nutrition',
  'Arts & Crafts',
  'Drawing',
  'Painting',
  'Graphic Design',
  'UX Design',
  'Business',
  'Marketing',
  'Entrepreneurship',
  'Leadership',
  'Health & Fitness',
  'Yoga',
  'Strength Training',
  'Academics',
  'Mathematics',
  'Physics',
  'History',
  'Personal Growth',
  'Mindfulness',
  'Public Speaking',
]

const BENEFITS = [
  {
    Icon: Coins,
    color: AMBER,
    label: 'Earn 80% revenue share',
    desc: 'Keep 80% of every enrolment on your courses.',
  },
  {
    Icon: Zap,
    color: VIOLET,
    label: 'HMN token rewards',
    desc: 'Earn HMN tokens for every learner milestone.',
  },
  {
    Icon: Award,
    color: TEAL,
    label: 'Creator certificate',
    desc: 'Mint a verifiable on-chain Creator credential.',
  },
  {
    Icon: TrendingUp,
    color: GREEN,
    label: 'Analytics dashboard',
    desc: 'See learner progress, ratings, and revenue live.',
  },
  {
    Icon: Users,
    color: '#60A5FA',
    label: 'Grow your audience',
    desc: "Access HyperMind's 2.4M learners worldwide.",
  },
  {
    Icon: Sparkles,
    color: '#F4636E',
    label: 'Karma ×2.0 multiplier',
    desc: 'Studio plan members earn double karma on interactions.',
  },
]

export default function StudentApplyCreator() {
  const [displayName, setDisplayName] = useState('Jordan Reyes')
  const [tagline, setTagline] = useState('')
  const [bio, setBio] = useState('')
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Music', 'Guitar'])
  const [ytLink, setYtLink] = useState('')
  const [liLink, setLiLink] = useState('')
  const [siteLink, setSiteLink] = useState('')
  const [sampleTitle, setSampleTitle] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [topicSearch, setTopicSearch] = useState('')

  const toggleTopic = (t: string) =>
    setSelectedTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const filteredTopics = ALL_TOPICS.filter((t) =>
    t.toLowerCase().includes(topicSearch.toLowerCase())
  )

  /* ── Success screen ── */
  if (submitted) {
    return (
      <StudentShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
          <div
            className="relative flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: `${GREEN}18`,
              border: `2px solid ${GREEN}55`,
              boxShadow: `0 0 32px ${GREEN}44`,
            }}
          >
            <Check className="h-9 w-9" style={{ color: GREEN }} />
          </div>
          <div>
            <h2
              className="text-[26px] font-bold mb-2"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
            >
              Application submitted!
            </h2>
            <p
              className="text-[14px] max-w-md"
              style={{ color: 'var(--hm-text-muted)', lineHeight: 1.6 }}
            >
              Your creator application is now under review. The HyperMind team will respond within
              2–3 business days. You'll get a notification once a decision is made.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="h-10 px-5 rounded-lg text-[13px] font-medium"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              Edit application
            </button>
            <button
              type="button"
              className="h-10 px-6 rounded-lg text-[13px] font-semibold"
              style={{ background: VIOLET, color: 'white' }}
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </StudentShell>
    )
  }

  return (
    <StudentShell>
      {/* Page header */}
      <div className="mb-6">
        <p className="hm-mono text-[10px] mb-2" style={{ color: VIOLET, letterSpacing: '0.2em' }}>
          ACCOUNT
        </p>
        <h1
          className="text-[26px] font-bold tracking-tight"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
        >
          Apply to become a Creator
        </h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
          Share your expertise with 2.4M learners and earn revenue, HMN tokens, and on-chain
          credentials.
        </p>
      </div>

      {/* Benefits strip */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {BENEFITS.map((b) => (
          <div
            key={b.label}
            className="rounded-xl p-4 flex items-start gap-3"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: `${b.color}18`, color: b.color }}
            >
              <b.Icon className="h-4 w-4" />
            </span>
            <div>
              <p
                className="text-[12.5px] font-semibold leading-tight"
                style={{ color: 'var(--hm-text)' }}
              >
                {b.label}
              </p>
              <p
                className="text-[11px] mt-0.5"
                style={{ color: 'var(--hm-text-dim)', lineHeight: 1.4 }}
              >
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {/* ── Section 1: Identity ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          <div
            className="flex items-center gap-3 px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--hm-border)' }}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: VIOLET_SOFT, color: VIOLET }}
            >
              <GraduationCap className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
              Creator identity
            </h2>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            <div>
              <label
                className="hm-mono text-[10px] mb-1.5 block"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                DISPLAY NAME
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full h-9 px-3 rounded-lg text-[13px]"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label
                className="hm-mono text-[10px] mb-1.5 block"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                CREATOR TAGLINE
              </label>
              <input
                type="text"
                placeholder="e.g. Guitar teacher & Berklee graduate"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full h-9 px-3 rounded-lg text-[13px]"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                  outline: 'none',
                }}
              />
            </div>
            <div className="col-span-2">
              <label
                className="hm-mono text-[10px] mb-1.5 block"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                TEACHING BIO
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your background, teaching experience, and why you want to create content on HyperMind…"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-[13px] resize-none"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                  outline: 'none',
                  lineHeight: 1.55,
                }}
              />
              <p className="hm-mono text-[10px] mt-1" style={{ color: 'var(--hm-text-dim)' }}>
                {bio.length}/600 characters · minimum 100
              </p>
            </div>
          </div>
        </div>

        {/* ── Section 2: Topics ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          <div
            className="flex items-center gap-3 px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--hm-border)' }}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: VIOLET_SOFT, color: VIOLET }}
            >
              <BookOpen className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
              Teaching topics
            </h2>
            <span className="hm-mono text-[11px] ml-1" style={{ color: 'var(--hm-text-dim)' }}>
              · select up to 5
            </span>
            {selectedTopics.length > 0 && (
              <span
                className="hm-mono ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{ background: VIOLET_SOFT, color: VIOLET, border: `1px solid ${VIOLET}40` }}
              >
                {selectedTopics.length} selected
              </span>
            )}
          </div>
          <div className="p-5">
            {selectedTopics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedTopics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTopic(t)}
                    className="inline-flex items-center gap-1.5 rounded-full pl-3 pr-2 py-1 text-[12px] font-medium"
                    style={{
                      background: VIOLET_SOFT,
                      color: VIOLET,
                      border: `1px solid ${VIOLET}55`,
                    }}
                  >
                    {t}
                    <span
                      className="flex h-3.5 w-3.5 items-center justify-center rounded-full"
                      style={{ background: `${VIOLET}33` }}
                    >
                      <X className="h-2.5 w-2.5" />
                    </span>
                  </button>
                ))}
              </div>
            )}
            <input
              type="text"
              placeholder="Search topics…"
              value={topicSearch}
              onChange={(e) => setTopicSearch(e.target.value)}
              className="w-full h-8 px-3 rounded-lg text-[12.5px] mb-3"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
                outline: 'none',
              }}
            />
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
              {filteredTopics.map((t) => {
                const sel = selectedTopics.includes(t)
                const disabled = !sel && selectedTopics.length >= 5
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => !disabled && toggleTopic(t)}
                    className="rounded-full px-3 py-1 text-[12px] font-medium transition-all"
                    style={{
                      background: sel ? VIOLET_SOFT : 'var(--hm-bg-card-2)',
                      color: sel
                        ? VIOLET
                        : disabled
                          ? 'var(--hm-text-dim)'
                          : 'var(--hm-text-muted)',
                      border: `1px solid ${sel ? `${VIOLET}55` : 'var(--hm-border)'}`,
                      opacity: disabled ? 0.45 : 1,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {sel ? '✓ ' : ''}
                    {t}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Section 3: Links ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          <div
            className="flex items-center gap-3 px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--hm-border)' }}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: VIOLET_SOFT, color: VIOLET }}
            >
              <Link2 className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
              Links &amp; portfolio
            </h2>
            <span className="hm-mono text-[11px] ml-1" style={{ color: 'var(--hm-text-dim)' }}>
              · optional
            </span>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            {[
              {
                Icon: Youtube,
                label: 'YOUTUBE CHANNEL',
                placeholder: 'youtube.com/@your-channel',
                value: ytLink,
                set: setYtLink,
                color: '#FF4444',
              },
              {
                Icon: Linkedin,
                label: 'LINKEDIN PROFILE',
                placeholder: 'linkedin.com/in/your-name',
                value: liLink,
                set: setLiLink,
                color: '#0A66C2',
              },
              {
                Icon: Globe,
                label: 'PERSONAL WEBSITE',
                placeholder: 'yoursite.com',
                value: siteLink,
                set: setSiteLink,
                color: VIOLET,
              },
            ].map((f) => (
              <div key={f.label}>
                <label
                  className="hm-mono text-[10px] mb-1.5 flex items-center gap-1.5"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
                >
                  <f.Icon className="h-3 w-3" style={{ color: f.color }} />
                  {f.label}
                </label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg text-[13px]"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    color: 'var(--hm-text)',
                    outline: 'none',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 4: Sample course ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
        >
          <div
            className="flex items-center gap-3 px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--hm-border)' }}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: `${AMBER}18`, color: AMBER }}
            >
              <Star className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
              Sample course idea
            </h2>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                className="hm-mono text-[10px] mb-1.5 block"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                PROPOSED COURSE TITLE
              </label>
              <input
                type="text"
                placeholder="e.g. Acoustic Guitar: Zero to Fingerstyle in 30 Days"
                value={sampleTitle}
                onChange={(e) => setSampleTitle(e.target.value)}
                className="w-full h-9 px-3 rounded-lg text-[13px]"
                style={{
                  background: 'var(--hm-bg-card-2)',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text)',
                  outline: 'none',
                }}
              />
            </div>
            <div className="col-span-2">
              <label
                className="hm-mono text-[10px] mb-1.5 block"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
              >
                SAMPLE CONTENT{' '}
                <span style={{ color: 'var(--hm-text-dim)', fontWeight: 400 }}>
                  — video, slides or outline (optional)
                </span>
              </label>
              <div
                className="flex flex-col items-center justify-center gap-3 rounded-xl py-8"
                style={{ background: 'var(--hm-bg-card-2)', border: `2px dashed var(--hm-border)` }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: VIOLET_SOFT, color: VIOLET }}
                >
                  <Upload className="h-5 w-5" />
                </span>
                <div className="text-center">
                  <p className="text-[13px] font-medium" style={{ color: 'var(--hm-text)' }}>
                    Drop files here or{' '}
                    <span style={{ color: VIOLET, textDecoration: 'underline', cursor: 'pointer' }}>
                      browse
                    </span>
                  </p>
                  <p className="hm-mono text-[10.5px] mt-1" style={{ color: 'var(--hm-text-dim)' }}>
                    MP4, PDF, PPTX · max 50 MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Submit ── */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: `linear-gradient(135deg,${VIOLET}10 0%,rgba(124,92,246,0.04) 100%)`,
            border: `1px solid ${VIOLET}30`,
          }}
        >
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-[14px] font-semibold mb-1" style={{ color: 'var(--hm-text)' }}>
                Ready to apply?
              </p>
              <p className="text-[12.5px]" style={{ color: 'var(--hm-text-muted)' }}>
                Your application will be reviewed within 2–3 business days. Make sure your bio and
                at least one topic are filled in.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl text-[14px] font-semibold shrink-0"
              style={{
                background: `linear-gradient(135deg,${VIOLET},#9A78FF)`,
                color: 'white',
                boxShadow: `0 8px 24px -8px ${VIOLET}66`,
              }}
            >
              <Palette className="h-4 w-4" />
              Submit application
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </StudentShell>
  )
}
