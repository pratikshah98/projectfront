import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

import { user } from '../classes/user';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  user_id:number;
  user_name:string="";
  password:string="";
  address:string="";
  mobile_no:string="";
  gender_arr:string[]=["MALE","FEMALE"];
  gender:string="MALE";
  city_arr:string[]=["Ahmedabad","Surat","Vadodara","Rajkot","Morbi","Mahesana","Patan"]
  city:string="";
  type_arr:string[]=["User","Admin"];
  type:string="User";
  user_arr:user[]=[];
  user_del_arr:user[]=[];
  email_id:string;
  i:number;
  flag:boolean=false;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  applyFilter(filterValue: string) {
    this.UserSource.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ["Action","email_id","user_name","address","mobile_no","gender","city","action"];
  UserSource = new MatTableDataSource();

  constructor(private _user:UserService,private _route:Router) { }

  ngOnInit() {

    this.UserSource.paginator = this.paginator;
    this.UserSource.sort = this.sort;
    this._user.getAllUser(this.type).subscribe((data: user[]) => {
      this.user_arr = data;
      console.log(data);
      this.UserSource.data = this.user_arr;
    });
  }

  onUpdateUser(item:user){
    this._route.navigate(['menu/editprofile',item.user_id]);
  }
  checkchangeUser(item: user) {
    if (this.user_del_arr.find(x => x == item)) {
      this.user_del_arr.splice(this.user_del_arr.indexOf(item), 1);
    } else {
      this.user_del_arr.push(item);

    }
    console.log(this.user_del_arr);
  }

  onDeleteUser(item)
  {
    this._user.deleteUser(item).subscribe(
      (data:any)=>{
        this.user_arr.splice(this.user_arr.indexOf(item),1);
        this.UserSource=new MatTableDataSource(this.user_arr);
      }
    );
     }
     onAdd()
  {
      // if (this.flag) {
      //   this.flag=false;
      // } else {
      //   this.flag=true;
      // }
      this._route.navigate(['menu/user']);
       }


  onMultipledelUser(){
    this._user.deleteAllUser(this.user_del_arr).subscribe((data: any) => {
      console.log(this.user_del_arr);
       for (this.i = 0; this.i < this.user_del_arr.length; this.i++) {
         if (this.user_arr.find(x => x == this.user_del_arr[this.i])) {
           this.user_arr.splice(this.user_arr.indexOf(this.user_del_arr[this.i]),1);
         }
       }
       this.UserSource.data = this.user_arr;
       console.log(this.user_arr);
     });
  }
  addform(){}
  oncancel(){
    this.flag=false;
  }
  onaddUser()
  {
    this._user.addUser(new user(this.email_id,this.password,this.user_name,this.address,this.mobile_no,this.gender,this.city,this.user_id)).subscribe(
      (data:any)=>{
        this.user_arr.push(new user(this.email_id,this.password,this.user_name,this.address,this.mobile_no,this.gender,this.city,this.user_id));
        console.log(data);
        alert('record addee succesfully');
        this._route.navigate(['menu/manageuser']);
      }
    );
     }

}
