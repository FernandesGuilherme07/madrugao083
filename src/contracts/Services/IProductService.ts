import { Product } from "src/models/Product";

export interface IProductService {
    GetAllProducts(): Promise<Product[]>
    GetProductById(id: number): Promise<Product> 
}