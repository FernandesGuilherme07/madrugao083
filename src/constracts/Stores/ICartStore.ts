import { CartItem } from "src/model/CartItem";

export interface ICartStore {
    itens: CartItem[],

    AddItem(item: CartItem): Promise<void>;
    RemoveItem(itemId: number): Promise<void>;
    GetItemToCartById(id: number): CartItem | undefined;
    PriceToProductWithAdicional(id: number): number ;
    ClearCart(): void;
    get totalPrice(): number;
    get quatityItensToCart(): number;
}