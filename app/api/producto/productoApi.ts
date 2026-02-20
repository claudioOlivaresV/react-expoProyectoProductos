// import { api } from "../api";

// export const getCategorias = () => {
//   return api.get("/products/categories");
// };

// app/api/producto/productoApi.ts

import { Category } from "@/app/interfaces/Category.interface";
import { api } from "../api";

export const getCategorias = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/products/categories");
  return response.data;
};
