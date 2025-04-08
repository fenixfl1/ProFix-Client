import React, { useCallback, useEffect, useState } from "react"
import { Form, FormInstance } from "antd"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import styled from "styled-components"
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
import { CustomModalConfirmation } from "@/components/custom/CustomModalMethods"
import { customNotification } from "@/components/custom/customNotification"
import CustomSpaceCompact from "@/components/custom/CustomSpaceCompact"
import errorHandler from "@/helpers/errorHandler"
import useDebounce from "@/hooks/useDebounce"
import { useGetCustomerMutation } from "@/services/hooks/customer/useGetCustomersMutation"
import { useCreateRepairOrderMutation } from "@/services/hooks/repairs/useCreateRepairOrderMutation"
import { useGetBrandQuery } from "@/services/hooks/repairs/useGetBrandsQuery"
import { useCustomerStore } from "@/stores/customer.store"
import dayjs from "dayjs"
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from "@/styles/breakpoints"
import { generateReceiptsPdf } from "@/helpers/report-helpers"

const DeviceContainer = styled.div`
  display: flex;
  row-gap: 16;
  flex-direction: column;
  width: 100%;
`

interface RepairFormProps {
  form: FormInstance
  open: boolean
  onCancel: () => void
  onFinish: () => void
}

const RepairOrderForm: React.FC<RepairFormProps> = ({
  form,
  open,
  onCancel,
  onFinish,
}) => {
  const [customerForm] = Form.useForm()
  const devices = Form.useWatch<Record<string, unknown>[]>("devices", form)
  const [activeKey, setActiveKey] = useState<number>(0)
  const [customerModalState, setCustomerModalState] = useState(false)
  const [searchKey, setSearchKey] = useState<string>("")
  const debounce = useDebounce(searchKey)

  const { customers, customer } = useCustomerStore()

  const { data: brands } = useGetBrandQuery()
  const { mutate: getCustomers, isPending: isGetCustomerPending } =
    useGetCustomerMutation()
  const { mutateAsync: createRepairOrder, isPending: isCreateOrderPending } =
    useCreateRepairOrderMutation()

  const handleSearchCustomer = useCallback(() => {
    if (customerModalState) return

    getCustomers({
      page: 1,
      size: 50,
      condition: [
        {
          value: "A",
          field: "state",
          operator: "=",
        },
        {
          value: debounce,
          field: "filter",
          operator: "LIKE",
        },
      ],
    })
  }, [debounce, customerModalState])

  useEffect(handleSearchCustomer, [handleSearchCustomer])

  useEffect(() => {
    return () => {
      form.resetFields()
    }
  }, [])

  useEffect(() => {
    if (customer?.customer_id) {
      form.setFieldValue("customer_id", customer.customer_id)
    }
  }, [customer])

  const handleOnCreate = async () => {
    try {
      const data = await form.validateFields()

      const response = await createRepairOrder(data)

      customNotification({
        message: "Operación exitosa",
        description: "La oren de reparación ha sido registrada con éxito.",
        type: "success",
      })

      await generateReceiptsPdf(response)

      form.resetFields()
      onFinish()
    } catch (error) {
      errorHandler(error)
    }
  }

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
        onCancel={handleOnCancel}
        onOk={handleOnCreate}
        open={open}
        title={"Orden de reparación"}
        width={"50%"}
      >
        <CustomSpin spinning={isGetCustomerPending || isCreateOrderPending}>
          <CustomForm form={form} initialValues={{}} {...formItemLayout}>
            <CustomRow justify={"end"}>
              <CustomCol xs={16}>
                <CustomFormItem
                  label={"Cliente"}
                  rules={[{ required: true }]}
                  labelCol={{ xs: 6 }}
                >
                  <CustomSpaceCompact style={{ width: "100%" }}>
                    <CustomFormItem
                      label={"Nombre del Cliente"}
                      name={"customer_id"}
                      rules={[{ required: true }]}
                      noStyle
                    >
                      <CustomSelect
                        onSearch={setSearchKey}
                        placeholder="Nombre, telefono, correo o Doc. Identidad"
                        options={customers.map((item) => ({
                          label: item.name,
                          value: item.customer_id,
                        }))}
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
              <CustomCol xs={8} />
              <CustomFormList name={"devices"}>
                {(fields, { add, remove }) => (
                  <DeviceContainer>
                    <CustomCol xs={24}>
                      <CustomCollapse
                        accordion
                        size={"middle"}
                        onChange={(keys: any) => setActiveKey(keys)}
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
                                    onlyNumber
                                    label={"Imei"}
                                    name={[field.name, "imei"]}
                                    rules={[{ required: true, len: 15 }]}
                                  >
                                    <CustomInput
                                      minLength={15}
                                      maxLength={15}
                                      placeholder={"000000000000000"}
                                    />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomCol {...defaultBreakpoints} />
                                <CustomCol {...defaultBreakpoints}>
                                  <CustomFormItem
                                    label={"Marca"}
                                    name={[field.name, "brand_id"]}
                                    rules={[{ required: true }]}
                                  >
                                    <CustomSelect
                                      placeholder={"Seleccionar marca"}
                                      options={brands?.map((brand) => ({
                                        label: brand.name,
                                        value: brand.brand_id,
                                      }))}
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
                                    label={"color"}
                                    name={[field.name, "color"]}
                                  >
                                    <CustomInput placeholder={"Color"} />
                                  </CustomFormItem>
                                </CustomCol>
                                <CustomCol xs={24}>
                                  <CustomFormItem
                                    label={"Condición"}
                                    name={[field.name, "physical_condition"]}
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
                                    name={[field.name, "reported_issue"]}
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
                                    name={[field.name, "diagnosis"]}
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
                                    name={[field.name, "estimated_cost"]}
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
                                    name={[field.name, "advanced_payment"]}
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
                                    name={[field.name, "delivery_date"]}
                                    rules={[{ required: false }]}
                                  >
                                    <CustomDatePicker
                                      minDate={dayjs()}
                                      width={"85%"}
                                    />
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
                      onClick={() => {
                        try {
                          setActiveKey(devices?.length)
                          add({})
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

            {/* <Form.Item noStyle shouldUpdate>
              {() => (
                <pre>
                  <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                </pre>
              )}
            </Form.Item> */}
          </CustomForm>
        </CustomSpin>
      </CustomModal>

      <ConditionalComponent condition={customerModalState}>
        <CustomerForm
          form={customerForm}
          open={customerModalState}
          onCancel={() => setCustomerModalState(false)}
        />
      </ConditionalComponent>
    </>
  )
}

export default RepairOrderForm
