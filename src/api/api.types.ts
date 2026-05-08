import { AxiosError } from 'axios'

// -----------------------------------------------------------------------------
// Standard API envelope
// -----------------------------------------------------------------------------

/**
 * Standard JSON body returned by backend endpoints: a `result` payload plus
 * metadata (`success`, `code`, `message`, etc.).
 */
export interface Response<T> {
  code: number
  message: string
  result: T
  status: string
  statusMessage: string
  success: boolean
}

export type StringResponse = Response<string>

/** One entity wrapped in the standard envelope. */
export type ApiEntityResponse<T> = Response<T>

// -----------------------------------------------------------------------------
// Pagination
// -----------------------------------------------------------------------------

/** `meta` object on paginated list responses (`items` + `meta` wire format). */
export interface PaginatedListMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

/** Paginated list body as returned in `Response.result` for list endpoints. */
export interface PaginatedListResult<TItem> {
  items: TItem[]
  meta: PaginatedListMeta
}

/** Standard envelope around a paginated list (`result.items` + `result.meta`). */
export type ApiListResponse<TItem> = Response<PaginatedListResult<TItem>>

/**
 * Normalized pagination shape (flat `records` + page metadata).
 * Convert from {@link PaginatedListResult} with {@link paginatedListToFetchResults}
 * in `@/api/helpers`.
 */
export interface FetchResults<T> {
  records: T[]
  total: number
  page: number
  limit: number
}

export type SortOrderDirection = 'asc' | 'desc' | null

/**
 * Lightweight key-of helper used by paginated query params. Allows the
 * caller to either pass a top-level key of `T` or any string (for nested
 * keys like `"profile.name"`).
 */
export type DeepKeyOf<T> = (keyof T & string) | (string & {})

export type Selectors<T> = Partial<Record<keyof T, boolean | 0 | 1>>

/** Values allowed in {@link PaginationQueryParams.extraQueryParams}. */
export type ExtraQueryParamValue = string | number | boolean | null | undefined

/**
 * Shared list-query fields. Typical usage: `page`, optional `limit` (list hooks
 * default to `DEFAULT_PAGE_LIMIT` in `globalConfig.ts` when omitted),
 * `search`, optional `sortBy` / `sortOrder`. Wire query key for text filter is `search`.
 * Use {@link extraQueryParams} for endpoint-specific keys (filters, flags, etc.).
 */
export interface PaginationQueryParams<T> {
  page?: number
  limit?: number
  search?: string
  sortBy?: DeepKeyOf<T> | null
  sortOrder?: SortOrderDirection
  selectors?: Selectors<T>
  /** Arbitrary query params merged after the standard pagination keys. */
  extraQueryParams?: Record<string, ExtraQueryParamValue>
}

export interface FilterBasedOnPersonParams {
  filterByUserId?: string
  filterByConsultantId?: string
}

// -----------------------------------------------------------------------------
// Response helpers (runtime)
// -----------------------------------------------------------------------------

export function isStandardApiResponse(value: unknown): value is Response<unknown> {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return typeof v.success === 'boolean' && 'result' in v
}

/**
 * Type-guard for axios errors that follow the project's standard
 * { response: { data: { message: string } } } shape.
 */
export function isResponseError(
  err: unknown
): err is Error & { response: { data: { message: string } } } {
  if (!err || typeof err !== 'object') return false
  const maybe = err as {
    response?: { data?: { message?: unknown } }
  }
  return (
    !!maybe.response &&
    typeof maybe.response === 'object' &&
    !!maybe.response.data &&
    typeof maybe.response.data === 'object' &&
    typeof maybe.response.data.message === 'string'
  )
}

/** Returns true when the error is an Axios error with the given status code. */
export function isResponseErrorStatusCode(error: unknown, statusCode: number): boolean {
  if (!(error instanceof AxiosError)) return false
  if (!error.response?.status) return false
  if (Number.isNaN(error.response.status)) return false
  if (!statusCode || Number.isNaN(statusCode)) return false
  return Number(error.response.status) === statusCode
}
