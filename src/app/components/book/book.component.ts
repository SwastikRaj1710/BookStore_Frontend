import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/bookService/book.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { SearchService } from 'src/app/services/searchService/search.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {

  bookData:any;
  books:any=[];
  count: number = 0
  subscription!: Subscription;
  message:string='';

  @Output() countEvent = new EventEmitter<number>();
  
  constructor(private book:BookService, private data:DataService, private route:Router, private search:SearchService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentBook.subscribe(bookData => this.bookData = bookData);
    this.subscription = this.search.currentMessage.subscribe(message => this.message = message);
    this.getBooks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getBooks() {
    this.book.getBooks().subscribe((res:any)=>{
      this.books = res.data;
      this.count = this.books.length;
      this.sendCount();
    })
  }

  sendCount() {
    this.countEvent.emit(this.count)
  }

  openBook(bookData:any) {
    console.log(bookData);
    this.data.changeBook(bookData);
    this.route.navigateByUrl('/home/book');
  }

}
