import CustomerForm from "@/app/customers/components/CustomerForm"
import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomButton,
  CustomCol,
  CustomCollapse,
  CustomDatePicker,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomInputNumber,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomSpin,
  CustomTextArea,
  CustomTitle,
  CustomTooltip,
} from "@/components/custom"
import CustomFormList from "@/components/custom/CustomFormList"
import CustomInputGroup from "@/components/custom/CustomInputGroup"
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import CustomSpaceCompact from "@/components/custom/CustomSpaceCompact"
import errorHandler from "@/helpers/errorHandler"
import useDebounce from "@/hooks/useDebounce"
import { Device } from "@/interfaces/customer"
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from "@/styles/breakpoints"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { Form, FormInstance } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"

const DeviceContainer = styled.div`
  display: flex;
  row-gap: 16;
  flex-direction: column;
  width: 100%;
`

const phoneBrands = [
  { label: "Apple", value: "apple" },
  { label: "Samsung", value: "samsung" },
  { label: "Google", value: "google" },
  { label: "Motorola", value: "motorola" },
  { label: "Xiaomi", value: "xiaomi" },
  { label: "OnePlus", value: "oneplus" },
  { label: "Nokia", value: "nokia" },
  { label: "Sony", value: "sony" },
  { label: "Huawei", value: "huawei" },
  { label: "Oppo", value: "oppo" },
  { label: "Vivo", value: "vivo" },
  { label: "Realme", value: "realme" },
  { label: "Asus", value: "asus" },
  { label: "Honor", value: "honor" },
  { label: "ZTE", value: "zte" },
  { label: "Alcatel", value: "alcatel" },
  { label: "BLU", value: "blu" },
  { label: "Lenovo", value: "lenovo" },
  { label: "TCL", value: "tcl" },
  { label: "Infinix", value: "infinix" },
  { label: "Tecno", value: "tecno" },
  { label: "Meizu", value: "meizu" },
]

interface RepairFormProps {
  form: FormInstance
  open: boolean
  onCancel: () => void
}

