import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/bookService/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { DataService } from 'src/app/services/dataService/data.service';
import { WishlistService } from 'src/app/services/wishlistService/wishlist.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  bookData:any;
  subscription!:Subscription;
  constructor(private data:DataService, private snackBar:MatSnackBar, private cart:CartService, private wishlist:WishlistService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentBook.subscribe(bookData => this.bookData = bookData)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addToCart(bookId:number, message:string) {
    this.cart.addToCart(bookId).subscribe((res:any) => {
      console.log(res);
      this.snackBar.open(message, '', {
        duration: 3000,
      });
    },(error: any)=>{
      this.snackBar.open("Unable to add Book to Cart", '', {
        duration: 3000,
      })
      console.log(error)
    })
  }

  addToWishlist(bookId:number, message:string) {
    this.wishlist.addToWishlist(bookId).subscribe((res:any) => {
      console.log(res);
      this.snackBar.open(message, '', {
        duration: 3000,
      });
    },(error: any)=>{
      this.snackBar.open("Unable to add Book to Wishlist", '', {
        duration: 3000,
      })
      console.log(error)
    })
  }

}
