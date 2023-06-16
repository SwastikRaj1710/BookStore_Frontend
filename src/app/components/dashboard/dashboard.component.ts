import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from 'src/app/services/searchService/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private snackBar:MatSnackBar, private search:SearchService) { }
  
  count:number=0;

  receiveCount($event:number) {
    this.count = $event
  }

  ngOnInit(): void {
  }

  logout(message:string) {
    localStorage.removeItem('token');
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  searchData(event:any) {
    this.search.changeMessage(event.target.value)
    console.log(event.target.value)
  }
}
