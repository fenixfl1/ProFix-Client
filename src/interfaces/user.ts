import dayjs from "dayjs"

interface SessionCookie {
  expiration: string
  token: string
}

interface UserSession {
  username: string
  user_id: number
  name: string
  last_name: string
  avatar: string | null
  roles: string[]
  sessionCookie: SessionCookie
}

interface LoginPayload {
  username: string
  password: string
}

interface Roles {
  role_id: number
  name: string
  description: string
  created_at?: string
  updated_at?: string
  state: string
  created_by?: string | number
  updated_by?: string
  filter: string
  menu_options?: string[]
}

interface MenuOption<T = unknown> {
  children?: MenuOption[]
  content?: string
  description?: string
  icon?: string
  menu_option_id: string
  name: string
  parent_id?: string
  path: string
  type?: "divider" | "group" | "item" | "submenu" | "link"
}

interface MenuTree {
  title: string
  key: string
  children: MenuTree[]
}

interface RolesUser {
  ID_ROL: number
  ID_USUARIO: number
  ID_TIPO_ROL: string
  ESTADO: string
}

interface RoleAccessPayload {
  ID_ROL: number
  ID_USUARIO: number
  OPCIONES: string[]
  PERMISOS: number[]
}

interface User {
  address: string
  avatar: string
  birth_date: string | dayjs.Dayjs
  created_at: string
  created_by: number | null
  email: string
  filter: string
  full_name: string
  gender: string
  identity_document: string
  last_name: string
  name: string
  password: string
  phone: string
  roles: string | string[] | Roles[]
  state: string
  updated_at: string
  updated_by: number | null
  user_id: number
  username: string
}

interface Department {
  DEPARTMENT_ID: number
  STATE: string
  CREATED_AT: string
  UPDATED_AT?: string
  NAME: string
  DESCRIPTION: string
  CREATED_BY: string
  UPDATED_BY?: string
}

export type {
  UserSession,
  LoginPayload,
  MenuOption,
  Roles,
  RolesUser,
  RoleAccessPayload,
  User,
  Department,
  MenuTree,
}
