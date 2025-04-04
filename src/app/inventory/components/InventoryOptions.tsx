"use client"

import { CustomCol, CustomTabs } from "@/components/custom"
import { TabsProps } from "antd"
import React from "react"
import InventoryTable from "./InventoryTable"
import ProductTable from "./ProductTable"

const InventoryOptions: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "inventory",
      label: "Inventario",
      children: <InventoryTable />,
    },
    {
      key: "products_headers",
      label: "Tipo de productos",
      children: <ProductTable />,
    },
  ]

  return (
    <CustomCol xs={24}>
      <CustomTabs
        type={"card"}
        items={items}
        defaultActiveKey={"inventory"}
        size={"large"}
      />
    </CustomCol>
  )
}

export default InventoryOptions
