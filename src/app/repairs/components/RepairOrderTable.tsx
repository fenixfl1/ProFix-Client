"use client"

import {
  CustomButton,
  CustomCol,
  CustomDivider,
  CustomFormItem,
  CustomRangePicker,
  CustomRow,
  CustomSelect,
  CustomSpace,
  CustomSpin,
  CustomTable,
  CustomTooltip,
} from "@/components/custom"
import formatter from "@/helpers/formatter"
import makePagination from "@/helpers/pagination"
import { RepairOrder } from "@/interfaces/repair"
import { useRepairOrdersStore } from "@/stores/repair-orders.store"
import { DeleteOutlined, ToolOutlined } from "@ant-design/icons"
import { ColumnType } from "antd/lib/table"
import React, { useCallback, useEffect, useState } from "react"
import RepairOrderInfo from "./RepairOrderInfo"
import ConditionalComponent from "@/components/ConditionalComponent"
import RepairForm from "./RepairForm"
import { Form, FormInstance } from "antd"
import TitleBar from "@/components/TitleBar"
import { useGetBrandQuery } from "@/services/hooks/repairs/useGetBrandsQuery"
import dayjs from "dayjs"
import errorHandler from "@/helpers/errorHandler"
import useDebounce from "@/hooks/useDebounce"
import { useGetRepairOrdersMutation } from "@/services/hooks/repairs/useGetRepairOrdersMutation"
import RepairOrderForm from "./RepairOrderForm"
import { AdvancedCondition } from "@/services/interfaces"
import { useUpdateRepairOrderMutation } from "@/services/hooks/repairs/useUpdateRepairOrderMutation"
import { customNotification } from "@/components/custom/customNotification"

const statusMap: Record<string, string> = {
  P: "Pendiente",
  I: "Iniciado",
  R: "Resuelto",
  N: "No Resulto",
}

const initialFilter = {
  in__status: null,
  in__brand: null,
  between__created_at: null,
  between__delivery_date: null,
}

