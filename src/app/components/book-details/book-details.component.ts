import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book: any;
  bookId: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id') || '';
      if (this.bookId) {
        this.loadBookDetails();
      }
    });
  }

  loadBookDetails() {
    this.isLoading = true;
    this.errorMessage = '';
    this.bookService.getBookById(this.bookId).subscribe({
      next: (data) => {
        this.book = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading book details. Please try again later.';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  getCoverImage(coverId: number): string {
    if (coverId) {
      return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    }
    return 'https://via.placeholder.com/300x400/667eea/ffffff?text=No+Cover';
  }

  getDescription(): string {
    if (!this.book || !this.book.description) {
      return '';
    }
    // Description can be a string or an object with a 'value' property
    if (typeof this.book.description === 'string') {
      return this.book.description;
    }
    if (typeof this.book.description === 'object' && this.book.description.value) {
      return this.book.description.value;
    }
    return '';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
