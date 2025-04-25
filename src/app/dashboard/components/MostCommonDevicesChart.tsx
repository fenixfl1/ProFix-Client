import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { ChartComponentProps } from "@/interfaces/dashboard"
import { useGetMostCommonDevicesQuery } from "@/services/hooks/dashboard/useGetMostCommonDevicesQuery"
import ChartWrapper from "./ChartWrapper"

const MostCommonDevicesChart: React.FC<ChartComponentProps> = ({ width }) => {
  const { data } = useGetMostCommonDevicesQuery()

  const chartData =
    data?.labels.map((label: string, index: number) => ({
      name: label,
      cantidad: data.data[index],
    })) || []

  return (
    <ChartWrapper title="Dispositivos más comunes" width={width}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 20, right: 30, left: 50, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Bar dataKey="cantidad" fill="#8884d8" barSize={25} />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default MostCommonDevicesChart
