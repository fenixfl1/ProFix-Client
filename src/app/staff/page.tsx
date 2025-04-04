"use client"

import React, { useCallback, useEffect, useState } from "react"
import StaffTable from "./components/StaffTable"
import TitleBar from "@/components/TitleBar"
import { Form } from "antd"
import { useGetStaffListMutation } from "@/services/hooks/staff/useGetStaffListMutation"
import { AdvancedCondition } from "@/services/interfaces"
import { User } from "@/interfaces/user"
import useDebounce from "@/hooks/useDebounce"
import useUserStore from "@/stores/userStore"
import ConditionalComponent from "@/components/ConditionalComponent"
import StaffForm from "./components/StaffForm"
import errorHandler from "@/helpers/errorHandler"
import { CustomSpin } from "@/components/custom"
import { useGetUserInfoMutation } from "@/services/hooks/staff/useGetUserInfoMutation"
import { getSessionInfo } from "@/lib/session"
import useDrawerStore from "@/stores/drawerStore"

const page: React.FC = () => {
  const [form] = Form.useForm()
  const [formModalState, setFormModalState] = useState(false)
  const [searchKey, setSearchKey] = useState<string | undefined>("")
  const debounce = useDebounce(searchKey)

  const {
    setUser,
    metadata: { pagination },
  } = useUserStore()
  const { open: drawerOpen } = useDrawerStore()

  const { mutateAsync: getStaffList, isPending: isGetListPending } =
    useGetStaffListMutation()
  const { mutateAsync: getUserInfo, isPending: isGetUserInfoLoading } =
    useGetUserInfoMutation()

  const handleOnSearch = useCallback(
    (page = pagination.currentPage, size = pagination.pageSize) => {
      if (formModalState) return

      const condition: AdvancedCondition<User>[] = [
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
        {
          field: "username",
          operator: "!=",
          value: getSessionInfo().username,
        },
      ]

      getStaffList({ condition, page, size })
    },
    [debounce, formModalState]
  )

  useEffect(handleOnSearch, [handleOnSearch])

  const toggleFormModal = () => setFormModalState((prev) => !prev)

  const handleOnEdit = async (record: User) => {
    try {
      await getUserInfo(record.username)

      toggleFormModal()
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <CustomSpin spinning={isGetUserInfoLoading || isGetListPending}>
      <TitleBar
        form={form}
        createText="Nuevo Usuario"
        searchPlaceholder={"Buscar usuarios..."}
        onSearch={setSearchKey}
        onCreate={toggleFormModal}
      />
      <StaffTable onChange={handleOnSearch} onEdit={handleOnEdit} />
      <ConditionalComponent condition>
        <StaffForm
          form={form}
          open={formModalState}
          onCancel={toggleFormModal}
        />
      </ConditionalComponent>
    </CustomSpin>
  )
}

export default page