const RepairForm: React.FC<RepairFormProps> = ({ form, open, onCancel }) => {
  const devices = Form.useWatch<Record<string, unknown>[]>("devices", form)
  const [device, setDevice] = useState<{ key: number; type: React.Key }[]>()
  const [activeKey, setActiveKey] = useState<number>(0)
  const [customerModalState, setCustomerModalState] = useState(false)
  const [searchKey, setSearchKey] = useState<string>("")

  const debounce = useDebounce(searchKey)

  const handleSearchCustomer = useCallback(() => {}, [debounce])

  useEffect(handleSearchCustomer, [handleSearchCustomer])

  useEffect(() => {
    return () => {
      form.resetFields()
    }
  }, [])

  const handleOnCancel = () => {
    CustomModalConfirmation({
      title: "Confirmación",
      content: "¿Estás seguro de que deseas cancelar la reparación?",
      onOk: onCancel,
    })
  }
  return (
    <>
      <CustomModal
        title={"Reparación"}
        onCancel={handleOnCancel}
        open={open}
        width={"50%"}
      >
        <CustomSpin>
          <CustomForm
            form={form}
            initialValues={{ devices: [{}] }}
            {...formItemLayout}
          >
            <CustomRow justify={"end"}>
              <CustomCol xs={24}>
                <CustomFormItem
                  label={"Cliente"}
                  rules={[{ required: true }]}
                  {...labelColFullWidth}
                >
                  <CustomSpaceCompact style={{ width: "100%" }}>
                    <CustomFormItem
                      label={"Nombre del Cliente"}
                      name={"customer_id"}
                      rules={[{ required: true }]}
                      noStyle
                    >
                      <CustomSelect
                        options={[]}
                        onChange={setSearchKey}
                        placeholder="Nombre, telefono, correo o Doc. Identidad"
                      />
                    </CustomFormItem>
                    <CustomTooltip title={"Nuevo Cliente"} placement={"right"}>
                      <CustomButton
                        type={"primary"}
                        icon={<PlusOutlined />}
                        onClick={() => setCustomerModalState(true)}
                      />
                    </CustomTooltip>
                  </CustomSpaceCompact>
                </CustomFormItem>
              </CustomCol>
              <CustomFormList name={"devices"}>
                {(fields, { add, remove }) => (
                  <DeviceContainer>
                    <CustomCol xs={24}>
                      <CustomCollapse
                        accordion
                        size={"middle"}
                        activeKey={activeKey}
                        items={fields.map((field) => ({
                          key: field.key,
                          label: `Dispositivo No. ${field.key + 1}`,
                          children: (
                            <CustomCol xs={24}>
                              <CustomRow justify={"space-between"}>
                                <CustomDivider>
                                  <CustomTitle level={4}>
                                    Información del Dispositivo
                                  </CustomTitle>
                                </CustomDivider>
                                <CustomCol {...defaultBreakpoints}>
                                  <CustomFormItem
                                    label={"Marca"}
                                    name={[field.name, "brand"]}
                                    rules={[{ required: true }]}
                                  >
                                    <CustomSelect
                                      options={phoneBrands}
                                      placeholder={"Seleccionar marca"}
                                    />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomCol {...defaultBreakpoints}>
                                  <CustomFormItem
                                    label={"Modelo"}
                                    name={[field.name, "model"]}
                                    rules={[{ required: true }]}
                                  >
                                    <CustomInput placeholder={"Modelo"} />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomCol {...defaultBreakpoints}>
                                  <CustomFormItem
                                    onlyNumber
                                    label={"Imei"}
                                    name={"imei"}
                                    rules={[{ required: true, len: 15 }]}
                                  >
                                    <CustomInput
                                      placeholder={"000000000000000"}
                                    />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomCol {...defaultBreakpoints}>
                                  <CustomFormItem
                                    label={"color"}
                                    name={"color"}
                                  >
                                    <CustomInput placeholder={"Color"} />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomCol xs={24}>
                                  <CustomFormItem
                                    label={"Condición"}
                                    name={"physical_condition"}
                                    {...labelColFullWidth}
                                  >
                                    <CustomTextArea
                                      placeholder={"Condición física"}
                                    />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomDivider>
                                  <CustomTitle level={4}>
                                    Información de la Reparación
                                  </CustomTitle>
                                </CustomDivider>
                                <CustomCol xs={24}>
                                  <CustomFormItem
                                    label={"Problema"}
                                    name={"reported_issue"}
                                    rules={[{ required: true }]}
                                    {...labelColFullWidth}
                                  >
                                    <CustomTextArea
                                      rows={2}
                                      placeholder={"Descripción del problema"}
                                      autoSize={{ minRows: 2 }}
                                    />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomCol xs={24} style={{ marginTop: 5 }}>
                                  <CustomFormItem
                                    label={"Diagnostico"}
                                    name={"diagnosis"}
                                    rules={[{ required: true }]}
                                    {...labelColFullWidth}
                                  >
                                    <CustomTextArea
                                      rows={2}
                                      placeholder={"Diagnóstico"}
                                      autoSize={{ minRows: 2 }}
                                    />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomCol {...defaultBreakpoints}>
                                  <CustomFormItem
                                    label={"Costo Aprox."}
                                    name={"estimated_cost"}
                                    rules={[{ required: true }]}
                                  >
                                    <CustomInputNumber
                                      width={"85%"}
                                      format={{
                                        format: "currency",
                                        currency: "RD",
                                      }}
                                    />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomCol {...defaultBreakpoints}>
                                  <CustomFormItem
                                    label={"Adelanto"}
                                    name={"advanced_payment"}
                                    rules={[{ required: false }]}
                                  >
                                    <CustomInputNumber
                                      width={"85%"}
                                      format={{
                                        format: "currency",
                                        currency: "RD",
                                      }}
                                    />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomCol {...defaultBreakpoints}>
                                  <CustomFormItem
                                    label={"Fecha Entrega"}
                                    name={"delivery_date"}
                                    rules={[{ required: false }]}
                                  >
                                    <CustomDatePicker width={"85%"} />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomTooltip
                                  title={"Remover dispositivo"}
                                  placement={"right"}
                                >
                                  <CustomButton
                                    danger
                                    onClick={() => remove(field.key)}
                                    size={"large"}
                                    type={"link"}
                                    icon={<DeleteOutlined />}
                                  />
                                </CustomTooltip>
                              </CustomRow>
                            </CustomCol>
                          ),
                        }))}
                      />
                    </CustomCol>
                    <CustomDivider />
                    <CustomButton
                      type="dashed"
                      onClick={async () => {
                        try {
                          const index = devices.findIndex(
                            (item) => item.ORDEN === device?.length
                          )

                          if (index >= 0) {
                            // await form.validateFields()
                          }

                          setActiveKey(devices?.length)
                          add({
                            ORDEN: devices?.length + 1,
                            ATRIBUTOS: [{}],
                          })
                        } catch (error) {
                          errorHandler(error)
                        }
                      }}
                      block
                    >
                      Agregar dispositivo
                    </CustomButton>
                  </DeviceContainer>
                )}
              </CustomFormList>
            </CustomRow>
          </CustomForm>
        </CustomSpin>
      </CustomModal>

      <ConditionalComponent condition={customerModalState}>
        <CustomerForm
          form={form}
          open={customerModalState}
          onCancel={() => setCustomerModalState(false)}
        />
      </ConditionalComponent>
    </>
  )
}

export default RepairForm
