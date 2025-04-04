import { WEB_API_PATH_CHANGE_ORDER_STATUS } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { RepairOrderHistory } from "@/interfaces/repair"
import { putRequest } from "@/services/api"

export const useChangeOrderStateMutation = () => {
  return useCustomMutation<RepairOrderHistory, RepairOrderHistory>({
    initialData: <RepairOrderHistory>{},
    mutationKey: ["repair-order", "change-order-state"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await putRequest<RepairOrderHistory>(
        WEB_API_PATH_CHANGE_ORDER_STATUS,
        payload
      )

      return data
    },
  })
}
