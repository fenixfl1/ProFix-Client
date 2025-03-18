import { create } from "zustand"
import { Customer } from "@/interfaces/customer"
import { Metadata, ReturnPayload } from "@/services/interfaces"

const metadata = {
  pagination: {
    count: 0,
    currentPage: 1,
    pageSize: 15,
    totalPages: 0,
    totalRows: 0,
  },
}

interface CustomerState {
  customer: Customer
  customers: Customer[]
  metadata: Metadata
  setCustomer: (customer: Customer) => void
  setCustomers: (payload: ReturnPayload<Customer[]>) => void
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customer: <Customer>{},
  customers: [],
  metadata,
  setCustomer: (customer: Customer) => set({ customer }),
  setCustomers: ({ metadata, data }) => set({ customers: data, metadata }),
}))
