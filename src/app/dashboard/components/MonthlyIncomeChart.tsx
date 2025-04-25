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
import { ChartComponentProps } from "@/interfaces/dashboard"
import { useGetMonthlyIncomeQuery } from "@/services/hooks/dashboard/useGetMonthlyIncomeQuery"
import ChartWrapper from "./ChartWrapper"

const MonthlyIncomeChart: React.FC<ChartComponentProps> = ({ width }) => {
  const { data } = useGetMonthlyIncomeQuery()

  // Transformamos a formato que espera recharts
  const chartData =
    data?.labels.map((label: string, index: number) => ({
      mes: label,
      ingreso: data.data[index],
    })) ?? []

  return (
    <ChartWrapper title={"Ingresos mensuales"} width={width}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value: any) => `$${value}`} />
          <Legend verticalAlign="bottom" height={36} />
          <Line
            type="monotone"
            dataKey="ingreso"
            stroke="#13c2c2"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default MonthlyIncomeChart
