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
import TitleBar from "@/components/TitleBar"
import makePagination from "@/helpers/pagination"
import useDebounce from "@/hooks/useDebounce"
import { ProductHeader } from "@/interfaces/inventory"
import { useGetProductHeadersMutation } from "@/services/hooks/inventory/useGetProductHeadersMutation"
import { useInventoryStore } from "@/stores/inventory.store"
import { EditOutlined, DeleteOutlined, StopOutlined } from "@ant-design/icons"
import { Form } from "antd"
import { ColumnType } from "antd/lib/table"
import React, { useCallback, useEffect, useState } from "react"
import ConditionalComponent from "@/components/ConditionalComponent"
import ProductHeaderFrom from "./ProductHeaderFrom"
import { useUpdateProductHeaderMutation } from "@/services/hooks/inventory/useUpdateProductHeaderMutation"
import errorHandler from "@/helpers/errorHandler"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import { useGetCategoriesQuery } from "@/services/hooks/inventory/useGetCategoryQuery"
import dayjs from "dayjs"
import { AdvancedCondition } from "@/services/interfaces"

const states: Record<string, string> = {
  A: "Activo",
  I: "Iniciado",
}

const initialFilter = {
  state: ["A"],
  fechas: null,
  category_id: null,
}

const ProductTable: React.FC = () => {
  const [form] = Form.useForm()

  const [selectedProduct, setSelectedProduct] = useState<ProductHeader>()
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [formModalState, setFormModalState] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const debounce = useDebounce(searchKey)

  const { productHeaderMetadata, productsHeaders, categories } =
    useInventoryStore()

  useGetCategoriesQuery()
  const { mutate: getProducts, isPending: isGetProductPending } =
    useGetProductHeadersMutation()
  const { mutateAsync: updateProduct, isPending: isUpdatePending } =
    useUpdateProductHeaderMutation()

  const {
    pagination: { pageSize, currentPage },
  } = productHeaderMetadata

  const handleSearch = useCallback(
    (page = currentPage, size = pageSize) => {
      const { state = ["A"], fechas, category_id } = form.getFieldsValue()

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

      if (fechas) {
        condition.push({
          value: fechas,
          field: "created_at",
          operator: "BETWEEN",
        })
      }

      getProducts({ page, size, condition })
    },
    [debounce, formModalState, shouldUpdate, form]
  )

  useEffect(() => {
    form.setFieldsValue(initialFilter)
  }, [])

  useEffect(handleSearch, [handleSearch])

  const handleOnUpdateState = (record: ProductHeader) => {
    CustomModalConfirmation({
      title: "Confirmación",
      content: "¿Estás seguro de que deseas cambiar el estado del producto?",
      onOk: async () => {
        try {
          await updateProduct({
            product_id: record.product_id,
            category_id: record.category_id,
            name: record.name,
            state: record.state === "A" ? "I" : "A",
          })

          setShouldUpdate(!shouldUpdate)
        } catch (error) {
          errorHandler(error)
        }
      },
    })
  }

  const toggleFormModal = () => setFormModalState((prev) => !prev)

  const columns: ColumnType<ProductHeader>[] = [
    {
      align: "center",
      dataIndex: "product_id",
      key: "product_id",
      title: "Código",
      width: "5%",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Nombre",
    },
    {
      dataIndex: "category",
      key: "category",
      title: "Categoría",
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Descripción",
    },
    {
      dataIndex: "state",
      key: "state",
      title: "Estado",
      render: (value) => states[value],
    },
    {
      key: "actions",
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
              onClick={() => {
                setSelectedProduct(record)
                setFormModalState(true)
              }}
              size={"middle"}
              icon={<EditOutlined />}
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
            <CustomTooltip title={"Editar"}>
              <CustomButton
                onClick={() => handleOnUpdateState(record)}
                size={"middle"}
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
        <CustomFormItem
          labelCol={{ span: 24 }}
          label={"Fecha de creación"}
          name={"fechas"}
        >
          <CustomRangePicker maxDate={dayjs()} />
        </CustomFormItem>
      </CustomCol>
    </CustomRow>
  )

  const columnsMap = {
    product_id: "Código",
    name: "Nombre",
    category: "Categoría",
    description: "Descripción",
    created_at: "Fecha de creación",
    updated_at: "Última actualización",
    state: "Estado",
  }

  return (
    <>
      <CustomSpin spinning={isGetProductPending || isUpdatePending}>
        <TitleBar
          form={form}
          filterContent={filterContent}
          onFilter={() => setShouldUpdate(!shouldUpdate)}
          initialValue={initialFilter}
          createText={"Agregar Productos"}
          searchPlaceholder={"Buscar productos..."}
          onSearch={setSearchKey}
          onCreate={toggleFormModal}
        />

        <CustomCol xs={24}>
          <CustomTable
            exportable
            dataSource={productsHeaders}
            columns={columns}
            columnsMap={columnsMap}
            onChange={({ current, pageSize }) =>
              handleSearch(current, pageSize)
            }
            pagination={{
              ...makePagination(productHeaderMetadata),
            }}
          />
        </CustomCol>
      </CustomSpin>

      <ConditionalComponent condition={formModalState}>
        <ProductHeaderFrom
          product={selectedProduct}
          onCancel={toggleFormModal}
          open={formModalState}
          form={form}
        />
      </ConditionalComponent>
    </>
  )
}

export default ProductTable
