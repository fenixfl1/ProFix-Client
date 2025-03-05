import {
  CustomButton,
  CustomCol,
  CustomDivider,
  CustomSpace,
  CustomTable,
  CustomTooltip,
} from "@/components/custom"
import formatter from "@/helpers/formatter"
import { Customer } from "@/interfaces/customer"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { ColumnType } from "antd/lib/table"
import React from "react"

interface CustomerTablesProps {
  onEdit: (record: Customer) => void
  onChange: (current?: number, size?: number) => void
}

const CustomerTable: React.FC<CustomerTablesProps> = ({ onChange, onEdit }) => {
  const columns: ColumnType<Customer>[] = [
    {
      dataIndex: "Código",
      key: "customer_id",
      title: "Código",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Nombre",
    },
    {
      dataIndex: "identity_document",
      key: "identity_document",
      title: "Identificación",
      render: (value) => formatter({ value, format: "document" }),
    },
    {
      dataIndex: "phone",
      key: "phone",
      title: "Teléfono",
    },
    {
      dataIndex: "email",
      key: "email",
      title: "Correo",
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
          <CustomTooltip title={"Editar"}>
            <CustomButton
              onClick={() => onEdit(record)}
              type={"link"}
              icon={<EditOutlined />}
            />
          </CustomTooltip>
          <CustomTooltip title={"Inhabilitar"}>
            <CustomButton danger type={"link"} icon={<DeleteOutlined />} />
          </CustomTooltip>
        </CustomSpace>
      ),
    },
  ]

  return (
    <CustomCol xs={24}>
      <CustomTable
        columns={columns}
        onChange={({ current, pageSize }) => onChange(current, pageSize)}
      />
    </CustomCol>
  )
}

export default CustomerTable
