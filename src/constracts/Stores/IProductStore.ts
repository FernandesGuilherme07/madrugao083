import { Product } from "src/model/Product";

export interface IProductStore {
    product: Product[],

    GetAllProducts(): Promise<Product[]>;
    GetProductById(id: number): Promise<Product>
}