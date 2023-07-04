import { CartItem } from "./CartItem";

export type sendMessageForWhatsapp = {
    orderNumber: number;
    clientName: string;
    clientNumberForContact: number;
    address: string;
    addressComplement?: string;
    addressReference: string;
    timeOfDelivery: string;
    productItens: CartItem;
    deliveryPrice: number;
    subTotal: number;
    totalPrice: number 
    paymentMethod: "pix" | "dinheiro" | "cartão";
    moneyChange: boolean;
    valueOfMoneyChange?: number;
} 