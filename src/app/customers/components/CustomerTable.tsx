import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomButton,
  CustomCol,
  CustomDivider,
  CustomSpace,
  CustomTable,
  CustomTooltip,
} from "@/components/custom"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import formatter from "@/helpers/formatter"
import makePagination from "@/helpers/pagination"
import { Customer } from "@/interfaces/customer"
import { useCustomerStore } from "@/stores/customer.store"
import { DeleteOutlined, EditOutlined, StopOutlined } from "@ant-design/icons"
import { ColumnType } from "antd/lib/table"
import React from "react"

interface CustomerTablesProps {
  onEdit: (record: Customer) => void
  onChange: (current?: number, size?: number) => void
  onUpdate: (record: Customer) => void
}

const CustomerTable: React.FC<CustomerTablesProps> = ({
  onChange,
  onEdit,
  onUpdate,
}) => {
  const { customers, metadata } = useCustomerStore()

  const handleOnUpdate = (record: Customer) => {
    CustomModalConfirmation({
      title: "Confirmación",
      content: `¿Desea ${record.state === "A" ? "inhabilitar" : "Habilitar"} el cliente ${record.name}?`,
      onOk: () => onUpdate(record),
    })
  }

  const columns: ColumnType<Customer>[] = [
    {
      dataIndex: "customer_id",
      key: "customer_id",
      title: "ID",
      align: "center",
      width: "4%",
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
      render: (value) =>
        value ? formatter({ value, format: "document" }) : "",
    },
    {
      dataIndex: "phone",
      key: "phone",
      title: "Teléfono",
      render: (value) => (value ? formatter({ value, format: "phone" }) : ""),
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
              disabled={record.state === "I"}
              onClick={() => onEdit(record)}
              type={"link"}
              icon={<EditOutlined />}
            />
          </CustomTooltip>
          <ConditionalComponent
            condition={record.state == "A"}
            fallback={
              <CustomTooltip title={"Habilitar"}>
                <CustomButton
                  type={"link"}
                  icon={<StopOutlined style={{ color: "#b9b9b9" }} />}
                  onClick={() => handleOnUpdate(record)}
                />
              </CustomTooltip>
            }
          >
            <CustomTooltip title={"Inhabilitar"}>
              <CustomButton
                danger
                type={"link"}
                icon={<DeleteOutlined />}
                onClick={() => handleOnUpdate(record)}
              />
            </CustomTooltip>
          </ConditionalComponent>
        </CustomSpace>
      ),
    },
  ]

  const columnsMap = {
    customer_id: "ID",
    name: "Nombre",
    identity_document: "Documento Identidad",
    phone: "Teléfono",
    email: "Correo",
    username: "Usuario",
    address: "Dirección",
    created_at: "Fecha de registro",
    state: "Estado",
  }

  return (
    <CustomCol xs={24}>
      <CustomTable
        columns={columns}
        exportable
        onChange={({ current, pageSize }) => onChange(current, pageSize)}
        dataSource={customers}
        columnsMap={columnsMap}
        pagination={{ ...makePagination(metadata) }}
      />
    </CustomCol>
  )
}

export default CustomerTable
