import { Component, OnInit } from '@angular/core';
import { category } from '../classes/category';
import { CategoryService } from '../service/category.service';
import { RepairService } from '../service/repair.service';
import { repairs } from '../classes/repair';
import { repairing } from '../classes/addreapiring';
import { BillService } from '../service/bill.service';
import { user } from '../classes/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-addrepair',
  templateUrl: './addrepair.component.html',
  styleUrls: ['./addrepair.component.css']
})


export class AddrepairComponent implements OnInit {

  model_no:string;
  problem_spec:string;
  cat_name:string[]=[];
  cat_arr:category[]=[];
  repair_arr:repairing[]=[];
  user_arr:user[]=[];
  email_id:string;
  fk_cat_id:number;
  fk_user_id:number;
  constructor(private _category:CategoryService,private _repair:RepairService,private _bill:BillService,private _route:Router) { }
  addform(){}
  onaddRepair(){
    this._repair.AddRepair(new repairing(this.fk_user_id,this.fk_cat_id,this.model_no,this.problem_spec)).subscribe(
      (data:repairing)=>{
        this.repair_arr.push(new repairing(this.fk_user_id,this.fk_cat_id,this.model_no,this.problem_spec));
        alert("rpairing request added successfully");
        console.log(data);
        console.log(this.repair_arr);
      }

    );
  }
  onRepair(){
    this._route.navigate(['usermenu/myrepairing']);
  }
  oncancel(){
    this._route.navigate(['']);
  }
  ngOnInit() {
    this.email_id=localStorage.getItem("email_id");
    console.log(this.email_id);
    this._category.getAllCategory().subscribe(
      (data:any)=>{
          this.cat_arr=data;
      }
    );
    this._bill.getUserName().subscribe((data: any) => {

      this.user_arr = data;
      this.fk_user_id=data[0].fk_user_id;
      });
  }

}
