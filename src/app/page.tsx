"use client"

import React from "react"
import { NextPage } from "next"
import { CustomRow } from "@/components/custom"
import styled from "styled-components"

const Container = styled(CustomRow)`
  height: calc(100vh - 150px);

  img {
    height: auto;
    border: none;
    outline: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    resize: cover;
    object-fit: contain;
    transform: scale(1.05);
  }
`

const Home: NextPage = () => {
  return (
    <Container align={"middle"}>
      <img src="/assets/logo3.png" alt="Logo" />
    </Container>
  )
}

export default Home
