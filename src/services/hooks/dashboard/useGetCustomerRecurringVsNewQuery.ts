import { WEB_API_PATH_GET_RECURRENT_CUSTOMERS_VS_NEW_CUSTOMERS } from "@/constants/routes"
import { getRequest } from "@/services/api"
import { useQuery } from "@tanstack/react-query"

interface CustomerRecurringVsNewQueryData {
  nuevos: number
  recurrentes: number
  month: string
}

export const useGetCustomerRecurringVsNewQuery = () => {
  return useQuery({
    queryKey: ["dashboard", "recurrent-vs-new-customers"],
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<CustomerRecurringVsNewQueryData[]>(
        WEB_API_PATH_GET_RECURRENT_CUSTOMERS_VS_NEW_CUSTOMERS
      )

      return data
    },
  })
}
