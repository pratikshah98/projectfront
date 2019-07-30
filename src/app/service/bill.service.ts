import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { bill } from '../classes/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private bill:string="http://localhost:3000/bill/";
  private billdet:string="http://localhost:3000/billdetails/";

  getAllBills() {
    return this._http.get(this.bill);
  }
  InsertBills(item)
  {
      let body=JSON.stringify(item);
      let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.bill,body,{headers:head1});
  }
  InsertBillDetails(item)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.billdet,body,{headers:head1});
  }
  getUserName(){
    return this._http.get(this.bill);
      }
      getMoreBillDetails(bill_id) {
        console.log(bill_id);
       return this._http.get(this.billdet+bill_id);
     }
     InsertBillByRepair(item)
     {
         let body=JSON.stringify(item);
         let head1=new HttpHeaders().set('Content-Type','application/json');
       return this._http.post(this.bill,body,{headers:head1});
     }

  constructor(private _http:HttpClient) { }
}
