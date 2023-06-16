import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/services/bookService/book.service';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.scss']
})
export class DisplayBookComponent implements OnInit {

  count: number = 0
  @Output() countEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    
  }

  receiveCount($event:number) {
    this.count = $event;
    this.countEvent.emit(this.count)
  }

}
