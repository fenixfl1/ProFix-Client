import { WEB_API_PATH_GET_ONE_ROLE } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Roles } from "@/interfaces/user"
import { getRequest } from "@/services/api"
import { useRolesStore } from "@/stores/roles.store"

export const useGetOneRoleMutation = () => {
  const { setRole } = useRolesStore()
  return useCustomMutation<Roles, number>({
    initialData: <Roles>{},
    mutationKey: ["roles", "get-one-role"],
    onSuccess: setRole,
    mutationFn: async (role_id) => {
      const {
        data: { data },
      } = await getRequest<Roles>(`${WEB_API_PATH_GET_ONE_ROLE}/${role_id}`)

      return data
    },
  })
}
