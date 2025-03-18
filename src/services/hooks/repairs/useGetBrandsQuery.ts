import { WEB_API_PATH_GET_PHONE_BRANDS } from "@/constants/routes"
import { Brand } from "@/interfaces/repair"
import { getRequest } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export const useGetBrandQuery = () => {
  return useQuery({
    queryKey: ["devices", "get-phone-brands"],
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<Brand[]>(WEB_API_PATH_GET_PHONE_BRANDS)

      return data
    },
  })
}
