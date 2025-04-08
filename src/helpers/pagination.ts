import { Metadata } from "@/services/interfaces"
import { TablePaginationConfig } from "antd"

function makePagination(metadata: Metadata): TablePaginationConfig {
  return {
    showSizeChanger: true,
    pageSize: metadata?.pagination?.pageSize,
    total: Number(metadata?.pagination?.totalRows),
    current: metadata?.pagination?.currentPage,
  }
}

export default makePagination
