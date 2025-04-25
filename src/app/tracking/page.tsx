"use client"

import {
  CustomCol,
  CustomInput,
  CustomRow,
  CustomSpin,
} from "@/components/custom"
import useDebounce from "@/hooks/useDebounce"
import { getCustomerSession } from "@/lib/session"
import { useGetCustomerTrackingOrdersMutation } from "@/services/hooks/customer/useGetCustomerTrackingOrdersMutation"
import { SearchOutlined } from "@ant-design/icons"
import React, { useCallback, useEffect, useState } from "react"
import RepairOrderLista from "./components/RepairOrderLista"

const page: React.FC = () => {
  const [searchKey, setSearchKey] = useState("")
  const debounce = useDebounce(searchKey)

  const {
    mutateAsync: getRepairOrders,
    isPending: isGetOrdersPending,
    data: { data, metadata },
  } = useGetCustomerTrackingOrdersMutation()

  const { pagination } = metadata

  const handleSearch = useCallback(
    (page = pagination.currentPage, size = pagination.pageSize) => {
      getRepairOrders({
        page,
        size,
        customer_id: getCustomerSession().customer_id,
        condition: [
          {
            field: "state",
            operator: "=",
            value: "A",
          },
          {
            field: "filter",
            operator: "LIKE",
            value: debounce,
          },
        ],
      })
    },
    [debounce]
  )

  useEffect(handleSearch, [handleSearch])

  return (
    <CustomSpin spinning={isGetOrdersPending}>
      <CustomCol xs={24}>
        <CustomRow justify={"center"}>
          <CustomCol xs={14}>
            <CustomInput
              variant={"filled"}
              size={"large"}
              placeholder={"Buscar mis ordenes..."}
              suffix={<SearchOutlined />}
              onChange={({ target }) => setSearchKey(target.value)}
            />
          </CustomCol>
        </CustomRow>
      </CustomCol>

      <RepairOrderLista
        metadata={metadata}
        loading={isGetOrdersPending}
        dataSource={data}
        onChange={handleSearch}
      />
    </CustomSpin>
  )
}

export default page
