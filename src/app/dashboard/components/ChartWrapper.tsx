import { CustomCard, CustomDivider, CustomTitle } from "@/components/custom"
import React from "react"
import styled from "styled-components"

const Card = styled(CustomCard)`
  width: 100%;
`

interface ChartWrapperProps {
  title: string
  children: React.ReactNode
  width?: string | number
  wrap?: boolean
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  children,
  title,
  width,
  wrap,
}) => {
  return (
    <Card width={width}>
      <CustomDivider>
        <CustomTitle style={{ textWrap: wrap ? "wrap" : "nowrap" }}>
          {title}
        </CustomTitle>
      </CustomDivider>
      {children}
    </Card>
  )
}

export default ChartWrapper
