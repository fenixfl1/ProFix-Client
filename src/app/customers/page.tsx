"use client"

import { CustomSpin } from "@/components/custom"
import TitleBar from "@/components/TitleBar"
import useDebounce from "@/hooks/useDebounce"
import { Form } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import CustomerTable from "./components/CustomerTable"
import { Customer } from "@/interfaces/customer"
import errorHandler from "@/helpers/errorHandler"
import CustomerForm from "./components/CustomerForm"
import ConditionalComponent from "@/components/ConditionalComponent"

const page: React.FC = () => {
  const [form] = Form.useForm()

  const [formModalState, setFormModalState] = useState(false)
  const [searchKey, setSearchKey] = useState<string | undefined>("")
  const debounce = useDebounce(searchKey)

  const handleOnSearch = useCallback((page = 1, size = 10) => {}, [debounce])

  useEffect(handleOnSearch, [handleOnSearch])

  const handleOnEdit = async (record: Customer) => {
    try {
      // eslint-disable-next-line no-console
      console.log({ record })
    } catch (error) {
      errorHandler(error)
    }
  }

  const toggleFormModal = () => setFormModalState((prev) => !prev)

  return (
    <CustomSpin>
      <TitleBar
        form={form}
        filterContent={<div />}
        createText={"Nuevo Cliente"}
        searchPlaceholder={"Buscar clientes..."}
        onSearch={setSearchKey}
        onCreate={toggleFormModal}
      />

      <CustomerTable onChange={handleOnSearch} onEdit={handleOnEdit} />

      <ConditionalComponent condition={formModalState}>
        <CustomerForm
          onCancel={toggleFormModal}
          form={form}
          open={formModalState}
        />
      </ConditionalComponent>
    </CustomSpin>
  )
}

export default page
