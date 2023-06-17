import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookService/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { UserService } from 'src/app/services/userService/user.service';
import { WishlistService } from 'src/app/services/wishlistService/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  ids:any=[];
  books:any=[];
  count:number=0;
  orderOpen:boolean=false;
  addressOpen:boolean=false;
  dictionary:any = new Map<number, number>();
  quant:number=0;
  userDetails:any;
  constructor(private book:BookService, private cart:CartService, private snackBar:MatSnackBar, private router:Router, private user:UserService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.cart.getBooks().subscribe((res:any)=>{
      this.ids = res.data;
      this.count = this.ids.length;
      console.log(this.ids);
      this.getBookDetails();
    })
    
  }

  getBookDetails() {
    this.books=[];
    for(var id of this.ids) {
      this.dictionary.set(id.bookId,id.quantity);
      this.book.getBookById(id.bookId).subscribe((res:any)=> {
        res.data.quantity = id.quantity;
        this.books.push(res.data);
      })
    }
    console.log(this.dictionary);
  }

  removeFromCart(bookId:number, message:string) {
    this.cart.removeFromCart(bookId).subscribe((res:any) => {
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

  reduce(bookId:number, message:string) {
    if(this.dictionary.get(bookId)>1) {
      this.quant = this.dictionary.get(bookId);
      this.updateQuantity(this.quant-=1,bookId)
      this.dictionary.set(bookId,this.dictionary.get(bookId)-1);
      console.log(this.dictionary.get(bookId));
    }
    else {
      this.removeFromCart(bookId, message);
    }
    this.reloadCurrentRoute();
  }

  increase(bookId:number) {
    this.dictionary.set(bookId,this.dictionary.get(bookId));
    this.quant = this.dictionary.get(bookId);
    this.updateQuantity(this.quant+=1,bookId);
    console.log(this.dictionary.get(bookId));
    this.reloadCurrentRoute();
  }

  updateQuantity(value:number, bookid:number) {
    let data={
      "quantity": value
    }
    this.cart.updateQuantity(data, bookid).subscribe((res:any)=> {
      console.log(res);
    },(error: any)=>{
      this.snackBar.open("Unable to update book quantity", '', {
        duration: 3000,
      })
      console.log(error)
    })
  }

  openAddressTab() {
    this.addressOpen = true;
    this.getUserDetails();
  }

  openOrderTab() {
    this.orderOpen = true;
  }

  checkout() {
    this.cart.removeAll().subscribe((res:any)=> {
      console.log(res);
    },(error: any)=>{
      this.snackBar.open("Unable to fetch user details", '', {
        duration: 3000,
      })
      console.log(error)
    })
    this.router.navigateByUrl("/home/order");
  }

  getUserDetails() {
    this.user.getDetails().subscribe((res:any)=> {
      console.log(res);
      this.userDetails = res.data;
    },(error: any)=>{
      this.snackBar.open("Unable to fetch user details", '', {
        duration: 3000,
      })
      console.log(error)
    })
  }


  reloadCurrentRoute() {
    // let currentUrl = this.router.url;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate([currentUrl]);
    // });
    window.location.reload();
  }
}
