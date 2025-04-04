"use client"

import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomAlert,
  CustomButton,
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

const Layout = styled(CustomLayout)`
  background-image: url("/assets/login_logo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
`

const LoginLogoContainer = styled.div`
  margin: 10px 0;
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
      <CustomRow justify={"center"}>
        <CustomCol xs={16}>
          <CustomRow justify={"center"}>
            <img
              style={{
                opacity: 0.9,
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
              width={"95%"}
              src="/assets/login_logo.png"
              alt="Logo"
            />
          </CustomRow>
        </CustomCol>
        <CustomCol xs={8}>
          <LoginContainer>
            <CustomRow justify={"center"} align={"middle"} height={"100vh"}>
              <CustomCol xs={16}>
                <CustomForm layout="vertical" form={form} {...formItemLayout}>
                  <CustomRow
                    justify={"start"}
                    height={"50%"}
                    style={{ maxHeight: "50%", overflow: "hidden" }}
                  >
                    <CustomCol xs={24}>
                      <LoginLogoContainer>
                        <TextLogo />
                        {/* <img width={"100%"} src={"/assets/logo_3.png"} /> */}
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
                      <CustomRow justify={"start"}>
                        <CustomFormItem
                          name={"remember"}
                          valuePropName="checked"
                        >
                          <CustomCheckbox>Recordarme</CustomCheckbox>
                        </CustomFormItem>

                        <ConditionalComponent condition={false}>
                          <CustomFormItem>
                            <CustomButton type={"link"}>
                              Olvide mi contraseña
                            </CustomButton>
                          </CustomFormItem>
                        </ConditionalComponent>
                      </CustomRow>
                    </CustomCol>

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
              </CustomCol>
            </CustomRow>
          </LoginContainer>
        </CustomCol>
      </CustomRow>
    </Layout>
  )
}

export default LoginForm
