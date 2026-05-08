import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, UserCell, type Column } from '../_shared/AdminTable'
import { Download } from 'lucide-react'

interface TransactionRow {
  id: string
  user_name: string
  user_email: string
  user_initials: string
  type: 'subscription' | 'one_time' | 'credit_purchase'
  amount_cents: number
  currency: string
  status: 'pending' | 'succeeded' | 'failed' | 'refunded'
  stripe_payment_intent_id: string
  created_at: string
}

const ROWS: TransactionRow[] = [
  {
    id: 'tx-001',
    user_name: 'Sarah Lin',
    user_email: 'sarah.lin@studio.com',
    user_initials: 'SL',
    type: 'subscription',
    amount_cents: 24900,
    currency: 'USD',
    status: 'succeeded',
    stripe_payment_intent_id: 'pi_3QrA8aXB28K9LMtA',
    created_at: 'Apr 28, 2026 09:42',
  },
  {
    id: 'tx-002',
    user_name: 'David Park',
    user_email: 'd.park@labs.io',
    user_initials: 'DP',
    type: 'credit_purchase',
    amount_cents: 4900,
    currency: 'USD',
    status: 'succeeded',
    stripe_payment_intent_id: 'pi_3QrB2bXB28K9LMtB',
    created_at: 'Apr 28, 2026 08:18',
  },
  {
    id: 'tx-003',
    user_name: 'Marie Dubois',
    user_email: 'marie@duboi.studio',
    user_initials: 'MD',
    type: 'subscription',
    amount_cents: 9900,
    currency: 'USD',
    status: 'succeeded',
    stripe_payment_intent_id: 'pi_3QrC4cXB28K9LMtC',
    created_at: 'Apr 28, 2026 06:54',
  },
  {
    id: 'tx-004',
    user_name: 'Aiko Tanaka',
    user_email: 'aiko@tnk.co',
    user_initials: 'AT',
    type: 'subscription',
    amount_cents: 1900,
    currency: 'USD',
    status: 'failed',
    stripe_payment_intent_id: 'pi_3QrD6dXB28K9LMtD',
    created_at: 'Apr 27, 2026 22:12',
  },
  {
    id: 'tx-005',
    user_name: 'Carlos Mendoza',
    user_email: 'carlos.m@hypermind.io',
    user_initials: 'CM',
    type: 'one_time',
    amount_cents: 12000,
    currency: 'USD',
    status: 'succeeded',
    stripe_payment_intent_id: 'pi_3QrE8eXB28K9LMtE',
    created_at: 'Apr 27, 2026 18:40',
  },
  {
    id: 'tx-006',
    user_name: 'Priya Sharma',
    user_email: 'priya@sharma.io',
    user_initials: 'PS',
    type: 'credit_purchase',
    amount_cents: 9900,
    currency: 'USD',
    status: 'succeeded',
    stripe_payment_intent_id: 'pi_3QrF0fXB28K9LMtF',
    created_at: 'Apr 27, 2026 14:02',
  },
  {
    id: 'tx-007',
    user_name: 'Lukas Becker',
    user_email: 'lukas@beckerlab.de',
    user_initials: 'LB',
    type: 'subscription',
    amount_cents: 1900,
    currency: 'USD',
    status: 'refunded',
    stripe_payment_intent_id: 'pi_3QrG2gXB28K9LMtG',
    created_at: 'Apr 27, 2026 11:18',
  },
  {
    id: 'tx-008',
    user_name: 'Marcus Reed',
    user_email: 'm.reed@hypermind.io',
    user_initials: 'MR',
    type: 'subscription',
    amount_cents: 24900,
    currency: 'USD',
    status: 'succeeded',
    stripe_payment_intent_id: 'pi_3QrH4hXB28K9LMtH',
    created_at: 'Apr 26, 2026 21:44',
  },
  {
    id: 'tx-009',
    user_name: 'Sophia Chen',
    user_email: 'sophia@chen.dev',
    user_initials: 'SC',
    type: 'credit_purchase',
    amount_cents: 2400,
    currency: 'USD',
    status: 'succeeded',
    stripe_payment_intent_id: 'pi_3QrI6iXB28K9LMtI',
    created_at: 'Apr 26, 2026 17:30',
  },
  {
    id: 'tx-010',
    user_name: 'Omar Haddad',
    user_email: 'omar@haddad.studio',
    user_initials: 'OH',
    type: 'subscription',
    amount_cents: 9900,
    currency: 'USD',
    status: 'pending',
    stripe_payment_intent_id: 'pi_3QrJ8jXB28K9LMtJ',
    created_at: 'Apr 26, 2026 14:08',
  },
]

const typeTone = (t: TransactionRow['type']) =>
  t === 'subscription' ? 'violet' : t === 'credit_purchase' ? 'info' : 'amber'

const statusTone = (s: TransactionRow['status']) =>
  s === 'succeeded'
    ? 'success'
    : s === 'pending'
      ? 'warning'
      : s === 'failed'
        ? 'danger'
        : 'neutral'

function fmtAmount(cents: number, currency: string) {
  return `${(cents / 100).toFixed(2)} ${currency}`
}

const COLUMNS: Column<TransactionRow>[] = [
  {
    header: 'User',
    render: (r) => <UserCell name={r.user_name} email={r.user_email} initials={r.user_initials} />,
  },
  {
    header: 'Type',
    render: (r) => <Pill tone={typeTone(r.type)}>{r.type.replace('_', ' ')}</Pill>,
  },
  {
    header: 'Amount',
    align: 'right',
    render: (r) => (
      <span className="font-medium" style={{ color: 'var(--hm-text)' }}>
        {fmtAmount(r.amount_cents, r.currency)}
      </span>
    ),
  },
  { header: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
  { header: 'Payment intent', render: (r) => <Mono>{r.stripe_payment_intent_id}</Mono> },
  { header: 'Created', align: 'right', render: (r) => <Mono>{r.created_at}</Mono> },
]

export default function Transactions() {
  return (
    <AdminShell activeId="transactions">
      <AdminTable
        eyebrow="Commerce"
        title="Transactions"
        subtitle="Stripe payment events log across all users."
        primaryAction={{ label: 'Export CSV', icon: Download }}
        searchPlaceholder="Search by user, intent or charge ID…"
        columns={COLUMNS}
        rows={ROWS}
        totalCount={48720}
        pageInfo={{ current: 1, total: 1218 }}
        showActionsCol={false}
      />
    </AdminShell>
  )
}
