import { Injectable } from '@angular/core';
import { Product, PokemonProduct } from './products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }

  items: Product[] = [];
  itemsP: any[] = [];

  addToCart(product: Product) {
    this.items.push(product);
  }

  addToCartP(product: any) {
    this.itemsP.push(product);
  }

  getItems() {
    return this.items;
  }

  getItemsP() {
    return this.itemsP;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
