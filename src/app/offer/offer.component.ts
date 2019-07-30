import { Component, OnInit } from '@angular/core';
import { OfferService } from '../service/offer.service';
import { product } from '../classes/product';
import { ProductserviceService } from '../service/productservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  pro_arr:product[]=[];

  constructor(private _pro:ProductserviceService,private _route:Router) { }
  ondet(item)
  {
    this._route.navigate(['usermenu/prodetails',item.pro_id]);
  }
  ngOnInit() {
    this._pro.getAllProduct().subscribe(
      (data:any)=>{
          this.pro_arr=data;
          console.log(data);
      }
    );
  }

}
