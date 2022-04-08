import { DataResponseModel } from './../models/responseModels/dataResponseModel';
import { Observable } from 'rxjs';
import { TokenModel } from './../models/responseModels/tokenModel';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './../models/requestModels/loginModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44314/api/auth/";

  constructor(private http: HttpClient) { }

  login(loginModel: LoginModel): Observable<DataResponseModel<TokenModel>> {
    return this.http.post<DataResponseModel<TokenModel>>(`${this.apiUrl}login`, loginModel);
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }
}
