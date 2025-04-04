import React from "react"
import styled from "styled-components"
import ConditionalComponent from "./ConditionalComponent"
import CustomRow from "./custom/CustomRow"
import CustomSpin from "./custom/CustomSpin"

const Row = styled(CustomRow)`
  background-color: #f0f0f0;
  color: rgba(0, 0, 0, 0.85);
  height: 30px;
`

interface NotFoundContentProps {
  color?: string
  description?: React.ReactNode
  onOk?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  loading?: boolean
}

const NotFoundContent: React.FC<NotFoundContentProps> = ({
  color = "#1890ff",
  description,
  loading = false,
  onOk,
}) => {
  return (
    <Row justify="center">
      <ConditionalComponent
        onClick={onOk}
        condition={typeof onOk === "function"}
        fallback={
          <ConditionalComponent
            condition={loading}
            fallback={<div>{description}</div>}
          >
            <CustomSpin size="small" spinning={loading} />
          </ConditionalComponent>
        }
      >
        <span>
          <span>{`"${description}"`}</span>{" "}
          <span style={{ color, fontSize: 12, cursor: "pointer" }}>Crear</span>
        </span>
      </ConditionalComponent>
    </Row>
  )
}

export default NotFoundContent
