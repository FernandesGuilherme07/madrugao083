import { action, makeObservable, observable } from "mobx";
import { IProductService } from "src/contracts/Services/IProductService";
import { IProductStore } from "src/contracts/Stores/IProductStore";
import { Product } from "src/models/Product";

export class ProductStore implements IProductStore {
    product: Product[] = [];
    
    constructor(private ProductService: IProductService) {
        makeObservable(this, {
          product: observable,
          GetAllProducts: action,
          GetProductById: action,
        });
    }
    
    async GetAllProducts(): Promise<Product[]> {
       this.product = await this.ProductService.GetAllProducts()
       return this.product
    }
    async GetProductById(id: number): Promise<Product > {
        return await this.ProductService.GetProductById(id)
    }
    
}
