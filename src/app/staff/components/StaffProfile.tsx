import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomAvatar,
  CustomButton,
  CustomCard,
  CustomCol,
  CustomCollapse,
  CustomDescriptions,
  CustomDrawer,
  CustomRow,
  CustomSpace,
  CustomTag,
  CustomText,
  CustomTooltip,
} from "@/components/custom"
import { states } from "@/constants/general"
import { logDate } from "@/helpers/date-helpers"
import formatter from "@/helpers/formatter"
import useUserStore from "@/stores/userStore"
import { EditOutlined, UploadOutlined } from "@ant-design/icons"
import { CollapseProps, DescriptionsProps, Form } from "antd"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { getSessionInfo } from "@/lib/session"
import useDrawerStore from "@/stores/drawerStore"
import { Roles, User } from "@/interfaces/user"

const AvatarContainer = styled(CustomCard)`
  height: 150px;
  min-height: 150px;
  width: 100% !important;
  background-color: ${({ theme }) => theme.baseBgColor} !important;
  background-image: url("https://images.unsplash.com/photo-1654599879153-61eb2d785fb7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;

  .button-container {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
  }
`

const StaffProfile: React.FC = () => {
  const [form] = Form.useForm()
  const file = Form.useWatch("AVATAR_FILE", form)
  const [fileExtension, setFileExtension] = useState("")
  const [changePasswordModal, setChangePasswordModal] = useState(false)
  const [showChangeProfileOptions, setShowChangeProfileOptions] =
    useState(false)
  const { user, setUser } = useUserStore()
  const { open, setOpenDrawer } = useDrawerStore()

  const handleModalState = () => {
    setShowChangeProfileOptions(!showChangeProfileOptions)
  }

  const isMyProfile = getSessionInfo().user_id === user.user_id

  const personalInfoItems: DescriptionsProps["items"] = [
    {
      key: "CREATED_AT",
      label: "Fecha de registro",
      children: logDate(user.created_at),
      span: 2,
    },
    {
      key: "user_id",
      label: "Código",
      children: user.user_id,
    },
    {
      key: "STATE",
      label: "Estado",
      children: (
        <CustomTag color={states[user.state]?.color}>
          {states[user.state]?.label}
        </CustomTag>
      ),
    },
    {
      key: "username",
      label: "Usuario",
      children: `@${user.username}`,
    },
    {
      key: "IDENTITY_DOCUMENT",
      label: "Doc. Identidad",
      children: formatter({
        value: user.identity_document,
        format: "document",
      }),
    },
    {
      key: "PASSWORD",
      label: isMyProfile ? "Contraseña" : "",
      children: (
        <ConditionalComponent condition={isMyProfile} fallback={" "}>
          <CustomSpace direction={"horizontal"} size={2}>
            <span>**********</span>
            <CustomTooltip title={"Cambiar contraseña"} placement={"right"}>
              <CustomButton
                type={"link"}
                icon={<EditOutlined />}
                onClick={() => setChangePasswordModal(true)}
              />
            </CustomTooltip>
          </CustomSpace>
        </ConditionalComponent>
      ),
    },
    {
      key: "EMAIL",
      label: "Correo electrónico",
      children: user.email,
    },
    {
      key: "FIRST_NAME",
      label: "Nombre",
      children: user.name,
    },
    {
      key: "LAST_NAME",
      label: "Apellido",
      children: user.last_name,
    },
    {
      key: "PHONE",
      label: "Teléfono",
      children: formatter({
        value: user.phone?.replace(/\D/g, ""),
        format: "phone",
      }),
    },
    {
      key: "BIRTHDAY",
      label: "Fecha de nacimiento",
      children: logDate(user.birth_date as string),
    },
    {
      key: "GENDER",
      label: "Género",
      children: user.gender === "M" ? "Masculino" : "Femenino",
    },
    {
      key: "ADDRESS",
      label: "Dirección",
      children: user.address,
      span: 2,
    },
    {
      key: "ROLES",
      label: "Rol",
      children: (
        <CustomSpace direction="horizontal" wrap>
          {(user.roles as Roles[])?.map((role) => (
            <CustomTag key={role.role_id}>{role.name}</CustomTag>
          ))}
        </CustomSpace>
      ),
    },
  ]

  const items: CollapseProps["items"] = [
    {
      key: 1,
      label: <CustomText strong>Información personal</CustomText>,
      children: <CustomDescriptions column={2} items={personalInfoItems} />,
    },
  ]

  return (
    <>
      <CustomDrawer
        closable={false}
        placement={"right"}
        width={"50%"}
        open={open}
        onClose={() => {
          setUser({} as never)
          setOpenDrawer(false)
        }}
      >
        <CustomRow width={"100%"} gap={10}>
          <AvatarContainer>
            <CustomRow gap={10} justify={"start"} align={"middle"}>
              <CustomAvatar
                shape={"square"}
                shadow
                size={100}
                src={user?.avatar}
              >
                {user?.avatar}
              </CustomAvatar>
              <CustomSpace width={"max-content"} size={2}>
                <CustomText strong>
                  {user?.name} {user?.last_name}
                </CustomText>
                <CustomText type={"secondary"}>@{user?.username}</CustomText>
              </CustomSpace>
            </CustomRow>
            <ConditionalComponent condition={isMyProfile}>
              <CustomTooltip
                title={"Cambiar foto de perfil"}
                placement={"left"}
              >
                <div className={"button-container"}>
                  <CustomButton
                    size={"middle"}
                    icon={<UploadOutlined />}
                    onClick={handleModalState}
                  />
                </div>
              </CustomTooltip>
            </ConditionalComponent>
          </AvatarContainer>
          <CustomCol xs={24}>
            <CustomCollapse
              collapsible={"disabled"}
              defaultActiveKey={[1, 2, 3]}
              items={items}
            />
          </CustomCol>
        </CustomRow>
      </CustomDrawer>
    </>
  )
}

export default StaffProfile
