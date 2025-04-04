import { WEB_API_PATH_GET_REPAIR_ORDER_HISTORY } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { RepairOrderHistory } from "@/interfaces/repair"
import { postRequest } from "@/services/api"
import { GetPayload, ReturnPayload } from "@/services/interfaces"

const initialData: ReturnPayload<RepairOrderHistory[]> = {
  data: [],
  metadata: {
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalRows: 0,
      count: 0,
      pageSize: 10,
    },
  },
}

export const useGetRepairOrderHistoryMutation = () => {
  return useCustomMutation<ReturnPayload<RepairOrderHistory[]>, GetPayload>({
    initialData,
    mutationKey: ["repairs", "get-repair-order-history"],
    mutationFn: async ({ size, page, condition }) => {
      const { data } = await postRequest<RepairOrderHistory[]>(
        `${WEB_API_PATH_GET_REPAIR_ORDER_HISTORY}?page=${page}&size=${size}`,
        condition
      )

      return data || initialData
    },
  })
}
