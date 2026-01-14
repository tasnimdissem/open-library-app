import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Book {
  key: string;
  title: string;
  edition_count: number;
  cover_id: number;
  first_publish_year: number;
  subtitle: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private searchResults = new BehaviorSubject<any[]>([]);
  public searchResults$ = this.searchResults.asObservable();

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get('https://openlibrary.org/subjects/computers.json');
  }

  getBookById(id: string): Observable<any> {
    return this.http.get(`https://openlibrary.org/works/${id}.json`);
  }

  searchByTitle(title: string): Observable<any> {
    return this.http.get(`https://openlibrary.org/search.json?title=${title}`);
  }

  searchByYear(year: number): Observable<any> {
    return this.http.get(`https://openlibrary.org/search.json?first_publish_year=${year}`);
  }

  getBooksList() {
    return this.http.get(
      'https://openlibrary.org/subjects/computers.json'
    );
  }

  setSearchResults(results: any[]) {
    this.searchResults.next(results);
  }

  getSearchResults$() {
    return this.searchResults$;
  }
}

