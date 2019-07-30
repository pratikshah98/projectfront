import { Component, OnInit,ViewChild } from '@angular/core';
import { RepairService } from '../service/repair.service';
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { repairorder } from '../classes/repair_order';

@Component({
  selector: 'app-repairorder',
  templateUrl: './repairorder.component.html',
  styleUrls: ['./repairorder.component.css']
})
export class RepairorderComponent implements OnInit {

  i:number;
    repair_order_amt:number;
    repair_order_date:Date;
    fk_repair_id:number;
  repair_order_arr:repairorder[]=[];
  repair_order_del_arr:repairorder[]=[];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  displayedColumns: string[] = ["Action","repair_order_amt","repair_order_date","model_no","action"];
  repairSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.repairSource.filter = filterValue.trim().toLowerCase();
  }
  checkchangeOrder(item:repairorder){
    if (this.repair_order_del_arr.find(x => x == item)) {
      this.repair_order_del_arr.splice(this.repair_order_del_arr.indexOf(item), 1);
    } else {
      this.repair_order_del_arr.push(item);

    }
    console.log(this.repair_order_del_arr);
  }
  onUpdatestatus(){}
  onDelete(item){
    this._repair.deleteRepairingOrder(item).subscribe(
      (data:any)=>{
        this.repair_order_arr.splice(this.repair_order_arr.indexOf(item),1);
        this.repairSource=new MatTableDataSource(this.repair_order_arr);
      }
    );
    alert('Deleted successfully');
  }
  onMultipledel(){
    this._repair.deleteAllRepairingOrder(this.repair_order_del_arr).subscribe((data: any) => {
      console.log(this.repair_order_del_arr);
       for (this.i = 0; this.i < this.repair_order_del_arr.length; this.i++) {
         if (this.repair_order_arr.find(x => x == this.repair_order_del_arr[this.i])) {
           this.repair_order_arr.splice(this.repair_order_arr.indexOf(this.repair_order_del_arr[this.i]),1);
         }
       }
       this.repairSource.data = this.repair_order_arr;
       console.log(this.repair_order_arr);
     });
  }
  constructor(private _repair:RepairService) { }

  ngOnInit() {
    this.repairSource.paginator = this.paginator;
    this.repairSource.sort = this.sort;
    this._repair.getAllRepairingByOrder().subscribe((data: repairorder[]) => {
      this.repair_order_arr = data;
      console.log(data);
      this.repairSource.data = this.repair_order_arr;
    });
  }

}
