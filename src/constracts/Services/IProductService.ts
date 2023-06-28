import { Product } from "src/model/Product";

export interface IProductService {
    GetAllProducts(): Promise<Product[]>
    GetProductById(id: number): Promise<Product> 
}