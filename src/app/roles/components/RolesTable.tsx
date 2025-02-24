import {
  CustomButton,
  CustomCol,
  CustomDivider,
  CustomSpace,
  CustomTable,
  CustomTooltip,
} from "@/components/custom"
import { Roles } from "@/interfaces/user"
import { useRolesStore } from "@/stores/roles.store"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { ColumnType } from "antd/lib/table"
import React from "react"

interface RolesTableProps {
  onChange: (current?: number, size?: number) => void
  onEdit: (record: Roles) => void
}

const RolesTable: React.FC<RolesTableProps> = () => {
  const {
    roles,
    metadata: { pagination },
  } = useRolesStore()

  const columns: ColumnType<Roles>[] = [
    {
      dataIndex: "role_id",
      key: "role_id",
      title: "ID",
      width: "5%",
      align: "center",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Nombre",
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Descripción",
    },
    {
      dataIndex: "state",
      key: "state",
      title: "Estado",
      render: (state) => (state === "A" ? "Activo" : "Inactivo"),
    },
    {
      key: "acciones",
      title: "Acciones",
      width: "8%",
      align: "center",
      render: () => (
        <CustomSpace
          direction={"horizontal"}
          split={<CustomDivider type={"vertical"} />}
        >
          <CustomTooltip title={"Editar"}>
            <CustomButton
              type={"link"}
              icon={<EditOutlined />}
              onClick={() => {}}
            />
          </CustomTooltip>
          <CustomTooltip title={"Inhabilitar"}>
            <CustomButton type={"link"} danger icon={<DeleteOutlined />} />
          </CustomTooltip>
        </CustomSpace>
      ),
    },
  ]

  return (
    <CustomCol xs={24}>
      <CustomTable
        columns={columns}
        dataSource={roles}
        pagination={{
          current: pagination.currentPage,
          pageSize: pagination.pageSize,
          total: pagination.totalRows,
        }}
      />
    </CustomCol>
  )
}

export default RolesTable
