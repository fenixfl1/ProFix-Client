"use client"

import React, { useEffect, useState } from "react"
import type { Metadata } from "next"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import StyledComponentsRegistry from "@/lib/registry"
import GlobalStyles from "@/styles/GlobalStyles"
import ConditionalComponent from "@/components/ConditionalComponent"
import Fallback from "@/components/Fallback"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "@/lib/appClient"
import styled, { ThemeProvider } from "styled-components"
import { antTheme, defaultTheme } from "@/styles/themes"
import { App, ConfigProvider } from "antd"
import moment from "moment"
import "moment/locale/es"
import { WebSocketProvider } from "@/context/web-socket"
import dynamic from "next/dynamic"
import { getDarkMode } from "@/lib/session"

const Darkreader = dynamic(() => import("react-darkreader-2"), {
  ssr: false,
})

moment.locale("es")

const metadata: Metadata = {
  title: "ProFix",
}

const FloatButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 16px;
  z-index: 9999;
  display: none;
`

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>()
  const [demLoaded, setDemLoaded] = useState(false)

  useEffect(() => {
    setDemLoaded(true)
    return () => {
      setDemLoaded(false)
    }
  }, [])

  useEffect(() => {
    setIsDarkMode(getDarkMode())
  }, [])

  return (
    <html lang={"en"}>
      <body>
        <WebSocketProvider>
          <QueryClientProvider client={queryClient}>
            <StyledComponentsRegistry>
              <GlobalStyles />
              <AntdRegistry>
                <App>
                  <ConfigProvider
                    theme={{ ...antTheme }}
                    componentSize="middle"
                  >
                    <ConditionalComponent
                      condition={demLoaded}
                      fallback={<Fallback />}
                    >
                      <ThemeProvider theme={defaultTheme}>
                        <>
                          {children}

                          <FloatButton>
                            <Darkreader
                              defaultDarken={isDarkMode}
                              onChange={setIsDarkMode}
                            />
                          </FloatButton>
                        </>
                      </ThemeProvider>
                    </ConditionalComponent>
                  </ConfigProvider>
                </App>
              </AntdRegistry>
            </StyledComponentsRegistry>
          </QueryClientProvider>
        </WebSocketProvider>
      </body>
    </html>
  )
}

export default RootLayout
