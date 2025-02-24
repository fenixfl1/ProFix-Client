import { WEB_API_PATH_CREATE_ROLE } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Roles } from "@/interfaces/user"
import { postRequest } from "@/services/api"

export const useCreateRoleMutation = () => {
  return useCustomMutation<Roles, Roles>({
    initialData: <Roles>{},
    mutationKey: ["roles", "roles-create-role"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await postRequest<Roles>(WEB_API_PATH_CREATE_ROLE, payload)

      return data
    },
  })
}
