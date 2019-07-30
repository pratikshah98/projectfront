export class userorder{
  constructor(
    public order_id:number,
    public fk_user_id?:number,
    public order_amount?:number,
    public order_date?:Date,
    public email_id?:string,
    public user_name?:string,
    public password?:string,
    public address?:string,
    public mobile_no?:string,
    public gender?:string,
    public city?:string,
    public user_id?:number,
    public type?:string,

  ){}
}
