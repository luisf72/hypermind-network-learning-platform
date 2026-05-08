import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  clearAccessToken,
  clearCurrentRole,
  clearStoredUser,
  setCurrentRole,
} from '@/lib/token'
import { pickCurrentRole, type RoleName } from '@/lib/dashboardPaths'

export type AccountRole = RoleName
export type Role = 'guest' | RoleName

export interface User {
  id: string
  name: string
  email: string
  initials: string
  role: AccountRole
  roles: RoleName[]
  xp: number
  karma: number
  hmn: number
  credits: number
}

interface AuthState {
  user: User | null
  activeRole: Role
  setSession: (user: User, activeRole?: Role) => void
  updateUser: (payload: Partial<User>) => void
  logout: () => void
  switchRole: (r: Role) => Role
}

const VALID_ROLES: RoleName[] = ['student', 'creator', 'evaluator', 'admin']

function isRoleName(value: unknown): value is RoleName {
  return typeof value === 'string' && VALID_ROLES.includes(value as RoleName)
}

function normalizeRoles(roles: unknown, fallback: RoleName): RoleName[] {
  const source = Array.isArray(roles) ? roles : []
  const filtered = source.filter(isRoleName)
  if (filtered.length === 0) return [fallback]
  return Array.from(new Set(filtered))
}

// Cleanup legacy `hm.user` key. Auth state persists in `hm-auth`.
clearStoredUser()

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      activeRole: 'guest',
      setSession: (user, activeRole) => {
        const fallbackRole = isRoleName(user.role) ? user.role : 'student'
        const normalizedRoles = normalizeRoles(user.roles, fallbackRole)
        const normalizedUser: User = {
          ...user,
          roles: normalizedRoles,
          role: normalizedRoles.includes(user.role) ? user.role : pickCurrentRole(normalizedRoles),
        }
        const defaultRole = pickCurrentRole(normalizedUser.roles)
        const nextRole =
          activeRole && activeRole !== 'guest' && normalizedUser.roles.includes(activeRole)
            ? activeRole
            : defaultRole
        setCurrentRole(nextRole)
        set({ user: normalizedUser, activeRole: nextRole })
      },
      updateUser: (payload) => {
        const currentUser = get().user
        if (!currentUser) return

        const mergedRoles = payload.roles ?? currentUser.roles
        const normalizedRoles = normalizeRoles(mergedRoles, currentUser.role)
        const mergedUser: User = {
          ...currentUser,
          ...payload,
          roles: normalizedRoles,
          role:
            payload.role && normalizedRoles.includes(payload.role)
              ? payload.role
              : pickCurrentRole(normalizedRoles),
        }
        const currentRole = get().activeRole
        const nextRole =
          currentRole !== 'guest' && mergedUser.roles.includes(currentRole)
            ? currentRole
            : pickCurrentRole(mergedUser.roles)

        setCurrentRole(nextRole)
        set({ user: mergedUser, activeRole: nextRole })
      },
      logout: () => {
        clearAccessToken()
        clearStoredUser()
        clearCurrentRole()
        set({ user: null, activeRole: 'guest' })
      },
      // Demo: any logged-in user can switch perspective among the four shells.
      switchRole: (r) => {
        const currentUser = get().user
        if (!currentUser) return 'guest'
        const normalizedRoles = normalizeRoles(
          currentUser.roles,
          isRoleName(currentUser.role) ? currentUser.role : 'student'
        )
        if (
          (r === 'admin' || r === 'creator' || r === 'evaluator' || r === 'student') &&
          normalizedRoles.includes(r)
        ) {
          setCurrentRole(r)
          set({
            activeRole: r,
            user: {
              ...currentUser,
              roles: normalizedRoles,
              role: normalizedRoles.includes(currentUser.role)
                ? currentUser.role
                : pickCurrentRole(normalizedRoles),
            },
          })
          return r
        }
        return get().activeRole
      },
    }),
    { name: 'hm-auth' }
  )
)
