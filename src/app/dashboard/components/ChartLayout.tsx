"use client"

import React from "react"
import CustomFlex from "@/components/custom/CustomFlex"
import RepairOrderByMonthChart from "./RepairOrderByMonthChart"
import RepairOrderByStatusChart from "./RepairOrderByStatusChart"
import MonthlyIncomeChart from "./MonthlyIncomeChart"
import MostCommonDevicesChart from "./MostCommonDevicesChart"
import NewCustomersPerMonthChart from "./NewCustomersPerMonthChart"
import AverageRepairTimeCard from "./AverageRepairTimeCard"
import CustomerRecurringVsNewChart from "./CustomerRecurringVsNewChart"

const ChartLayout: React.FC = () => {
  return (
    <CustomFlex gap={"10px"} justify={"space-between"}>
      <RepairOrderByStatusChart width={"30%"} />
      <RepairOrderByMonthChart width={"69%"} />
      <MostCommonDevicesChart width={"69%"} />
      <MonthlyIncomeChart width={"30%"} />
      <CustomerRecurringVsNewChart width={"30%"} />
      <NewCustomersPerMonthChart width={"69%"} />
    </CustomFlex>
  )
}

export default ChartLayout
