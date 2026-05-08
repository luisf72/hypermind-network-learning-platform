import type {
  ApiListResponse,
  PaginationQueryParams,
  Response,
  StringResponse,
} from '../api.types'

export interface CourseCategory {
  id: string
  name: string
  description: string
  isActive: boolean
}

export interface CreateCourseCategoryPayload {
  name: string
  description: string
  isActive?: boolean
}

export type UpdateCourseCategoryPayload = Partial<
  Pick<CourseCategory, 'name' | 'description' | 'isActive'>
>

export type GetCourseCategoriesPaginatedParams = PaginationQueryParams<CourseCategory> & {
  /** Sent as `isActive` query param when set. */
  isActive?: boolean
}

export type GetCourseCategoriesPaginatedResponse = ApiListResponse<CourseCategory>
export type GetCourseCategoriesAllResponse = Response<CourseCategory[]>
export type GetCourseCategoryByIdResponse = Response<CourseCategory>
export type CreateCourseCategoryResponse = Response<CourseCategory>
export type UpdateCourseCategoryResponse = Response<CourseCategory>
export type DeleteCourseCategoryResponse = StringResponse
