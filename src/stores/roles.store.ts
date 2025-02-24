import { Roles } from "@/interfaces/user"
import { Metadata, ReturnPayload } from "@/services/interfaces"
import { create } from "zustand"

const metadata: Metadata = {
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRows: 0,
    count: 0,
    pageSize: 10,
  },
}

interface UseRolesState {
  role: Roles
  roles: Roles[]
  metadata: Metadata
  setRole: (role: Roles) => void
  setRoles: (payload: ReturnPayload<Roles[]>) => void
}

export const useRolesStore = create<UseRolesState>((set) => ({
  role: <Roles>{},
  roles: [],
  metadata,
  setRole: (role: Roles) => set({ role }),
  setRoles: ({ data, metadata }) => set({ roles: data, metadata }),
}))
