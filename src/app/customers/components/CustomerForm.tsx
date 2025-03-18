import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomCol,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomMaskedInput,
  CustomModal,
  CustomRow,
  CustomSpin,
  CustomTextArea,
} from "@/components/custom"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import { customNotification } from "@/components/custom/customNotification"
import errorHandler from "@/helpers/errorHandler"
import { normalizeMaskedInput } from "@/helpers/form-item-normalizers"
import { Customer } from "@/interfaces/customer"
import { useCreateCustomerMutation } from "@/services/hooks/customer/useCreateCustomerMutation"
import { useUpdateCustomerMutation } from "@/services/hooks/customer/useUpdateCustomerMutation"
import { useCustomerStore } from "@/stores/customer.store"
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from "@/styles/breakpoints"
import { FormInstance } from "antd"
import React, { useEffect } from "react"

interface CustomerFormProps {
  form: FormInstance<Customer>
  open: boolean
  onCancel: () => void
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  form,
  open,
  onCancel,
}) => {
  const { customer } = useCustomerStore()
  const { mutateAsync: createCustomer, isPending: isCreatePending } =
    useCreateCustomerMutation()
  const { mutateAsync: updateCustomer, isPending: isUpdatePending } =
    useUpdateCustomerMutation()

  const isEditing = !!customer?.customer_id

  useEffect(() => {
    form.setFieldsValue({ ...customer })
  }, [customer])

  const handleOnFinish = async () => {
    try {
      const data = await form.validateFields()

      let description = "El cliente ha sido creado exitosamente"
      if (isEditing) {
        description = await updateCustomer({ ...data })
      } else {
        await createCustomer(data)
      }

      form.resetFields()
      customNotification({
        message: "Operación exitosa",
        description,
        type: "success",
      })
      onCancel()
    } catch (error) {
      errorHandler(error)
    }
  }

  const handleOnCancel = () => {
    CustomModalConfirmation({
      title: "confirmación",
      content: "¿Estás seguro de que deseas cancelar la operación?",
      onOk: onCancel,
    })
  }

  return (
    <CustomModal
      width={"50%"}
      title={isEditing ? "Editar Cliente" : "Nuevo Cliente"}
      open={open}
      onCancel={handleOnCancel}
      onOk={handleOnFinish}
    >
      <CustomSpin spinning={isCreatePending || isUpdatePending}>
        <CustomForm form={form} {...formItemLayout}>
          <CustomRow justify={"end"}>
            <ConditionalComponent condition={isEditing}>
              <CustomCol>
                <CustomFormItem
                  label={"Código"}
                  name={"customer_id"}
                  rules={[{ required: true }]}
                >
                  <CustomInput placeholder={"Código"} />
                </CustomFormItem>
              </CustomCol>
            </ConditionalComponent>
            <CustomCol xs={24}>
              <CustomFormItem
                label={"Nombre"}
                name={"name"}
                rules={[{ required: true }]}
                {...labelColFullWidth}
              >
                <CustomInput placeholder={"Nombre completo"} />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={"Doc. Identidad"}
                name={"identity_document"}
                hasFeedback
                rules={[{ required: false, len: 11 }]}
                getValueFromEvent={normalizeMaskedInput}
              >
                <CustomMaskedInput
                  type={"cedula"}
                  placeholder={"Documento de identidad"}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints} />
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                onlyNumber
                label={"Teléfono"}
                name={"phone"}
                getValueFromEvent={normalizeMaskedInput}
                rules={[{ required: false, len: 10 }]}
              >
                <CustomMaskedInput
                  type={"telefono"}
                  placeholder={"Número de teléfono"}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={"Correo"}
                name={"email"}
                rules={[{ required: false, type: "email" }]}
              >
                <CustomInput placeholder={"Correo electrónico"} />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                label={"Dirección"}
                name={"address"}
                {...labelColFullWidth}
              >
                <CustomTextArea placeholder={"Dirección"} />
              </CustomFormItem>
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomModal>
  )
}

export default CustomerForm
