import { Component, OnInit } from '@angular/core';
import { product } from '../classes/product';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { ProductserviceService } from '../service/productservice.service';

@Component({
  selector: 'app-displayproduct',
  templateUrl: './displayproduct.component.html',
  styleUrls: ['./displayproduct.component.css']
})
export class DisplayproductComponent implements OnInit {
displaypro_arr:product[]=[];
cat_id:number;
  constructor(private _displayproduct:ProductserviceService,private _acroute:ActivatedRoute,private _route:Router) { }
  ondet(item)
  {
    this._route.navigate(['usermenu/prodetails',item.pro_id]);
  }
  ngOnInit() {
    this._acroute.params.subscribe(
      (x:Params)=>{
        this.cat_id=x['cat_id'];
        console.log(this.cat_id);
        this._displayproduct.getDisplayProductByCat_Id(this.cat_id).subscribe(
          (data:any)=>{
            this.displaypro_arr=data;
            console.log(data);
            // this.ngOnInit();
          }
        );
       }
    );
    // this.cat_id=this._acroute.snapshot.params['cat_id'];
    //console.log(this.cat_id);

}

}
