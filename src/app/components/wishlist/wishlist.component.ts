import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wishlist-container">
      <button class="back-btn" onclick="window.history.back()">← Back</button>
      
      <h1>❤️ My Wishlist</h1>
      
      <div *ngIf="wishlistItems.length === 0" class="empty-wishlist">
        <p>Your wishlist is empty</p>
        <a href="/" class="continue-btn">Continue Shopping</a>
      </div>

      <div *ngIf="wishlistItems.length > 0" class="wishlist-content">
        <div class="wishlist-grid">
          <div *ngFor="let item of wishlistItems" class="wishlist-card">
            <div class="card-image">
              <img [src]="getCoverImage(item)" [alt]="item.title" />
            </div>
            <div class="card-content">
              <h3>{{ item.title }}</h3>
              <p class="added-date">Added: {{ formatDate(item.addedDate) }}</p>
              <div class="card-actions">
                <button class="add-cart-btn" (click)="addToCart(item)">Add to Cart</button>
                <button class="remove-btn" (click)="removeFromWishlist(item.key)">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <div class="wishlist-actions">
          <button class="clear-btn" (click)="clearWishlist()">Clear Wishlist</button>
          <button class="add-all-btn" (click)="addAllToCart()">Add All to Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wishlist-container {
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

    .empty-wishlist {
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

    .wishlist-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .wishlist-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .wishlist-card:hover {
      transform: translateY(-5px);
    }

    .card-image {
      width: 100%;
      height: 250px;
      overflow: hidden;
      background: #f5f5f5;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-content {
      padding: 15px;
    }

    .card-content h3 {
      margin: 0 0 5px 0;
      font-size: 1rem;
      color: #151f57;
    }

    .added-date {
      font-size: 0.85rem;
      color: #999;
      margin-bottom: 10px;
    }

    .card-actions {
      display: flex;
      gap: 8px;
    }

    .add-cart-btn, .remove-btn {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }

    .add-cart-btn {
      background: #151f57;
      color: white;
    }

    .remove-btn {
      background: #ff6b6b;
      color: white;
    }

    .wishlist-actions {
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .clear-btn, .add-all-btn {
      padding: 12px 30px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
    }

    .clear-btn {
      background: #ddd;
      color: #333;
    }

    .add-all-btn {
      background: linear-gradient(135deg, #151f57, #0f1438);
      color: white;
    }

    @media (max-width: 768px) {
      .wishlist-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
    }
  `]
})
export class WishlistComponent implements OnInit {
  wishlistItems: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  getCoverImage(item: any): string {
    if (item.cover_id) {
      return `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`;
    } else if (item.cover_i) {
      return `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`;
    }
    return 'https://via.placeholder.com/200x280/151f57/ffffff?text=No+Cover';
  }

  removeFromWishlist(key: string) {
    this.wishlistService.removeFromWishlist(key);
  }

  clearWishlist() {
    if (confirm('Clear your wishlist?')) {
      this.wishlistService.clearWishlist();
    }
  }

  addToCart(item: any) {
    this.cartService.addToCart(item, 19.99);
    alert('Added to cart!');
  }

  addAllToCart() {
    this.wishlistItems.forEach(item => {
      this.cartService.addToCart(item, 19.99);
    });
    alert('All items added to cart!');
  }

  formatDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }
}
