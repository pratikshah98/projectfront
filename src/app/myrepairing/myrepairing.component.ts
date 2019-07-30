import { Component, OnInit } from '@angular/core';
import { RepairService } from '../service/repair.service';
import { repairing } from '../classes/addreapiring';
import { user } from '../classes/user';
import { repairorder } from '../classes/repair_order';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';

@Component({
  selector: 'app-myrepairing',
  templateUrl: './myrepairing.component.html',
  styleUrls: ['./myrepairing.component.css']
})
export class MyrepairingComponent implements OnInit {
  fk_user_id:number;
  model_no:string;
    problem_spec:string;
    cat_name:string[]=[];
    repair_arr:repairing[]=[];
    user_arr:user[]=[];
    repair_order_arr:repairorder[]=[];
    email_id:string;
    repair_amt:number;
    fk_cat_id:number;
    repair_id:number;
    repair_date:Date;
    i:number;
    constructor(private _repair:RepairService,private _route:Router,public dialog: MatDialog) { }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogboxComponent, {
        width: '250px',

        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //this.animal = result;
      });
    }
  ngOnInit() {
    this.fk_user_id=parseInt(localStorage.getItem('user_id'));
    this._repair.getAllRepairingByOrderId(this.fk_user_id).subscribe(
      (data:any)=>{
        //this.repair_order_arr=data;
        this.repair_arr=data;
        console.log(data);
      if(data.length>0)
      {
          this.model_no=data[0].model_no;
          console.log(this.model_no);
          this.problem_spec=data[0].problem_spec;
          console.log(this.problem_spec);
          this.repair_amt=data[0].repair_amt;
          console.log(this.repair_amt);
          this.repair_date=data[0].repair_date;
          console.log(this.repair_date);
          this.email_id=data[0].email_id;

      }
      else
      {
        alert('No Repairing Order');
      }
    }
    );
  }




}
