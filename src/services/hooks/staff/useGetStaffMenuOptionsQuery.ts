import { WEB_API_PATH_GET_STAFF_MENU_OPTIONS } from "@/constants/routes"
import { MenuOption } from "@/interfaces/user"
import { getRequest } from "@/services/api"
import useMenuOptionStore from "@/stores/menu-option.store"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetStaffMenuOptionsQuery = (username: string) => {
  const { setMenuOptions } = useMenuOptionStore()
  return useQuery<MenuOption[], AxiosError>({
    queryKey: ["staff-menu-options", username],
    enabled: !!username,
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<MenuOption[]>(
        `${WEB_API_PATH_GET_STAFF_MENU_OPTIONS}${username}`
      )

      setMenuOptions(data)

      return data
    },
  })
}
