import { IProductService } from "src/contracts/Services/IProductService";
import { productsMock } from "src/mocks/productMock";
import { Product } from "src/models/Product";

class ProductService implements IProductService {
    async GetProductById(id: number): Promise<Product> {
       const product = await productsMock.find(prod => prod.id === id);
       if(product) {
       return product
       } else {
        return {
            id: 1,
            description: "",
            categoryName: "produto não existe",
            image: "",
            name:  "produto não existe",
            price: 0,
        }
       }
    }
    async GetAllProducts(): Promise<Product[]> {
        const products = await productsMock
        return products
    }
}
export const productService = new ProductService();
