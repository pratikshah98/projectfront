import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserAuthService } from './service/user-auth.service';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthguardService {
email:string="";
  constructor(private _data:UserService,private _route:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.email=localStorage.getItem('email_id');
    console.log(this.email);
    if(this.email!=null){
      return true;
    }
    else{
      alert('signup account' );
      this._route.navigate(['usermenu/signup']);
      return false;

    }
  }

}
