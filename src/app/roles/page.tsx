"use client"

import { CustomSpin } from "@/components/custom"
import TitleBar from "@/components/TitleBar"
import useDebounce from "@/hooks/useDebounce"
import { Roles } from "@/interfaces/user"
import { useGetRoleListMutation } from "@/services/hooks/roles/useGetRoleListMutation"
import { AdvancedCondition } from "@/services/interfaces"
import { useRolesStore } from "@/stores/roles.store"
import { Form } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import RolesTable from "./components/RolesTable"
import ConditionalComponent from "@/components/ConditionalComponent"
import RolesForm from "./components/RolesForm"
import { useGetOneRoleMutation } from "@/services/hooks/roles/useGetOneRoleMutation"
import errorHandler from "@/helpers/errorHandler"
import { useUpdateRoleMutation } from "@/services/hooks/roles/useUpdateRoleMutation"

const page: React.FC = () => {
  const [form] = Form.useForm()

  const [formModalState, setFormModalState] = useState(false)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [searchKey, setSearchKey] = useState<string | undefined>("")
  const debounce = useDebounce(searchKey)

  const { mutate: getRolesList, isPending: isGetPending } =
    useGetRoleListMutation()
  const { mutateAsync: getRole, isPending: isGetRolePending } =
    useGetOneRoleMutation()
  const { mutateAsync: updateRole, isPending: isUpdatePending } =
    useUpdateRoleMutation()

  const {
    metadata: { pagination },
  } = useRolesStore()

  const { currentPage, pageSize } = pagination

  const handleOnSearch = useCallback(
    (page = currentPage, size = pageSize) => {
      const condition: AdvancedCondition<Roles>[] = [
        {
          field: "state",
          operator: "=",
          value: "A",
        },
        {
          field: "filter",
          operator: "LIKE",
          value: debounce ?? "",
        },
      ]

      getRolesList({
        condition,
        page,
        size,
      })
    },
    [debounce, shouldUpdate]
  )

  useEffect(handleOnSearch, [handleOnSearch])

  const toggleFormModal = () => setFormModalState((prev) => !prev)

  const handleOnEdit = async (record: Roles) => {
    try {
      await getRole(record.role_id)
      toggleFormModal()
    } catch (error) {
      errorHandler(error)
    }
  }

  const handleOnUpdate = async (record: Roles) => {
    try {
      await updateRole({
        role_id: record.role_id,
        menu_options: record.menu_options as string[],
        state: record.state === "A" ? "I" : "A",
      })

      setShouldUpdate((prev) => !prev)
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <CustomSpin spinning={isGetPending || isGetRolePending || isUpdatePending}>
      <TitleBar
        form={form}
        createText="Nuevo Rol"
        searchPlaceholder={"Buscar roles..."}
        onSearch={setSearchKey}
        onCreate={() => {
          toggleFormModal()
        }}
      />
      <RolesTable
        onChange={handleOnSearch}
        onEdit={handleOnEdit}
        onUpdate={handleOnUpdate}
      />

      <ConditionalComponent condition={formModalState}>
        <RolesForm
          form={form}
          open={formModalState}
          onCancel={() => {
            setShouldUpdate((prev) => !prev)
            toggleFormModal()
          }}
        />
      </ConditionalComponent>
    </CustomSpin>
  )
}

export default page
