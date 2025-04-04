import { WEB_API_PATH_UPDATE_PRODUCT_HEADER } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { ProductHeader } from "@/interfaces/inventory"
import { putRequest } from "@/services/api"

export const useUpdateProductHeaderMutation = () => {
  return useCustomMutation<ProductHeader, Partial<ProductHeader>>({
    initialData: <ProductHeader>{},
    mutationKey: ["inventory", "update-product-header"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await putRequest<ProductHeader>(
        WEB_API_PATH_UPDATE_PRODUCT_HEADER,
        payload
      )

      return data
    },
  })
}
