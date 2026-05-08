import AdminShell from '../_shared/AdminShell'
import { Pill, Mono, type Tone } from '../_shared/AdminTable'
import { Field, FieldGrid, TextInput, Textarea, Select, Toggle } from '../_shared/AdminModal'
import {
  ArrowLeft,
  GraduationCap,
  X,
  Save,
  Plus,
  GripVertical,
  Eye,
  CheckCircle2,
  ListChecks,
  AlignLeft,
  ToggleLeft,
  Activity as ActivityIcon,
  TrendingUp,
  Target,
  Clock as ClockIcon,
  Trash2,
  MoreHorizontal,
} from 'lucide-react'

const ACCENT = '#F4636E'

/* ── Demo assessment ───────────────────────────────────────────────── */

const ASSESSMENT = {
  id: 'as-02',
  title: 'Working Memory Quiz',
  type: 'lesson_quiz' as 'lesson_quiz' | 'course_final' | 'standalone',
  skill_category: 'Cognition',
  difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
  status: 'published' as 'draft' | 'review' | 'published' | 'archived',
  passing_score: 60,
  time_limit_minutes: 10,
  max_attempts: 5,
  question_pool_size: 20,
  course_link: 'Cognitive Load Mastery',
  instructions:
    'Answer all questions within the 10-minute window. You can flag items to revisit and review them once before submitting. Pass at 60% or above to unlock the next lesson.',
  attempts: 3284,
  pass_rate: 78,
  avg_score: 72,
  avg_time_seconds: 384,
}

const TYPE_TONE: Record<string, Tone> = {
  lesson_quiz: 'amber',
  course_final: 'violet',
  standalone: 'info',
}
const STATUS_TONE: Record<string, Tone> = {
  published: 'success',
  review: 'warning',
  draft: 'neutral',
  archived: 'danger',
}
const DIFFICULTY_TONE: Record<string, Tone> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
}

const TYPE_OPTIONS = [
  { value: 'lesson_quiz', label: 'Lesson quiz — within a lesson' },
  { value: 'course_final', label: 'Course final — gates completion' },
  { value: 'standalone', label: 'Standalone — independent diagnostic' },
]
const SKILL_OPTIONS = [
  { value: 'Memory', label: 'Memory' },
  { value: 'Cognition', label: 'Cognition' },
  { value: 'Attention', label: 'Attention' },
  { value: 'Reasoning', label: 'Reasoning' },
  { value: 'Communication', label: 'Communication' },
  { value: 'Productivity', label: 'Productivity' },
]
const DIFFICULTY_OPTIONS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]
const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In review' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]
const COURSE_OPTIONS = [
  { value: 'Cognitive Load Mastery', label: 'Cognitive Load Mastery' },
  { value: 'Foundations of Active Recall', label: 'Foundations of Active Recall' },
  { value: 'Spaced Repetition Engineering', label: 'Spaced Repetition Engineering' },
  { value: 'Deep Work Habits', label: 'Deep Work Habits' },
  { value: '—', label: 'Not linked to a course' },
]

interface Question {
  order: number
  prompt: string
  type: 'multiple_choice' | 'single_choice' | 'short_answer' | 'true_false'
  points: number
}
const QUESTIONS: Question[] = [
  {
    order: 1,
    prompt: 'Roughly how many items can working memory hold at once?',
    type: 'single_choice',
    points: 5,
  },
  {
    order: 2,
    prompt: 'Select every statement that describes intrinsic cognitive load.',
    type: 'multiple_choice',
    points: 10,
  },
  {
    order: 3,
    prompt: 'Working memory and long-term memory share the same capacity limits.',
    type: 'true_false',
    points: 3,
  },
  { order: 4, prompt: "Define 'chunking' in 1–2 sentences.", type: 'short_answer', points: 8 },
  {
    order: 5,
    prompt: 'Which of these visual layouts most reduces extraneous load for a worked example?',
    type: 'single_choice',
    points: 5,
  },
  {
    order: 6,
    prompt: 'List two strategies a teacher can use to free working-memory capacity in class.',
    type: 'short_answer',
    points: 10,
  },
]

