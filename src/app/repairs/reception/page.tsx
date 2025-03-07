"use client"

import { CustomSpin } from "@/components/custom"
import React, { useCallback, useEffect, useState } from "react"
import ReceptionTable from "../components/ReceptionTable"
import { Repair } from "@/interfaces/repair"
import errorHandler from "@/helpers/errorHandler"
import { Form } from "antd"
import useDebounce from "@/hooks/useDebounce"
import TitleBar from "@/components/TitleBar"
import ConditionalComponent from "@/components/ConditionalComponent"
import RepairForm from "../components/RepairForm"

const page: React.FC = () => {
  const [form] = Form.useForm()
  const [formModalState, setFormModalState] = useState(false)
  const [searchKey, setSearchKey] = useState<string | undefined>("")
  const debounce = useDebounce(searchKey)

  const handleOnSearch = useCallback((page = 1, size = 10) => {}, [debounce])

  useEffect(handleOnSearch, [handleOnSearch])

  const toggleFormModal = () => setFormModalState((prev) => !prev)

  const handleOnEdit = async (record: Repair) => {
    try {
      toggleFormModal()
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <CustomSpin>
      <TitleBar
        form={form}
        filterContent={<div />}
        createText="Nueva Reparación"
        searchPlaceholder={"Buscar reparaciones..."}
        onSearch={setSearchKey}
        onCreate={toggleFormModal}
      />
      <ReceptionTable onChange={handleOnSearch} onEdit={handleOnEdit} />

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
