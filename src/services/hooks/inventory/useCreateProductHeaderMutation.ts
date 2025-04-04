import { WEB_API_PATH_CREATE_PRODUCT_HEADER } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { ProductHeader } from "@/interfaces/inventory"
import { postRequest } from "@/services/api"

export const useCreateProductHeaderMutation = () => {
  return useCustomMutation<ProductHeader, ProductHeader>({
    initialData: <ProductHeader>{},
    mutationKey: ["inventory", "create-product-header"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await postRequest<ProductHeader>(
        WEB_API_PATH_CREATE_PRODUCT_HEADER,
        payload
      )

      return data
    },
  })
}
