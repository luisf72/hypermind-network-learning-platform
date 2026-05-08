import { useCallback } from 'react'
import { useAuthStore, type Role, type User } from '@/stores/authStore'

export function useAuthSession() {
  const user = useAuthStore((state) => state.user)
  const activeRole = useAuthStore((state) => state.activeRole)
  const switchRoleInStore = useAuthStore((state) => state.switchRole)
  const updateUser = useAuthStore((state) => state.updateUser)

  const getCurrentRole = useCallback(() => activeRole, [activeRole])
  const switchRole = useCallback((nextRole: Role) => switchRoleInStore(nextRole), [switchRoleInStore])
  const getUserDetails = useCallback(() => user, [user])
  const updateUserDetails = useCallback(
    (payload: Partial<User>) => {
      updateUser(payload)
    },
    [updateUser]
  )

  return {
    currentRole: activeRole,
    userDetails: user,
    getCurrentRole,
    switchRole,
    getUserDetails,
    updateUserDetails,
  }
}
