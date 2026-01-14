import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-container">
      <button class="back-btn" onclick="window.history.back()">← Back</button>
      
      <h1>🛒 Shopping Cart</h1>
      
      <div *ngIf="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty</p>
        <a href="/" class="continue-btn">Continue Shopping</a>
      </div>

      <div *ngIf="cartItems.length > 0" class="cart-content">
        <div class="cart-items">
          <div *ngFor="let item of cartItems" class="cart-item">
            <img [src]="getCoverImage(item)" [alt]="item.title" class="item-cover" />
            <div class="item-details">
              <h3>{{ item.title }}</h3>
              <p class="item-price">\${{ item.price.toFixed(2) }}</p>
            </div>
            <div class="item-quantity">
              <button (click)="decreaseQuantity(item.key)">-</button>
              <span>{{ item.quantity }}</span>
              <button (click)="increaseQuantity(item.key)">+</button>
            </div>
            <div class="item-total">
              \${{ (item.price * item.quantity).toFixed(2) }}
            </div>
            <button class="remove-btn" (click)="removeItem(item.key)">✕</button>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>\${{ getSubtotal().toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>\${{ shippingCost.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Tax:</span>
            <span>\${{ getTax().toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>\${{ getTotal().toFixed(2) }}</span>
          </div>
          <button class="checkout-btn" (click)="checkout()">Proceed to Checkout</button>
          <button class="clear-btn" (click)="clearCart()">Clear Cart</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  shippingCost: number = 5.00;
  taxRate: number = 0.08;

  constructor(private cartService: CartService, private toastService: ToastService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getCoverImage(item: any): string {
    if (item.cover_id) {
      return `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`;
    } else if (item.cover_i) {
      return `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`;
    }
    return 'https://via.placeholder.com/80x120/151f57/ffffff?text=No+Cover';
  }

  increaseQuantity(key: string) {
    const item = this.cartItems.find(i => i.key === key);
    if (item) {
      this.cartService.updateQuantity(key, item.quantity + 1);
    }
  }

  decreaseQuantity(key: string) {
    const item = this.cartItems.find(i => i.key === key);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(key, item.quantity - 1);
    }
  }

  removeItem(key: string) {
    this.cartService.removeFromCart(key);
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTax(): number {
    return this.getSubtotal() * this.taxRate;
  }

  getTotal(): number {
    return this.getSubtotal() + this.shippingCost + this.getTax();
  }

  checkout() {
    if (this.cartItems.length === 0) {
      this.toastService.info('Your cart is empty. Add some books first!');
      return;
    }
    const total = this.getTotal().toFixed(2);
    this.toastService.success(`Checkout successful! Total: $${total}`);
    this.cartService.clearCart();
  }
}
