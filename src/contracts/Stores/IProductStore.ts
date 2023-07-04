import { Product } from "src/models/Product";

export interface IProductStore {
    product: Product[],

    GetAllProducts(): Promise<Product[]>;
    GetProductById(id: number): Promise<Product>
}