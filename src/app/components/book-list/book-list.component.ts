import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="book-list-container">
      <div class="results-info" *ngIf="!isLoading && booksList.length > 0">
        <span class="count-badge">📖 {{booksList.length}} books found</span>
      </div>

      <div *ngIf="isLoading" class="loading">
        <div class="spinner"></div>
        <p>Loading amazing books...</p>
      </div>

      <div *ngIf="errorMessage" class="error-message">
        <span class="error-icon">⚠️</span>
        {{ errorMessage }}
      </div>

      <div *ngIf="!isLoading && booksList.length > 0" class="books-grid">
        <div *ngFor="let book of booksList; let i = index" 
             class="book-card" 
             (click)="viewBookDetails(book)"
             [style.animation-delay]="(i * 0.05) + 's'">
          <div class="book-cover">
            <img 
              [src]="getCoverImage(book)" 
              [alt]="book.title"
              onerror="this.src='https://via.placeholder.com/200x280/667eea/ffffff?text=No+Cover'"
            />
            <div class="book-overlay">
              <span class="view-details">View Details</span>
            </div>
          </div>
          <div class="book-info">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-subtitle" *ngIf="book.subtitle">{{ book.subtitle }}</p>
            <div class="book-meta">
              <span class="meta-tag" *ngIf="book.first_publish_year">
                📅 {{ book.first_publish_year }}
              </span>
              <span class="meta-tag" *ngIf="book.edition_count">
                📚 {{ book.edition_count }} ed.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="!isLoading && booksList.length === 0 && !errorMessage" class="no-books">
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No books found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .book-list-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .results-info {
      display: flex;
      justify-content: center;
      margin-bottom: 25px;
      animation: fadeIn 0.5s ease-out;
    }

    .count-badge {
      background: #667eea;
      color: white;
      padding: 10px 24px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 1rem;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
    }

    .loading {
      text-align: center;
      padding: 60px 20px;
      animation: fadeIn 0.5s ease-out;
    }

    .spinner {
      width: 60px;
      height: 60px;
      margin: 0 auto 20px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading p {
      font-size: 1.2rem;
      color: #667eea;
      font-weight: 600;
    }

    .error-message {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
      color: white;
      padding: 20px;
      border-radius: 15px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
      animation: shake 0.5s ease-out;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }

    .error-icon {
      font-size: 1.5rem;
    }

    .no-books {
      padding: 60px 20px;
    }

    .empty-state {
      text-align: center;
      animation: fadeIn 0.6s ease-out;
    }

    .empty-icon {
      font-size: 5rem;
      margin-bottom: 20px;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }

    .empty-state h3 {
      font-size: 1.8rem;
      color: #333;
      margin: 0 0 10px 0;
    }

    .empty-state p {
      color: #666;
      font-size: 1.1rem;
    }

    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 25px;
    }

    .book-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      cursor: pointer;
      animation: fadeInUp 0.5s ease-out backwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .book-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .book-cover {
      width: 100%;
      height: 280px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    .book-cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .book-card:hover .book-cover img {
      transform: scale(1.1);
    }

    .book-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(102, 126, 234, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .book-card:hover .book-overlay {
      opacity: 1;
    }

    .view-details {
      color: white;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .book-info {
      padding: 18px;
    }

    .book-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #333;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }

    .book-subtitle {
      font-size: 0.85rem;
      color: #666;
      margin: 5px 0 10px 0;
      font-style: italic;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .book-meta {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .meta-tag {
      font-size: 0.75rem;
      padding: 4px 10px;
      background: #667eea;
      color: white;
      border-radius: 10px;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .books-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 15px;
      }

      .book-cover {
        height: 220px;
      }

      .book-info {
        padding: 12px;
      }

      .book-title {
        font-size: 0.95rem;
      }

      .count-badge {
        font-size: 0.95rem;
        padding: 10px 20px;
      }
    }
  `]
})
export class BookListComponent implements OnInit {
  booksList: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.loadBooks();
    // S'abonner aux résultats de recherche
    this.bookService.getSearchResults$().subscribe(results => {
      if (results.length > 0) {
        this.booksList = results;
        this.errorMessage = '';
      }
    });
  }

  loadBooks() {
    this.isLoading = true;
    this.errorMessage = '';
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.booksList = data.works || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading books. Please try again later.';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  getCoverImage(book: any): string {
    // Handle both API formats: cover_id from subjects API and cover_i from search API
    if (book.cover_id) {
      return `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;
    } else if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    return 'https://via.placeholder.com/200x280/667eea/ffffff?text=No+Cover';
  }

  viewBookDetails(book: any) {
    // Handle different API response formats
    let id = '';
    
    // From subjects API: key format is /works/OL17365W
    if (book.key && book.key.includes('/works/')) {
      id = book.key.split('/').pop();
    }
    // From search API: key might be in different formats
    else if (book.key) {
      id = book.key;
    }
    // From search API: might have work_key array
    else if (book.work_key && book.work_key.length > 0) {
      id = book.work_key[0];
    }
    // From search API: might have edition_key
    else if (book.edition_key && book.edition_key.length > 0) {
      // Use edition instead of work if that's all we have
      this.router.navigate(['/book', book.edition_key[0]]);
      return;
    }
    
    if (id) {
      this.router.navigate(['/book', id]);
    } else {
      console.error('No valid book ID found', book);
    }
  }
}
