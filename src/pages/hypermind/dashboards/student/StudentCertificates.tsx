import { useState } from 'react'
import { useThemeStore } from '@/stores/themeStore'
import {
  Award,
  ArrowLeft,
  Share2,
  Download,
  ExternalLink,
  Copy,
  CheckCircle2,
  Shield,
  Link2,
  Twitter,
  Linkedin,
  ChevronRight,
  Clock,
  BookOpen,
  Hash,
  Layers,
  Zap,
  Star,
  Check,
  Globe,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, VIOLET_GLOW, GREEN, AMBER, BLUE } from './StudentShell'
import { BrandLogo } from '@/components/BrandLogo'

const TEAL = '#5BC8C5'
const ROSE = '#F4636E'

/* ─── Data ──────────────────────────────────────────────── */
interface Certificate {
  id: string
  course: string
  instructor: string
  lessons: number
  hours: string
  color: string
  icon: string
  category: string
  issued: string
  issuedFull: string
  certNum: string
  tokenId: string
  txHash: string
  contract: string
  block: string
  confirmations: string
  network: string
  shared: number
}

const CERTS: Certificate[] = [
  {
    id: 'cert1',
    course: 'Python for Beginners',
    instructor: 'Amir Salehi',
    lessons: 40,
    hours: '16h',
    color: GREEN,
    icon: '🐍',
    category: 'Tech & Coding',
    issued: 'Nov 14, 2025',
    issuedFull: 'November 14, 2025',
    certNum: 'HM-2025-1247',
    tokenId: '1,247',
    txHash: '0x7f4e8b2c1d9a3f56e8c2a1b4d7f9e0c3a8b5d2f1',
    contract: '0xA4Cd2F…e9c1',
    block: '42,847,921',
    confirmations: '1,204,841',
    network: 'Polygon',
    shared: 14,
  },
  {
    id: 'cert2',
    course: 'Productivity Masterclass',
    instructor: 'Yuki Tanaka',
    lessons: 22,
    hours: '8h',
    color: '#A78BFA',
    icon: '⚡',
    category: 'Personal Growth',
    issued: 'Oct 8, 2025',
    issuedFull: 'October 8, 2025',
    certNum: 'HM-2025-1089',
    tokenId: '1,089',
    txHash: '0x3c9a1e7d4b2f8a05c6e3d9b1f4a7c0e2d5b8a3f9',
    contract: '0xA4Cd2F…e9c1',
    block: '41,209,447',
    confirmations: '1,842,315',
    network: 'Polygon',
    shared: 6,
  },
  {
    id: 'cert3',
    course: 'Intro to Watercolor Sketching',
    instructor: 'Mia Torres',
    lessons: 18,
    hours: '6h 20m',
    color: TEAL,
    icon: '🎨',
    category: 'Arts & Crafts',
    issued: 'Sep 3, 2025',
    issuedFull: 'September 3, 2025',
    certNum: 'HM-2025-0921',
    tokenId: '921',
    txHash: '0x9b2d5f1a7e4c0b3d6f8a2e5c1b4d7a0f3e6c9b2d',
    contract: '0xA4Cd2F…e9c1',
    block: '39,884,102',
    confirmations: '3,168,660',
    network: 'Polygon',
    shared: 3,
  },
  {
    id: 'cert4',
    course: 'English Grammar Mastery',
    instructor: 'James Webb',
    lessons: 28,
    hours: '10h',
    color: AMBER,
    icon: '📝',
    category: 'Languages',
    issued: 'Aug 20, 2025',
    issuedFull: 'August 20, 2025',
    certNum: 'HM-2025-0804',
    tokenId: '804',
    txHash: '0x1e8c3a6f9d2b5e0c4a7f1d3b6e9c2a5f8d1b4e7a',
    contract: '0xA4Cd2F…e9c1',
    block: '38,741,530',
    confirmations: '4,311,232',
    network: 'Polygon',
    shared: 9,
  },
]

