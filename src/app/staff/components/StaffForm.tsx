import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomButton,
  CustomCol,
  CustomDatePicker,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomMaskedInput,
  CustomModal,
  CustomRadioGroup,
  CustomRow,
  CustomSelect,
  CustomSpin,
  CustomTextArea,
  CustomUpload,
} from "@/components/custom"
import CustomInputGroup from "@/components/custom/CustomInputGroup"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import errorHandler from "@/helpers/errorHandler"
import {
  normalizeFiles,
  normalizeMaskedInput,
} from "@/helpers/form-item-normalizers"
import { User } from "@/interfaces/user"
import { useGetAllRolesQuery } from "@/services/hooks/roles/useGetAllRolesQuery"
import { useCreateStaffMutation } from "@/services/hooks/staff/useCreateStaffMutation"
import { useUpdateStaffMutation } from "@/services/hooks/staff/useUpdateStaffMutation"
import useUserStore from "@/stores/userStore"
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from "@/styles/breakpoints"
import { SaveOutlined, StopOutlined } from "@ant-design/icons"
import { Form, FormInstance, notification } from "antd"
import dayjs from "dayjs"
import moment from "moment"
import React, { useEffect } from "react"

const maskType = {
  C: "cedula",
  P: "pasaporte",
}

interface StaffFormProps {
  form: FormInstance<User>
  open: boolean
  onCancel: () => void
}

