"use client"

import { CustomContent, CustomLayout } from "@/components/custom"
import styled from "styled-components"

const Layout = styled.div`
  height: 100vh !important;
  background-image: url("/assets/login_logo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <Container>{children}</Container>
    </Layout>
  )
}

export default Template
