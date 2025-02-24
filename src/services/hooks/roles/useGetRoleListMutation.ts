import { WEB_API_PATH_GET_ROLES_LIST } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Roles } from "@/interfaces/user"
import { postRequest } from "@/services/api"
import { GetPayload, ReturnPayload } from "@/services/interfaces"
import { useRolesStore } from "@/stores/roles.store"

const initialData: ReturnPayload<Roles[]> = {
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

export function useGetRoleListMutation() {
  const { setRoles } = useRolesStore()
  return useCustomMutation<ReturnPayload<Roles[]>, GetPayload>({
    initialData,
    mutationKey: ["roles", "roles-get-roles-list"],
    onError: () => setRoles(initialData),
    onSuccess: (data) => setRoles(data?.data?.length ? data : initialData),
    mutationFn: async ({ page, size, condition }) => {
      const { data } = await postRequest<Roles[]>(
        `${WEB_API_PATH_GET_ROLES_LIST}?page=${page}&size=${size}`,
        condition
      )

      return data
    },
  })
}
