import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  bUrl : string = environment.baseUrl;

  constructor(private httpservice:HttpService) { }
  
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
}
