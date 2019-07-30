import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { review } from '../classes/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private review:string="http://localhost:3000/review/";
  private contact:string="http://localhost:3000/contact/"
  getAllReview(fk_pro_id) {
    return this._http.get(this.review+fk_pro_id);
  }
  addReview(item)
  {
    let body=JSON.stringify(item);
    console.log("addReview"+item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.review,body,{headers:head1});
  }
  addContact(item){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.contact,body,{headers:head1});
  }
  constructor(private _http:HttpClient) { }
}
