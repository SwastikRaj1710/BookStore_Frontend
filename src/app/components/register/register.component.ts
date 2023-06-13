import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  showPassword: boolean = false;
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private user:UserService, private route:Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          fullname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
      });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          console.log("Invalid Data")
          return;
      }
      else
      {
        console.log(this.registerForm.value)
            let regData = {
                fullName: this.registerForm.value.fullname,
                email: this.registerForm.value.email,
                password: this.registerForm.value.password,
                phone: this.registerForm.value.phone

            }
            this.user.registration(regData).subscribe((response:any)=>{
                console.log(response)
                this.route.navigateByUrl('/login')
            },(error: any)=>{
                console.log(error)
            })
            console.log("Data is Valid")
      }
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

}
