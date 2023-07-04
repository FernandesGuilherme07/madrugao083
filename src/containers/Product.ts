
import { productService } from "src/services/ProductService";
import { ProductStore } from "src/stores/ProductStore";

export const productStore = new ProductStore(productService)