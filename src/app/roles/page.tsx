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

const page: React.FC = () => {
  const [form] = Form.useForm()

  const [formModalState, setFormModalState] = useState(false)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [searchKey, setSearchKey] = useState<string | undefined>("")
  const debounce = useDebounce(searchKey)

  const { mutate: getRolesList, isPending: isGetPending } =
    useGetRoleListMutation()

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
    form.setFieldsValue({ ...record })
    toggleFormModal()
  }

  return (
    <CustomSpin spinning={isGetPending}>
      <TitleBar
        form={form}
        createText="Nuevo Rol"
        searchPlaceholder={"Buscar roles..."}
        onSearch={setSearchKey}
        onCreate={() => {
          toggleFormModal()
        }}
      />
      <RolesTable onChange={handleOnSearch} onEdit={handleOnEdit} />

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
