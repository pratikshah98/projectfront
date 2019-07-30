import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { repairs } from '../classes/repair';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private repair:string="http://localhost:3000/repair/";
  private addrepair:string="http://localhost:3000/addrepair/";

  getAllRepairingOrder() {
    return this._http.get(this.repair);
  }

//   deleteAllOrder(item:order[])
//   {
//       let body=JSON.stringify(item);
//       let head1=new HttpHeaders().set('Content-Type','application/json');
//     return this._http.post(this.order,body,{headers:head1});
//   }
  deleteRepairing(item:repairs)
  {
   let header1=new HttpHeaders().set('Content-type','application/json');
   return this._http.delete(this.repair+item.repair_id,{headers:header1});
 }
  constructor(private _http:HttpClient) { }
}
