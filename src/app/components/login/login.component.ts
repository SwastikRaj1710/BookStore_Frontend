import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
  loginForm!: FormGroup;
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder, private user:UserService, private route:Router, private snackBar:MatSnackBar) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  onSubmit(message:string) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          console.log("Invalid Data")
          return;
      }
      else
      {
        console.log(this.loginForm.value)
        let loginData = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }
        this.user.login(loginData).subscribe((response:any)=>{
            console.log(response.data)
            localStorage.setItem('token',response.data)
            this.route.navigateByUrl('/home/books')
            this.snackBar.open(message, '', {
              duration: 3000,
            });
        },(error: any)=>{
            console.log(error)
        })
        console.log("Data is Valid")
      }
  }

  onReset() {
      this.submitted = false;
      this.loginForm.reset();
  }

}
