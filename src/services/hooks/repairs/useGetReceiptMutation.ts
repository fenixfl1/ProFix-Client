import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Receipt } from "@/interfaces/repair"
import { getRequest } from "@/services/api"
import { WEB_API_PATH_GET_ORDER_RECEIPT } from "@/constants/routes"
import { useRepairOrdersStore } from "@/stores/repair-orders.store"

export const useGetReceiptMutation = () => {
  const { setReceipt } = useRepairOrdersStore()

  return useCustomMutation<Receipt, number>({
    initialData: <Receipt>{},
    mutationKey: ["repair-order", "get-receipt"],
    onSuccess: setReceipt,
    mutationFn: async (order_id) => {
      const {
        data: { data },
      } = await getRequest<Receipt>(
        `${WEB_API_PATH_GET_ORDER_RECEIPT}/${order_id}`
      )

      return data
    },
  })
}
