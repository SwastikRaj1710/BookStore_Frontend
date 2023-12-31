import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from '../services/authGuardService/authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authGuardService:AuthguardService, private router:Router) {}
  canActivate():boolean {
    if(!this.authGuardService.gettoken()) {
      this.router.navigateByUrl('/login');
    }
    return this.authGuardService.gettoken();
  }
  
}
