"use client"

import { useState } from "react"
import { Form } from "antd"
import { NextPage } from "next"
import { CustomSpin } from "@/components/custom"
import { assert } from "@/helpers/assert"
import { AxiosError } from "axios"
import { useAuthenticateUserMutation } from "@/services/hooks/auth/useAuthenticateUserMutation"
import LoginForm from "./components/LoginForm"

const page: NextPage = () => {
  const [form] = Form.useForm()

  const [message, setMessage] = useState<string>()

  const { mutateAsync: authenticateUser, isPending } =
    useAuthenticateUserMutation()

  const handleOnFinish = async () => {
    try {
      const data = await form.validateFields()
      await authenticateUser(data)
      window.location.reload()
    } catch (error: any) {
      assert<AxiosError<{ message: string }>>(error)
      setMessage(error?.response?.data?.message)
    }
  }

  return (
    <CustomSpin spinning={isPending}>
      <LoginForm
        form={form}
        onFinish={handleOnFinish}
        message={message}
        onClose={() => setMessage(undefined)}
      />
    </CustomSpin>
  )
}

export default page
