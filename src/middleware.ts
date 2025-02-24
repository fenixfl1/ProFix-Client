import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { COOKIE_KEY_USER_DATA } from "@/constants/cookieKeys"
import {
  PATH_HOME,
  PATH_LOGIN,
  protectedRoutes,
  publicRoutes,
} from "@/constants/routes"
import { UserSession } from "./interfaces/user"
import jsonParse from "./helpers/jsonParse"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isProtected = protectedRoutes.includes(path)
  const isPublic = publicRoutes.includes(path)

  const session = jsonParse<UserSession>(
    cookies().get(COOKIE_KEY_USER_DATA)?.value ?? "{}"
  )

  if (isProtected && !session.user_id) {
    return NextResponse.redirect(new URL(PATH_LOGIN, request.url))
  }

  if (isPublic && session.user_id && path !== PATH_HOME) {
    return NextResponse.redirect(new URL(PATH_HOME, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
}
