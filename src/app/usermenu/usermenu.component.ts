import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, find } from 'rxjs/operators';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { category } from '../classes/category';
import { product } from '../classes/product';
import { cartpro } from '../classes/cartpro';
import { order } from '../classes/order';
import { Addcart } from '../classes/cart';
import { catpro } from '../classes/catpro';
import { CartService } from '../service/cart.service';
import { AddtocartComponent } from '../addtocart/addtocart.component';
import { AddtocartService } from '../service/addtocart.service';
import { ProductserviceService } from '../service/productservice.service';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {
  cat_arr:category[]=[];
flag:boolean=true;
flag1:boolean=true;
email_id:string="";
pro_arr:product[]=[];
pro_arr1:product[]=[];
pro_name:string="";
pro_img:string="";
pro_color:string="";
pro_soh:number;
pro_price:number;
bill_id:number;
pro_mfg:string="";
pro_desc:string="";
fk_cat_id:number;
cartpro_arr:cartpro[]=[];
total:number=0;
order_arr:order[]=[];
user_id:number;
fk_user_id:number;
cart_arr:Addcart[]=[];
del_cart_arr:Addcart[]=[];
cat_pro_arr:catpro[]=[];
qty:number[]=[];
price:number[]=[];
i:number;
tot:number[]=[];
type:string="offline";
cnt=0;
displaypro_arr:product[]=[];
cat_id:number;
email:string="";
user_id1:number;
product_list:any[]=[];
UserSource = new MatTableDataSource();
product_dataSource=new MatTableDataSource();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private _displayproduct:ProductserviceService,private _acroute:ActivatedRoute,private _addcart:AddtocartService,private _cart:CartService,private _category:CategoryService,private breakpointObserver: BreakpointObserver,private _route:Router) { }
    onlogout()
  {
    localStorage.clear();
    //console.log(this.email);
    //console.log(this.user_id1);
    this._route.navigate(['usermenu/userhome']);
    this.ngOnInit();

  }

  onclick(item)
  {
    this._route.navigate(['usermenu/displayproduct',item.cat_id]);
  }
  ondelete(item,i){
    this.total=this.total-this.tot[i];
    this.tot.splice(i,1);
    this.price.splice(i,1);
    this.qty.splice(i,1);
    this.cartpro_arr.splice(this.cartpro_arr.indexOf(item),1);
    this._cart.deleteCart(item).subscribe(
      (data:any)=>{
        this.cart_arr.splice(this.cart_arr.indexOf(item),1);
      }
    );


  }
  applyFilter(filterValue: string) {
    this.flag1=false;
    console.log(filterValue);
    this.product_dataSource.filter= filterValue.trim().toLowerCase();
    console.log(this.product_dataSource.filteredData);
    this.product_list=this.product_dataSource.filteredData;
    console.log(this.product_list);
    if(this.product_dataSource.filter.length==0){
      this.product_list=[];
    }

  }
 onAdd()
  {
      if (this.flag) {
        this.flag=false;
        console.log(this.flag);
      } else {
        this.flag=true;
        console.log(this.flag);
    }
  }
  onviewcart()
  {
    this._route.navigate(['usermenu/addtocart']);
  }
  // onOffer(){
  //   this._route.navigate(['usermenu/offer']);
  // }
  // onclick(){
  //   this._route.navigate(['']);
  // }
  // onCart(){
  //   this._route.navigate(['usermenu/addtocart']);
  // }
  // onHome(){
  //   this._route.navigate(['usermenu/userhome']);
  // }
  // onclickmenu(){}
  itemsearch(item)
  {
    this.flag1=true;
    console.log(item);
    //this.Prod_list=[];
    window.location.href="/usermenu/prodetails/"+item.pro_id;


  }
   ngOnInit() {
    this._displayproduct.getAllProduct().subscribe(
      (data:any)=>{
          this.pro_arr=data;
          console.log(this.pro_arr);
          this.product_dataSource.data=data;
          console.log(this.product_dataSource.data);
      });
    this.email_id=localStorage.getItem('email_id');
    console.log(this.email_id);
    this.user_id=parseInt(localStorage.getItem('user_id'));
    console.log(this.user_id);
  if(this.email_id!=null)
  {
    this._addcart.getAllCartByUser_id(this.user_id).subscribe(
  (data:Addcart[])=>{

    this.cart_arr=data;

    console.log(this.cart_arr);
    for(this.i=0;this.i<=data.length;this.i++){
      this.qty.push(1);
    }
  }
);

this._addcart.getAllCart().subscribe(
  (data:Addcart[])=>{
    this.cart_arr=data;
    //this.fk_user_id=data[0].fk_user_id;
    console.log(this.cart_arr);
   // console.log(this.fk_user_id);
    this._cart.getAllCartCountByid(this.user_id).subscribe(
      (data:any)=>{
        this.cnt=data[0].TOTAL;
    console.log(this.cnt);
      }
    );

    this._cart.getAllCartByProid(this.user_id).subscribe(
      (data:cartpro[])=>{
        console.log(data);
        this.cartpro_arr=data;
        this.pro_name=data[0].pro_name;
        this.pro_img=data[0].pro_img;
        this.pro_price=data[0].pro_price;
        this.pro_soh=data[0].pro_soh;

        for(this.i=0;this.i<data.length;this.i++){
            this.tot.push(data[this.i].pro_price);

            this.total+=data[this.i].pro_price;
          }

      }
    );
  }
);

this._category.getAllCategory().subscribe((data: category[]) => {
  console.log(data);
  this.cat_arr = data;
  console.log(data);
  //this.UserSource.data = this.cat_arr;
  //console.log(this.UserSource);
});
  }
  else
  {
// this._product.getAllProduct().subscribe(
//   (data:product[])=>{
//     this.product_arr=data;
//     console.log(data);

//   }
// );

    this._category.getAllCategory().subscribe((data: category[]) => {
      console.log(data);
      this.cat_arr = data;
      console.log(data);
     // this.UserSource.data = this.cat_arr;
      //console.log(this.UserSource);

    });
    this._acroute.params.subscribe(
      (x:Params)=>{
        this.cat_id=x['cat_id'];
        console.log(this.cat_id);
       }
    );
    this._displayproduct.getDisplayProductByCat_Id(this.cat_id).subscribe(
      (data:product[])=>{
        this.displaypro_arr=data;
        console.log(data);
      }
    );
  }


  }

}



