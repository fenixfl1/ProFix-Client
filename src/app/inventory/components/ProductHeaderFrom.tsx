import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomCol,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomSpin,
  CustomTextArea,
} from "@/components/custom"
import CustomAutocomplete from "@/components/custom/CustomAutoComplete"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import { customNotification } from "@/components/custom/customNotification"
import NotFoundContent from "@/components/NotFoundContent"
import errorHandler from "@/helpers/errorHandler"
import { ProductHeader } from "@/interfaces/inventory"
import { useCreateCategoryMutation } from "@/services/hooks/inventory/useCreateCategoryMutation"
import { useCreateProductHeaderMutation } from "@/services/hooks/inventory/useCreateProductHeaderMutation"
import { useGetCategoriesQuery } from "@/services/hooks/inventory/useGetCategoryQuery"
import { useUpdateProductHeaderMutation } from "@/services/hooks/inventory/useUpdateProductHeaderMutation"
import { useInventoryStore } from "@/stores/inventory.store"
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from "@/styles/breakpoints"
import { Form, FormInstance } from "antd"
import React, { useEffect } from "react"

interface ProductHeaderFromProps {
  form: FormInstance
  open: boolean
  onCancel: () => void
  onFinish?: (id: number) => void
  product?: ProductHeader
}

const ProductHeaderFrom: React.FC<ProductHeaderFromProps> = ({
  open,
  onCancel,
  onFinish,
  product,
}) => {
  const [form] = Form.useForm()
  const category = Form.useWatch("category_id", form)
  const { categories } = useInventoryStore()

  const { refetch } = useGetCategoriesQuery()

  const { mutateAsync: createCategory, isPending: isCreateCategoryPending } =
    useCreateCategoryMutation()
  const { mutateAsync: createHeader, isPending: isCreateHeaderPending } =
    useCreateProductHeaderMutation()
  const { mutateAsync: updateHeader, isPending: isUpdatePending } =
    useUpdateProductHeaderMutation()

  useEffect(() => {
    form.setFieldsValue({ ...product, category_id: product?.category })
  }, [product])

  const handleFinish = async () => {
    try {
      const data = await form.validateFields()

      data.category_id = categories?.find(
        (item) => item.name === data.category_id
      )?.category_id

      let response: ProductHeader
      if (product?.product_id) {
        response = await updateHeader({ ...data, state: "A" })
      } else {
        response = await createHeader(data)
      }

      onFinish?.(response.product_id)
      customNotification({
        message: "Operación exitosa",
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
      title: "Confirmación",
      content: "¿Estás seguro de que deseas cancelar la operación?",
      onOk: onCancel,
    })
  }

  const handleCreateCategory = async () => {
    try {
      await createCategory({ name: category, description: "" })
      refetch()
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <CustomModal
      title={"Formulario de producto"}
      width={"35%"}
      open={open}
      onOk={handleFinish}
      onCancel={handleOnCancel}
    >
      <CustomSpin spinning={isCreateHeaderPending || isUpdatePending}>
        <CustomForm form={form} {...formItemLayout}>
          <CustomRow justify={"start"}>
            <CustomCol {...defaultBreakpoints} />
            <CustomCol {...defaultBreakpoints}>
              <ConditionalComponent condition={!!product}>
                <CustomFormItem
                  label={"Código"}
                  name={"product_id"}
                  rules={[{ required: true }]}
                >
                  <CustomInput placeholder={"Código"} />
                </CustomFormItem>
              </ConditionalComponent>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={"Nombre"}
                name={"name"}
                rules={[{ required: true }]}
              >
                <CustomInput placeholder={"Nombre"} />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={"Categoría"}
                name={"category_id"}
                rules={[{ required: true }]}
              >
                <CustomAutocomplete
                  onBlur={() => {
                    if (
                      categories.findIndex((item) => item.name === category) ===
                      -1
                    ) {
                      form.resetFields(["category_id"])
                    }
                  }}
                  notFoundContent={
                    <NotFoundContent
                      loading={isCreateCategoryPending}
                      onOk={handleCreateCategory}
                      description={category}
                    />
                  }
                  placeholder={"Seleccionar categoría"}
                  options={categories.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                label={"Descripción"}
                name={"description"}
                {...labelColFullWidth}
              >
                <CustomTextArea placeholder={"Escribe una descripción"} />
              </CustomFormItem>
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomModal>
  )
}

export default ProductHeaderFrom
