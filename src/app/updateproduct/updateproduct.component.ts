import { Component, OnInit } from '@angular/core';
import { product } from '../classes/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from '../service/productservice.service';
import { category } from '../classes/category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  color:string[]=["RED","BLUE","GREEN","YELLOW","PINK","PURPLE","WHITE","BLACK","ORANGE","BROWN"];
soharr:number[]=[];
 product_arr:product[]=[];
 cat_arr:category[]=[];
  pro_name:string="";
  pro_img:string="";
  pro_color:string="";
  pro_soh:number;
  pro_price:number;
  pro_mfg:string="";
  pro_desc:string="";
  fk_cat_id:number;
  pro_id:number;
  flag:boolean=false;
  selectedfile:File=null;
  constructor(private _acroute:ActivatedRoute,private _route:Router,private _product:ProductserviceService,private _category:CategoryService) { }

  addform(){}
  onUpdateProduct(){
    if(this.flag)
    {
      const fd=new FormData();
fd.append('pro_id',this.pro_id.toString());
fd.append('pro_name',this.pro_name);
fd.append('image',this.selectedfile,this.selectedfile.name);
fd.append('pro_color',this.pro_color);
fd.append('pro_price',this.pro_price.toString());
fd.append('pro_soh',this.pro_soh.toString());
fd.append('pro_mfg',this.pro_mfg);
fd.append('pro_desc',this.pro_desc);
fd.append('fk_cat_id',this.fk_cat_id.toString());
this._product.UpdateProduct(fd).subscribe(
  (data:any)=>{
    // console.log(this.pro_soh);
    // console.log(this.pro_color);
    this.product_arr.push(new product(this.pro_name,this.pro_img,this.pro_color,this.pro_price,this.pro_soh,this.pro_mfg,this.pro_desc,this.fk_cat_id,this.pro_id));

   console.log(data);
   alert("Updated succesfully");
   this._route.navigate(['/product']);
  }
);
 }
    else{

      this._product.UpdateProductWithoutimg(new product(this.pro_name,this.pro_img,this.pro_color,this.pro_price,this.pro_soh,this.pro_mfg,this.pro_desc,this.fk_cat_id,this.pro_id)).subscribe(
        (data:any)=>{
          console.log(data);
          alert("Updated succesfully");
          this._route.navigate(['menu/product']);
               }
       );

    }



}
oncancel(){
  this._route.navigate(['/product']);
}
onchange(value)
{
  this.flag=true;
  this.selectedfile=<File>value.target.files[0];
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
    this.pro_id=this._acroute.snapshot.params['pro_id'];
    this._product.getProductById(this.pro_id).subscribe(
  (data:product[])=>{
    console.log(data);
    this.pro_name=data[0].pro_name;
    this.pro_img=data[0].pro_img;
    this.pro_color=data[0].pro_color;
    this.pro_soh=data[0].pro_soh;
    this.pro_price=data[0].pro_price;
    this.pro_mfg=data[0].pro_mfg;
    this.pro_desc=data[0].pro_desc;
    this.fk_cat_id=data[0].fk_cat_id;

  }
);
  }

}


