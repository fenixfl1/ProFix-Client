import {
  CustomBadge,
  CustomCol,
  CustomCollapse,
  CustomDescriptions,
  CustomDrawer,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomModal,
  CustomRow,
  CustomSelect,
  CustomSpace,
  CustomText,
  CustomTimeline,
  CustomTitle,
} from "@/components/custom"
import formatter from "@/helpers/formatter"
import { RepairOrder } from "@/interfaces/repair"
import { useRepairOrdersStore } from "@/stores/repair-orders.store"
import {
  CollapseProps,
  DescriptionsProps,
  Form,
  RefSelectProps,
  TimelineItemProps,
} from "antd"
import React, { useEffect, useRef } from "react"
import CustomDivider from "../../../components/custom/CustomDivider"
import { EditOutlined } from "@ant-design/icons"
import { defaultTheme } from "@/styles/themes"
import moment from "moment"
import ConditionalComponent from "@/components/ConditionalComponent"

const statusMap: Record<string, string> = {
  P: "Pendiente",
  I: "Iniciado",
  R: "Resuelto",
  N: "No Iniciado",
}

const statusColorMap: Record<
  string,
  "warning" | "processing" | "success" | "error" | "default" | undefined
> = {
  P: "warning",
  I: "processing",
  R: "success",
  N: "error",
}

interface RepairOrderInfoProps {
  open?: boolean
  onCancel?: () => void
}

