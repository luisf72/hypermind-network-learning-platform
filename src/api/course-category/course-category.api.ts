import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { axiosInstance } from "@/api/axios";
import { isResponseError } from "@/api/api.types";
import { DEFAULT_PAGE_LIMIT } from "@/api/globalConfig";
import {
  getPaginationQueryUrl,
  resolveErrorMessage,
  unwrapApiResult,
} from "@/api/helpers";
import { ACTION_KEYS, QUERY_KEYS } from "@/api/queryKeys";
import type {
  CreateCourseCategoryPayload,
  CreateCourseCategoryResponse,
  DeleteCourseCategoryResponse,
  GetCourseCategoriesAllResponse,
  GetCourseCategoriesPaginatedParams,
  GetCourseCategoriesPaginatedResponse,
  GetCourseCategoryByIdResponse,
  UpdateCourseCategoryPayload,
  UpdateCourseCategoryResponse,
} from "./course-category.types";

const BASE = "/course-category";
const LIST = `${BASE}/list`;
const REACT_QUERY_KEY = QUERY_KEYS.COURSE_CATEGORY;
const LIST_SUBKEY = "paginated";
const ALL_SUBKEY = "all";

export const useGetCourseCategoriesPaginated = (
  {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    extraQueryParams,
    isActive,
  }: GetCourseCategoriesPaginatedParams,
  shouldCallApi = true,
) => {
  const { t } = useTranslation();

  const listQueryParams = {
    ...extraQueryParams,
    ...(typeof isActive === "boolean" ? { isActive } : {}),
  };

  const resolvedLimit = limit ?? DEFAULT_PAGE_LIMIT;

  return useQuery({
    queryKey: [
      REACT_QUERY_KEY,
      LIST_SUBKEY,
      page,
      resolvedLimit,
      search,
      sortBy,
      sortOrder,
      isActive,
      extraQueryParams,
    ],
    queryFn: async () => {
      const { data } =
        await axiosInstance.get<GetCourseCategoriesPaginatedResponse>(
          getPaginationQueryUrl({
            url: LIST,
            page,
            limit: resolvedLimit,
            search,
            sortBy: sortBy ?? null,
            sortOrder,
            extraQueryParams: listQueryParams,
          }),
        );
      return unwrapApiResult(data);
    },
    throwOnError(error) {
      const fallback = t("messages.record.get.error", {
        defaultValue: "Failed to load records.",
      });
      const message = isResponseError(error)
        ? error.response.data.message
        : fallback;
      toast.error(message);
      console.error(error);
      return false;
    },
    enabled: shouldCallApi,
    placeholderData: keepPreviousData,
  });
};

export const useGetCourseCategoriesAll = (shouldCallApi = true) => {
  const { t } = useTranslation();

  return useQuery({
    queryKey: [REACT_QUERY_KEY, ALL_SUBKEY],
    queryFn: async () => {
      const { data } =
        await axiosInstance.get<GetCourseCategoriesAllResponse>(BASE);
      return unwrapApiResult(data);
    },
    throwOnError(error) {
      const fallback = t("messages.record.get.error", {
        defaultValue: "Failed to load records.",
      });
      const message = isResponseError(error)
        ? error.response.data.message
        : fallback;
      toast.error(message);
      console.error(error);
      return false;
    },
    enabled: shouldCallApi,
  });
};

export const useGetCourseCategoryById = (
  categoryId: string,
  shouldCallApi = true,
) => {
  const { t } = useTranslation();

  return useQuery({
    queryKey: [REACT_QUERY_KEY, ACTION_KEYS.GET_BY_ID, categoryId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetCourseCategoryByIdResponse>(
        `${BASE}/${categoryId}`,
      );
      return unwrapApiResult(data);
    },
    throwOnError(error) {
      const fallback = t("messages.record.get.error", {
        defaultValue: "Failed to load record.",
      });
      const message = isResponseError(error)
        ? error.response.data.message
        : fallback;
      toast.error(message);
      console.error(error);
      return false;
    },
    enabled: shouldCallApi && !!categoryId,
  });
};

export const useCreateCourseCategoryMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [REACT_QUERY_KEY, ACTION_KEYS.CREATE],
    mutationFn: async (payload: CreateCourseCategoryPayload) => {
      const { data } = await axiosInstance.post<CreateCourseCategoryResponse>(
        BASE,
        payload,
      );
      return unwrapApiResult(data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEY] });
    },
    onError: (error) => {
      const message = resolveErrorMessage(
        error,
        t("messages.record.create.error", {
          defaultValue: "Failed to create category.",
        }),
      );
      toast.error(message);
      console.error(error);
    },
  });
};

export const useUpdateCourseCategoryMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [REACT_QUERY_KEY, ACTION_KEYS.UPDATE],
    mutationFn: async ({
      categoryId,
      payload,
    }: {
      categoryId: string;
      payload: UpdateCourseCategoryPayload;
    }) => {
      const { data } = await axiosInstance.patch<UpdateCourseCategoryResponse>(
        `${BASE}/${categoryId}`,
        payload,
      );
      return unwrapApiResult(data);
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEY] });
      void queryClient.invalidateQueries({
        queryKey: [
          REACT_QUERY_KEY,
          ACTION_KEYS.GET_BY_ID,
          variables.categoryId,
        ],
      });
    },
    onError: (error) => {
      const message = resolveErrorMessage(
        error,
        t("messages.record.update.error", {
          defaultValue: "Failed to update category.",
        }),
      );
      toast.error(message);
      console.error(error);
    },
  });
};

export const useDeleteCourseCategoryMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [REACT_QUERY_KEY, ACTION_KEYS.DELETE],
    mutationFn: async (categoryId: string) => {
      const { data } = await axiosInstance.delete<DeleteCourseCategoryResponse>(
        `${BASE}/${categoryId}`,
      );
      return unwrapApiResult(data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEY] });
    },
    onError: (error) => {
      const message = resolveErrorMessage(
        error,
        t("messages.record.delete.error", {
          defaultValue: "Failed to delete category.",
        }),
      );
      toast.error(message);
      console.error(error);
    },
  });
};
