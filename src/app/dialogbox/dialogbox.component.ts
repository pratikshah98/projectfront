import { Component, OnInit,Inject } from '@angular/core';
import { repairing } from '../classes/addreapiring';
import { user } from '../classes/user';
import { repairorder } from '../classes/repair_order';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RepairService } from '../service/repair.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {
  fk_user_id:number;
  model_no:string;
    problem_spec:string;
    cat_name:string[]=[];
    repair_arr:repairing[]=[];
    user_arr:user[]=[];
    repair_order_arr:repairorder[]=[];
    email_id:string;
    repair_amt:number;
    reapir_order_amt:number;
    fk_cat_id:number;
    repair_id:number;
  constructor( public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data:repairorder,private _repair:RepairService,private _route:Router) { }
    onNoClick(): void {
      this.dialogRef.close();
    }
    onDone(){
      //console.log(item);
      alert('Order is done');
      console.log(this.repair_id);
        this._repair.InsertRepairOrder(new repairorder(this.repair_amt,this.repair_id)).subscribe(
      (data:repairing)=>{
        this.repair_order_arr.push(new repairorder(this.repair_amt,this.repair_id));
        alert("added successfully");
        console.log(data);
        //console.log(this.repair_arr);
      }

    );
    }

  ngOnInit() {
    this.fk_user_id=parseInt(localStorage.getItem('user_id'));
    this._repair.getAllRepairingByOrderId(this.fk_user_id).subscribe(
      (data:any)=>{
        this.repair_order_arr=this.repair_order_arr.concat(data);
        console.log(data);
        this.model_no=data[0].model_no;
        console.log(this.model_no);
        this.problem_spec=data[0].problem_spec;
        this.repair_amt=data[0].repair_amt;
        this.email_id=data[0].email_id;
        this.repair_id=data[0].repair_id;
      }
    );
  }

}
