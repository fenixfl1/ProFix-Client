import React from "react"
import dynamic from "next/dynamic"

const RepairOrderTable = dynamic(
  () => import("./components/RepairOrderTable"),
  { ssr: false }
)

const page: React.FC = () => {
  return <RepairOrderTable />
}

export default page
