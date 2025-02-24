import { WEB_API_PATH_GET_USER_INFO } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { User } from "@/interfaces/user"
import { getRequest } from "@/services/api"
import useUserStore from "@/stores/userStore"

export function useGetUserInfoMutation() {
  const { setUser } = useUserStore()
  return useCustomMutation<User, string>({
    initialData: <User>{},
    mutationKey: ["staff", "get-user-info"],
    onSuccess: setUser,
    onError: () => setUser(<User>{}),
    mutationFn: async (username) => {
      const {
        data: { data },
      } = await getRequest<User>(`${WEB_API_PATH_GET_USER_INFO}/${username}`)

      return data
    },
  })
}
