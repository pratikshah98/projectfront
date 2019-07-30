export class bill{
  constructor(
    public bill_amount:number,
    public fk_user_id?:number,
    public date?:Date,
    public bill_type?:string
  ){}
}
