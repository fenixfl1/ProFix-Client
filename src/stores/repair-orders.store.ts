import { Receipt, RepairOrder } from "@/interfaces/repair"
import { Metadata, ReturnPayload } from "@/services/interfaces"
import { create } from "zustand"

const metadata: Metadata = {
  pagination: {
    count: 0,
    currentPage: 1,
    pageSize: 15,
    totalPages: 0,
    totalRows: 0,
  },
}

interface RepairOrderStore {
  repairOrders: RepairOrder[]
  repairOrder: RepairOrder
  receipt: Receipt
  metadata: Metadata
  setReceipt: (receipt: Receipt) => void
  setRepairOrder: (repairOrder: RepairOrder) => void
  setRepairOrders: (payload: ReturnPayload<RepairOrder[]>) => void
}

export const useRepairOrdersStore = create<RepairOrderStore>((set) => ({
  repairOrders: [],
  repairOrder: <RepairOrder>{},
  receipt: <Receipt>{},
  metadata,
  setReceipt: (receipt) => set({ receipt }),
  setRepairOrder: (repairOrder) => set({ repairOrder }),
  setRepairOrders: ({ data, metadata }) =>
    set({ repairOrders: data, metadata }),
}))
