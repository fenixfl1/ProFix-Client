import { Customer } from "./customer"

enum Status {
  Pending = "P",
  Resolved = "R",
  InProgress = "I",
  NotSolved = "N",
}
export interface Device {
  device_id: number
  customer: Customer
  brand: string
  model: string
  imei: string
  color?: string
  accessories?: string
  physical_condition?: string
  repairs?: RepairOrder[]
}

export interface Brand {
  brand_id: number
  name: string
  created_at: string
  updated_at: string
  state: string
}

export interface RepairOrderPayload {
  customer_id: number
  devices: {
    brand_id: number
    model: string
    imei: string
    color?: string
    physical_condition: string
    reported_issue: string
    diagnosis: string
    estimated_cost?: number
    advanced_payment?: number
    delivery_date?: Date
  }[]
}

export interface RepairOrder {
  advanced_payment?: number
  assigned_staff_id?: number
  brand: string
  color: string
  created_at: string
  created_by: number
  created_by_name?: string
  customer_id: number
  customer_name: string
  customer_identity: string
  customer_email: string
  customer_address: string
  customer_phone: string
  delivery_date?: string
  diagnosis?: string
  estimated_cost?: number
  filter: string
  model: string
  physical_condition: string
  repair_order_id: number
  reported_issue?: string
  signed_staff_name?: string
  state: string
  status: string
  history: RepairOrderHistory[]
}

export interface RepairOrderHistory {
  history_id: number
  repair_order_id: number
  previous_status: Status
  new_status: Status
  created_by: number
  created_at: string
  updated_by: number
  updated_at: string
  state: string
  username: string
}
