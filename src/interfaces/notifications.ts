import { User } from "./user"

export interface Notification {
  SENDER: Pick<User, "avatar" | "full_name" | "username">
  RECEIVER: Pick<User, "avatar" | "full_name" | "username">
  IS_READ: boolean
  MESSAGE: string
  CREATED_AT: string
}
