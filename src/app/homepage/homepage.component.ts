import { Component,ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { order } from '../classes/order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { category } from '../classes/category';
import { product } from '../classes/product';
import { ProductserviceService } from '../service/productservice.service';
import { UserService } from '../service/user.service';
import { userorder } from '../classes/userorder';
import { user } from '../classes/user';
import { RepairService } from '../service/repair.service';
import { repairs } from '../classes/repair';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  rep_arr:repairs[]=[];
  pro_arr:product[]=[];
  order_arr:order[]=[];
  order_arr1:order[]=[];
  order_id: number;
  status: string = "pending";
  i:number=0;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  displayedColumns: string[] = ["user_name","order_date","order_amount"];
  displayedColumns1: string[] = ["model_no", "problem_spec","status"];
  displayedColumns3: string[] = [ "user_name","order_amount","order_date"];
fk_user_id:number;
user_name:string;
orderuser_arr:userorder[]=[];
orderuser_arr1:userorder[]=[];
  displayedColumns2: string[] = ["pro_name","pro_price","pro_img"];
  ProductSource = new MatTableDataSource();
  orderSource = new MatTableDataSource();
repairSource=new MatTableDataSource();
OrderSource=new MatTableDataSource();
  applyFilter(filterValue: string) {
    this.orderSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _order:OrderService,private _route:Router,private _repair:RepairService,private _product:ProductserviceService,private _user:UserService) {}
  onclick()
  {
    this._route.navigate(['menu/order']);
  }
  onclick1()
  {
    this._route.navigate(['menu/repair']);
  }
  onclick2()
  {
    this._route.navigate(['menu/product']);

  }
  ngOnInit(){
    this.getAllTopOrder();
    this.orderSource.data = this.order_arr;
    this.orderSource.paginator = this.paginator;

      this.getAllrepairing();
      this.repairSource.data=this.rep_arr;
      this.repairSource.paginator = this.paginator;
      this.getAllproduct();
      this.ProductSource.data=this.pro_arr;
      this.ProductSource.paginator = this.paginator;
      this.getAllTodayOrder();
      this.OrderSource.data=this.order_arr1;
      this.OrderSource.paginator = this.paginator;


  }
  getAllTopOrder()
  {
    this._order.getTopOrder().subscribe((data: any) => {
      //this.order_arr = data;
      console.log(data);
      this.fk_user_id=data[0].fk_user_id;
      console.log(this.fk_user_id);
      this._order.getUserNameById(this.fk_user_id).subscribe(
        (data: userorder[])=>{
          console.log(data);
            this.user_name=data[0].user_name;
           console.log(this.user_name);
           this.orderuser_arr1 = data;
      //this.order_arr1 = data1;
      console.log(data);
      this.orderSource.data = this.orderuser_arr1;
        });
    });
  }
  getAllrepairing(){
    this._repair.getAllRepairing().subscribe((data: repairs[]) => {
      console.log(data);
      this.rep_arr = data;
      console.log(data);
      this.repairSource.data = this.rep_arr;
    });
  }
  getAllproduct()
  {
    this._product.getAllProduct().subscribe((data: product[]) => {
    console.log(data);
    this.pro_arr = data;
    console.log(data);
    this.ProductSource.data = this.pro_arr;
  });
  }
  getAllTodayOrder()
  {

    this._order.getTodaysOrder().subscribe((data: userorder[]) => {
    console.log(data);
    this.fk_user_id=data[0].fk_user_id;
    console.log(this.fk_user_id);
    this._order.getUserNameById(this.fk_user_id).subscribe(
      (data: userorder[])=>{
        console.log(data);
          this.user_name=data[0].user_name;
         console.log(this.user_name);
         this.orderuser_arr = data;
    //this.order_arr1 = data1;
    console.log(data);
    this.OrderSource.data = this.orderuser_arr;
         }

     );
  });

  }



}
