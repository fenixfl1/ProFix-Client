import {
  CustomButton,
  CustomCol,
  CustomDivider,
  CustomSpace,
  CustomTable,
  CustomTooltip,
} from "@/components/custom"
import formatter from "@/helpers/formatter"
import makePagination from "@/helpers/pagination"
import { RepairOrder } from "@/interfaces/repair"
import { useRepairOrdersStore } from "@/stores/repair-orders.store"
import { DeleteOutlined, ToolOutlined } from "@ant-design/icons"
import { ColumnType } from "antd/lib/table"
import React, { useState } from "react"
import RepairOrderInfo from "./RepairOrderInfo"
import ConditionalComponent from "@/components/ConditionalComponent"
import RepairForm from "./RepairForm"

interface ReceptionTableProps {
  onChange: (current?: number, size?: number) => void
  onEdit: (record: RepairOrder) => void
}

const RepairOrderTable: React.FC<ReceptionTableProps> = ({
  onChange,
  onEdit,
}) => {
  const [selectedRow, setSelectedRow] = useState<RepairOrder | undefined>(
    undefined
  )
  const [infoModalState, setInfoModalState] = useState(false)
  const [repairModalVisibilityState, setRepairModalVisibilityState] =
    useState(false)
  const { repairOrders, metadata, setRepairOrder } = useRepairOrdersStore()

  const columns: ColumnType<RepairOrder>[] = [
    {
      dataIndex: "repair_order_id",
      key: "repair_order_id",
      title: "Código",
      width: "5%",
      align: "center",
    },
    {
      dataIndex: "reported_issue",
      key: "reported_issue",
      title: "Problema reportado",
      render: (value, record) => (
        <CustomButton
          type={"link"}
          onClick={() => {
            setRepairOrder(record)
            setInfoModalState(true)
          }}
        >
          {value}
        </CustomButton>
      ),
    },
    {
      dataIndex: "diagnosis",
      key: "diagnosis",
      title: "Diagnóstico",
    },
    {
      dataIndex: "customer_name",
      key: "customer_name",
      title: "Cliente",
    },
    {
      dataIndex: "delivery_date",
      key: "delivery_date",
      title: "Fecha de entrega",
      render: (value) => formatter({ value, format: "long_date" }),
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Estado",
      render: (value: string) => {
        const statusMap: Record<string, string> = {
          P: "Pendiente",
          I: "Iniciado",
          R: "Resuelto",
          N: "No Iniciado",
        }
        return statusMap[value]
      },
    },
    {
      key: "acciones",
      title: "Acciones",
      width: "8%",
      render: (_, record) => (
        <CustomSpace
          direction={"horizontal"}
          split={<CustomDivider type={"vertical"} />}
        >
          <CustomTooltip title={""}>
            <CustomButton
              type={"link"}
              onClick={() => {
                setRepairModalVisibilityState(true)
                setSelectedRow(record)
              }}
              icon={<ToolOutlined />}
            />
          </CustomTooltip>
          <CustomTooltip title={""}>
            <CustomButton danger type={"link"} icon={<DeleteOutlined />} />
          </CustomTooltip>
        </CustomSpace>
      ),
    },
  ]

  return (
    <>
      <CustomCol xs={24}>
        <CustomTable
          dataSource={repairOrders}
          columns={columns}
          onChange={({ current, pageSize }) => onChange(current, pageSize)}
          pagination={{ ...makePagination(metadata) }}
        />
      </CustomCol>

      <ConditionalComponent condition={infoModalState}>
        <RepairOrderInfo
          open={infoModalState}
          onCancel={() => setInfoModalState(false)}
        />
      </ConditionalComponent>

      <ConditionalComponent condition={repairModalVisibilityState}>
        <RepairForm
          data={selectedRow}
          open={repairModalVisibilityState}
          onCancel={() => {
            setSelectedRow(undefined)
            setRepairModalVisibilityState(false)
          }}
        />
      </ConditionalComponent>
    </>
  )
}

export default RepairOrderTable
