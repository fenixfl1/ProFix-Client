"use client"

import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomAlert,
  CustomButton,
  CustomCard,
  CustomCheckbox,
  CustomCol,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomLayout,
  CustomPasswordInput,
  CustomRow,
} from "@/components/custom"
import TextLogo from "@/components/TextLogo"
import { PATH_REQUEST_RESET_PASSWORD } from "@/constants/routes"
import { formItemLayout } from "@/styles/breakpoints"
import { LoginOutlined } from "@ant-design/icons"
import { FormInstance } from "antd/lib"
import { NextPage } from "next"
import { useRouter } from "next/navigation"
import React from "react"
import styled from "styled-components"

const Layout = styled.div`
  background-image: url("/assets/login_logo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`

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

const Divider = styled(CustomDivider)`
  margin-top: 0;
  padding-top: 0;
`

const LoginContainer = styled.div`
  height: 100vh;
  padding: 0 20px;
  box-shadow: -10px 0 10px -5px rgba(0, 0, 0, 0.1);
`

interface LoginFormProps {
  onFinish?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  form: FormInstance
  message?: string
  onClose?: () => void
}

const LoginForm: NextPage<LoginFormProps> = ({
  onFinish,
  form,
  message,
  onClose,
}) => {
  const router = useRouter()

  return (
    <Layout>
      <CustomCard width={"25rem"}>
        <CustomForm layout="vertical" form={form} {...formItemLayout}>
          <CustomRow justify={"start"}>
            <CustomCol xs={24}>
              <LoginLogoContainer>
                <TextLogo />
              </LoginLogoContainer>
            </CustomCol>
            <ConditionalComponent condition={!!message}>
              <CustomCol span={24}>
                <CustomAlert
                  closable
                  description={message}
                  message={"Error"}
                  showIcon
                  type={"error"}
                  onClose={onClose}
                />
              </CustomCol>
            </ConditionalComponent>
            <Divider />
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

            <div style={{ margin: "50px 0" }} />

            <CustomCol span={24}>
              <CustomButton
                size={"middle"}
                block
                icon={<LoginOutlined />}
                onClick={onFinish}
                type="primary"
              >
                Iniciar sesión
              </CustomButton>
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomCard>

      <CustomCard width={"25rem"}>
        <CustomButton
          block
          type={"link"}
          onClick={() => router.push(PATH_REQUEST_RESET_PASSWORD)}
        >
          ¿Olvidaste tu contraseña?
        </CustomButton>
      </CustomCard>
    </Layout>
  )
}

export default LoginForm
