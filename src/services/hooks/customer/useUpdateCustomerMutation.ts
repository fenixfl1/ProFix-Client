import { WEB_API_PATH_UPDATE_CUSTOMER } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Customer } from "@/interfaces/customer"
import { putRequest } from "@/services/api"

export const useUpdateCustomerMutation = () => {
  return useCustomMutation<string, Partial<Customer>>({
    initialData: "",
    mutationKey: ["customer", "update-customer"],
    mutationFn: async (payload) => {
      const {
        data: { message = "" },
      } = await putRequest<Customer>(WEB_API_PATH_UPDATE_CUSTOMER, payload)

      return message
    },
  })
}
