import { WEB_API_PATH_GET_ONE_CUSTOMER } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Customer } from "@/interfaces/customer"
import { getRequest } from "@/services/api"
import { useCustomerStore } from "@/stores/customer.store"

export const useGetOneCustomerMutation = () => {
  const { setCustomer } = useCustomerStore()

  return useCustomMutation<Customer, number>({
    initialData: <Customer>{},
    mutationKey: ["customer", "get-one-customer"],
    onSuccess: setCustomer,
    mutationFn: async (customer_id) => {
      const {
        data: { data },
      } = await getRequest<Customer>(
        `${WEB_API_PATH_GET_ONE_CUSTOMER}/${customer_id}`
      )

      return data
    },
  })
}
