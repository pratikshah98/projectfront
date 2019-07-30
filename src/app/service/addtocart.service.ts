import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {
  private cart:string="http://localhost:3000/cart/";
  getAllCart() {
    return this._http.get(this.cart);
  }
  InsertCart(item)
  {
      let body=JSON.stringify(item);
      let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.cart,body,{headers:head1});
  }
  getAllCartByUser_id(user_id:number)
  {
    return this._http.get(this.cart+user_id);
  }

  constructor(private _http:HttpClient) { }
}
