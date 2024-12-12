import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiURL = 'http://127.0.0.1:8000/api/categories/';
  constructor(private _httpClient: HttpClient) { }

  public getCategories(): Observable<Category[]>{
    return this._httpClient.get<Category[]>(this.apiURL);
  }
}
