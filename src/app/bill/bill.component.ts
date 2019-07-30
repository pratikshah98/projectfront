import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { bill } from '../classes/bill';
import { BillService } from '../service/bill.service';
import { Router, ActivatedRoute } from '@angular/router';
import { userbill } from '../classes/userbill';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  bill_arr:bill[]=[];
  bill_id: number;
  user_id:number;
  bill_type:string="Online"

  userbill_arr:userbill[]=[];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  displayedColumns: string[] = ["Action","bill_amount","email_id","action"];
  billSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.billSource.filter = filterValue.trim().toLowerCase();
  }
  onAddBill(){
this._route.navigate(['menu/addbill']);
  }
  onViewMore(item){
    this._route.navigate(['menu/billdetails',item.bill_id]);
  }
  constructor(private _bill:BillService,private _route:Router,private _acroute:ActivatedRoute) { }

  ngOnInit() {
  this.billSource.paginator = this.paginator;
    this.billSource.sort = this.sort;
    this._bill.getAllBills().subscribe((data: bill[]) => {
      console
      this.bill_arr = data;
      //this.user_id=data[0].fk_user_id
      console.log(data);
      this.billSource.data = this.bill_arr;

      });
    this._bill.getUserName().subscribe((data: bill[]) => {

      this.bill_arr = data;

      this.user_id=data[0].fk_user_id;
      console.log(this.user_id);
      console.log(data);
      this.billSource.data = this.bill_arr;

      });
    }


  }


