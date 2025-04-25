"use client"

import styled from "styled-components"

const Layout = styled.div`
  background-image: url("/assets/login_logo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`

const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Layout>{children}</Layout>
}

export default Template
