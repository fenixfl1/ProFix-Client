import React, { useState } from "react"
import { Table } from "antd"
import { ColumnType } from "antd/es/table"
import { TableProps } from "antd/lib/table"
import { defaultTheme } from "@/styles/themes"
import CustomRow from "./CustomRow"
import CustomButton from "./CustomButton"
import { DownloadOutlined } from "@ant-design/icons"
import CustomTooltip from "./CustomTooltip"
import styled from "styled-components"
import ConditionalComponent from "../ConditionalComponent"
import ExportOptions from "../ExportOptions"

const Container = styled.div`
  position: relative;

  .btn-export-table {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
`

export interface CustomColumnType<T> extends ColumnType<T> {
  editable?: boolean
}

export interface CustomTableProps<T = any> extends TableProps<T> {
  exportable?: boolean
  columnsMap?: Record<string, string>
}

const CustomTable = React.forwardRef<any, CustomTableProps<any>>(
  (
    {
      dataSource = [],
      expandable,
      bordered = false,
      exportable = false,
      columnsMap,
      ...props
    },
    ref
  ) => {
    const [modalState, setModalState] = useState(false)

    return (
      <>
        <Container>
          <ConditionalComponent condition={exportable}>
            <CustomTooltip title={"Exportar"}>
              <CustomButton
                className={"btn-export-table"}
                size={"large"}
                icon={<DownloadOutlined />}
                type={"text"}
                onClick={() => setModalState(true)}
              >
                Exportar
              </CustomButton>
            </CustomTooltip>
          </ConditionalComponent>
          <Table
            dataSource={dataSource}
            bordered={bordered}
            ref={ref}
            rowClassName={(record) =>
              record?.state === "A" ? "active-row" : "inactive-row"
            }
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20", "25"],
              simple: true,
              ...props.pagination,
            }}
            expandable={{
              indentSize: 25,
              ...expandable,
            }}
            {...props}
          />
        </Container>

        <ConditionalComponent condition={modalState}>
          <ExportOptions
            columnsMap={columnsMap}
            dataSource={dataSource}
            onCancel={() => setModalState(false)}
            open={modalState}
            ref={ref}
          />
        </ConditionalComponent>
      </>
    )
  }
)

export default CustomTable
