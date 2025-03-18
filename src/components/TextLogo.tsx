import React from "react"
import styled from "styled-components"
import { CustomRow } from "./custom"

const Logo = styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 2em;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  text-transform: uppercase;
  color: #ff5733;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 3px;
  background: linear-gradient(45deg, #ff5733, #ffcc33);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  display: inline-block;
`

const TextLogo: React.FC = () => {
  return (
    <CustomRow justify={"center"} align={"middle"}>
      <Logo>Genao Tech</Logo>
    </CustomRow>
  )
}

export default TextLogo
