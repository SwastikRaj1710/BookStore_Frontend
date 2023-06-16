import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private bookSource = new BehaviorSubject('default message');
  currentBook = this.bookSource.asObservable();

  constructor() { }

  changeBook(book: any) {
    this.bookSource.next(book);
  }
}
