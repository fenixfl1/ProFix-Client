import {
  CustomCol,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomRow,
  CustomSpin,
  CustomTextArea,
  CustomTitle,
} from "@/components/custom"
import { Roles } from "@/interfaces/user"
import { defaultBreakpoints, formItemLayout } from "@/styles/breakpoints"
import { FormInstance, notification, TreeProps } from "antd"
import React, { useEffect, useState } from "react"
import { labelColFullWidth } from "../../../styles/breakpoints"
import { useGetAllMenuOptionsQuery } from "@/services/hooks/staff/useGetAllMenuOptionsQuery"
import CustomTree from "@/components/custom/CustomTree"
import errorHandler from "@/helpers/errorHandler"
import { useCreateRoleMutation } from "@/services/hooks/roles/useCreateRoleMutation"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import { getSessionInfo } from "@/lib/session"
import { customNotification } from "@/components/custom/customNotification"
import { useUpdateRoleMutation } from "@/services/hooks/roles/useUpdateRoleMutation"
import ConditionalComponent from "@/components/ConditionalComponent"
import { useRolesStore } from "@/stores/roles.store"

interface RolesFormProps {
  form: FormInstance<Roles>
  open: boolean
  onCancel: () => void
}

const RolesForm: React.FC<RolesFormProps> = ({ form, open, onCancel }) => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

  const { data: menuTree = [] } = useGetAllMenuOptionsQuery()
  const { mutateAsync: createRole, isPending: isCreatePending } =
    useCreateRoleMutation()
  const { mutateAsync: updateRole, isPending: isUpdatePending } =
    useUpdateRoleMutation()

  const { role } = useRolesStore()

  const isEditing = !!role?.role_id

  useEffect(() => {
    if (role?.role_id) {
      setSelectedKeys(role.menu_options as string[])
      setCheckedKeys(role.menu_options as string[])
      form.setFieldsValue({ ...role })
    }
  }, [role])

  const handleOnCancel = () => {
    CustomModalConfirmation({
      title: "Confirmación",
      content: "¿Desea cancelar la operación?",
      onOk: () => {
        form.resetFields()
        onCancel()
      },
    })
  }

  const handleOnCreate = async () => {
    try {
      const data = await form.validateFields()

      data.menu_options = checkedKeys as string[]
      data.created_by = getSessionInfo().user_id

      await createRole(data)

      customNotification({
        message: "Operación exitosa",
        description: "Rol almacenado exitosamente.",
        type: "success",
      })

      form.resetFields()
      onCancel()
    } catch (error) {
      errorHandler(error)
    }
  }

  const handleOnUpdate = async () => {
    try {
      const data = await form.validateFields()

      data.menu_options = checkedKeys as string[]

      const message = await updateRole({
        ...data,
        menu_options: checkedKeys as string[],
      })

      customNotification({
        message: "Operación exitosa",
        description: message,
        type: "success",
      })

      form.resetFields()
      onCancel()
    } catch (error) {
      errorHandler(error)
    }
  }

  const handleOnCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[])
  }

  const handelOnSelect: TreeProps["onSelect"] = (selectedKeysValue) => {
    setSelectedKeys(selectedKeysValue)
  }

  return (
    <CustomModal
      title={isEditing ? "Editar Rol" : "Nuevo Rol"}
      width={"40%"}
      open={open}
      onCancel={handleOnCancel}
      onOk={isEditing ? handleOnUpdate : handleOnCreate}
    >
      <CustomSpin spinning={isCreatePending || isUpdatePending}>
        <CustomForm form={form} {...formItemLayout}>
          <CustomRow justify={"end"}>
            <ConditionalComponent condition={!!role?.role_id}>
              <CustomCol xs={8}>
                <CustomFormItem
                  label={"Código"}
                  name={"role_id"}
                  rules={[{ required: true }]}
                >
                  <CustomInput readOnly />
                </CustomFormItem>
              </CustomCol>
            </ConditionalComponent>
            <CustomCol xs={24}>
              <CustomFormItem
                label={"Nombre"}
                name={"name"}
                rules={[{ required: true }]}
                {...labelColFullWidth}
              >
                <CustomInput maxLength={20} placeholder="Nombre" />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                name={"description"}
                label={"Descripción"}
                {...labelColFullWidth}
              >
                <CustomTextArea rows={4} placeholder="Descripción" />
              </CustomFormItem>
            </CustomCol>
            <CustomDivider>
              <CustomTitle level={4}>Accesos</CustomTitle>
            </CustomDivider>
            <CustomCol xs={24}>
              <CustomFormItem label={" "} colon={false} {...labelColFullWidth}>
                <CustomTree
                  checkedKeys={checkedKeys}
                  expandedKeys={menuTree
                    .filter((menu) => menu.children.length > 0)
                    .map((menu) => menu.key)}
                  onCheck={handleOnCheck}
                  onSelect={handelOnSelect}
                  selectedKeys={selectedKeys}
                  treeData={menuTree}
                />
              </CustomFormItem>
            </CustomCol>
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomModal>
  )
}

export default RolesForm
