import Cookies from "js-cookie"
import { MenuOption, UserSession } from "@/interfaces/user"
import {
  COOKIE_KEY_CURRENT_MENU_OPTION,
  COOKIE_KEY_SESSION_TOKEN,
  COOKIE_KEY_USERNAME,
  COOKIE_KEY_USER_DATA,
  COOKIE_KEY_USER_PICTURE,
  COOKIE_KEY_AVATAR,
  COOKIE_KEY_DARK_MODE,
} from "@/constants/cookieKeys"
import jsonParse from "@/helpers/jsonParse"
import errorHandler from "@/helpers/errorHandler"

const sessionCookies: Record<string, string> = {
  COOKIE_KEY_USERNAME,
  COOKIE_KEY_SESSION_TOKEN,
  COOKIE_KEY_USER_DATA,
  COOKIE_KEY_USER_PICTURE,
  COOKIE_KEY_CURRENT_MENU_OPTION,
  COOKIE_KEY_AVATAR,
}

const isLoggedIn = (): boolean => {
  return !!Cookies.get(sessionCookies.COOKIE_KEY_SESSION_TOKEN)
}

const createSession = (data: UserSession): void => {
  try {
    const { avatar, sessionCookie, username, ...userData } = data

    const { token, expiration: expires } = sessionCookie

    // eslint-disable-next-line no-console
    console.log({ avatar })

    sessionStorage.setItem("avatar", `${avatar || ""}`)
    Cookies.set(sessionCookies.COOKIE_KEY_USERNAME, username, {
      expires: new Date(expires),
    })
    Cookies.set(sessionCookies.COOKIE_KEY_SESSION_TOKEN, token, {
      expires: new Date(expires),
    })
    Cookies.set(
      sessionCookies.COOKIE_KEY_USER_DATA,
      JSON.stringify({ ...userData, username, token }),
      {
        expires: new Date(expires),
      }
    )
  } catch (error) {
    errorHandler(error)
  }
}

const removeSession = (): void => {
  Object.keys(sessionCookies).forEach((key) => {
    Cookies.remove(sessionCookies[key])
  })
  localStorage.clear()
  sessionStorage.clear()
}

const getSessionToken = (): string => {
  return Cookies.get(sessionCookies.COOKIE_KEY_SESSION_TOKEN) || ""
}

const getSessionInfo = (): UserSession => {
  if (!isLoggedIn()) return <UserSession>{}
  const userData = JSON.parse(
    Cookies.get(sessionCookies.COOKIE_KEY_USER_DATA) as string
  )
  const avatar = sessionStorage.getItem("avatar")
  return { ...userData, avatar }
}

const getSessionUsername = (): string => {
  return Cookies.get(sessionCookies.COOKIE_KEY_USERNAME) || ""
}

const setSessionConfig = (config: unknown): void => {
  Cookies.set(sessionCookies.COOKIE_KEY_USER_CONFIG, JSON.stringify(config))
}

const getSessionConfig = (): unknown => {
  return JSON.parse(
    Cookies.get(sessionCookies.COOKIE_KEY_USER_CONFIG) as string
  )
}

const getUserPicture = (): string | null => {
  return sessionStorage.getItem("avatar")
}

const setCurrentOptionMenu = (option: MenuOption): void => {
  const { expires } = JSON.parse(
    Cookies.get(sessionCookies.COOKIE_KEY_USER_DATA) ?? "{}"
  )

  delete option["CHILDREN" as keyof MenuOption]
  delete option["ICONO" as keyof MenuOption]

  Cookies.set(COOKIE_KEY_CURRENT_MENU_OPTION, JSON.stringify(option), {
    expires: new Date(expires),
  })
}

const getCurrentOptionMenu = (): MenuOption | undefined => {
  const option = jsonParse<MenuOption>(
    Cookies.get(COOKIE_KEY_CURRENT_MENU_OPTION) as string
  )

  return option
}

export const setDarkMode = (value: boolean) => {
  Cookies.set(COOKIE_KEY_DARK_MODE, value.toString())
}

export const getDarkMode = (): boolean => {
  return Cookies.get(COOKIE_KEY_DARK_MODE) === "true"
}

export {
  isLoggedIn,
  createSession,
  removeSession,
  getSessionToken,
  getSessionInfo,
  getSessionUsername,
  setSessionConfig,
  getSessionConfig,
  getUserPicture,
  setCurrentOptionMenu,
  getCurrentOptionMenu,
}
