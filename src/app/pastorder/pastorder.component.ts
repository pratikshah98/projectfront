import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';import { bill } from '../classes/bill';
import { userbill } from '../classes/userbill';
import { OrderService } from '../order.service';
import { TrustedString } from '@angular/core/src/sanitization/bypass';
import { userorder } from '../classes/userorder';

@Component({
  selector: 'app-pastorder',
  templateUrl: './pastorder.component.html',
  styleUrls: ['./pastorder.component.css']
})
export class PastorderComponent implements OnInit {
  user_id:number;
  bill_arr:bill[]=[];
  userbill_arr:userbill[]=[];
  email_id:string;
bill_id:number;
pro_img:string;
pro_name:string;
pro_price:string;
pro_mfg:string;
i:number;
j:number;
cnt:number;
  constructor(private _order:OrderService,private _user:UserService,private _route:Router) { }

  ngOnInit() {
    this.user_id=parseInt(localStorage.getItem('user_id'));
    console.log(this.user_id);
    this._order.getPastOrderbyId(this.user_id).subscribe(
      (data:any[])=>{
        console.log(this.user_id);
        console.log(data);
        this.bill_arr=data;
        console.log(this.bill_arr);
        if(data.length>0)
        {
        for(this.i=0;this.i<this.bill_arr.length;this.i++)
        {
          this.bill_id=data[this.i].bill_id;
          console.log(this.bill_id);

          this._order.getPastOrder(this.bill_id).subscribe(
            (data:userbill[])=>{

                this.userbill_arr=this.userbill_arr.concat(data);
              console.log(this.userbill_arr);

              }
            );
        }
      }
      else
      {
        alert('your pastorder is empty');
      }
            }
           );

        }



}
