import {
  CustomButton,
  CustomCard,
  CustomCol,
  CustomDivider,
  CustomList,
  CustomListItem,
  CustomListItemMeta,
  CustomParagraph,
  CustomRow,
  CustomSpace,
  CustomTag,
  CustomText,
  CustomTitle,
  CustomTooltip,
} from "@/components/custom"
import CustomSkeleton from "@/components/custom/CustomSkeleton"
import formatter from "@/helpers/formatter"
import { TrackingRepairOrder } from "@/interfaces/repair"
import React, { useState } from "react"
import styled from "styled-components"
import loading from "../../loading"
import { Metadata } from "@/services/interfaces"
import makePagination from "@/helpers/pagination"
import { truncateText } from "@/helpers/truncateText"
import { CustomLink } from "@/components/custom/CustomParagraph"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PATH_TRACK_HISTORY } from "@/constants/routes"
import OrderHistory from "./OrderHistory"
import ConditionalComponent from "@/components/ConditionalComponent"

const status: Record<string, { label: string; color: string }> = {
  P: {
    label: "Pendiente",
    color: "#FACC15",
  },
  I: {
    label: "En proceso",
    color: "#3B82F6",
  },
  R: {
    label: "Resuelto",
    color: "#10B981",
  },
  N: {
    label: "No Resulto",
    color: "#EF4444",
  },
}

interface RepairOrderListaProps {
  dataSource: TrackingRepairOrder[]
  loading?: boolean
  metadata: Metadata
  onChange: (current: number, size: number) => void
}

const RepairOrderLista: React.FC<RepairOrderListaProps> = ({
  dataSource = [],
  loading = false,
  metadata,
  onChange,
}) => {
  const router = useRouter()

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)
  const [modalVisibilityState, setModalVisibilityState] = useState(false)

  const renderItem = (item: TrackingRepairOrder) => (
    <CustomListItem
      actions={[
        <CustomTag
          key={item.repair_order_id}
          color={status?.[item.status].color}
        >
          {status?.[item.status].label}
        </CustomTag>,
      ]}
    >
      <CustomSkeleton title={false} loading={loading} active>
        <CustomListItemMeta
          title={
            <CustomButton
              type={"link"}
              onClick={() => {
                setSelectedOrderId(item.repair_order_id)
                setModalVisibilityState(true)
              }}
            >
              {item.brand} {item.model}
            </CustomButton>
          }
          description={
            <CustomSpace direction={"horizontal"}>
              <strong>Imei:</strong>
              {item.imei} |
              <span>
                <strong>Fecha de entrega: </strong>{" "}
                <span>
                  {formatter({
                    value: item.delivery_date,
                    format: "long_date",
                  })}
                </span>
              </span>
            </CustomSpace>
          }
        />
        <CustomText type={"secondary"}>
          <CustomTooltip title={item.reported_issue}>
            <span>{truncateText(item.reported_issue, 50)}</span>
          </CustomTooltip>
        </CustomText>
      </CustomSkeleton>
    </CustomListItem>
  )

  return (
    <>
      <CustomCol xs={24}>
        <CustomDivider />
        <CustomList
          dataSource={dataSource}
          renderItem={renderItem}
          pagination={{
            pageSize: metadata.pagination.pageSize,
            current: metadata.pagination.currentPage,
            total: metadata.pagination.count,
            onChange,
          }}
        />
      </CustomCol>
      <ConditionalComponent condition={modalVisibilityState}>
        <OrderHistory
          orderId={selectedOrderId}
          open={modalVisibilityState}
          onCancel={() => {
            setModalVisibilityState(false)
            setSelectedOrderId(null)
          }}
        />
      </ConditionalComponent>
    </>
  )
}

export default RepairOrderLista
