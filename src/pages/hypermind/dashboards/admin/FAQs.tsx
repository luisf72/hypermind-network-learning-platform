import { useState, useRef } from 'react'
import AdminShell from '../_shared/AdminShell'
import AdminModal, { Field, FieldGrid, TextInput, Textarea, Toggle } from '../_shared/AdminModal'
import { Pill } from '../_shared/AdminTable'
import { GripVertical, Plus, Search } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  is_active: boolean
}

const INITIAL: FAQItem[] = [
  {
    id: 'f-01',
    question: "What's included in the Pro plan?",
    answer:
      'Pro includes unlimited access to all published courses, weekly live sessions, unlimited assessment attempts, and priority support.',
    is_active: true,
  },
  {
    id: 'f-02',
    question: 'How do credits work?',
    answer:
      "Credits are the platform's spendable currency. Earn them by completing daily streaks, finishing courses and from referral bonuses. Spend them to unlock paid courses.",
    is_active: true,
  },
  {
    id: 'f-03',
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes — you can cancel at any time from your billing settings. Your access continues until the end of the current billing period.',
    is_active: true,
  },
  {
    id: 'f-04',
    question: "What's the difference between Karma, XP, HMN and Credits?",
    answer:
      'Karma reflects community contribution, XP measures learning progress, HMN is earned from platform contributions, and Credits are spendable on courses.',
    is_active: true,
  },
  {
    id: 'f-05',
    question: 'How do I become an Evaluator?',
    answer:
      'Evaluators are selected from active Creators with strong calibration scores. Apply via the Evaluator Programme link in your creator dashboard.',
    is_active: true,
  },
  {
    id: 'f-06',
    question: 'Are sessions recorded?',
    answer:
      'Most session types support recording. Look for the recording indicator on the session card — recordings are available within 2 hours of the session ending.',
    is_active: true,
  },
  {
    id: 'f-07',
    question: 'How do I report a course or post?',
    answer:
      'Use the three-dot menu on any course card or community post and choose Report. Our moderation team reviews reports within 24 hours.',
    is_active: true,
  },
  {
    id: 'f-08',
    question: 'Can I gift a subscription?',
    answer:
      'Gifting is rolling out in Q3 — join the waitlist in your account settings to be notified when it becomes available.',
    is_active: false,
  },
  {
    id: 'f-09',
    question: 'What happens if I fail an assessment?',
    answer:
      'Most assessments allow up to 3 attempts. After your final attempt a detailed feedback report is available and you can request a re-evaluation from your evaluator.',
    is_active: true,
  },
  {
    id: 'f-10',
    question: 'Is there a refund policy?',
    answer:
      'Annual plans include a 14-day full refund window from the date of purchase. Monthly plans are non-refundable after the billing cycle renews.',
    is_active: true,
  },
]

type ModalState = { mode: 'create' } | { mode: 'edit'; item: FAQItem } | null