/* ─── QR Code (decorative SVG) ──────────────────────────── */
function QRCode({ color }: { color: string }) {
  // 11×11 fake QR pattern
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
  ]
  const cell = 6
  const size = pattern.length * cell
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {pattern.map((row, r) =>
        row.map((v, c) =>
          v ? (
            <rect
              key={`${r}-${c}`}
              x={c * cell}
              y={r * cell}
              width={cell - 0.5}
              height={cell - 0.5}
              fill={color}
              rx={0.5}
            />
          ) : null
        )
      )}
    </svg>
  )
}

/* ─── Chain Badge ───────────────────────────────────────── */
function ChainBadge({ network }: { network: string }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{
        background: 'linear-gradient(135deg, rgba(124,92,246,0.2) 0%, rgba(92,200,197,0.15) 100%)',
        border: '1px solid rgba(124,92,246,0.4)',
        boxShadow: '0 0 12px rgba(124,92,246,0.2)',
      }}
    >
      <div
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: GREEN, boxShadow: `0 0 6px ${GREEN}` }}
      />
      <span
        className="hm-mono text-[9.5px] font-bold"
        style={{ color: GREEN, letterSpacing: '0.08em' }}
      >
        VERIFIED · {network.toUpperCase()}
      </span>
    </div>
  )
}

/* ─── Certificate Card (list) ───────────────────────────── */
function CertCard({ cert, onClick }: { cert: Certificate; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-2xl overflow-hidden transition-all group"
      style={{
        background: 'var(--hm-bg-card)',
        border: '1px solid var(--hm-border)',
        boxShadow: `0 2px 12px rgba(0,0,0,0.2)`,
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.border = `1px solid ${cert.color}55`
        ;(e.currentTarget as HTMLElement).style.boxShadow =
          `0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px ${cert.color}28`
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.border = '1px solid var(--hm-border)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.2)'
      }}
    >
      {/* Art header */}
      <div
        className="relative h-28 overflow-hidden flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${cert.color}18 0%, ${VIOLET}0f 60%, ${cert.color}0a 100%)`,
          borderBottom: `1px solid ${cert.color}22`,
        }}
      >
        {/* BG decoration */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 112"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="320" cy="20" r="80" fill={cert.color} fillOpacity="0.35" />
          <circle cx="50" cy="100" r="60" fill={VIOLET} fillOpacity="0.25" />
          <circle cx="200" cy="60" r="45" fill={cert.color} fillOpacity="0.15" />
        </svg>
        {/* Icon */}
        <div className="relative flex flex-col items-center gap-2">
          <span className="text-4xl">{cert.icon}</span>
        </div>
        {/* Verified chip */}
        <div className="absolute top-3 right-3">
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full"
            style={{
              background: 'rgba(94,230,168,0.15)',
              border: '1px solid rgba(94,230,168,0.4)',
            }}
          >
            <CheckCircle2 className="h-2.5 w-2.5" style={{ color: GREEN }} />
            <span
              className="hm-mono text-[8.5px] font-bold"
              style={{ color: GREEN, letterSpacing: '0.06em' }}
            >
              ON-CHAIN
            </span>
          </div>
        </div>
        {/* Category */}
        <div className="absolute top-3 left-3">
          <span
            className="hm-mono text-[8.5px] px-2 py-0.5 rounded font-bold"
            style={{ background: `${cert.color}22`, color: cert.color, letterSpacing: '0.06em' }}
          >
            {cert.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-3.5 pb-3">
        <h3
          className="text-[14px] font-bold mb-0.5"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.015em' }}
        >
          {cert.course}
        </h3>
        <p className="text-[12px] mb-3" style={{ color: 'var(--hm-text-dim)' }}>
          {cert.instructor} · {cert.lessons} lessons · {cert.hours}
        </p>

        {/* Hash teaser */}
        <div
          className="flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg"
          style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
        >
          <Hash className="h-3 w-3 shrink-0" style={{ color: VIOLET }} />
          <span
            className="hm-mono text-[10px] truncate flex-1"
            style={{ color: 'var(--hm-text-dim)' }}
          >
            {cert.txHash.slice(0, 20)}…
          </span>
          <span className="hm-mono text-[9px] shrink-0" style={{ color: cert.color }}>
            Polygon
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="hm-mono text-[10px]" style={{ color: 'var(--hm-text-dim)' }}>
              Issued {cert.issued}
            </span>
          </div>
          <div
            className="flex items-center gap-1 text-[11.5px] font-semibold group-hover:gap-1.5 transition-all"
            style={{ color: VIOLET }}
          >
            View <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </button>
  )
}

