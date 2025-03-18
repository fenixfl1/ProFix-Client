import {
  CustomCol,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomRow,
  CustomSelect,
} from "@/components/custom"
import { RepairOrder } from "@/interfaces/repair"
import {
  defaultBreakpoints,
  formItemLayout,
  labelColFullWidth,
} from "@/styles/breakpoints"
import { Form } from "antd"
import React, { useEffect } from "react"

const options = [
  {
    label: "Pendiente",
    value: "P",
  },
  {
    label: "Iniciado",
    value: "I",
  },
  {
    label: "Resuelto",
    value: "R",
  },
  {
    label: "No Iniciado",
    value: "N",
  },
]

interface RepairFormProps {
  open: boolean
  onCancel: () => void
  data: RepairOrder | undefined
}

const RepairForm: React.FC<RepairFormProps> = ({ open, onCancel, data }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, previous_status: data.status })
    }
  }, [data])

  return (
    <CustomModal open={open} onCancel={onCancel} width={"45%"}>
      <CustomForm form={form} {...formItemLayout}>
        <CustomRow>
          <CustomCol {...defaultBreakpoints}>
            <CustomFormItem
              label={"No. Orden"}
              name={"repair_order_id"}
              rules={[{ required: true }]}
            >
              <CustomInput
                width={"50%"}
                readOnly
                variant={"filled"}
                placeholder={"No. Orden"}
              />
            </CustomFormItem>
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
                  variant={"filled"}
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
                options={options}
                placeholder={"Estado Actual"}
                variant={"filled"}
              />
            </CustomFormItem>
          </CustomCol>
          <CustomCol xs={24}>
            <CustomFormItem
              label={"Piezas utilizadas"}
              name={"used_products"}
              tooltip={
                "Seleccione las piezas que ha utilizado para realizar la reparación"
              }
              {...labelColFullWidth}
            >
              <CustomSelect
                variant={"filled"}
                mode={"multiple"}
                placeholder={"Seleccionar las piezas utilizadas"}
              />
            </CustomFormItem>
          </CustomCol>
        </CustomRow>
      </CustomForm>
    </CustomModal>
  )
}

export default RepairForm
