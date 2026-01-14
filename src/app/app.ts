import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeadBarComponent } from './components/head-bar/head-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeadBarComponent, SearchBarComponent, BookListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('open-library-app');

  constructor(private bookService: BookService, private router: Router) {}

  onSearchByTitle(title: string) {
    if (title.trim()) {
      this.bookService.searchByTitle(title).subscribe({
        next: (data) => {
          // Extract docs array from search results and limit to 50
          const results = (data.docs || []).slice(0, 50);
          this.bookService.setSearchResults(results);
          // Navigate to home page to show results
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Search error:', error);
        }
      });
    }
  }

  onSearchByYear(year: number) {
    if (year) {
      this.bookService.searchByYear(year).subscribe({
        next: (data) => {
          // Extract docs array from search results and limit to 50
          const results = (data.docs || []).slice(0, 50);
          this.bookService.setSearchResults(results);
          // Navigate to home page to show results
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Search error:', error);
        }
      });
    }
  }

  onReset() {
    // Reset search results to show default books
    this.bookService.setSearchResults([]);
    // Navigate to home page
    this.router.navigate(['/']);
  }
}