const questionTypeIcon = (t: Question['type']) =>
  t === 'multiple_choice'
    ? ListChecks
    : t === 'single_choice'
      ? CheckCircle2
      : t === 'short_answer'
        ? AlignLeft
        : ToggleLeft
const questionTypeLabel = (t: Question['type']) => t.replace('_', ' ')
const questionTypeTone = (t: Question['type']): Tone =>
  t === 'multiple_choice'
    ? 'violet'
    : t === 'single_choice'
      ? 'info'
      : t === 'short_answer'
        ? 'amber'
        : 'teal'

/* ── Sub-components ──────────────────────────────────────────────── */

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

function fmtTime(s: number) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return r ? `${m}m ${r}s` : `${m}m`
}

/* ── Page ────────────────────────────────────────────────────────── */

export default function AssessmentDetail() {
  const a = ASSESSMENT
  const totalPoints = QUESTIONS.reduce((sum, q) => sum + q.points, 0)

  return (
    <AdminShell activeId="assessments">
      {/* ── Breadcrumb / back link ─────────────────────────────── */}
      <div className="mb-4">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-[12px] hover:opacity-80"
          style={{ color: 'var(--hm-text-muted)' }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="hm-mono" style={{ letterSpacing: '0.08em' }}>
            ASSESSMENTS
          </span>
          <span style={{ color: 'var(--hm-text-dim)' }}>/</span>
          <span style={{ color: 'var(--hm-text-dim)' }}>#{a.id}</span>
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
            background: `radial-gradient(circle at 100% 0%, ${ACCENT}26 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(244,178,108,0.18) 0%, transparent 60%)`,
          }}
        />
        <div className="relative flex items-start gap-5 px-6 py-5">
          {/* Assessment icon */}
          <span
            className="flex h-16 w-16 items-center justify-center rounded-2xl shrink-0"
            style={{
              background: 'linear-gradient(180deg, #F4B26C 0%, #E58F3F 100%)',
              color: 'white',
              boxShadow: '0 12px 30px -10px rgba(244,178,108,0.5)',
            }}
          >
            <GraduationCap className="h-7 w-7" />
          </span>

          {/* Identity */}
          <div className="min-w-0 flex-1">
            <p
              className="hm-mono text-[10px] mb-1"
              style={{ color: ACCENT, letterSpacing: '0.18em' }}
            >
              EDIT ASSESSMENT · #{a.id.toUpperCase()}
            </p>
            <h1
              className="text-[24px] font-semibold tracking-tight mb-1.5 truncate"
              style={{ color: 'var(--hm-text)', fontFamily: 'var(--hm-font-display)' }}
            >
              {a.title}
            </h1>
            <div
              className="flex items-center flex-wrap gap-x-4 gap-y-1.5 text-[12px]"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              <span>{a.skill_category}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <ListChecks className="h-3.5 w-3.5" />
                {QUESTIONS.length} questions · {totalPoints} pts
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="h-3.5 w-3.5" />
                {a.time_limit_minutes} min
              </span>
              <span>·</span>
              <span>
                linked to <span style={{ color: 'var(--hm-text)' }}>{a.course_link}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <Pill tone={STATUS_TONE[a.status]}>{a.status}</Pill>
              <Pill tone={TYPE_TONE[a.type]}>{a.type.replace('_', ' ')}</Pill>
              <Pill tone={DIFFICULTY_TONE[a.difficulty]}>{a.difficulty}</Pill>
              <span
                className="hm-mono text-[10px] ml-1"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
              >
                pass ≥ {a.passing_score}% · {a.max_attempts} attempts
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
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-medium"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
              }}
            >
              <X className="h-3.5 w-3.5" />
              Discard
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{
                background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}d9 100%)`,
                color: 'white',
                boxShadow: `0 8px 24px -8px ${ACCENT}66`,
              }}
            >
              <Save className="h-3.5 w-3.5" />
              Save assessment
            </button>
          </div>
        </div>
      </div>

      {/* ── Stat tiles ─────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <StatTile
          Icon={ActivityIcon}
          tone="#A78BFA"
          label="Attempts"
          value={a.attempts.toLocaleString()}
          hint="last 30 days"
        />
        <StatTile
          Icon={TrendingUp}
          tone="#5EE6A8"
          label="Pass rate"
          value={`${a.pass_rate}%`}
          hint={`pass ≥ ${a.passing_score}%`}
        />
        <StatTile
          Icon={Target}
          tone="#F4B26C"
          label="Avg score"
          value={`${a.avg_score}%`}
          hint={`from ${a.attempts.toLocaleString()} attempts`}
        />
        <StatTile
          Icon={ClockIcon}
          tone="#5BC8C5"
          label="Avg time"
          value={fmtTime(a.avg_time_seconds)}
          hint={`limit ${a.time_limit_minutes}m`}
        />
      </div>

      {/* ── 2-column body (main left · sidebar right) ──────────── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Sidebar — Configuration + Behaviour + Lifecycle + Danger (source-first, visually right via order-2) */}
        <div className="col-span-1 flex flex-col gap-4 order-2">
          <SectionCard eyebrow="Rules" title="Configuration">
            <FieldGrid cols={1}>
              <Field label="Passing score (%)" required>
                <TextInput mono type="number" defaultValue={a.passing_score} placeholder="70" />
              </Field>
              <Field label="Time limit (minutes)" required>
                <TextInput
                  mono
                  type="number"
                  defaultValue={a.time_limit_minutes}
                  placeholder="30"
                />
              </Field>
              <Field label="Max attempts" required hint="0 = unlimited retries.">
                <TextInput mono type="number" defaultValue={a.max_attempts} placeholder="3" />
              </Field>
              <Field label="Question pool size" hint="Drawn at random per attempt.">
                <TextInput
                  mono
                  type="number"
                  defaultValue={a.question_pool_size}
                  placeholder="20"
                />
              </Field>
            </FieldGrid>
          </SectionCard>

          <SectionCard eyebrow="Behaviour" title="Attempt rules">
            <div className="flex flex-col gap-2">
              <Toggle defaultChecked label="Shuffle question order on each attempt" />
              <Toggle defaultChecked={false} label="Show correct answer after submission" />
              <Toggle defaultChecked label="Allow review of past attempts" />
              <Toggle defaultChecked={false} label="Lock-down browser during attempt" />
              <Toggle defaultChecked label="Show score immediately on submit" />
            </div>
          </SectionCard>

          <SectionCard eyebrow="Lifecycle" title="Status & visibility">
            <FieldGrid cols={1}>
              <Field label="Status" required>
                <Select defaultValue={a.status} options={STATUS_OPTIONS} />
              </Field>
              <Field label="Visibility">
                <div className="flex flex-col gap-2">
                  <Toggle defaultChecked label="Visible to enrolled learners" />
                  <Toggle defaultChecked={false} label="Required to complete course" />
                </div>
              </Field>
            </FieldGrid>
          </SectionCard>

          <SectionCard eyebrow="Danger zone" title="Assessment removal">
            <p className="text-[12px] mb-3" style={{ color: 'var(--hm-text-muted)' }}>
              Archiving stops new attempts. Past results are kept for analytics and learner records.
            </p>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 w-full px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{
                background: 'rgba(244,99,110,0.10)',
                border: '1px solid rgba(244,99,110,0.30)',
                color: ACCENT,
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Archive assessment
            </button>
          </SectionCard>
        </div>

        {/* Left (main) — Basic info + Instructions + Questions */}
        <div className="col-span-2 flex flex-col gap-4 order-1">
          <SectionCard eyebrow="Profile" title="Basic info">
            <FieldGrid cols={2}>
              <Field label="Title" required span={2}>
                <TextInput defaultValue={a.title} placeholder="e.g. Working Memory Quiz" />
              </Field>
              <Field label="Type" required>
                <Select defaultValue={a.type} options={TYPE_OPTIONS} />
              </Field>
              <Field label="Skill category" required>
                <Select defaultValue={a.skill_category} options={SKILL_OPTIONS} />
              </Field>
              <Field label="Difficulty" required>
                <Select defaultValue={a.difficulty} options={DIFFICULTY_OPTIONS} />
              </Field>
              <Field label="Linked course" hint="Required for lesson quizzes & finals.">
                <Select defaultValue={a.course_link} options={COURSE_OPTIONS} />
              </Field>
            </FieldGrid>
          </SectionCard>

          <SectionCard eyebrow="Learner-facing" title="Instructions">
            <FieldGrid cols={1}>
              <Field
                label="Instructions"
                hint="Shown before the learner starts. Markdown supported."
              >
                <Textarea rows={4} defaultValue={a.instructions} />
              </Field>
              <Field label="Outcome message — pass" hint="Shown after a successful attempt.">
                <Textarea
                  rows={2}
                  defaultValue={`Nicely done — you've cleared the ${a.passing_score}% bar. The next lesson is now unlocked.`}
                />
              </Field>
              <Field label="Outcome message — retry" hint="Shown after a failed attempt.">
                <Textarea
                  rows={2}
                  defaultValue="Almost there. Review the lesson on chunking, then try again — you have plenty of attempts left."
                />
              </Field>
            </FieldGrid>
          </SectionCard>

          <SectionCard
            eyebrow="Content"
            title="Questions"
            action={
              <div className="flex items-center gap-2">
                <span
                  className="hm-mono text-[10.5px]"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
                >
                  {QUESTIONS.length} · {totalPoints} PTS
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[11.5px] font-medium"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    color: 'var(--hm-text-muted)',
                  }}
                >
                  <Plus className="h-3 w-3" />
                  Add question
                </button>
              </div>
            }
          >
            <ul className="flex flex-col">
              {QUESTIONS.map((q, i) => {
                const Icon = questionTypeIcon(q.type)
                return (
                  <li
                    key={q.order}
                    className="flex items-center gap-3 py-2.5"
                    style={{ borderTop: i === 0 ? 'none' : '1px solid var(--hm-border)' }}
                  >
                    <GripVertical
                      className="h-3.5 w-3.5 shrink-0 cursor-grab"
                      style={{ color: 'var(--hm-text-dim)' }}
                    />
                    <span
                      className="hm-mono text-[10.5px] shrink-0 w-6 text-center"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      Q{String(q.order).padStart(2, '0')}
                    </span>
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                      style={{
                        background:
                          questionTypeTone(q.type) === 'violet'
                            ? 'var(--hm-violet-soft)'
                            : questionTypeTone(q.type) === 'amber'
                              ? 'rgba(244,178,108,0.12)'
                              : questionTypeTone(q.type) === 'teal'
                                ? 'rgba(91,200,197,0.12)'
                                : 'rgba(96,165,250,0.12)',
                        color:
                          questionTypeTone(q.type) === 'violet'
                            ? 'var(--hm-violet-2)'
                            : questionTypeTone(q.type) === 'amber'
                              ? '#F4B26C'
                              : questionTypeTone(q.type) === 'teal'
                                ? '#5BC8C5'
                                : '#60A5FA',
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[12.5px] font-medium truncate"
                        style={{ color: 'var(--hm-text)' }}
                      >
                        {q.prompt}
                      </p>
                      <p
                        className="hm-mono text-[10px]"
                        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                      >
                        {questionTypeLabel(q.type).toUpperCase()}
                      </p>
                    </div>
                    <Mono>{q.points} pts</Mono>
                    <button
                      type="button"
                      aria-label="Question actions"
                      className="flex h-7 w-7 items-center justify-center rounded-md shrink-0"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </SectionCard>
        </div>
      </div>
    </AdminShell>
  )
}
