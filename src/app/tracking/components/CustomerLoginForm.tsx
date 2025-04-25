"use client"

import {
  CustomDivider,
  CustomCard,
  CustomForm,
  CustomRow,
  CustomCol,
  CustomFormItem,
  CustomInput,
  CustomPasswordInput,
  CustomButton,
  CustomParagraph,
  CustomSpin,
} from "@/components/custom"
import TextLogo from "@/components/TextLogo"
import { PATH_TRACKING } from "@/constants/routes"
import errorHandler from "@/helpers/errorHandler"
import { getGreeting } from "@/helpers/get-greeting"
import sleep from "@/helpers/sleep"
import { LoginPayload } from "@/interfaces/user"
import { useLoginCustomerMutation } from "@/services/hooks/customer/useLoginCustomerMutation"
import { formItemLayout } from "@/styles/breakpoints"
import { LoginOutlined } from "@ant-design/icons"
import { Form, message } from "antd"
import { useRouter } from "next/navigation"
import React from "react"
import styled from "styled-components"

const LoginLogoContainer = styled.div`
  margin: 10px 0 35px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
    object-fit: contain;
  }
`

const SubTitle = styled.h3`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 1.5rem;
  font-style: italic;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2em;
`

const CustomerLoginForm: React.FC = () => {
  const [form] = Form.useForm<LoginPayload>()
  const router = useRouter()

  const { mutateAsync: login, isPending: isLoginPending } =
    useLoginCustomerMutation()

  const handleOnFinish = async () => {
    try {
      const data = await form.validateFields()
      const response = await login(data)

      message.info(getGreeting(response.name))
      const next =
        new URLSearchParams(window.location.search).get("next") || PATH_TRACKING

      await sleep(500)
      if (typeof window !== "undefined") window.location.reload()
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <CustomSpin spinning={isLoginPending}>
      <Container>
        <CustomCard width={"23rem"}>
          <CustomForm layout="vertical" form={form} {...formItemLayout}>
            <CustomRow justify={"start"}>
              <CustomCol xs={24}>
                <LoginLogoContainer>
                  <TextLogo />
                </LoginLogoContainer>
              </CustomCol>
              <CustomDivider orientation={"center"}>
                <SubTitle>Acceso Clientes</SubTitle>
              </CustomDivider>
              <CustomCol span={24}>
                <CustomFormItem
                  label={"Usuario"}
                  name={"username"}
                  rules={[{ required: true }]}
                >
                  <CustomInput placeholder="Nombre de usuario" />
                </CustomFormItem>
              </CustomCol>

              <CustomCol span={24}>
                <CustomFormItem
                  label={"Contraseña"}
                  name={"password"}
                  rules={[{ required: true }]}
                >
                  <CustomPasswordInput />
                </CustomFormItem>
              </CustomCol>

              <CustomCol span={24}>
                <CustomButton
                  block
                  icon={<LoginOutlined />}
                  onClick={handleOnFinish}
                  type="primary"
                >
                  Iniciar sesión
                </CustomButton>
              </CustomCol>
            </CustomRow>
          </CustomForm>
        </CustomCard>

        <CustomCard width={"23rem"}>
          <CustomParagraph>
            <blockquote>
              Para consultar el estado de su reparación, inicie sesión con los
              datos que aparecen en el recibo entregado al momento de generar la
              orden.
            </blockquote>
          </CustomParagraph>
        </CustomCard>
      </Container>
    </CustomSpin>
  )
}

export default CustomerLoginForm
