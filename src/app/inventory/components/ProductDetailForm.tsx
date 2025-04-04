import React, { useEffect } from "react"
import { FormInstance } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import {
  CustomButton,
  CustomCol,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomInputNumber,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomSpin,
  CustomTooltip,
} from "@/components/custom"
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from "@/styles/breakpoints"
import { Product } from "@/interfaces/inventory"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import errorHandler from "@/helpers/errorHandler"
import { customNotification } from "@/components/custom/customNotification"
import { useUpdateProductMutation } from "@/services/hooks/inventory/useUpdateProductMutation"

const conditions = [
  { label: "Nuevo, Original", value: "NO" },
  { label: "Usado, Original", value: "UO" },
  { label: "Nuevo, Réplica", value: "NR" },
  { label: "Usado, Réplica", value: "UR" },
]

interface ProductDetailFormProps {
  open: boolean
  onCancel?(): void
  form: FormInstance
  product: Product
}

const ProductDetailForm: React.FC<ProductDetailFormProps> = ({
  form,
  open,
  product,
  onCancel,
}) => {
  const { mutateAsync: updateProduct, isPending } = useUpdateProductMutation()

  useEffect(() => {
    form.setFieldsValue(product)
  }, [product])

  const handleOnFish = async () => {
    try {
      const data = await form.validateFields()
      await updateProduct(data)

      customNotification({
        message: "Operación exitosa",
        description: "Producto actualizado con éxito",
        type: "success",
      })

      onCancel?.()
      form.resetFields()
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
        onCancel?.()
      },
    })
  }

  return (
    <CustomModal
      open={open}
      onCancel={handleOnCancel}
      onOk={handleOnFish}
      width={"40%"}
    >
      <CustomSpin spinning={isPending}>
        <CustomForm form={form} {...formItemLayout}>
          <CustomRow justify={"space-between"}>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={"Código"}
                name={"product_detail_id"}
                rules={[{ required: true }]}
              >
                <CustomInput readOnly placeholder={"Código del producto"} />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints} />
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={"Marca"}
                name={"brand"}
                rules={[{ required: true }]}
              >
                <CustomInput placeholder={"Marca"} />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                name={"model"}
                label={"Modelo"}
                rules={[{ required: true }]}
              >
                <CustomInput placeholder={"Modelo"} />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                label={"Suplidor"}
                name={"supplier"}
                {...labelColFullWidth}
              >
                <CustomInput placeholder={"Suplidor"} />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={"Precio"}
                name={"price"}
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
                name={["stock"]}
                rules={[{ required: true }]}
              >
                <CustomInputNumber
                  min={1}
                  width={"100%"}
                  formatter={(value) => `${value}`}
                  parser={(value) =>
                    value?.replace("", "") as unknown as number
                  }
                  placeholder={"Cantidad"}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={"Condición"}
                name={"condition"}
                rules={[{ required: true }]}
              >
                <CustomSelect
                  placeholder={"Seleccionar condición"}
                  options={conditions}
                />
              </CustomFormItem>
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomModal>
  )
}

export default ProductDetailForm
