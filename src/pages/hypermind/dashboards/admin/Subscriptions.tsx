import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, UserCell, type Column } from '../_shared/AdminTable'
import { Download, ShieldAlert, Sparkles, Award, GraduationCap } from 'lucide-react'

type RoleName = 'Admin' | 'Creator' | 'Evaluator' | 'Student'

interface SubscriptionRow {
  id: string
  user_name: string
  user_email: string
  user_initials: string
  roles: RoleName[]
  plan: string
  status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing' | 'unpaid'
  stripe_subscription_id: string
  renews_at: string
  created_at: string
}

const ROLE_ICON: Record<RoleName, { Icon: any; color: string; bg: string }> = {
  Admin: { Icon: ShieldAlert, color: '#F4636E', bg: 'rgba(244,99,110,0.14)' },
  Creator: { Icon: Sparkles, color: '#A78BFA', bg: 'rgba(167,139,250,0.14)' },
  Evaluator: { Icon: Award, color: '#F4B26C', bg: 'rgba(244,178,108,0.14)' },
  Student: { Icon: GraduationCap, color: '#7BC8C5', bg: 'rgba(123,200,197,0.14)' },
}

const ROWS: SubscriptionRow[] = [
  {
    id: 's-001',
    user_name: 'Sarah Lin',
    user_email: 'sarah.lin@studio.com',
    user_initials: 'SL',
    roles: ['Creator', 'Student'],
    plan: 'Pro Annual',
    status: 'active',
    stripe_subscription_id: 'sub_1QpA7zXB28K9LM',
    renews_at: 'Mar 12, 2027',
    created_at: 'Mar 12, 2025',
  },
  {
    id: 's-002',
    user_name: 'Marie Dubois',
    user_email: 'marie@duboi.studio',
    user_initials: 'MD',
    roles: ['Evaluator', 'Student'],
    plan: 'Studio Mo.',
    status: 'active',
    stripe_subscription_id: 'sub_1QpB4tXB28K9LM',
    renews_at: 'May 14, 2026',
    created_at: 'Apr 14, 2025',
  },
  {
    id: 's-003',
    user_name: 'David Park',
    user_email: 'd.park@labs.io',
    user_initials: 'DP',
    roles: ['Student'],
    plan: 'Pro Monthly',
    status: 'trialing',
    stripe_subscription_id: 'sub_1QpC2sXB28K9LM',
    renews_at: 'May 06, 2026',
    created_at: 'Apr 22, 2026',
  },
  {
    id: 's-004',
    user_name: 'Carlos Mendoza',
    user_email: 'carlos.m@hypermind.io',
    user_initials: 'CM',
    roles: ['Creator'],
    plan: 'Studio An.',
    status: 'active',
    stripe_subscription_id: 'sub_1QpD9pXB28K9LM',
    renews_at: 'Aug 03, 2026',
    created_at: 'Aug 03, 2025',
  },
  {
    id: 's-005',
    user_name: 'Aiko Tanaka',
    user_email: 'aiko@tnk.co',
    user_initials: 'AT',
    roles: ['Student'],
    plan: 'Pro Monthly',
    status: 'past_due',
    stripe_subscription_id: 'sub_1QpE6oXB28K9LM',
    renews_at: 'Apr 18, 2026',
    created_at: 'Sep 18, 2025',
  },
  {
    id: 's-006',
    user_name: 'Marcus Reed',
    user_email: 'm.reed@hypermind.io',
    user_initials: 'MR',
    roles: ['Student'],
    plan: 'Pro Annual',
    status: 'active',
    stripe_subscription_id: 'sub_1QpF1nXB28K9LM',
    renews_at: 'Oct 11, 2026',
    created_at: 'Oct 11, 2025',
  },
  {
    id: 's-007',
    user_name: 'Priya Sharma',
    user_email: 'priya@sharma.io',
    user_initials: 'PS',
    roles: ['Creator', 'Student'],
    plan: 'Studio Mo.',
    status: 'active',
    stripe_subscription_id: 'sub_1QpG8mXB28K9LM',
    renews_at: 'May 28, 2026',
    created_at: 'Nov 28, 2025',
  },
  {
    id: 's-008',
    user_name: 'Lukas Becker',
    user_email: 'lukas@beckerlab.de',
    user_initials: 'LB',
    roles: ['Evaluator'],
    plan: 'Pro Monthly',
    status: 'canceled',
    stripe_subscription_id: 'sub_1QpH3lXB28K9LM',
    renews_at: 'Mar 15, 2026',
    created_at: 'Dec 15, 2025',
  },
  {
    id: 's-009',
    user_name: 'Sophia Chen',
    user_email: 'sophia@chen.dev',
    user_initials: 'SC',
    roles: ['Student'],
    plan: 'Pro Annual',
    status: 'active',
    stripe_subscription_id: 'sub_1QpI5kXB28K9LM',
    renews_at: 'Jan 02, 2027',
    created_at: 'Jan 02, 2026',
  },
  {
    id: 's-010',
    user_name: 'Omar Haddad',
    user_email: 'omar@haddad.studio',
    user_initials: 'OH',
    roles: ['Creator'],
    plan: 'Studio An.',
    status: 'incomplete',
    stripe_subscription_id: 'sub_1QpJ7jXB28K9LM',
    renews_at: 'Mar 18, 2026',
    created_at: 'Mar 18, 2026',
  },
]

