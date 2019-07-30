import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Addcart } from '../classes/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:string="http://localhost:3000/cart/";
  private cartcountbyuserid:string="http://localhost:3000/cartcountbyid/"
  private cartbyproid:string="http://localhost:3000/cartbyproid/";
  private AlldeleteCart:string="http://localhost:3000/multideletecart";
  private checkcart:string="http://localhost:3000/Checkintocart/";

  constructor(private _http:HttpClient) { }
  getAllCart() {
    return this._http.get(this.cart);
  }
  getAllCartByProid(fk_user_id:number) {
    return this._http.get(this.cartbyproid+fk_user_id);
  }
  getAllCartCountByid(fk_user_id:number) {
    return this._http.get(this.cartcountbyuserid+fk_user_id);
  }
  deleteCart(item:Addcart)
   {
    let header1=new HttpHeaders().set('Content-type','application/json');
    return this._http.delete(this.cart+item.cart_id,{headers:header1});
  }
  deleteAllCart(item:Addcart[])
  {
      let body=JSON.stringify(item);
      let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.AlldeleteCart,body,{headers:head1});
  }
  checkCart(item)
  {
      let body=JSON.stringify(item);
      let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.checkcart,body,{headers:head1});
  }

}
