import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private apiURLAuthors = 'http://127.0.0.1:8000/api/authors/';

  constructor(private _httpClient: HttpClient) { }

  public getAuthors(): Observable<Author[]>{
    return this._httpClient.get<Author[]>(this.apiURLAuthors);
  }

  insertAuthor(author: Author) : Observable<Object>{
    return this._httpClient.post(this.apiURLAuthors, author);
  }

  deleteAuthor(id: number): Observable<Object> {
    return this._httpClient.delete(`${this.apiURLAuthors}${id}`);
  }

  updateAuthor(id: number, author: Author): Observable<Object> {
    return this._httpClient.put(`${this.apiURLAuthors}${id}`, author);
  }
  
}
