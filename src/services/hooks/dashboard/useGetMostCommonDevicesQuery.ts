import { WEB_API_PATH_GET_MOST_COMMON_DEVICES } from "@/constants/routes"
import { DashboardData } from "@/interfaces/dashboard"
import { getRequest } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export const useGetMostCommonDevicesQuery = () => {
  return useQuery({
    queryKey: ["dashboard", "most-common-devices"],
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<DashboardData>(WEB_API_PATH_GET_MOST_COMMON_DEVICES)

      return data
    },
  })
}
