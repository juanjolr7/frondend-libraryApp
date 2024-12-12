import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user)); // Persistir en localStorage
  }

  getCurrentUser(): User | null {
    const user = this.currentUserSubject.value;
    if (user) {
      return user;
    }
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  clearCurrentUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }


}
