import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { category } from '../classes/category';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  del_arr:category[]=[];
  i: number=0;
  cat_arr:category[]=[];
  cat_id:number;
  cat_name:string;
flag:boolean=false;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  displayedColumns: string[] = ["Action", "cat_name","Symbol"];
  CategorySource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    this.CategorySource.filter = filterValue.trim().toLowerCase();
  }

  checkchangeCategory(item: category) {
    if (this.del_arr.find(x => x == item)) {
      this.del_arr.splice(this.del_arr.indexOf(item), 1);
    } else {
      this.del_arr.push(item);

    }
    console.log(this.del_arr);
  }
  onUpdate(item:category){
   this._route.navigate(['menu/updatecat',item.cat_id]);

  }
  onDelete(item)
  {
    this._category.deleteCategory(item).subscribe(
      (data:any)=>{
        this.cat_arr.splice(this.cat_arr.indexOf(item),1);
        this.CategorySource=new MatTableDataSource(this.cat_arr);
      }
    );
     }
  onAdd()
  {
      if (this.flag) {
        this.flag=false;
      } else {
        this.flag=true;
      }
      }
  onMultipledel() {
    this._category.deleteAllcategory(this.del_arr).subscribe((data: any) => {
     console.log(this.del_arr);
      for (this.i = 0; this.i < this.del_arr.length; this.i++) {
        if (this.cat_arr.find(x => x == this.del_arr[this.i])) {
          this.cat_arr.splice(this.cat_arr.indexOf(this.del_arr[this.i]),1);
        }
      }
      this.CategorySource.data = this.cat_arr;
      console.log(this.cat_arr);
    });
  }
  addform(){

  }
  onaddCategory()
      {
        if(this.cat_arr.find(x=>x.cat_name==this.cat_name))
        {
          alert("Category Already Added");
        }
        else{
           this._category.addCategory(new category(this.cat_name)).subscribe(
          (data:any)=>{
            this.cat_arr.push(new category(this.cat_name));
            this.CategorySource=new MatTableDataSource(this.cat_arr);
            alert("record added successfully");
            this.getAllCategories();
           this.flag=false;
          }

        );
      }
    }

         oncancel(){
           this.flag=false;
         }
  constructor(private _category:CategoryService,private _route:Router ) { }

  ngOnInit() {
    this.CategorySource.paginator = this.paginator;
    this.CategorySource.sort = this.sort;
    this.getAllCategories();
  }
  getAllCategories(){
    this._category.getAllCategory().subscribe((data: category[]) => {
      console.log(data);
      this.cat_arr = data;
      console.log(data);
      this.CategorySource.data = this.cat_arr;
    });
  }
}


