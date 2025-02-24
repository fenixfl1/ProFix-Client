import { WEB_API_PATH_GET_ALL_ROLES } from "@/constants/routes"
import { Roles } from "@/interfaces/user"
import { getRequest } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export const useGetAllRolesQuery = () => {
  return useQuery({
    queryKey: ["roles", "roles-get-all-roles-list"],
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<Roles[]>(WEB_API_PATH_GET_ALL_ROLES)

      return data
    },
  })
}
