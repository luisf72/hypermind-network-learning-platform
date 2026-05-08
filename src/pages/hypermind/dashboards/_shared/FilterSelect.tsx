import { ChevronDown, X } from 'lucide-react'

export function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  const active = value !== ''
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-3 h-8 rounded-lg text-[12px] outline-none cursor-pointer"
        style={{
          background: active ? 'var(--hm-violet-soft)' : 'var(--hm-bg-card-2)',
          border: `1px solid ${active ? 'var(--hm-violet-2)' : 'var(--hm-border)'}`,
          color: active ? 'var(--hm-violet-2)' : 'var(--hm-text-muted)',
          paddingRight: active ? 44 : 28,
        }}
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="h-3 w-3 pointer-events-none absolute"
        style={{
          right: active ? 24 : 8,
          color: active ? 'var(--hm-violet-2)' : 'var(--hm-text-dim)',
        }}
      />
      {active && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-1.5 flex h-4 w-4 items-center justify-center rounded"
          style={{ background: 'var(--hm-violet-2)', color: 'white' }}
        >
          <X className="h-2.5 w-2.5" />
        </button>
      )}
    </div>
  )
}
