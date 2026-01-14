import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="search-bar">
      <div class="search-container">
        <div class="search-group">
          <div class="input-wrapper">
            <input 
              id="titleInput"
              type="text" 
              [(ngModel)]="titleSearch"
              (ngModelChange)="onTitleChange($event)"
              (keyup.enter)="onSearchTitle()"
              placeholder="🔍 Search books by title..."
              class="search-input"
            />
            <button *ngIf="titleSearch" class="clear-btn" (click)="clearTitle()">✕</button>
          </div>
          <button class="search-btn primary" (click)="onSearchTitle()">Search</button>
        </div>

        <div class="search-group">
          <div class="input-wrapper">
            <input 
              id="yearInput"
              type="number" 
              [(ngModel)]="yearSearch"
              (ngModelChange)="onYearChange($event)"
              (keyup.enter)="onSearchYear()"
              placeholder="📅 Search by year..."
              class="search-input"
            />
            <button *ngIf="yearSearch" class="clear-btn" (click)="clearYear()">✕</button>
          </div>
          <button class="search-btn secondary" (click)="onSearchYear()">Search</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-bar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
      margin-bottom: 30px;
      animation: slideDown 0.5s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .search-container {
      display: flex;
      gap: 15px;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-group {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 300px;
    }

    .input-wrapper {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
    }

    .search-input {
      padding: 14px 40px 14px 16px;
      border: none;
      border-radius: 12px;
      flex: 1;
      font-size: 1rem;
      background: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    .clear-btn {
      position: absolute;
      right: 10px;
      background: transparent;
      border: none;
      color: #999;
      cursor: pointer;
      font-size: 1.2rem;
      padding: 5px;
      transition: all 0.2s ease;
    }

    .clear-btn:hover {
      color: #ff4757;
      transform: scale(1.2);
    }

    .search-btn {
      padding: 14px 28px;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      white-space: nowrap;
    }

    .search-btn.primary {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .search-btn.primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 15px rgba(245, 87, 108, 0.4);
    }

    .search-btn.secondary {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
    }

    .search-btn.secondary:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 15px rgba(79, 172, 254, 0.4);
    }

    @media (max-width: 768px) {
      .search-bar {
        padding: 20px;
      }

      .search-container {
        flex-direction: column;
        gap: 15px;
      }

      .search-group {
        width: 100%;
        min-width: auto;
        flex-direction: column;
      }

      .input-wrapper {
        width: 100%;
      }

      .search-btn {
        width: 100%;
      }
    }
  `]
})
export class SearchBarComponent {
  @Output() searchByTitle = new EventEmitter<string>();
  @Output() searchByYear = new EventEmitter<number>();
  @Output() reset = new EventEmitter<void>();

  titleSearch: string = '';
  yearSearch: number | null = null;

  onTitleChange(value: string) {
    if (value.trim().length > 2) {
      this.searchByTitle.emit(value);
    }
  }

  onYearChange(value: number | null) {
    if (value && value.toString().length === 4) {
      this.searchByYear.emit(value);
    }
  }

  onSearchTitle() {
    if (this.titleSearch.trim()) {
      this.searchByTitle.emit(this.titleSearch);
    }
  }

  onSearchYear() {
    if (this.yearSearch) {
      this.searchByYear.emit(this.yearSearch);
    }
  }

  clearTitle() {
    this.titleSearch = '';
    this.reset.emit();
  }

  clearYear() {
    this.yearSearch = null;
    this.reset.emit();
  }

  resetSearch() {
    this.titleSearch = '';
    this.yearSearch = null;
    this.reset.emit();
  }
}
