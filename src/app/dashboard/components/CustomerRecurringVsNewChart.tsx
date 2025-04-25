"use client"
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
import ChartWrapper from "./ChartWrapper"
import { ChartComponentProps } from "@/interfaces/dashboard"
import { useGetCustomerRecurringVsNewQuery } from "@/services/hooks/dashboard/useGetCustomerRecurringVsNewQuery"

const CustomerRecurringVsNewChart: React.FC<ChartComponentProps> = ({
  width,
}) => {
  const { data } = useGetCustomerRecurringVsNewQuery()

  return (
    <ChartWrapper title="Clientes nuevos vs recurrentes" width={width}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey="nuevos" stackId="a" fill="#82ca9d" name="Nuevos" />
          <Bar
            dataKey="recurrentes"
            stackId="a"
            fill="#8884d8"
            name="Recurrentes"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default CustomerRecurringVsNewChart
