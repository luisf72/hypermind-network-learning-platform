import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, UserCell, type Column } from '../_shared/AdminTable'
import { FilterSelect } from '../_shared/FilterSelect'
import { useGetUsers } from '@/api/user/user.api'
import type { User } from '@/api/user/user.types'
import { USER_STATUS } from '@/api/user/user.types'
import type { ROLE } from '@/api/auth/auth.types'

interface UserRow {
  id: string
  full_name: string
  email: string
  initials: string
  roles: ROLE[]
  status: 'active' | 'inactive' | 'suspended'
  karma: number
  hmn: number
  credits: number
  xp: number
  joined: string
}

function initialsFromName(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function orderedRoles(roles: User['roles']): ROLE[] {
  const order: ROLE[] = ['admin', 'evaluator', 'creator', 'student']
  const seen = new Set<ROLE>()
  const out: ROLE[] = []
  for (const r of order) {
    if (roles.some((x) => x.name === r)) {
      seen.add(r)
      out.push(r)
    }
  }
  for (const x of roles) {
    if (!seen.has(x.name)) {
      seen.add(x.name)
      out.push(x.name)
    }
  }
  return out.length > 0 ? out : ['student']
}

function formatRoleName(role: ROLE): string {
  return role.charAt(0).toUpperCase() + role.slice(1)
}

function statusFromApi(status: User['status']): UserRow['status'] {
  if (typeof status === 'string') {
    if (status === 'active') return 'active'
    if (status === 'inactive') return 'inactive'
    if (status === 'suspended' || status === 'blocked') return 'suspended'
  }
  const code = typeof status === 'number' ? status : Number(status)
  if (code === USER_STATUS.ACTIVE) return 'active'
  if (code === USER_STATUS.INACTIVE) return 'inactive'
  if (code === USER_STATUS.BLOCKED) return 'suspended'
  return 'inactive'
}

function toUserRow(u: User): UserRow {
  const created = u.createdAt ? new Date(u.createdAt) : null
  return {
    id: u.id,
    full_name: u.name,
    email: u.email,
    initials: initialsFromName(u.name),
    roles: orderedRoles(u.roles),
    status: statusFromApi(u.status),
    karma: u.karma ?? 0,
    hmn: u.hmn ?? 0,
    credits: u.credits ?? 0,
    xp: u.xp ?? 0,
    joined: created ? created.toLocaleDateString(undefined, { dateStyle: 'medium' }) : '—',
  }
}

const roleTone = (r: ROLE) =>
  r === 'admin' ? 'danger' : r === 'creator' ? 'violet' : r === 'evaluator' ? 'amber' : 'info'

const statusTone = (s: UserRow['status']) =>
  s === 'active' ? 'success' : s === 'inactive' ? 'neutral' : 'danger'

const ROLE_FILTER_OPTIONS: { value: ROLE; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'creator', label: 'Creator' },
  { value: 'evaluator', label: 'Evaluator' },
  { value: 'student', label: 'Student' },
]

const STATUS_FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: String(USER_STATUS.ACTIVE), label: 'Active' },
  { value: String(USER_STATUS.INACTIVE), label: 'Inactive' },
  { value: String(USER_STATUS.BLOCKED), label: 'Blocked' },
  { value: String(USER_STATUS.DELETED), label: 'Deleted' },
]

const COLUMNS: Column<UserRow>[] = [
  {
    header: 'User',
    render: (r) => <UserCell name={r.full_name} email={r.email} initials={r.initials} />,
  },
  {
    header: 'Roles',
    cellWrap: true,
    render: (r) => (
      <div className="flex flex-wrap gap-1 py-0.5 max-w-[15rem]">
        {r.roles.map((role) => (
          <Pill key={role} tone={roleTone(role)} dot={false}>
            {formatRoleName(role)}
          </Pill>
        ))}
      </div>
    ),
  },
  { header: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
  { header: 'Karma', align: 'right', render: (r) => <Mono>{r.karma.toLocaleString()}</Mono> },
  { header: 'HMN', align: 'right', render: (r) => <Mono>{r.hmn.toLocaleString()}</Mono> },
  { header: 'Credits', align: 'right', render: (r) => <Mono>{r.credits.toLocaleString()}</Mono> },
  { header: 'XP', align: 'right', render: (r) => <Mono>{r.xp.toLocaleString()}</Mono> },
  { header: 'Joined', align: 'right', render: (r) => <Mono>{r.joined}</Mono> },
]

export default function AdminUsers() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [searchDraft, setSearchDraft] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(searchDraft.trim()), 350)
    return () => window.clearTimeout(t)
  }, [searchDraft])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, roleFilter, statusFilter])

  const searchParam = debouncedSearch.length > 0 ? debouncedSearch : undefined
  const roleParam = roleFilter === '' ? undefined : (roleFilter as ROLE)
  const statusParam =
    statusFilter === '' ? undefined : (Number(statusFilter) as USER_STATUS)

  const { data, isPending, isFetching, isError, isPlaceholderData } = useGetUsers({
    page,
    search: searchParam,
    role: roleParam,
    status: statusParam,
  })

  /** Full overlay during first load and when the query key changes (page, filters, search) while keeping prior rows. */
  const showTableLoader = isPending || (isFetching && isPlaceholderData)

  const rows = useMemo(() => (data?.items ?? []).map(toUserRow), [data?.items])

  const pagination = data
    ? {
        page: data.meta.currentPage,
        totalPages: Math.max(1, data.meta.totalPages),
        totalItems: data.meta.totalItems,
        itemCount: data.meta.itemCount,
        pageSize: data.meta.itemsPerPage,
        onPageChange: (p: number) => setPage(p),
      }
    : null

  const hasFilters = roleFilter !== '' || statusFilter !== ''

  return (
    <AdminShell activeId="users">
      <AdminTable
        eyebrow="People & access"
        title="Users"
        subtitle="All accounts on the platform with their points balances."
        searchPlaceholder="Search by name or email…"
        searchValue={searchDraft}
        onSearchChange={setSearchDraft}
        filterControls={
          <div className="flex flex-wrap items-center gap-2">
            <FilterSelect
              label="All roles"
              value={roleFilter}
              options={ROLE_FILTER_OPTIONS}
              onChange={setRoleFilter}
            />
            <FilterSelect
              label="All statuses"
              value={statusFilter}
              options={STATUS_FILTER_OPTIONS}
              onChange={setStatusFilter}
            />
          </div>
        }
        columns={COLUMNS}
        rows={rows}
        totalCount={data?.meta.totalItems}
        isLoading={showTableLoader}
        isFetching={isFetching && !showTableLoader}
        pagination={pagination}
        emptyMessage={
          isError
            ? 'Something went wrong loading users.'
            : searchParam || hasFilters
              ? 'No users match your filters.'
              : 'No users yet.'
        }
        onRowAction={(row) => navigate(`/admin/users/${row.id}`)}
      />
    </AdminShell>
  )
}
