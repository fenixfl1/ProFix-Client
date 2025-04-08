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
export const WEB_API_PATH_CHANGE_PASSWORD = "/user/change_password"

// roles
export const WEB_API_PATH_GET_ROLES_LIST = "/roles/get_roles_list"
export const WEB_API_PATH_CREATE_ROLE = "/roles/create_role"
export const WEB_API_PATH_UPDATE_ROLE = "/roles/update_role"
export const WEB_API_PATH_GET_ALL_ROLES = "/roles/get_all_roles"
export const WEB_API_PATH_GET_ONE_ROLE = "/roles/get_one_role"

// customer
export const WEB_API_PATH_CREATE_CUSTOMER = "/customers/create_customer"
export const WEB_API_PATH_UPDATE_CUSTOMER = "/customers/update_customer"
export const WEB_API_PATH_GET_CUSTOMERS = "/customers/get_customers"
export const WEB_API_PATH_GET_ONE_CUSTOMER = "/customers/get_customer"

// repair_order
export const WEB_API_PATH_CREATE_REPAIR_ORDER =
  "/repair_order/create_repair_order"
export const WEB_API_PATH_UPDATE_DEVICE = "/repair_order/update_repair_order"
export const WEB_API_PATH_GET_REPAIR_ORDERS = "/repair_order/get_repair_orders"
export const WEB_API_PATH_GET_PHONE_BRANDS = "/repair_order/get_phone_brands"
export const WEB_API_PATH_GET_ONE_DEVICE = "/repair_order/get_repair_order"
export const WEB_API_PATH_GET_REPAIR_ORDER_HISTORY =
  "/repair_order/get_repair_order_history"
export const WEB_API_PATH_CHANGE_ORDER_STATUS =
  "/repair_order/change_order_status"
export const WEB_API_PATH_GET_ORDER_RECEIPT = "/repair_order/get_receipt"

// products
export const WEB_API_PATH_CREATE_PRODUCT_HEADER = "/products/create_product"
export const WEB_API_PATH_UPDATE_PRODUCT_HEADER = "/products/update_product"
export const WEB_API_PATH_GET_PRODUCT_HEADERS = "/products/get_product_headers"
export const WEB_API_PATH_GET_PRODUCTS = "/products/get_products"
export const WEB_API_PATH_GET_CATEGORIES = "/products/get_categories"
export const WEB_API_PATH_CREATE_CATEGORY = "/products/create_category"
export const WEB_API_PATH_CREATE_PRODUCT_DETAIL =
  "/products/create_product_detail"
export const WEB_API_PATH_UPDATE_PRODUCT_DETAIL =
  "/products/update_product_detail"

// internal routes
export const PATH_LOGIN = "/login"
export const PATH_HOME = "/"
export const PATH_STAFF = "/staff"
export const PATH_DASHBOARD = "/dashboard"
export const PATH_INVENTORY = "/inventory"
export const PATH_ROLES = "/roles"
export const PATH_CUSTOMERS = "/customers"
export const PATH_RECEPTION = "/repairs"

export const protectedRoutes = [
  PATH_HOME,
  PATH_DASHBOARD,
  PATH_STAFF,
  PATH_INVENTORY,
  PATH_ROLES,
  PATH_CUSTOMERS,
  PATH_RECEPTION,
]

export const publicRoutes = [PATH_LOGIN]
