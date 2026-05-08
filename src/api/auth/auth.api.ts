import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { axiosInstance } from "@/api/axios";
import type { Response } from "@/api/api.types";
import { coerceApiResult, resolveErrorMessage } from "@/api/helpers";
import { QUERY_KEYS } from "@/api/queryKeys";
import { pickCurrentRole } from "@/lib/dashboardPaths";
import { clearAccessToken, setAccessToken } from "@/lib/token";
import { useAuthStore } from "@/stores/authStore";
import type {
  LoginResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
} from "./auth.types";

const WEB_AUTH_ENDPOINT = "/auth";

export const useLoginMutation = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await axiosInstance.post<LoginResponse | Response<LoginResponse>>(
        `${WEB_AUTH_ENDPOINT}/login`,
        payload,
      );
      return coerceApiResult<LoginResponse>(data);
    },
    onSuccess: ({ token, user }) => {
      if (!token || !user) {
        throw new Error("Invalid login response.");
      }
      if (token) {
        setAccessToken(token);
      }
      const apiRoles = user?.roles?.map((role) => role.name) ?? [];
      const currentRole = pickCurrentRole(apiRoles);
      const mappedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        initials: user.name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0]?.toUpperCase() ?? "")
          .join(""),
        role: currentRole,
        roles: apiRoles.length > 0 ? apiRoles : [currentRole],
        xp: user.xp ?? 0,
        karma: user.karma ?? 0,
        hmn: user.hmn ?? 0,
        credits: user.credits ?? 0,
      } as const;
      useAuthStore.getState().setSession(mappedUser, currentRole);
      toast.success(
        t("auth.welcomeToast", {
          name: user?.name?.split(" ")?.[0] ?? "there",
        }),
      );
    },
    onError: (error) => {
      const message = resolveErrorMessage(error, t("auth.signInFailed"));
      toast.error(message);
      console.error(error);
    },
  });
};

export const useRegisterMutation = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationKey: [QUERY_KEYS.REGISTER],
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post<RegisterResponse>(
        `${WEB_AUTH_ENDPOINT}/register`,
        payload,
      );
      return data;
    },
    onSuccess: (response) => {
      const firstName = response?.name?.split(" ")?.[0] ?? "there";
      toast.success(t("auth.welcomeToast", { name: firstName }));
    },
    onError: (error) => {
      const message = resolveErrorMessage(
        error,
        "Registration failed. Please try again.",
      );
      toast.error(message);
      console.error(error);
    },
  });
};

export async function logoutApi(): Promise<void> {
  try {
    await axiosInstance.post(`${WEB_AUTH_ENDPOINT}/logout`);
    toast.success("Signed out successfully");
  } catch (error) {
    const message = resolveErrorMessage(
      error,
      "Logout failed. Clearing local session anyway.",
    );
    toast.error(message);
  } finally {
    clearAccessToken();
  }
}
