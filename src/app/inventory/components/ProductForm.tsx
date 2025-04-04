import {
  CustomButton,
  CustomCard,
  CustomCol,
  CustomCollapse,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomInputNumber,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomSpace,
  CustomSpin,
  CustomTooltip,
} from "@/components/custom"
import CustomSpaceCompact from "@/components/custom/CustomSpaceCompact"
import useDebounce from "@/hooks/useDebounce"
import { useGetProductHeadersMutation } from "@/services/hooks/inventory/useGetProductHeadersMutation"
import { useInventoryStore } from "@/stores/inventory.store"
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from "@/styles/breakpoints"
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { Form, FormInstance } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import ProductHeaderFrom from "./ProductHeaderFrom"
import ConditionalComponent from "@/components/ConditionalComponent"
import CustomFormList from "@/components/custom/CustomFormList"
import errorHandler from "@/helpers/errorHandler"
import { useCreateProductDetailsMutation } from "@/services/hooks/inventory/useCreateProductDetailsMutation"
import { customNotification } from "@/components/custom/customNotification"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"

const conditions = [
  { label: "Nuevo, Original", value: "NO" },
  { label: "Usado, Original", value: "UO" },
  { label: "Nuevo, Réplica", value: "NR" },
  { label: "Usado, Réplica", value: "UR" },
]

