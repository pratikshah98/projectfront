import { Component, OnInit } from '@angular/core';
import { user } from '../classes/user';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from '../classes/users';

@Component({
  selector: 'app-edituserprofile',
  templateUrl: './edituserprofile.component.html',
  styleUrls: ['./edituserprofile.component.css']
})
export class EdituserprofileComponent implements OnInit {
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
  upuser_arr:Users[]=[];
  hide:boolean=true;
  email_id:string;


  constructor(private _user:UserService,private _route:Router,private _acroute:ActivatedRoute) { }
  addform(){}
  onChange(){
    this._route.navigate(['usermenu/changepass']);
  }
    onUpdate()
    {
      console.log(this.address);
      console.log(this.mobile_no);
      console.log(this.gender);
      console.log(this.city);
      console.log(this.user_name);
      this._user.UpdateUsers(new Users(this.user_name,this.address,this.mobile_no,this.gender,this.city,this.email_id)).subscribe(
        (data:any)=>{
          this.upuser_arr.push(new Users(this.user_name,this.address,this.mobile_no,this.gender,this.city,this.user_name,this.email_id));
                console.log(data);
                alert("record updated succesfully");
                this._route.navigate(['usermenu/viewprofile']);
               }
       );

    }

    oncancel(){
      this._route.navigate(['usermenu/viewprofile']);
    }

  ngOnInit() {
    //this.user_id=this._acroute.snapshot.params['user_id'];
    this.email_id=localStorage.getItem('email_id');
    this._user.getAdminByName(this.email_id ).subscribe(
      (data:user[])=>{
        console.log(data);
        this.user_name=data[0].user_name;
        this.password=data[0].password;
        this.address=data[0].address;
        this.mobile_no=data[0].mobile_no;
        this.gender=data[0].gender;
        this.city=data[0].city;
      }
    )

  }

}
