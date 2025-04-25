import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomDivider,
  CustomModal,
  CustomRow,
  CustomSpin,
  CustomText,
  CustomTimeline,
} from "@/components/custom"
import formatter from "@/helpers/formatter"
import { truncateText } from "@/helpers/truncateText"
import { useGetRepairOrderHistoryMutation } from "@/services/hooks/repairs/useGetRepairOrderHistoryMutation"
import { TimelineItemProps } from "antd"
import React, { useCallback, useEffect } from "react"

const statusMap: Record<string, string> = {
  P: "Pendiente",
  I: "Iniciado",
  R: "Resuelto",
  N: "No Iniciado",
}

interface OrderHistoryProps {
  orderId: number | null
  open: boolean
  onCancel: () => void
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  orderId,
  open,
  onCancel,
}) => {
  const {
    mutateAsync: getHistory,
    isPending: isGetHistoryPending,
    data: {
      data: history,
      metadata: { pagination },
    },
  } = useGetRepairOrderHistoryMutation()

  const handleGetHistory = useCallback(
    (page = pagination.currentPage, size = pagination.pageSize) => {
      getHistory({
        page,
        size,
        condition: [
          {
            value: "A",
            field: "state",
            operator: "=",
          },
          {
            value: Number(orderId),
            field: "repair_order_id",
            operator: "=",
          },
        ],
      })
    },
    [orderId]
  )

  useEffect(handleGetHistory, [handleGetHistory])

  const historyItems: TimelineItemProps[] = history.map((item) => ({
    label: (
      <span>{formatter({ value: item.created_at, format: "long_date" })}</span>
    ),
    children: (
      <p>
        <p>
          <CustomText underline type={"secondary"}>
            @{item.username}
          </CustomText>
        </p>
        <ConditionalComponent
          condition
          fallback={<CustomText>Creo la orden de reparación</CustomText>}
        >
          <p>
            <ConditionalComponent
              condition={item.new_status !== item.previous_status}
            >
              <p>
                Cambio el estado de{" "}
                <CustomText underline type={"danger"}>
                  {statusMap[item.previous_status]}.
                </CustomText>{" "}
                a{" "}
                <CustomText underline type={"success"}>
                  {statusMap[item.new_status]}
                </CustomText>
              </p>
            </ConditionalComponent>
            <p>
              <CustomText type={"secondary"}>
                {truncateText(item.comment, 150)}
              </CustomText>
            </p>
          </p>
        </ConditionalComponent>
      </p>
    ),
  }))

  return (
    <CustomModal
      title={`Orden de reparación no. ${orderId}`}
      open={open}
      onCancel={onCancel}
      width={"40%"}
      closable
      footer={null}
    >
      <CustomDivider />
      <CustomSpin spinning={isGetHistoryPending}>
        <CustomRow justify={"center"}>
          <CustomTimeline items={historyItems} />
        </CustomRow>
      </CustomSpin>
    </CustomModal>
  )
}

export default OrderHistory