interface InventoryFormProps {
  open: boolean
  form: FormInstance
  onCancel: () => void
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  form,
  open,
  onCancel,
}) => {
  const [activeKey, setActiveKey] = useState(0)
  const [productHeaderModal, setProductHeaderModal] = useState(false)
  const [searchHeaderKey, setSearchHeaderKey] = useState("")
  const debounce = useDebounce(searchHeaderKey)

  const { mutate: getProductHeader } = useGetProductHeadersMutation()
  const { mutateAsync: createProduct, isPending: isCreatePending } =
    useCreateProductDetailsMutation()

  const { productsHeaders } = useInventoryStore()

  const handleGetProductHeaders = useCallback(() => {
    if (productHeaderModal) return
    getProductHeader({
      page: 1,
      size: 20,
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
  }, [debounce, productHeaderModal])

  useEffect(handleGetProductHeaders, [handleGetProductHeaders])

  useEffect(() => {
    return () => {
      form.resetFields()
    }
  }, [])

  const handleOnCreate = async () => {
    try {
      const data = await form.validateFields()

      await createProduct(data)

      customNotification({
        message: "Operación exitosa",
        description: "El producto ha sido creado exitosamente",
        type: "success",
      })

      form.resetFields()
      onCancel()
    } catch (error) {
      errorHandler(error)
    }
  }

  const handleOnCancel = () => {
    CustomModalConfirmation({
      content: "¿Estás seguro de que deseas cancelar la operación?",
      title: "Confirmación",
      onOk: () => {
        form.resetFields()
        onCancel()
      },
    })
  }

  return (
    <>
      <CustomModal
        title={"Formulario de producto"}
        width={"50%"}
        open={open}
        onCancel={handleOnCancel}
        onOk={handleOnCreate}
      >
        <CustomSpin spinning={isCreatePending}>
          <CustomForm
            initialValues={{ details: [{}] }}
            form={form}
            {...formItemLayout}
          >
            <CustomRow justify={"start"} gap={10}>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={"Tipo producto"}
                  rules={[{ required: true }]}
                  {...labelColFullWidth}
                >
                  <CustomSpaceCompact style={{ width: "100%" }}>
                    <CustomFormItem
                      label={"Tipo producto"}
                      name={"product_header_id"}
                      noStyle
                      rules={[{ required: true }]}
                    >
                      <CustomSelect
                        options={productsHeaders.map((item) => ({
                          label: `${item.name} - ${item.description ?? ""}`,
                          value: item.product_id,
                        }))}
                        style={{ minWidth: "100%%" }}
                        placeholder={"Seleccionar encabezado"}
                        onSearch={setSearchHeaderKey}
                      />
                    </CustomFormItem>
                    <CustomButton
                      icon={<PlusOutlined />}
                      type={"primary"}
                      onClick={() => setProductHeaderModal(true)}
                    />
                  </CustomSpaceCompact>
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormList name={"details"}>
                  {(fields, { add, remove }) => (
                    <>
                      <CustomCollapse
                        accordion
                        defaultActiveKey={0}
                        activeKey={activeKey}
                        onChange={([key]) => {
                          setActiveKey(Number(key))
                        }}
                        items={fields.map((field) => ({
                          label: `Producto No. ${field.name + 1}`,
                          children: (
                            <CustomRow justify={"space-between"}>
                              <CustomCol {...defaultBreakpoints}>
                                <CustomFormItem
                                  label={"Marca"}
                                  name={[field.name, "brand"]}
                                  rules={[{ required: true }]}
                                >
                                  <CustomInput placeholder={"Marca"} />
                                </CustomFormItem>
                              </CustomCol>
                              <CustomCol {...defaultBreakpoints}>
                                <CustomFormItem
                                  name={[field.name, "model"]}
                                  label={"Modelo"}
                                  rules={[{ required: true }]}
                                >
                                  <CustomInput placeholder={"Modelo"} />
                                </CustomFormItem>
                              </CustomCol>
                              <CustomCol {...defaultBreakpoints}>
                                <CustomFormItem
                                  label={"Suplidor"}
                                  name={[field.name, "supplier"]}
                                >
                                  <CustomInput placeholder={"Suplidor"} />
                                </CustomFormItem>
                              </CustomCol>
                              <CustomCol {...defaultBreakpoints}>
                                <CustomFormItem
                                  label={"Condición"}
                                  name={[field.name, "condition"]}
                                  rules={[{ required: true }]}
                                >
                                  <CustomSelect
                                    placeholder={"Seleccionar condición"}
                                    options={conditions}
                                  />
                                </CustomFormItem>
                              </CustomCol>
                              <CustomCol {...defaultBreakpoints}>
                                <CustomFormItem
                                  label={"Precio"}
                                  name={[field.name, "price"]}
                                  rules={[{ required: true }]}
                                >
                                  <CustomInputNumber
                                    min={1}
                                    width={"100%"}
                                    placeholder={"precio"}
                                    format={{
                                      format: "currency",
                                      currency: "RD",
                                    }}
                                  />
                                </CustomFormItem>
                              </CustomCol>
                              <CustomCol {...defaultBreakpoints}>
                                <CustomFormItem
                                  label={"Cantidad"}
                                  name={[field.key, "stock"]}
                                  rules={[{ required: true }]}
                                >
                                  <CustomInputNumber
                                    min={1}
                                    width={"100%"}
                                    formatter={(value) => `${value}`}
                                    parser={(value) =>
                                      value?.replace(
                                        "",
                                        ""
                                      ) as unknown as number
                                    }
                                    placeholder={"Cantidad"}
                                  />
                                </CustomFormItem>
                              </CustomCol>
                              <CustomCol {...defaultBreakpoints} />
                              <CustomTooltip title={"Eliminar Producto"}>
                                <CustomButton
                                  size={"large"}
                                  type={"link"}
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => {
                                    if (activeKey === field.name) {
                                      setActiveKey(field.name - 1 || 0)
                                    }
                                    remove(field.name)
                                  }}
                                />
                              </CustomTooltip>
                            </CustomRow>
                          ),
                        }))}
                      />
                      <CustomDivider />
                      <CustomButton
                        type="dashed"
                        onClick={async () => {
                          try {
                            await form.validateFields()
                            add()
                            setActiveKey(fields.length)
                          } catch (error) {
                            errorHandler(error)
                          }
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Agregar producto
                      </CustomButton>
                    </>
                  )}
                </CustomFormList>
              </CustomCol>
            </CustomRow>
          </CustomForm>
        </CustomSpin>
      </CustomModal>

      <ConditionalComponent condition={productHeaderModal}>
        <ProductHeaderFrom
          form={form}
          open={productHeaderModal}
          onCancel={() => setProductHeaderModal(false)}
          onFinish={(product_id) => {
            form.setFieldValue("product_header_id", product_id)
          }}
        />
      </ConditionalComponent>
    </>
  )
}

export default InventoryForm
