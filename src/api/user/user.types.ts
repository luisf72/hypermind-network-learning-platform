import type { ROLE } from '../auth/auth.types'
import type { ApiListResponse, PaginationQueryParams, Response, StringResponse } from '../api.types'

export enum USER_STATUS {
  ACTIVE = 1,
  INACTIVE = 2,
  BLOCKED = 3,
  DELETED = 4,
}

export interface UserRole {
  id?: string
  name: ROLE
}

export interface User {
  id: string
  uuid?: string
  name: string
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  profileImage?: string | null
  roles: UserRole[]
  status: USER_STATUS | string
  karma?: number
  hmn?: number
  credits?: number
  xp?: number
  isEmailVerified: boolean
  isPhoneVerified?: boolean
  createdAt?: string
  joinedAt?: string
  updatedAt?: string
}

export interface UserDetail extends User {
  address?: string
  bio?: string
  meta?: Record<string, unknown>
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  roles?: ROLE[]
  phone?: string
}

export type UpdateUserPayload = Partial<
  Pick<User, 'name' | 'firstName' | 'lastName' | 'phone' | 'profileImage' | 'roles' | 'status'>
> & {
  bio?: string
  address?: string
}

/**
 * `/user/list` query args: base pagination ({@link PaginationQueryParams}),
 * optional `role` / `status` filters (sent as `role` and `status` query params),
 * plus anything else via `extraQueryParams`.
 */
export type GetUsersParams = PaginationQueryParams<User> & {
  role?: ROLE
  status?: USER_STATUS
}
export type GetUsersResponse = ApiListResponse<User>
export type GetUserByIdResponse = Response<UserDetail>
export type GetMeResponse = Response<UserDetail>
export type CreateUserResponse = Response<UserDetail>
export type UpdateUserResponse = Response<UserDetail>
export type DeleteUserResponse = StringResponse
