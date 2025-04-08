"use client"

import React, { useEffect, useState, useTransition } from "react"
import styled from "styled-components"
import Darkreader from "react-darkreader-2"

import {
  getDarkMode,
  getSessionInfo,
  isLoggedIn,
  removeSession,
  setDarkMode,
} from "@/lib/session"
import { PATH_HOME } from "@/constants/routes"
import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  SearchOutlined,
  ToolFilled,
  UserOutlined,
} from "@ant-design/icons"
import { truncateText } from "@/helpers/truncateText"
import { ItemType } from "antd/lib/menu/interface"
import { MenuOption } from "@/interfaces/user"
import getSelectedOption from "@/helpers/getSelectedOption"
import { useRouter } from "next/navigation"
import useIsAuthorized from "@/hooks/useIsAuthorized"
import { GenericParameters } from "@/interfaces/parameters"
import { assert } from "@/helpers/assert"
import Link from "next/link"
import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomRow,
  CustomContent,
  CustomSider,
  CustomLayout,
  CustomAvatar,
  CustomCol,
  CustomSpace,
  CustomText,
  CustomMenu,
  CustomButton,
  CustomHeader,
  CustomSpin,
  CustomFloatButton,
  CustomTooltip,
} from "@/components/custom"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import MotionComponent from "@/components/MotionComponent"
import SVGReader from "@/components/SVGReader"
import { useGetStaffMenuOptionsQuery } from "@/services/hooks/staff/useGetStaffMenuOptionsQuery"
import { useGetUserInfoMutation } from "@/services/hooks/staff/useGetUserInfoMutation"
import useDrawerStore from "@/stores/drawerStore"
import StaffProfile from "./staff/components/StaffProfile"
import jsonParse from "@/helpers/jsonParse"
import useMenuOptionStore from "@/stores/menu-option.store"
import TextLogo from "@/components/TextLogo"
import sleep from "@/helpers/sleep"

const LogoContainer = styled.div`
  height: 75px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
`

const FloatButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 16px;
  z-index: 9999;
`

const IconContainer = styled.div`
  border-radius: 50%;
  padding: 16px;
  width: 5.8em;
  cursor: pointer;

  svg {
    font-size: 28px !important;
    margin: 10px;
  }

  :hover {
    background-color: #f0f0f0;
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
  }
`

const Logo = styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 50px;
  font-weight: 800;
  text-transform: uppercase;
  color: #ff5733;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 3px;
  background: linear-gradient(45deg, #ff5733, #ffcc33);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`

const HeaderContainer = styled(CustomRow)`
  height: 75px;
  min-height: 62px;
  width: 100%;
  gap: 16px;
`

const Content = styled(CustomContent)``

const Sider = styled(CustomSider)`
  height: 100vh !important;
  overflow: auto !important;
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
  background-color: #ffffff !important;
  border-right: 1px solid #f3f3f3 !important;
`

const UserContainer = styled.div`
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  width: 90%;
  margin: 25px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 8px;
  cursor: pointer;
`

const CustomContentContainer = styled.div`
  background: ${(props) => props.theme.colorBgContainer};
  border-radius: ${(props) => props.theme.borderRadius};
  margin: 0px 34px 10px 274px !important;
  padding: 10px;
  height: auto;
  box-shadow: ${({ theme }) => theme.boxShadow};

  @media screen and (min-width: 1430px) {
    max-width: 1090px;
    margin: 0px 34px 10px 460px !important;
  }

  @media screen and (max-width: 1800px) {
    margin: 0px 34px 10px 274px !important;
    max-width: 1377px;
  }
`

const ContentLayout = styled(CustomLayout)`
  margin-left: 240px !important;
  font-size: 100px !important;
  height: 100vh !important;
`

const LogoutContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const [isPending] = useTransition()

  const [isDarkMode, setIsDarkMode] = useState(getDarkMode())

  const { setOpenDrawer, open } = useDrawerStore()
  const { selectedItem, menuOptions, setSelectedMenuOption, setSelectedKey } =
    useMenuOptionStore()

  const { isPending: isGetStaffMenuOptionsPending } =
    useGetStaffMenuOptionsQuery(getSessionInfo().username)

  const { mutateAsync: getUserInfo, isPending: isGetUserInfoLoading } =
    useGetUserInfoMutation()

  useEffect(() => {
    if (document.location.href === PATH_HOME) {
      setSelectedKey(
        jsonParse<string[]>(sessionStorage.getItem("selectedKeys") as string)
      )
    }
  }, [])

  useEffect(() => {
    typeof isDarkMode === "boolean" && setDarkMode(isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    setIsDarkMode(getDarkMode())
  }, [])

  const handleLogout = () => {
    CustomModalConfirmation({
      title: "Cerrar Sesión",
      content: "¿Estás seguro que deseas cerrar sesión?",
      onOk: async () => {
        removeSession()
        window.location.reload()
      },
    })
  }

  const handleOnSelect = (item: MenuOption, keyPath: string[]) => {
    if (item.children?.length) return
    if (item.type !== "link" && item.path) {
      setSelectedKey(keyPath)
      router.push(item.path)
      sessionStorage.setItem("selectedKeys", JSON.stringify(keyPath))
      sessionStorage.setItem("selectedMenuOption", JSON.stringify(item))
    }
  }

  const renderMenuItems = (menu: MenuOption[] | undefined): ItemType[] => {
    if (!menu) return []

    return menu.map(({ icon, children, ...item }) => {
      return {
        key: item.menu_option_id,
        children: !!children?.length
          ? renderMenuItems(children as MenuOption[])
          : undefined,
        icon: <SVGReader svg={icon as string} />,
        type: item.type as any,
        onClick: ({ keyPath }) => handleOnSelect(item, keyPath),
        label: (
          <ConditionalComponent
            condition={item.type === "link"}
            fallback={item.name}
          >
            <Link href={item.path} passHref legacyBehavior>
              <a target={"_blank"}>{item.name}</a>
            </Link>
          </ConditionalComponent>
        ),
      }
    })
  }

  return (
    <ConditionalComponent
      condition={isLoggedIn()}
      fallback={
        <>
          {children}
          <FloatButton style={{ display: "none" }}>
            <Darkreader defaultDarken={isDarkMode} onChange={setIsDarkMode} />
          </FloatButton>
        </>
      }
    >
      <>
        <CustomLayout hasSider>
          <Sider theme={"light"} width={240}>
            <LogoContainer
              onClick={async () => {
                setSelectedKey([])
                setSelectedMenuOption({} as never)
                await sleep(500)
                router.push(PATH_HOME)
              }}
            >
              <TextLogo />
            </LogoContainer>
            <CustomRow>
              <UserContainer
                onClick={async () => {
                  await getUserInfo(getSessionInfo().username)

                  setOpenDrawer(true)
                }}
              >
                <CustomAvatar
                  icon={<UserOutlined />}
                  shape="circle"
                  size={36}
                  src={getSessionInfo().avatar}
                />
                <CustomCol xs={18}>
                  <CustomSpace size={1}>
                    <CustomText strong>
                      {truncateText(getSessionInfo().name, 20)}
                    </CustomText>
                    <CustomText type="secondary">
                      {getSessionInfo().roles?.[0]}
                    </CustomText>
                  </CustomSpace>
                </CustomCol>
              </UserContainer>
            </CustomRow>
            <CustomMenu
              theme={"light"}
              mode={"inline"}
              openKeys={selectedItem?.length > 1 ? selectedItem : undefined}
              selectedKeys={selectedItem}
              defaultOpenKeys={selectedItem}
              defaultSelectedKeys={selectedItem}
              items={renderMenuItems(menuOptions)}
            />

            <LogoutContainer>
              <CustomButton
                size={"large"}
                type={"text"}
                icon={<LogoutOutlined />}
                block
                onClick={handleLogout}
              >
                Cerrar Sesión
              </CustomButton>
            </LogoutContainer>
          </Sider>
          <ContentLayout>
            <CustomHeader
              style={{
                marginLeft: "240px",
                height: "75px",
              }}
            >
              <HeaderContainer justify={"space-between"} align={"middle"}>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: 24,
                  }}
                >
                  {getSelectedOption()?.description}
                </span>
                <CustomTooltip title="Notificaciones">
                  <IconContainer>
                    <BellOutlined />
                  </IconContainer>
                </CustomTooltip>
              </HeaderContainer>
            </CustomHeader>
            <Content>
              <CustomContentContainer>
                <MotionComponent key={isPending ? 1 : 0}>
                  <CustomSpin
                    spinning={
                      isGetStaffMenuOptionsPending || isGetUserInfoLoading
                    }
                  >
                    {children}
                  </CustomSpin>
                </MotionComponent>
              </CustomContentContainer>
              <FloatButton>
                <Darkreader
                  defaultDarken={isDarkMode}
                  onChange={setIsDarkMode}
                />
              </FloatButton>
            </Content>
          </ContentLayout>
        </CustomLayout>

        <ConditionalComponent condition={open}>
          <StaffProfile />
        </ConditionalComponent>
      </>
    </ConditionalComponent>
  )
}

export default Template
