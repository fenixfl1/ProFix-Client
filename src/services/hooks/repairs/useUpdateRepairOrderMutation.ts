import { WEB_API_PATH_UPDATE_DEVICE } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { RepairOrder } from "@/interfaces/repair"
import { putRequest } from "@/services/api"

export const useUpdateRepairOrderMutation = () => {
  return useCustomMutation<RepairOrder, Partial<RepairOrder>>({
    initialData: <RepairOrder>{},
    mutationKey: ["repair-order", "update-repair-order"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await putRequest<RepairOrder>(WEB_API_PATH_UPDATE_DEVICE, payload)

      return data
    },
  })
}
