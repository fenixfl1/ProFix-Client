import React from "react"
import {
  CustomButton,
  CustomCol,
  CustomDivider,
  CustomPopover,
  CustomRow,
  CustomSearch,
  CustomSpace,
  CustomTooltip,
} from "./custom"
import ConditionalComponent from "./ConditionalComponent"
import { FilterOutlined, PlusOutlined } from "@ant-design/icons"
import { defaultBreakpoints } from "@/styles/breakpoints"
import { FormInstance } from "antd"
import FilterTemplate from "./FilterTemplate"

interface TitleBarProps {
  onSearch?: (value?: string) => void
  onCreate?: () => void
  filterContent?: React.JSX.Element
  createText?: string
  searchPlaceholder?: string
  form: FormInstance
  onFilter?: () => void
}

const TitleBar: React.FC<TitleBarProps> = ({
  filterContent,
  onCreate,
  onSearch,
  createText = "Crear",
  searchPlaceholder = "Buscar...",
  onFilter,
  form,
}) => {
  const content = (
    <FilterTemplate onSearch={onSearch} onFilter={onFilter} form={form}>
      {filterContent}
    </FilterTemplate>
  )

  return (
    <CustomCol xs={24}>
      <CustomRow justify={"space-between"}>
        <ConditionalComponent
          condition={!!filterContent}
          fallback={<CustomCol xs={2} />}
        >
          <CustomTooltip title={"Filtros"} placement={"left"}>
            <CustomPopover
              content={content}
              title={"Filtros"}
              trigger={"click"}
            >
              <CustomButton
                size={"large"}
                type={"text"}
                icon={<FilterOutlined />}
              />
            </CustomPopover>
          </CustomTooltip>
        </ConditionalComponent>
        <CustomCol xs={14}>
          <CustomRow justify={"space-between"} style={{ flexWrap: "nowrap" }}>
            <CustomSearch
              width={"80%"}
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch?.(e.target.value)}
            />
            <CustomButton
              icon={<PlusOutlined />}
              type={"primary"}
              onClick={onCreate}
            >
              {createText}
            </CustomButton>
          </CustomRow>
        </CustomCol>
      </CustomRow>

      <CustomDivider />
    </CustomCol>
  )
}

export default TitleBar
