import { Product } from "./Producto.interface";

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
