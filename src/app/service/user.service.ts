import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { user } from '../classes/user';
import { sendmail } from '../forgetpassword/sendmail';
import { Users } from '../classes/users';
declare var firebase:any;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private login:string="http://localhost:3000/userlogin/";
  private email:string="http://localhost:3000/email/";
  private forgetpass:string="http://localhost:3000/forgetpass/";
  private deletealluser:string="http://localhost:3000/deletealluser/";
  private getadmin:string="http://localhost:3000/getadmin/";
  private updateuser:string="http://localhost:3000/updateuser/";
  private getalluser:string="http://localhost:3000/getalluser/";
  constructor(private _http:HttpClient) { }
  getLogin(item:user){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
  return this._http.post(this.login+item.email_id,body,{headers:head1});
  }
  getPasswordById(email_id:string){
    return this._http.get(this.forgetpass+email_id);
      }

    sendMail(item:sendmail){
        let body=JSON.stringify(item);
        let head1=new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.email,body,{headers:head1});
          }

  ChangePassword(item:user)
  {
       let body=JSON.stringify(item);
       let head1=new HttpHeaders().set('Content-Type','application/json');
     return this._http.put(this.login,body,{headers:head1});
  }
  getUserById(user_id: number) {
    console.log(user_id);
    return this._http.get(this.login + user_id);
  }
  getAdminByName(email_id:string) {
    console.log(email_id);
    return this._http.get(this.getadmin + email_id);
  }
  UpdateAdmin(item:user)
  {
    console.log(item.user_name);
             let body=JSON.stringify(item);
             let head1=new HttpHeaders().set('Content-Type','application/json');
           return this._http.put(this.getadmin+item.email_id,body,{headers:head1});

  }
  UpdateUsers(item:Users)
  {
    console.log(item.user_name);
             let body=JSON.stringify(item);
             let head1=new HttpHeaders().set('Content-Type','application/json');
           return this._http.put(this.updateuser+item.email_id,body,{headers:head1});

  }

  getAllUser(type){
            return this._http.get(this.getalluser+type);
  }
  addUser(item){
            let body=JSON.stringify(item);
            let head1=new HttpHeaders().set('Content-Type','application/json');
            return this._http.post(this.login,body,{headers:head1});
    }
    UpdateUser(item:user)
    {
               let body=JSON.stringify(item);
               let head1=new HttpHeaders().set('Content-Type','application/json');
             return this._http.put(this.login+item.user_id,body,{headers:head1});

    }
   deleteUser(item:user)
     {
            let header1=new HttpHeaders().set('Content-type','application/json');
            return this._http.delete(this.login+item.user_id,{headers:header1});
    }
     deleteAllUser(item:user[])
      {
              let body=JSON.stringify(item);
              let head1=new HttpHeaders().set('Content-Type','application/json');
            return this._http.post(this.deletealluser,body,{headers:head1});
      }
      isAuthenticated(){
        var user = firebase.auth().currentUser;
        if (user) {
          return true;
        }
        else {
          return false;
        }
      }
}