/* ─── Certificate Detail ────────────────────────────────── */
function CertificateDetail({ cert, onBack }: { cert: Certificate; onBack: () => void }) {
  const isLight = useThemeStore((s) => s.theme === 'light')
  const [copied, setCopied] = useState(false)
  const [copiedHash, setCopiedHash] = useState(false)

  function fakeCopy(which: 'url' | 'hash') {
    if (which === 'url') {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      setCopiedHash(true)
      setTimeout(() => setCopiedHash(false), 2000)
    }
  }

  return (
    <StudentShell activeTab={null}>
      <div className="px-6 py-5 max-w-[860px] mx-auto">
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 mb-5 text-[13px] font-medium"
          style={{ color: 'var(--hm-text-dim)' }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Certificates
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
          {/* LEFT: Certificate visual */}
          <div className="flex flex-col gap-4">
            {/* The certificate card */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: isLight
                  ? `linear-gradient(160deg, #FFFFFF 0%, #F6F2FC 50%, #EDF1FA 100%)`
                  : `linear-gradient(160deg, #0e0f25 0%, #111228 50%, #0c0d1f 100%)`,
                border: `1px solid ${cert.color}${isLight ? '33' : '40'}`,
                boxShadow: isLight
                  ? `0 0 0 1px ${cert.color}14, 0 20px 50px -12px rgba(15,23,42,0.18), inset 0 0 80px ${cert.color}08`
                  : `0 0 0 1px ${cert.color}18, 0 20px 60px rgba(0,0,0,0.6), inset 0 0 80px ${cert.color}06`,
              }}
            >
              {/* Corner ornaments */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: 'visible' }}
              >
                {/* TL */}
                <path
                  d="M20 44 L20 20 L44 20"
                  fill="none"
                  stroke={cert.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
                <circle cx="20" cy="20" r="3" fill={cert.color} fillOpacity="0.6" />
                {/* TR */}
                <path
                  d="M-20 44 L-20 20 L-44 20"
                  fill="none"
                  stroke={cert.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  transform="translate(100%,0) scale(-1,1)"
                />
                <circle
                  cx="0"
                  cy="20"
                  r="3"
                  fill={cert.color}
                  fillOpacity="0.6"
                  transform="translate(calc(100% - 20px),0)"
                />
                {/* BL */}
                <path
                  d="M20 -44 L20 -20 L44 -20"
                  fill="none"
                  stroke={cert.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  transform="translate(0,100%) scale(1,-1)"
                />
                {/* BR */}
                <path
                  d="M-20 -44 L-20 -20 L-44 -20"
                  fill="none"
                  stroke={cert.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  transform="translate(100%,100%) scale(-1,-1)"
                />
              </svg>

              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${cert.color}12 0%, transparent 70%)`,
                }}
              />

              <div className="relative px-8 pt-8 pb-7">
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <BrandLogo />
                    <div>
                      <p
                        className="text-[13px] font-semibold"
                        style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
                      >
                        HyperMind
                      </p>
                      <p
                        className="hm-mono text-[9px]"
                        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
                      >
                        BLOCKCHAIN ACADEMY
                      </p>
                    </div>
                  </div>
                  <ChainBadge network={cert.network} />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cert.color}50, transparent)`,
                    }}
                  />
                  <span
                    className="hm-mono text-[10px] font-bold tracking-widest"
                    style={{ color: cert.color }}
                  >
                    CERTIFICATE OF COMPLETION
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cert.color}50, transparent)`,
                    }}
                  />
                </div>

                {/* Main content */}
                <div className="text-center mb-6">
                  <p className="text-[13px] mb-2" style={{ color: 'var(--hm-text-dim)' }}>
                    This certifies that
                  </p>
                  <p
                    className="text-[28px] font-bold mb-2"
                    style={{
                      color: 'var(--hm-text)',
                      letterSpacing: '-0.025em',
                      textShadow: `0 0 30px ${cert.color}40`,
                    }}
                  >
                    Jordan Davis
                  </p>
                  <p className="text-[13px] mb-4" style={{ color: 'var(--hm-text-dim)' }}>
                    has successfully completed
                  </p>
                  <p
                    className="text-[22px] font-extrabold mb-3 leading-tight"
                    style={{
                      color: cert.color,
                      letterSpacing: '-0.02em',
                      textShadow: `0 0 40px ${cert.color}60`,
                    }}
                  >
                    {cert.course}
                  </p>
                  <p className="text-[12.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                    Taught by <span style={{ color: 'var(--hm-text)' }}>{cert.instructor}</span>
                    {' · '}
                    {cert.lessons} lessons{' · '}
                    {cert.hours}
                  </p>
                </div>

                {/* Bottom divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cert.color}30, transparent)`,
                    }}
                  />
                  <span
                    className="hm-mono text-[9px]"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
                  >
                    ISSUED {cert.issued.toUpperCase()} · {cert.certNum}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${cert.color}30, transparent)`,
                    }}
                  />
                </div>

                {/* Seal row */}
                <div className="flex items-end justify-between">
                  {/* QR */}
                  <div className="flex flex-col gap-2">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <QRCode color={cert.color} />
                    </div>
                    <p
                      className="hm-mono text-[8.5px] text-center"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                    >
                      SCAN TO VERIFY
                    </p>
                  </div>

                  {/* Central seal */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="relative">
                      <svg width="72" height="72" viewBox="0 0 72 72">
                        {/* Outer ring */}
                        <circle
                          cx="36"
                          cy="36"
                          r="34"
                          fill="none"
                          stroke={cert.color}
                          strokeWidth="1"
                          strokeOpacity="0.4"
                          strokeDasharray="4 2"
                        />
                        <circle
                          cx="36"
                          cy="36"
                          r="30"
                          fill={`${cert.color}12`}
                          stroke={cert.color}
                          strokeWidth="1.5"
                          strokeOpacity="0.6"
                        />
                        {/* Star */}
                        <path
                          d="M36 18 l3 9 h9.5 l-7.7 5.6 2.9 9-7.7-5.6-7.7 5.6 2.9-9L23.5 27H33z"
                          fill={cert.color}
                          fillOpacity="0.85"
                        />
                        <text
                          x="36"
                          y="52"
                          textAnchor="middle"
                          fontSize="6"
                          fill={cert.color}
                          fillOpacity="0.7"
                          fontFamily="monospace"
                          letterSpacing="0.5"
                        >
                          VERIFIED
                        </text>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle2
                          className="h-5 w-5 mt-3"
                          style={{ color: GREEN, opacity: 0.9 }}
                        />
                      </div>
                    </div>
                    <p
                      className="hm-mono text-[8px] text-center"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.06em' }}
                    >
                      OFFICIAL SEAL
                    </p>
                  </div>

                  {/* Signature placeholder */}
                  <div className="flex flex-col items-end gap-1.5">
                    <div
                      className="px-3 py-2 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <svg width="80" height="32" viewBox="0 0 80 32">
                        <path
                          d="M5 22 C15 8 20 26 30 14 C35 8 38 20 45 12 C52 4 55 22 65 18 C70 16 74 20 76 18"
                          fill="none"
                          stroke={cert.color}
                          strokeWidth="1.5"
                          strokeOpacity="0.7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="h-px w-20" style={{ background: `${cert.color}40` }} />
                    <p
                      className="hm-mono text-[8.5px]"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.05em' }}
                    >
                      DIRECTOR, HYPERMIND
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share panel */}
            <div
              className="rounded-2xl p-4"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Share2 className="h-4 w-4" style={{ color: VIOLET }} />
                <h3 className="text-[13.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                  Share Certificate
                </h3>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex-1 flex items-center gap-2 px-3 h-9 rounded-xl"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  <Link2 className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--hm-text-dim)' }} />
                  <span
                    className="text-[12px] truncate flex-1"
                    style={{ color: 'var(--hm-text-dim)' }}
                  >
                    hypermind.io/verify/{cert.certNum.toLowerCase()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => fakeCopy('url')}
                  className="flex items-center gap-1.5 px-3 h-9 rounded-xl text-[12px] font-semibold shrink-0"
                  style={{
                    background: copied ? `${GREEN}18` : VIOLET_SOFT,
                    color: copied ? GREEN : VIOLET,
                    border: `1px solid ${copied ? GREEN + '30' : VIOLET + '40'}`,
                  }}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 h-9 rounded-xl text-[12px] font-semibold"
                  style={{
                    background: 'rgba(10,102,194,0.15)',
                    color: '#0a66c2',
                    border: '1px solid rgba(10,102,194,0.3)',
                  }}
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 h-9 rounded-xl text-[12px] font-semibold"
                  style={{
                    background: 'rgba(29,161,242,0.12)',
                    color: '#1da1f2',
                    border: '1px solid rgba(29,161,242,0.28)',
                  }}
                >
                  <Twitter className="h-3.5 w-3.5" /> Twitter
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 h-9 rounded-xl text-[12px] font-semibold"
                  style={{
                    background: 'var(--hm-bg-card-2)',
                    color: 'var(--hm-text-muted)',
                    border: '1px solid var(--hm-border)',
                  }}
                >
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Blockchain verification */}
          <div className="flex flex-col gap-4">
            {/* Verification card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'var(--hm-bg-card)',
                border: `1px solid ${VIOLET}30`,
                boxShadow: `0 0 30px ${VIOLET}14`,
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-2.5 px-4 py-3.5"
                style={{
                  background: `linear-gradient(90deg, ${VIOLET}14 0%, transparent 70%)`,
                  borderBottom: '1px solid var(--hm-border)',
                }}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: VIOLET_SOFT, border: `1px solid ${VIOLET}40` }}
                >
                  <Shield className="h-4 w-4" style={{ color: VIOLET }} />
                </div>
                <div>
                  <p
                    className="text-[13.5px] font-bold"
                    style={{ color: 'var(--hm-text)', letterSpacing: '-0.01em' }}
                  >
                    Blockchain Verification
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--hm-text-dim)' }}>
                    Immutable · Tamper-proof · Forever
                  </p>
                </div>
              </div>

              {/* Status banner */}
              <div
                className="mx-4 mt-4 mb-0 flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${GREEN}12 0%, ${TEAL}08 100%)`,
                  border: `1px solid ${GREEN}35`,
                }}
              >
                <div className="relative">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: GREEN, boxShadow: `0 0 8px ${GREEN}` }}
                  />
                  <div
                    className="absolute inset-0 h-2.5 w-2.5 rounded-full animate-ping"
                    style={{ background: GREEN, opacity: 0.3 }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[12.5px] font-bold" style={{ color: GREEN }}>
                    Verified on-chain
                  </p>
                  <p className="hm-mono text-[10px]" style={{ color: GREEN, opacity: 0.7 }}>
                    {cert.confirmations} confirmations
                  </p>
                </div>
                <CheckCircle2 className="h-5 w-5" style={{ color: GREEN }} />
              </div>

              {/* Metadata table */}
              <div className="px-4 py-3 flex flex-col gap-0">
                {[
                  { label: 'Network', value: cert.network + ' (MATIC)', icon: Globe },
                  { label: 'NFT Token', value: `#${cert.tokenId}`, icon: Hash },
                  { label: 'Contract', value: cert.contract, icon: Layers },
                  { label: 'Block', value: `#${cert.block}`, icon: Zap },
                  { label: 'Issued', value: cert.issuedFull, icon: Clock },
                ].map(({ label, value, icon: Icon }, i) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 py-2.5"
                    style={{ borderBottom: i < 4 ? '1px solid var(--hm-border)' : 'none' }}
                  >
                    <Icon
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: 'var(--hm-text-dim)' }}
                    />
                    <span
                      className="hm-mono text-[10px] w-16 shrink-0"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.04em' }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-[12px] font-medium truncate"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {value}
                    </span>
                  </div>
                ))}

                {/* Tx hash (special) */}
                <div className="flex items-start gap-3 pt-2.5">
                  <Hash className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: VIOLET }} />
                  <span
                    className="hm-mono text-[10px] w-16 shrink-0 mt-0.5"
                    style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.04em' }}
                  >
                    Tx Hash
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="hm-mono text-[10px] break-all mb-1.5"
                      style={{ color: VIOLET, lineHeight: 1.5 }}
                    >
                      {cert.txHash}
                    </p>
                    <button
                      type="button"
                      onClick={() => fakeCopy('hash')}
                      className="flex items-center gap-1 text-[10.5px] font-medium"
                      style={{ color: copiedHash ? GREEN : 'var(--hm-text-dim)' }}
                    >
                      {copiedHash ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copiedHash ? 'Copied!' : 'Copy hash'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Explorer button */}
              <div className="px-4 pb-4 pt-1">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 h-10 rounded-xl text-[12.5px] font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${VIOLET}22 0%, ${TEAL}12 100%)`,
                    border: `1px solid ${VIOLET}40`,
                    color: VIOLET,
                  }}
                >
                  <ExternalLink className="h-3.5 w-3.5" /> View on PolygonScan
                </button>
              </div>
            </div>

            {/* Block chain visualization */}
            <div
              className="rounded-2xl p-4"
              style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
            >
              <p
                className="hm-mono text-[9.5px] font-bold mb-3"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
              >
                CHAIN CONTEXT
              </p>
              <div className="flex flex-col gap-1">
                {[
                  { block: '42,847,925', label: 'Latest block', dim: true },
                  { block: '42,847,924', label: '', dim: true },
                  { block: '42,847,923', label: '', dim: true },
                  { block: cert.block, label: 'Your cert here', dim: false },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="flex flex-col items-center">
                      <div
                        className="h-6 w-6 rounded-lg flex items-center justify-center"
                        style={{
                          background: b.dim ? 'var(--hm-bg-card-2)' : `${cert.color}20`,
                          border: `1px solid ${b.dim ? 'var(--hm-border)' : cert.color + '50'}`,
                        }}
                      >
                        <Layers
                          className="h-2.5 w-2.5"
                          style={{ color: b.dim ? 'var(--hm-text-dim)' : cert.color }}
                        />
                      </div>
                      {i < 3 && (
                        <div className="w-px h-1" style={{ background: 'var(--hm-border)' }} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <span
                        className="hm-mono text-[10px]"
                        style={{ color: b.dim ? 'var(--hm-text-dim)' : cert.color }}
                      >
                        #{b.block}
                      </span>
                      {!b.dim && (
                        <span
                          className="hm-mono text-[8.5px] px-1.5 py-0.5 rounded font-bold"
                          style={{
                            background: `${cert.color}18`,
                            color: cert.color,
                            letterSpacing: '0.06em',
                          }}
                        >
                          THIS CERT
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-xl p-3.5"
                style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
              >
                <p
                  className="hm-mono text-[9px] mb-1.5"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
                >
                  TIMES SHARED
                </p>
                <div className="flex items-end gap-1">
                  <span
                    className="text-[22px] font-extrabold"
                    style={{ color: 'var(--hm-text)', letterSpacing: '-0.025em' }}
                  >
                    {cert.shared}
                  </span>
                  <Globe className="h-3.5 w-3.5 mb-1.5" style={{ color: VIOLET }} />
                </div>
              </div>
              <div
                className="rounded-xl p-3.5"
                style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
              >
                <p
                  className="hm-mono text-[9px] mb-1.5"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.08em' }}
                >
                  TOKEN RARITY
                </p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5"
                      style={{ color: i <= 4 ? AMBER : 'var(--hm-border)' }}
                      fill={i <= 4 ? AMBER : 'transparent'}
                    />
                  ))}
                </div>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
                  Top 8% of earners
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentShell>
  )
}

/* ─── Main page ─────────────────────────────────────────── */
export default function StudentCertificates() {
  const [selected, setSelected] = useState<Certificate | null>(null)

  if (selected) {
    return <CertificateDetail cert={selected} onBack={() => setSelected(null)} />
  }

  return (
    <StudentShell activeTab={null}>
      <div
        className="px-6 pt-6 pb-4 flex items-start justify-between gap-4 flex-wrap"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <div>
          <p className="hm-mono text-[10px] mb-1" style={{ color: VIOLET, letterSpacing: '0.2em' }}>
            STUDENT
          </p>
          <h1
            className="text-[22px] font-bold"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            My Certificates
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--hm-text-dim)' }}>
            Blockchain-verified credentials · shareable · tamper-proof
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="rounded-xl px-4 py-2.5"
            style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
          >
            <p
              className="hm-mono text-[9px] mb-0.5"
              style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.1em' }}
            >
              CERTIFICATES
            </p>
            <p
              className="text-[18px] font-bold"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
            >
              {CERTS.length}
            </p>
          </div>
          <div
            className="rounded-xl px-4 py-2.5"
            style={{ background: `${GREEN}12`, border: `1px solid ${GREEN}30` }}
          >
            <p
              className="hm-mono text-[9px] mb-0.5"
              style={{ color: GREEN, letterSpacing: '0.1em', opacity: 0.8 }}
            >
              ALL VERIFIED
            </p>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" style={{ color: GREEN }} />
              <p
                className="text-[18px] font-bold"
                style={{ color: GREEN, letterSpacing: '-0.02em' }}
              >
                On-chain
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chain integrity banner */}
      <div
        className="mx-6 mt-5 flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          background: `linear-gradient(90deg, ${VIOLET}10 0%, ${TEAL}08 50%, transparent 100%)`,
          border: `1px solid ${VIOLET}28`,
        }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
          style={{ background: VIOLET_SOFT, border: `1px solid ${VIOLET}40` }}
        >
          <Shield className="h-4 w-4" style={{ color: VIOLET }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            All certificates are minted as NFTs on Polygon
          </p>
          <p className="text-[11.5px]" style={{ color: 'var(--hm-text-dim)' }}>
            Each certificate is permanently recorded and verifiable by anyone — even without a
            HyperMind account.
          </p>
        </div>
        <a
          href="#"
          className="hm-mono text-[10px] font-bold shrink-0 flex items-center gap-1"
          style={{ color: VIOLET, letterSpacing: '0.06em' }}
        >
          HOW IT WORKS <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Grid */}
      <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CERTS.map((c) => (
          <CertCard key={c.id} cert={c} onClick={() => setSelected(c)} />
        ))}
      </div>
    </StudentShell>
  )
}
