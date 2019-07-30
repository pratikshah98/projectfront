import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { user } from '../classes/user';
import { sendmail } from './sendmail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
user_name:string;
password:string;
subject1:string;
  constructor(private _user:UserService,private _route:Router) { }

  addform(){}
  onForget(){
    this._user.getPasswordById(this.user_name).subscribe(
      (data:user[])=>{
        if(data.length>0)
        {
            this.password=data[0].password;
          this._user.sendMail(new sendmail(this.user_name,this.subject1,this.password)).subscribe(
            (data:sendmail)=>{

            }
          )
          alert('password will send on your email');
          this._route.navigate(['']);
        }
        else{
          alert('Email id is not correct');
        }
      }
    )
  }
  onCancel(){
    this._route.navigate(['']);
  }
  ngOnInit() {
  }

}
