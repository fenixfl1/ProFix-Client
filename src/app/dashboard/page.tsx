import React from "react"
import dynamic from "next/dynamic"

const ChartLayout = dynamic(() => import("./components/ChartLayout"), {
  ssr: false,
})

const page: React.FC = () => {
  return <ChartLayout />
}

export default page
