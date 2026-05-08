import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { axiosInstance } from '@/api/axios'
import { isResponseError } from '@/api/api.types'
import { DEFAULT_PAGE_LIMIT } from '@/api/globalConfig'
import { getPaginationQueryUrl, resolveErrorMessage, unwrapApiResult } from '@/api/helpers'
import { ACTION_KEYS, QUERY_KEYS } from '@/api/queryKeys'
import type {
  CreateUserPayload,
  CreateUserResponse,
  DeleteUserResponse,
  GetMeResponse,
  GetUserByIdResponse,
  GetUsersParams,
  GetUsersResponse,
  UpdateUserPayload,
  UpdateUserResponse,
} from './user.types'

const USER_BASE_API_ENDPOINT = '/user'
const USER_LIST_API_ENDPOINT = `${USER_BASE_API_ENDPOINT}/list`
const ME_BASE_API_ENDPOINT = '/me'
const REACT_QUERY_KEY = QUERY_KEYS.USER

export const useGetUsers = (
  { page, limit, search, sortBy, sortOrder, extraQueryParams, role, status }: GetUsersParams,
  shouldCallApi = true
) => {
  const { t } = useTranslation()

  const listQueryParams = {
    ...extraQueryParams,
    ...(role ? { role } : {}),
    ...(status !== undefined && status !== null ? { status } : {}),
  }

  const resolvedLimit = limit ?? DEFAULT_PAGE_LIMIT

  return useQuery({
    queryKey: [
      REACT_QUERY_KEY,
      ACTION_KEYS.GET,
      page,
      resolvedLimit,
      search,
      sortBy,
      sortOrder,
      role,
      status,
      extraQueryParams,
    ],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetUsersResponse>(
        getPaginationQueryUrl({
          url: USER_LIST_API_ENDPOINT,
          page,
          limit: resolvedLimit,
          search,
          sortBy: sortBy ?? null,
          sortOrder,
          extraQueryParams: listQueryParams,
        })
      )
      return unwrapApiResult(data)
    },
    throwOnError(error) {
      const fallback = t('messages.record.get.error', { defaultValue: 'Failed to load records.' })
      const message = isResponseError(error) ? error.response.data.message : fallback
      toast.error(message)
      console.error(error)
      return false
    },
    enabled: shouldCallApi,
    placeholderData: keepPreviousData,
  })
}

export const useGetUserById = (userId: string, shouldCallApi = true) => {
  const { t } = useTranslation()

  return useQuery({
    queryKey: [REACT_QUERY_KEY, ACTION_KEYS.GET_BY_ID, userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetUserByIdResponse>(`${USER_BASE_API_ENDPOINT}/${userId}`)
      return unwrapApiResult(data)
    },
    throwOnError(error) {
      const fallback = t('messages.record.get.error', { defaultValue: 'Failed to load record.' })
      const message = isResponseError(error) ? error.response.data.message : fallback
      toast.error(message)
      console.error(error)
      return false
    },
    enabled: shouldCallApi && !!userId,
  })
}

export const useGetMe = (shouldCallApi = true) => {
  const { t } = useTranslation()

  return useQuery({
    queryKey: [REACT_QUERY_KEY, 'me'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetMeResponse>(ME_BASE_API_ENDPOINT)
      return unwrapApiResult(data)
    },
    throwOnError(error) {
      const fallback = t('messages.record.get.error', { defaultValue: 'Failed to load record.' })
      const message = isResponseError(error) ? error.response.data.message : fallback
      toast.error(message)
      console.error(error)
      return false
    },
    enabled: shouldCallApi,
  })
}

export const useCreateUserMutation = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [REACT_QUERY_KEY, ACTION_KEYS.CREATE],
    mutationFn: async (payload: CreateUserPayload) => {
      const { data } = await axiosInstance.post<CreateUserResponse>(USER_BASE_API_ENDPOINT, payload)
      return unwrapApiResult(data)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEY] })
    },
    onError: (error) => {
      const message = resolveErrorMessage(
        error,
        t('messages.record.create.error', { defaultValue: 'Failed to create user.' })
      )
      toast.error(message)
      console.error(error)
    },
  })
}

export const useUpdateUserMutation = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [REACT_QUERY_KEY, ACTION_KEYS.UPDATE],
    mutationFn: async ({ userId, payload }: { userId: string; payload: UpdateUserPayload }) => {
      const { data } = await axiosInstance.patch<UpdateUserResponse>(
        `${USER_BASE_API_ENDPOINT}/${userId}`,
        payload
      )
      return unwrapApiResult(data)
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEY] })
      void queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEY, ACTION_KEYS.GET_BY_ID, variables.userId],
      })
    },
    onError: (error) => {
      const message = resolveErrorMessage(
        error,
        t('messages.record.update.error', { defaultValue: 'Failed to update user.' })
      )
      toast.error(message)
      console.error(error)
    },
  })
}

export const useDeleteUserMutation = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [REACT_QUERY_KEY, ACTION_KEYS.DELETE],
    mutationFn: async (userId: string) => {
      const { data } = await axiosInstance.delete<DeleteUserResponse>(`${USER_BASE_API_ENDPOINT}/${userId}`)
      return unwrapApiResult(data)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEY] })
    },
    onError: (error) => {
      const message = resolveErrorMessage(
        error,
        t('messages.record.delete.error', { defaultValue: 'Failed to delete user.' })
      )
      toast.error(message)
      console.error(error)
    },
  })
}
