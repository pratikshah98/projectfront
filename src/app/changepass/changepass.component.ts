import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { user } from '../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  email_id:string;
  password:string;
  newp:string;
  conp:string;
  user_arr:user[]=[];
  constructor(private _user:UserService,private _route:Router) { }
onchange(){
  if(this.password==this.user_arr[0].password)
  {
    if(this.newp==this.conp)
    {
      this._user.ChangePassword(new user(this.email_id,this.newp)).subscribe(
        (data:any)=>
        {
          console .log(data);
          this._route.navigate(['usermenu/viewprofile']);
        }
      );
    }
    else
    {
      alert('new password and confirm password must- be same');
    }
  }
  else
  {
    alert('incorrect old password');
  }

}
oncancle(){
  this._route.navigate(['usermenu/edituser']);
}
  ngOnInit() {
    this.email_id=localStorage.getItem('email_id');
    this._user.getAdminByName(this.email_id).subscribe(
      (data:any[])=>
      {
        this.user_arr=data;
        this.email_id=data[0].email_id;
      }
    );

  }

}
