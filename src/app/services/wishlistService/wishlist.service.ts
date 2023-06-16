import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../httpService/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
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
    return this.http.getMethod(this.bUrl + 'Wishlist',true,header)
  }

  addToWishlist(bookId:number) {
    let header = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenValue
      })
    }
    return this.http.postMethod(`${this.bUrl}Wishlist/${bookId}`, {},true,header)
  }

  removeFromWishlist(bookId:number) {
    let header = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenValue
      })
    }
    return this.http.deleteMethod(`${this.bUrl}Wishlist/${bookId}`,true,header)
  }
}
