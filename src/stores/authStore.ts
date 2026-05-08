import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AccountRole = 'admin' | 'creator' | 'student'
export type Role = 'guest' | AccountRole | 'evaluator'

export interface User {
  id: string
  name: string
  email: string
  initials: string
  role: AccountRole
}

interface AuthState {
  user: User | null
  activeRole: Role
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  switchRole: (r: Role) => void
}

const ACCOUNTS: Record<string, User> = {
  'admin@hypermind.io': {
    id: 'u-admin',
    name: 'Anya Volkov',
    email: 'admin@hypermind.io',
    initials: 'AV',
    role: 'admin',
  },
  'creator@hypermind.io': {
    id: 'u-creator',
    name: 'Sarah Lin',
    email: 'creator@hypermind.io',
    initials: 'SL',
    role: 'creator',
  },
  'student@hypermind.io': {
    id: 'u-student',
    name: 'Alex Kim',
    email: 'student@hypermind.io',
    initials: 'AK',
    role: 'student',
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      activeRole: 'guest',
      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 400))
        const u = ACCOUNTS[email.toLowerCase().trim()]
        if (!u || password !== 'password') {
          throw new Error('Invalid email or password')
        }
        set({ user: u, activeRole: u.role })
        return u
      },
      logout: () => set({ user: null, activeRole: 'guest' }),
      // Demo: any logged-in user can switch perspective among the four shells.
      switchRole: (r) => {
        if (!get().user) return
        if (r === 'admin' || r === 'creator' || r === 'evaluator' || r === 'student') {
          set({ activeRole: r })
        }
      },
    }),
    { name: 'hm-auth' }
  )
)
