import { WEB_API_PATH_CREATE_REPAIR_ORDER } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Receipt, RepairOrderPayload } from "@/interfaces/repair"
import { postRequest } from "@/services/api"
import { useRepairOrdersStore } from "@/stores/repair-orders.store"

export const useCreateRepairOrderMutation = () => {
  return useCustomMutation<Receipt[], RepairOrderPayload>({
    initialData: [],
    mutationKey: ["repairs", "create-repair-order"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await postRequest<Receipt[]>(
        WEB_API_PATH_CREATE_REPAIR_ORDER,
        payload
      )

      return data
    },
  })
}
