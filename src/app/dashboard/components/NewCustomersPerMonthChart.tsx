import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartComponentProps } from "@/interfaces/dashboard"
import { useGetCustomerPerMonthQuery } from "@/services/hooks/dashboard/useGetCustomerPerMonthQuery"
import ChartWrapper from "./ChartWrapper"

const NewCustomersPerMonthChart: React.FC<ChartComponentProps> = ({
  width,
}) => {
  const { data } = useGetCustomerPerMonthQuery()

  // Transformamos los datos al formato esperado por Recharts
  const chartData =
    data?.labels.map((label: string, index: number) => ({
      mes: label,
      clientes: data.data[index],
    })) ?? []

  return (
    <ChartWrapper title={"Clientes por mes"} width={width}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Bar dataKey="clientes" fill="#82ca9d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default NewCustomersPerMonthChart
