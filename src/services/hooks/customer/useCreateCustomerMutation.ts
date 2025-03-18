import { WEB_API_PATH_CREATE_CUSTOMER } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Customer } from "@/interfaces/customer"
import { postRequest } from "@/services/api"
import { useCustomerStore } from "@/stores/customer.store"

export const useCreateCustomerMutation = () => {
  const { setCustomer } = useCustomerStore()

  return useCustomMutation<Customer, Customer>({
    initialData: <Customer>{},
    mutationKey: ["customer", "create-customer"],
    onSuccess: setCustomer,
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await postRequest<Customer>(WEB_API_PATH_CREATE_CUSTOMER, payload)

      return data
    },
  })
}
