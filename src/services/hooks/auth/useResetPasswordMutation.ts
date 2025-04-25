import { WEB_API_PATH_RESET_PASSWORD } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { postRequest } from "@/services/api"

interface ResetPasswordPayload {
  token: string
  password: string
}

export const useResetPasswordMutation = () => {
  return useCustomMutation<string, ResetPasswordPayload>({
    initialData: "",
    mutationKey: ["auth", "reset-password"],
    mutationFn: async (payload) => {
      const {
        data: { message },
      } = await postRequest(WEB_API_PATH_RESET_PASSWORD, payload)

      return message ?? ""
    },
  })
}
