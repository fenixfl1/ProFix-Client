"use client"

import React, { useEffect } from "react"
import { Avatar, List } from "antd"
import {
  CustomAvatar,
  CustomButton,
  CustomCol,
  CustomDivider,
  CustomList,
  CustomListItem,
  CustomSpace,
  CustomSpin,
  CustomTable,
  CustomTooltip,
} from "@/components/custom"
import useUserStore from "@/stores/userStore"
import { User } from "@/interfaces/user"
import { ColumnType } from "antd/lib/table"
import formatter from "@/helpers/formatter"
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import { useGetUserInfoMutation } from "@/services/hooks/staff/useGetUserInfoMutation"
import useDrawerStore from "@/stores/drawerStore"
import errorHandler from "@/helpers/errorHandler"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import { useUpdateStaffMutation } from "@/services/hooks/staff/useUpdateStaffMutation"
import { customNotification } from "@/components/custom/customNotification"

interface StaffTableProps {
  onChange: (current?: number, size?: number) => void
  onEdit: (record: User) => void
}

const StaffTable: React.FC<StaffTableProps> = ({ onChange, onEdit }) => {
  const {
    users,
    metadata: { pagination },
  } = useUserStore()
  const { setOpenDrawer } = useDrawerStore()

  const { mutateAsync: getUserInfo, isPending: isGetUserInfoLoading } =
    useGetUserInfoMutation()
  const { mutateAsync: updateStaff, isPending: isUpdatePending } =
    useUpdateStaffMutation()

  const handleUpdate = (record: User) => {
    CustomModalConfirmation({
      type: "confirm",
      title: "confirmación",
      content: `¿Desea ${record.state === "A" ? "inhabilitar" : "Habilitar"} al usuario ${record.name}?`,
      onOk: async () => {
        try {
          updateStaff({
            user_id: record.user_id,
            username: record.username,
            state: record.state === "A" ? "I" : "A",
          })

          customNotification({
            message: "Operación exitosa",
            type: "success",
          })

          onChange?.()
        } catch (error) {
          errorHandler(error)
        }
      },
    })
  }

  const columns: ColumnType<User>[] = [
    {
      dataIndex: "user_id",
      key: "user_id",
      title: "ID",
    },
    {
      dataIndex: "full_name",
      key: "full_name",
      title: "Nombre",
      render: (_, record) => (
        <CustomSpace direction={"horizontal"}>
          <CustomAvatar
            icon={<UserOutlined />}
            src={record.avatar}
            alt="Avatar"
          />
          <CustomButton
            type={"link"}
            onClick={async () => {
              await getUserInfo(record.username)

              setOpenDrawer(true)
            }}
          >
            {record.full_name}
          </CustomButton>
        </CustomSpace>
      ),
    },
    {
      dataIndex: "username",
      key: "username",
      title: "Usuario",
      render: (username) => `@${username}`,
    },
    {
      dataIndex: "identity_document",
      key: "identity_document",
      title: "Doc. Identidad",
      render: (value) => formatter({ value, format: "document" }),
    },
    {
      dataIndex: "phone",
      key: "phone",
      title: "Teléfono",
      render: (value) => formatter({ value, format: "phone" }),
    },
    {
      dataIndex: "roles",
      key: "roles",
      title: "Roles",
    },
    {
      dataIndex: "state",
      key: "state",
      title: "Estado",
      render: (value) => (value === "A" ? "Activo" : "Inactivo"),
    },
    {
      key: "Acciones",
      title: "Acciones",
      width: "5%",
      render: (_, record) => (
        <CustomSpace
          direction={"horizontal"}
          split={<CustomDivider style={{ margin: 0 }} type={"vertical"} />}
        >
          <CustomTooltip title="Editar">
            <CustomButton
              onClick={() => onEdit(record)}
              type={"link"}
              icon={<EditOutlined />}
            />
          </CustomTooltip>
          <CustomTooltip title={"Inhabilitar"}>
            <CustomButton
              onClick={() => handleUpdate(record)}
              danger
              type={"link"}
              icon={<DeleteOutlined />}
            />
          </CustomTooltip>
        </CustomSpace>
      ),
    },
  ]

  const columnsMap = {
    user_id: "ID",
    name: "Nombre",
    last_name: "Apellido",
    identity_document: "Doc. Identidad",
    phone: "Teléfono",
    email: "Correo",
    roles: "Roles",
    username: "Usuario",
    created_at: "Fecha de registro",
    state: "Estado",
  }

  return (
    <CustomSpin spinning={isGetUserInfoLoading || isUpdatePending}>
      <CustomCol xs={24}>
        <CustomTable
          exportable
          columns={columns}
          dataSource={users}
          onChange={({ current, pageSize }) => onChange(current, pageSize)}
          columnsMap={columnsMap}
          pagination={{
            pageSize: pagination.pageSize,
            total: pagination.totalRows,
            current: pagination.currentPage,
          }}
        />
      </CustomCol>
    </CustomSpin>
  )
}

export default StaffTable