const RepairOrderTable: React.FC = () => {
  const [form] = Form.useForm()
  const [selectedRow, setSelectedRow] = useState<RepairOrder | undefined>(
    undefined
  )
  const [repairReceiptModalState, setRepairReceiptModalState] = useState(false)
  const [infoModalState, setInfoModalState] = useState(false)
  const [repairModalVisibilityState, setRepairModalVisibilityState] =
    useState(false)

  const { repairOrders, metadata, setRepairOrder, receipt, setReceipt } =
    useRepairOrdersStore()

  const { data: brands } = useGetBrandQuery()

  const [formModalState, setFormModalState] = useState(false)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [searchKey, setSearchKey] = useState<string>("")
  const debounce = useDebounce(searchKey)

  const { mutateAsync: getRepairOrders } = useGetRepairOrdersMutation()
  const { mutateAsync: updateRepairOrder, isPending: isUpdateOrderPending } =
    useUpdateRepairOrderMutation()

  const { pagination } = metadata ?? {}

  const handleOnSearch = useCallback(
    (page = pagination?.currentPage, size = pagination?.pageSize) => {
      if (formModalState) return

      const data = form.getFieldsValue()

      const condition: AdvancedCondition[] = [
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
      ]

      Object.keys(data).forEach((field) => {
        if (field.includes("in__")) {
          condition.push({
            value: data[field],
            operator: "IN",
            field: field.replace("in__", ""),
          })
        } else if (field.includes("between__")) {
          condition.push({
            value: data[field],
            operator: "BETWEEN",
            field: field.replace("between__", ""),
          })
        }
      })

      getRepairOrders({
        page,
        size,
        condition,
      })
    },
    [debounce, shouldUpdate, formModalState]
  )

  useEffect(handleOnSearch, [handleOnSearch])

  const toggleFormModal = () => setFormModalState((prev) => !prev)

  const handleOnUpdate = async (record: RepairOrder) => {
    try {
      await updateRepairOrder({
        repair_order_id: record.repair_order_id,
        state: record.state === "A" ? "I" : "A",
      })

      customNotification({
        message: "Operación exitosa",
        description: `Orden de reparación ${record.state === "A" ? "Archivada" : "Activada"} con exitosamente.`,
        type: "success",
      })

      setShouldUpdate(!shouldUpdate)
    } catch (error) {
      errorHandler(error)
    }
  }

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ ...makePagination(metadata), metadata })
  }, [metadata])

  const columnsMap = {
    repair_order_id: "Código",
    reported_issue: "Problema reportado",
    diagnosis: "Diagnóstico",
    customer_name: "Cliente",
    delivery_date: "Fecha de entrega",
    status: "Estado",
  }

  const columns: ColumnType<RepairOrder>[] = [
    {
      dataIndex: "repair_order_id",
      key: "repair_order_id",
      title: "Código",
      width: "5%",
      align: "center",
    },
    {
      dataIndex: "reported_issue",
      key: "reported_issue",
      title: "Problema reportado",
      render: (value, record) => (
        <CustomButton
          type={"link"}
          onClick={() => {
            setRepairOrder(record)
            setInfoModalState(true)
          }}
        >
          {value}
        </CustomButton>
      ),
    },
    {
      dataIndex: "diagnosis",
      key: "diagnosis",
      title: "Diagnóstico",
    },
    {
      dataIndex: "customer_name",
      key: "customer_name",
      title: "Cliente",
    },
    {
      dataIndex: "delivery_date",
      key: "delivery_date",
      title: "Fecha de entrega",
      render: (value) => formatter({ value, format: "long_date" }),
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Estado",
      render: (value: string) => statusMap[value],
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
          <CustomTooltip title={""}>
            <CustomButton
              type={"link"}
              onClick={() => {
                setRepairModalVisibilityState(true)
                setSelectedRow(record)
              }}
              icon={<ToolOutlined />}
            />
          </CustomTooltip>
          <CustomTooltip title={"Inhabilitar"}>
            <CustomButton
              danger
              type={"link"}
              icon={<DeleteOutlined />}
              onClick={() => handleOnUpdate(record)}
            />
          </CustomTooltip>
        </CustomSpace>
      ),
    },
  ]

  const filterContent = (
    <CustomRow>
      <CustomCol xs={24}>
        <CustomFormItem label={"Estatus"} name={"in__status"}>
          <CustomSelect
            mode={"multiple"}
            allowClear
            placeholder={"Seleccionar estado"}
            options={Object.keys(statusMap).map((status) => ({
              label: statusMap[status],
              value: status,
            }))}
          />
        </CustomFormItem>
      </CustomCol>
      <CustomCol xs={24}>
        <CustomFormItem label={"Marca"} name={"in__brand"}>
          <CustomSelect
            mode={"multiple"}
            placeholder={"Seleccionar marca"}
            options={brands?.map((brand) => ({
              label: brand.name,
              value: brand.brand_id,
            }))}
          />
        </CustomFormItem>
      </CustomCol>
      <CustomCol xs={24}>
        <CustomFormItem
          labelCol={{ span: 24 }}
          label={"Fecha de registro"}
          name={"between__created_at"}
        >
          <CustomRangePicker width={"100%"} maxDate={dayjs()} />
        </CustomFormItem>
      </CustomCol>
      <CustomCol xs={24}>
        <CustomFormItem
          labelCol={{ span: 24 }}
          label={"Fecha de entrega"}
          name={"between__delivery_date"}
        >
          <CustomRangePicker width={"100%"} />
        </CustomFormItem>
      </CustomCol>
    </CustomRow>
  )

  return (
    <>
      <CustomSpin spinning={isUpdateOrderPending}>
        <TitleBar
          form={form}
          filterContent={filterContent}
          createText="Nueva Reparación"
          searchPlaceholder={"Buscar reparaciones..."}
          onSearch={setSearchKey}
          onCreate={toggleFormModal}
          initialValue={initialFilter}
          onFilter={() => setShouldUpdate(!shouldUpdate)}
        />
        <CustomCol xs={24}>
          <CustomTable
            dataSource={repairOrders}
            columns={columns}
            columnsMap={columnsMap}
            pagination={{ ...makePagination(metadata) }}
            onChange={({ current, pageSize }) =>
              handleOnSearch(current, pageSize)
            }
          />
        </CustomCol>
      </CustomSpin>

      <ConditionalComponent condition={infoModalState}>
        <RepairOrderInfo
          open={infoModalState}
          onCancel={() => setInfoModalState(false)}
        />
      </ConditionalComponent>

      <ConditionalComponent condition={repairModalVisibilityState}>
        <RepairForm
          data={selectedRow}
          open={repairModalVisibilityState}
          onCancel={() => {
            setSelectedRow(undefined)
            setRepairModalVisibilityState(false)
          }}
        />
      </ConditionalComponent>

      <ConditionalComponent condition={formModalState}>
        <RepairOrderForm
          open={formModalState}
          form={form}
          onCancel={toggleFormModal}
          onFinish={() => {
            toggleFormModal()
            setRepairReceiptModalState(true)
          }}
        />
      </ConditionalComponent>
    </>
  )
}

export default RepairOrderTable
