// import { api } from "../api";

// export const getCategorias = () => {
//   return api.get("/products/categories");
// };

// app/api/producto/productoApi.ts

import { Category } from "@/app/interfaces/Category.interface";
import { Product } from "@/app/interfaces/Producto.interface";
import { ProductsResponse } from "@/app/interfaces/ProdutoResponse.interface";
import { api } from "../api";

export const getCategorias = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/products/categories");
  return response.data;
};

export const getSortProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>(
    "/products?sortBy=title&order=asc",
  );

  return response.data.products;
};
export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>(
    `/products/search?q=${query}`,
  );

  return response.data.products;
};
