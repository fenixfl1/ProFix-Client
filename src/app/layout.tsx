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
import { ThemeProvider } from "styled-components"
import { antTheme, defaultTheme } from "@/styles/themes"
import { App, ConfigProvider } from "antd"
import moment from "moment"
import "moment/locale/es"
import { WebSocketProvider } from "@/context/web-socket"

moment.locale("es")

const metadata: Metadata = {
  title: "ProFix",
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [demLoaded, setDemLoaded] = useState(false)

  useEffect(() => {
    setDemLoaded(true)
    return () => {
      setDemLoaded(false)
    }
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
                        {children}
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
