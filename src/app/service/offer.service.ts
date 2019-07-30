import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private highrated:string="http://localhost:3000/highrateproduct/";
  constructor(private _http:HttpClient) { }
  getHighRatedProduct(){
    return this._http.get(this.highrated);
  }

}
