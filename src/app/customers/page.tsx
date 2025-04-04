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
import { useCustomerStore } from "@/stores/customer.store"
import { useGetCustomerMutation } from "@/services/hooks/customer/useGetCustomersMutation"
import { useGetOneCustomerMutation } from "@/services/hooks/customer/useGetOneCustomerMutation"
import { useUpdateCustomerMutation } from "@/services/hooks/customer/useUpdateCustomerMutation"
import { customNotification } from "@/components/custom/customNotification"

const page: React.FC = () => {
  const [form] = Form.useForm()

  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [formModalState, setFormModalState] = useState(false)
  const [searchKey, setSearchKey] = useState<string>("")
  const debounce = useDebounce(searchKey)

  const { mutateAsync: getCustomers, isPending: isGetCustomersPending } =
    useGetCustomerMutation()
  const { mutateAsync: getOneCustomer, isPending: isGetOnePending } =
    useGetOneCustomerMutation()
  const { mutateAsync: updateCustomer, isPending: isUpdateCustomerPending } =
    useUpdateCustomerMutation()

  const { metadata, setCustomer } = useCustomerStore()

  const { pagination } = metadata ?? {}

  const handleOnSearch = useCallback(
    (page = pagination?.currentPage, size = pagination?.pageSize) => {
      if (formModalState) return
      getCustomers({
        page,
        size,
        condition: [
          {
            value: debounce,
            operator: "LIKE",
            field: "name",
          },
        ],
      })
    },
    [debounce, formModalState, shouldUpdate]
  )

  useEffect(handleOnSearch, [handleOnSearch])

  useEffect(() => {
    if (!formModalState) {
      setCustomer({} as Customer)
      form.resetFields()
    }
  }, [formModalState])

  const handleOnChangeState = async (record: Customer) => {
    try {
      const message = await updateCustomer({
        customer_id: record.customer_id,
        state: record.state === "A" ? "I" : "A",
      })

      customNotification({
        message: "Operación exitosa",
        description: message,
        type: "success",
      })
      setShouldUpdate(!shouldUpdate)
    } catch (error) {
      errorHandler(error)
    }
  }

  const toggleFormModal = () => setFormModalState((prev) => !prev)

  const handleOnEdit = async (record: Customer) => {
    try {
      await getOneCustomer(record.customer_id)
      toggleFormModal()
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <CustomSpin
      spinning={
        isGetCustomersPending || isGetOnePending || isUpdateCustomerPending
      }
    >
      <TitleBar
        form={form}
        createText={"Nuevo Cliente"}
        searchPlaceholder={"Buscar clientes..."}
        onSearch={setSearchKey}
        onCreate={toggleFormModal}
      />

      <CustomerTable
        onChange={handleOnSearch}
        onEdit={handleOnEdit}
        onUpdate={handleOnChangeState}
      />

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
