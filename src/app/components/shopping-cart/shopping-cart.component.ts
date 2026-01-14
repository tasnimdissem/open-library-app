import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

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
          <button class="checkout-btn">Proceed to Checkout</button>
          <button class="clear-btn" (click)="clearCart()">Clear Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 30px 20px;
    }

    .back-btn {
      background: #151f57;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-bottom: 20px;
    }

    h1 {
      color: #151f57;
      margin-bottom: 30px;
    }

    .empty-cart {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .continue-btn {
      background: #151f57;
      color: white;
      padding: 12px 30px;
      border-radius: 5px;
      text-decoration: none;
      margin-top: 20px;
      display: inline-block;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 30px;
    }

    .cart-items {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .cart-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      border-bottom: 1px solid #eee;
    }

    .item-cover {
      width: 80px;
      height: 120px;
      object-fit: cover;
      border-radius: 5px;
    }

    .item-details {
      flex: 1;
    }

    .item-price {
      color: #151f57;
      font-weight: 600;
    }

    .item-quantity {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .item-quantity button {
      background: #151f57;
      color: white;
      border: none;
      width: 30px;
      height: 30px;
      cursor: pointer;
      border-radius: 3px;
    }

    .item-total {
      min-width: 100px;
      text-align: right;
      font-weight: 600;
      color: #151f57;
    }

    .remove-btn {
      background: #ff6b6b;
      color: white;
      border: none;
      width: 30px;
      height: 30px;
      cursor: pointer;
      border-radius: 3px;
    }

    .cart-summary {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      height: fit-content;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #eee;
    }

    .summary-row.total {
      font-size: 1.2rem;
      font-weight: bold;
      color: #151f57;
      border-bottom: 2px solid #151f57;
    }

    .checkout-btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #151f57, #0f1438);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      margin-top: 20px;
    }

    .clear-btn {
      width: 100%;
      padding: 10px;
      background: #ddd;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any[] = [];
  shippingCost: number = 5.00;
  taxRate: number = 0.08;

  constructor(private cartService: CartService) { }

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
}
