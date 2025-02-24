import { WEB_API_PATH_LOGIN } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { postRequest } from "../../api"
import { LoginPayload, UserSession } from "@/interfaces/user"
import { createSession } from "@/lib/session"

export function useAuthenticateUserMutation() {
  return useCustomMutation<UserSession, LoginPayload>({
    initialData: <UserSession>{},
    mutationKey: ["authentication", "authentication-login-user"],
    onSuccess: createSession,
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await postRequest<UserSession>(WEB_API_PATH_LOGIN, payload)

      return data
    },
  })
}
