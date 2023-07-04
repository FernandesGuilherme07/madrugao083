export type Product = {
    id: number;
    image: string;
    categoryName: string;
    name: string;
    price: number;
    description?: string;
    aditionals?: Aditional[];
}

export type Aditional = {
    id: number
    name: string;
    price: number;
}