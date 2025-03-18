import { WEB_API_PATH_GET_CUSTOMERS } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Customer } from "@/interfaces/customer"
import { postRequest } from "@/services/api"
import { GetPayload, ReturnPayload } from "@/services/interfaces"
import { useCustomerStore } from "@/stores/customer.store"

const initialData: ReturnPayload<Customer[]> = {
  data: [],
  metadata: {
    pagination: {
      count: 0,
      currentPage: 1,
      pageSize: 15,
      totalPages: 0,
      totalRows: 0,
    },
  },
}

export const useGetCustomerMutation = () => {
  const { setCustomers } = useCustomerStore()

  return useCustomMutation<ReturnPayload<Customer[]>, GetPayload>({
    initialData,
    mutationKey: ["customer", "get-customers"],
    onError: () => setCustomers(initialData),
    onSuccess: (response) =>
      setCustomers(response.data.length ? response : initialData),
    mutationFn: async ({ page, size, condition }) => {
      const { data } = await postRequest<Customer[]>(
        `${WEB_API_PATH_GET_CUSTOMERS}?page=${page}&size=${size}`,
        condition
      )

      return data
    },
  })
}
