import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { category } from '../classes/category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
cat_id:number;
  cat_name:string;
  constructor(private _category:CategoryService,private _route:Router,private _acroute:ActivatedRoute) { }
onUpdate(){

  this._category.UpdateCategory(new category(this.cat_name,this.cat_id)).subscribe(
    (data:any)=>{
      console.log(data);
      alert("record updated succesfully");
      //this._route.navigate(['']);
    }
   );
}
oncancel(){
this._route.navigate(['']);
}
  ngOnInit() {
    this.cat_id=this._acroute.snapshot.params['cat_id'];
    this._category.getCategoryById(this.cat_id).subscribe(
  (data:category[])=>{
    console.log(data);
    this.cat_name=data[0].cat_name;
  }
);
  }
  }


