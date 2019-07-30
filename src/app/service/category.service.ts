import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category:string="http://localhost:3000/category/";
  private categorybyid:string="http://localhost:3000/categorybyid/";
  private deleteallCategory:string="http://localhost:3000/deleteallcategory/";
  constructor(private _http:HttpClient) { }
  addCategory(item)
  {
  return this._http.post(this.category,item);
  }
  getCategoryById(cat_id: number) {
    return this._http.get(this.categorybyid + cat_id);
  }
  deleteCategory(item:category)
  {
    let header1=new HttpHeaders().set('Content-type','application/json');
    return this._http.delete(this.category+item.cat_id,{headers:header1});
  }
  deleteAllcategory(item:category[])
  {
      let body=JSON.stringify(item);
      let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteallCategory,body,{headers:head1});
  }
  getAllCategory() {
    return this._http.get(this.category);
  }
  UpdateCategory(item:category)
  {
      let body=JSON.stringify(item);
      let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.category+item.cat_id,body,{headers:head1});
  }

}
