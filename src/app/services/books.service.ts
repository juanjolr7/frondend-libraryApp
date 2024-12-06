import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiURL = 'http://127.0.0.1:8000/api/books/';

  constructor(private _httpClient: HttpClient) { }

  public getBooks(): Observable<Book[]>{
    return this._httpClient.get<Book[]>(this.apiURL);
  }
}
