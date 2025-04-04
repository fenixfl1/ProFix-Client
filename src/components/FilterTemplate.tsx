import React from "react"
import { PopoverContainer } from "./custom/CustomPopover"
import { CustomButton, CustomCol, CustomForm, CustomRow } from "./custom"
import { FormInstance } from "antd"
import { formItemLayout } from "@/styles/breakpoints"
import { FilterOutlined } from "@ant-design/icons"

interface FilterTemplateProps {
  children: React.ReactNode[] | React.ReactNode
  onSearch?: () => void
  onFilter?: () => void
  form: FormInstance
  initialValue?: Record<string, unknown>
}

const FilterTemplate: React.FC<FilterTemplateProps> = ({
  children,
  onFilter,
  onSearch,
  form,
  initialValue,
}) => {
  return (
    <>
      <PopoverContainer>
        <CustomCol xs={24}>
          <CustomForm
            form={form}
            layout={"vertical"}
            initialValues={initialValue}
            {...formItemLayout}
          >
            {children}
          </CustomForm>
        </CustomCol>
      </PopoverContainer>

      <CustomCol xs={24}>
        <CustomRow justify={"space-between"}>
          <CustomButton
            type={"link"}
            onClick={() => {
              form?.resetFields()
              onFilter?.()
            }}
          >
            Restablecer filtros
          </CustomButton>
          <CustomButton
            type={"primary"}
            icon={<FilterOutlined />}
            onClick={onFilter}
          >
            Aplicar filtros
          </CustomButton>
        </CustomRow>
      </CustomCol>
    </>
  )
}

export default FilterTemplate
