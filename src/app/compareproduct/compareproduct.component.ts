import { Component, OnInit } from '@angular/core';
import { product } from '../classes/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from '../service/productservice.service';
import { UserService } from '../service/user.service';
import { AddtocartService } from '../service/addtocart.service';
import { CartService } from '../service/cart.service';
import { Addcart } from '../classes/cart';
export class checkcart{
  constructor(public user_id:number,public pro_id:number){}
}

@Component({
  selector: 'app-compareproduct',
  templateUrl: './compareproduct.component.html',
  styleUrls: ['./compareproduct.component.css']
})
export class CompareproductComponent implements OnInit {
flag:boolean=true;
flag1:boolean=false;
pro_id:number;
  pro_id1:number;
  pro_arr:product[]=[];
  pro_name:string;
  pro_arr1:product[]=[];
  pro_arr2:product[]=[];
  addcart_arr:Addcart[]=[];
pro_qty:number=1;
pro_price:number;
  user_id:number;
  constructor(private _route:Router,private _cartservice:CartService,private _cart:AddtocartService,private _user:UserService,private _pro:ProductserviceService,private _router:Router,private _acroute:ActivatedRoute) { }
  addform(f){}
  onChange(){

  }
  onAdd()
  {
      if (this.flag1) {
        this.flag1=false;
      } else {
        this.flag1=true;
      }
      this._pro.getProductById(this.pro_id).subscribe(
        (data:any)=>{
          console.log(data);
          this.pro_arr1=data;
        }
      );
      this._pro.getProductById(this.pro_id1).subscribe(
        (data:any)=>{
          console.log(data);
          this.pro_arr2=data;
        }
      );
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
    this._pro.getAllProduct().subscribe(
      (data:any)=>{
        this.pro_arr=data;
        }
    );
        this.pro_id=this._acroute.snapshot.params['pro_id'];
        this._pro.getProductById(this.pro_id).subscribe(
          (data:product[])=>{
            this.pro_id1=data[0].pro_id;
            console.log(this.pro_id1)
            console.log(data);
            this.pro_name=data[0].pro_name;
            console.log(this.pro_name);
            console.log(data);
            this.pro_price=data[0].pro_price;
          }
        )


  }

}
