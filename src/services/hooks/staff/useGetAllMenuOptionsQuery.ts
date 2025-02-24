import { WEB_API_PATH_GET_ALL_MENU_OPTIONS } from "@/constants/routes"
import { MenuTree } from "@/interfaces/user"
import { getRequest } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export const useGetAllMenuOptionsQuery = () => {
  return useQuery({
    queryKey: ["menu-options", "menu-options-get-all-menu-options-list"],
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<MenuTree[]>(WEB_API_PATH_GET_ALL_MENU_OPTIONS)

      return data
    },
  })
}
