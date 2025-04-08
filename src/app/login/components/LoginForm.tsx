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
import { formItemLayout } from "@/styles/breakpoints"
import { LoginOutlined } from "@ant-design/icons"
import { FormInstance } from "antd/lib"
import { NextPage } from "next"
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

            <CustomCol span={24}>
              <CustomRow justify={"space-between"}>
                <CustomFormItem name={"remember"} valuePropName="checked">
                  <CustomCheckbox>Recordarme</CustomCheckbox>
                </CustomFormItem>

                <ConditionalComponent condition={false} fallback={<div />}>
                  <CustomFormItem>
                    <CustomButton type={"link"}>
                      Olvide mi contraseña
                    </CustomButton>
                  </CustomFormItem>
                </ConditionalComponent>
              </CustomRow>
            </CustomCol>

            <div style={{ margin: "35px 0" }} />

            <CustomCol span={24}>
              <CustomButton
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
    </Layout>
  )
}

export default LoginForm
