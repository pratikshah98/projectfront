import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

import { ProductserviceService } from '../service/productservice.service';
import { product } from '../classes/product';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { category } from '../classes/category';
import { OfferService } from '../service/offer.service';
import { cartpro } from '../classes/cartpro';
import { order } from '../classes/order';
import { Addcart } from '../classes/cart';
import { catpro } from '../classes/catpro';
import { AddtocartService } from '../service/addtocart.service';
import { CartService } from '../service/cart.service';
import { fivesellpro } from '../classes/fivesellpro';
import { WishService } from '../service/wish.service';
import { wish } from '../classes/wish';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  flag:boolean=false;
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
  sellpro_arr:fivesellpro[]=[];
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
wish_arr:wish[]=[];

  cat_arr:category[]=[];
  imageUrlArray:string[]=[
    "../../assets/banner13.jpg",
    "../../assets/m6.jpg",
    "../../assets/m7.jpg",
    "../../assets/logo1.jpg",
    "../../assets/logo3.jpg"
  ];
  ProductSource = new MatTableDataSource();

  constructor(private _wish:WishService,private _addcart:AddtocartService,private _cart:CartService,private _offer:OfferService,private _category:CategoryService,private _product:ProductserviceService,private _route:Router) { }
  applyFilter(filterValue: string) {
    this.ProductSource.filter = filterValue.trim().toLowerCase();
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

  onshop(){
      this._route.navigate(['usermenu/offer']);
  }
  abc(img:any)
  {
    console.log("chalyu"+img);
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
  onwishlist(item)
  {
    this.user_id=parseInt(localStorage.getItem('user_id'));
        this._wish.checkWish(new wish(item.pro_id,this.user_id)).subscribe(
          (data:any)=>{
            console.log(data);
            if(data.length==1)
            {
              alert('already exist');
            }
            else{
              this._wish.addWishList(new wish(item.pro_id,this.user_id)).subscribe(
                (data:any)=>{
                  console.log(data);
                  this.wish_arr.push(new wish(item.pro_id,this.user_id));
                  alert('item added into wishlist');
                  console.log(this.wish_arr);
                }
              );
            }
          });
  }
  ngOnInit() {
    this.email_id=localStorage.getItem('email_id');
    this.user_id=parseInt(localStorage.getItem('user_id'));
    console.log(this.email_id);
    console.log(this.user_id);
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
            this.tot.push(data[this.i].pro_price);
           this.total+=data[this.i].pro_price;
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
this._product.getTopFiveSellProduct().subscribe(
  (data:any)=>
  {
    this.sellpro_arr=data;
    this.pro_name=data[0].pro_name;
    this.pro_price=data[0].pro_price;
    this.pro_img=data[0].pro_img;
  }
);




    this._offer.getHighRatedProduct().subscribe(
      (data:any)=>{
          this.pro_arr1=data;
          console.log(data);
      }
    );


    this._product.getAllProduct().subscribe(
      (data:product[])=>{
        this.pro_arr=data;
        console.log(data);

      }
    );
    this._category.getAllCategory().subscribe((data: category[]) => {
      console.log(data);
      this.cat_arr = data;
      console.log(data);
      //this.CategorySource.data = this.cat_arr;
    });
  }

  oncompare(item){
    console.log(item.pro_id);

    this._route.navigate(['usermenu/compareproduct',item.pro_id]);
     }

  ondet(item)
  {
    this._route.navigate(['usermenu/prodetails',item.pro_id]);
  }

}
