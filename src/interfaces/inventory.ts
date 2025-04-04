export interface ProductDetail {
  product_detail_id: number
  product_id: number
  model: string
  brand: string
  price: number
  stock: number
  supplier: string
  condition: "NO" | "NR" | "UR" | "UP"
  state: string
  created_at: string
  updated_at: string
  created_by: string
  updated_by: string
}

export interface CreateProductDetailPayload {
  product_header_id: number
  details: Partial<ProductDetail>[]
}

export interface CreateProductHeaderPayload {
  name: string
  description: string
  category_id: number
}

export interface ProductHeader {
  product_id: number
  name: string
  description: string
  category_id: number
  category: string
  state: string
  created_at: string
  updated_at: string
  created_by: string
  updated_by: string
}

export interface Category {
  category_id: number
  name: string
  description: string
  state: string
  created_at: string
  updated_at: string
  created_by: string
  updated_by: string
}

export interface Product extends ProductDetail, ProductHeader {
  category_name: string
}
