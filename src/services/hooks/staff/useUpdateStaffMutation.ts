import { WEB_API_PATH_UPDATE_STAFF } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { User } from "@/interfaces/user"
import { putRequest } from "@/services/api"

export function useUpdateStaffMutation() {
  return useCustomMutation<User, Partial<User>>({
    initialData: <User>{},
    mutationKey: ["staff", "staff-update-staff"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await putRequest<User>(WEB_API_PATH_UPDATE_STAFF, payload)

      return data
    },
  })
}
