import {
  CustomButton,
  CustomCol,
  CustomDivider,
  CustomSpace,
  CustomTable,
} from "@/components/custom"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import formatter from "@/helpers/formatter"
import { Repair } from "@/interfaces/repair"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { ColumnType } from "antd/lib/table"
import React from "react"

const dataSource: Repair[] = [
  {
    id: 1,
    reported_issue: "No enciende",
    diagnosis: "Placa base dañada",
    status: "I",
    estimated_cost: 120.5,
    delivery_date: "2024-03-10",
    customer_signature: false,
    used_products: [],
    history: [],
  },
  {
    id: 2,
    reported_issue: "Batería se descarga rápido",
    diagnosis: "Reemplazo de batería",
    status: "P",
    estimated_cost: 50.0,
    delivery_date: "2024-03-15",
    customer_signature: false,
    used_products: [],
    history: [],
  },
]

interface ReceptionTableProps {
  onChange: (current?: number, size?: number) => void
  onEdit: (record: Repair) => void
}

const ReceptionTable: React.FC<ReceptionTableProps> = ({
  onChange,
  onEdit,
}) => {
  const columns: ColumnType<Repair>[] = [
    {
      dataIndex: "id",
      key: "id",
      title: "Código",
      width: "5%",
      align: "center",
    },
    {
      dataIndex: "reported_issue",
      key: "reported_issue",
      title: "Problema reportado",
    },
    {
      dataIndex: "diagnosis",
      key: "diagnosis",
      title: "Diagnóstico",
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
          <CustomButton
            type={"link"}
            onClick={() => onEdit(record)}
            icon={<EditOutlined />}
          />

          <CustomButton danger type={"link"} icon={<DeleteOutlined />} />
        </CustomSpace>
      ),
    },
  ]

  return (
    <CustomCol xs={24}>
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        onChange={({ current, pageSize }) => onChange(current, pageSize)}
      />
    </CustomCol>
  )
}

export default ReceptionTable
