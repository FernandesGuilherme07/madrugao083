import { createContext } from "react";
import { cartStore } from "src/stores/CartStore";

export const cartContext = createContext(cartStore)
