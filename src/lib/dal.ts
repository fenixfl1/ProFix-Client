import "server-only"

import { cookies } from "next/headers"
import { COOKIE_KEY_USER_DATA } from "@/constants/cookieKeys"
import { cache } from "react"
import jsonParse from "@/helpers/jsonParse"
import { UserSession } from "@/interfaces/user"
import { redirect } from "next/navigation"
import { PATH_LOGIN } from "@/constants/routes"

export const verifySession = cache(async () => {
  const cookie = cookies().get(COOKIE_KEY_USER_DATA)?.value
  const session = jsonParse<UserSession>(cookie ?? "{}")

  if (!session.user_id) {
    redirect(PATH_LOGIN)
  }

  return { isAuthorized: true, user_id: session.user_id }
})
