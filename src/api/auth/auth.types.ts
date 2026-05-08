export type ROLE = 'admin' | 'creator' | 'evaluator' | 'student'

export enum REGISTER_TYPE {
  EMAIL = 1,
  GOOGLE = 2,
  APPLE = 3,
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  registerType?: REGISTER_TYPE
}

export interface AuthRole {
  id: string
  name: ROLE
}

export interface AuthUser {
  id: string
  email: string
  name: string
  profileImage: string | null
  status: string
  karma: number
  hmn: number
  credits: number
  xp: number
  isEmailVerified: boolean
  roles: AuthRole[]
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  token: string
  user: AuthUser
}

export type RegisterResponse = AuthUser
