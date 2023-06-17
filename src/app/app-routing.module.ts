import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { DisplayBookComponent } from './components/display-book/display-book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';

const routes: Routes = [
  {path:'', redirectTo:'/home/books', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'home', component:DashboardComponent,
    children : [{path: 'books', component:DisplayBookComponent},
                {path:'book', component:BookDetailsComponent},
                {path:'wishlist', component:WishlistComponent, canActivate:[AuthenticationGuard]},
                {path:'cart', component:CartComponent, canActivate:[AuthenticationGuard]},
                {path:'order', component:OrderSuccessComponent, canActivate:[AuthenticationGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
