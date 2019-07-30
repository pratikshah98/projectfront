import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { category } from '../classes/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cat_arr:category[]=[];
  constructor(private _category:CategoryService) { }
  getAllCategories(){
    this._category.getAllCategory().subscribe((data: category[]) => {
      console.log(data);
      this.cat_arr = data;
      console.log(data);
     });
  }


  ngOnInit() {
    this.getAllCategories();
  }

}