const StaffForm: React.FC<StaffFormProps> = ({ form, open, onCancel }) => {
  const [api, contextHolder] = notification.useNotification()
  const typeDocument = Form.useWatch("document_type", form)
  const { user, setUser } = useUserStore()

  const { mutateAsync: createStaff, isPending: isCreatePending } =
    useCreateStaffMutation()
  const { mutateAsync: updateStaff, isPending: isUpdatePending } =
    useUpdateStaffMutation()
  const { data: roles = [] } = useGetAllRolesQuery()

  const isEditing = !!user.user_id

  useEffect(() => {
    if (user?.user_id) {
      form.setFieldsValue({
        ...user,
        birth_date: user.birth_date ? dayjs(user.birth_date) : undefined,
      })
    } else {
      form.resetFields()
    }
  }, [user])

  const handleOnCancel = () => {
    CustomModalConfirmation({
      title: "Confirmar",
      content: "¿Desea cancelar la operación?",
      onOk: () => {
        setUser({} as User)
        form.resetFields()
        onCancel()
      },
    })
  }

  const handleOnSave = async () => {
    try {
      const data = await form.validateFields()

      data.password = "1234"

      await createStaff(data)

      api.success({
        message: "Operación exitosa",
        description: "Usuario creado exitosamente.",
        duration: 5,
      })

      onCancel()
      form.resetFields()
    } catch (error) {
      errorHandler(error)
    }
  }

  const handleOnUpdate = async () => {
    try {
      const data = await form.validateFields()

      await updateStaff(data)

      api.success({
        message: "Operación exitosa",
        description: "Usuario actualizado exitosamente.",
        duration: 5,
      })

      onCancel()
      form.resetFields()
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <>
      {contextHolder}
      <CustomModal
        width={"60%"}
        open={open}
        onCancel={handleOnCancel}
        title={isEditing ? "Actualizar Usuario" : "Nuevo Usuario"}
        footer={null}
      >
        <CustomSpin spinning={isCreatePending || isUpdatePending}>
          <CustomForm form={form} {...formItemLayout}>
            <CustomRow justify={"start"}>
              <CustomCol {...defaultBreakpoints} />
              <ConditionalComponent condition={!!user.user_id}>
                <CustomCol {...defaultBreakpoints}>
                  <CustomFormItem label={"Código"} name={"user_id"}>
                    <CustomInput disabled placeholder={"Código de empleado"} />
                  </CustomFormItem>
                </CustomCol>
              </ConditionalComponent>
              <CustomCol xs={24}>
                <CustomFormItem
                  {...labelColFullWidth}
                  label={"Doc. Identidad"}
                  rules={[{ required: true }]}
                  required
                >
                  <CustomInputGroup>
                    <CustomFormItem
                      noStyle
                      name={"document_type"}
                      label={"Tipo de documento"}
                      initialValue={"C"}
                      rules={[{ required: true }]}
                    >
                      <CustomSelect
                        disabled={isEditing}
                        width={"20%"}
                        placeholder={"Tipo de documento"}
                        options={[
                          { label: "Cédula", value: "C" },
                          { label: "Pasaporte", value: "P" },
                        ]}
                      />
                    </CustomFormItem>
                    <CustomFormItem
                      noStyle
                      name={"identity_document"}
                      label={"Número de documento"}
                      hasFeedback
                      rules={[{ required: true, len: 11 }]}
                      getValueFromEvent={
                        typeDocument === "C" ? normalizeMaskedInput : undefined
                      }
                    >
                      <CustomMaskedInput
                        disabled={isEditing}
                        type={maskType[typeDocument as never] || "cedula"}
                        width={"80%"}
                        placeholder={"Documento de identidad"}
                      />
                    </CustomFormItem>
                  </CustomInputGroup>
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={"Nombres"}
                  name={"name"}
                  rules={[{ required: true }]}
                >
                  <CustomInput placeholder={"Nombres"} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={"Apellidos"}
                  name={"last_name"}
                  rules={[{ required: true }]}
                >
                  <CustomInput placeholder={"Apellidos"} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={"Correo"}
                  name={"email"}
                  rules={[{ required: true, type: "email" }]}
                >
                  <CustomInput placeholder={"Correo electrónico"} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  onlyNumber
                  label={"Teléfono"}
                  name={"phone"}
                  getValueFromEvent={normalizeMaskedInput}
                  rules={[{ required: true, len: 10 }]}
                >
                  <CustomMaskedInput
                    type={"telefono"}
                    placeholder={"Número de teléfono"}
                  />
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  onlyString
                  label={"Usuario"}
                  name={"username"}
                  // validateStatus={validateStatus}
                  hasFeedback
                  rules={[{ required: true }]}
                >
                  <CustomInput
                    disabled={isEditing}
                    prefix={"@"}
                    placeholder={"Nombre de usuario"}
                    // onBlur={handleCheckUsername}
                  />
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={"Rol"}
                  name="role_id"
                  rules={[{ required: true }]}
                >
                  <CustomSelect
                    placeholder={"Seleccionar Rol"}
                    options={roles.map((rol) => ({
                      label: rol.name,
                      value: rol.role_id,
                    }))}
                  />
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  onlyString
                  label={"Género"}
                  name={"gender"}
                  rules={[{ required: true }]}
                >
                  <CustomRadioGroup
                    options={[
                      { label: "Masculino", value: "M" },
                      { label: "Femenino", value: "F" },
                    ]}
                  />
                </CustomFormItem>
              </CustomCol>
              <CustomCol {...defaultBreakpoints}>
                <CustomFormItem
                  label={"Fecha Nacimiento"}
                  name={"birth_date"}
                  rules={[{ required: true }]}
                >
                  <CustomDatePicker maxDate={dayjs().subtract(15, "year")} />
                </CustomFormItem>
              </CustomCol>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={"Dirección"}
                  name={"address"}
                  {...labelColFullWidth}
                >
                  <CustomTextArea placeholder={"Dirección"} />
                </CustomFormItem>
              </CustomCol>
            </CustomRow>
          </CustomForm>
          <CustomDivider />
          <CustomRow justify={"space-between"} width={"100%"}>
            <CustomButton onClick={handleOnCancel} icon={<StopOutlined />}>
              Cancelar
            </CustomButton>
            <ConditionalComponent
              condition={!isEditing}
              fallback={
                <CustomButton
                  onClick={handleOnUpdate}
                  type={"primary"}
                  icon={<SaveOutlined />}
                >
                  Actualizar
                </CustomButton>
              }
            >
              <CustomButton
                onClick={handleOnSave}
                type={"primary"}
                icon={<SaveOutlined />}
              >
                Guardar
              </CustomButton>
            </ConditionalComponent>
          </CustomRow>
        </CustomSpin>
      </CustomModal>
    </>
  )
}

export default StaffForm
