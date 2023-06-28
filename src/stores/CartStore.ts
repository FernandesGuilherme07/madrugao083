import Cookies from 'js-cookie';
import { isEqual } from 'lodash';
import { makeObservable, observable, action, computed } from 'mobx';

import { ICartStore } from 'src/constracts/Stores/ICartStore';
import { CartItem } from 'src/model/CartItem';


class CartStore implements ICartStore{
   
    itens: CartItem[] = [];
  
    constructor() {
      makeObservable(this, {
        itens: observable,
        AddItem: action,
        RemoveItem: action,
        GetItemToCartById: action,
        PriceToProductWithAdicional: action,
        ClearCart: action.bound,
        totalPrice: computed,
        quatityItensToCart: computed,
      });

      const cartCookie = Cookies.get('cart');
      if (cartCookie) {
        this.itens = JSON.parse(cartCookie);
      }
    }

    PriceToProductWithAdicional(id: number): number {
      const item = this.GetItemToCartById(id);
    
      if (item === undefined) {
        return 0;
      }
      let total = item.productPrice;

      if (item.aditionals) {
          item.aditionals.forEach((aditional) => {
            total += aditional.price;
          });
      }
      return total;
      
    }
    
    saveItemsToCookies() {
      Cookies.set('cart', JSON.stringify(this.itens));
    }

    private set setitens(item: CartItem) {
      const itemIndex = this.itens.findIndex(i => {
        const { aditionals, productId } = i
        return isEqual(aditionals, item.aditionals) && productId === item.productId;
      } )

      if (itemIndex > -1) {
        this.itens[itemIndex].qt += item.qt;
      } else {
        this.itens.push(item);
      }
    }
    
    async AddItem(item: CartItem) {
     
      this.setitens = item

      this.saveItemsToCookies();
    }
    
    async RemoveItem(itemId: number): Promise<void> {
      const item = this.itens.find((item) => item.id === itemId);

      this.itens = this.itens.filter((item) => item.id !== itemId);

      if(item!.qt > 1) {
        const updatedItem: CartItem = {id: item!.id, qt: item!.qt - 1, prdouctName: item!.prdouctName, productId: item!.productId, productPrice: item!.productPrice }

        this.AddItem(updatedItem)
      } 

      this.saveItemsToCookies();
    }

    GetItemToCartById(id: number) {
      return this.itens.find(item => item.id === id)
    }

    ClearCart() {
      this.itens = [];
      this.saveItemsToCookies();
    }

    get totalPrice(): number {
      let total = 0;
      this.itens.forEach((item) => {
        total += item.productPrice * item.qt;
        if (item.aditionals) {
          item.aditionals.forEach((aditional) => {
            total += aditional.price;
          });
        }
      });
      return total;
    }
    
    get quatityItensToCart(): number {
        return this.itens.length
    }

  }
  export const cartStore = new CartStore()
   
  