import { WEB_API_PATH_GET_PRODUCT_HEADERS } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { ProductHeader } from "@/interfaces/inventory"
import { postRequest } from "@/services/api"
import { GetPayload, ReturnPayload } from "@/services/interfaces"
import { useInventoryStore } from "@/stores/inventory.store"

const initialData: ReturnPayload<ProductHeader[]> = {
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

export const useGetProductHeadersMutation = () => {
  const { setProductHeaders } = useInventoryStore()

  return useCustomMutation<ReturnPayload<ProductHeader[]>, GetPayload>({
    initialData,
    mutationKey: ["inventory", "get-product-headers"],
    onSuccess: setProductHeaders,
    mutationFn: async ({ page, size, condition }) => {
      const { data } = await postRequest<ProductHeader[]>(
        `${WEB_API_PATH_GET_PRODUCT_HEADERS}?page=${page}&size=${size}`,
        condition
      )

      return data || initialData
    },
  })
}
