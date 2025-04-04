import { WEB_API_PATH_GET_PRODUCTS } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Product } from "@/interfaces/inventory"
import { postRequest } from "@/services/api"
import { GetPayload, ReturnPayload } from "@/services/interfaces"
import { useInventoryStore } from "@/stores/inventory.store"

const initialData: ReturnPayload<Product[]> = {
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

export const useGetProductsMutation = () => {
  const { setProducts } = useInventoryStore()

  return useCustomMutation<ReturnPayload<Product[]>, GetPayload>({
    initialData,
    mutationKey: ["inventory", "get-products"],
    onSuccess: setProducts,
    mutationFn: async ({ page, size, condition }) => {
      const { data } = await postRequest<Product[]>(
        `${WEB_API_PATH_GET_PRODUCTS}?page=${page}&size=${size}`,
        condition
      )

      return data || initialData
    },
  })
}
