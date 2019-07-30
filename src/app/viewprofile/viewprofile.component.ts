import { Component, OnInit } from '@angular/core';
import { user } from '../classes/user';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  user_id:number;
  user_id1:string="";
  user_name:string="";
  password:string="";
  address:string="";
  mobile_no:string="";
  gender_arr:string[]=["Male","Female"];
  gender:string="Male";
  city_arr:string[]=["Ahmedabad","Surat","Vadodara","Rajkot","Morbi","Mahesana","Patan"]
  city:string="";
  type_arr:string[]=["User","Admin"];
  type:string="";
  upuser_arr:user[]=[];
  hide:boolean=true;
  email_id:string;
  constructor(private _user:UserService,private _route:Router,private _acroute:ActivatedRoute) { }
  onEditUser(){
    this._route.navigate(['usermenu/edituser']);
  }
  onCancel(){
    this._route.navigate(['usermenu/userhome']);
  }
  ngOnInit() {
    this.user_id1=localStorage.getItem('email_id');
    console.log(this.user_id1);
    this._user.getAdminByName(this.user_id1).subscribe(
      (data:user[])=>{
        console.log(data);
        this.email_id=data[0].email_id;
        this.user_name=data[0].user_name;
        this.password=data[0].password;
        this.address=data[0].address;
        this.mobile_no=data[0].mobile_no;
        this.gender=data[0].gender;
        this.city=data[0].city;
      }
    );

  }

}
