import { Component, OnInit, ɵConsole } from '@angular/core';
import { AddtocartService } from '../service/addtocart.service';
import { Addcart } from '../classes/cart';
import { ProductserviceService } from '../service/productservice.service';
import { catpro } from '../classes/catpro';
import { product } from '../classes/product';
import { CartService } from '../service/cart.service';
import { cartpro } from '../classes/cartpro';
import { BillService } from '../service/bill.service';
import { bill } from '../classes/bill';
import { OrderService } from '../order.service';
import { order } from '../classes/order';
import { orderdetail } from '../classes/order_detail';
import { ConditionalExpr } from '@angular/compiler';
import { billdetail } from '../classes/billdetails';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {
user_id:number;
fk_user_id:number;
cart_arr:Addcart[]=[];
del_cart_arr:Addcart[]=[];
cat_pro_arr:catpro[]=[];
qty:number[]=[];

qty1:number[];
price:number[]=[];
i:number;
tot:number[]=[];
type:string="offline";
email_id:string;
noarr:number[]=[];
product_arr:product[]=[];
billdetails_arr:billdetail[]=[];
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
  j:number;
  cnt:number=1;
  k:number;
  no_arr2:number[]=[];
  pro_soh1:number;
  order_arr:order[]=[];
  order_detail_arr:orderdetail[]=[];
  constructor(private _order:OrderService,private _bill:BillService ,private _addcart:AddtocartService,private _product:ProductserviceService,private _cart:CartService) { }
  oncheck(){

  }
  onchange(item,i){
    console.log(item);
    console.log(i);
this.total=0;
    this.tot[i]=item.pro_price*this.qty[i];
    for(let i=0;i<this.tot.length;i++)
    {
      this.total+=this.tot[i];
    }
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

  //
  OnPlaceOrder()
  {
    this._order.addOrder(new order(this.user_id,this.total)).subscribe(
      (data:any)=>
      {
        this.order_arr.push(new order(this.user_id,this.total));
        console.log(data);
        alert("Item added into cart");
        this.bill_id=data.insertId;

        //this._route.navigate(['usermenu/addtocart']);

    for(this.i=0;this.i<this.tot.length;this.i++)
    {
       console.log(this.tot.length);
      this.order_detail_arr.push(new orderdetail(this.bill_id,this.cartpro_arr[this.i].fk_pro_id,this.qty[this.i],this.tot[this.i]));
      console.log(this.bill_id);
      console.log(this.cartpro_arr[this.i].fk_pro_id);
      console.log(this.qty[this.i]);
      console.log(this.tot[this.i]);
      //this.cart_arr.splice(this.[this.i])
      //console.log(this.order_detail_arr);
      this._cart.deleteAllCart(this.cart_arr).subscribe((data: any) => {
        console.log(this.cart_arr);
         for (this.i = 0; this.i < this.cart_arr.length; this.i++) {
           if (this.del_cart_arr.find(x => x == this.cart_arr[this.i])) {
             this.del_cart_arr.splice(this.del_cart_arr.indexOf(this.cart_arr[this.i]),1);
             console.log(this.del_cart_arr);
              this.ngOnInit();
           }
         }
        });
    }
    this._order.addOrderDetail(this.order_detail_arr).subscribe(
      (data:any)=>{
        console.log(data);
        //console.log()
      }
    );
  }
  );
   }
  ngOnInit() {

      this.email_id=localStorage.getItem('email_id');
    this.user_id=parseInt(localStorage.getItem('user_id'));
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
    this._cart.getAllCartByProid(this.user_id).subscribe(
      (data:cartpro[])=>{
        console.log(data);
        this.cartpro_arr=data;
        this.pro_name=data[0].pro_name;
        this.pro_img=data[0].pro_img;
        this.pro_price=data[0].pro_price;
        this.pro_soh=data[0].pro_soh;

        for(this.i=0;this.i<data.length;this.i++){
          //this.noarr=[];
          console.log('item length'+data.length);
            this.tot.push(data[this.i].pro_price);
           this.total+=data[this.i].pro_price;
           this.pro_soh=data[this.i].pro_soh;
           console.log(this.pro_soh);
            //this.pro_soh1=this.pro_soh;
            this.no_arr2.push(this.pro_soh);
            console.log(this.no_arr2);

          for(this.j=1;this.j<=this.pro_soh;this.j++)
            {
            this.noarr.push(this.j);
            console.log(this.noarr);
            }
             console.log(this.noarr);
//this.noarr.splice(1);

         }


      }

    );
     }
);
// this._product.getAllProduct().subscribe(

//   (data:product[])=>{
//     this.product_arr=data;
//     console.log(data);

//   }
// );

  }

}
