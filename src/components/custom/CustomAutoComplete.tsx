import React from "react"
import { AutoComplete, AutoCompleteProps } from "antd"

const CustomAutocomplete: React.FC<AutoCompleteProps> = ({
  size = "middle",
  ...props
}) => {
  return (
    <AutoComplete size={size} {...props}>
      {props.children}
    </AutoComplete>
  )
}

export default CustomAutocomplete
