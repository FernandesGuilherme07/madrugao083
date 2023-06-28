

export type AdicionalState = {
    id: number;
    price: number;
    name: string;
}

export type CartItem = {
    id: number;
    qt: number;
    productId: number;
    prdouctName: string;
    productPrice: number;
    aditionals?: AdicionalState[];
}