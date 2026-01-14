import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface WishlistItem {
  id: string;
  key: string;
  title: string;
  cover_id?: number;
  cover_i?: number;
  addedDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist = new BehaviorSubject<WishlistItem[]>(this.loadWishlist());
  public wishlist$ = this.wishlist.asObservable();

  private wishlistCount = new BehaviorSubject<number>(this.loadWishlist().length);
  public wishlistCount$ = this.wishlistCount.asObservable();

  constructor() { }

  private loadWishlist(): WishlistItem[] {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  }

  private saveWishlist(wishlist: WishlistItem[]) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    this.wishlist.next(wishlist);
    this.wishlistCount.next(wishlist.length);
  }

  addToWishlist(book: any) {
    const wishlist = this.wishlist.value;
    const bookKey = book.key || book.id;
    const exists = wishlist.some(item => item.key === bookKey);

    if (!exists) {
      wishlist.push({
        id: bookKey,
        key: bookKey,
        title: book.title,
        cover_id: book.cover_id,
        cover_i: book.cover_i,
        addedDate: new Date()
      });
      this.saveWishlist([...wishlist]);
    }
  }

  removeFromWishlist(bookKey: string) {
    const wishlist = this.wishlist.value.filter(item => item.key !== bookKey);
    this.saveWishlist(wishlist);
  }

  isInWishlist(bookKey: string): boolean {
    return this.wishlist.value.some(item => item.key === bookKey);
  }

  clearWishlist() {
    localStorage.removeItem('wishlist');
    this.wishlist.next([]);
    this.wishlistCount.next(0);
  }

  getWishlistItems(): WishlistItem[] {
    return this.wishlist.value;
  }

  getWishlistCount(): number {
    return this.wishlist.value.length;
  }
}
