import { WEB_API_PATH_GET_REPAIR_ORDERS } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { RepairOrder } from "@/interfaces/repair"
import { postRequest } from "@/services/api"
import { GetPayload, ReturnPayload } from "@/services/interfaces"
import { useRepairOrdersStore } from "@/stores/repair-orders.store"

const initialData: ReturnPayload<RepairOrder[]> = {
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

export const useGetRepairOrdersMutation = () => {
  const { setRepairOrders } = useRepairOrdersStore()

  return useCustomMutation<ReturnPayload<RepairOrder[]>, GetPayload>({
    initialData,
    mutationKey: ["repair-orders", "get-repair-orders"],
    onSuccess: (response) =>
      setRepairOrders(response.data ? response : initialData),
    mutationFn: async ({ page, size, condition }) => {
      const { data } = await postRequest<RepairOrder[]>(
        `${WEB_API_PATH_GET_REPAIR_ORDERS}?page=${page}&size=${size}`,
        condition
      )

      return data
    },
  })
}
