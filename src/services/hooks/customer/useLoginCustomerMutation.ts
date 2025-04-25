import { WEB_API_PATH_LOGIN_CUSTOMER } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { Customer } from "@/interfaces/customer"
import { CustomerSession, LoginPayload } from "@/interfaces/user"
import { createCustomerSession } from "@/lib/session"
import { postRequest } from "@/services/api"

export const useLoginCustomerMutation = () => {
  return useCustomMutation<CustomerSession, LoginPayload>({
    initialData: <CustomerSession>{},
    mutationKey: ["customer", "login-customer"],
    onSuccess: createCustomerSession,
    mutationFn: async (payload) => {
      const {
        data: { data },
      } = await postRequest<CustomerSession>(
        WEB_API_PATH_LOGIN_CUSTOMER,
        payload
      )

      return data
    },
  })
}
