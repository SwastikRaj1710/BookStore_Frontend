import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthguardService } from 'src/app/services/authGuardService/authguard.service';
import { SearchService } from 'src/app/services/searchService/search.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private snackBar:MatSnackBar, private search:SearchService, private user:UserService) { }
  userAuth:boolean=false;
  count:number=0;
  userName:string='';

  receiveCount($event:number) {
    this.count = $event
  }

  ngOnInit(): void {
    this.checkUser();
    this.getUserDetails();
  }

  logout(message:string) {
    localStorage.removeItem('token');
    this.snackBar.open(message, '', {
      duration: 3000,
    });
    this.userAuth = false;
  }

  searchData(event:any) {
    this.search.changeMessage(event.target.value)
    console.log(event.target.value)
  }

  checkUser() {
    if(localStorage.getItem('token')!=null)
      this.userAuth = true;
  }

  getUserDetails() {
    this.user.getDetails().subscribe((res:any)=> {
      console.log(res);
      this.userName = res.data.fullName;
    },(error: any)=>{
      console.log(error)
    })
  }
}
