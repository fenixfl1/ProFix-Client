import { WEB_API_PATH_GET_CATEGORIES } from "@/constants/routes"
import { Category } from "@/interfaces/inventory"
import { getRequest } from "@/services/api"
import { useInventoryStore } from "@/stores/inventory.store"
import { useQuery } from "@tanstack/react-query"

export const useGetCategoriesQuery = () => {
  const { setCategories } = useInventoryStore()
  return useQuery({
    queryKey: ["inventory", "get-categories"],
    queryFn: async () => {
      const {
        data: { data },
      } = await getRequest<Category[]>(WEB_API_PATH_GET_CATEGORIES)

      setCategories(data ?? [])

      return data
    },
  })
}
