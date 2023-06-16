import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  bUrl : string = environment.baseUrl;
  tokenValue : string|null;
  constructor(private httpservice:HttpService) {
    this.tokenValue = localStorage.getItem('token');
  }
  
  registration(data : {}) {
    let header = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.httpservice.postMethod(this.bUrl + 'User/Register', data, false, header)
  }

  login(data : {}) {
    let header = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.httpservice.postMethod(this.bUrl + 'User/Login', data, false, header)
  }

  getDetails() {
    let header = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenValue
      })
    }
    return this.httpservice.getMethod(this.bUrl + 'User',true,header)
  }
}
