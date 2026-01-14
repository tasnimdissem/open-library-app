import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-head-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <div class="logo-container">
        <img src="images.jpg" alt="IHEC Logo" class="logo" />
        <div class="title-group">
          <h1>IHEC Library</h1>
          <p class="subtitle">Book Search Platform for Students</p>
        </div>
      </div>
      
      <div class="header-actions">
        <a href="/wishlist" class="header-icon">
          ❤️ <span class="badge" *ngIf="wishlistCount > 0">{{ wishlistCount }}</span>
        </a>
        <a href="/cart" class="header-icon">
          🛒 <span class="badge" *ngIf="cartCount > 0">{{ cartCount }}</span>
        </a>
      </div>
    </header>
  `,
  styles: [`
    header {
      background: linear-gradient(135deg, #151f57 0%, #0f1438 100%);
      color: white;
      padding: 20px;
      text-align: center;
      margin-bottom: 30px;
      position: relative;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      position: relative;
      z-index: 1;
      flex: 1;
    }

    .logo {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border-radius: 10px;
    }

    .title-group {
      text-align: left;
    }

    h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .subtitle {
      margin: 8px 0 0 0;
      font-size: 1rem;
      opacity: 0.95;
      font-weight: 400;
      letter-spacing: 0.3px;
    }

    .header-actions {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .header-icon {
      font-size: 1.5rem;
      cursor: pointer;
      position: relative;
      text-decoration: none;
      transition: transform 0.3s ease;
    }

    .header-icon:hover {
      transform: scale(1.1);
    }

    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #ff6b6b;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      header {
        flex-direction: column;
        gap: 15px;
      }

      .logo-container {
        flex-direction: column;
        gap: 10px;
      }

      .title-group {
        text-align: center;
      }

      .logo {
        width: 60px;
        height: 60px;
      }

      h1 {
        font-size: 1.8rem;
      }

      .header-actions {
        gap: 15px;
      }

      .header-icon {
        font-size: 1.2rem;
      }
    }
  `]
})
export class HeadBarComponent implements OnInit {
  cartCount: number = 0;
  wishlistCount: number = 0;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.wishlistService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });
  }
}
