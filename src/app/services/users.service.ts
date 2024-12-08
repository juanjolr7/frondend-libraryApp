import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURLUsers = 'http://127.0.0.1:8000/api/users/';
  constructor(private _httpClient: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this._httpClient.get<User[]>(this.apiURLUsers);
  }

  insertUser(user: User) : Observable<Object>{
    return this._httpClient.post(this.apiURLUsers, user);
  }

  deleteUser(id: number): Observable<Object> {
    return this._httpClient.delete(`${this.apiURLUsers}${id}`);
  }

  updateUser(id: number, user: User): Observable<Object> {
    return this._httpClient.put(`${this.apiURLUsers}${id}`, user);
  }
  
}
