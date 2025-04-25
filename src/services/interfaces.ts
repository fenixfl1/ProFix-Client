import { ErrorName } from "@/constants/types"
import { AxiosError, AxiosResponse } from "axios"

export interface Metadata {
  pagination: {
    currentPage: number
    totalPages: number
    totalRows: number
    count: number
    pageSize: number
  }
}

export type QueryOperators =
  | "="
  | "!="
  | "LIKE"
  | "ILIKE"
  | ">"
  | ">="
  | "<"
  | "<="
  | "IN"
  | "NOT IN"
  | "IS NULL"
  | "BETWEEN"

export interface Condition<T> {
  fields?: "__all__" | Array<keyof T>
  condition: { [P in keyof Partial<T>]: T[P] }
}

export interface AdvancedCondition<T = any> {
  value: string | number | boolean | Array<string | number>
  field: keyof T | Array<keyof T>
  operator: QueryOperators
}

export interface ReturnPayload<T> {
  data: T
  metadata: Metadata
  message?: string
}

export interface GetPayload<T = any> {
  fields?: (keyof T)[]
  condition: AdvancedCondition<T>[]
  page: number
  size: number
  [key: string]: unknown
}

export interface ApiResponse<T> {
  data: ReturnPayload<T>
}

export interface ErrorResponse<T = unknown, D = any>
  extends Omit<AxiosError<T, D>, "response"> {
  response?: Omit<AxiosResponse<D>, "data"> & {
    data: {
      message: string
      error: ErrorName
      errorCode?: string
    }
  }
}