const statusTone = (s: SubscriptionRow['status']) =>
  s === 'active'
    ? 'success'
    : s === 'trialing'
      ? 'violet'
      : s === 'past_due'
        ? 'warning'
        : s === 'incomplete'
          ? 'amber'
          : s === 'canceled'
            ? 'neutral'
            : 'danger'

function RoleIcons({ roles }: { roles: RoleName[] }) {
  return (
    <div className="flex items-center gap-1">
      {roles.map((role) => {
        const { Icon, color, bg } = ROLE_ICON[role]
        return (
          <span
            key={role}
            title={role}
            className="flex h-6 w-6 items-center justify-center rounded-md shrink-0"
            style={{ background: bg, color }}
          >
            <Icon className="h-3 w-3" />
          </span>
        )
      })}
    </div>
  )
}

const COLUMNS: Column<SubscriptionRow>[] = [
  {
    header: 'User',
    render: (r) => <UserCell name={r.user_name} email={r.user_email} initials={r.user_initials} />,
  },
  {
    header: 'Plan',
    render: (r) => (
      <Pill tone="violet" dot={false}>
        {r.plan}
      </Pill>
    ),
  },
  {
    header: 'Roles',
    render: (r) => <RoleIcons roles={r.roles} />,
  },
  {
    header: 'Status',
    render: (r) => <Pill tone={statusTone(r.status)}>{r.status.replace('_', ' ')}</Pill>,
  },
  {
    header: 'Subscription ID',
    render: (r) => <Mono>{r.stripe_subscription_id}</Mono>,
  },
  {
    header: 'Renews at',
    align: 'right',
    render: (r) => <Mono>{r.renews_at}</Mono>,
  },
  {
    header: 'Created',
    align: 'right',
    render: (r) => <Mono>{r.created_at}</Mono>,
  },
]

export default function Subscriptions() {
  return (
    <AdminShell activeId="subscriptions">
      <AdminTable
        eyebrow="Commerce"
        title="Subscriptions"
        subtitle="Stripe-mirrored subscription records per user."
        primaryAction={{ label: 'Export CSV', icon: Download }}
        searchPlaceholder="Search by user, email or subscription ID…"
        columns={COLUMNS}
        rows={ROWS}
        totalCount={3140}
        pageInfo={{ current: 1, total: 79 }}
        showActionsCol={false}
      />
    </AdminShell>
  )
}