export default function FAQs() {
  const [items, setItems] = useState<FAQItem[]>(INITIAL)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>(null)

  /* ── drag state ─────────────────────────────────────────────── */
  const dragIdx = useRef<number | null>(null)
  const overIdx = useRef<number | null>(null)

  function handleDragStart(i: number) {
    dragIdx.current = i
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault()
    overIdx.current = i
  }

  function handleDrop() {
    const from = dragIdx.current
    const to = overIdx.current
    if (from === null || to === null || from === to) return
    setItems((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
    dragIdx.current = null
    overIdx.current = null
  }

  /* ── filtered view (search only — order preserved) ─────────── */
  const q = search.trim().toLowerCase()
  const visible = q
    ? items.filter(
        (it) => it.question.toLowerCase().includes(q) || it.answer.toLowerCase().includes(q)
      )
    : items

  const editing = modal?.mode === 'edit' ? modal.item : null

  return (
    <AdminShell activeId="faqs">
      {/* ── Page header ───────────────────────────────────────── */}
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <p
            className="hm-mono text-[10.5px] mb-2"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
          >
            ENGAGEMENT
          </p>
          <h1
            className="text-[26px] font-semibold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            FAQs
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            Drag to reorder. Changes reflect in the public help centre instantly.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModal({ mode: 'create' })}
          className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
          style={{
            background: 'linear-gradient(180deg,#F4636E 0%,#F4636Ed9 100%)',
            color: 'white',
            boxShadow: '0 8px 24px -8px #F4636E66',
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          New FAQ
        </button>
      </div>

      {/* ── Search + count bar ────────────────────────────────── */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-3.5 rounded-t-2xl"
        style={{
          background: 'var(--hm-bg-card)',
          border: '1px solid var(--hm-border)',
          borderBottom: 'none',
        }}
      >
        <div
          className="flex items-center gap-2 rounded-lg px-3 h-8"
          style={{
            background: 'var(--hm-bg-card-2)',
            border: '1px solid var(--hm-border)',
            width: 280,
          }}
        >
          <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--hm-text-dim)' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs…"
            className="flex-1 bg-transparent outline-none text-[12px]"
            style={{ color: 'var(--hm-text)' }}
          />
        </div>
        <span
          className="hm-mono text-[10.5px]"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
        >
          {items.length} TOTAL
        </span>
      </div>

      {/* ── Draggable list ────────────────────────────────────── */}
      <div
        className="rounded-b-2xl overflow-hidden"
        style={{
          background: 'var(--hm-bg-card)',
          border: '1px solid var(--hm-border)',
          borderTop: '1px solid var(--hm-border)',
        }}
      >
        {visible.map((item, i) => (
          <div
            key={item.id}
            draggable={!q}
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={handleDrop}
            style={{
              borderTop: i === 0 ? 'none' : '1px solid var(--hm-border)',
              cursor: q ? 'default' : 'grab',
            }}
          >
            <div className="flex items-start gap-3 px-5 py-4 group">
              {/* Grip */}
              <span
                className="mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--hm-text-dim)', cursor: q ? 'default' : 'grab' }}
              >
                <GripVertical className="h-4 w-4" />
              </span>

              {/* Sort badge */}
              <span
                className="hm-mono text-[10px] shrink-0 mt-1 w-5 text-right"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
              >
                {(items.indexOf(item) + 1).toString().padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold text-[13px] mb-1 leading-snug"
                  style={{ color: 'var(--hm-text)' }}
                >
                  {item.question}
                </p>
                <p
                  className="text-[12.5px] leading-relaxed"
                  style={{
                    color: 'var(--hm-text-muted)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.answer}
                </p>
              </div>

              {/* Status + edit */}
              <div className="flex items-center gap-2.5 shrink-0 mt-0.5">
                {item.is_active ? (
                  <Pill tone="success">Active</Pill>
                ) : (
                  <Pill tone="neutral">Hidden</Pill>
                )}
                <button
                  type="button"
                  onClick={() => setModal({ mode: 'edit', item })}
                  className="h-7 px-2.5 rounded-md text-[11.5px] font-medium transition-all opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                    color: 'var(--hm-text-muted)',
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        {visible.length === 0 && (
          <div
            className="flex items-center justify-center py-16"
            style={{ color: 'var(--hm-text-dim)' }}
          >
            <p className="text-[13px]">No FAQs match your search.</p>
          </div>
        )}
      </div>

      {/* ── Modal ─────────────────────────────────────────────── */}
      <AdminModal
        open={modal !== null}
        onClose={() => setModal(null)}
        mode={modal?.mode ?? 'create'}
        entityLabel="FAQ"
        entityName={editing?.question}
        subtitle={
          editing ? `#${editing.id}` : 'Add a question and answer to the public help centre.'
        }
        width={620}
        destructive={editing ? { label: 'Delete FAQ' } : undefined}
      >
        <FieldGrid cols={1}>
          <Field label="Question" required>
            <TextInput
              defaultValue={editing?.question ?? ''}
              placeholder="What's included in the Pro plan?"
            />
          </Field>
          <Field label="Answer" required hint="Markdown supported.">
            <Textarea
              rows={5}
              defaultValue={editing?.answer ?? ''}
              placeholder="Write a clear, concise answer learners can self-serve from."
            />
          </Field>
          <Field label="Status">
            <Toggle
              defaultChecked={editing?.is_active ?? true}
              label="Visible in the public help centre"
            />
          </Field>
        </FieldGrid>
      </AdminModal>
    </AdminShell>
  )
}
