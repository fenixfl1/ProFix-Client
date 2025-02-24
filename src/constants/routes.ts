export const BASE_WEB_SOCKET_URL = process.env.NEXT_PUBLIC_APP_WEB_SOCKET_URL
export const SOCKET_NOTIFICATION_URL = `${BASE_WEB_SOCKET_URL}notifications`

export const BASE_WEB_API_URL = process.env.NEXT_PUBLIC_APP_WEB_API_URL
export const WEB_API_PATH_LOGIN = "login"

export const WEB_API_PATH_GET_STAFF_MENU_OPTIONS =
  "menu_options/get_menu_options/"
export const WEB_API_PATH_GET_ALL_MENU_OPTIONS =
  "/menu_options/get_all_menu_options"

export const WEB_API_PATH_GET_USER_INFO = "user/get_user_info"
export const WEB_API_PATH_GET_USER_LIST = "/user/get_user_list"
export const WEB_API_PATH_CREATE_STAFF = "/user/register_user"
export const WEB_API_PATH_UPDATE_STAFF = "user/update_user "

// roles
export const WEB_API_PATH_GET_ROLES_LIST = "/roles/get_roles_list"
export const WEB_API_PATH_CREATE_ROLE = "/roles/create_role"
export const WEB_API_PATH_UPDATE_ROLE = "/roles/update_role"
export const WEB_API_PATH_GET_ALL_ROLES = "/roles/get_all_roles"

// internal routes
export const PATH_LOGIN = "/login"
export const PATH_HOME = "/"
export const PATH_STAFF = "/staff"
export const PATH_DASHBOARD = "/dashboard"
export const PATH_INVENTORY = "/inventory"
export const PATH_ROLES = "/roles"

export const protectedRoutes = [
  PATH_HOME,
  PATH_DASHBOARD,
  PATH_STAFF,
  PATH_INVENTORY,
  PATH_ROLES,
]

export const publicRoutes = [PATH_LOGIN]
