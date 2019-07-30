import { Component, OnInit } from '@angular/core';
import { category } from '../classes/category';
import { product } from '../classes/product';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductserviceService } from '../service/productservice.service';
import { catpro } from '../classes/catpro';
import { Addcart } from '../classes/cart';
import { AddtocartService } from '../service/addtocart.service';
import { combineAll } from 'rxjs/operators';
import { ReviewService } from '../service/review.service';
import { review } from '../classes/review';
import { UserService } from '../service/user.service';
import { CartService } from '../service/cart.service';
import { WishService } from '../service/wish.service';
import { wish } from '../classes/wish';
export class checkcart{
  constructor(public user_id:number,public pro_id:number){}
}
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  pro_cat_arr:catpro[]=[];
  product_arr:product[]=[];
  wish_arr:wish[]=[];
    pro_name:string="";
    pro_img:string="";
    pro_color:string="";
    pro_soh:number;
    pro_qty:number=1;
    pro_price:number;
    pro_mfg:string="";
    pro_desc:string="";
    fk_cat_id:number;
    pro_id:number;
    flag:boolean=false;
    tot:number=0;
    qty_arr:number[]=[];
    price_arr:number[]=[];
product_arr1:catpro[]=[];
user_id:number;
addcart_arr:Addcart[]=[];
review_arr:review[]=[];
user_name:string;
user_name1:string;
fk_pro_id:number;
email_id:string;
review:string;
  constructor(private _cartservice:CartService,private _user:UserService,private _cart:AddtocartService,private _review:ReviewService,private _acroute:ActivatedRoute,private _product:ProductserviceService,private _route:Router,private _wish:WishService) { }

  onclick(item){
    // console.log(item.pro_id);
    // this._product.getCatByIdNotIn(item.fk_cat_id,item.pro_id).subscribe(
    //   (data:catpro[])=>{
    //   this.pro_cat_arr=data;
    //   console.log(data);
    //     }
    // );

  }
  addform(){}
  onAddReview(){
    this.email_id=localStorage.getItem('email_id');
    console.log(this.email_id);
    console.log(this.user_name);
    console.log(this.pro_id);
    console.log(this.review);
    this._review.addReview(new review(this.email_id,this.user_name1,this.review,this.pro_id)).subscribe(
      (data:review[])=>{
       // this.review_arr.push(new review(this.email_id,this.user_name,this.review,this.pro_id));
        console.log(data);
      }
    );
  }
  oncancel(){
    this._route.navigate(['usermenu/userhome']);
  }
  onAdd()
  {
      if (this.flag) {
        this.flag=false;
      } else {
        this.flag=true;
      }
      }
      onAddCart(item){

        this.user_id=parseInt(localStorage.getItem('user_id'));
    this._user.getUserById(this.user_id).subscribe(
      (data:any)=>{
        this.user_id=data[0].user_id;

        this._cartservice.checkCart(new checkcart(this.user_id,this.pro_id)).subscribe(
          (data:any)=>{
            console.log(data);
            if(data.length==1)
            {
              alert('already exist');
            }
            else{

              this.user_id=parseInt(localStorage.getItem('user_id'));
              // console.log(this.user_id);
               this._cart.InsertCart(new Addcart(this.user_id,this.pro_id,this.pro_qty,this.pro_price)).subscribe(
                 (data:any)=>
                 {
                   this.addcart_arr.push(new Addcart(this.user_id,this.pro_id,this.pro_qty,this.pro_price));
                  console.log(data);

                   alert("Item added into cart");
                  this._route.navigate(['usermenu/addtocart']);
                  }
               );
            }





            }

        );

      }
    );


      }

  onAddToCart(item){
    this.user_id=parseInt(localStorage.getItem('user_id'));
    this._user.getUserById(this.user_id).subscribe(
      (data:any)=>{
        this.user_id=data[0].user_id;

        this._cartservice.checkCart(new checkcart(this.user_id,item.pro_id)).subscribe(
          (data:any)=>{
            console.log(data);
            if(data.length==1)
            {
              alert('already exist');
            }
            else{

              this.user_id=parseInt(localStorage.getItem('user_id'));
              // console.log(this.user_id);
               this._cart.InsertCart(new Addcart(this.user_id,item.pro_id,this.pro_qty,this.pro_price)).subscribe(
                 (data:any)=>
                 {
                   this.addcart_arr.push(new Addcart(this.user_id,item.pro_id,this.pro_qty,this.pro_price));
                  console.log(data);

                   alert("Item added into cart");
                  this._route.navigate(['usermenu/addtocart']);
                  }
               );
            }





            }

        );

      }
    );


  }
  ngOnInit() {
    this.email_id=localStorage.getItem('email_id');
    this.user_id=parseInt(localStorage.getItem('user_id'));
this._acroute.params.subscribe(
      (x:Params)=>{
        this.pro_id=x['pro_id'];
        console.log(this.pro_id);
    this._product.getProductById(this.pro_id).subscribe(
      (data:product[])=>{
        this.product_arr=data;
        console.log(data);
       // console.log(this.y);
        this.pro_id=data[0].pro_id;
        this.pro_name=data[0].pro_name;
        this.pro_price=data[0].pro_price;
        this.pro_mfg=data[0].pro_mfg;
        this.pro_soh=data[0].pro_soh;
        this.pro_img=data[0].pro_img;
        this.pro_color=data[0].pro_color;
        this.pro_desc=data[0].pro_desc;
        this.fk_cat_id=data[0].fk_cat_id;
        this._product.getCatByIdNotIn(this.fk_cat_id,this.pro_id).subscribe(
    (data:catpro[])=>{
    this.pro_cat_arr=data;
    console.log(data);
      }
  )
  });
}
);
this._user.getUserById(this.user_id).subscribe(
  (data:any)=>{
    //this.=data;
    console.log(this.user_id);
    this.user_name1=data[0].user_name;
    console.log(data);
    console.log(this.user_name1);
  }
);

this._review.getAllReview(this.pro_id).subscribe(
  (data:any)=>{
    this.review_arr=data;
    //this.user_name1=data[0].user_name;
    console.log(data);
    //console.log(this.user_name1);
  }
);
}
oncompare(pro_id){
  console.log(this.pro_id);

  this._route.navigate(['usermenu/compareproduct',this.pro_id]);
   }
   onCompare(item){
    console.log(item.pro_id);

    this._route.navigate(['usermenu/compareproduct',item.pro_id]);
     }
     onwishlist(item)
  {
    this.user_id=parseInt(localStorage.getItem('user_id'));
    this._user.getUserById(this.user_id).subscribe(
      (data:any)=>{
        this.user_id=data[0].user_id;

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
        });

  }
  onWishlist(pro_id)
  {
    this.user_id=parseInt(localStorage.getItem('user_id'));
    this._user.getUserById(this.user_id).subscribe(
      (data:any)=>{
        this.user_id=data[0].user_id;

        this._wish.checkWish(new wish(this.pro_id,this.user_id)).subscribe(
          (data:any)=>{
            console.log(data);
            if(data.length==1)
            {
              alert('already exist');
            }
            else{
              this._wish.addWishList(new wish(this.pro_id,this.user_id)).subscribe(
                (data:any)=>{
                  console.log(data);
                  this.wish_arr.push(new wish(this.pro_id,this.user_id));
                  alert('item added into wishlist');
                  console.log(this.wish_arr);
                }
              );
            }
          });
        });
  }
  ondet(item)
  {
    this._route.navigate(['usermenu/prodetails',item.pro_id]);
  }
  }


