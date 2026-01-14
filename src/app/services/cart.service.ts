import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  key: string;
  title: string;
  cover_id?: number;
  cover_i?: number;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>(this.loadCart());
  public cart$ = this.cart.asObservable();

  private cartCount = new BehaviorSubject<number>(this.loadCart().length);
  public cartCount$ = this.cartCount.asObservable();

  constructor() { }

  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }

  private saveCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart.next(cart);
    this.cartCount.next(cart.reduce((sum, item) => sum + item.quantity, 0));
  }

  addToCart(book: any, price: number = 19.99) {
    const cart = this.cart.value;
    const bookId = book.key || book.id;
    const existingItem = cart.find(item => item.key === bookId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: bookId,
        key: bookId,
        title: book.title,
        cover_id: book.cover_id,
        cover_i: book.cover_i,
        price: price,
        quantity: 1
      });
    }

    this.saveCart([...cart]);
  }

  removeFromCart(bookKey: string) {
    const cart = this.cart.value.filter(item => item.key !== bookKey);
    this.saveCart(cart);
  }

  updateQuantity(bookKey: string, quantity: number) {
    const cart = this.cart.value.map(item =>
      item.key === bookKey ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0);
    this.saveCart(cart);
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cart.next([]);
    this.cartCount.next(0);
  }

  getTotal(): number {
    return this.cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItems(): CartItem[] {
    return this.cart.value;
  }

  getCartCount(): number {
    return this.cart.value.reduce((sum, item) => sum + item.quantity, 0);
  }
}
