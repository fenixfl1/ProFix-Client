import { Metadata } from "@/services/interfaces"
import { TablePaginationConfig } from "antd"

function makePagination(metadata: Metadata): TablePaginationConfig {
  return {
    showSizeChanger: true,
    pageSize: metadata?.pagination?.pageSize,
    total: metadata?.pagination?.totalPages,
    current: metadata?.pagination?.currentPage,
  }
}

export default makePagination
