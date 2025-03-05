import { WEB_API_PATH_UPDATE_ROLE } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Roles } from "@/interfaces/user"
import { putRequest } from "@/services/api"

interface UpdateRolePayload {
  menu_options: string[]
  description?: string
  role_id: number
  name?: string
  state?: string
}

export const useUpdateRoleMutation = () => {
  return useCustomMutation<string, UpdateRolePayload>({
    initialData: "",
    mutationKey: ["roles", "update-roles"],
    mutationFn: async (payload) => {
      const {
        data: { message },
      } = await putRequest<unknown>(WEB_API_PATH_UPDATE_ROLE, payload)

      return message as string
    },
  })
}
