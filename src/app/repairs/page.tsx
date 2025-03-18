"use client"

import { CustomSpin } from "@/components/custom"
import React, { useCallback, useEffect, useState } from "react"
import RepairOrderTable from "./components/RepairOrderTable"
import { RepairOrder } from "@/interfaces/repair"
import errorHandler from "@/helpers/errorHandler"
import { Form } from "antd"
import useDebounce from "@/hooks/useDebounce"
import TitleBar from "@/components/TitleBar"
import ConditionalComponent from "@/components/ConditionalComponent"
import RepairForm from "./components/RepairOrderForm"
import { useGetRepairOrdersMutation } from "@/services/hooks/repairs/useGetRepairOrdersMutation"
import { useRepairOrdersStore } from "@/stores/repair-orders.store"

const page: React.FC = () => {
  const [form] = Form.useForm()
  const [formModalState, setFormModalState] = useState(false)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [searchKey, setSearchKey] = useState<string>("")
  const debounce = useDebounce(searchKey)

  const { mutateAsync: getRepairOrders, isPending: isGetPending } =
    useGetRepairOrdersMutation()

  const { metadata } = useRepairOrdersStore()

  const { pagination } = metadata ?? {}

  const handleOnSearch = useCallback(
    (page = pagination?.currentPage, size = pagination?.pageSize) => {
      if (formModalState) return

      getRepairOrders({
        page,
        size,
        condition: [
          {
            value: "A",
            operator: "=",
            field: "state",
          },
          {
            value: debounce,
            operator: "LIKE",
            field: "filter",
          },
        ],
      })
    },
    [debounce, shouldUpdate, formModalState]
  )

  useEffect(handleOnSearch, [handleOnSearch])

  const toggleFormModal = () => setFormModalState((prev) => !prev)

  const handleOnEdit = async (record: RepairOrder) => {
    try {
      toggleFormModal()
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <CustomSpin spinning={isGetPending}>
      <TitleBar
        form={form}
        filterContent={<div />}
        createText="Nueva Reparación"
        searchPlaceholder={"Buscar reparaciones..."}
        onSearch={setSearchKey}
        onCreate={toggleFormModal}
      />
      <RepairOrderTable onChange={handleOnSearch} onEdit={handleOnEdit} />

      <ConditionalComponent condition={formModalState}>
        <RepairForm
          open={formModalState}
          form={form}
          onCancel={toggleFormModal}
        />
      </ConditionalComponent>
    </CustomSpin>
  )
}

export default page
