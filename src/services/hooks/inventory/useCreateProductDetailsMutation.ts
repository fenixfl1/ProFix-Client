import { WEB_API_PATH_CREATE_PRODUCT_DETAIL } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { ProductDetail } from "@/interfaces/inventory"
import { postRequest } from "@/services/api"

export const useCreateProductDetailsMutation = () => {
  return useCustomMutation({
    initialData: <ProductDetail>{},
    mutationKey: ["inventory", "create-product-details"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await postRequest<ProductDetail>(
        WEB_API_PATH_CREATE_PRODUCT_DETAIL,
        payload
      )

      return data
    },
  })
}
