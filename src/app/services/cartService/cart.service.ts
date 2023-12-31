import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  bUrl : string = environment.baseUrl
  tokenValue : string|null;
  constructor(private http:HttpService) {
    this.tokenValue = localStorage.getItem('token');
  }

  getBooks() {
    let header = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenValue
      })
    }
    return this.http.getMethod(this.bUrl + 'Cart',true,header)
  }

  addToCart(bookId:number) {
    let header = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenValue
      })
    }
    return this.http.postMethod(`${this.bUrl}Cart/${bookId}`, {},true,header)
  }

  removeFromCart(bookId:number) {
    let header = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenValue
      })
    }
    return this.http.deleteMethod(`${this.bUrl}Cart/${bookId}`,true,header)
  }

  updateQuantity(data:any, bookId:number) {
    let header = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenValue
      })
    }
    return this.http.putMethod(`${this.bUrl}Cart/${bookId}`, data, true,header)
  }

  removeAll() {
    let header = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenValue
      })
    }
    return this.http.deleteMethod(this.bUrl + 'Cart', true,header)
  }

}
