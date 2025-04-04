import ConditionalComponent from "@/components/ConditionalComponent"
import {
  CustomButton,
  CustomCol,
  CustomDivider,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomInputNumber,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomSpace,
  CustomSpin,
  CustomTextArea,
  CustomTitle,
} from "@/components/custom"
import { RepairOrder, RepairOrderHistory } from "@/interfaces/repair"
import { useChangeOrderStateMutation } from "@/services/hooks/repairs/useChangeOrderStateMutation"
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from "@/styles/breakpoints"
import { Form } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import errorHandler from "@/helpers/errorHandler"
import { customNotification } from "@/components/custom/customNotification"
import CustomFormList from "@/components/custom/CustomFormList"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useGetProductsMutation } from "@/services/hooks/inventory/useGetProductsMutation"
import useDebounce from "@/hooks/useDebounce"
import { useInventoryStore } from "@/stores/inventory.store"
import { Product } from "../../../interfaces/inventory"

const options = [
  {
    label: "Pendiente",
    value: "P",
  },
  {
    label: "En proceso",
    value: "I",
  },
  {
    label: "Resuelto",
    value: "R",
  },
  {
    label: "No Resuelto",
    value: "N",
  },
]
// "NO" | "NR" | "UR" | "UP"
const productCondition = {
  NO: "Original - Nuevo",
  NR: "Original - Usado",
  UR: "Replica - Usada",
  UP: "Replica - Usada",
}

interface RepairFormProps {
  open: boolean
  onCancel: () => void
  data: RepairOrder | undefined
}

const RepairForm: React.FC<RepairFormProps> = ({ open, onCancel, data }) => {
  const [form] = Form.useForm<RepairOrderHistory>()
  const newStatus = Form.useWatch("new_status", form)

  const [searchKey, setSearchKey] = useState("")
  const debounce = useDebounce(searchKey)

  const { mutateAsync: changeState, isPending: isChangeStatePending } =
    useChangeOrderStateMutation()
  const { mutate: getProducts } = useGetProductsMutation()

  const { products } = useInventoryStore()

  const handleGetProducts = useCallback(() => {
    getProducts({
      page: 1,
      size: 15,
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
  }, [debounce])

  useEffect(handleGetProducts, [handleGetProducts])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, previous_status: data.status })
    }
  }, [data])

  const handleOnFinish = async () => {
    try {
      const data = await form.validateFields()

      await changeState(data)
      onCancel()
      customNotification({
        description: "Orden de reparación actualizada correctamente",
        message: "Operación exitosa",
        type: "success",
      })
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <CustomModal
      title={`Orden de reparación No. ${data?.repair_order_id} - ${data?.diagnosis}`}
      open={open}
      onCancel={onCancel}
      onOk={handleOnFinish}
      width={"45%"}
    >
      <CustomSpin spinning={isChangeStatePending}>
        <CustomForm form={form} {...formItemLayout}>
          <CustomRow>
            <CustomCol {...defaultBreakpoints}>
              <div style={{ pointerEvents: "none" }}>
                <CustomFormItem
                  label={"No. Orden"}
                  name={"repair_order_id"}
                  rules={[{ required: true }]}
                >
                  <CustomInput
                    width={"50%"}
                    readOnly
                    placeholder={"No. Orden"}
                  />
                </CustomFormItem>
              </div>
            </CustomCol>
            <CustomCol {...defaultBreakpoints} />
            <CustomCol {...defaultBreakpoints}>
              <div style={{ pointerEvents: "none" }}>
                <CustomFormItem
                  label={"Estado Actual"}
                  name={"previous_status"}
                  rules={[{ required: true }]}
                >
                  <CustomSelect
                    placeholder={"Estado Actual"}
                    options={options}
                  />
                </CustomFormItem>
              </div>
            </CustomCol>
            <CustomCol {...defaultBreakpoints}>
              <CustomFormItem
                label={"Nuevo estado"}
                name={"new_status"}
                rules={[{ required: true }]}
              >
                <CustomSelect
                  allowClear
                  options={options.filter(
                    (option) =>
                      option.value !== form.getFieldValue("previous_status")
                  )}
                  placeholder={"Estado Actual"}
                />
              </CustomFormItem>
            </CustomCol>
            <CustomCol xs={24}>
              <CustomFormItem
                label={"Comentario"}
                name={"comment"}
                {...labelColFullWidth}
              >
                <CustomTextArea maxLength={250} />
              </CustomFormItem>
            </CustomCol>
            <CustomDivider>
              <CustomTitle level={4}>Lista de piezas utilizadas</CustomTitle>
            </CustomDivider>
            <CustomCol xs={24}>
              <CustomFormItem label={" "} colon={false} {...labelColFullWidth}>
                <CustomFormList name={"used_products"}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name }) => (
                        <CustomSpace
                          direction={"horizontal"}
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align={"baseline"}
                          width={"100%"}
                        >
                          <CustomFormItem
                            name={[name, "product_id"]}
                            rules={[{ required: true }]}
                          >
                            <CustomSelect
                              onSearch={setSearchKey}
                              style={{ minWidth: "200px" }}
                              placeholder={"Seleccionar producto"}
                              options={products.map((item) => ({
                                label: `${item.name} - ${item.model} (${productCondition[item.condition]})`,
                                value: item.product_detail_id,
                              }))}
                            />
                          </CustomFormItem>
                          <CustomFormItem
                            name={[name, "quantity"]}
                            rules={[{ required: true }]}
                          >
                            <CustomInputNumber
                              min={1}
                              placeholder={"Cantidad"}
                              formatter={(value) => `${value}`}
                              parser={(value) =>
                                value?.replace("", "") as unknown as number
                              }
                            />
                          </CustomFormItem>

                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </CustomSpace>
                      ))}
                      <CustomFormItem>
                        <CustomButton
                          type={"dashed"}
                          onClick={() => add({ quantity: 1 })}
                          block
                          icon={<PlusOutlined />}
                        >
                          Añadir pieza
                        </CustomButton>
                      </CustomFormItem>
                    </>
                  )}
                </CustomFormList>
              </CustomFormItem>
            </CustomCol>

            {/* <Form.Item noStyle shouldUpdate>
              {() => (
                <p>
                  <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                </p>
              )}
            </Form.Item> */}
          </CustomRow>
        </CustomForm>
      </CustomSpin>
    </CustomModal>
  )
}

export default RepairForm
