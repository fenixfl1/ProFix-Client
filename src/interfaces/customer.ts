import { Repair } from "./repair"

export interface Customer {
  customer_id: number
  name: string
  email: string
  phone?: string
  identity_document?: string
  username: string
  password: string
  address?: string
  devices?: Device[]
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
  repairs?: Repair[]
}
