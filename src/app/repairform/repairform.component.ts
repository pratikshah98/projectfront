import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';
import { category } from '../classes/category';
import { RepairService } from '../service/repair.service';
import { repairs } from '../classes/repair';
import { repairing } from '../classes/addreapiring';

@Component({
  selector: 'app-repairform',
  templateUrl: './repairform.component.html',
  styleUrls: ['./repairform.component.css']
})
export class RepairformComponent implements OnInit {
  cat_arr:category[]=[];
  repair_arr:repairing[]=[];
  fk_cat_id:number;
  model_no:string;
  prob_spe:string;
  fk_user_id:number;
  email_id:string;
  user_id:number;
  status:string="pending";
  approve:string="approved";
  constructor(private _category:CategoryService,private _route:Router,private _repair:RepairService) { }
  addform(){}
  ngOnInit() {
    this.email_id=localStorage.getItem('email_id');
   this.fk_user_id=parseInt(localStorage.getItem('user_id'));
    this._category.getAllCategory().subscribe(
      (data:any)=>{
          this.cat_arr=data;
      }
    );
  }
  onaddrepair(){
      this._repair.AddRepair(new repairing(this.fk_user_id,this.fk_cat_id,this.model_no,this.prob_spe)).subscribe(
      (data:repairing[])=>{
      this.repair_arr.push(new repairing(this.fk_user_id,this.fk_cat_id,this.model_no,this.prob_spe));
      alert("rpairing request added successfully");
      console.log(data);
      console.log(this.repair_arr);
    });
}
  oncancel(){}

}
