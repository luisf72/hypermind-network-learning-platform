import {
  useEffect,
  useState,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react'
import { ChevronDown, X } from 'lucide-react'
import '../../_group.css'

const ACCENT = '#F4636E'

/* ─────────────────────────────  Modal chrome  ───────────────────────────── */

interface AdminModalProps {
  open: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  entityLabel: string
  entityName?: string
  subtitle?: string
  width?: number
  submitLabel?: string
  onSubmit?: () => void
  /** Disables primary / destructive actions while a request is in flight. */
  submitBusy?: boolean
  destructive?: { label: string; onClick?: () => void }
  children: ReactNode
}

export default function AdminModal({
  open,
  onClose,
  mode,
  entityLabel,
  entityName,
  subtitle,
  width = 560,
  submitLabel,
  onSubmit,
  submitBusy = false,
  destructive,
  children,
}: AdminModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !submitBusy) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, submitBusy])

  if (!open) return null

  const eyebrow =
    mode === 'create' ? `NEW · ${entityLabel.toUpperCase()}` : `EDIT · ${entityLabel.toUpperCase()}`
  const titleText = mode === 'create' ? `New ${entityLabel}` : (entityName ?? `Edit ${entityLabel}`)
  const computedSubmit =
    submitLabel ?? (mode === 'create' ? `Create ${entityLabel}` : 'Save changes')

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
      style={{ animation: 'hm-modal-in 140ms ease-out' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(6,8,18,0.72)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      />
      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full rounded-2xl flex flex-col overflow-hidden"
        style={{
          maxWidth: width,
          maxHeight: 'calc(100vh - 48px)',
          background: 'var(--hm-bg-card)',
          border: '1px solid var(--hm-border-strong)',
          boxShadow: `0 30px 80px -10px rgba(0,0,0,0.65), 0 0 0 1px ${ACCENT}14`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between gap-3 px-6 py-5"
          style={{ borderBottom: '1px solid var(--hm-border)' }}
        >
          <div className="min-w-0 flex-1">
            <p className="hm-mono text-[10px]" style={{ color: ACCENT, letterSpacing: '0.18em' }}>
              {eyebrow}
            </p>
            <h2
              className="text-[18px] font-semibold mt-1.5 truncate"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
            >
              {titleText}
            </h2>
            {subtitle && (
              <p className="text-[12.5px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-lg inline-flex items-center justify-center shrink-0"
            style={{
              background: 'var(--hm-bg-card-2)',
              border: '1px solid var(--hm-border)',
              color: 'var(--hm-text-muted)',
            }}
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body (scroll if too tall) */}
        <div className="flex-1 overflow-y-auto px-6 py-5 hm-scroll">{children}</div>

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-3 px-6 py-4"
          style={{ borderTop: '1px solid var(--hm-border)', background: 'var(--hm-bg-card-2)' }}
        >
          <div>
            {destructive && (
              <button
                type="button"
                disabled={submitBusy}
                onClick={destructive.onClick ?? onClose}
                className="inline-flex items-center px-3 h-9 rounded-lg text-[12px] font-medium"
                style={{
                  background: 'transparent',
                  border: `1px solid ${ACCENT}40`,
                  color: ACCENT,
                  opacity: submitBusy ? 0.5 : 1,
                  cursor: submitBusy ? 'not-allowed' : 'pointer',
                }}
              >
                {destructive.label}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={submitBusy}
              onClick={onClose}
              className="inline-flex items-center px-3.5 h-9 rounded-lg text-[12.5px] font-medium"
              style={{
                background: 'var(--hm-bg-card)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-muted)',
                opacity: submitBusy ? 0.6 : 1,
                cursor: submitBusy ? 'not-allowed' : 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={submitBusy}
              onClick={onSubmit ?? onClose}
              className="inline-flex items-center px-4 h-9 rounded-lg text-[12.5px] font-semibold"
              style={{
                background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}d9 100%)`,
                color: 'white',
                boxShadow: `0 8px 24px -8px ${ACCENT}66`,
                opacity: submitBusy ? 0.65 : 1,
                cursor: submitBusy ? 'not-allowed' : 'pointer',
              }}
            >
              {computedSubmit}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hm-modal-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ───────────────────────────  Form field helpers  ─────────────────────────── */

export function FieldGrid({ children, cols = 1 }: { children: ReactNode; cols?: 1 | 2 }) {
  return (
    <div className={`grid gap-4 ${cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>{children}</div>
  )
}

export function Field({
  label,
  hint,
  required,
  children,
  span,
}: {
  label: string
  hint?: string
  required?: boolean
  children: ReactNode
  span?: 1 | 2
}) {
  return (
    <div className={span === 2 ? 'col-span-2' : ''}>
      <label className="block">
        <span
          className="block text-[11.5px] font-medium mb-1.5"
          style={{ color: 'var(--hm-text)' }}
        >
          {label}
          {required && (
            <span className="ml-1" style={{ color: ACCENT }}>
              *
            </span>
          )}
        </span>
        {children}
      </label>
      {hint && (
        <p className="text-[10.5px] mt-1" style={{ color: 'var(--hm-text-dim)' }}>
          {hint}
        </p>
      )}
    </div>
  )
}

const inputBase: CSSProperties = {
  background: 'var(--hm-bg-card-2)',
  border: '1px solid var(--hm-border)',
  color: 'var(--hm-text)',
}

export function TextInput({
  mono,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { mono?: boolean }) {
  return (
    <input
      {...props}
      type={props.type ?? 'text'}
      className={`w-full h-9 px-3 rounded-lg outline-none transition-colors ${mono ? 'hm-mono text-[12px]' : 'text-[12.5px]'} ${props.className ?? ''}`}
      style={{ ...inputBase, ...props.style }}
    />
  )
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 3}
      className={`w-full px-3 py-2 rounded-lg text-[12.5px] outline-none transition-colors leading-relaxed ${props.className ?? ''}`}
      style={{ ...inputBase, resize: 'vertical', ...props.style }}
    />
  )
}

export function Select({
  defaultValue,
  options,
  name,
}: {
  defaultValue?: string
  options: { value: string; label: string }[]
  name?: string
}) {
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full h-9 pl-3 pr-9 rounded-lg text-[12.5px] outline-none appearance-none cursor-pointer"
        style={inputBase}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="h-3.5 w-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--hm-text-dim)' }}
      />
    </div>
  )
}

export function Toggle({
  defaultChecked = false,
  checked,
  onCheckedChange,
  label,
}: {
  defaultChecked?: boolean
  checked?: boolean
  onCheckedChange?: (value: boolean) => void
  label?: string
}) {
  const controlled = checked !== undefined
  return (
    <ToggleImpl
      defaultChecked={defaultChecked}
      checked={controlled ? checked : undefined}
      onCheckedChange={onCheckedChange}
      label={label}
    />
  )
}

function ToggleImpl({
  defaultChecked,
  checked,
  onCheckedChange,
  label,
}: {
  defaultChecked: boolean
  checked?: boolean
  onCheckedChange?: (value: boolean) => void
  label?: string
}) {
  const [internal, setInternal] = useState(defaultChecked)
  const on = checked !== undefined ? checked : internal
  const set = (next: boolean) => {
    onCheckedChange?.(next)
    if (checked === undefined) setInternal(next)
  }
  return (
    <button
      type="button"
      onClick={() => set(!on)}
      className="inline-flex items-center gap-2.5"
      role="switch"
      aria-checked={on}
    >
      <span
        className="relative h-5 w-9 rounded-full transition-colors shrink-0"
        style={{
          background: on ? ACCENT : 'var(--hm-bg-card-2)',
          border: `1px solid ${on ? ACCENT : 'var(--hm-border-strong)'}`,
        }}
      >
        <span
          className="absolute top-0.5 h-3.5 w-3.5 rounded-full transition-all"
          style={{
            left: on ? 'calc(100% - 16px)' : '2px',
            background: on ? 'white' : 'var(--hm-text-muted)',
          }}
        />
      </span>
      {label && (
        <span className="text-[12.5px]" style={{ color: 'var(--hm-text)' }}>
          {label}
        </span>
      )}
    </button>
  )
}

export function ChipsInput({
  defaultValues = [],
  placeholder = 'Add tag…',
}: {
  defaultValues?: string[]
  placeholder?: string
}) {
  return (
    <div
      className="flex items-center flex-wrap gap-1.5 min-h-9 px-2 py-1.5 rounded-lg"
      style={inputBase}
    >
      {defaultValues.map((v) => (
        <span
          key={v}
          className="inline-flex items-center gap-1 px-2 h-6 rounded-md text-[11px] font-medium"
          style={{
            background: 'var(--hm-violet-soft)',
            color: 'var(--hm-violet-2)',
            border: '1px solid var(--hm-border)',
          }}
        >
          {v}
          <X className="h-2.5 w-2.5 opacity-60 cursor-pointer" />
        </span>
      ))}
      <input
        placeholder={placeholder}
        className="flex-1 min-w-[80px] bg-transparent outline-none text-[12px] px-1"
        style={{ color: 'var(--hm-text)' }}
      />
    </div>
  )
}
