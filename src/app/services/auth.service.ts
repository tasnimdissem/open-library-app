import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    const storedUser = localStorage.getItem('current_user');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  signUp(email: string, password: string, name: string): boolean {
    // Get existing users
    const users = this.getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: this.generateId(),
      email,
      name,
      createdAt: new Date()
    };

    // Store user credentials (in real app, this would be backend)
    const userCredentials = {
      email,
      password: btoa(password), // Simple encoding (NOT secure for production!)
      user: newUser
    };

    users.push(userCredentials);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login after signup
    this.setCurrentUser(newUser);
    return true;
  }

  signIn(email: string, password: string): boolean {
    const users = this.getUsers();
    const encodedPassword = btoa(password);
    
    const userCredentials = users.find(
      u => u.email === email && u.password === encodedPassword
    );

    if (userCredentials) {
      this.setCurrentUser(userCredentials.user);
      return true;
    }

    return false;
  }

  signOut(): void {
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('current_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private getUsers(): any[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
