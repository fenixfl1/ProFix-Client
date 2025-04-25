import { WEB_API_PATH_GET_CUSTOMER_TRACKING_ORDER } from "@/constants/routes"
import { useCustomMutation } from "@/hooks/useCustomMutation"
import { TrackingRepairOrder } from "@/interfaces/repair"
import { postRequest } from "@/services/api"
import { GetPayload, ReturnPayload } from "@/services/interfaces"

interface Payload extends GetPayload {
  customer_id: number
}

const initialData: ReturnPayload<TrackingRepairOrder[]> = {
  data: [],
  metadata: {
    pagination: {
      count: 0,
      currentPage: 1,
      pageSize: 8,
      totalPages: 0,
      totalRows: 0,
    },
  },
}

export const useGetCustomerTrackingOrdersMutation = () => {
  return useCustomMutation<ReturnPayload<TrackingRepairOrder[]>, Payload>({
    initialData,
    mutationKey: ["customer", "get-customers-tracking-order"],
    mutationFn: async ({ page, size, condition, customer_id }) => {
      const { data } = await postRequest<TrackingRepairOrder[]>(
        `${WEB_API_PATH_GET_CUSTOMER_TRACKING_ORDER}/${customer_id}?page=${page}&size=${size}`,
        condition
      )

      return data || initialData
    },
  })
}
