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
import { normalizeMaskedInput } from "@/helpers/form-item-normalizers"
import { Customer } from "@/interfaces/customer"
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from "@/styles/breakpoints"
import { FormInstance } from "antd"
import React from "react"

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
      title={"Nuevo Cliente"}
      open={open}
      onCancel={handleOnCancel}
    >
      <CustomSpin>
        <CustomForm form={form} {...formItemLayout}>
          <CustomRow justify={"end"}>
            <ConditionalComponent condition>
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
