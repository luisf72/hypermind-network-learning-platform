import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Save,
  Camera,
  Mail,
  ShieldCheck,
  Activity,
  Clock,
  KeyRound,
  Smartphone,
  Monitor,
  MapPin,
} from 'lucide-react'
import AdminShell from '../_shared/AdminShell'

const ACCENT = '#F4636E'
const ACCENT_SOFT = 'rgba(244,99,110,0.10)'
const GREEN = '#5EE6A8'
const VIOLET = '#7C5CF6'

function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <label className="block">
      <span
        className="hm-mono text-[10px] block mb-1.5"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
      >
        {label.toUpperCase()}
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
  mono,
  type = 'text',
}: {
  defaultValue?: string
  mono?: boolean
  type?: string
}) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      className={`w-full px-3 h-9 rounded-lg text-[12.5px] outline-none ${mono ? 'hm-mono' : ''}`}
      style={{
        background: 'var(--hm-bg-card-2)',
        border: '1px solid var(--hm-border)',
        color: 'var(--hm-text)',
      }}
    />
  )
}

function SectionCard({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div
      className="hm-card hm-card-lift rounded-2xl overflow-hidden"
      style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
    >
      <div
        className="flex items-center justify-between gap-3 px-5 py-3.5"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <div>
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
        {action}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

const SESSIONS = [
  {
    Icon: Monitor,
    deviceKey: 'adminProfile.session1Device',
    whereKey: 'adminProfile.session1Where',
    lastKey: 'adminProfile.session1Last',
    current: true,
  },
  {
    Icon: Smartphone,
    deviceKey: 'adminProfile.session2Device',
    whereKey: 'adminProfile.session2Where',
    lastKey: 'adminProfile.session2Last',
    current: false,
  },
  {
    Icon: Monitor,
    deviceKey: 'adminProfile.session3Device',
    whereKey: 'adminProfile.session3Where',
    lastKey: 'adminProfile.session3Last',
    current: false,
  },
]

const ACTIVITY = [
  {
    whenKey: 'adminProfile.activity1When',
    whatKey: 'adminProfile.activity1What',
    whoKey: 'adminProfile.activity1Who',
  },
  {
    whenKey: 'adminProfile.activity2When',
    whatKey: 'adminProfile.activity2What',
    whoKey: 'adminProfile.activity2Who',
  },
  {
    whenKey: 'adminProfile.activity3When',
    whatKey: 'adminProfile.activity3What',
    whoKey: 'adminProfile.activity3Who',
  },
  {
    whenKey: 'adminProfile.activity4When',
    whatKey: 'adminProfile.activity4What',
    whoKey: 'adminProfile.activity4Who',
  },
]

export default function AdminProfile() {
  const { t } = useTranslation()
  const [twoFa, setTwoFa] = useState(true)

  return (
    <AdminShell activeId="profile">
      <div className="hm-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <p
              className="hm-mono text-[10px] mb-1"
              style={{ color: ACCENT, letterSpacing: '0.18em' }}
            >
              {t('adminProfile.eyebrow')}
            </p>
            <h1
              className="text-[24px] font-semibold tracking-tight"
              style={{ color: 'var(--hm-text)', fontFamily: 'var(--hm-font-display)' }}
            >
              {t('adminProfile.title')}
            </h1>
            <p className="text-[12.5px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
              {t('adminProfile.subtitle')}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg text-[12.5px] font-semibold transition-all"
            style={{ background: ACCENT, color: '#fff', boxShadow: `0 8px 22px -8px ${ACCENT}66` }}
          >
            <Save className="h-3.5 w-3.5" />
            {t('adminProfile.save')}
          </button>
        </div>

        {/* Identity banner */}
        <div
          className="hm-card rounded-2xl mb-4 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${ACCENT_SOFT} 0%, var(--hm-bg-card) 60%)`,
            border: `1px solid ${ACCENT}33`,
          }}
        >
          <div className="flex items-center gap-5 px-6 py-5">
            <div className="relative shrink-0">
              <span
                className="flex h-20 w-20 items-center justify-center rounded-2xl text-[22px] font-semibold"
                style={{
                  background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}cc 100%)`,
                  color: '#fff',
                  boxShadow: `0 12px 30px -10px ${ACCENT}66`,
                }}
              >
                AV
              </span>
              <button
                type="button"
                aria-label={t('adminProfile.changeAvatar')}
                className="absolute -bottom-1.5 -right-1.5 h-7 w-7 rounded-full flex items-center justify-center"
                style={{
                  background: 'var(--hm-bg-card)',
                  border: '1px solid var(--hm-border-strong)',
                  color: 'var(--hm-text-muted)',
                }}
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <h2
                className="text-[18px] font-semibold leading-tight"
                style={{ color: 'var(--hm-text)' }}
              >
                Anya Volkov
              </h2>
              <p className="text-[12.5px] mt-0.5" style={{ color: 'var(--hm-text-muted)' }}>
                {t('adminProfile.nameSubtitle')}
              </p>
              <div className="flex items-center flex-wrap gap-2 mt-3">
                <span
                  className="hm-mono text-[10px] px-2 py-0.5 rounded"
                  style={{ background: ACCENT_SOFT, color: ACCENT, letterSpacing: '0.12em' }}
                >
                  {t('adminProfile.roleAdmin')}
                </span>
                <span
                  className="hm-mono text-[10px] px-2 py-0.5 rounded inline-flex items-center gap-1"
                  style={{
                    background: 'rgba(94,230,168,0.12)',
                    color: GREEN,
                    letterSpacing: '0.10em',
                  }}
                >
                  <ShieldCheck className="h-3 w-3" /> {t('adminProfile.twoFaEnabled')}
                </span>
                <span
                  className="hm-mono text-[10px] px-2 py-0.5 rounded inline-flex items-center gap-1"
                  style={{
                    background: 'rgba(124,92,246,0.10)',
                    color: VIOLET,
                    letterSpacing: '0.10em',
                  }}
                >
                  <Activity className="h-3 w-3" /> {t('adminProfile.actions30d')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-col body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: identity + security */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
            <SectionCard
              eyebrow={t('adminProfile.sectionIdentity')}
              title={t('adminProfile.sectionPersonalInfo')}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                <Field label={t('adminProfile.fullName')}>
                  <TextInput defaultValue="Anya Volkov" />
                </Field>
                <Field label={t('adminProfile.displayName')}>
                  <TextInput defaultValue="Anya" />
                </Field>
                <Field label={t('adminProfile.emailLabel')}>
                  <TextInput type="email" mono defaultValue="anya@hypermind.io" />
                </Field>
                <Field label={t('adminProfile.phone')}>
                  <TextInput defaultValue="+1 415 555 0142" mono />
                </Field>
                <Field label={t('adminProfile.timeZone')}>
                  <TextInput defaultValue="America/Los_Angeles" mono />
                </Field>
                <Field label={t('adminProfile.locale')}>
                  <TextInput defaultValue="EN-US" mono />
                </Field>
              </div>
            </SectionCard>

            <SectionCard
              eyebrow={t('adminProfile.sectionSecurity')}
              title={t('adminProfile.sectionPasswordTwoFa')}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                <Field
                  label={t('adminProfile.currentPassword')}
                  hint={t('adminProfile.currentPasswordHint')}
                >
                  <TextInput type="password" defaultValue="••••••••••" />
                </Field>
                <Field label={t('adminProfile.newPassword')}>
                  <TextInput type="password" />
                </Field>
              </div>
              <div
                className="flex items-center justify-between mt-5 px-3.5 py-3 rounded-xl"
                style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0"
                    style={{ background: ACCENT_SOFT, color: ACCENT }}
                  >
                    <KeyRound className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                      {t('adminProfile.twoFaTitle')}
                    </p>
                    <p className="text-[11.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                      {t('adminProfile.twoFaDesc')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFa((v) => !v)}
                  className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                  style={{
                    background: twoFa ? GREEN : 'var(--hm-bg-card)',
                    border: '1px solid var(--hm-border-strong)',
                  }}
                  aria-pressed={twoFa}
                  aria-label={t('adminProfile.toggleTwoFa')}
                >
                  <span
                    className="inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform"
                    style={{ transform: twoFa ? 'translateX(20px)' : 'translateX(2px)' }}
                  />
                </button>
              </div>
            </SectionCard>

            <SectionCard
              eyebrow={t('adminProfile.sectionRecent')}
              title={t('adminProfile.sectionActivityLog')}
            >
              <ul className="divide-y" style={{ borderColor: 'var(--hm-border)' }}>
                {ACTIVITY.map((row, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 py-2.5"
                    style={{ borderTop: i === 0 ? 'none' : '1px solid var(--hm-border)' }}
                  >
                    <Clock
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: 'var(--hm-text-dim)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px]" style={{ color: 'var(--hm-text)' }}>
                        {t(row.whatKey)}
                      </p>
                      <p
                        className="hm-mono text-[10.5px] truncate"
                        style={{ color: 'var(--hm-text-dim)' }}
                      >
                        {t(row.whoKey)}
                      </p>
                    </div>
                    <span
                      className="hm-mono text-[10px] shrink-0"
                      style={{ color: 'var(--hm-text-dim)' }}
                    >
                      {t(row.whenKey)}
                    </span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          {/* Right: contact + sessions */}
          <div className="flex flex-col gap-4">
            <SectionCard
              eyebrow={t('adminProfile.sectionContact')}
              title={t('adminProfile.sectionReachMethods')}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  <span className="hm-mono text-[12px]" style={{ color: 'var(--hm-text)' }}>
                    anya@hypermind.io
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  <span className="text-[12.5px]" style={{ color: 'var(--hm-text)' }}>
                    San Francisco, CA
                  </span>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              eyebrow={t('adminProfile.sectionDevices')}
              title={t('adminProfile.sectionActiveSessions')}
            >
              <ul className="flex flex-col gap-2.5">
                {SESSIONS.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      border: '1px solid var(--hm-border)',
                    }}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                      style={{
                        background: 'var(--hm-bg-card)',
                        border: '1px solid var(--hm-border)',
                      }}
                    >
                      <s.Icon
                        className="h-3.5 w-3.5"
                        style={{ color: s.current ? GREEN : 'var(--hm-text-muted)' }}
                      />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[12px] font-medium truncate"
                        style={{ color: 'var(--hm-text)' }}
                      >
                        {t(s.deviceKey)}
                      </p>
                      <p
                        className="hm-mono text-[10px] truncate"
                        style={{ color: 'var(--hm-text-dim)' }}
                      >
                        {t(s.whereKey)} · {t(s.lastKey)}
                      </p>
                    </div>
                    {s.current ? (
                      <span
                        className="hm-mono text-[9.5px] px-1.5 py-0.5 rounded"
                        style={{
                          background: 'rgba(94,230,168,0.14)',
                          color: GREEN,
                          letterSpacing: '0.10em',
                        }}
                      >
                        {t('adminProfile.current')}
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="hm-mono text-[9.5px]"
                        style={{ color: ACCENT, letterSpacing: '0.10em' }}
                      >
                        {t('adminProfile.revoke')}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
