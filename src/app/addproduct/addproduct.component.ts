import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { category } from '../classes/category';
import { ProductserviceService } from '../service/productservice.service';
import { product } from '../classes/product';
import { catpro } from '../classes/catpro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
color:string[]=["RED","BLUE","GREEN","YELLOW","PINK","PURPLE","WHITE","BLACK","ORANGE","BROWN","LIGHT BLUE","LIGHT GREEN"];
soharr:number[]=[];
cat_arr:category[]=[];
product_arr:product[]=[];
  pro_name:string="";
  pro_img:string="";
  pro_color:string="";
  pro_soh:number;
  pro_price:number;
  pro_mfg:string="";
  pro_desc:string="";
  fk_cat_id:number;
  cat_name:string[]=[];
  selectedfile:File=null;
  constructor(private _category:CategoryService,private _product:ProductserviceService,
  private _route:Router) { }

  addform(){}
  onchange(value)
  {
    this.selectedfile=<File>value.target.files[0];
  }
  onaddProduct(){
    const fd=new FormData();
    fd.append('pro_name',this.pro_name);
    fd.append('image',this.selectedfile,this.selectedfile.name);
    fd.append('pro_color',this.pro_color);
    fd.append('pro_price',this.pro_price.toString());
    fd.append('pro_soh',this.pro_soh.toString());
    fd.append('pro_mfg',this.pro_mfg);
    fd.append('pro_desc',this.pro_desc);
   fd.append('fk_cat_id',this.fk_cat_id.toString());
    this._product.addProduct(fd).subscribe(
      (data:any)=>{
        console.log(this.pro_soh);
        console.log(this.pro_color);
        this.product_arr.push(new product(this.pro_name,this.pro_img,this.pro_color,this.pro_price,this.pro_soh,this.pro_mfg,this.pro_desc,this.fk_cat_id));

       console.log(data);
       alert("added succesfully");
       this._route.navigate(['menu/product']);
      }
     );
}
  oncancel(){
    this._route.navigate(['menu/product']);
  }
  ngOnInit() {
    for(let i=1;i<=50;i++)
    {
      this.soharr.push(i);
    }
    this._category.getAllCategory().subscribe(
      (data:any)=>{
          this.cat_arr=data;
      }
    );
  }

}
