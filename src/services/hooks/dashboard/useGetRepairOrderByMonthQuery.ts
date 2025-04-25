import { WEB_API_PATH_GET_REPAIR_ORDERS_BY_MONTH } from "@/constants/routes"
import { DashboardData } from "@/interfaces/dashboard"
import { getRequest } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export const useGetRepairOrderByMonthQuery = () => {
  return useQuery({
    queryKey: ["dashboard", "repair-order-month"],
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<DashboardData>(
        WEB_API_PATH_GET_REPAIR_ORDERS_BY_MONTH
      )

      return data
    },
  })
}
