import { useState, type ReactNode } from 'react'
import AdminShell from '../_shared/AdminShell'
import {
  UserPlus,
  Wrench,
  Mail,
  Upload,
  Boxes,
  Save,
  Settings2,
  Coins,
  Network,
  Wallet,
  ShieldCheck,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Layers,
  Cpu,
  Key,
  TrendingUp,
  RefreshCw,
  Lock,
} from 'lucide-react'

const ACCENT = '#F4636E'
const VIOLET = '#7C5CF6'
const VIOLET_SOFT = 'rgba(124,92,246,0.12)'
const GREEN = '#5EE6A8'
const SOL_A = '#9945FF'
const SOL_B = '#14F195'
const SOL_SOFT = 'rgba(153,69,255,0.10)'

/* ── Types ─────────────────────────────────────────────── */
interface ToggleSetting {
  kind: 'toggle'
  icon: any
  title: string
  description: string
  on: boolean
}
interface InputSetting {
  kind: 'input'
  icon: any
  title: string
  description: string
  value: string
  unit: string
}
type PlatformSetting = ToggleSetting | InputSetting

const PLATFORM_SETTINGS: PlatformSetting[] = [
  {
    kind: 'toggle',
    icon: UserPlus,
    title: 'New user registration',
    description: 'Allow new users to register on the platform.',
    on: true,
  },
  {
    kind: 'toggle',
    icon: Wrench,
    title: 'Maintenance mode',
    description: 'Put the platform in maintenance mode — logged-out users see a maintenance page.',
    on: false,
  },
  {
    kind: 'toggle',
    icon: Mail,
    title: 'Email notifications',
    description:
      'Send email notifications to users for enrollments, assessments, and certificate events.',
    on: true,
  },
  {
    kind: 'input',
    icon: Upload,
    title: 'Max upload file size',
    description:
      'Applies to course thumbnails, assessment images, and support documents. Default: 5 MB.',
    value: '5',
    unit: 'MB',
  },
  {
    kind: 'toggle',
    icon: Boxes,
    title: 'Enable Web3 features',
    description:
      'Controls HMN balance, wallet connection, NFT certificates, blockchain dashboard, and all token-related UI across the platform.',
    on: true,
  },
]

/* ── Shared helpers ─────────────────────────────────────── */
function SectionCard({
  eyebrow,
  title,
  sub,
  Icon,
  iconBg,
  iconColor,
  children,
  headerExtra,
}: {
  eyebrow: string
  title: string
  sub: string
  Icon: any
  iconBg: string
  iconColor: string
  children: ReactNode
  headerExtra?: ReactNode
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--hm-bg-card)',
        border: '1px solid var(--hm-border)',
        boxShadow: 'var(--hm-shadow-card)',
      }}
    >
      <div
        className="px-5 py-4 flex items-start gap-3"
        style={{ borderBottom: '1px solid var(--hm-border)' }}
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
          style={{ background: iconBg, color: iconColor }}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-semibold" style={{ color: 'var(--hm-text)' }}>
            {title}
          </h3>
          <p className="text-[12px] mt-0.5" style={{ color: 'var(--hm-text-muted)' }}>
            {sub}
          </p>
        </div>
        {headerExtra}
      </div>
      {children}
    </div>
  )
}

function InfoRow({
  label,
  value,
  mono = false,
  accent,
  last = false,
}: {
  label: string
  value: ReactNode
  mono?: boolean
  accent?: string
  last?: boolean
}) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-3.5"
      style={{ borderBottom: last ? 'none' : '1px solid var(--hm-border)' }}
    >
      <span className="shrink-0 w-44 text-[12.5px]" style={{ color: 'var(--hm-text-dim)' }}>
        {label}
      </span>
      <span
        className={`flex-1 text-[12.5px] font-medium${mono ? ' hm-mono' : ''}`}
        style={{ color: accent ?? 'var(--hm-text)', wordBreak: 'break-all' }}
      >
        {value}
      </span>
    </div>
  )
}

