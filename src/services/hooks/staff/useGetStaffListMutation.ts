import {
  AdvancedCondition,
  GetPayload,
  ReturnPayload,
} from "@/services/interfaces"
import { WEB_API_PATH_GET_USER_LIST } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { User } from "@/interfaces/user"
import { postRequest } from "@/services/api"
import useUserStore from "@/stores/userStore"

const initialData: ReturnPayload<User[]> = {
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

export function useGetStaffListMutation() {
  const { setUsers } = useUserStore()

  return useCustomMutation<ReturnPayload<User[]>, GetPayload<User>>({
    initialData,
    mutationKey: ["staff", "get-staff-list"],
    onSuccess: (data) => setUsers(data?.data?.length ? data : initialData),
    mutationFn: async ({ page, size, condition }) => {
      const {
        data: { data, metadata },
      } = await postRequest<User[]>(
        `${WEB_API_PATH_GET_USER_LIST}?page=${page}&size=${size}`,
        condition
      )

      return { data, metadata }
    },
  })
}
