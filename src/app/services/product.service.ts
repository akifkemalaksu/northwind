import { ResponseModel } from './../models/responseModels/responseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { DataResponseModel } from '../models/responseModels/dataResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = "https://localhost:44314/api/";

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<DataResponseModel<Product[]>> {
    let newPath = `${this.apiUrl}products/getall`;
    return this.httpClient.get<DataResponseModel<Product[]>>(newPath);
  }

  getProductsByCategory(categoryId: number): Observable<DataResponseModel<Product[]>> {
    let newPath = `${this.apiUrl}products/getbycategory?categoryId=${categoryId}`;
    return this.httpClient.get<DataResponseModel<Product[]>>(newPath);
  }

  add(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(`${this.apiUrl}products/add`, product);
  }
}