function AddressCell({ address, explorer }: { address: string; explorer?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="hm-mono text-[12px]" style={{ color: 'var(--hm-text)' }}>
        {address}
      </span>
      <button
        type="button"
        title="Copy address"
        className="flex h-5 w-5 items-center justify-center rounded"
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border)',
          color: 'var(--hm-text-dim)',
        }}
      >
        <Copy className="h-2.5 w-2.5" />
      </button>
      {explorer && (
        <a
          href="#"
          className="flex h-5 w-5 items-center justify-center rounded"
          style={{
            background: 'var(--hm-bg-card-2)',
            border: '1px solid var(--hm-border)',
            color: 'var(--hm-text-dim)',
          }}
        >
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      )}
    </span>
  )
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className="hm-mono inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold"
      style={{
        background: ok ? 'rgba(94,230,168,0.12)' : 'rgba(244,99,110,0.12)',
        color: ok ? GREEN : ACCENT,
      }}
    >
      {ok ? <CheckCircle2 className="h-2.5 w-2.5" /> : <AlertCircle className="h-2.5 w-2.5" />}
      {label}
    </span>
  )
}

function NetworkBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{
        background: 'linear-gradient(90deg,rgba(153,69,255,0.15),rgba(20,241,149,0.12))',
        border: '1px solid rgba(153,69,255,0.30)',
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: SOL_B, boxShadow: `0 0 6px ${SOL_B}` }}
      />
      <span
        className="hm-mono text-[10px] font-semibold"
        style={{
          background: `linear-gradient(90deg,${SOL_A},${SOL_B})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        SOLANA MAINNET-BETA
      </span>
    </span>
  )
}

function BlockchainToggleRow({
  Icon,
  title,
  description,
  on,
  last = false,
}: {
  Icon: any
  title: string
  description: string
  on: boolean
  last?: boolean
}) {
  return (
    <div
      className="flex items-start gap-4 px-5 py-4"
      style={{ borderBottom: last ? 'none' : '1px solid var(--hm-border)' }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0 mt-0.5"
        style={{ background: SOL_SOFT, border: '1px solid rgba(153,69,255,0.20)', color: SOL_A }}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
          {title}
        </p>
        <p className="text-[12px] mt-1 leading-snug" style={{ color: 'var(--hm-text-muted)' }}>
          {description}
        </p>
      </div>
      <div className="shrink-0 mt-1">
        <BigToggle on={on} color={SOL_A} />
      </div>
    </div>
  )
}

/* ── Main ─────────────────────────────────────────────── */
export default function Settings() {
  const [rpcOpen, setRpcOpen] = useState(false)

  return (
    <AdminShell activeId="settings">
      {/* Page header */}
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <p
            className="hm-mono text-[10.5px] mb-2"
            style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.18em' }}
          >
            SYSTEM
          </p>
          <h1
            className="text-[26px] font-semibold tracking-tight"
            style={{ color: 'var(--hm-text)', letterSpacing: '-0.02em' }}
          >
            Platform settings
          </h1>
          <p className="text-[13px] mt-1" style={{ color: 'var(--hm-text-muted)' }}>
            Global configuration for HyperMind. Changes take effect immediately.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-[12.5px] font-semibold"
          style={{
            background: `linear-gradient(180deg,${ACCENT} 0%,${ACCENT}d9 100%)`,
            color: 'white',
            boxShadow: `0 8px 24px -8px ${ACCENT}66`,
          }}
        >
          <Save className="h-3.5 w-3.5" /> Save changes
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {/* ── General settings ────────────────────────── */}
        <SectionCard
          eyebrow="GENERAL"
          title="Platform settings"
          sub="Global toggles and limits that affect every user."
          Icon={Settings2}
          iconBg="var(--hm-violet-soft)"
          iconColor="var(--hm-violet-2)"
        >
          <ul>
            {PLATFORM_SETTINGS.map((s, i) => (
              <SettingRow key={s.title} setting={s} last={i === PLATFORM_SETTINGS.length - 1} />
            ))}
          </ul>
        </SectionCard>

        {/* ── HMN Token identity ─────────────────────── */}
        <SectionCard
          eyebrow="BLOCKCHAIN"
          title="HMN Token"
          sub="SPL token deployed on Solana. Read-only — contact the protocol team to update token parameters."
          Icon={Coins}
          iconBg={SOL_SOFT}
          iconColor={SOL_A}
          headerExtra={<NetworkBadge />}
        >
          {/* Token identity grid */}
          <div className="grid grid-cols-2 gap-0">
            <InfoRow label="Token name" value="HyperMind Token" />
            <InfoRow label="Symbol" value="HMN" mono accent={SOL_A} />
            <InfoRow label="Token standard" value="SPL Token (Solana)" />
            <InfoRow label="Decimals" value="9" mono />
            <InfoRow label="Total supply" value="100,000,000 HMN" mono />
            <InfoRow label="Circulating supply" value="24,500,000 HMN" mono accent={GREEN} />
            <InfoRow label="Locked / vesting" value="42,000,000 HMN" mono />
            <InfoRow label="Burn address" value="1111…1111" mono />
          </div>
          <div style={{ borderTop: '1px solid var(--hm-border)' }}>
            <InfoRow
              label="Mint address"
              value={
                <AddressCell
                  address="HMNx9rVtLW…kP3z"
                  explorer="https://solscan.io/token/HMNx9rVtLW"
                />
              }
            />
            <InfoRow
              label="Token program"
              value={<AddressCell address="TokenkegQfeZyiNwAJbNbGKPFX…5DA" />}
              mono
            />
            <InfoRow
              label="Associated token program"
              value={<AddressCell address="ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJe8bv" />}
              mono
              last
            />
          </div>
        </SectionCard>

        {/* ── Solana network config ──────────────────── */}
        <SectionCard
          eyebrow="BLOCKCHAIN"
          title="Solana network"
          sub="RPC endpoints, explorer links, and on-chain program addresses."
          Icon={Network}
          iconBg={SOL_SOFT}
          iconColor={SOL_A}
        >
          <InfoRow label="Network" value={<NetworkBadge />} />
          <InfoRow label="Chain ID" value="mainnet-beta" mono />
          <InfoRow label="Block time" value="~400 ms" mono accent={GREEN} />
          <InfoRow label="Consensus" value="Tower BFT (PoH + PoS)" />

          {/* RPC accordion */}
          <div style={{ borderTop: '1px solid var(--hm-border)' }}>
            <button
              type="button"
              className="w-full flex items-center gap-4 px-5 py-3.5 text-left"
              onClick={() => setRpcOpen((v) => !v)}
              style={{ borderBottom: rpcOpen ? '1px solid var(--hm-border)' : 'none' }}
            >
              <span className="shrink-0 w-44 text-[12.5px]" style={{ color: 'var(--hm-text-dim)' }}>
                RPC endpoints
              </span>
              <span
                className="flex-1 text-[12.5px] font-medium"
                style={{ color: 'var(--hm-text)' }}
              >
                3 endpoints configured
              </span>
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform"
                style={{
                  color: 'var(--hm-text-dim)',
                  transform: rpcOpen ? 'rotate(180deg)' : 'none',
                }}
              />
            </button>
            {rpcOpen && (
              <div className="px-5 pb-3 flex flex-col gap-2 pt-2">
                {[
                  {
                    label: 'Primary RPC',
                    url: 'https://solana-mainnet.hypermind.io',
                    status: true,
                  },
                  {
                    label: 'Fallback RPC',
                    url: 'https://api.mainnet-beta.solana.com',
                    status: true,
                  },
                  { label: 'Devnet (test)', url: 'https://api.devnet.solana.com', status: false },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      border: '1px solid var(--hm-border)',
                    }}
                  >
                    <span
                      className="hm-mono text-[9.5px] w-20 shrink-0"
                      style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
                    >
                      {r.label.toUpperCase()}
                    </span>
                    <span
                      className="hm-mono text-[11.5px] flex-1 truncate"
                      style={{ color: 'var(--hm-text)' }}
                    >
                      {r.url}
                    </span>
                    <StatusPill ok={r.status} label={r.status ? 'online' : 'inactive'} />
                    <button type="button">
                      <RefreshCw className="h-3 w-3" style={{ color: 'var(--hm-text-dim)' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--hm-border)' }}>
            <InfoRow
              label="Block explorer"
              value={
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-[12.5px]"
                  style={{ color: SOL_A }}
                >
                  solscan.io <ExternalLink className="h-2.5 w-2.5" />
                </a>
              }
            />
            <InfoRow
              label="HMN on Solscan"
              value={<AddressCell address="https://solscan.io/token/HMNx…" explorer="#" />}
            />
            <InfoRow
              label="Solana status page"
              value={
                <span className="inline-flex items-center gap-2 text-[12.5px]">
                  status.solana.com
                  <StatusPill ok label="all systems operational" />
                </span>
              }
              last
            />
          </div>
        </SectionCard>

        {/* ── Platform wallets ───────────────────────── */}
        <SectionCard
          eyebrow="BLOCKCHAIN"
          title="Platform wallets"
          sub="On-chain addresses used for treasury management, fee collection, and certificate minting. All require multi-sig confirmation to change."
          Icon={Wallet}
          iconBg={SOL_SOFT}
          iconColor={SOL_A}
        >
          {[
            {
              label: 'Treasury wallet',
              address: 'TREASx7mNqWf3hKLpR…9Yz',
              role: 'Stores accumulated platform HMN',
              sig: '2-of-3 multisig',
              ok: true,
            },
            {
              label: 'Fee collection wallet',
              address: 'FEECOLvP8kJsNm4aXw…6Bp',
              role: 'Receives 20% platform fee from unlocks',
              sig: 'Admin hot wallet',
              ok: true,
            },
            {
              label: 'Creator escrow wallet',
              address: 'ESCROWn2PqKtHb7dLc…4Wg',
              role: 'Holds 80% creator share before payout',
              sig: 'Program-owned',
              ok: true,
            },
            {
              label: 'Minting authority',
              address: 'MINTAUTHr6Yc9fXv3e…8Kj',
              role: 'Controls HMN token mint (locked for now)',
              sig: '3-of-5 multisig',
              ok: true,
            },
            {
              label: 'Certificate program ID',
              address: 'CERTPROGk1ZdQm8wAx…2Nt',
              role: 'Issues on-chain NFT certificates',
              sig: 'Upgradeable program',
              ok: true,
            },
          ].map((w, i, arr) => (
            <div
              key={w.label}
              className="flex items-start gap-4 px-5 py-4"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--hm-border)' : 'none' }}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0 mt-0.5"
                style={{
                  background: SOL_SOFT,
                  border: '1px solid rgba(153,69,255,0.20)',
                  color: SOL_A,
                }}
              >
                <Wallet className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="text-[13px] font-semibold" style={{ color: 'var(--hm-text)' }}>
                    {w.label}
                  </p>
                  <span
                    className="hm-mono text-[9.5px] px-1.5 py-0.5 rounded"
                    style={{
                      background: 'var(--hm-bg-card-2)',
                      color: 'var(--hm-text-dim)',
                      border: '1px solid var(--hm-border)',
                    }}
                  >
                    {w.sig}
                  </span>
                </div>
                <p className="text-[11.5px] mb-1.5" style={{ color: 'var(--hm-text-muted)' }}>
                  {w.role}
                </p>
                <AddressCell address={w.address} explorer="#" />
              </div>
              <StatusPill ok={w.ok} label={w.ok ? 'verified' : 'unverified'} />
            </div>
          ))}
        </SectionCard>

        {/* ── Token economics toggles ────────────────── */}
        <SectionCard
          eyebrow="BLOCKCHAIN"
          title="Token & on-chain features"
          sub="Feature flags controlling which parts of the Solana integration are active."
          Icon={Layers}
          iconBg={SOL_SOFT}
          iconColor={SOL_A}
        >
          <BlockchainToggleRow
            Icon={Coins}
            title="Auto-distribute creator payouts"
            description="Automatically transfer the 80% creator share to their linked Solana wallet as soon as a course unlock clears the refund window."
            on
          />
          <BlockchainToggleRow
            Icon={ShieldCheck}
            title="On-chain NFT certificate minting"
            description="Mint completion certificates as NFTs on Solana via the Certificate Program. Certificates are publicly verifiable on Solscan."
            on
          />
          <BlockchainToggleRow
            Icon={TrendingUp}
            title="Token-gated course access"
            description="Require a minimum HMN balance to access certain courses or assessment tiers, in addition to standard credits."
            on={false}
          />
          <BlockchainToggleRow
            Icon={Key}
            title="Wallet-based login (Sign-In with Solana)"
            description="Allow users to authenticate using a Solana wallet (Phantom, Backpack, Solflare) in addition to email/password."
            on
          />
          <BlockchainToggleRow
            Icon={Lock}
            title="Smart-contract fee splits"
            description="Route course unlock payments through the on-chain fee-split program instead of a server-side ledger. Requires the Creator Escrow wallet to be funded."
            on={false}
            last
          />
        </SectionCard>

        {/* ── On-chain health snapshot ───────────────── */}
        <SectionCard
          eyebrow="BLOCKCHAIN"
          title="On-chain health"
          sub="Live snapshot of the platform's Solana footprint. Refreshes every 60 s."
          Icon={Cpu}
          iconBg={SOL_SOFT}
          iconColor={SOL_A}
          headerExtra={
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md text-[10.5px] font-medium hm-mono"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text-dim)',
                letterSpacing: '0.06em',
              }}
            >
              <RefreshCw className="h-3 w-3" /> REFRESH
            </button>
          }
        >
          <div className="grid grid-cols-4 gap-0">
            {[
              { label: 'Solana slot', val: '283,741,992', color: 'var(--hm-text)', mono: true },
              { label: 'RPC latency', val: '48 ms', color: GREEN, mono: true },
              { label: 'Fee account balance', val: '2.84 SOL', color: SOL_A, mono: true },
              { label: 'Certs minted today', val: '14', color: SOL_B, mono: true },
              { label: 'HMN price', val: '$0.042', color: 'var(--hm-text)', mono: true },
              { label: '24 h volume', val: '$214,800', color: 'var(--hm-text)', mono: true },
              { label: 'Market cap', val: '$1.03 M', color: 'var(--hm-text)', mono: true },
              { label: 'Holders', val: '18,440', color: GREEN, mono: true },
            ].map(({ label, val, color, mono }) => (
              <div
                key={label}
                className="px-5 py-4"
                style={{
                  borderBottom: '1px solid var(--hm-border)',
                  borderRight: '1px solid var(--hm-border)',
                }}
              >
                <p
                  className="hm-mono text-[9.5px] mb-1.5"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
                >
                  {label.toUpperCase()}
                </p>
                <p
                  className={`text-[15px] font-semibold${mono ? ' hm-mono' : ''}`}
                  style={{ color }}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AdminShell>
  )
}

/* ── Sub-components ─────────────────────────────────────── */
function SettingRow({ setting, last }: { setting: PlatformSetting; last: boolean }) {
  const Icon = setting.icon
  return (
    <li
      className="flex items-start gap-4 px-5 py-4"
      style={{ borderBottom: last ? 'none' : '1px solid var(--hm-border)' }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0 mt-0.5"
        style={{
          background: 'var(--hm-bg-card-2)',
          border: '1px solid var(--hm-border)',
          color: 'var(--hm-text)',
        }}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-semibold" style={{ color: 'var(--hm-text)' }}>
          {setting.title}
        </p>
        <p className="text-[12px] mt-1 leading-snug" style={{ color: 'var(--hm-text-muted)' }}>
          {setting.description}
        </p>
      </div>
      <div className="shrink-0 mt-1">
        {setting.kind === 'toggle' ? (
          <BigToggle on={setting.on} color={ACCENT} />
        ) : (
          <UnitInput value={setting.value} unit={setting.unit} />
        )}
      </div>
    </li>
  )
}

function BigToggle({ on, color }: { on: boolean; color: string }) {
  return (
    <span
      role="switch"
      aria-checked={on}
      className="relative inline-flex h-5 w-9 rounded-full transition-colors shrink-0"
      style={{
        background: on ? color : 'var(--hm-bg-card-2)',
        border: `1px solid ${on ? `${color}80` : 'var(--hm-border)'}`,
        boxShadow: on ? `0 0 0 4px ${color}1A` : 'none',
      }}
    >
      <span
        className="absolute top-[1.5px] h-3.5 w-3.5 rounded-full transition-all"
        style={{
          left: on ? 18 : 2,
          background: 'white',
          boxShadow: on ? `0 0 6px ${color}` : '0 1px 2px rgba(0,0,0,0.4)',
        }}
      />
    </span>
  )
}

function UnitInput({ value, unit }: { value: string; unit: string }): ReactNode {
  return (
    <div
      className="flex items-center rounded-lg overflow-hidden"
      style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
    >
      <input
        defaultValue={value}
        className="hm-mono w-14 bg-transparent px-2.5 h-8 text-[12.5px] text-right outline-none"
        style={{ color: 'var(--hm-text)' }}
      />
      <span
        className="hm-mono text-[10.5px] px-2.5 h-8 inline-flex items-center"
        style={{
          color: 'var(--hm-text-dim)',
          background: 'var(--hm-bg-card)',
          borderLeft: '1px solid var(--hm-border)',
          letterSpacing: '0.10em',
        }}
      >
        {unit}
      </span>
    </div>
  )
}
