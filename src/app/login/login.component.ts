import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { user } from '../classes/user';
import { Router } from '@angular/router';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email_id:string;
  password:string;
  user_id:number;
  hide:boolean=true;
  type:string;
  flag:boolean=false;
  constructor(private _user:UserService,private _route:Router) { }
  onSubmit()
  {
    this._user.getLogin(new user(this.email_id,this.password)).subscribe((data: any) => {
      console.log(data);
      if (data.length === 1) {
        this.type=data[0].type;
        if(this.type=="User")
        {
        localStorage.setItem("email_id", this.email_id);
        localStorage.setItem("user_id",data[0].user_id);
        console.log(data[0].user_id);
        console.log(this.email_id);
        this._route.navigate(["usermenu/userhome"]);
        }
        else{
          localStorage.setItem("email_id", this.email_id);
//          localStorage.setItem("user_id",this.user_id.toString());

          console.log(this.email_id);
          this._route.navigate(["menu/adminprofile"]);
        }
      } else {
        console.log(this.email_id);
        console.log(this.password);
        alert("The Email_Id Or the Password is wrong");
      }
    });

  }

  onCancel(){}
  addform(){}
  ngOnInit() {
  }


}
