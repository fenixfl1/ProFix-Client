import { Metadata } from "@/services/interfaces"
import { TablePaginationConfig } from "antd"

function makePagination({ pagination }: Metadata): TablePaginationConfig {
  return {
    showSizeChanger: true,
    pageSize: pagination?.pageSize,
    total: pagination?.totalPages,
    current: pagination?.currentPage,
  }
}

export default makePagination
