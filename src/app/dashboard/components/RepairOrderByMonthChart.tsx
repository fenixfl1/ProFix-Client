import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useGetRepairOrderByMonthQuery } from "@/services/hooks/dashboard/useGetRepairOrderByMonthQuery"
import ChartWrapper from "./ChartWrapper"
import { ChartComponentProps } from "@/interfaces/dashboard"

const RepairOrderByMonthChart: React.FC<ChartComponentProps> = ({ width }) => {
  const { data } = useGetRepairOrderByMonthQuery()

  // Convertimos labels y data en una lista de objetos: { month: label, value: data }
  const chartData =
    data?.labels.map((label: string, index: number) => ({
      month: label,
      value: data.data[index],
    })) ?? []

  return (
    <ChartWrapper title="Ordenes por mes" width={width}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Line
            type="monotone"
            dataKey="value"
            name="Órdenes"
            stroke="#82ca9d"
            strokeWidth={2}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default RepairOrderByMonthChart
