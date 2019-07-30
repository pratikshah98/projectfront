import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { repairs } from '../classes/repair';
import { RepairService } from '../service/repair.service';
import { repairorder } from '../classes/repair_order';
import { Router } from '@angular/router';
//import { repair } from '../service/repair.service';
@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  repair_order_arr:repairorder[]=[];
  repair_order_amt:number;
  repair_order_date:Date;
  fk_repair_id:number;
  i;
  repair_arr:repairs[]=[];
  repair_del_arr:repairs[]=[];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  displayedColumns: string[] = ["Action","model_no","problem_spec","status","approve","action"];
  repairSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.repairSource.filter = filterValue.trim().toLowerCase();
  }
  onDelete(item){
  this._repair.deleteRepairing(item).subscribe(
      (data:any)=>{
        this.repair_arr.splice(this.repair_arr.indexOf(item),1);
        this.repairSource=new MatTableDataSource(this.repair_arr);
      }
    );
    alert('Deleted successfully');
  }
  onUpdateapprove(item){
    if(item.approve=='approve')
    {
      item.approve='disapproved';
    }
    else
    {
      item.approve='approve';
      this._repair.InsertRepairOrder(item).subscribe(
        (data:repairorder[])=>{
          // console.log(this.pro_soh);
          // console.log(this.pro_color);
          this.repair_order_arr.push(new repairorder(this.repair_order_amt,this.fk_repair_id,this.repair_order_date));
          this.repair_order_arr.push(new repairorder(this.repair_order_amt,this.fk_repair_id,this.repair_order_date));
         console.log(this.repair_order_arr);
         alert("added succesfully");
         this._route.navigate(['/repairorder']);
        }
       );
    }
  }
  onUpdatestatus(item:repairs){

    if(item.status=='pending')
    {
      item.status='done';
      this._route.navigate(['menu/updaterepair',item.repair_id]);
    }
    else
    {
      item.status='pending';
    }
  }
  onMultipledel(){
    this._repair.deleteAllRepairing(this.repair_del_arr).subscribe((data: any) => {
      console.log(this.repair_del_arr);
       for (this.i = 0; this.i < this.repair_del_arr.length; this.i++) {
         if (this.repair_arr.find(x => x == this.repair_del_arr[this.i])) {
           this.repair_arr.splice(this.repair_arr.indexOf(this.repair_del_arr[this.i]),1);
         }
       }
       this.repairSource.data = this.repair_arr;
       console.log(this.repair_arr);
     });
  }
  checkchangeProduct(item){

    if (this.repair_del_arr.find(x => x == item)) {
      this.repair_del_arr.splice(this.repair_del_arr.indexOf(item), 1);
    } else {
      this.repair_del_arr.push(item);

    }
    console.log(this.repair_del_arr);
  }
  constructor(private _repair:RepairService,private _route:Router) { }

  ngOnInit() {

    this.repairSource.paginator = this.paginator;
    this.repairSource.sort = this.sort;
    this._repair.getAllRepairing().subscribe((data: repairs[]) => {
      this.repair_arr = data;
      console.log(data);
      this.repairSource.data = this.repair_arr;
    });
  }

}
