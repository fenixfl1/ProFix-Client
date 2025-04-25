import { WEB_API_PATH_GET_MONTHLY_INCOME } from "@/constants/routes"
import { DashboardData } from "@/interfaces/dashboard"
import { getRequest } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export const useGetMonthlyIncomeQuery = () => {
  return useQuery({
    queryKey: ["dashboard", "monthly-income"],
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<DashboardData>(WEB_API_PATH_GET_MONTHLY_INCOME)

      return data
    },
  })
}
