import { WEB_API_PATH_GET_AVERAGE_REPAIR_TIME_DAYS } from "@/constants/routes"
import { getRequest } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

export const useGetAverageRepairTimeQuery = () => {
  return useQuery({
    queryKey: ["dashboard", "average-repair-time"],
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<{ average_days: number }>(
        WEB_API_PATH_GET_AVERAGE_REPAIR_TIME_DAYS
      )

      return data.average_days
    },
  })
}
