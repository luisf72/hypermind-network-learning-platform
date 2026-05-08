import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, UserCell, type Column } from '../_shared/AdminTable'
import { UserPlus } from 'lucide-react'

interface UserRow {
  id: string
  full_name: string
  email: string
  initials: string
  role: 'Admin' | 'Creator' | 'Evaluator' | 'Student'
  status: 'active' | 'inactive' | 'suspended'
  karma: number
  hmn: number
  credits: number
  xp: number
  joined: string
}

const ROWS: UserRow[] = [
  {
    id: 'u-001',
    full_name: 'Anya Volkov',
    email: 'anya@hypermind.io',
    initials: 'AV',
    role: 'Admin',
    status: 'active',
    karma: 12480,
    hmn: 4820,
    credits: 9800,
    xp: 184200,
    joined: 'Mar 12, 2024',
  },
  {
    id: 'u-002',
    full_name: 'Sarah Lin',
    email: 'sarah.lin@studio.com',
    initials: 'SL',
    role: 'Creator',
    status: 'active',
    karma: 8240,
    hmn: 3140,
    credits: 4200,
    xp: 92800,
    joined: 'Apr 02, 2024',
  },
  {
    id: 'u-003',
    full_name: 'David Park',
    email: 'd.park@labs.io',
    initials: 'DP',
    role: 'Student',
    status: 'active',
    karma: 3120,
    hmn: 840,
    credits: 1200,
    xp: 21400,
    joined: 'Apr 18, 2024',
  },
  {
    id: 'u-004',
    full_name: 'Marie Dubois',
    email: 'marie@duboi.studio',
    initials: 'MD',
    role: 'Evaluator',
    status: 'active',
    karma: 4820,
    hmn: 1680,
    credits: 2400,
    xp: 41200,
    joined: 'May 06, 2024',
  },
  {
    id: 'u-005',
    full_name: 'Carlos Mendoza',
    email: 'carlos.m@hypermind.io',
    initials: 'CM',
    role: 'Creator',
    status: 'active',
    karma: 6240,
    hmn: 2240,
    credits: 3100,
    xp: 62400,
    joined: 'May 22, 2024',
  },
  {
    id: 'u-006',
    full_name: 'Aiko Tanaka',
    email: 'aiko@tnk.co',
    initials: 'AT',
    role: 'Student',
    status: 'suspended',
    karma: 840,
    hmn: 120,
    credits: 100,
    xp: 2400,
    joined: 'Jun 04, 2024',
  },
  {
    id: 'u-007',
    full_name: 'Marcus Reed',
    email: 'm.reed@hypermind.io',
    initials: 'MR',
    role: 'Student',
    status: 'active',
    karma: 2840,
    hmn: 720,
    credits: 1100,
    xp: 18600,
    joined: 'Jul 11, 2024',
  },
  {
    id: 'u-008',
    full_name: 'Priya Sharma',
    email: 'priya@sharma.io',
    initials: 'PS',
    role: 'Creator',
    status: 'active',
    karma: 5420,
    hmn: 1820,
    credits: 2700,
    xp: 48200,
    joined: 'Aug 28, 2024',
  },
  {
    id: 'u-009',
    full_name: 'Lukas Becker',
    email: 'lukas@beckerlab.de',
    initials: 'LB',
    role: 'Evaluator',
    status: 'inactive',
    karma: 1820,
    hmn: 420,
    credits: 600,
    xp: 9800,
    joined: 'Sep 15, 2024',
  },
  {
    id: 'u-010',
    full_name: 'Sophia Chen',
    email: 'sophia@chen.dev',
    initials: 'SC',
    role: 'Student',
    status: 'active',
    karma: 4120,
    hmn: 1240,
    credits: 1800,
    xp: 31200,
    joined: 'Oct 02, 2024',
  },
  {
    id: 'u-011',
    full_name: 'Omar Haddad',
    email: 'omar@haddad.studio',
    initials: 'OH',
    role: 'Creator',
    status: 'active',
    karma: 3820,
    hmn: 920,
    credits: 1600,
    xp: 24800,
    joined: 'Nov 18, 2024',
  },
]

const roleTone = (r: UserRow['role']) =>
  r === 'Admin' ? 'danger' : r === 'Creator' ? 'violet' : r === 'Evaluator' ? 'amber' : 'info'

const statusTone = (s: UserRow['status']) =>
  s === 'active' ? 'success' : s === 'inactive' ? 'neutral' : 'danger'

const COLUMNS: Column<UserRow>[] = [
  {
    header: 'User',
    render: (r) => <UserCell name={r.full_name} email={r.email} initials={r.initials} />,
  },
  { header: 'Role', render: (r) => <Pill tone={roleTone(r.role)}>{r.role}</Pill> },
  { header: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
  { header: 'Karma', align: 'right', render: (r) => <Mono>{r.karma.toLocaleString()}</Mono> },
  { header: 'HMN', align: 'right', render: (r) => <Mono>{r.hmn.toLocaleString()}</Mono> },
  { header: 'Credits', align: 'right', render: (r) => <Mono>{r.credits.toLocaleString()}</Mono> },
  { header: 'XP', align: 'right', render: (r) => <Mono>{r.xp.toLocaleString()}</Mono> },
  { header: 'Joined', align: 'right', render: (r) => <Mono>{r.joined}</Mono> },
]

export default function AdminUsers() {
  return (
    <AdminShell activeId="users">
      <AdminTable
        eyebrow="People & access"
        title="Users"
        subtitle="All accounts on the platform with their points balances."
        primaryAction={{ label: 'Invite user', icon: UserPlus }}
        searchPlaceholder="Search by name or email…"
        filters={['Role', 'Status']}
        columns={COLUMNS}
        rows={ROWS}
        totalCount={28491}
        pageInfo={{ current: 1, total: 712 }}
        onRowAction={() => {
          /* opens user detail page */
        }}
      />
    </AdminShell>
  )
}
