import { WEB_API_PATH_UPDATE_PRODUCT_DETAIL } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Product } from "@/interfaces/inventory"
import { putRequest } from "@/services/api"

export const useUpdateProductMutation = () => {
  return useCustomMutation<Product, Partial<Product>>({
    initialData: <Product>{},
    mutationKey: ["inventory", "update-product"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await putRequest<Product>(WEB_API_PATH_UPDATE_PRODUCT_DETAIL, payload)

      return data
    },
  })
}
