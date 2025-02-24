import { WEB_API_PATH_CREATE_STAFF } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { User } from "@/interfaces/user"
import { postRequest } from "@/services/api"
export function useCreateStaffMutation() {
  return useCustomMutation<User, User>({
    initialData: <User>{},
    mutationKey: ["staff", "staff-create-staff"],
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await postRequest<User>(WEB_API_PATH_CREATE_STAFF, payload)

      return data
    },
  })
}
