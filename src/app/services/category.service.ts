import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { DataResponseModel } from '../models/responseModels/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = "https://localhost:44314/api/categories/getall";

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<DataResponseModel<Category[]>> {
    return this.httpClient.get<DataResponseModel<Category[]>>(this.apiUrl);
  }
}
