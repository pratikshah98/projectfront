import { Routes,RouterModule, ChildActivationStart } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { RepairComponent } from './repair/repair.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { BillComponent } from './bill/bill.component';
import { AddbillComponent } from './addbill/addbill.component';
import { billdetail } from './classes/billdetails';
import { BilldetailComponent } from './billdetail/billdetail.component';
import { Component, ViewChildren } from '@angular/core';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { UserComponent } from './user/user.component';
import { AdminupdateComponent } from './adminupdate/adminupdate.component';
import { MenuComponent } from './menu/menu.component';
import { RepairorderComponent } from './repairorder/repairorder.component';
import { RepairupdateComponent } from './repairupdate/repairupdate.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { OfferComponent } from './offer/offer.component';
import { AddrepairComponent } from './addrepair/addrepair.component';
import { SignupComponent } from './signup/signup.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { EdituserprofileComponent } from './edituserprofile/edituserprofile.component';
import { MyrepairingComponent } from './myrepairing/myrepairing.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { RepairformComponent } from './repairform/repairform.component';
import { DisplayproductComponent } from './displayproduct/displayproduct.component';
import { CompareproductComponent } from './compareproduct/compareproduct.component';
import { UserAuthguardService } from './user-authguard.service';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PastorderComponent } from './pastorder/pastorder.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ChatComponent } from './chat/chat.component';
import { AboutusComponent } from './aboutus/aboutus.component';


const arr:Routes=[
  {path:'',component:LoginComponent},
  {path:'menu',component:MenuComponent,children:[

  {path:' ',component:HomepageComponent},
  {path:'product',component:ProductComponent},
  {path:'category',component:CategoryComponent},
  {path:'updatecat/:cat_id',component:UpdateCategoryComponent},
  {path:'addproduct',component:AddproductComponent},
  {path:'updateproduct/:pro_id',component:UpdateproductComponent},
  {path:'order',component:OrderComponent},
  {path:'repair',component:RepairComponent},
  {path:'forget',component:ForgetpasswordComponent},
  {path:'bill',component:BillComponent},
  {path:'addbill',component:AddbillComponent},
  {path:'billdetails/:bill_id',component:BilldetailComponent},
  {path:'editprofile/:user_id',component:UserupdateComponent},
  {path:'adminprofile',component:AdminprofileComponent},
  {path:'manageuser',component:ManageuserComponent},
  {path:'user',component:UserComponent},
  {path:'adminupdate',component:AdminupdateComponent},
  {path:'repairorder',component:RepairorderComponent},
  {path:'updaterepair/:repair_id',component:RepairupdateComponent},
  {path:'userhome',component:UserhomeComponent},
  ]},
  {path:'usermenu',component:UsermenuComponent,children:[
    {path:'userhome',component:UserhomeComponent},
    {path:'prodetails/:pro_id',component:ProductdetailsComponent},
    {path:'addtocart',component:AddtocartComponent,canActivate:[UserAuthguardService]},
    {path:'offer',component:OfferComponent},
    {path:'addrepair',component:AddrepairComponent,canActivate:[UserAuthguardService]},
    {path:'signup',component:SignupComponent},
    {path:'viewprofile',component:ViewprofileComponent,canActivate:[UserAuthguardService]},
    {path:'edituser',component:EdituserprofileComponent,canActivate:[UserAuthguardService]},
    {path:'myrepairing',component:MyrepairingComponent,canActivate:[UserAuthguardService]},
    {path:'changepass',component:ChangepassComponent,canActivate:[UserAuthguardService]},
    {path:'repairform',component:AddrepairComponent},
    {path:'displayproduct/:cat_id',component:DisplayproductComponent},
    {path:'compareproduct/:pro_id',component:CompareproductComponent},
    {path:'wishlist',component:WishlistComponent,canActivate:[UserAuthguardService]},
    {path:'pastorder',component:PastorderComponent,canActivate:[UserAuthguardService]},
    {path:'contactus',component:ContactusComponent},
    {path:'aboutus',component:AboutusComponent},
    {path:'chat',component:ChatComponent}
  ]},
    {path:'errorpage',component:ErrorpageComponent},
    {path:'**',redirectTo:'errorpage',pathMatch:'full'}

];

export const routing= RouterModule.forRoot(arr);
