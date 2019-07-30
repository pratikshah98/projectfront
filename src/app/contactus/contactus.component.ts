import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { Router } from '@angular/router';
import { contactus } from '../classes/contactus';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  Name:String="";
  Email:String="";
  Mobile_no:String="";
  Message:String="";
  constructor(private _conatct:ReviewService,private _route:Router) { }
  addform(){}

  onsubmit(){
      this._conatct.addContact(new contactus(this.Name,this.Email,this.Mobile_no,this.Message)).subscribe(
        (data:contactus[])=>{
          console.log(data);
        }
      );
  }
  ngOnInit() {
  }

}
