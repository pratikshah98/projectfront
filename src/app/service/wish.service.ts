import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { wish } from '../classes/wish';

@Injectable({
  providedIn: 'root'
})
export class WishService {
  private wish:string="http://localhost:3000/wishlist/";
  private wishlistbyid:string="http://localhost:3000/wishlistbyid/";
  private checkwish:string="http://localhost:3000/checkwish/";

  constructor(private _http:HttpClient) { }
  getAllWishList() {
    return this._http.get(this.wish);
  }
  addWishList(item){
    let body=JSON.stringify(item);
  let head1=new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.wish,body,{headers:head1});
  }
  getAllCartByUserid(fk_user_id:number) {
    return this._http.get(this.wishlistbyid+fk_user_id);
  }
  deleteWish(item:wish)
   {
    let header1=new HttpHeaders().set('Content-type','application/json');
    return this._http.delete(this.wish+item.wish_id,{headers:header1});
  }
  deleteAllWishList(item:wish[])
  {
      let body=JSON.stringify(item);
      let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.wishlistbyid,body,{headers:head1});
  }
  alldeleteWish(fk_user_id:number)
  {

      let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.wishlistbyid+fk_user_id,{headers:head1});
  }
  checkWish(item){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.checkwish,body,{headers:head1});
  }
}

