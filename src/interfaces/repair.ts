import { Device } from "./customer"
import { User } from "./user"

export interface Repair {
  id: number
  device?: Device
  reported_issue: string
  diagnosis?: string
  status: "P" | "I" | "R" | "N"
  estimated_cost?: number
  delivery_date?: string
  customer_signature: boolean
  used_products?: any[]
  history?: any[]
}
