import { WEB_API_PATH_CREATE_REPAIR_ORDER } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { RepairOrderPayload } from "@/interfaces/repair"
import { postRequest } from "@/services/api"

export const useCreateRepairOrderMutation = () => {
  return useCustomMutation<string | undefined, RepairOrderPayload>({
    initialData: "",
    mutationKey: ["repairs", "create-repair-order"],
    mutationFn: async (payload) => {
      const {
        data: { message },
      } = await postRequest(WEB_API_PATH_CREATE_REPAIR_ORDER, payload)

      return message
    },
  })
}
