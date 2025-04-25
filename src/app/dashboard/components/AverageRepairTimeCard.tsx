import React from "react"
import { useGetAverageRepairTimeQuery } from "@/services/hooks/dashboard/useGetAverageRepairTimeQuery"
import ChartWrapper from "./ChartWrapper"
import { ChartComponentProps } from "@/interfaces/dashboard"

const AverageRepairTimeCard: React.FC<ChartComponentProps> = ({
  width,
  wrap = true,
}) => {
  const { data } = useGetAverageRepairTimeQuery()

  return (
    <ChartWrapper
      title={"Promedio de Tiempo de Reparación"}
      width={width}
      wrap={wrap}
    >
      {data}
    </ChartWrapper>
  )
}

export default AverageRepairTimeCard
