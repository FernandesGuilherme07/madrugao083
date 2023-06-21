import { Aditional, Product } from "./Product";

export type CartItem = {
    qt: number;
    product: Product;
    aditionals?: Aditional[];
}