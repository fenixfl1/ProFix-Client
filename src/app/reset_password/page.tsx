"use client"

import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomButton,
  CustomCard,
  CustomCol,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomResult,
  CustomRow,
  CustomSpin,
  CustomTitle,
} from "@/components/custom"
import { PATH_LOGIN } from "@/constants/routes"
import errorHandler from "@/helpers/errorHandler"
import { useRequestResetPasswordMutation } from "@/services/hooks/auth/useRequestResetPasswordMutation"
import { useResetPasswordMutation } from "@/services/hooks/auth/useResetPasswordMutation"
import { SendOutlined } from "@ant-design/icons"
import { Form } from "antd"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const ResetPasswordPage: React.FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const [message, setMessage] = useState<string>()

  const { mutateAsync: requestResetPassword, isPending } =
    useRequestResetPasswordMutation()

  const handleOnFinish = async () => {
    try {
      const { email, username } = await form.validateFields()

      const response = await requestResetPassword({ username, email })

      setMessage(response)
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <ConditionalComponent
      condition={!message}
      fallback={
        <CustomCard>
          <CustomResult
            status="success"
            title={"Operación exitosa"}
            subTitle={message}
            extra={[
              <CustomButton
                type="primary"
                key="login"
                onClick={() => router.push(PATH_LOGIN)}
              >
                Ir a Iniciar Sesión
              </CustomButton>,
            ]}
          />
        </CustomCard>
      }
    >
      <CustomCol xs={23} sm={12} lg={6} xl={5}>
        <CustomCard>
          <CustomTitle level={3}>Recuperar Contraseña</CustomTitle>

          <CustomForm
            form={form}
            layout={"vertical"}
            name={"dependencies"}
            autoComplete={"off"}
          >
            <CustomSpin spinning={isPending}>
              <CustomRow justify={"center"}>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={"Usuario"}
                    name={"username"}
                    rules={[{ required: true }]}
                  >
                    <CustomInput placeholder={"Nombre de usuario"} />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={"Email"}
                    name={"email"}
                    rules={[{ required: true, type: "email" }]}
                  >
                    <CustomInput />
                  </CustomFormItem>
                </CustomCol>
                <CustomButton
                  size={"middle"}
                  block
                  type={"primary"}
                  icon={<SendOutlined />}
                  onClick={handleOnFinish}
                >
                  Enviar
                </CustomButton>
              </CustomRow>
            </CustomSpin>
          </CustomForm>
        </CustomCard>
      </CustomCol>
    </ConditionalComponent>
  )
}

export default ResetPasswordPage
