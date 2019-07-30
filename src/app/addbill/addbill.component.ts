import { Component, OnInit } from '@angular/core';
import { BillService } from '../service/bill.service';
import { bill } from '../classes/bill';
import { ProductserviceService } from '../service/productservice.service';
import { product } from '../classes/product';

@Component({
  selector: 'app-addbill',
  templateUrl: './addbill.component.html',
  styleUrls: ['./addbill.component.css']
})
export class AddbillComponent implements OnInit {
  bill_id:number;
  bill_amount:number;
  fk_user_id:number;
  bill_type:string="Offline";
  product_name:string[]=[];
  date:Date;
  delivery_date:Date;
  qty:number;
  soharr:number[]=[];
  bill_arr:bill[]=[];
  i:number;
  user:string="";
  product_arr:product[]=[];
  constructor(private _bill:BillService,private _product:ProductserviceService) { }
  addform(){}
  // onaddBill(){
  //    this._bill.InsertBills(new bill(this.bill_amount,this).subscribe(
  //     (data:any)=>{
  //       this.bill_arr.push(new bill(this.cat_name));

  //       alert("record added successfully");

  //     }
  // }
  oncancel(){

  }
  // checkchange(item){
  //   this.user=item;
  //   console.log(this.user);
  // }
  ngOnInit() {
    for(let i=1;i<=50;i++)
    {
      this.soharr.push(i);
    }
    this._product.getAllProduct().subscribe(
      (data:any)=>
      {
        // this.product_name=data[0].product_name;
        console.log(data);
          this.product_arr=data;
      }
      );
  }
  onaddBill(item){
    this._bill.InsertBills(new bill(this.bill_amount,this.fk_user_id,this.date,this.bill_type) ).subscribe(
      (data:any)=>{
        this.bill_arr.push(new bill(this.bill_amount,this.fk_user_id,this.date,this.bill_type));

               alert("record added successfully");

         }
    );
  }
}
