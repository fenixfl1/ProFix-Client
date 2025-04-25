"use client"

import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomAvatar,
  CustomButton,
  CustomCol,
  CustomContent,
  CustomHeader,
  CustomLayout,
  CustomRow,
  CustomSpace,
  CustomText,
} from "@/components/custom"
import TextLogo from "@/components/TextLogo"
import { getCustomerSession, getDarkMode } from "@/lib/session"
import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { useState } from "react"
import Darkreader from "react-darkreader-2"
import styled from "styled-components"
import CustomPopover from "../../components/custom/CustomPopover"
import { removeCustomerSession } from "../../lib/session"

const FloatButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 16px;
  z-index: 9999;
`

const CustomContentContainer = styled.div`
  background: ${(props) => props.theme.colorBgContainer};
  border-radius: ${(props) => props.theme.borderRadius};
  margin: auto !important;
  padding: 10px;
  height: 500px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  max-width: 1090px;
  overflow: hidden;
  min-height: 600px;

  @media screen and (min-width: 1430px) {
    margin: 0px 34px 10px 460px !important;
  }

  @media screen and (max-width: 1800px) {
    margin: auto !important;
  }
`

const Layout = styled(CustomLayout)`
  height: 100vh !important;
  border: 1px solid red !important;
`

const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getDarkMode())
  const { name } = getCustomerSession() ?? {}

  const userOptions = (
    <CustomSpace>
      <CustomButton
        type={"link"}
        icon={<LogoutOutlined />}
        block
        onClick={() => {
          removeCustomerSession()
          if (typeof window !== "undefined") window.location.reload()
        }}
      >
        Cerrar sesión
      </CustomButton>
    </CustomSpace>
  )

  return (
    <ConditionalComponent condition={!!name} fallback={children}>
      <Layout>
        <CustomHeader>
          <CustomRow justify={"space-between"} wrap={false}>
            <TextLogo />

            <CustomSpace direction={"horizontal"} width={"max-content"}>
              <CustomText>{name}</CustomText>
              <CustomPopover content={userOptions}>
                <CustomAvatar
                  size={46}
                  icon={<UserOutlined />}
                  style={{ cursor: "pointer" }}
                />
              </CustomPopover>
            </CustomSpace>
          </CustomRow>
        </CustomHeader>
        <CustomContent>
          <CustomContentContainer>{children}</CustomContentContainer>
        </CustomContent>

        <FloatButton>
          <Darkreader defaultDarken={isDarkMode} onChange={setIsDarkMode} />
        </FloatButton>
      </Layout>
    </ConditionalComponent>
  )
}

export default Template
