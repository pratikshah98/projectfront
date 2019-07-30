export class review{
  constructor(
    public email_id:string,
    public user_name?:string,
    public review?:string,
    public fk_pro_id?:number
  ){}
}
