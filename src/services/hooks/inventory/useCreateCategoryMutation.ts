import { WEB_API_PATH_CREATE_CATEGORY } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Category } from "@/interfaces/inventory"
import { postRequest } from "@/services/api"

export const useCreateCategoryMutation = () => {
  return useCustomMutation<Category, Pick<Category, "name" | "description">>({
    initialData: <Category>{},
    mutationKey: ["inventory", "create-category"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await postRequest<Category>(WEB_API_PATH_CREATE_CATEGORY, payload)

      return data
    },
  })
}
