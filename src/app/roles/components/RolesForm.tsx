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
import { formItemLayout } from "@/styles/breakpoints"
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

interface RolesFormProps {
  form: FormInstance<Roles & { menu_options: React.Key[] }>
  open: boolean
  onCancel: () => void
}

const RolesForm: React.FC<RolesFormProps> = ({ form, open, onCancel }) => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

  const { data: menuTree = [] } = useGetAllMenuOptionsQuery()
  const { mutateAsync: createRole } = useCreateRoleMutation()

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

  const handleOnFinish = async () => {
    try {
      const data = await form.validateFields()

      data.menu_options = checkedKeys
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

  const handleOnCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[])
  }

  const handelOnSelect: TreeProps["onSelect"] = (selectedKeysValue) => {
    setSelectedKeys(selectedKeysValue)
  }

  return (
    <CustomModal
      title="Nuevo Rol"
      width={"40%"}
      open={open}
      onCancel={handleOnCancel}
      onOk={handleOnFinish}
    >
      <CustomSpin>
        <CustomForm form={form} {...formItemLayout}>
          <CustomRow>
            <CustomCol xs={24}>
              <CustomFormItem
                label="Nombre"
                name="name"
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
