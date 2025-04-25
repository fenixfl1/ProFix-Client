import React from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts"
import ChartWrapper from "./ChartWrapper"
import { useGetRepairOrderByStatusQuery } from "@/services/hooks/dashboard/useGetRepairOrderByStatusQuery"
import { ChartComponentProps } from "@/interfaces/dashboard"
import { statusMap } from "@/constants/general"

const RADIAN = Math.PI / 180

// Etiqueta personalizada con porcentaje
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

const RepairOrderByStatusChart: React.FC<ChartComponentProps> = ({ width }) => {
  const { data } = useGetRepairOrderByStatusQuery()

  const chartData =
    data?.labels.map((key: string, index: number) => ({
      name: statusMap[key]?.label ?? key,
      value: data.data[index],
      color: statusMap[key]?.color ?? "#8884d8",
    })) ?? []

  return (
    <ChartWrapper title={"Reparaciones por estado"} width={width}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

export default RepairOrderByStatusChart