const RepairOrderInfo: React.FC<RepairOrderInfoProps> = ({
  open,
  onCancel,
}) => {
  const statusRef = useRef<RefSelectProps>(null)
  const [form] = Form.useForm()
  const { setRepairOrder, repairOrder } = useRepairOrdersStore()

  const { history } = repairOrder

  useEffect(() => {
    if (!open) setRepairOrder({} as RepairOrder)
  }, [open])

  const generalInfo: DescriptionsProps["items"] = [
    {
      key: "repair_order_id",
      label: "Numero de Orden",
      children: repairOrder.repair_order_id,
    },
    {
      key: "status",
      label: "Estatus",
      span: 2,
      children: (
        <CustomSpace direction={"horizontal"}>
          <CustomFormItem
            noStyle
            name={"status"}
            initialValue={repairOrder.status}
          >
            <CustomSelect
              style={{ minWidth: "100px" }}
              ref={statusRef}
              variant={"filled"}
              onSelect={() =>
                statusRef?.current?.focus({ preventScroll: true })
              }
              options={Object.keys(statusMap).map((key) => ({
                label: statusMap[key],
                value: key,
              }))}
            />
          </CustomFormItem>
          <EditOutlined
            style={{ color: defaultTheme.primaryColor, cursor: "pointer" }}
            onClick={() => statusRef?.current?.focus()}
          />
        </CustomSpace>
      ),
    },
    {
      key: "reported_issue",
      label: "Problema Reportado",
      children: repairOrder.reported_issue,
      span: 2,
    },
    {
      key: "created_at",
      label: "Fecha de entrada",
      children: formatter({
        value: repairOrder.created_at,
        format: "long_date",
      }),
    },
    {
      key: "diagnosis",
      label: "Diagnóstico",
      children: repairOrder.diagnosis,
      span: 2,
    },
    {
      key: "created_by",
      label: "Recibido por",
      children: repairOrder.created_by_name,
    },
  ]

  const customerInfo: DescriptionsProps["items"] = [
    {
      key: "customer_id",
      label: "ID del Cliente",
      children: repairOrder.customer_id,
    },
    {
      key: "customer_name",
      label: "Nombre del Cliente",
      children: repairOrder.customer_name,
    },
    {
      key: "customer_identity",
      label: "Doc. Identidad",
      children: formatter({
        value: repairOrder.customer_identity ?? "N/A",
        format: "document",
      }),
    },
    {
      key: "customer_address",
      label: "Dirección",
      children: repairOrder.customer_address,
    },
    {
      key: "Correo",
      label: "Doc. Identidad",
      children: repairOrder.customer_email,
    },
    {
      key: "customer_phone",
      label: "Teléfono del Cliente",
      children: formatter({
        value: repairOrder.customer_phone ?? "N/A",
        format: "phone",
      }),
    },
  ]

  const productInfo: DescriptionsProps["items"] = [
    { key: "brand", label: "Marca", children: repairOrder.brand },
    { key: "model", label: "Modelo", children: repairOrder.model },
    { key: "color", label: "Color", children: repairOrder.color },
    {
      key: "physical_condition",
      label: "Condición Física",
      children: repairOrder.physical_condition,
    },
    {
      key: "reported_issue",
      label: "Problema Reportado",
      children: repairOrder.reported_issue,
    },
    {
      key: "diagnosis",
      label: "Diagnóstico",
      children: repairOrder.diagnosis,
    },
    {
      key: "signed_staff_name",
      label: "Empleado Asignado",
      children: repairOrder.signed_staff_name,
    },
  ]

  const deviceInfo: DescriptionsProps["items"] = [
    {
      key: "estimated_cost",
      label: "Costo Estimado",
      children: formatter({
        value: repairOrder.estimated_cost,
        format: "currency",
        prefix: "RD",
        fix: 2,
      }),
    },
    {
      key: "advanced_payment",
      label: "Pago Anticipado",
      children: formatter({
        value: repairOrder.advanced_payment,
        format: "currency",
        prefix: "RD",
        fix: 2,
      }),
    },
    {
      key: "delivery_date",
      label: "Fecha de Entrega",
      children: formatter({
        value: repairOrder.delivery_date,
        format: "long_date",
      }),
    },
    {
      key: "created_at",
      label: "Fecha de entrada",
      children: formatter({
        value: repairOrder.created_at,
        format: "long_date",
      }),
    },
    {
      key: "created_by_name",
      label: "Recibido por",
      children: repairOrder.created_by_name,
    },
  ]

  const historyItems: TimelineItemProps[] = history.map((item) => ({
    label: formatter({ value: item.created_at, format: "long_date" }),
    children: (
      <p>
        <p>
          <CustomText type={"secondary"}>{item.created_by}</CustomText>
          {". "}
          <CustomText underline type={"secondary"}>
            @{item.username}
          </CustomText>
        </p>
        <ConditionalComponent
          condition={item.new_status !== item.previous_status}
          fallback={<CustomText>Creo la orden de reparación</CustomText>}
        >
          <span>
            Cambio el estado de{" "}
            <CustomText underline type={"danger"}>
              {statusMap[item.previous_status]}
            </CustomText>{" "}
            a{" "}
            <CustomText underline type={"success"}>
              {statusMap[item.new_status]}
            </CustomText>
          </span>
        </ConditionalComponent>
      </p>
    ),
  }))

  const items: CollapseProps["items"] = [
    {
      key: "general_info",
      label: <CustomTitle level={5}>Información general</CustomTitle>,
      children: (
        <CustomDescriptions
          colon={false}
          layout="vertical"
          items={generalInfo}
        />
      ),
    },
    {
      key: "customer_info",
      label: <CustomTitle level={5}>Información del cliente</CustomTitle>,
      children: (
        <CustomDescriptions
          colon={false}
          layout="vertical"
          items={customerInfo}
        />
      ),
    },
    {
      key: "device_info",
      label: <CustomTitle level={5}>Información del dispositivo</CustomTitle>,
      children: (
        <CustomDescriptions
          colon={false}
          layout="vertical"
          items={productInfo}
        />
      ),
    },
    {
      key: "history",
      label: <CustomTitle level={5}>Historial del reparación</CustomTitle>,
      children: <CustomTimeline items={historyItems} />,
    },
  ]

  return (
    <CustomDrawer
      width={"45%"}
      open={open}
      onClose={onCancel}
      title={
        <CustomTitle level={4}>
          Orden No: {repairOrder.repair_order_id}
        </CustomTitle>
      }
    >
      <CustomForm form={form}>
        <CustomRow justify={"start"}>
          <CustomCol xs={24}>
            <CustomCollapse defaultActiveKey={["0", "1", "2"]} items={items} />
          </CustomCol>
        </CustomRow>
      </CustomForm>
    </CustomDrawer>
  )
}

export default RepairOrderInfo
