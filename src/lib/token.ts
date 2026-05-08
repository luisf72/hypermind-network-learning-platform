/**
 * Persists the API access token in `localStorage` so it survives page
 * reloads. Used by `axios.ts` to attach the `Authorization` header.
 *
 * Kept intentionally minimal — swap to httpOnly cookies / secure storage
 * once the backend supports it.
 */

const ACCESS_TOKEN_STORAGE_KEY = 'hm.accessToken'
const AUTH_USER_STORAGE_KEY = 'hm.user'
const AUTH_CURRENT_ROLE_STORAGE_KEY = 'hm.current_role'

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

export function getAccessToken(): string | null {
  if (!isBrowser) return null
  try {
    return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
  } catch {
    return null
  }
}

export function setAccessToken(token: string): void {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token)
  } catch {
    // ignore storage errors (e.g. quota / private mode)
  }
}

export function clearAccessToken(): void {
  if (!isBrowser) return
  try {
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function clearStoredUser(): void {
  if (!isBrowser) return
  try {
    window.localStorage.removeItem(AUTH_USER_STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function setCurrentRole(role: string): void {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(AUTH_CURRENT_ROLE_STORAGE_KEY, role)
  } catch {
    // ignore
  }
}

export function clearCurrentRole(): void {
  if (!isBrowser) return
  try {
    window.localStorage.removeItem(AUTH_CURRENT_ROLE_STORAGE_KEY)
  } catch {
    // ignore
  }
}
