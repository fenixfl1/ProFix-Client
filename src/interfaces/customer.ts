import { Device } from "./repair"

export interface Customer {
  customer_id: number
  name: string
  email: string
  phone?: string
  identity_document?: string
  username: string
  password: string
  address?: string
  state: string
  created_at: string
  updated_at: string
  devices?: Device[]
}
