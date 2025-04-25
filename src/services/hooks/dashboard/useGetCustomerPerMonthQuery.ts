import { WEB_API_PATH_GET_NEW_CUSTOMER_PER_MONTH } from "@/constants/routes"
import { DashboardData } from "@/interfaces/dashboard"
import { getRequest } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export const useGetCustomerPerMonthQuery = () => {
  return useQuery({
    queryKey: ["dashboard", "new-customers-per-month"],
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<DashboardData>(
        WEB_API_PATH_GET_NEW_CUSTOMER_PER_MONTH
      )

      return data
    },
  })
}
