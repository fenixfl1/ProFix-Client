"use client"

import {
  CustomButton,
  CustomCol,
  CustomDivider,
  CustomFormItem,
  CustomInputNumber,
  CustomRangePicker,
  CustomRow,
  CustomSelect,
  CustomSpace,
  CustomSpin,
  CustomTable,
  CustomTooltip,
} from "@/components/custom"
import TitleBar from "@/components/TitleBar"
import formatter from "@/helpers/formatter"
import makePagination from "@/helpers/pagination"
import useDebounce from "@/hooks/useDebounce"
import { Product } from "@/interfaces/inventory"
import { useGetProductsMutation } from "@/services/hooks/inventory/useGetProductsMutation"
import { useInventoryStore } from "@/stores/inventory.store"
import { DeleteOutlined, EditOutlined, StopOutlined } from "@ant-design/icons"
import { Form } from "antd"
import { ColumnType } from "antd/lib/table"
import React, { useCallback, useEffect, useState } from "react"
import ProductForm from "./ProductForm"
import errorHandler from "@/helpers/errorHandler"
import ConditionalComponent from "@/components/ConditionalComponent"
import { useUpdateProductMutation } from "@/services/hooks/inventory/useUpdateProductMutation"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import ProductDetailForm from "./ProductDetailForm"
import dayjs from "dayjs"
import { useGetCategoriesQuery } from "@/services/hooks/inventory/useGetCategoryQuery"
import CustomSpaceCompact from "@/components/custom/CustomSpaceCompact"
import { AdvancedCondition } from "@/services/interfaces"

const states: Record<string, string> = {
  A: "Activo",
  I: "Inactivo",
  F: "Agotado",
}

const initialFilter = {
  state: ["A"],
}

