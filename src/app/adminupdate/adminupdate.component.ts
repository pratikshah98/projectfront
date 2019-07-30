import { Component, OnInit } from '@angular/core';
import { user } from '../classes/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Admin } from '../classes/admin';


@Component({
  selector: 'app-adminupdate',
  templateUrl: './adminupdate.component.html',
  styleUrls: ['./adminupdate.component.css']
})
export class AdminupdateComponent implements OnInit {
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

  constructor(private _user:UserService,private _route:Router,private _acroute:ActivatedRoute) { }

  ngOnInit() {

    this.user_id1=localStorage.getItem('email_id');
    console.log(this.user_id1);
    this._user.getAdminByName(this.user_id1).subscribe(
      (data:user[])=>{
        console.log(data);
        this.user_name=data[0].user_name;
        this.password=data[0].password;
        this.address=data[0].address;
        this.mobile_no=data[0].mobile_no;
        this.gender=data[0].gender;
        this.city=data[0].city;
      }
    );
    }

    addform(){}
    onEditAdmin()
    {
      console.log(this.address);
      console.log(this.mobile_no);
      console.log(this.gender);
      console.log(this.city);
      console.log(this.user_id1);
      this._user.UpdateAdmin(new Admin(this.address,this.mobile_no,this.gender,this.city,this.user_id1)).subscribe(
        (data:any)=>{
          this.upuser_arr.push(new Admin(this.address,this.mobile_no,this.gender,this.city,this.user_id1));
                console.log(data);
                alert("record updated succesfully");
                this._route.navigate(['menu/adminprofile']);
               }
       );

    }
    onclick(){
      this._route.navigate(['menu/adminprofile']);
    }

}
