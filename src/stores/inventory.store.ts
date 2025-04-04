import { Category, Product, ProductHeader } from "@/interfaces/inventory"
import { Metadata, ReturnPayload } from "@/services/interfaces"
import { create } from "zustand"

const initialMetadata: Metadata = {
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRows: 0,
    count: 0,
    pageSize: 10,
  },
}

interface UseInventoryStore {
  products: Product[]
  categories: Category[]
  productsHeaders: ProductHeader[]
  productMetadata: Metadata
  productHeaderMetadata: Metadata
  setProducts: (payload: ReturnPayload<Product[]>) => void
  setCategories: (categories: Category[]) => void
  setProductHeaders: (payload: ReturnPayload<ProductHeader[]>) => void
}

export const useInventoryStore = create<UseInventoryStore>((set) => ({
  products: [],
  categories: [],
  productsHeaders: [],
  productMetadata: initialMetadata,
  productHeaderMetadata: initialMetadata,
  setProducts: ({ data, metadata }) =>
    set({ products: data, productHeaderMetadata: metadata }),
  setCategories: (categories) => set({ categories }),
  setProductHeaders: ({ data, metadata }) =>
    set({ productsHeaders: data, productHeaderMetadata: metadata }),
}))
