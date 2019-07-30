import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ProductserviceService } from '../service/productservice.service';
import { Router } from '@angular/router';
import { product } from '../classes/product';
import { category } from '../classes/category';
import { CategoryService } from '../service/category.service';
import { catpro } from '../classes/catpro';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  cat_arr:category[]=[];
  pro_arr:product[]=[];
  cat_pro_arr:catpro[]=[];
  pro_del_arr:product[]=[];
flag:boolean=false;
i:number;
@ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  displayedColumns: string[] = ["Action", "pro_name","pro_price","pro_img","action"];
  ProductSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.ProductSource.filter = filterValue.trim().toLowerCase();
  }
  onDelete(item){
    this._product.deleteProduct(item).subscribe(
      (data:any)=>{
        this.pro_arr.splice(this.pro_arr.indexOf(item),1);
        this.ProductSource=new MatTableDataSource(this.pro_arr);
      }
    );

  }
  onAddProduct(){
    this._route.navigate(['menu/addproduct']);
  }

onUpdate(item:product){
  this._route.navigate(['menu/updateproduct',item.pro_id]);
}
onMultipledel() {
  this._product.deleteAllProduct(this.pro_del_arr).subscribe((data: any) => {
   console.log(this.pro_del_arr);
    for (this.i = 0; this.i < this.pro_del_arr.length; this.i++) {
      if (this.pro_arr.find(x => x == this.pro_del_arr[this.i])) {
        this.pro_arr.splice(this.pro_arr.indexOf(this.pro_del_arr[this.i]),1);
      }
    }
    this.ProductSource.data = this.pro_arr;
    console.log(this.pro_arr);
  });
}
checkchangeProduct(item: product) {
  if (this.pro_del_arr.find(x => x == item)) {
    this.pro_del_arr.splice(this.pro_del_arr.indexOf(item), 1);
  } else {
    this.pro_del_arr.push(item);

  }
  console.log(this.pro_del_arr);
}

  constructor(private _product:ProductserviceService,private _route:Router,private _category:CategoryService) { }
  onall(){
    this.ProductSource.paginator = this.paginator;
    this.ProductSource.sort = this.sort;
    this._product.getAllProduct().subscribe((data: product[]) => {
      console.log(data);
      this.pro_arr = data;
      console.log(data);
      this.ProductSource.data = this.pro_arr;
    });
  }
  onCatName(cat_name){
    this._product.getProductByCatname(cat_name).subscribe(
      (data:any[])=>{
          this.pro_arr=data;
          this.ProductSource.data=this.pro_arr;
          this.ProductSource.paginator=this.paginator;
          this.ProductSource.sort=this.sort;
      }
    );
  }
  ngOnInit() {
    this._category.getAllCategory().subscribe(
      (data:category[])=>{
        this.cat_arr=data;
      });
    this.ProductSource.paginator = this.paginator;
    this.ProductSource.sort = this.sort;
    this._product.getAllProduct().subscribe((data: product[]) => {
      console.log(data);
      this.pro_arr = data;
      console.log(data);
      this.ProductSource.data = this.pro_arr;
    });
  }
  }


