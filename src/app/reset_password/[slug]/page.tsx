"use client"

import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomButton,
  CustomCard,
  CustomCol,
  CustomForm,
  CustomFormItem,
  CustomPasswordInput,
  CustomResult,
  CustomRow,
  CustomSpin,
  CustomTitle,
} from "@/components/custom"
import { PATH_LOGIN } from "@/constants/routes"
import errorHandler from "@/helpers/errorHandler"
import { useResetPasswordMutation } from "@/services/hooks/auth/useResetPasswordMutation"
import { SendOutlined } from "@ant-design/icons"
import { Form } from "antd"
import { useParams, useRouter } from "next/navigation"
import React, { useState } from "react"

const ResetPasswordPage: React.FC = () => {
  const { slug: token } = useParams<{ slug: string }>() ?? { slug: "" }
  const [form] = Form.useForm()
  const router = useRouter()

  const [message, setMessage] = useState<string>()

  const { mutateAsync: resetPassword, isPending } = useResetPasswordMutation()

  const { expires } = Object.fromEntries(
    new URLSearchParams(window.location.search)
  )

  const isExpired = new Date(Number(expires)).getTime() < new Date().getTime()

  const handleOnFinish = async () => {
    try {
      const { password } = await form.validateFields()

      const response = await resetPassword({ password, token })

      setMessage(response)
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <ConditionalComponent
      condition={!message && !isExpired}
      fallback={
        <CustomCard>
          <CustomResult
            status={isExpired ? "error" : "success"}
            title={isExpired ? "Token expirado" : "Operación exitosa"}
            subTitle={
              !isExpired
                ? message
                : "El token ha expirado. Debes solicitar uno nuevo."
            }
            extra={[
              <CustomButton
                type="primary"
                key="login"
                onClick={() => router.push(PATH_LOGIN, { scroll: true })}
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
          <CustomTitle level={3}>Cambiar Contraseña</CustomTitle>

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
                    label={"Nueva Contraseña"}
                    name={"password"}
                    rules={[{ required: true }]}
                  >
                    <CustomPasswordInput />
                  </CustomFormItem>
                </CustomCol>
                <CustomCol xs={24}>
                  <CustomFormItem
                    label={"Confirmar Contraseña"}
                    name={"password2"}
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error("Las contraseña no coinciden.")
                          )
                        },
                      }),
                    ]}
                  >
                    <CustomPasswordInput />
                  </CustomFormItem>
                </CustomCol>
                <CustomButton
                  block
                  size={"middle"}
                  type={"primary"}
                  icon={<SendOutlined />}
                  onClick={handleOnFinish}
                >
                  Recuperar Contraseña
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
