import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookService/book.service';
import { WishlistService } from 'src/app/services/wishlistService/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  ids:any=[];
  books:any=[];
  count:number=0;
  constructor(private book:BookService, private wishlist:WishlistService, private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.wishlist.getBooks().subscribe((res:any)=>{
      this.ids = res.data;
      this.count = this.ids.length;
      this.getBookDetails();
    })
    
  }

  getBookDetails() {
    for(var id of this.ids) {
      this.book.getBookById(id.bookId).subscribe((res:any)=> {
        this.books.push(res.data);
      })
    }
  }

  removeFromWishlist(bookId:number, message:string) {
    this.wishlist.removeFromWishlist(bookId).subscribe((res:any) => {
      console.log(res);
      this.snackBar.open(message, '', {
        duration: 3000,
      });
      this.reloadCurrentRoute();
    },(error: any)=>{
      this.snackBar.open("Unable to remove book from Wishlist", '', {
        duration: 3000,
      })
      console.log(error)
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