const InventoryTable: React.FC = () => {
  const [form] = Form.useForm()

  const [selectedProduct, setSelectedProduct] = useState({} as Product)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [productFormModalState, setProductFormModalState] = useState(false)
  const [detailProductModalState, setDetailProductModalState] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const debounce = useDebounce(searchKey)

  const { products, productMetadata } = useInventoryStore()
  const { categories } = useInventoryStore()

  useGetCategoriesQuery()

  const { pagination } = productMetadata

  const { mutate: getProducts, isPending: isGetProductPending } =
    useGetProductsMutation()
  const { mutateAsync: updateProduct, isPending: isUpdateProductPending } =
    useUpdateProductMutation()

  const handleSearch = useCallback(
    (page = pagination.currentPage, size = pagination.pageSize) => {
      const {
        state = ["A"],
        category_id,
        from_price,
        to_price,
        stock,
        fechas,
      } = form.getFieldsValue()

      const condition: AdvancedCondition[] = [
        {
          value: debounce,
          field: "filter",
          operator: "LIKE",
        },
        {
          value: state,
          field: "state",
          operator: "IN",
        },
      ]

      if (category_id) {
        condition.push({
          value: category_id,
          field: "category_id",
          operator: "IN",
        })
      }

      if (from_price && to_price) {
        condition.push({
          value: [from_price, to_price],
          field: "price",
          operator: "BETWEEN",
        })
      }
      if (fechas) {
        condition.push({
          value: fechas,
          field: "created_at",
          operator: "BETWEEN",
        })
      }

      if (stock) {
        condition.push({
          value: stock,
          field: "stock",
          operator: ">=",
        })
      }

      getProducts({
        page,
        size,
        condition,
      })
    },
    [debounce, shouldUpdate]
  )

  useEffect(handleSearch, [handleSearch])

  const handleOnUpdateState = (record: Product) => {
    CustomModalConfirmation({
      title: "Confirmación",
      content: `¿Estás seguro de cambiar el estado.?`,
      onOk: async () => {
        try {
          await updateProduct({
            state: record.state === "A" ? "I" : "A",
            product_detail_id: record.product_detail_id,
          })
          setShouldUpdate(!shouldUpdate)
        } catch (error) {
          errorHandler(error)
        }
      },
    })
  }

  const toggleFormModal = () => setProductFormModalState((prev) => !prev)

  const columns: ColumnType<Product>[] = [
    {
      dataIndex: "product_detail_id",
      key: "product_detail_id",
      title: "Código",
      width: "5%",
      align: "center",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Nombre",
    },
    {
      dataIndex: "brand",
      key: "brand",
      title: "Marca",
    },
    {
      dataIndex: "model",
      key: "model",
      title: "Modelo",
    },
    {
      dataIndex: "category_name",
      key: "category_name",
      title: "Categoría",
    },
    {
      dataIndex: "stock",
      key: "stock",
      title: "Stock",
    },
    {
      dataIndex: "price",
      key: "price",
      title: "Precio",
      render: (value: string) =>
        formatter({ value, format: "currency", prefix: "RD" }),
    },
    {
      dataIndex: "created_at",
      key: "created_at",
      title: "Fecha de Creación",
      render: (value) => formatter({ value, format: "long_date" }),
    },
    {
      dataIndex: "updated_at",
      key: "updated_at",
      title: "Última Actualización",
      render: (value) => formatter({ value, format: "long_date" }),
    },
    {
      dataIndex: "state",
      key: "state",
      title: "Estado",
      render: (value) => states[value],
    },
    {
      key: "acciones",
      title: "Acciones",
      width: "5%",
      render: (_, record) => (
        <CustomSpace
          split={<CustomDivider style={{ margin: 0 }} type={"vertical"} />}
          direction={"horizontal"}
        >
          <CustomTooltip title={"Editar"}>
            <CustomButton
              disabled={record.state === "I"}
              size={"middle"}
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedProduct(record)
                setDetailProductModalState(true)
              }}
              type={"link"}
            />
          </CustomTooltip>
          <ConditionalComponent
            condition={record.state == "A"}
            fallback={
              <CustomTooltip title={"Habilitar"}>
                <CustomButton
                  type={"link"}
                  icon={<StopOutlined style={{ color: "#b9b9b9" }} />}
                  onClick={() => handleOnUpdateState(record)}
                />
              </CustomTooltip>
            }
          >
            <CustomTooltip title={"Inhabilitar"}>
              <CustomButton
                size={"middle"}
                onClick={() => handleOnUpdateState(record)}
                danger
                icon={<DeleteOutlined />}
                type={"link"}
              />
            </CustomTooltip>
          </ConditionalComponent>
        </CustomSpace>
      ),
    },
  ]

  const filterContent = (
    <CustomRow>
      <CustomCol xs={24}>
        <CustomFormItem label={"Estado"} name={"state"}>
          <CustomSelect
            mode={"multiple"}
            allowClear
            placeholder={"Seleccionar estado"}
            options={[
              { label: "Activos", value: "A" },
              { label: "Inactivos", value: "I" },
            ]}
          />
        </CustomFormItem>
      </CustomCol>
      <CustomCol xs={24}>
        <CustomFormItem label={"Categoría"} name={"category_id"}>
          <CustomSelect
            mode={"multiple"}
            placeholder={"Seleccionar Categoría"}
            options={categories.map((item) => ({
              label: item.name,
              value: item.category_id,
            }))}
          />
        </CustomFormItem>
      </CustomCol>
      <CustomCol xs={24}>
        <CustomFormItem label={"Rango de precio"} labelCol={{ span: 24 }}>
          <CustomSpaceCompact>
            <CustomFormItem noStyle label={"Desde"} name={"from_price"}>
              <CustomInputNumber
                width={"100%"}
                format={{ format: "currency", currency: "RD" }}
              />
            </CustomFormItem>
            <CustomFormItem noStyle label={"Hasta"} name={"to_price"}>
              <CustomInputNumber
                width={"100%"}
                format={{ format: "currency", currency: "RD" }}
              />
            </CustomFormItem>
          </CustomSpaceCompact>
        </CustomFormItem>
      </CustomCol>
      <CustomCol xs={24}>
        <CustomFormItem label={"Stock"} name={"stock"}>
          <CustomInputNumber placeholder={"Stock"} />
        </CustomFormItem>
      </CustomCol>
      <CustomCol xs={24}>
        <CustomFormItem
          labelCol={{ span: 24 }}
          label={"Fecha de creación"}
          name={"fechas"}
        >
          <CustomRangePicker width={"100%"} maxDate={dayjs()} />
        </CustomFormItem>
      </CustomCol>
    </CustomRow>
  )

  return (
    <>
      <CustomSpin spinning={isGetProductPending || isUpdateProductPending}>
        <TitleBar
          form={form}
          filterContent={filterContent}
          createText={"Agregar Productos"}
          searchPlaceholder={"Buscar productos..."}
          onSearch={setSearchKey}
          onCreate={toggleFormModal}
          initialValue={initialFilter}
          onFilter={() => setShouldUpdate(!shouldUpdate)}
        />

        <CustomCol xs={24}>
          <CustomTable
            dataSource={products}
            columns={columns}
            onChange={({ current, pageSize }) =>
              handleSearch(current, pageSize)
            }
            pagination={{ ...makePagination(productMetadata) }}
          />
        </CustomCol>
      </CustomSpin>

      <ConditionalComponent condition={detailProductModalState}>
        <ProductDetailForm
          product={selectedProduct}
          form={form}
          open={detailProductModalState}
          onCancel={() => {
            setSelectedProduct({} as Product)
            setDetailProductModalState(false)
            setShouldUpdate(!shouldUpdate)
          }}
        />
      </ConditionalComponent>
      <ConditionalComponent condition={productFormModalState}>
        <ProductForm
          open={productFormModalState}
          form={form}
          onCancel={toggleFormModal}
        />
      </ConditionalComponent>
    </>
  )
}

export default InventoryTable
