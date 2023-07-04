import Cookies from 'js-cookie';
import { isEqual } from 'lodash';
import { makeObservable, observable, action, computed } from 'mobx';

import { ICartStore } from 'src/contracts/Stores/ICartStore';
import { CartItem } from 'src/models/CartItem';


class CartStore implements ICartStore{
   
    itens: CartItem[] = [];
  
    constructor() {
      makeObservable(this, {
        itens: observable,
        AddItem: action.bound,
        RemoveItem: action.bound,
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
    
      let total = item.productPrice * item.qt;
    
      return total;
    }
    
    
    saveItemsToCookies() {
      Cookies.set('cart', JSON.stringify(this.itens));
    }

    async AddItem(item: CartItem) {
      const itemIndex = this.itens.findIndex(i => {
        const { aditionals, productId } = i
        return isEqual(aditionals, item.aditionals) && productId === item.productId;
      } )

      if (itemIndex > -1) {
        this.itens[itemIndex].qt += item.qt;
      } else {
        this.itens.push(item);
      }

      this.saveItemsToCookies();
    }
    
    async RemoveItem(itemId: number): Promise<void> {
      const updatedItems = this.itens.reduce((acc: any, item) => {
        if (item.id === itemId) {
          if (item.qt > 1) {
            const updatedItem: CartItem = {
              id: item.id,
              qt: item.qt - 1,
              prdouctName: item.prdouctName,
              productId: item.productId,
              productPrice: item.productPrice
            };
            acc.push(updatedItem);
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    
      this.itens = updatedItems;
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
      });
      return total;
    }
    
    get quatityItensToCart(): number {
        return this.itens.length
    }

  }
  export const cartStore = new CartStore()
   
  