import type {
  ExtraQueryParamValue,
  FetchResults,
  PaginatedListResult,
  Response,
  SortOrderDirection,
} from './api.types'

export interface PaginationQueryUrlParams {
  url: string
  page?: number
  limit?: number
  search?: string
  sortBy?: string | null
  sortOrder?: SortOrderDirection
  /** Appended after standard keys; `null` / `undefined` values are skipped. */
  extraQueryParams?: Record<string, ExtraQueryParamValue>
}

function appendExtraQueryParams(
  params: URLSearchParams,
  extra: Record<string, ExtraQueryParamValue> | undefined
): void {
  if (!extra) return
  for (const [key, value] of Object.entries(extra)) {
    if (value === undefined || value === null) continue
    params.set(key, String(value))
  }
}

/**
 * Builds query strings for paginated list endpoints, e.g.
 * `?page=1&limit=…&search=…&sortBy=…`. Standard keys: `page`, `limit`, `search`,
 * `sortBy`, `sortOrder`. Merge endpoint-specific filters via `extraQueryParams`.
 * Empty / nullish values are omitted.
 */
export function getPaginationQueryUrl({
  url,
  page,
  limit,
  search,
  sortBy,
  sortOrder,
  extraQueryParams,
}: PaginationQueryUrlParams): string {
  const params = new URLSearchParams()

  if (typeof page === 'number') params.set('page', String(page))
  if (typeof limit === 'number') params.set('limit', String(limit))
  if (search) params.set('search', search)
  if (sortBy) params.set('sortBy', String(sortBy))
  if (sortOrder) params.set('sortOrder', sortOrder)

  appendExtraQueryParams(params, extraQueryParams)

  const qs = params.toString()
  return qs ? `${url}?${qs}` : url
}

/** Extracts `result` from the standard {@link Response} envelope. */
export function unwrapApiResult<T>(envelope: Response<T>): T {
  return envelope.result
}

/**
 * If `data` is a standard envelope with a non-nullish `result`, returns `result`.
 * Otherwise returns `data` as the payload (for endpoints that return an unwrapped body).
 */
export function coerceApiResult<T>(data: T | Response<T>): T {
  if (
    data &&
    typeof data === 'object' &&
    'result' in data &&
    (data as Response<T>).result != null
  ) {
    return (data as Response<T>).result
  }
  return data as T
}

/** Maps API list shape (`items` + `meta`) to flat {@link FetchResults}. */
export function paginatedListToFetchResults<TItem>(
  list: PaginatedListResult<TItem>
): FetchResults<TItem> {
  return {
    records: list.items,
    total: list.meta.totalItems,
    page: list.meta.currentPage,
    limit: list.meta.itemsPerPage,
  }
}

/** Resolves a translated error message from an unknown error. */
export function resolveErrorMessage(error: unknown, fallback: string): string {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'data' in error.response &&
    error.response.data &&
    typeof error.response.data === 'object' &&
    'message' in error.response.data &&
    typeof (error.response.data as { message: unknown }).message === 'string'
  ) {
    return (error.response.data as { message: string }).message
  }

  if (error instanceof Error && error.message) return error.message

  return fallback
}
