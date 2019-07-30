import { Component, OnInit } from '@angular/core';
import { user } from '../classes/user';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {
  user_id:number;
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
  addform(){}
  ngOnInit() {
    this.user_id=this._acroute.snapshot.params['user_id'];
    this._user.getUserById(this.user_id).subscribe(
      (data:user[])=>{
        console.log(data);
        this.email_id=data[0].email_id;
        this.password=data[0].password;
        this.user_name=data[0].user_name;
        this.address=data[0].address;
        this.mobile_no=data[0].mobile_no;
        this.gender=data[0].gender;
        this.city=data[0].city;
      }
    )
  }
  onUpdateUser(){
  this._user.UpdateUser(new user(this.email_id,this.password,this.user_name,this.address,this.mobile_no,this.gender,this.city,this.user_id)).subscribe(
    (data:any)=>{
            console.log(data);
            alert("record updated succesfully");
             this._route.navigate(['menu/manageuser']);
           }
   );

   }
}



