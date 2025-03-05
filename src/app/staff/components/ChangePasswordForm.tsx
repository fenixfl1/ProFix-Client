import {
  CustomButton,
  CustomCol,
  CustomForm,
  CustomFormItem,
  CustomModal,
  CustomPasswordInput,
  CustomRow,
  CustomSpin,
} from "@/components/custom"
import { formItemLayout } from "@/styles/breakpoints"
import { SwapOutlined } from "@ant-design/icons"
import { FormInstance } from "antd"
import React from "react"

interface ChangePasswordFormProps {
  open: boolean
  onClose: () => void
  onFinish: () => void
  loading?: boolean
  form: FormInstance
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  form,
  loading,
  onClose,
  onFinish,
  open,
}) => {
  return (
    <CustomModal
      title={"Cambiar Contraseña"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <CustomSpin spinning={loading}>
        <CustomForm layout={"vertical"} form={form} {...formItemLayout}>
          <CustomRow justify={"end"}>
            <CustomCol span={24}>
              <CustomFormItem
                label="Contraseña actual"
                name="old_password"
                rules={[{ required: true }]}
              >
                <CustomPasswordInput placeholder={"Contraseña actual"} />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                label={"Nueva contraseña"}
                name={"new_password"}
                rules={[{ required: true }]}
              >
                <CustomPasswordInput placeholder={"Nueva contraseña"} />
              </CustomFormItem>
            </CustomCol>

            <CustomCol xs={24}>
              <CustomFormItem
                label={"Confirmar contraseña"}
                name={"CONFIRM_PASSWORD"}
                dependencies={["new_password"]}
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_password") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error(
                          "¡La nueva contraseña que ingresaste no coincide!"
                        )
                      )
                    },
                  }),
                ]}
              >
                <CustomPasswordInput placeholder={"Confirmar contraseña"} />
              </CustomFormItem>
            </CustomCol>

            <CustomFormItem label={"  "} colon={false}>
              <CustomButton
                icon={<SwapOutlined />}
                type="primary"
                onClick={onFinish}
              >
                Cambiar contraseña
              </CustomButton>
            </CustomFormItem>
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomModal>
  )
}

export default ChangePasswordForm
