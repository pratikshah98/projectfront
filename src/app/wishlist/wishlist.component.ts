import { Component, OnInit } from '@angular/core';
import { WishService } from '../service/wish.service';
import { wish } from '../classes/wish';
import { wishpro } from '../classes/wishpro';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { UserService } from '../service/user.service';
import { AddtocartService } from '../service/addtocart.service';
import { checkcart } from '../productdetails/productdetails.component';
import { Addcart } from '../classes/cart';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
user_id:number;
wish_arr:wishpro[]=[];
del_wish_arr:wish[]=[];
addcart_arr:Addcart[]=[];
pro_img:string;
pro_name:string;
pro_price:number;
pro_mfg:string;
qty:number=1;
i:number;
  constructor(private _wish:WishService,private _route:Router,private _cartservice:CartService,private _user:UserService,private _cart:AddtocartService) { }
  ondelete(item){
    this._wish.deleteWish(item).subscribe(
      (data:any)=>{
        this.wish_arr.splice(this.wish_arr.indexOf(item),1);
        console.log(data);

      }
    );
  }
  onAddCart(item){
    console.log(item);
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
           this._cart.InsertCart(new Addcart(this.user_id,item.pro_id,this.qty,item.pro_price)).subscribe(
             (data:any)=>
             {
               this.addcart_arr.push(new Addcart(this.user_id,item.pro_id,this.qty,item.pro_price));
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

  DeleteAllWish(){
  console.log(this.user_id);
 this._wish.alldeleteWish(this.user_id).subscribe(
   (data:wishpro[])=>{
      this.wish_arr.splice(0,this.wish_arr.length);
      console.log(data);
      console.log(this.wish_arr);
   }
 );

  }
  ngOnInit() {
    this.user_id=parseInt(localStorage.getItem('user_id'));

    this._wish.getAllCartByUserid(this.user_id).subscribe(
      (data:wishpro[])=>
      {
          if(data.length>0)
          {
          this.wish_arr=data;
          this.pro_name=data[0].pro_name;
          this.pro_img=data[0].pro_img;
          this.pro_price=data[0].pro_price;
          this.pro_mfg=data[0].pro_mfg;
          console.log(data);
          }
          else
          {
              alert('your wish is empty');
          }

      }
    );
  }

}
