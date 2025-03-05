import { WEB_API_PATH_CHANGE_PASSWORD } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { putRequest } from "@/services/api"

interface ChangePasswordPayload {
  new_password: string
  old_password: string
  username: string
}

export function useChangePasswordMutation() {
  return useCustomMutation<string, ChangePasswordPayload>({
    initialData: "",
    mutationKey: ["auth", "change-password"],
    mutationFn: async ({ username, ...payload }) => {
      const {
        data: { data },
      } = await putRequest<string>(
        `${WEB_API_PATH_CHANGE_PASSWORD}/${username}`,
        payload
      )

      return data
    },
  })
}
