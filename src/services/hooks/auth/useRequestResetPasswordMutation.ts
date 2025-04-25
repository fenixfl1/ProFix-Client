import { WEB_API_PATH_REQUEST_RESET_PASSWORD } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { postRequest } from "@/services/api"

interface RequestResetPasswordPayload {
  email: string
  username: string
}

export const useRequestResetPasswordMutation = () => {
  return useCustomMutation<string, RequestResetPasswordPayload>({
    initialData: "",
    mutationKey: ["auth", "request-reset-password"],
    mutationFn: async (payload) => {
      const {
        data: { message },
      } = await postRequest(WEB_API_PATH_REQUEST_RESET_PASSWORD, payload)

      return message ?? ""
    },
  })
}
