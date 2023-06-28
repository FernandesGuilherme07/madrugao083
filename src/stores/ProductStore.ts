import { action, makeObservable, observable } from "mobx";
import { IProductService } from "src/constracts/Services/IProductService";
import { IProductStore } from "src/constracts/Stores/IProductStore";
import { Product } from "src/model/Product";

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
