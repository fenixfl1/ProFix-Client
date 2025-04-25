import { NextRequest, NextResponse } from "next/server"
import { COOKIE_KEY_USER_DATA } from "@/constants/cookieKeys"
import {
  PATH_CUSTOMER_LOGIN,
  PATH_HOME,
  PATH_LOGIN,
  PATH_TRACKING,
  protectedRoutes,
  publicRoutes,
  allowedClientRoutes,
} from "@/constants/routes"
import { UserSession } from "./interfaces/user"
import jsonParse from "./helpers/jsonParse"
import { COOKIE_KEY_CUSTOMER_SESSION_TOKEN } from "./constants/cookieKeys"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const fullUrl = request.nextUrl.toString()

  const hostname = request.headers.get("host") || ""
  const subdomain = hostname.split(".")[0]

  if (subdomain === "client") {
    if (!allowedClientRoutes.some((route) => path.startsWith(route))) {
      return new NextResponse(null, { status: 404 })
    }

    const token = request.cookies.get(COOKIE_KEY_CUSTOMER_SESSION_TOKEN)?.value
    const isLoginPage = path === PATH_CUSTOMER_LOGIN

    if (!token && !isLoginPage) {
      const redirect = new URL(PATH_CUSTOMER_LOGIN, request.url)
      if (path !== PATH_TRACKING) {
        redirect.searchParams.set(
          "next",
          fullUrl.split(process.env.PORT ?? "3003")[1]
        )
      }
      return NextResponse.redirect(redirect)
    }

    if (token && path === PATH_CUSTOMER_LOGIN) {
      return NextResponse.redirect(new URL(PATH_TRACKING, request.url))
    }
  } else {
    const isProtected = protectedRoutes.includes(path)

    const isPublic = publicRoutes.includes(path)

    const session = jsonParse<UserSession>(
      request.cookies.get(COOKIE_KEY_USER_DATA)?.value ?? "{}"
    )

    if (isProtected && !session.user_id) {
      const redirect = new URL(PATH_LOGIN, request.url)
      if (path !== PATH_HOME) {
        redirect.searchParams.set("next", fullUrl)
      }
      return NextResponse.redirect(redirect)
    }

    if (isPublic && session.user_id && path !== PATH_HOME) {
      return NextResponse.redirect(new URL(PATH_HOME, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
}
