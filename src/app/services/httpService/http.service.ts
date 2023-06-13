import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  postMethod(url:string, payload:{}, token:boolean=false, httpOptions:any) {
    return this.http.post(url, payload, token && httpOptions)
  }

  putMethod(url:string, payload:{}, token:boolean, httpOptions:any) {
    return this.http.put(url, payload, token && httpOptions)
  }

  getMethod(url:string, token:boolean=false, httpOptions:any) {
    return this.http.get(url, token && httpOptions)
  }

  deleteMethod(url:string,token:boolean,httpOption:any){
    return this.http.delete(url,token && httpOption)
  }
}
