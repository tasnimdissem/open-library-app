import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-head-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
        <a routerLink="/wishlist" class="header-icon" title="Wishlist">
          ❤️ <span class="badge" *ngIf="wishlistCount > 0">{{ wishlistCount }}</span>
        </a>
        <a routerLink="/cart" class="header-icon" title="Shopping Cart">
          🛒 <span class="badge" *ngIf="cartCount > 0">{{ cartCount }}</span>
        </a>

        <div class="user-menu" *ngIf="currentUser">
          <button class="user-button" (click)="toggleMenu()">
            <span class="user-avatar">{{ getUserInitials() }}</span>
            <span class="user-name">{{ currentUser.name }}</span>
          </button>
          <div class="dropdown-menu" *ngIf="showMenu">
            <div class="user-info">
              <strong>{{ currentUser.name }}</strong>
              <small>{{ currentUser.email }}</small>
            </div>
            <button class="menu-item" (click)="signOut()">
              <span>🚪</span> Sign Out
            </button>
          </div>
        </div>

        <a routerLink="/sign-in" class="btn-sign-in" *ngIf="!currentUser">
          Sign In
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
      gap: 15px;
      align-items: center;
    }

    .header-icon {
      font-size: 1.5rem;
      cursor: pointer;
      position: relative;
      text-decoration: none;
      transition: transform 0.3s ease;
      padding: 8px;
      border-radius: 8px;
    }

    .header-icon:hover {
      transform: scale(1.1);
      background: rgba(255, 255, 255, 0.1);
    }

    .badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #ff6b6b;
      color: white;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: bold;
    }

    .user-menu {
      position: relative;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
      font-size: 0.95rem;
    }

    .user-button:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: white;
      color: #151f57;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
    }

    .user-name {
      font-weight: 600;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      min-width: 220px;
      overflow: hidden;
      animation: slideDown 0.2s ease-out;
      z-index: 1000;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .user-info {
      padding: 16px;
      background: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;
    }

    .user-info strong {
      display: block;
      color: #333;
      margin-bottom: 4px;
      font-size: 0.95rem;
    }

    .user-info small {
      color: #666;
      font-size: 0.85rem;
    }

    .menu-item {
      width: 100%;
      padding: 12px 16px;
      border: none;
      background: none;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #333;
      font-size: 0.95rem;
      transition: background 0.2s ease;
    }

    .menu-item:hover {
      background: #f8f9fa;
    }

    .menu-item span {
      font-size: 1.2rem;
    }

    .btn-sign-in {
      background: white;
      color: #151f57;
      padding: 10px 24px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      border: 2px solid white;
    }

    .btn-sign-in:hover {
      background: transparent;
      color: white;
      transform: translateY(-2px);
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
        gap: 12px;
      }

      .header-icon {
        font-size: 1.2rem;
      }

      .user-name {
        display: none;
      }
    }
  `]
})
export class HeadBarComponent implements OnInit {
  cartCount: number = 0;
  wishlistCount: number = 0;
  currentUser: User | null = null;
  showMenu: boolean = false;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.wishlistService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getUserInitials(): string {
    if (!this.currentUser) return '';
    const names = this.currentUser.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return this.currentUser.name.substring(0, 2).toUpperCase();
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  signOut(): void {
    this.authService.signOut();
    this.showMenu = false;
  }
}
