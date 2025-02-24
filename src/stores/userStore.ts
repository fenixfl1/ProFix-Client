import { MenuOption, User } from "@/interfaces/user"
import { Metadata, ReturnPayload } from "@/services/interfaces"
import { create } from "zustand"

const initialMetadata: Metadata = {
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRows: 0,
    count: 0,
    pageSize: 10,
  },
}

interface UserStore {
  users: User[]
  user: User
  metadata: Metadata
  usernameAvailable: boolean
  identityDocumentAvailable: boolean
  setUsernameAvailable: (available: boolean) => void
  setDocumentAvailable: (available: boolean) => void
  setUsers: (payload: ReturnPayload<User[]>) => void
  setUser: (user: User) => void
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  metadata: initialMetadata,
  user: <User>{},
  usernameAvailable: false,
  identityDocumentAvailable: false,
  setUsernameAvailable: (available) => set({ usernameAvailable: available }),
  setDocumentAvailable: (available) =>
    set({ identityDocumentAvailable: available }),
  setUsers: ({ data, metadata }) => set({ users: data, metadata }),
  setUser: (user) => set({ user }),
}))

export default useUserStore
